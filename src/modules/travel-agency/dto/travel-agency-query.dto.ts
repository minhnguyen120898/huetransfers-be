import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO for querying travel agencies with pagination and filters
 */
export class TravelAgencyQueryDTO {
  @ApiPropertyOptional({
    description: 'Page number (starts from 1)',
    example: 1,
    minimum: 1,
    default: 1,
  })
  page?: number;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10,
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  limit?: number;

  @ApiPropertyOptional({
    description: 'Search term for name (case-insensitive)',
    example: 'sunrise',
  })
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by active status',
    example: true,
  })
  isActive?: boolean;
}
