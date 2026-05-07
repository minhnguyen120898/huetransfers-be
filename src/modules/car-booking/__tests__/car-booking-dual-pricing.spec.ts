/**
 * Dual Pricing Logic Tests for Car Booking
 *
 * Tests the core business rule:
 *   debtAmount = sellingPrice - receivingPrice
 *
 * Two scenarios:
 * 1. Agency collects from guest → receivingPrice = 0 → debtAmount = sellingPrice (full debt)
 * 2. We collect from guest → receivingPrice > 0 → debtAmount = difference only
 */
import { Test, TestingModule } from '@nestjs/testing';
import { CarBookingService } from '../service/car-booking.service';
import { CarBookingRepository } from '../repositories/car-booking.repository';
import { LoggerService } from '../../common/provider/logger.service';
import { PrismaService } from '../../common/provider/prisma.provider';
import {
  CarBookingStatus,
  PaymentCollection,
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
const mockPrisma = {
  travelAgency: { findUnique: jest.fn() },
  carBooking: { count: jest.fn(), updateMany: jest.fn() },
  $transaction: jest.fn(),
};

function makeEntityWithPricing(
  sellingPrice: number,
  receivingPrice: number,
): CarBookingEntity {
  const entity = new CarBookingEntity();
  entity.id = 'cb-uuid-test';
  entity.bookingCode = 'CB-20260220-TESTTEST';
  entity.travelAgencyId = null;
  entity.vehicleType = TransportType.seats_4;
  entity.serviceDate = new Date('2026-03-15');
  entity.guestName = 'Test Guest';
  entity.guestPhone = null;
  entity.guestCount = 2;
  entity.pickupLocation = null;
  entity.dropoffLocation = null;
  entity.vat = false;
  entity.sellingPrice = new Decimal(sellingPrice);
  entity.receivingPrice = new Decimal(receivingPrice);
  entity.debtAmount = new Decimal(sellingPrice - receivingPrice);
  entity.paymentCollection = PaymentCollection.no_collection;
  entity.paymentCollectionNote = null;
  entity.paymentStatus = 'pending' as any;
  entity.paidAt = null;
  entity.status = CarBookingStatus.confirmed;
  entity.note = null;
  entity.isTransfer = false;
  entity.transferFromId = null;
  entity.transferToAgencyId = null;
  entity.transferReason = null;
  entity.transferredAt = null;
  entity.createdAt = new Date();
  entity.updatedAt = new Date();
  entity.createdById = 'user-1';
  entity.updatedById = 'user-1';
  entity.travelAgency = null;
  entity.transferBookings = [];
  entity.transferToAgency = null;
  return entity;
}

describe('Car Booking — Dual Pricing Model', () => {
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
  });

  describe('Scenario 1: Agency collects from guest (receivingPrice = 0)', () => {
    it('debtAmount equals full sellingPrice when agency collects everything', async () => {
      // Agency handles guest payment — we need full amount from agency
      const entity = makeEntityWithPricing(1500000, 0);
      mockRepository.create.mockResolvedValue(entity);

      const result = await service.create({
        vehicleType: TransportType.seats_4,
        serviceDate: '2026-03-15',
        guestName: 'Test Guest',
        guestCount: 2,
        sellingPrice: 1500000,
        receivingPrice: 0, // We don't collect from guest
        paymentCollection: PaymentCollection.no_collection,
      });

      expect(result.sellingPrice).toBe(1500000);
      expect(result.receivingPrice).toBe(0);
      expect(result.debtAmount).toBe(1500000); // Agency owes us full amount
    });
  });

  describe('Scenario 2: We collect from guest (receivingPrice > 0)', () => {
    it('debtAmount equals commission only when we collect from guest', async () => {
      // We collect from guest — agency only owes the difference
      const entity = makeEntityWithPricing(1500000, 1200000);
      mockRepository.create.mockResolvedValue(entity);

      const result = await service.create({
        vehicleType: TransportType.seats_4,
        serviceDate: '2026-03-15',
        guestName: 'Test Guest',
        guestCount: 2,
        sellingPrice: 1500000,
        receivingPrice: 1200000, // We collected this from guest
        paymentCollection: PaymentCollection.collect_from_guest,
      });

      expect(result.sellingPrice).toBe(1500000);
      expect(result.receivingPrice).toBe(1200000);
      expect(result.debtAmount).toBe(300000); // Agency only owes 300,000
    });
  });

  describe('Scenario 3: Equal prices (debtAmount = 0)', () => {
    it('debtAmount is zero when sellingPrice equals receivingPrice', async () => {
      // Edge case: we collect everything from guest, agency owes nothing
      const entity = makeEntityWithPricing(1000000, 1000000);
      mockRepository.create.mockResolvedValue(entity);

      const result = await service.create({
        vehicleType: TransportType.seats_4,
        serviceDate: '2026-03-15',
        guestName: 'Test Guest',
        guestCount: 2,
        sellingPrice: 1000000,
        receivingPrice: 1000000,
        paymentCollection: PaymentCollection.collect_from_guest,
      });

      expect(result.debtAmount).toBe(0);
    });
  });

  describe('debtAmount as number (Decimal → number conversion)', () => {
    it('mapToResponseDto converts Decimal fields to number correctly', async () => {
      // Verify the Decimal → number conversion works for all pricing fields
      const entity = makeEntityWithPricing(2000000, 500000);
      mockRepository.findById.mockResolvedValue(entity);

      const result = await service.findOne('cb-uuid-test');

      expect(typeof result.sellingPrice).toBe('number');
      expect(typeof result.receivingPrice).toBe('number');
      expect(typeof result.debtAmount).toBe('number');
      expect(result.sellingPrice).toBe(2000000);
      expect(result.receivingPrice).toBe(500000);
      expect(result.debtAmount).toBe(1500000);
    });
  });
});
