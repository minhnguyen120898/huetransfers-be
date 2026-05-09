import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { CarBookingDebtService } from '../car-booking-debt.service';
import { PrismaService, LoggerService } from 'src/modules/common';
import { PaymentStatus } from 'generated/prisma';

const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

const mockAgency = {
  id: 'agency-uuid-1',
  name: 'Hanoi Travel',
  tel: '+84-123-456-789',
  address: '123 Test St, Hanoi',
  isActive: true,
};

const mockAgency2 = {
  id: 'agency-uuid-2',
  name: 'Saigon Travel',
  tel: '+84-987-654-321',
  address: '456 Other St, HCM',
  isActive: true,
};

const mockCarBooking1 = {
  id: 'cb-uuid-1',
  bookingCode: 'CB-20260315-AAAAAAAA',
  serviceDate: new Date('2026-03-15'),
  guestName: 'Nguyen Van A',
  guestPhone: '+84-901-111-111',
  guestCount: 4,
  vehicleType: 'seats_4',
  routes: 'Airport → Hotel → Old Quarter',
  pickupLocation: 'Noi Bai Airport',
  dropoffLocation: 'Hoan Kiem Hotel',
  sellingPrice: new Decimal(1500000),
  receivingPrice: new Decimal(0),
  debtAmount: new Decimal(1500000),
  paymentStatus: PaymentStatus.pending,
  paidAt: null,
  note: null,
};

const mockCarBooking2 = {
  id: 'cb-uuid-2',
  bookingCode: 'CB-20260320-BBBBBBBB',
  serviceDate: new Date('2026-03-20'),
  guestName: 'Tran Thi B',
  guestPhone: null,
  guestCount: 7,
  vehicleType: 'seats_7',
  routes: null,
  pickupLocation: null,
  dropoffLocation: null,
  sellingPrice: new Decimal(2000000),
  receivingPrice: new Decimal(500000),
  debtAmount: new Decimal(1500000),
  paymentStatus: PaymentStatus.completed,
  paidAt: new Date('2026-03-25'),
  note: 'Paid early',
};

// Transfer scenario: original booking transferred from Agency A, compensation for Agency B
const mockOriginalTransferredBooking = {
  id: 'cb-uuid-transferred',
  bookingCode: 'CB-20260315-TRANSFER-ORIG',
  serviceDate: new Date('2026-03-15'),
  guestName: 'Le Van C',
  guestPhone: '+84-902-222-222',
  guestCount: 2,
  vehicleType: 'seats_4',
  routes: 'Airport → Hotel',
  pickupLocation: 'Noi Bai Airport',
  dropoffLocation: 'Old Quarter Hotel',
  sellingPrice: new Decimal(1000000),
  receivingPrice: new Decimal(200000),
  debtAmount: new Decimal(800000), // sellingPrice - receivingPrice
  paymentStatus: PaymentStatus.pending,
  paidAt: null,
  note: null,
};

const mockCompensationBooking = {
  id: 'cb-uuid-compensation',
  bookingCode: 'CB-20260315-TRANSFER-ORIG-TRANSFER',
  serviceDate: new Date('2026-03-15'),
  guestName: '[TRANSFER] Le Van C',
  guestPhone: '+84-902-222-222',
  guestCount: 2,
  vehicleType: 'seats_4',
  routes: 'Airport → Hotel',
  pickupLocation: 'Noi Bai Airport',
  dropoffLocation: 'Old Quarter Hotel',
  sellingPrice: new Decimal(1000000),
  receivingPrice: new Decimal(200000),
  debtAmount: new Decimal(-800000), // NEGATIVE — we owe Agency B
  paymentStatus: PaymentStatus.pending,
  paidAt: null,
  note: '[TRANSFER COMPENSATION]',
};

const mockPrisma = {
  travelAgency: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
  carBooking: {
    aggregate: jest.fn(),
    count: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('CarBookingDebtService', () => {
  let service: CarBookingDebtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarBookingDebtService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: LoggerService, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<CarBookingDebtService>(CarBookingDebtService);
    jest.clearAllMocks();
  });

  // ============================================================
  // getCarBookingDebtListReport()
  // ============================================================
  describe('getCarBookingDebtListReport()', () => {
    it('returns list report with agencies that have bookings', async () => {
      mockPrisma.travelAgency.findMany.mockResolvedValue([
        mockAgency,
        mockAgency2,
      ]);

      // Agency 1: has 2 bookings
      mockPrisma.carBooking.aggregate
        .mockResolvedValueOnce({
          _count: { id: 2 },
          _sum: {
            guestCount: 11,
            sellingPrice: new Decimal(3500000),
            receivingPrice: new Decimal(500000),
            debtAmount: new Decimal(3000000),
          },
        })
        // Agency 2: has no bookings
        .mockResolvedValueOnce({
          _count: { id: 0 },
          _sum: {
            guestCount: null,
            sellingPrice: null,
            receivingPrice: null,
            debtAmount: null,
          },
        });

      // allPaid check for agency 1 (has 1 unpaid)
      mockPrisma.carBooking.count.mockResolvedValueOnce(1);

      const result = await service.getCarBookingDebtListReport(2026, 3);

      expect(result.year).toBe(2026);
      expect(result.month).toBe(3);
      expect(result.agencies).toHaveLength(1); // Only agency with bookings
      expect(result.agencies[0].agency.id).toBe('agency-uuid-1');
      expect(result.agencies[0].summary.totalBookings).toBe(2);
      expect(result.agencies[0].summary.totalGuests).toBe(11);
      expect(result.agencies[0].summary.allPaid).toBe(false);
      expect(result.grandTotal.totalPartners).toBe(1);
      expect(result.grandTotal.totalBookingsOrOperations).toBe(2);
    });

    it('returns empty list when no agencies have bookings', async () => {
      mockPrisma.travelAgency.findMany.mockResolvedValue([mockAgency]);
      mockPrisma.carBooking.aggregate.mockResolvedValue({
        _count: { id: 0 },
        _sum: {
          guestCount: null,
          sellingPrice: null,
          receivingPrice: null,
          debtAmount: null,
        },
      });

      const result = await service.getCarBookingDebtListReport(2026, 1);

      expect(result.agencies).toHaveLength(0);
      expect(result.grandTotal.totalPartners).toBe(0);
      expect(result.grandTotal.totalBookingsOrOperations).toBe(0);
    });

    it('passes search filter to agency query', async () => {
      mockPrisma.travelAgency.findMany.mockResolvedValue([]);
      await service.getCarBookingDebtListReport(2026, 3, undefined, 'Hanoi');

      expect(mockPrisma.travelAgency.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            name: { contains: 'Hanoi', mode: 'insensitive' },
          }),
        }),
      );
    });

    it('applies paymentStatus filter to carBooking queries', async () => {
      mockPrisma.travelAgency.findMany.mockResolvedValue([mockAgency]);
      mockPrisma.carBooking.aggregate.mockResolvedValue({
        _count: { id: 1 },
        _sum: {
          guestCount: 4,
          sellingPrice: new Decimal(1500000),
          receivingPrice: new Decimal(0),
          debtAmount: new Decimal(1500000),
        },
      });
      mockPrisma.carBooking.count.mockResolvedValue(0); // allPaid = true

      await service.getCarBookingDebtListReport(2026, 3, [
        PaymentStatus.pending,
      ]);

      expect(mockPrisma.carBooking.aggregate).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            paymentStatus: { in: [PaymentStatus.pending] },
          }),
        }),
      );
    });

    it('does NOT filter out transfer compensation bookings (isTransfer not in query)', async () => {
      mockPrisma.travelAgency.findMany.mockResolvedValue([mockAgency]);
      mockPrisma.carBooking.aggregate.mockResolvedValue({
        _count: { id: 0 },
        _sum: {
          guestCount: null,
          sellingPrice: null,
          receivingPrice: null,
          debtAmount: null,
        },
      });

      await service.getCarBookingDebtListReport(2026, 3);

      expect(mockPrisma.carBooking.aggregate).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.not.objectContaining({
            isTransfer: expect.anything(),
          }),
        }),
      );
    });

    it('always filters status IN (confirmed, completed, transferred)', async () => {
      mockPrisma.travelAgency.findMany.mockResolvedValue([mockAgency]);
      mockPrisma.carBooking.aggregate.mockResolvedValue({
        _count: { id: 0 },
        _sum: {
          guestCount: null,
          sellingPrice: null,
          receivingPrice: null,
          debtAmount: null,
        },
      });

      await service.getCarBookingDebtListReport(2026, 3);

      expect(mockPrisma.carBooking.aggregate).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            status: { in: ['confirmed', 'completed', 'transferred'] },
          }),
        }),
      );
    });
  });

  // ============================================================
  // getCarBookingDebtDetailReport()
  // ============================================================
  describe('getCarBookingDebtDetailReport()', () => {
    it('returns full detail with booking line items', async () => {
      mockPrisma.travelAgency.findUnique.mockResolvedValue(mockAgency);
      mockPrisma.carBooking.findMany.mockResolvedValue([
        mockCarBooking1,
        mockCarBooking2,
      ]);

      const result = await service.getCarBookingDebtDetailReport(
        2026,
        3,
        'agency-uuid-1',
      );

      expect(result.year).toBe(2026);
      expect(result.month).toBe(3);
      expect(result.agency.agency.id).toBe('agency-uuid-1');
      expect(result.agency.bookings).toHaveLength(2);
      expect(result.agency.summary.totalBookings).toBe(2);
      expect(result.agency.summary.totalGuests).toBe(11); // 4 + 7
    });

    it('calculates totalDebt correctly from line items', async () => {
      mockPrisma.travelAgency.findUnique.mockResolvedValue(mockAgency);
      mockPrisma.carBooking.findMany.mockResolvedValue([
        mockCarBooking1,
        mockCarBooking2,
      ]);

      const result = await service.getCarBookingDebtDetailReport(
        2026,
        3,
        'agency-uuid-1',
      );

      // debtAmount: 1500000 + 1500000 = 3000000
      expect(Number(result.agency.summary.totalDebt)).toBe(3000000);
    });

    it('allPaid = false when at least one booking is unpaid', async () => {
      mockPrisma.travelAgency.findUnique.mockResolvedValue(mockAgency);
      // booking1 is pending, booking2 is completed
      mockPrisma.carBooking.findMany.mockResolvedValue([
        mockCarBooking1,
        mockCarBooking2,
      ]);

      const result = await service.getCarBookingDebtDetailReport(
        2026,
        3,
        'agency-uuid-1',
      );

      expect(result.agency.summary.allPaid).toBe(false);
    });

    it('allPaid = true when all bookings are completed', async () => {
      mockPrisma.travelAgency.findUnique.mockResolvedValue(mockAgency);
      mockPrisma.carBooking.findMany.mockResolvedValue([mockCarBooking2]); // only completed

      const result = await service.getCarBookingDebtDetailReport(
        2026,
        3,
        'agency-uuid-1',
      );

      expect(result.agency.summary.allPaid).toBe(true);
    });

    it('allPaid = true and totalBookings = 0 when no bookings in period', async () => {
      mockPrisma.travelAgency.findUnique.mockResolvedValue(mockAgency);
      mockPrisma.carBooking.findMany.mockResolvedValue([]);

      const result = await service.getCarBookingDebtDetailReport(
        2026,
        3,
        'agency-uuid-1',
      );

      expect(result.agency.summary.totalBookings).toBe(0);
      expect(result.agency.summary.allPaid).toBe(true);
    });

    it('throws NotFoundException when agency does not exist', async () => {
      mockPrisma.travelAgency.findUnique.mockResolvedValue(null);

      await expect(
        service.getCarBookingDebtDetailReport(2026, 3, 'nonexistent-agency'),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws NotFoundException when agency is inactive', async () => {
      mockPrisma.travelAgency.findUnique.mockResolvedValue({
        ...mockAgency,
        isActive: false,
      });

      await expect(
        service.getCarBookingDebtDetailReport(2026, 3, 'agency-uuid-1'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should include routes field in booking line items', async () => {
      mockPrisma.travelAgency.findUnique.mockResolvedValue(mockAgency);
      mockPrisma.carBooking.findMany.mockResolvedValue([mockCarBooking1]);

      const report = await service.getCarBookingDebtDetailReport(
        2026,
        3,
        'agency-uuid-1',
        undefined,
      );

      expect(report.agency.bookings[0].routes).toBe(
        'Airport → Hotel → Old Quarter',
      );
    });

    it('should include previousMonthDebt in the detail report summary', async () => {
      mockPrisma.travelAgency.findUnique.mockResolvedValue(mockAgency);
      mockPrisma.carBooking.findMany.mockResolvedValue([mockCarBooking1]);
      mockPrisma.carBooking.aggregate.mockResolvedValueOnce({
        _sum: { debtAmount: new Decimal(800000) },
      }); // previousMonthDebt aggregate

      const report = await service.getCarBookingDebtDetailReport(
        2026,
        3,
        'agency-uuid-1',
        undefined,
      );

      expect(report.agency.summary.previousMonthDebt?.toString()).toBe(
        '800000',
      );
    });

    it('should return Decimal(0) for previousMonthDebt when no unpaid debt in previous month', async () => {
      mockPrisma.travelAgency.findUnique.mockResolvedValue(mockAgency);
      mockPrisma.carBooking.findMany.mockResolvedValue([]);
      mockPrisma.carBooking.aggregate.mockResolvedValueOnce({
        _sum: { debtAmount: null },
      }); // no previous debt

      const report = await service.getCarBookingDebtDetailReport(
        2026,
        3,
        'agency-uuid-1',
        undefined,
      );

      expect(report.agency.summary.previousMonthDebt?.toString()).toBe('0');
    });

    it('does NOT filter out transfer compensation bookings in detail query', async () => {
      mockPrisma.travelAgency.findUnique.mockResolvedValue(mockAgency);
      mockPrisma.carBooking.findMany.mockResolvedValue([]);
      mockPrisma.carBooking.aggregate.mockResolvedValue({
        _sum: { debtAmount: null },
      });

      await service.getCarBookingDebtDetailReport(2026, 3, 'agency-uuid-1');

      expect(mockPrisma.carBooking.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.not.objectContaining({
            isTransfer: expect.anything(),
          }),
        }),
      );
    });
  });

  // ============================================================
  // Transfer scenario
  // ============================================================
  describe('Transfer scenario — both sides appear in debt report', () => {
    it('Agency A (original): transferred booking appears with positive debtAmount', async () => {
      mockPrisma.travelAgency.findUnique.mockResolvedValue(mockAgency);
      mockPrisma.carBooking.findMany.mockResolvedValue([
        mockOriginalTransferredBooking,
      ]);
      mockPrisma.carBooking.aggregate.mockResolvedValue({
        _sum: { debtAmount: null },
      }); // previousMonthDebt = 0

      const result = await service.getCarBookingDebtDetailReport(
        2026,
        3,
        'agency-uuid-1',
      );

      expect(result.agency.bookings).toHaveLength(1);
      expect(result.agency.bookings[0].bookingCode).toBe(
        'CB-20260315-TRANSFER-ORIG',
      );
      expect(Number(result.agency.summary.totalDebt)).toBe(800000);
    });

    it('Agency B (partner): compensation booking appears with negative debtAmount', async () => {
      mockPrisma.travelAgency.findUnique.mockResolvedValue(mockAgency2);
      mockPrisma.carBooking.findMany.mockResolvedValue([mockCompensationBooking]);
      mockPrisma.carBooking.aggregate.mockResolvedValue({
        _sum: { debtAmount: null },
      }); // previousMonthDebt = 0

      const result = await service.getCarBookingDebtDetailReport(
        2026,
        3,
        'agency-uuid-2',
      );

      expect(result.agency.bookings).toHaveLength(1);
      expect(result.agency.bookings[0].bookingCode).toBe(
        'CB-20260315-TRANSFER-ORIG-TRANSFER',
      );
      expect(Number(result.agency.summary.totalDebt)).toBe(-800000);
    });

    it('list report: Agency B appears when compensation booking is in period', async () => {
      mockPrisma.travelAgency.findMany.mockResolvedValue([mockAgency2]);
      mockPrisma.carBooking.aggregate.mockResolvedValue({
        _count: { id: 1 },
        _sum: {
          guestCount: 2,
          sellingPrice: new Decimal(1000000),
          receivingPrice: new Decimal(200000),
          debtAmount: new Decimal(-800000),
        },
      });
      mockPrisma.carBooking.count.mockResolvedValue(1); // allPaid = false

      const result = await service.getCarBookingDebtListReport(2026, 3);

      expect(result.agencies).toHaveLength(1);
      expect(result.agencies[0].agency.id).toBe('agency-uuid-2');
      expect(Number(result.agencies[0].summary.totalDebt)).toBe(-800000);
    });
  });

  // ============================================================
  // Period range
  // ============================================================
  describe('Period range calculation', () => {
    it('returns correct period for March 2026', async () => {
      mockPrisma.travelAgency.findMany.mockResolvedValue([]);
      const result = await service.getCarBookingDebtListReport(2026, 3);

      expect(result.period.startDate).toEqual(new Date(2026, 2, 1)); // March 1
      expect(result.period.endDate.getMonth()).toBe(2); // March (0-indexed)
      expect(result.period.endDate.getDate()).toBe(31); // Last day of March
    });

    it('handles February correctly', async () => {
      mockPrisma.travelAgency.findMany.mockResolvedValue([]);
      const result = await service.getCarBookingDebtListReport(2026, 2);

      expect(result.period.startDate).toEqual(new Date(2026, 1, 1));
      expect(result.period.endDate.getMonth()).toBe(1); // February
      expect(result.period.endDate.getDate()).toBe(28); // 2026 is not a leap year
    });
  });
});
