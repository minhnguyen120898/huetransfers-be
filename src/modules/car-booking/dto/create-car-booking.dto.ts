import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentCollection, TransportType } from 'generated/prisma';

export class CreateCarBookingDto {
  @ApiPropertyOptional({
    description: 'Travel agency ID (UUID). Omit for direct/walk-in customers.',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  travelAgencyId?: string;

  @ApiProperty({
    description: 'Vehicle type',
    enum: TransportType,
    enumName: 'TransportType',
    example: TransportType.seats_4,
  })
  vehicleType: TransportType;

  @ApiProperty({
    description: 'Service date (ISO 8601 date string)',
    example: '2026-03-15',
  })
  serviceDate: string;

  @ApiProperty({
    description: 'Guest name',
    example: 'Nguyen Van A',
    minLength: 2,
    maxLength: 200,
  })
  guestName: string;

  @ApiPropertyOptional({
    description: 'Guest phone number',
    example: '+84-987-654-321',
    maxLength: 50,
  })
  guestPhone?: string;

  @ApiProperty({
    description: 'Number of guests',
    example: 4,
    minimum: 1,
    maximum: 100,
  })
  guestCount: number;

  @ApiPropertyOptional({
    description: 'Pickup location',
    example: 'Noi Bai Airport, Hanoi',
    maxLength: 500,
  })
  pickupLocation?: string;

  @ApiPropertyOptional({
    description: 'Dropoff location',
    example: 'Hoan Kiem Hotel, Hanoi',
    maxLength: 500,
  })
  dropoffLocation?: string;

  @ApiPropertyOptional({
    description: 'VAT applicable',
    example: false,
    default: false,
  })
  vat?: boolean;

  @ApiProperty({
    description: 'Selling price in VND (what we charge the agency)',
    example: 1500000,
    minimum: 1,
  })
  sellingPrice: number;

  @ApiProperty({
    description:
      'Receiving price in VND (what we collect from the guest). Must be <= sellingPrice.',
    example: 0,
    minimum: 0,
  })
  receivingPrice: number;

  @ApiProperty({
    description: 'Who collects payment from the guest',
    enum: PaymentCollection,
    enumName: 'PaymentCollection',
    example: PaymentCollection.no_collection,
  })
  paymentCollection: PaymentCollection;

  @ApiPropertyOptional({
    description: 'Payment collection notes',
    example: 'Agency will collect at pickup',
    maxLength: 500,
  })
  paymentCollectionNote?: string;

  @ApiPropertyOptional({
    description: 'Additional notes',
    example: 'Airport transfer, flight delayed',
    maxLength: 1000,
  })
  note?: string;

  @ApiPropertyOptional({
    description:
      'Route description for the car booking (e.g. Airport → Hotel → Old Quarter)',
    example: 'Noi Bai Airport → Hoan Kiem Hotel → Old Quarter',
  })
  routes?: string;
}
