import { Decimal } from '@prisma/client/runtime/library';

export interface CarProfitPeriod {
  startDate: Date;
  endDate: Date;
}

export interface CarTransferDetail {
  originalBookingCode: string;
  transferBookingCode: string;
  partnerAgencyName: string;
  originalSellingPrice: Decimal;
  compensationAmount: Decimal;
  netCost: Decimal;
}

export interface CarTransferFinancials {
  transferCount: number;
  totalOriginalSellingPrice: Decimal;
  totalCompensationAmount: Decimal;
  netTransferCost: Decimal;
  // transfers array removed — use GET /profit/car-transfers for detail rows
}

export interface PaginatedCarTransfersMeta {
  total: number;
  page: number;
  limit: number;
}

export interface PaginatedCarTransfers {
  data: CarTransferDetail[];
  meta: PaginatedCarTransfersMeta;
}

export interface CarBookingFinancials {
  grossRevenue: Decimal;
  transferDeductions: Decimal;
  revenue: Decimal;
  bookingCount: number;
  guestCount: number;
  netProfit: Decimal;
}

export interface CarExpenseByCategory {
  gasoline: Decimal;
  maintenance: Decimal;
  insurance: Decimal;
  bank: Decimal;
  other: Decimal;
}

export interface CarExpenseFinancials {
  total: Decimal;
  byCategory: CarExpenseByCategory;
  expenseCount: number;
}

export interface CarMonthlyProfitSummary {
  year: number;
  month: number;
  period: CarProfitPeriod;
  bookingFinancials: CarBookingFinancials;
  transferFinancials: CarTransferFinancials;
  expenseFinancials: CarExpenseFinancials;
  totalProfit: Decimal;
}
