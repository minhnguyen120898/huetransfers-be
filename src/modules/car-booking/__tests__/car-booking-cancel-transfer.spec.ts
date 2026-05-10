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
const mockPrisma = {
  travelAgency: { findUnique: jest.fn() },
  carBooking: { count: jest.fn(), updateMany: jest.fn(), aggregate: jest.fn() },
  $transaction: jest.fn(),
};

/** Build a CarBookingEntity with sensible defaults — override as needed. */
function makeEntity(
  overrides: Partial<CarBookingEntity> = {},
): CarBookingEntity {
  const entity = new CarBookingEntity();
  entity.id = 'original-id';
  entity.bookingCode = 'CB-20260510-ORIG';
  entity.travelAgencyId = 'agency-1';
  entity.vehicleType = TransportType.seats_4;
  // serviceDate is in the CURRENT month (UTC) so the same-month guard passes by default
  const now = new Date();
  entity.serviceDate = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 15),
  );
  entity.guestName = 'Nguyen Van A';
  entity.guestPhone = '+84-987-000-001';
  entity.guestCount = 2;
  entity.pickupLocation = 'Airport';
  entity.dropoffLocation = 'Hotel';
  entity.vat = false;
  entity.sellingPrice = new Decimal(1_000_000);
  entity.receivingPrice = new Decimal(0);
  entity.debtAmount = new Decimal(1_000_000);
  entity.paymentCollection = PaymentCollection.no_collection;
  entity.paymentCollectionNote = null;
  entity.paymentStatus = PaymentStatus.pending;
  entity.paidAt = null;
  entity.status = CarBookingStatus.transferred;
  entity.note = null;
  entity.routes = null;
  entity.isTransfer = false;
  entity.transferFromId = null;
  entity.transferToAgencyId = 'agency-2';
  entity.transferReason = 'Guest request';
  entity.transferredAt = new Date();
  entity.createdAt = new Date();
  entity.updatedAt = new Date();
  entity.createdById = 'user-1';
  entity.updatedById = 'user-1';
  entity.travelAgency = {
    id: 'agency-1',
    name: 'Agency One',
    tel: null,
    address: null,
  };
  entity.transferToAgency = { id: 'agency-2', name: 'Agency Two', tel: null };
  // Default: one compensation booking linked
  entity.transferBookings = [
    {
      id: 'compensation-id',
      bookingCode: 'CB-20260510-ORIG-TRANSFER',
      status: CarBookingStatus.confirmed,
      paymentStatus: PaymentStatus.pending,
      debtAmount: new Decimal(-1_000_000),
      sellingPrice: new Decimal(1_000_000),
      receivingPrice: new Decimal(0),
      isTransfer: true,
      transferToAgencyId: 'agency-2',
      transferToAgency: { id: 'agency-2', name: 'Agency Two', tel: null },
    },
  ];
  return Object.assign(entity, overrides);
}

describe('CarBookingService.cancelTransfer()', () => {
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

  // ─── Happy path ─────────────────────────────────────────────────────────────

  it('cancels both original and compensation booking in a transaction', async () => {
    const original = makeEntity();
    mockRepository.findById.mockResolvedValue(original);

    const cancelledOriginal = {
      ...original,
      status: CarBookingStatus.cancelled,
    };
    const cancelledComp = {
      ...original.transferBookings![0],
      status: CarBookingStatus.cancelled,
      travelAgency: {
        id: 'agency-2',
        name: 'Agency Two',
        tel: null,
        address: null,
      },
      transferBookings: [],
      transferToAgency: null,
    };

    mockPrisma.$transaction.mockImplementation(async (fn: any) =>
      fn({
        carBooking: {
          update: jest
            .fn()
            .mockResolvedValueOnce(cancelledOriginal)
            .mockResolvedValueOnce(cancelledComp),
        },
      }),
    );

    const result = await service.cancelTransfer('original-id', 'user-1');

    expect(mockPrisma.$transaction).toHaveBeenCalledTimes(1);
    expect(result.originalBooking.status).toBe(CarBookingStatus.cancelled);
    expect(result.compensationBooking.status).toBe(CarBookingStatus.cancelled);
  });

  // ─── Guard 1: booking not found ─────────────────────────────────────────────

  it('throws NotFoundException when booking does not exist', async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(
      service.cancelTransfer('no-such-id', 'user-1'),
    ).rejects.toThrow(NotFoundException);
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });

  // ─── Guard 2: wrong status ───────────────────────────────────────────────────

  it('throws BadRequestException when booking status is confirmed (not transferred)', async () => {
    const original = makeEntity({ status: CarBookingStatus.confirmed });
    mockRepository.findById.mockResolvedValue(original);

    await expect(
      service.cancelTransfer('original-id', 'user-1'),
    ).rejects.toThrow(BadRequestException);
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });

  it('throws BadRequestException when booking status is already cancelled', async () => {
    const original = makeEntity({ status: CarBookingStatus.cancelled });
    mockRepository.findById.mockResolvedValue(original);

    await expect(
      service.cancelTransfer('original-id', 'user-1'),
    ).rejects.toThrow(BadRequestException);
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });

  // ─── Guard 3: same-month guard ───────────────────────────────────────────────

  it('throws BadRequestException when serviceDate is in a past month', async () => {
    // serviceDate is 3 months ago — past month guard must block it
    const pastDate = new Date();
    pastDate.setUTCMonth(pastDate.getUTCMonth() - 3);
    const original = makeEntity({ serviceDate: pastDate });
    mockRepository.findById.mockResolvedValue(original);

    await expect(
      service.cancelTransfer('original-id', 'user-1'),
    ).rejects.toThrow(BadRequestException);
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });

  // ─── Guard 4: original payment completed ─────────────────────────────────────

  it('throws BadRequestException when original booking paymentStatus is completed', async () => {
    const original = makeEntity({ paymentStatus: PaymentStatus.completed });
    mockRepository.findById.mockResolvedValue(original);

    await expect(
      service.cancelTransfer('original-id', 'user-1'),
    ).rejects.toThrow(BadRequestException);
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });

  // ─── Guard 5: no compensation booking found ───────────────────────────────────

  it('throws BadRequestException when no compensation booking is linked', async () => {
    const original = makeEntity({ transferBookings: [] });
    mockRepository.findById.mockResolvedValue(original);

    await expect(
      service.cancelTransfer('original-id', 'user-1'),
    ).rejects.toThrow(BadRequestException);
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });

  // ─── Guard 6: compensation payment completed ──────────────────────────────────

  it('throws BadRequestException when compensation booking paymentStatus is completed', async () => {
    const original = makeEntity();
    original.transferBookings = [
      {
        ...original.transferBookings![0],
        paymentStatus: PaymentStatus.completed,
      },
    ];
    mockRepository.findById.mockResolvedValue(original);

    await expect(
      service.cancelTransfer('original-id', 'user-1'),
    ).rejects.toThrow(BadRequestException);
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });
});
