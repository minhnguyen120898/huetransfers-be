import { Injectable, NotFoundException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService, LoggerService } from 'src/modules/common';
import { PaymentStatus } from 'generated/prisma';
import { PeriodRange, GrandTotal } from '../interfaces/debt.interface';

// ============================================================
// Internal interfaces — car booking debt (not added to debt.interface.ts)
// ============================================================

export interface CarBookingAgencyInfo {
  id: string;
  name: string;
  tel: string | null;
  address: string | null;
}

export interface CarBookingLineItem {
  id: string;
  bookingCode: string;
  serviceDate: Date;
  guestName: string;
  guestPhone: string | null;
  guestCount: number;
  vehicleType: string;
  routes: string | null;
  pickupLocation: string | null;
  dropoffLocation: string | null;
  sellingPrice: Decimal;
  receivingPrice: Decimal;
  debtAmount: Decimal;
  paymentStatus: string;
  paidAt: Date | null;
  note: string | null;
}

export interface CarBookingDebtSummary {
  totalBookings: number;
  totalGuests: number;
  totalSellingPrice: Decimal;
  totalReceivingPrice: Decimal;
  totalDebt: Decimal;
  previousMonthDebt?: Decimal;
  allPaid: boolean;
}

export interface CarBookingDebtSummaryItem {
  agency: CarBookingAgencyInfo;
  summary: CarBookingDebtSummary;
}

export interface CarBookingDebtDetail extends CarBookingDebtSummaryItem {
  bookings: CarBookingLineItem[];
}

export interface CarBookingDebtListReport {
  year: number;
  month: number;
  period: PeriodRange;
  agencies: CarBookingDebtSummaryItem[];
  grandTotal: GrandTotal;
}

export interface CarBookingDebtDetailReport {
  year: number;
  month: number;
  period: PeriodRange;
  agency: CarBookingDebtDetail;
}

// ============================================================
// Service
// ============================================================

/**
 * Car Booking Debt Service — Real-time Query-based Architecture
 *
 * Calculates receivables from travel agencies for car rental bookings.
 * Completely isolated from the tour booking debt system.
 *
 * QUERY RULES (enforced at query level, never user-configurable):
 * - status IN (confirmed, completed, transferred) → active bookings with debt
 * - serviceDate within period range
 *
 * FINANCIAL MODEL:
 * - debtAmount = sellingPrice - receivingPrice (positive = agency owes us)
 * - Transfer compensation bookings (isTransfer=true) have NEGATIVE debtAmount
 *   — they represent what WE owe the partner agency, and appear under that
 *   partner agency's debt entry in the report.
 */
@Injectable()
export class CarBookingDebtService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Get car booking debt list report (summary only — no line items).
   * Returns all active agencies that have car bookings in the period.
   */
  async getCarBookingDebtListReport(
    year: number,
    month: number,
    paymentStatus?: PaymentStatus[],
    search?: string,
  ): Promise<CarBookingDebtListReport> {
    this.logger.info(
      `[CarBookingDebtService] List report for ${year}-${String(month).padStart(2, '0')}` +
        (paymentStatus ? ` paymentStatus=${paymentStatus.join(',')}` : '') +
        (search ? ` search="${search}"` : ''),
    );

    const period = this.getPeriodRange(year, month);

    const agencies = await this.prisma.travelAgency.findMany({
      where: {
        isActive: true,
        ...(search && {
          name: { contains: search, mode: 'insensitive' },
        }),
      },
      select: { id: true, name: true, tel: true, address: true },
      orderBy: { name: 'asc' },
    });

    const summaries = await Promise.all(
      agencies.map((agency) =>
        this.getAgencySummary(
          agency,
          period.startDate,
          period.endDate,
          paymentStatus,
        ),
      ),
    );

    // Only return agencies that have car bookings in this period
    const agenciesWithBookings = summaries.filter(
      (s) => s.summary.totalBookings > 0,
    );

    const grandTotal = this.calculateGrandTotal(agenciesWithBookings);

    this.logger.info(
      `[CarBookingDebtService] List complete: ${agenciesWithBookings.length} agencies, ` +
        `totalDebt=${grandTotal.totalDebtOrOwed.toString()}`,
    );

    return { year, month, period, agencies: agenciesWithBookings, grandTotal };
  }

  /**
   * Get car booking debt detail report for a specific agency.
   * Returns full booking line items.
   */
  async getCarBookingDebtDetailReport(
    year: number,
    month: number,
    agencyId: string,
    paymentStatus?: PaymentStatus[],
  ): Promise<CarBookingDebtDetailReport> {
    this.logger.info(
      `[CarBookingDebtService] Detail report agency=${agencyId} ${year}-${String(month).padStart(2, '0')}`,
    );

    const period = this.getPeriodRange(year, month);

    const agency = await this.prisma.travelAgency.findUnique({
      where: { id: agencyId },
      select: {
        id: true,
        name: true,
        tel: true,
        address: true,
        isActive: true,
      },
    });

    if (!agency || !agency.isActive) {
      throw new NotFoundException(
        `Agency with ID ${agencyId} not found or inactive`,
      );
    }

    const agencyDetail = await this.getAgencyDetailWithBookings(
      agency,
      period.startDate,
      period.endDate,
      paymentStatus,
    );

    const previousMonthDebt = await this.getPreviousMonthDebt(
      agencyId,
      year,
      month,
    );
    agencyDetail.summary.previousMonthDebt = previousMonthDebt;

    this.logger.info(
      `[CarBookingDebtService] Detail complete for ${agency.name}: ` +
        `${agencyDetail.summary.totalBookings} bookings, ` +
        `totalDebt=${agencyDetail.summary.totalDebt.toString()}`,
    );

    return { year, month, period, agency: agencyDetail };
  }

  // ============================================================
  // Private helpers
  // ============================================================

  /**
   * Build the WHERE clause for car booking debt queries.
   *
   * CRITICAL rules always applied — never configurable by caller:
   * 1. status IN (confirmed, completed, transferred) — active bookings
   * 2. travelAgencyId = agencyId — agency-specific
   * 3. serviceDate within [startDate, endDate]
   *
   * NOTE: isTransfer is NOT filtered here. Transfer compensation bookings
   * (isTransfer=true) appear under the partner agency with a negative debtAmount,
   * which represents what we owe them. This mirrors the tour booking debt service.
   *
   * CarBooking uses serviceDate (not departureDate like tour Booking).
   */
  private buildWhere(
    agencyId: string,
    startDate: Date,
    endDate: Date,
    paymentStatus?: PaymentStatus[],
  ) {
    const where: Record<string, any> = {
      travelAgencyId: agencyId,
      serviceDate: { gte: startDate, lte: endDate },
      status: {
        in: ['confirmed', 'completed', 'transferred'],
      },
    };

    if (paymentStatus && paymentStatus.length > 0) {
      where.paymentStatus = { in: paymentStatus };
    }

    return where;
  }

  private async getAgencySummary(
    agency: CarBookingAgencyInfo,
    startDate: Date,
    endDate: Date,
    paymentStatus?: PaymentStatus[],
  ): Promise<CarBookingDebtSummaryItem> {
    const where = this.buildWhere(agency.id, startDate, endDate, paymentStatus);

    const aggregation = await this.prisma.carBooking.aggregate({
      where,
      _count: { id: true },
      _sum: {
        guestCount: true,
        sellingPrice: true,
        receivingPrice: true,
        debtAmount: true,
      },
    });

    const totalBookings = aggregation._count.id;
    const totalGuests = aggregation._sum.guestCount ?? 0;
    const totalSellingPrice = aggregation._sum.sellingPrice ?? new Decimal(0);
    const totalReceivingPrice =
      aggregation._sum.receivingPrice ?? new Decimal(0);
    const totalDebt = aggregation._sum.debtAmount ?? new Decimal(0);

    let allPaid = true;
    if (totalBookings > 0) {
      const unpaidCount = await this.prisma.carBooking.count({
        where: { ...where, paymentStatus: { not: PaymentStatus.completed } },
      });
      allPaid = unpaidCount === 0;
    }

    return {
      agency,
      summary: {
        totalBookings,
        totalGuests,
        totalSellingPrice,
        totalReceivingPrice,
        totalDebt,
        allPaid,
      },
    };
  }

  private async getAgencyDetailWithBookings(
    agency: CarBookingAgencyInfo,
    startDate: Date,
    endDate: Date,
    paymentStatus?: PaymentStatus[],
  ): Promise<CarBookingDebtDetail> {
    const where = this.buildWhere(agency.id, startDate, endDate, paymentStatus);

    const bookings = await this.prisma.carBooking.findMany({
      where,
      select: {
        id: true,
        bookingCode: true,
        serviceDate: true,
        guestName: true,
        guestPhone: true,
        guestCount: true,
        vehicleType: true,
        routes: true,
        pickupLocation: true,
        dropoffLocation: true,
        sellingPrice: true,
        receivingPrice: true,
        debtAmount: true,
        paymentStatus: true,
        paidAt: true,
        note: true,
      },
      orderBy: { serviceDate: 'asc' },
    });

    const lineItems: CarBookingLineItem[] = bookings.map((b) => ({
      id: b.id,
      bookingCode: b.bookingCode,
      serviceDate: b.serviceDate,
      guestName: b.guestName,
      guestPhone: b.guestPhone,
      guestCount: b.guestCount,
      vehicleType: b.vehicleType,
      routes: b.routes,
      pickupLocation: b.pickupLocation,
      dropoffLocation: b.dropoffLocation,
      sellingPrice: b.sellingPrice,
      receivingPrice: b.receivingPrice,
      debtAmount: b.debtAmount,
      paymentStatus: b.paymentStatus,
      paidAt: b.paidAt,
      note: b.note,
    }));

    const totalBookings = lineItems.length;
    const totalGuests = lineItems.reduce((sum, b) => sum + b.guestCount, 0);
    const totalSellingPrice = lineItems.reduce(
      (sum, b) => sum.add(b.sellingPrice),
      new Decimal(0),
    );
    const totalReceivingPrice = lineItems.reduce(
      (sum, b) => sum.add(b.receivingPrice),
      new Decimal(0),
    );
    const totalDebt = lineItems.reduce(
      (sum, b) => sum.add(b.debtAmount),
      new Decimal(0),
    );
    const allPaid =
      totalBookings > 0
        ? lineItems.every((b) => b.paymentStatus === PaymentStatus.completed)
        : true;

    return {
      agency,
      summary: {
        totalBookings,
        totalGuests,
        totalSellingPrice,
        totalReceivingPrice,
        totalDebt,
        allPaid,
      },
      bookings: lineItems,
    };
  }

  private calculateGrandTotal(
    agencies: CarBookingDebtSummaryItem[],
  ): GrandTotal {
    return {
      totalPartners: agencies.length,
      totalBookingsOrOperations: agencies.reduce(
        (sum, a) => sum + a.summary.totalBookings,
        0,
      ),
      totalPax: agencies.reduce((sum, a) => sum + a.summary.totalGuests, 0),
      totalSellingPrice: agencies.reduce(
        (sum, a) => sum.add(a.summary.totalSellingPrice),
        new Decimal(0),
      ),
      totalDebtOrOwed: agencies.reduce(
        (sum, a) => sum.add(a.summary.totalDebt),
        new Decimal(0),
      ),
    };
  }

  /**
   * Get previous month unpaid car booking debt (PERFORMANCE OPTIMIZED).
   *
   * Queries ONLY the previous month to avoid timeouts with large datasets.
   * Rules: isTransfer=false, status IN (confirmed, completed, transferred).
   * Filters paymentStatus IN (pending, partial) — only unpaid debt counts as opening balance.
   */
  private async getPreviousMonthDebt(
    agencyId: string,
    year: number,
    month: number,
  ): Promise<Decimal> {
    const previousMonth = month === 1 ? 12 : month - 1;
    const previousYear = month === 1 ? year - 1 : year;

    const startOfPreviousMonth = new Date(previousYear, previousMonth - 1, 1);
    const endOfPreviousMonth = new Date(
      previousYear,
      previousMonth,
      0,
      23,
      59,
      59,
      999,
    );

    const aggregation = await this.prisma.carBooking.aggregate({
      where: {
        travelAgencyId: agencyId,
        serviceDate: {
          gte: startOfPreviousMonth,
          lte: endOfPreviousMonth,
        },
        status: { in: ['confirmed', 'completed', 'transferred'] },
        paymentStatus: { in: ['pending', 'partial'] },
      },
      _sum: { debtAmount: true },
    });

    return aggregation._sum.debtAmount || new Decimal(0);
  }

  private getPeriodRange(year: number, month: number): PeriodRange {
    return {
      startDate: new Date(year, month - 1, 1),
      endDate: new Date(year, month, 0, 23, 59, 59, 999),
    };
  }
}
