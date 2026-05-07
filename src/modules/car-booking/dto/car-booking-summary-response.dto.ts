import { ApiProperty } from '@nestjs/swagger';

export class CarBookingSummaryResponseDto {
  @ApiProperty({
    description: 'Sum of sellingPrice across all matched bookings',
    example: 15000000,
    type: Number,
  })
  totalSellingPrice: number;

  @ApiProperty({
    description: 'Sum of receivingPrice across all matched bookings',
    example: 12000000,
    type: Number,
  })
  totalReceivingPrice: number;

  @ApiProperty({
    description: 'Sum of debtAmount across all matched bookings',
    example: 3000000,
    type: Number,
  })
  totalDebtAmount: number;

  @ApiProperty({
    description: 'Number of matched bookings',
    example: 12,
  })
  bookingCount: number;

  @ApiProperty({
    description: 'Filter parameters used',
    example: { year: 2026, month: 4 },
  })
  filter: {
    year: number;
    month: number;
  };
}
