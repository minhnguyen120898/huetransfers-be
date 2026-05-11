import { ApiProperty } from '@nestjs/swagger';

export class CarTransferQueryDto {
  @ApiProperty({
    description: 'Year to query',
    example: 2026,
    minimum: 2020,
    maximum: 2100,
  })
  year: number;

  @ApiProperty({
    description: 'Month to query (1-12)',
    example: 5,
    minimum: 1,
    maximum: 12,
  })
  month: number;

  @ApiProperty({
    description: 'Page number (1-based)',
    example: 1,
    minimum: 1,
    default: 1,
    required: false,
  })
  page: number;

  @ApiProperty({
    description: 'Items per page (1-100)',
    example: 10,
    minimum: 1,
    maximum: 100,
    default: 10,
    required: false,
  })
  limit: number;
}
