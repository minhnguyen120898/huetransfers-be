import { ApiProperty } from '@nestjs/swagger';

export class CarBookingSummaryQueryDto {
  @ApiProperty({
    description: 'Year to filter car bookings',
    example: 2026,
    minimum: 2020,
    maximum: 2100,
  })
  year: number;

  @ApiProperty({
    description: 'Month to filter car bookings (1-12)',
    example: 4,
    minimum: 1,
    maximum: 12,
  })
  month: number;
}
