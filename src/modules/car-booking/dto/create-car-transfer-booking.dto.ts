import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCarTransferBookingDto {
  @ApiProperty({
    description: 'Partner agency ID to transfer to',
    example: 'b2c3d4e5-f6a7-8901-bcde-f23456789012',
  })
  partnerAgencyId: string;

  @ApiPropertyOptional({
    description:
      'Compensation amount in VND we pay the partner. Defaults to original sellingPrice.',
    example: 1200000,
    minimum: 1,
  })
  compensationAmount?: number;

  @ApiProperty({
    description: 'Reason for transfer',
    example: 'Vehicle breakdown — rerouted to partner',
    minLength: 5,
    maxLength: 500,
  })
  reason: string;
}
