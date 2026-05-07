import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCarTransferPricingDto {
  @ApiProperty({
    description: 'New compensation amount in VND we pay the partner',
    example: 1300000,
    minimum: 1,
  })
  compensationAmount: number;

  @ApiPropertyOptional({
    description: 'Reason for adjusting the compensation amount',
    example: 'Agreed revised rate after negotiation',
    maxLength: 500,
  })
  reason?: string;
}
