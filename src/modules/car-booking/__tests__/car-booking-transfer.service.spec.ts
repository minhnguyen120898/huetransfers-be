/**
 * Transfer Business Logic Tests for Car Booking
 *
 * Tests the transfer compensation mechanism:
 * - Original booking → status: transferred
 * - Compensation booking → isTransfer: true, status: confirmed, negative debtAmount
 *
 * Financial model:
 *   compensationAmount = what we pay the partner (default: original.sellingPrice)
 *   netCompensation = compensationAmount - original.receivingPrice
 *   transferBooking.debtAmount = -(netCompensation) [negative = payable to partner]
 */
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CarBookingService } from '../service/car-booking.service';
import { CarBookingRepository } from '../repositories/car-booking.repository';
import { LoggerService } from '../../common/provider/logger.service';
import { PrismaService } from '../../common/provider/prisma.provider';
import {
  CarBookingStatus,
  PaymentCollection,
  PaymentStatus,
  TransportType,
} from 'generated/prisma';
import { Decimal } from '@prisma/client/runtime/library';
import { CarBookingEntity } from '../entities/car-booking.entity';

const mockLogger = { info: jest.fn(), error: jest.fn(), warn: jest.fn() };
const mockRepository = {
  create: jest.fn(),
  findById: jest.fn(),
  findByCode: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  getCountByStatus: jest.fn(),
};

// Capture the transaction callback so we can invoke it in tests
let capturedTxCallback: ((tx: any) => Promise<any>) | null = null;

const mockPrisma = {
  travelAgency: { findUnique: jest.fn() },
  carBooking: { count: jest.fn(), updateMany: jest.fn() },
  $transaction: jest.fn().mockImplementation((cb: any) => {
    capturedTxCallback = cb;
    return Promise.resolve({ updatedOriginal: null, transferBooking: null }); // overridden per-test
  }),
};

function makeConfirmedEntity(
  overrides: Partial<CarBookingEntity> = {},
): CarBookingEntity {
  const entity = new CarBookingEntity();
  entity.id = 'original-booking-uuid';
  entity.bookingCode = 'CB-20260220-ORIGINAL';
  entity.travelAgencyId = 'agency-uuid-1';
  entity.vehicleType = TransportType.seats_4;
  entity.serviceDate = new Date('2026-03-15');
  entity.guestName = 'Nguyen Van A';
  entity.guestPhone = '+84-987-654-321';
  entity.guestCount = 4;
  entity.pickupLocation = 'Noi Bai Airport';
  entity.dropoffLocation = 'Hoan Kiem Hotel';
  entity.vat = false;
  entity.sellingPrice = new Decimal(1500000);
  entity.receivingPrice = new Decimal(0);
  entity.debtAmount = new Decimal(1500000);
  entity.paymentCollection = PaymentCollection.no_collection;
  entity.paymentCollectionNote = null;
  entity.paymentStatus = PaymentStatus.pending;
  entity.paidAt = null;
  entity.status = CarBookingStatus.confirmed;
  entity.note = null;
  entity.isTransfer = false;
  entity.transferFromId = null;
  entity.transferToAgencyId = null;
  entity.transferReason = null;
  entity.transferredAt = null;
  entity.createdAt = new Date('2026-02-20');
  entity.updatedAt = new Date('2026-02-20');
  entity.createdById = 'user-1';
  entity.updatedById = 'user-1';
  entity.travelAgency = {
    id: 'agency-uuid-1',
    name: 'Original Agency',
    tel: null,
    address: null,
  };
  entity.transferBookings = [];
  entity.transferToAgency = null;
  return Object.assign(entity, overrides);
}

describe('CarBookingService — Transfer Logic', () => {
  let service: CarBookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarBookingService,
        { provide: CarBookingRepository, useValue: mockRepository },
        { provide: LoggerService, useValue: mockLogger },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CarBookingService>(CarBookingService);
    jest.clearAllMocks();
    capturedTxCallback = null;
  });

  // ============================================================
  // transferToPartnerAgency() — guard conditions
  // ============================================================
  describe('transferToPartnerAgency() — guard conditions', () => {
    it('throws NotFoundException when original booking does not exist', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(
        service.transferToPartnerAgency(
          'nonexistent-id',
          { partnerAgencyId: 'partner-uuid', reason: 'Vehicle breakdown' },
          'user-1',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws BadRequestException when booking is not confirmed', async () => {
      mockRepository.findById.mockResolvedValue(
        makeConfirmedEntity({ status: CarBookingStatus.completed }),
      );

      await expect(
        service.transferToPartnerAgency(
          'original-booking-uuid',
          { partnerAgencyId: 'partner-uuid', reason: 'Vehicle breakdown' },
          'user-1',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('throws BadRequestException when booking is already a transfer booking', async () => {
      mockRepository.findById.mockResolvedValue(
        makeConfirmedEntity({ isTransfer: true }),
      );

      await expect(
        service.transferToPartnerAgency(
          'original-booking-uuid',
          { partnerAgencyId: 'partner-uuid', reason: 'Vehicle breakdown' },
          'user-1',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('throws BadRequestException when transferring to the same agency', async () => {
      mockRepository.findById.mockResolvedValue(makeConfirmedEntity());

      await expect(
        service.transferToPartnerAgency(
          'original-booking-uuid',
          { partnerAgencyId: 'agency-uuid-1', reason: 'Same agency' }, // Same as original
          'user-1',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('throws NotFoundException when partner agency does not exist', async () => {
      mockRepository.findById.mockResolvedValue(makeConfirmedEntity());
      mockPrisma.travelAgency.findUnique.mockResolvedValue(null);

      await expect(
        service.transferToPartnerAgency(
          'original-booking-uuid',
          {
            partnerAgencyId: 'nonexistent-partner',
            reason: 'Vehicle breakdown',
          },
          'user-1',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws BadRequestException when partner agency is inactive', async () => {
      mockRepository.findById.mockResolvedValue(makeConfirmedEntity());
      mockPrisma.travelAgency.findUnique.mockResolvedValue({
        id: 'partner-uuid',
        name: 'Inactive Partner',
        isActive: false,
      });

      await expect(
        service.transferToPartnerAgency(
          'original-booking-uuid',
          { partnerAgencyId: 'partner-uuid', reason: 'Vehicle breakdown' },
          'user-1',
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  // ============================================================
  // updateTransferPricing() — guard conditions
  // ============================================================
  describe('updateTransferPricing() — guard conditions', () => {
    it('throws NotFoundException when booking does not exist', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(
        service.updateTransferPricing(
          'nonexistent-id',
          { compensationAmount: 1200000 },
          'user-1',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws BadRequestException when booking is not transferred', async () => {
      mockRepository.findById.mockResolvedValue(makeConfirmedEntity()); // status: confirmed

      await expect(
        service.updateTransferPricing(
          'original-booking-uuid',
          { compensationAmount: 1200000 },
          'user-1',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('throws NotFoundException when no transfer booking linked', async () => {
      mockRepository.findById.mockResolvedValue(
        makeConfirmedEntity({
          status: CarBookingStatus.transferred,
          transferBookings: [], // No linked transfer booking
        }),
      );

      await expect(
        service.updateTransferPricing(
          'original-booking-uuid',
          { compensationAmount: 1200000 },
          'user-1',
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // ============================================================
  // Entity status helpers
  // ============================================================
  describe('CarBookingEntity status helpers', () => {
    it('canBeTransferred() returns false for isTransfer=true bookings', () => {
      const entity = makeConfirmedEntity({ isTransfer: true });
      expect(entity.canBeTransferred()).toBe(false);
    });

    it('canBeTransferred() returns true for confirmed non-transfer bookings', () => {
      const entity = makeConfirmedEntity();
      expect(entity.canBeTransferred()).toBe(true);
    });

    it('canBeCancelled() returns false for completed bookings', () => {
      const entity = makeConfirmedEntity({
        status: CarBookingStatus.completed,
      });
      expect(entity.canBeCancelled()).toBe(false);
    });

    it('canBeCancelled() returns true only for confirmed bookings', () => {
      const confirmed = makeConfirmedEntity();
      const cancelled = makeConfirmedEntity({
        status: CarBookingStatus.cancelled,
      });
      const transferred = makeConfirmedEntity({
        status: CarBookingStatus.transferred,
      });

      expect(confirmed.canBeCancelled()).toBe(true);
      expect(cancelled.canBeCancelled()).toBe(false);
      expect(transferred.canBeCancelled()).toBe(false);
    });

    it('getDebtAmountAsNumber() returns number from Decimal', () => {
      const entity = makeConfirmedEntity({ debtAmount: new Decimal(1500000) });
      expect(entity.getDebtAmountAsNumber()).toBe(1500000);
      expect(typeof entity.getDebtAmountAsNumber()).toBe('number');
    });
  });
});
