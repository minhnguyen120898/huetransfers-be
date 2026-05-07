import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO for updating a travel agency
 * All fields are optional - at least one must be provided
 */
export class UpdateTravelAgencyDTO {
  @ApiPropertyOptional({
    description: 'Agency name',
    example: 'Sunrise Travel Agency',
    minLength: 2,
    maxLength: 255,
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Contact telephone number',
    example: '+84-987-654-321',
    maxLength: 50,
  })
  tel?: string;

  @ApiPropertyOptional({
    description: 'Agency address',
    example: '123 Main Street, Hanoi, Vietnam',
  })
  address?: string;

  @ApiPropertyOptional({
    description: 'Additional notes about the agency',
    example: 'Primary partner for northern region tours',
  })
  note?: string;

  @ApiPropertyOptional({
    description: 'Whether the agency is active',
    example: true,
  })
  isActive?: boolean;
}
