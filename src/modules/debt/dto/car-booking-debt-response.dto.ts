import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================
// Shared sub-DTOs
// ============================================================

export class CarBookingAgencyInfoDto {
  @ApiProperty({ description: 'Agency ID (UUID)', example: 'a1b2c3d4-...' })
  id: string;

  @ApiProperty({ description: 'Agency name', example: 'Hanoi Travel' })
  name: string;

  @ApiPropertyOptional({ description: 'Agency phone', nullable: true })
  tel: string | null;

  @ApiPropertyOptional({ description: 'Agency address', nullable: true })
  address: string | null;
}

export class CarBookingDebtSummaryDto {
  @ApiProperty({ description: 'Total number of car bookings', example: 8 })
  totalBookings: number;

  @ApiProperty({ description: 'Total guests across all bookings', example: 32 })
  totalGuests: number;

  @ApiProperty({ description: 'Total selling price (VND)', example: 12000000 })
  totalSellingPrice: any; // Decimal serialized as number in response

  @ApiProperty({ description: 'Total receiving price (VND)', example: 0 })
  totalReceivingPrice: any;

  @ApiProperty({
    description:
      'Total debt owed by agency = sum(sellingPrice - receivingPrice)',
    example: 12000000,
  })
  totalDebt: any;

  @ApiProperty({
    description: 'Whether all bookings have been fully paid',
    example: false,
  })
  allPaid: boolean;
}

export class CarBookingLineItemDto {
  @ApiProperty({
    description: 'Car booking ID (UUID)',
    example: 'a1b2c3d4-...',
  })
  id: string;

  @ApiProperty({ description: 'Booking code', example: 'CB-20260220-A3F9B21C' })
  bookingCode: string;

  @ApiProperty({
    description: 'Service date',
    example: '2026-03-15T00:00:00.000Z',
  })
  serviceDate: Date;

  @ApiProperty({ description: 'Guest name', example: 'Nguyen Van A' })
  guestName: string;

  @ApiPropertyOptional({ description: 'Guest phone', nullable: true })
  guestPhone: string | null;

  @ApiProperty({ description: 'Number of guests', example: 4 })
  guestCount: number;

  @ApiProperty({ description: 'Vehicle type', example: 'seats_4' })
  vehicleType: string;

  @ApiPropertyOptional({ description: 'Pickup location', nullable: true })
  pickupLocation: string | null;

  @ApiPropertyOptional({ description: 'Dropoff location', nullable: true })
  dropoffLocation: string | null;

  @ApiProperty({ description: 'Selling price (VND)', example: 1500000 })
  sellingPrice: any;

  @ApiProperty({ description: 'Receiving price (VND)', example: 0 })
  receivingPrice: any;

  @ApiProperty({ description: 'Debt amount (VND)', example: 1500000 })
  debtAmount: any;

  @ApiProperty({ description: 'Payment status', example: 'pending' })
  paymentStatus: string;

  @ApiPropertyOptional({
    description: 'Date payment was completed',
    nullable: true,
  })
  paidAt: Date | null;

  @ApiPropertyOptional({ description: 'Notes', nullable: true })
  note: string | null;
}

export class CarBookingDebtSummaryItemDto {
  @ApiProperty({ type: CarBookingAgencyInfoDto })
  agency: CarBookingAgencyInfoDto;

  @ApiProperty({ type: CarBookingDebtSummaryDto })
  summary: CarBookingDebtSummaryDto;
}

export class CarBookingDebtDetailDto {
  @ApiProperty({ type: CarBookingAgencyInfoDto })
  agency: CarBookingAgencyInfoDto;

  @ApiProperty({ type: CarBookingDebtSummaryDto })
  summary: CarBookingDebtSummaryDto;

  @ApiProperty({ type: [CarBookingLineItemDto] })
  bookings: CarBookingLineItemDto[];
}

export class CarBookingDebtGrandTotalDto {
  @ApiProperty({
    description: 'Number of agencies with car bookings',
    example: 5,
  })
  totalPartners: number;

  @ApiProperty({
    description: 'Total car bookings across all agencies',
    example: 40,
  })
  totalBookingsOrOperations: number;

  @ApiProperty({
    description: 'Total guests across all bookings',
    example: 160,
  })
  totalPax: number;

  @ApiProperty({
    description: 'Total selling price across all agencies (VND)',
    example: 60000000,
  })
  totalSellingPrice: any;

  @ApiProperty({
    description: 'Total debt owed to us (VND)',
    example: 60000000,
  })
  totalDebtOrOwed: any;
}

export class CarBookingPeriodDto {
  @ApiProperty({ example: '2026-03-01T00:00:00.000Z' })
  startDate: Date;

  @ApiProperty({ example: '2026-03-31T23:59:59.999Z' })
  endDate: Date;
}

// ============================================================
// Top-level report DTOs
// ============================================================

export class CarBookingDebtListReportResponseDto {
  @ApiProperty({ description: 'Report year', example: 2026 })
  year: number;

  @ApiProperty({ description: 'Report month (1-12)', example: 3 })
  month: number;

  @ApiProperty({ type: CarBookingPeriodDto })
  period: CarBookingPeriodDto;

  @ApiProperty({ type: [CarBookingDebtSummaryItemDto] })
  agencies: CarBookingDebtSummaryItemDto[];

  @ApiProperty({ type: CarBookingDebtGrandTotalDto })
  grandTotal: CarBookingDebtGrandTotalDto;
}

export class CarBookingDebtDetailReportResponseDto {
  @ApiProperty({ description: 'Report year', example: 2026 })
  year: number;

  @ApiProperty({ description: 'Report month (1-12)', example: 3 })
  month: number;

  @ApiProperty({ type: CarBookingPeriodDto })
  period: CarBookingPeriodDto;

  @ApiProperty({ type: CarBookingDebtDetailDto })
  agency: CarBookingDebtDetailDto;
}
