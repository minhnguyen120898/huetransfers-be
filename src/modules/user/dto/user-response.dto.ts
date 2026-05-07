import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from 'generated/prisma';

export class UserResponseDTO {
  @ApiProperty({
    description: 'Unique user identifier (UUID)',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
    format: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  fullName: string;

  @ApiPropertyOptional({
    description: 'User telephone number',
    example: '+84-987-654-321',
    nullable: true,
  })
  tel: string | null;

  @ApiPropertyOptional({
    description: 'URL to user avatar image',
    example: 'https://example.com/avatars/johndoe.jpg',
    nullable: true,
  })
  avatarUrl: string | null;

  @ApiProperty({
    description: 'User role in the system',
    enum: UserRole,
    enumName: 'UserRole',
    example: UserRole.user,
  })
  role: UserRole;

  @ApiProperty({
    description: 'Whether the user account is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Whether the user email has been verified',
    example: false,
  })
  emailVerified: boolean;

  @ApiProperty({
    description: 'Date and time when the user was created',
    example: '2025-01-15T10:30:00Z',
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the user was last updated',
    example: '2025-01-15T10:30:00Z',
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;

  @ApiPropertyOptional({
    description: 'Date and time of the last login',
    example: '2025-01-15T10:30:00Z',
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  lastLogin: Date | null;
}
