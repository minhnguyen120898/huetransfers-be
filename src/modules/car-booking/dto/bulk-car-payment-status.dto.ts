import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from 'generated/prisma';

export class BulkCarPaymentStatusDto {
  @ApiProperty({
    description: 'Array of car booking IDs to update',
    example: ['a1b2c3d4-...', 'b2c3d4e5-...'],
    type: [String],
    minItems: 1,
  })
  bookingIds: string[];

  @ApiProperty({
    description: 'New payment status to apply to all bookings',
    enum: PaymentStatus,
    enumName: 'PaymentStatus',
    example: PaymentStatus.completed,
  })
  paymentStatus: PaymentStatus;
}
