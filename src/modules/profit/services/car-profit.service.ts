import { Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/modules/common/provider/prisma.provider';
import { ExpenseService } from 'src/modules/expense/service/expense.service';
import { LoggerService } from 'src/modules/common';
import { CarMonthlyProfitSummary } from '../interfaces';

@Injectable()
export class CarProfitService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly expenseService: ExpenseService,
    private readonly logger: LoggerService,
  ) {}

  async getCarMonthlyProfitSummary(
    year: number,
    month: number,
  ): Promise<CarMonthlyProfitSummary> {
    this.logger.info(
      `[CarProfitService] Calculating car profit summary for ${year}-${month}`,
    );

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);
    const period = { startDate, endDate };

    const [bookingAgg, transferBookings, expenseSummary] = await Promise.all([
      // 1. Aggregate normal (non-transfer) bookings
      this.prisma.carBooking.aggregate({
        where: {
          isTransfer: false,
          status: { in: ['confirmed', 'completed', 'transferred'] },
          serviceDate: { gte: startDate, lte: endDate },
        },
        _count: { id: true },
        _sum: { sellingPrice: true, guestCount: true },
      }),

      // 2. Fetch transfer compensation bookings with their originals
      this.prisma.carBooking.findMany({
        where: {
          isTransfer: true,
          serviceDate: { gte: startDate, lte: endDate },
        },
        select: {
          bookingCode: true,
          sellingPrice: true, // = compensationAmount
          travelAgency: { select: { name: true } },
          transferFrom: {
            select: {
              bookingCode: true,
              sellingPrice: true, // = originalSellingPrice
            },
          },
        },
      }),

      // 3. Get fleet expense summary
      this.expenseService.getSummaryByMonth(year, month),
    ]);

    // Build transfer financials
    const transfers = transferBookings.map((t) => {
      const compensationAmount = new Decimal(t.sellingPrice);
      const originalSellingPrice = new Decimal(
        t.transferFrom?.sellingPrice ?? 0,
      );
      return {
        originalBookingCode: t.transferFrom?.bookingCode ?? '',
        transferBookingCode: t.bookingCode,
        partnerAgencyName: t.travelAgency?.name ?? '',
        originalSellingPrice,
        compensationAmount,
        netCost: compensationAmount.minus(originalSellingPrice),
      };
    });

    const totalOriginalSellingPrice = transfers.reduce(
      (sum, t) => sum.plus(t.originalSellingPrice),
      new Decimal(0),
    );
    const totalCompensationAmount = transfers.reduce(
      (sum, t) => sum.plus(t.compensationAmount),
      new Decimal(0),
    );
    const netTransferCost = totalCompensationAmount.minus(
      totalOriginalSellingPrice,
    );

    // Build booking financials
    const grossRevenue = new Decimal(bookingAgg._sum.sellingPrice ?? 0);
    const transferDeductions = netTransferCost;
    const revenue = grossRevenue.minus(transferDeductions);

    // Build expense financials
    const totalExpenses = new Decimal(expenseSummary.totalAmount);
    const expenseFinancials = {
      total: totalExpenses,
      byCategory: {
        gasoline: new Decimal(expenseSummary.byCategory.gasoline),
        maintenance: new Decimal(expenseSummary.byCategory.maintenance),
        insurance: new Decimal(expenseSummary.byCategory.insurance),
        bank: new Decimal(expenseSummary.byCategory.bank),
        other: new Decimal(expenseSummary.byCategory.other),
      },
      expenseCount: expenseSummary.expenseCount,
    };

    const netProfit = revenue.minus(totalExpenses);

    this.logger.info(
      `[CarProfitService] Car profit summary: grossRevenue=${grossRevenue}, ` +
        `transferDeductions=${transferDeductions}, revenue=${revenue}, ` +
        `expenses=${totalExpenses}, netProfit=${netProfit}`,
    );

    return {
      year,
      month,
      period,
      bookingFinancials: {
        grossRevenue,
        transferDeductions,
        revenue,
        bookingCount: bookingAgg._count.id,
        guestCount: bookingAgg._sum.guestCount ?? 0,
        netProfit,
      },
      transferFinancials: {
        transferCount: transfers.length,
        totalOriginalSellingPrice,
        totalCompensationAmount,
        netTransferCost,
        transfers,
      },
      expenseFinancials,
      totalProfit: netProfit,
    };
  }
}
