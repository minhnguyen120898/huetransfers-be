import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  CarBookingStatus,
  PaymentCollection,
  PaymentStatus,
  TransportType,
} from 'generated/prisma';

export class UpdateCarBookingDto {
  @ApiPropertyOptional({
    description: 'Travel agency ID (UUID). Set to null to remove agency.',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    nullable: true,
  })
  travelAgencyId?: string | null;

  @ApiPropertyOptional({
    description: 'Vehicle type',
    enum: TransportType,
    enumName: 'TransportType',
  })
  vehicleType?: TransportType;

  @ApiPropertyOptional({
    description: 'Service date (ISO 8601 date string)',
    example: '2026-03-20',
  })
  serviceDate?: string;

  @ApiPropertyOptional({
    description: 'Guest name',
    example: 'Nguyen Van B',
    minLength: 2,
    maxLength: 200,
  })
  guestName?: string;

  @ApiPropertyOptional({
    description: 'Guest phone number',
    example: '+84-912-345-678',
    nullable: true,
    maxLength: 50,
  })
  guestPhone?: string | null;

  @ApiPropertyOptional({
    description: 'Number of guests',
    example: 2,
    minimum: 1,
    maximum: 100,
  })
  guestCount?: number;

  @ApiPropertyOptional({
    description: 'Pickup location',
    example: 'Da Nang Airport',
    nullable: true,
    maxLength: 500,
  })
  pickupLocation?: string | null;

  @ApiPropertyOptional({
    description: 'Dropoff location',
    example: 'Hoi An Old Town',
    nullable: true,
    maxLength: 500,
  })
  dropoffLocation?: string | null;

  @ApiPropertyOptional({
    description: 'VAT applicable',
    example: true,
  })
  vat?: boolean;

  @ApiPropertyOptional({
    description: 'Selling price in VND',
    example: 2000000,
    minimum: 1,
  })
  sellingPrice?: number;

  @ApiPropertyOptional({
    description: 'Receiving price in VND (must be <= sellingPrice)',
    example: 500000,
    minimum: 0,
  })
  receivingPrice?: number;

  @ApiPropertyOptional({
    description: 'Who collects payment from the guest',
    enum: PaymentCollection,
    enumName: 'PaymentCollection',
  })
  paymentCollection?: PaymentCollection;

  @ApiPropertyOptional({
    description: 'Payment collection notes',
    nullable: true,
    maxLength: 500,
  })
  paymentCollectionNote?: string | null;

  @ApiPropertyOptional({
    description: 'Payment status',
    enum: PaymentStatus,
    enumName: 'PaymentStatus',
  })
  paymentStatus?: PaymentStatus;

  @ApiPropertyOptional({
    description: 'Booking status',
    enum: CarBookingStatus,
    enumName: 'CarBookingStatus',
  })
  status?: CarBookingStatus;

  @ApiPropertyOptional({
    description: 'Additional notes',
    nullable: true,
    maxLength: 1000,
  })
  note?: string | null;

  @ApiPropertyOptional({
    description: 'Route description for the car booking',
    nullable: true,
  })
  routes?: string | null;
}
