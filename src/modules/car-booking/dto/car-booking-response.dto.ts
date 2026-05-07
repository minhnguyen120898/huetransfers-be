import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  CarBookingStatus,
  PaymentCollection,
  PaymentStatus,
  TransportType,
} from 'generated/prisma';

export class CarBookingResponseDto {
  @ApiProperty({
    description: 'Car booking ID (UUID)',
    example: 'a1b2c3d4-...',
  })
  id: string;

  @ApiProperty({ description: 'Booking code', example: 'CB-20260220-A3F9B21C' })
  bookingCode: string;

  @ApiPropertyOptional({ description: 'Travel agency ID', nullable: true })
  travelAgencyId: string | null;

  @ApiPropertyOptional({
    description: 'Travel agency details',
    nullable: true,
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      tel: { type: 'string', nullable: true },
      address: { type: 'string', nullable: true },
    },
  })
  travelAgency: {
    id: string;
    name: string;
    tel: string | null;
    address: string | null;
  } | null;

  @ApiProperty({
    description: 'Vehicle type',
    enum: TransportType,
    enumName: 'TransportType',
  })
  vehicleType: TransportType;

  @ApiProperty({
    description: 'Service date',
    example: '2026-03-15T00:00:00.000Z',
  })
  serviceDate: Date;

  @ApiProperty({ description: 'Guest name', example: 'Nguyen Van A' })
  guestName: string;

  @ApiPropertyOptional({ description: 'Guest phone', nullable: true })
  guestPhone: string | null;

  @ApiProperty({ description: 'Number of guests', example: 4 })
  guestCount: number;

  @ApiPropertyOptional({ description: 'Pickup location', nullable: true })
  pickupLocation: string | null;

  @ApiPropertyOptional({ description: 'Dropoff location', nullable: true })
  dropoffLocation: string | null;

  @ApiProperty({ description: 'VAT applicable', example: false })
  vat: boolean;

  @ApiProperty({ description: 'Selling price in VND', example: 1500000 })
  sellingPrice: number;

  @ApiProperty({ description: 'Receiving price in VND', example: 0 })
  receivingPrice: number;

  @ApiProperty({
    description: 'Debt amount in VND (sellingPrice - receivingPrice)',
    example: 1500000,
  })
  debtAmount: number;

  @ApiProperty({
    description: 'Who collects payment',
    enum: PaymentCollection,
    enumName: 'PaymentCollection',
  })
  paymentCollection: PaymentCollection;

  @ApiPropertyOptional({
    description: 'Payment collection notes',
    nullable: true,
  })
  paymentCollectionNote: string | null;

  @ApiProperty({
    description: 'Payment status',
    enum: PaymentStatus,
    enumName: 'PaymentStatus',
    example: PaymentStatus.pending,
  })
  paymentStatus: PaymentStatus;

  @ApiPropertyOptional({
    description: 'Date payment was collected',
    nullable: true,
  })
  paidAt: Date | null;

  @ApiProperty({
    description: 'Booking status',
    enum: CarBookingStatus,
    enumName: 'CarBookingStatus',
    example: CarBookingStatus.confirmed,
  })
  status: CarBookingStatus;

  @ApiPropertyOptional({ description: 'Additional notes', nullable: true })
  note: string | null;

  @ApiPropertyOptional({ description: 'Route description', nullable: true })
  routes: string | null;

  @ApiProperty({
    description: 'Whether this is a transfer compensation booking',
    example: false,
  })
  isTransfer: boolean;

  @ApiPropertyOptional({
    description: 'ID of the original booking this compensates',
    nullable: true,
  })
  transferFromId: string | null;

  @ApiPropertyOptional({
    description: 'ID of the partner agency receiving the transfer',
    nullable: true,
  })
  transferToAgencyId: string | null;

  @ApiPropertyOptional({ description: 'Reason for transfer', nullable: true })
  transferReason: string | null;

  @ApiPropertyOptional({
    description: 'When the transfer was made',
    nullable: true,
  })
  transferredAt: Date | null;

  @ApiProperty({
    description: 'Transfer compensation bookings linked to this booking',
    type: 'array',
  })
  transferBookings: any[];

  @ApiPropertyOptional({
    description: 'Partner agency receiving the transfer',
    nullable: true,
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      tel: { type: 'string', nullable: true },
    },
  })
  transferToAgency: { id: string; name: string; tel: string | null } | null;

  @ApiProperty({
    description: 'Created at',
    example: '2026-02-20T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Updated at',
    example: '2026-02-20T00:00:00.000Z',
  })
  updatedAt: Date;
}
