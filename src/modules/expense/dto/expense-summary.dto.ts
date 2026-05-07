import { ApiProperty } from '@nestjs/swagger';

class ExpenseByCategoryDto {
  @ApiProperty({
    description: 'Total gasoline expenses in VND',
    example: 2000000,
  })
  gasoline: number;

  @ApiProperty({
    description: 'Total maintenance expenses in VND',
    example: 1500000,
  })
  maintenance: number;

  @ApiProperty({
    description: 'Total insurance expenses in VND',
    example: 3000000,
  })
  insurance: number;

  @ApiProperty({
    description: 'Total bank loan/interest expenses in VND',
    example: 1000000,
  })
  bank: number;

  @ApiProperty({ description: 'Total other expenses in VND', example: 500000 })
  other: number;
}

export class ExpenseSummaryDto {
  @ApiProperty({
    description: 'Total expense amount across all categories in VND',
    example: 7000000,
  })
  totalAmount: number;

  @ApiProperty({ description: 'Breakdown by category' })
  byCategory: ExpenseByCategoryDto;

  @ApiProperty({ description: 'Total number of expense records', example: 12 })
  expenseCount: number;

  @ApiProperty({ description: 'Year', example: 2026 })
  year: number;

  @ApiProperty({ description: 'Month (1-12)', example: 3 })
  month: number;
}
