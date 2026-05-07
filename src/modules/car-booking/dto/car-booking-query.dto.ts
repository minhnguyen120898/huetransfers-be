import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  CarBookingStatus,
  PaymentStatus,
  TransportType,
} from 'generated/prisma';

export class CarBookingQueryDto {
  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
    default: 1,
    minimum: 1,
  })
  page?: number;

  @ApiPropertyOptional({
    description: 'Items per page',
    example: 10,
    default: 10,
    minimum: 1,
    maximum: 100,
  })
  limit?: number;

  @ApiPropertyOptional({
    description: 'Search by booking code or guest name',
    example: 'CB-20260220',
  })
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by travel agency ID',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  travelAgencyId?: string;

  @ApiPropertyOptional({
    description: 'Filter by vehicle type',
    enum: TransportType,
    enumName: 'TransportType',
  })
  vehicleType?: TransportType;

  @ApiPropertyOptional({
    description: 'Filter by booking status',
    enum: CarBookingStatus,
    enumName: 'CarBookingStatus',
  })
  status?: CarBookingStatus;

  @ApiPropertyOptional({
    description: 'Service date range start (ISO 8601)',
    example: '2026-03-01',
  })
  serviceDateFrom?: string;

  @ApiPropertyOptional({
    description: 'Service date range end (ISO 8601)',
    example: '2026-03-31',
  })
  serviceDateTo?: string;

  @ApiPropertyOptional({
    description: 'Filter by payment status',
    enum: PaymentStatus,
    enumName: 'PaymentStatus',
  })
  paymentStatus?: PaymentStatus;
}
