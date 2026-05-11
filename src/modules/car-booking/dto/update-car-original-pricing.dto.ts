import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCarOriginalPricingDto {
  @ApiProperty({
    description: 'New selling price in VND (what the client pays)',
    example: 2500000,
    minimum: 1,
  })
  sellingPrice: number;

  @ApiProperty({
    description: 'New receiving price in VND (what the agency pays us)',
    example: 1800000,
    minimum: 1,
  })
  receivingPrice: number;

  @ApiPropertyOptional({
    description: 'Reason for adjusting the pricing',
    example: 'Client renegotiated rate after service',
    maxLength: 500,
  })
  reason?: string;
}
