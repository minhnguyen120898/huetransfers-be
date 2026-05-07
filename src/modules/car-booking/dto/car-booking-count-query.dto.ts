import { ApiPropertyOptional } from '@nestjs/swagger';

export class CarBookingCountQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by travel agency ID',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  travelAgencyId?: string;

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
}
