import { ApiProperty } from '@nestjs/swagger';

class CarProfitPeriodDto {
  @ApiProperty({ example: '2026-04-01T00:00:00.000Z' })
  startDate: Date;

  @ApiProperty({ example: '2026-04-30T23:59:59.999Z' })
  endDate: Date;
}

class CarTransferFinancialsDto {
  @ApiProperty({ example: 2 })
  transferCount: number;

  @ApiProperty({ example: '10000000' })
  totalOriginalSellingPrice: string;

  @ApiProperty({ example: '11000000' })
  totalCompensationAmount: string;

  @ApiProperty({
    description: 'totalCompensationAmount - totalOriginalSellingPrice',
    example: '1000000',
  })
  netTransferCost: string;
}

class CarBookingFinancialsDto {
  @ApiProperty({
    description: 'SUM(sellingPrice) of non-transfer bookings',
    example: '50000000',
  })
  grossRevenue: string;

  @ApiProperty({
    description: 'Net cost of transfer deductions',
    example: '1000000',
  })
  transferDeductions: string;

  @ApiProperty({
    description: 'grossRevenue - transferDeductions',
    example: '49000000',
  })
  revenue: string;

  @ApiProperty({ example: 15 })
  bookingCount: number;

  @ApiProperty({ example: 30 })
  guestCount: number;

  @ApiProperty({ description: 'revenue - totalExpenses', example: '41000000' })
  netProfit: string;
}

class CarExpenseByCategoryDto {
  @ApiProperty({ example: '2000000' })
  gasoline: string;

  @ApiProperty({ example: '1500000' })
  maintenance: string;

  @ApiProperty({ example: '3000000' })
  insurance: string;

  @ApiProperty({ example: '1000000' })
  bank: string;

  @ApiProperty({ example: '500000' })
  other: string;
}

class CarExpenseFinancialsDto {
  @ApiProperty({ example: '8000000' })
  total: string;

  @ApiProperty({ type: CarExpenseByCategoryDto })
  byCategory: CarExpenseByCategoryDto;

  @ApiProperty({ example: 12 })
  expenseCount: number;
}

export class CarMonthlyProfitSummaryResponseDto {
  @ApiProperty({ example: 2026 })
  year: number;

  @ApiProperty({ example: 4 })
  month: number;

  @ApiProperty({ type: CarProfitPeriodDto })
  period: CarProfitPeriodDto;

  @ApiProperty({ type: CarBookingFinancialsDto })
  bookingFinancials: CarBookingFinancialsDto;

  @ApiProperty({ type: CarTransferFinancialsDto })
  transferFinancials: CarTransferFinancialsDto;

  @ApiProperty({ type: CarExpenseFinancialsDto })
  expenseFinancials: CarExpenseFinancialsDto;

  @ApiProperty({
    description: '= bookingFinancials.netProfit',
    example: '41000000',
  })
  totalProfit: string;
}
