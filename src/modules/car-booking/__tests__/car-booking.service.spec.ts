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

const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

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
  carBooking: {
    count: jest.fn(),
    updateMany: jest.fn(),
    aggregate: jest.fn(),
    update: jest.fn(),
  },
  $transaction: jest.fn(),
};

function makeEntity(
  overrides: Partial<CarBookingEntity> = {},
): CarBookingEntity {
  const entity = new CarBookingEntity();
  entity.id = 'car-booking-uuid-1';
  entity.bookingCode = 'CB-20260220-A3F9B21C';
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
    name: 'Test Agency',
    tel: null,
    address: null,
  };
  entity.transferBookings = [];
  entity.transferToAgency = null;
  return Object.assign(entity, overrides);
}

describe('CarBookingService', () => {
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

  // ============================================================
  // create()
  // ============================================================
  describe('create()', () => {
    it('creates booking without agency and returns response DTO', async () => {
      const entity = makeEntity({ travelAgencyId: null, travelAgency: null });
      mockRepository.create.mockResolvedValue(entity);

      const result = await service.create(
        {
          vehicleType: TransportType.seats_4,
          serviceDate: '2026-03-15',
          guestName: 'Nguyen Van A',
          guestCount: 4,
          sellingPrice: 1500000,
          receivingPrice: 0,
          paymentCollection: PaymentCollection.no_collection,
        },
        'user-1',
      );

      expect(mockRepository.create).toHaveBeenCalled();
      expect(result.bookingCode).toBe('CB-20260220-A3F9B21C');
      expect(result.debtAmount).toBe(1500000); // Decimal → number
    });

    it('validates agency exists when travelAgencyId is provided', async () => {
      mockPrisma.travelAgency.findUnique.mockResolvedValue({
        id: 'agency-uuid-1',
        name: 'Test Agency',
        isActive: true,
      });
      const entity = makeEntity();
      mockRepository.create.mockResolvedValue(entity);

      const result = await service.create(
        {
          travelAgencyId: 'agency-uuid-1',
          vehicleType: TransportType.seats_4,
          serviceDate: '2026-03-15',
          guestName: 'Nguyen Van A',
          guestCount: 4,
          sellingPrice: 1500000,
          receivingPrice: 0,
          paymentCollection: PaymentCollection.no_collection,
        },
        'user-1',
      );

      expect(mockPrisma.travelAgency.findUnique).toHaveBeenCalledWith({
        where: { id: 'agency-uuid-1' },
      });
      expect(result.id).toBe('car-booking-uuid-1');
    });

    it('throws NotFoundException when agency does not exist', async () => {
      mockPrisma.travelAgency.findUnique.mockResolvedValue(null);

      await expect(
        service.create(
          {
            travelAgencyId: 'nonexistent-agency',
            vehicleType: TransportType.seats_4,
            serviceDate: '2026-03-15',
            guestName: 'Nguyen Van A',
            guestCount: 4,
            sellingPrice: 1500000,
            receivingPrice: 0,
            paymentCollection: PaymentCollection.no_collection,
          },
          'user-1',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws BadRequestException when agency is inactive', async () => {
      mockPrisma.travelAgency.findUnique.mockResolvedValue({
        id: 'agency-uuid-1',
        name: 'Inactive Agency',
        isActive: false,
      });

      await expect(
        service.create(
          {
            travelAgencyId: 'agency-uuid-1',
            vehicleType: TransportType.seats_4,
            serviceDate: '2026-03-15',
            guestName: 'Nguyen Van A',
            guestCount: 4,
            sellingPrice: 1500000,
            receivingPrice: 0,
            paymentCollection: PaymentCollection.no_collection,
          },
          'user-1',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should pass routes field when creating a booking', async () => {
      const dto = {
        vehicleType: TransportType.seats_4,
        serviceDate: '2026-05-01',
        guestName: 'Test Guest',
        guestCount: 2,
        sellingPrice: 1000000,
        receivingPrice: 0,
        paymentCollection: PaymentCollection.no_collection,
        routes: 'Airport → Hotel → Old Quarter',
      };

      const mockBooking = makeEntity({
        routes: 'Airport → Hotel → Old Quarter',
      });

      mockRepository.create.mockResolvedValue(mockBooking);

      await service.create(dto, 'user-id');

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ routes: 'Airport → Hotel → Old Quarter' }),
      );
    });
  });

  // ============================================================
  // findOne()
  // ============================================================
  describe('findOne()', () => {
    it('returns booking when found', async () => {
      mockRepository.findById.mockResolvedValue(makeEntity());
      const result = await service.findOne('car-booking-uuid-1');
      expect(result.id).toBe('car-booking-uuid-1');
      expect(result.sellingPrice).toBe(1500000);
    });

    it('throws NotFoundException when not found', async () => {
      mockRepository.findById.mockResolvedValue(null);
      await expect(service.findOne('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ============================================================
  // findByCode()
  // ============================================================
  describe('findByCode()', () => {
    it('returns booking when found by code', async () => {
      mockRepository.findByCode.mockResolvedValue(makeEntity());
      const result = await service.findByCode('CB-20260220-A3F9B21C');
      expect(result.bookingCode).toBe('CB-20260220-A3F9B21C');
    });

    it('throws NotFoundException when code not found', async () => {
      mockRepository.findByCode.mockResolvedValue(null);
      await expect(service.findByCode('CB-INVALID-CODE')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ============================================================
  // update()
  // ============================================================
  describe('update()', () => {
    it('updates confirmed booking successfully', async () => {
      const existing = makeEntity();
      const updated = makeEntity({ guestName: 'Updated Name' });
      mockRepository.findById.mockResolvedValue(existing);
      mockRepository.update.mockResolvedValue(updated);

      const result = await service.update(
        'car-booking-uuid-1',
        { guestName: 'Updated Name' },
        'user-1',
      );

      expect(result.guestName).toBe('Updated Name');
      expect(mockRepository.update).toHaveBeenCalled();
    });

    it('throws NotFoundException when booking not found', async () => {
      mockRepository.findById.mockResolvedValue(null);
      await expect(
        service.update('nonexistent', { guestName: 'x' }, 'user-1'),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws BadRequestException when booking is cancelled', async () => {
      mockRepository.findById.mockResolvedValue(
        makeEntity({ status: CarBookingStatus.cancelled }),
      );
      await expect(
        service.update('car-booking-uuid-1', { guestName: 'x' }, 'user-1'),
      ).rejects.toThrow(BadRequestException);
    });

    it('throws BadRequestException when booking is transferred', async () => {
      mockRepository.findById.mockResolvedValue(
        makeEntity({ status: CarBookingStatus.transferred }),
      );
      await expect(
        service.update('car-booking-uuid-1', { guestName: 'x' }, 'user-1'),
      ).rejects.toThrow(BadRequestException);
    });

    it('allows updating only note for completed booking', async () => {
      const existing = makeEntity({ status: CarBookingStatus.completed });
      const updated = makeEntity({
        status: CarBookingStatus.completed,
        note: 'Updated note',
      });
      mockRepository.findById.mockResolvedValue(existing);
      mockRepository.update.mockResolvedValue(updated);

      const result = await service.update(
        'car-booking-uuid-1',
        { note: 'Updated note' },
        'user-1',
      );
      expect(result.note).toBe('Updated note');
    });

    it('throws BadRequestException when trying to update non-note field on completed booking', async () => {
      mockRepository.findById.mockResolvedValue(
        makeEntity({ status: CarBookingStatus.completed }),
      );
      await expect(
        service.update('car-booking-uuid-1', { guestName: 'x' }, 'user-1'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  // ============================================================
  // remove() — cancel
  // ============================================================
  describe('remove()', () => {
    it('cancels confirmed booking successfully', async () => {
      const existing = makeEntity();
      const cancelled = makeEntity({ status: CarBookingStatus.cancelled });
      mockRepository.findById.mockResolvedValue(existing);
      mockRepository.update.mockResolvedValue(cancelled);

      const result = await service.remove('car-booking-uuid-1', 'user-1');

      expect(result.status).toBe(CarBookingStatus.cancelled);
      expect(mockRepository.update).toHaveBeenCalledWith(
        'car-booking-uuid-1',
        expect.objectContaining({ status: CarBookingStatus.cancelled }),
      );
    });

    it('throws NotFoundException when booking not found', async () => {
      mockRepository.findById.mockResolvedValue(null);
      await expect(service.remove('nonexistent', 'user-1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws BadRequestException when booking is already completed', async () => {
      mockRepository.findById.mockResolvedValue(
        makeEntity({ status: CarBookingStatus.completed }),
      );
      await expect(
        service.remove('car-booking-uuid-1', 'user-1'),
      ).rejects.toThrow(BadRequestException);
    });

    it('throws BadRequestException when booking is already cancelled', async () => {
      mockRepository.findById.mockResolvedValue(
        makeEntity({ status: CarBookingStatus.cancelled }),
      );
      await expect(
        service.remove('car-booking-uuid-1', 'user-1'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  // ============================================================
  // bulkUpdatePaymentStatus()
  // ============================================================
  describe('bulkUpdatePaymentStatus()', () => {
    it('updates payment status for all matching bookings', async () => {
      mockPrisma.carBooking.count.mockResolvedValue(2);
      mockPrisma.carBooking.updateMany.mockResolvedValue({ count: 2 });

      const result = await service.bulkUpdatePaymentStatus(
        {
          bookingIds: ['id-1', 'id-2'],
          paymentStatus: PaymentStatus.completed,
        },
        'user-1',
      );

      expect(result.count).toBe(2);
      expect(mockPrisma.carBooking.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: { in: ['id-1', 'id-2'] } },
          data: expect.objectContaining({
            paymentStatus: PaymentStatus.completed,
          }),
        }),
      );
    });

    it('throws NotFoundException when some booking IDs are not found', async () => {
      mockPrisma.carBooking.count.mockResolvedValue(1); // Expected 2, found 1
      await expect(
        service.bulkUpdatePaymentStatus(
          {
            bookingIds: ['id-1', 'id-2'],
            paymentStatus: PaymentStatus.completed,
          },
          'user-1',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('sets paidAt to null when status is pending', async () => {
      mockPrisma.carBooking.count.mockResolvedValue(1);
      mockPrisma.carBooking.updateMany.mockResolvedValue({ count: 1 });

      await service.bulkUpdatePaymentStatus(
        { bookingIds: ['id-1'], paymentStatus: PaymentStatus.pending },
        'user-1',
      );

      expect(mockPrisma.carBooking.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ paidAt: null }),
        }),
      );
    });

    it('sets booking status to completed when paymentStatus is completed', async () => {
      mockPrisma.carBooking.count.mockResolvedValue(2);
      mockPrisma.carBooking.updateMany.mockResolvedValue({ count: 2 });

      await service.bulkUpdatePaymentStatus(
        {
          bookingIds: ['id-1', 'id-2'],
          paymentStatus: PaymentStatus.completed,
        },
        'user-1',
      );

      expect(mockPrisma.carBooking.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            paymentStatus: PaymentStatus.completed,
            status: CarBookingStatus.completed,
          }),
        }),
      );
    });

    it('does not change booking status when paymentStatus is not completed', async () => {
      mockPrisma.carBooking.count.mockResolvedValue(1);
      mockPrisma.carBooking.updateMany.mockResolvedValue({ count: 1 });

      await service.bulkUpdatePaymentStatus(
        { bookingIds: ['id-1'], paymentStatus: PaymentStatus.pending },
        'user-1',
      );

      const callArg = mockPrisma.carBooking.updateMany.mock.calls[0][0];
      expect(callArg.data).not.toHaveProperty('status');
    });
  });

  // ============================================================
  // getCountByStatus()
  // ============================================================
  describe('getCountByStatus()', () => {
    it('returns confirmed count from repository', async () => {
      mockRepository.getCountByStatus.mockResolvedValue({
        confirmedCount: 7,
        totalCount: 7,
      });

      const result = await service.getCountByStatus({});

      expect(result.confirmedCount).toBe(7);
      expect(result.totalCount).toBe(7);
    });
  });

  // ============================================================
  // findAll()
  // ============================================================
  describe('findAll()', () => {
    it('returns paginated results mapped to response DTOs', async () => {
      mockRepository.findAll.mockResolvedValue({
        data: [makeEntity(), makeEntity({ id: 'car-booking-uuid-2' })],
        meta: { page: 1, limit: 10, total: 2, totalPages: 1 },
      });

      const result = await service.findAll({ page: 1, limit: 10 });

      expect(result.data).toHaveLength(2);
      expect(result.meta.total).toBe(2);
      expect(result.data[0].sellingPrice).toBe(1500000); // Decimal → number
      expect(result.data[0].debtAmount).toBe(1500000); // Decimal → number
    });
  });

  describe('getSummary', () => {
    const year = 2026;
    const month = 4;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('returns aggregated totals for confirmed/completed/transferred non-transfer bookings', async () => {
      (mockPrisma.carBooking.aggregate as jest.Mock).mockResolvedValue({
        _sum: {
          sellingPrice: new Decimal(15000000),
          receivingPrice: new Decimal(12000000),
          debtAmount: new Decimal(3000000),
        },
        _count: { id: 12 },
      });

      const result = await service.getSummary(year, month);

      expect(result).toEqual({
        totalSellingPrice: 15000000,
        totalReceivingPrice: 12000000,
        totalDebtAmount: 3000000,
        bookingCount: 12,
        filter: { year: 2026, month: 4 },
      });

      expect(mockPrisma.carBooking.aggregate).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            isTransfer: false,
            status: { in: ['confirmed', 'completed', 'transferred'] },
            serviceDate: expect.objectContaining({
              gte: new Date(2026, 3, 1),
              lt: new Date(2026, 4, 1),
            }),
          }),
        }),
      );
    });

    it('returns zeros when no bookings match the period', async () => {
      (mockPrisma.carBooking.aggregate as jest.Mock).mockResolvedValue({
        _sum: {
          sellingPrice: null,
          receivingPrice: null,
          debtAmount: null,
        },
        _count: { id: 0 },
      });

      const result = await service.getSummary(year, month);

      expect(result).toEqual({
        totalSellingPrice: 0,
        totalReceivingPrice: 0,
        totalDebtAmount: 0,
        bookingCount: 0,
        filter: { year: 2026, month: 4 },
      });
    });

    it('passes isTransfer: false to exclude transfer compensation bookings', async () => {
      (mockPrisma.carBooking.aggregate as jest.Mock).mockResolvedValue({
        _sum: { sellingPrice: null, receivingPrice: null, debtAmount: null },
        _count: { id: 0 },
      });

      await service.getSummary(year, month);

      const callArg = (mockPrisma.carBooking.aggregate as jest.Mock).mock
        .calls[0][0];
      expect(callArg.where.isTransfer).toBe(false);
    });

    it('excludes cancelled bookings via status filter', async () => {
      (mockPrisma.carBooking.aggregate as jest.Mock).mockResolvedValue({
        _sum: { sellingPrice: null, receivingPrice: null, debtAmount: null },
        _count: { id: 0 },
      });

      await service.getSummary(year, month);

      const callArg = (mockPrisma.carBooking.aggregate as jest.Mock).mock
        .calls[0][0];
      expect(callArg.where.status.in).not.toContain('cancelled');
      expect(callArg.where.status.in).toContain('confirmed');
      expect(callArg.where.status.in).toContain('completed');
      expect(callArg.where.status.in).toContain('transferred');
    });
  });

  // ============================================================
  // updateOriginalPricing()
  // ============================================================
  describe('updateOriginalPricing()', () => {
    const THIS_MONTH = new Date();
    const serviceDateThisMonth = new Date(
      Date.UTC(THIS_MONTH.getUTCFullYear(), THIS_MONTH.getUTCMonth(), 15),
    );
    const serviceDateLastMonth = new Date(
      Date.UTC(THIS_MONTH.getUTCFullYear(), THIS_MONTH.getUTCMonth() - 1, 15),
    );

    const transferBookingStub = {
      id: 'transfer-booking-uuid-1',
      sellingPrice: new Decimal(2000000), // compensation amount
      receivingPrice: new Decimal(1500000),
      debtAmount: new Decimal(-500000),
      isTransfer: true,
      paymentStatus: PaymentStatus.pending,
    };

    function makeTransferredEntity(
      overrides: Partial<CarBookingEntity> = {},
    ): CarBookingEntity {
      return makeEntity({
        status: CarBookingStatus.transferred,
        serviceDate: serviceDateThisMonth,
        paymentStatus: PaymentStatus.pending,
        sellingPrice: new Decimal(2000000),
        receivingPrice: new Decimal(1500000),
        debtAmount: new Decimal(500000),
        transferBookings: [transferBookingStub as any],
        ...overrides,
      });
    }

    function makeTxMock(originalResult: object, transferResult: object) {
      return jest
        .fn()
        .mockImplementation(async (fn: (tx: any) => Promise<any>) =>
          fn({
            carBooking: {
              update: jest
                .fn()
                .mockResolvedValueOnce(originalResult)
                .mockResolvedValueOnce(transferResult),
            },
          }),
        );
    }

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('throws NotFoundException when booking does not exist', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(
        service.updateOriginalPricing(
          'non-existent-id',
          { sellingPrice: 2500000, receivingPrice: 1800000 },
          'user-1',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws BadRequestException when booking is not transferred', async () => {
      mockRepository.findById.mockResolvedValue(
        makeTransferredEntity({ status: CarBookingStatus.confirmed }),
      );

      await expect(
        service.updateOriginalPricing(
          'car-booking-uuid-1',
          { sellingPrice: 2500000, receivingPrice: 1800000 },
          'user-1',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('throws BadRequestException when service date is in a past month', async () => {
      mockRepository.findById.mockResolvedValue(
        makeTransferredEntity({ serviceDate: serviceDateLastMonth }),
      );

      await expect(
        service.updateOriginalPricing(
          'car-booking-uuid-1',
          { sellingPrice: 2500000, receivingPrice: 1800000 },
          'user-1',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('throws BadRequestException when payment status is completed', async () => {
      mockRepository.findById.mockResolvedValue(
        makeTransferredEntity({ paymentStatus: PaymentStatus.completed }),
      );

      await expect(
        service.updateOriginalPricing(
          'car-booking-uuid-1',
          { sellingPrice: 2500000, receivingPrice: 1800000 },
          'user-1',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('updates sellingPrice, receivingPrice, and recalculates debtAmount', async () => {
      const original = makeTransferredEntity();
      mockRepository.findById.mockResolvedValue(original);

      const updatedOriginalRecord = {
        ...original,
        sellingPrice: new Decimal(2500000),
        receivingPrice: new Decimal(1800000),
        debtAmount: new Decimal(700000),
        travelAgency: original.travelAgency,
        transferBookings: [],
        transferToAgency: null,
      };
      const updatedTransferRecord = {
        ...transferBookingStub,
        receivingPrice: new Decimal(1800000),
        debtAmount: new Decimal(-200000), // -(2000000 - 1800000)
        travelAgency: null,
        transferBookings: [],
        transferToAgency: null,
      };
      mockPrisma.$transaction = makeTxMock(
        updatedOriginalRecord,
        updatedTransferRecord,
      );

      const result = await service.updateOriginalPricing(
        'car-booking-uuid-1',
        {
          sellingPrice: 2500000,
          receivingPrice: 1800000,
          reason: 'Renegotiated',
        },
        'user-1',
      );

      expect(result.originalBooking.sellingPrice).toBe(2500000);
      expect(result.originalBooking.receivingPrice).toBe(1800000);
      expect(result.originalBooking.debtAmount).toBe(700000);
      expect(result.transferBooking.receivingPrice).toBe(1800000);
    });

    it('syncs transfer booking receivingPrice and recalculates its debtAmount', async () => {
      const original = makeTransferredEntity();
      mockRepository.findById.mockResolvedValue(original);

      let capturedOriginalData: any;
      let capturedTransferData: any;

      mockPrisma.$transaction = jest
        .fn()
        .mockImplementation(async (fn: (tx: any) => Promise<any>) =>
          fn({
            carBooking: {
              update: jest
                .fn()
                .mockImplementationOnce(async (args: any) => {
                  capturedOriginalData = args.data;
                  return {
                    ...original,
                    ...args.data,
                    transferBookings: [],
                    travelAgency: null,
                    transferToAgency: null,
                  };
                })
                .mockImplementationOnce(async (args: any) => {
                  capturedTransferData = args.data;
                  return {
                    ...transferBookingStub,
                    ...args.data,
                    transferBookings: [],
                    travelAgency: null,
                    transferToAgency: null,
                  };
                }),
            },
          }),
        );

      await service.updateOriginalPricing(
        'car-booking-uuid-1',
        { sellingPrice: 2000000, receivingPrice: 1800000 },
        'user-1',
      );

      // Original debtAmount = 2000000 - 1800000 = 200000
      expect(capturedOriginalData.debtAmount.toString()).toBe('200000');
      // Transfer receivingPrice must equal new value
      expect(capturedTransferData.receivingPrice.toString()).toBe('1800000');
      // Transfer debtAmount = -(compensationAmount - newReceivingPrice) = -(2000000 - 1800000) = -200000
      expect(capturedTransferData.debtAmount.toString()).toBe('-200000');
    });

    it('appends audit note when original note is null', async () => {
      const original = makeTransferredEntity({ note: null });
      mockRepository.findById.mockResolvedValue(original);

      let capturedOriginalData: any;

      mockPrisma.$transaction = jest
        .fn()
        .mockImplementation(async (fn: (tx: any) => Promise<any>) =>
          fn({
            carBooking: {
              update: jest
                .fn()
                .mockImplementationOnce(async (args: any) => {
                  capturedOriginalData = args.data;
                  return {
                    ...original,
                    ...args.data,
                    transferBookings: [],
                    travelAgency: null,
                    transferToAgency: null,
                  };
                })
                .mockResolvedValueOnce({
                  ...transferBookingStub,
                  transferBookings: [],
                  travelAgency: null,
                  transferToAgency: null,
                }),
            },
          }),
        );

      await service.updateOriginalPricing(
        'car-booking-uuid-1',
        { sellingPrice: 2500000, receivingPrice: 1800000 },
        'user-1',
      );

      expect(capturedOriginalData.note).toContain('[PRICING UPDATE');
      expect(capturedOriginalData.note).toContain('2000000'); // previous sellingPrice
      expect(capturedOriginalData.note).toContain('2500000'); // new sellingPrice
    });

    it('appends audit note to existing note', async () => {
      const original = makeTransferredEntity({ note: 'Some existing note' });
      mockRepository.findById.mockResolvedValue(original);

      let capturedOriginalData: any;

      mockPrisma.$transaction = jest
        .fn()
        .mockImplementation(async (fn: (tx: any) => Promise<any>) =>
          fn({
            carBooking: {
              update: jest
                .fn()
                .mockImplementationOnce(async (args: any) => {
                  capturedOriginalData = args.data;
                  return {
                    ...original,
                    ...args.data,
                    transferBookings: [],
                    travelAgency: null,
                    transferToAgency: null,
                  };
                })
                .mockResolvedValueOnce({
                  ...transferBookingStub,
                  transferBookings: [],
                  travelAgency: null,
                  transferToAgency: null,
                }),
            },
          }),
        );

      await service.updateOriginalPricing(
        'car-booking-uuid-1',
        { sellingPrice: 2500000, receivingPrice: 1800000 },
        'user-1',
      );

      expect(capturedOriginalData.note).toContain('Some existing note');
      expect(capturedOriginalData.note).toContain('[PRICING UPDATE');
    });

    it('throws BadRequestException when transfer booking payment is completed', async () => {
      mockRepository.findById.mockResolvedValue(
        makeTransferredEntity({
          transferBookings: [
            {
              ...transferBookingStub,
              isTransfer: true,
              paymentStatus: PaymentStatus.completed,
            },
          ] as any,
        }),
      );

      await expect(
        service.updateOriginalPricing(
          'car-booking-uuid-1',
          { sellingPrice: 2500000, receivingPrice: 1800000 },
          'user-1',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('throws NotFoundException when no transfer booking exists', async () => {
      mockRepository.findById.mockResolvedValue(
        makeTransferredEntity({ transferBookings: [] }),
      );

      await expect(
        service.updateOriginalPricing(
          'car-booking-uuid-1',
          { sellingPrice: 2500000, receivingPrice: 1800000 },
          'user-1',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('allows receivingPrice = 0 (no_collection) and calculates debtAmount correctly', async () => {
      const original = makeTransferredEntity();
      mockRepository.findById.mockResolvedValue(original);

      let capturedOriginalData: any;
      let capturedTransferData: any;

      mockPrisma.$transaction = jest
        .fn()
        .mockImplementation(async (fn: (tx: any) => Promise<any>) =>
          fn({
            carBooking: {
              update: jest
                .fn()
                .mockImplementationOnce(async (args: any) => {
                  capturedOriginalData = args.data;
                  return {
                    ...original,
                    ...args.data,
                    transferBookings: [],
                    travelAgency: null,
                    transferToAgency: null,
                  };
                })
                .mockImplementationOnce(async (args: any) => {
                  capturedTransferData = args.data;
                  return {
                    ...transferBookingStub,
                    ...args.data,
                    transferBookings: [],
                    travelAgency: null,
                    transferToAgency: null,
                  };
                }),
            },
          }),
        );

      await service.updateOriginalPricing(
        'car-booking-uuid-1',
        { sellingPrice: 2000000, receivingPrice: 0 },
        'user-1',
      );

      // Original: debtAmount = 2000000 - 0 = 2000000
      expect(capturedOriginalData.debtAmount.toString()).toBe('2000000');
      expect(capturedOriginalData.receivingPrice.toString()).toBe('0');
      // Transfer: debtAmount = -(2000000 - 0) = -2000000
      expect(capturedTransferData.receivingPrice.toString()).toBe('0');
      expect(capturedTransferData.debtAmount.toString()).toBe('-2000000');
    });

    it('includes reason in audit note when provided', async () => {
      const original = makeTransferredEntity({ note: null });
      mockRepository.findById.mockResolvedValue(original);

      let capturedOriginalData: any;

      mockPrisma.$transaction = jest
        .fn()
        .mockImplementation(async (fn: (tx: any) => Promise<any>) =>
          fn({
            carBooking: {
              update: jest
                .fn()
                .mockImplementationOnce(async (args: any) => {
                  capturedOriginalData = args.data;
                  return {
                    ...original,
                    ...args.data,
                    transferBookings: [],
                    travelAgency: null,
                    transferToAgency: null,
                  };
                })
                .mockResolvedValueOnce({
                  ...transferBookingStub,
                  transferBookings: [],
                  travelAgency: null,
                  transferToAgency: null,
                }),
            },
          }),
        );

      await service.updateOriginalPricing(
        'car-booking-uuid-1',
        {
          sellingPrice: 2500000,
          receivingPrice: 1800000,
          reason: 'Client renegotiated',
        },
        'user-1',
      );

      expect(capturedOriginalData.note).toContain('Client renegotiated');
    });

    it('asserts transferBooking.debtAmount in response DTO', async () => {
      const original = makeTransferredEntity();
      mockRepository.findById.mockResolvedValue(original);

      const updatedOriginalRecord = {
        ...original,
        sellingPrice: new Decimal(2500000),
        receivingPrice: new Decimal(1800000),
        debtAmount: new Decimal(700000),
        travelAgency: original.travelAgency,
        transferBookings: [],
        transferToAgency: null,
      };
      const updatedTransferRecord = {
        ...transferBookingStub,
        receivingPrice: new Decimal(1800000),
        debtAmount: new Decimal(-200000),
        travelAgency: null,
        transferBookings: [],
        transferToAgency: null,
      };
      mockPrisma.$transaction = makeTxMock(
        updatedOriginalRecord,
        updatedTransferRecord,
      );

      const result = await service.updateOriginalPricing(
        'car-booking-uuid-1',
        { sellingPrice: 2500000, receivingPrice: 1800000 },
        'user-1',
      );

      expect(result.transferBooking.debtAmount).toBe(-200000);
    });
  });
});
