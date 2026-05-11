import { Injectable } from '@nestjs/common';
import { CarBookingStatus } from 'generated/prisma';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/modules/common/provider/prisma.provider';
import { ExpenseService } from 'src/modules/expense/service/expense.service';
import { LoggerService } from 'src/modules/common';
import {
  CarMonthlyProfitSummary,
  CarTransferDetail,
  PaginatedCarTransfers,
} from '../interfaces';

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

    const transferWhere = {
      isTransfer: true,
      status: { notIn: [CarBookingStatus.cancelled] },
      serviceDate: { gte: startDate, lte: endDate },
    };

    const [bookingAgg, transferRows, expenseSummary] = await Promise.all([
      this.prisma.carBooking.aggregate({
        where: {
          isTransfer: false,
          status: { in: ['confirmed', 'completed', 'transferred'] },
          serviceDate: { gte: startDate, lte: endDate },
        },
        _count: { id: true },
        _sum: { sellingPrice: true, guestCount: true },
      }),

      // Minimal select — price fields only, no codes or agency names
      this.prisma.carBooking.findMany({
        where: transferWhere,
        select: {
          sellingPrice: true,
          transferFrom: { select: { sellingPrice: true } },
        },
      }),

      this.expenseService.getSummaryByMonth(year, month),
    ]);

    const transferCount = transferRows.length;
    const totalCompensationAmount = transferRows.reduce(
      (sum, t) => sum.plus(new Decimal(t.sellingPrice)),
      new Decimal(0),
    );
    const totalOriginalSellingPrice = transferRows.reduce(
      (sum, t) => sum.plus(new Decimal(t.transferFrom?.sellingPrice ?? 0)),
      new Decimal(0),
    );
    const netTransferCost = totalCompensationAmount.minus(
      totalOriginalSellingPrice,
    );

    const grossRevenue = new Decimal(bookingAgg._sum.sellingPrice ?? 0);
    const transferDeductions = totalCompensationAmount;
    const revenue = grossRevenue.minus(transferDeductions);

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
        transferCount,
        totalOriginalSellingPrice,
        totalCompensationAmount,
        netTransferCost,
      },
      expenseFinancials,
      totalProfit: netProfit,
    };
  }

  async getCarTransfers(
    year: number,
    month: number,
    page: number,
    limit: number,
  ): Promise<PaginatedCarTransfers> {
    this.logger.info(
      `[CarProfitService] Fetching transfer list for ${year}-${month} page=${page} limit=${limit}`,
    );

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const where = {
      isTransfer: true,
      status: { notIn: [CarBookingStatus.cancelled] },
      serviceDate: { gte: startDate, lte: endDate },
    };

    const [rows, total] = await Promise.all([
      this.prisma.carBooking.findMany({
        where,
        select: {
          bookingCode: true,
          sellingPrice: true,
          travelAgency: { select: { name: true } },
          transferFrom: {
            select: {
              bookingCode: true,
              sellingPrice: true,
            },
          },
        },
        orderBy: { serviceDate: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.carBooking.count({ where }),
    ]);

    const data: CarTransferDetail[] = rows.map((t) => {
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

    return {
      data,
      meta: { total, page, limit },
    };
  }
}
