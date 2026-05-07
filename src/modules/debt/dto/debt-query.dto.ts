import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentStatus } from 'generated/prisma';

/**
 * Query parameters for debt reports
 *
 * Supports flexible date range queries:
 * - Full calendar month (default)
 * - Custom date ranges (future enhancement)
 * - Payment status filtering (pending, partial, completed)
 */
export class DebtQueryDto {
  @ApiProperty({
    description: 'Year for debt calculation',
    example: 2025,
    minimum: 2000,
    maximum: 2100,
  })
  year: number;

  @ApiProperty({
    description: 'Month for debt calculation (1-12)',
    example: 12,
    minimum: 1,
    maximum: 12,
  })
  month: number;

  @ApiPropertyOptional({
    description: 'Specific partner ID to filter (optional)',
    example: 'uuid-here',
  })
  partnerId?: string;

  @ApiPropertyOptional({
    description:
      'Filter by payment status (can provide multiple statuses as comma-separated values or array). ' +
      'If omitted, returns all records regardless of payment status.',
    enum: PaymentStatus,
    enumName: 'PaymentStatus',
    isArray: true,
    example: ['pending', 'partial'],
  })
  paymentStatus?: PaymentStatus[];

  @ApiPropertyOptional({
    description: 'Search by agency name (case-insensitive, partial match)',
    example: 'Travel Agency',
  })
  search?: string;
}
