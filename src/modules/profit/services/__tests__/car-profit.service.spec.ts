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
      // Normal bookings aggregate: 3 bookings, 6 guests, 50_000_000 VND
      mockPrisma.carBooking.aggregate.mockResolvedValueOnce({
        _count: { id: 3 },
        _sum: {
          sellingPrice: new Decimal('50000000'),
          guestCount: 6,
        },
      });

      // Transfer bookings: 1 transfer
      mockPrisma.carBooking.findMany.mockResolvedValueOnce([
        {
          bookingCode: 'CAR-20260401-0001-TRANSFER',
          sellingPrice: new Decimal('5500000'), // compensationAmount
          travelAgency: { name: 'STours' },
          transferFrom: {
            bookingCode: 'CAR-20260401-0001',
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
      expect(result.bookingFinancials.grossRevenue.toString()).toBe('50000000');
      expect(result.bookingFinancials.bookingCount).toBe(3);
      expect(result.bookingFinancials.guestCount).toBe(6);
    });

    it('calculates transfer deductions correctly', async () => {
      const result = await service.getCarMonthlyProfitSummary(year, month);
      // netTransferCost = 5500000 - 5000000 = 500000
      expect(result.transferFinancials.netTransferCost.toString()).toBe(
        '500000',
      );
      expect(result.transferFinancials.transferCount).toBe(1);
      expect(result.transferFinancials.transfers).toHaveLength(1);
      expect(result.transferFinancials.transfers[0].partnerAgencyName).toBe(
        'STours',
      );
    });

    it('calculates revenue after transfer deductions', async () => {
      const result = await service.getCarMonthlyProfitSummary(year, month);
      // revenue = 50000000 - 500000 = 49500000
      expect(result.bookingFinancials.revenue.toString()).toBe('49500000');
      expect(result.bookingFinancials.transferDeductions.toString()).toBe(
        '500000',
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
});
