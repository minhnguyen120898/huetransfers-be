import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ExpenseCategory } from 'generated/prisma';

export class ExpenseResponseDto {
  @ApiProperty({ description: 'Expense ID (UUID)', example: 'a1b2c3d4-...' })
  id: string;

  @ApiProperty({ description: 'Expense title', example: 'Gasoline refill' })
  title: string;

  @ApiProperty({ description: 'Amount in VND', example: 500000 })
  amount: number;

  @ApiProperty({
    description: 'Expense category',
    enum: ExpenseCategory,
    enumName: 'ExpenseCategory',
    example: ExpenseCategory.gasoline,
  })
  category: ExpenseCategory;

  @ApiProperty({ description: 'Month (1-12)', example: 3 })
  month: number;

  @ApiProperty({ description: 'Year', example: 2026 })
  year: number;

  @ApiPropertyOptional({ description: 'Notes', example: 'Fleet vehicles' })
  note: string | null;

  @ApiProperty({ description: 'Active status', example: true })
  isActive: boolean;

  @ApiProperty({
    description: 'Created at',
    example: '2026-03-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Updated at',
    example: '2026-03-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
