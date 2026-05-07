import { ApiPropertyOptional } from '@nestjs/swagger';
import { ExpenseCategory } from 'generated/prisma';

export class UpdateExpenseDto {
  @ApiPropertyOptional({
    description: 'Expense title',
    example: 'Gasoline refill - March 2026',
    minLength: 2,
    maxLength: 200,
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'Expense amount in VND',
    example: 500000,
    minimum: 1,
  })
  amount?: number;

  @ApiPropertyOptional({
    description: 'Expense category',
    enum: ExpenseCategory,
    enumName: 'ExpenseCategory',
  })
  category?: ExpenseCategory;

  @ApiPropertyOptional({
    description: 'Month (1-12)',
    example: 3,
    minimum: 1,
    maximum: 12,
  })
  month?: number;

  @ApiPropertyOptional({
    description: 'Year',
    example: 2026,
    minimum: 2020,
    maximum: 2100,
  })
  year?: number;

  @ApiPropertyOptional({
    description: 'Additional notes',
    example: 'Fuel for fleet vehicles',
  })
  note?: string;
}
