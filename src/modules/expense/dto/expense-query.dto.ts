import { ApiPropertyOptional } from '@nestjs/swagger';
import { ExpenseCategory } from 'generated/prisma';

export class ExpenseQueryDto {
  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
    minimum: 1,
    default: 1,
  })
  page?: number;

  @ApiPropertyOptional({
    description: 'Items per page',
    example: 10,
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  limit?: number;

  @ApiPropertyOptional({
    description: 'Search by title (case-insensitive)',
    example: 'gasoline',
  })
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by category',
    enum: ExpenseCategory,
    enumName: 'ExpenseCategory',
  })
  category?: ExpenseCategory;

  @ApiPropertyOptional({
    description: 'Filter by year',
    example: 2026,
  })
  year?: number;

  @ApiPropertyOptional({
    description: 'Filter by month (1-12)',
    example: 3,
  })
  month?: number;
}
