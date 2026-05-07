import { Decimal } from '@prisma/client/runtime/library';

/**
 * Common debt query parameters for date range filtering
 */
export interface DebtQueryParams {
  year: number;
  month: number;
}

/**
 * Period date range
 */
export interface PeriodRange {
  startDate: Date;
  endDate: Date;
}

/**
 * Base partner information
 */
export interface PartnerInfo {
  id: string;
  name: string;
  tel: string | null;
}

/**
 * Agency-specific partner information
 */
export interface AgencyInfo extends PartnerInfo {
  address: string | null;
}

/**
 * Guide-specific partner information
 */
export interface GuideInfo extends PartnerInfo {
  language: string | null;
}

/**
 * Booking detail for agency debt report
 */
export interface BookingDetail {
  id: string;
  bookingCode: string;
  departureDate: Date;
  guestName: string;
  pickupLocation: string;
  dropoffLocation: string;
  guestPhone: string | null;
  adultCount: number;
  childCount: number;
  totalPax: number;
  // Per-person pricing (for Excel export display)
  adultPrice: Decimal;
  childPrice: Decimal;
  sellingPrice: Decimal;
  receivingPrice: Decimal;
  debtAmount: Decimal;
  status: string;
  tourName: string;
  tourGroupType: string | null;
  paymentStatus: string;
  paidAt: Date | null; // When agency paid us
  note: string;
}

/**
 * Operation detail for guide/restaurant/transport debt report
 */
export interface OperationDetail {
  id: string;
  serviceDate: Date;
  dayNumber: number | null;
  cost: Decimal;
  paymentStatus: string; // Payment status (pending, partial, completed)
  paidAt: Date | null; // When partner was paid
  tourName: string;
  totalPax: number;
  bookingCodes: string[];
  note: string | null;
  seats?: string | null; // Transport vehicle seat capacity (e.g., "4", "7", "16", "29", "45")
}

/**
 * Payment record detail
 */
export interface PaymentDetail {
  id: string;
  amount: Decimal;
  paymentDate: Date;
  paymentMethod: string | null;
  referenceNumber: string | null;
  note: string | null;
}

/**
 * Agency debt summary
 */
export interface AgencyDebtSummary {
  totalBookings: number;
  totalPax: number;
  totalSellingPrice: Decimal;
  totalReceivingPrice: Decimal;
  totalDebt: Decimal;
  previousMonthDebt?: Decimal; // Optional: Unpaid debt from previous month only (performance optimized)
  allPaid: boolean; // Indicates if all bookings have been fully paid (paymentStatus === 'completed')
}

/**
 * Guide debt summary
 */
export interface GuideDebtSummary {
  totalOperations: number;
  totalPax: number;
  totalAmountOwed: Decimal;
}

/**
 * Restaurant debt summary
 */
export interface RestaurantDebtSummary {
  totalOperations: number;
  totalPax: number;
  totalAmountOwed: Decimal;
}

/**
 * Transport debt summary
 */
export interface TransportDebtSummary {
  totalOperations: number;
  totalPax: number;
  totalAmountOwed: Decimal;
}

/**
 * Agency debt summary item (for list view - no bookings)
 */
export interface AgencyDebtSummaryItem {
  agency: AgencyInfo;
  summary: AgencyDebtSummary;
}

/**
 * Agency debt detail (for detail view - includes bookings)
 */
export interface AgencyDebtDetail extends AgencyDebtSummaryItem {
  bookings: BookingDetail[];
}

/**
 * Guide debt summary item (for list view - no operations)
 */
export interface GuideDebtSummaryItem {
  guide: GuideInfo;
  summary: GuideDebtSummary;
}

/**
 * Guide debt detail (for detail view - includes operations)
 */
export interface GuideDebtDetail extends GuideDebtSummaryItem {
  operations: OperationDetail[];
}

/**
 * Restaurant debt summary item (for list view - no operations)
 */
export interface RestaurantDebtSummaryItem {
  restaurant: PartnerInfo;
  summary: RestaurantDebtSummary;
}

/**
 * Restaurant debt detail (for detail view - includes operations)
 */
export interface RestaurantDebtDetail extends RestaurantDebtSummaryItem {
  operations: OperationDetail[];
}

/**
 * Transport debt summary item (for list view - no operations)
 */
export interface TransportDebtSummaryItem {
  transportProvider: PartnerInfo;
  summary: TransportDebtSummary;
}

/**
 * Transport debt detail (for detail view - includes operations)
 */
export interface TransportDebtDetail extends TransportDebtSummaryItem {
  operations: OperationDetail[];
}

/**
 * Grand total summary across all partners of a type
 */
export interface GrandTotal {
  totalPartners: number;
  totalBookingsOrOperations: number;
  totalPax: number;
  totalDebtOrOwed: Decimal;
  totalSellingPrice?: Decimal; // Optional: Only for agency debts (total revenue)
}

/**
 * Agency debt list report (summary only, no bookings)
 */
export interface AgencyDebtListReport {
  year: number;
  month: number;
  period: PeriodRange;
  agencies: AgencyDebtSummaryItem[];
  grandTotal: GrandTotal;
}

/**
 * Agency debt detail report (single agency with bookings)
 */
export interface AgencyDebtDetailReport {
  year: number;
  month: number;
  period: PeriodRange;
  agency: AgencyDebtDetail;
}

/**
 * Guide debt list report (summary only, no operations)
 */
export interface GuideDebtListReport {
  year: number;
  month: number;
  period: PeriodRange;
  guides: GuideDebtSummaryItem[];
  grandTotal: GrandTotal;
}

/**
 * Guide debt detail report (single guide with operations)
 */
export interface GuideDebtDetailReport {
  year: number;
  month: number;
  period: PeriodRange;
  guide: GuideDebtDetail;
}

/**
 * Restaurant debt list report (summary only, no operations)
 */
export interface RestaurantDebtListReport {
  year: number;
  month: number;
  period: PeriodRange;
  restaurants: RestaurantDebtSummaryItem[];
  grandTotal: GrandTotal;
}

/**
 * Restaurant debt detail report (single restaurant with operations)
 */
export interface RestaurantDebtDetailReport {
  year: number;
  month: number;
  period: PeriodRange;
  restaurant: RestaurantDebtDetail;
}

/**
 * Transport debt list report (summary only, no operations)
 */
export interface TransportDebtListReport {
  year: number;
  month: number;
  period: PeriodRange;
  transportProviders: TransportDebtSummaryItem[];
  grandTotal: GrandTotal;
}

/**
 * Transport debt detail report (single transport with operations)
 */
export interface TransportDebtDetailReport {
  year: number;
  month: number;
  period: PeriodRange;
  transportProvider: TransportDebtDetail;
}

/**
 * Receivables summary (money others owe us)
 */
export interface ReceivablesSummary {
  totalPartners: number;
  totalBookings: number;
  totalPax: number;
  totalSellingPrice: Decimal; // Total revenue (what we charge agencies)
  totalDebt: Decimal; // Outstanding debt (sellingPrice - receivingPrice)
}

/**
 * Payables summary for a specific partner type (money we owe)
 */
export interface PayablePartnerSummary {
  totalPartners: number;
  totalOperations: number;
  totalPax: number;
  totalAmountOwed: Decimal;
}

/**
 * Other costs summary (miscellaneous costs not assigned to specific partners)
 */
export interface OtherCostsSummary {
  totalOperations: number; // Count of operations with other costs
  totalAmountOwed: Decimal; // Sum of totalOtherCosts
}

/**
 * All payables summary (money we owe to guides, restaurants, transports, and other costs)
 */
export interface PayablesSummary {
  guides: PayablePartnerSummary;
  restaurants: PayablePartnerSummary;
  transports: PayablePartnerSummary;
  others: OtherCostsSummary; // NEW: Other costs not assigned to specific partners
  totalPayables: Decimal;
}

/**
 * Individual transfer detail for profit summary transparency
 */
export interface TransferDetail {
  originalBookingCode: string;
  transferBookingCode: string;
  partnerAgencyName: string;
  originalSellingPrice: Decimal;
  compensationAmount: Decimal;
  netCost: Decimal; // compensationAmount - originalSellingPrice (positive = we paid more)
}

/**
 * Transfer booking summary for a given period
 * Shows the financial impact of bookings transferred to partner agencies
 */
export interface TransferBookingSummary {
  transferCount: number;
  totalOriginalSellingPrice: Decimal;
  totalCompensationAmount: Decimal;
  netTransferCost: Decimal; // totalCompensationAmount - totalOriginalSellingPrice
  transfers: TransferDetail[];
}

/**
 * Monthly total debt summary report
 * Aggregates all debt types: agencies (receivables), guides, restaurants, transports, and other costs (payables)
 */
export interface MonthlyTotalDebtSummary {
  year: number;
  month: number;
  period: PeriodRange;
  receivables: ReceivablesSummary;
  payables: PayablesSummary;
  netPosition: Decimal; // receivables.totalDebt - payables.totalPayables
  transferSummary: TransferBookingSummary;
}
