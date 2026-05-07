import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO for travel agency API responses
 * Excludes sensitive internal fields
 */
export class TravelAgencyResponseDTO {
  @ApiProperty({
    description: 'Agency unique identifier',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Agency name',
    example: 'Sunrise Travel Agency',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Contact telephone number',
    example: '+84-987-654-321',
  })
  tel: string | null;

  @ApiPropertyOptional({
    description: 'Agency address',
    example: '123 Main Street, Hanoi, Vietnam',
  })
  address: string | null;

  @ApiPropertyOptional({
    description: 'Additional notes about the agency',
    example: 'Primary partner for northern region tours',
  })
  note: string | null;

  @ApiProperty({
    description: 'Whether the agency is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Agency creation timestamp',
    example: '2025-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Agency last update timestamp',
    example: '2025-01-15T10:30:00.000Z',
  })
  updatedAt: Date;
}
