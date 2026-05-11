import { Test, TestingModule } from '@nestjs/testing';
import { Decimal } from '@prisma/client/runtime/library';
import { CarProfitService } from '../car-profit.service';
import { PrismaService } from 'src/modules/common/provider/prisma.provider';
import { ExpenseService } from 'src/modules/expense/service/expense.service';
import { LoggerService } from 'src/modules/common';

const mockPrisma = {
  carBooking: {
    aggregate: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
  },
};

const mockExpenseService = {
  getSummaryByMonth: jest.fn(),
};

const mockLogger = { info: jest.fn(), error: jest.fn() };

describe('CarProfitService', () => {
  let service: CarProfitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarProfitService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: ExpenseService, useValue: mockExpenseService },
        { provide: LoggerService, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<CarProfitService>(CarProfitService);
    jest.clearAllMocks();
  });

  describe('getCarMonthlyProfitSummary', () => {
    const year = 2026;
    const month = 4;

    beforeEach(() => {
      // Non-compensation bookings (isTransfer=false, status in confirmed/completed/transferred):
      // 3 normal bookings (50_000_000) + 1 original booking that was transferred out (5_000_000)
      // = 4 bookings, 6 guests, 55_000_000 VND gross revenue
      mockPrisma.carBooking.aggregate.mockResolvedValueOnce({
        _count: { id: 4 },
        _sum: {
          sellingPrice: new Decimal('55000000'),
          guestCount: 6,
        },
      });

      // Transfer bookings: 1 transfer
      mockPrisma.carBooking.findMany.mockResolvedValueOnce([
        {
          sellingPrice: new Decimal('5500000'), // compensationAmount
          transferFrom: {
            sellingPrice: new Decimal('5000000'), // originalSellingPrice
          },
        },
      ]);

      // Expense summary
      mockExpenseService.getSummaryByMonth.mockResolvedValueOnce({
        totalAmount: 8000000,
        byCategory: {
          gasoline: 2000000,
          maintenance: 1500000,
          insurance: 3000000,
          bank: 1000000,
          other: 500000,
        },
        expenseCount: 12,
        year,
        month,
      });
    });

    it('returns correct period dates', async () => {
      const result = await service.getCarMonthlyProfitSummary(year, month);
      expect(result.period.startDate).toEqual(new Date(2026, 3, 1));
      expect(result.period.endDate).toEqual(
        new Date(2026, 4, 0, 23, 59, 59, 999),
      );
    });

    it('returns correct booking financials', async () => {
      const result = await service.getCarMonthlyProfitSummary(year, month);
      // grossRevenue includes the original transferred booking (5_000_000) + 3 normal bookings (50_000_000)
      expect(result.bookingFinancials.grossRevenue.toString()).toBe('55000000');
      expect(result.bookingFinancials.bookingCount).toBe(4);
      expect(result.bookingFinancials.guestCount).toBe(6);
    });

    it('calculates transfer deductions correctly', async () => {
      const result = await service.getCarMonthlyProfitSummary(year, month);
      // netTransferCost = 5500000 - 5000000 = 500000
      expect(result.transferFinancials.netTransferCost.toString()).toBe(
        '500000',
      );
      expect(result.transferFinancials.transferCount).toBe(1);
      // transfers array no longer exists on transferFinancials
      expect((result.transferFinancials as any).transfers).toBeUndefined();
    });

    it('calculates revenue after transfer deductions', async () => {
      const result = await service.getCarMonthlyProfitSummary(year, month);
      // transferDeductions = totalCompensationAmount = 5_500_000
      // revenue = grossRevenue(55_000_000) - compensationAmount(5_500_000) = 49_500_000
      // Net effect: we earned 50_000_000 from normal bookings but gave away 5_000_000 original
      // and paid 5_500_000 compensation → net revenue = 50_000_000 - 500_000 extra cost = 49_500_000
      expect(result.bookingFinancials.revenue.toString()).toBe('49500000');
      expect(result.bookingFinancials.transferDeductions.toString()).toBe(
        '5500000',
      );
    });

    it('returns expense financials with category breakdown', async () => {
      const result = await service.getCarMonthlyProfitSummary(year, month);
      expect(result.expenseFinancials.total.toString()).toBe('8000000');
      expect(result.expenseFinancials.byCategory.gasoline.toString()).toBe(
        '2000000',
      );
      expect(result.expenseFinancials.byCategory.maintenance.toString()).toBe(
        '1500000',
      );
      expect(result.expenseFinancials.byCategory.insurance.toString()).toBe(
        '3000000',
      );
      expect(result.expenseFinancials.byCategory.bank.toString()).toBe(
        '1000000',
      );
      expect(result.expenseFinancials.byCategory.other.toString()).toBe(
        '500000',
      );
      expect(result.expenseFinancials.expenseCount).toBe(12);
    });

    it('calculates net profit as revenue minus total expenses', async () => {
      const result = await service.getCarMonthlyProfitSummary(year, month);
      // netProfit = 49500000 - 8000000 = 41500000
      expect(result.bookingFinancials.netProfit.toString()).toBe('41500000');
      expect(result.totalProfit.toString()).toBe('41500000');
    });

    it('handles month with no bookings', async () => {
      mockPrisma.carBooking.aggregate.mockReset();
      mockPrisma.carBooking.findMany.mockReset();
      mockExpenseService.getSummaryByMonth.mockReset();
      mockPrisma.carBooking.aggregate.mockResolvedValueOnce({
        _count: { id: 0 },
        _sum: { sellingPrice: null, guestCount: null },
      });
      mockPrisma.carBooking.findMany.mockResolvedValueOnce([]);
      mockExpenseService.getSummaryByMonth.mockResolvedValueOnce({
        totalAmount: 0,
        byCategory: {
          gasoline: 0,
          maintenance: 0,
          insurance: 0,
          bank: 0,
          other: 0,
        },
        expenseCount: 0,
        year,
        month,
      });

      const result = await service.getCarMonthlyProfitSummary(year, month);
      expect(result.bookingFinancials.grossRevenue.toString()).toBe('0');
      expect(result.totalProfit.toString()).toBe('0');
    });
  });

  describe('getCarTransfers', () => {
    const year = 2026;
    const month = 5;

    const mockTransferRows = [
      {
        bookingCode: 'CB-20260501-TRANSFER',
        sellingPrice: new Decimal('5500000'),
        travelAgency: { name: 'STours' },
        transferFrom: {
          bookingCode: 'CB-20260501-ORIG',
          sellingPrice: new Decimal('5000000'),
        },
      },
      {
        bookingCode: 'CB-20260502-TRANSFER',
        sellingPrice: new Decimal('3300000'),
        travelAgency: { name: 'BTours' },
        transferFrom: {
          bookingCode: 'CB-20260502-ORIG',
          sellingPrice: new Decimal('3000000'),
        },
      },
    ];

    it('returns paginated transfers with correct meta', async () => {
      mockPrisma.carBooking.findMany.mockResolvedValueOnce([
        mockTransferRows[0],
      ]);
      mockPrisma.carBooking.count.mockResolvedValueOnce(2);

      const result = await service.getCarTransfers(year, month, 1, 1);

      expect(result.data).toHaveLength(1);
      expect(result.meta.total).toBe(2);
      expect(result.meta.page).toBe(1);
      expect(result.meta.limit).toBe(1);
    });

    it('maps transfer row fields correctly', async () => {
      mockPrisma.carBooking.findMany.mockResolvedValueOnce([
        mockTransferRows[0],
      ]);
      mockPrisma.carBooking.count.mockResolvedValueOnce(1);

      const result = await service.getCarTransfers(year, month, 1, 10);
      const item = result.data[0];

      expect(item.originalBookingCode).toBe('CB-20260501-ORIG');
      expect(item.transferBookingCode).toBe('CB-20260501-TRANSFER');
      expect(item.partnerAgencyName).toBe('STours');
      expect(item.originalSellingPrice.toString()).toBe('5000000');
      expect(item.compensationAmount.toString()).toBe('5500000');
      expect(item.netCost.toString()).toBe('500000');
    });

    it('returns empty data for a month with no transfers', async () => {
      mockPrisma.carBooking.findMany.mockResolvedValueOnce([]);
      mockPrisma.carBooking.count.mockResolvedValueOnce(0);

      const result = await service.getCarTransfers(year, month, 1, 10);

      expect(result.data).toHaveLength(0);
      expect(result.meta.total).toBe(0);
    });

    it('calculates correct skip for page 2', async () => {
      mockPrisma.carBooking.findMany.mockResolvedValueOnce([
        mockTransferRows[1],
      ]);
      mockPrisma.carBooking.count.mockResolvedValueOnce(2);

      await service.getCarTransfers(year, month, 2, 1);

      expect(mockPrisma.carBooking.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 1, take: 1 }),
      );
    });

    it('handles missing transferFrom gracefully', async () => {
      mockPrisma.carBooking.findMany.mockResolvedValueOnce([
        {
          bookingCode: 'CB-20260503-TRANSFER',
          sellingPrice: new Decimal('4000000'),
          travelAgency: null,
          transferFrom: null,
        },
      ]);
      mockPrisma.carBooking.count.mockResolvedValueOnce(1);

      const result = await service.getCarTransfers(year, month, 1, 10);
      const item = result.data[0];

      expect(item.originalBookingCode).toBe('');
      expect(item.partnerAgencyName).toBe('');
      expect(item.originalSellingPrice.toString()).toBe('0');
    });
  });
});
