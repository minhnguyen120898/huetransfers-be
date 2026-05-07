import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'generated/prisma';

/**
 * User data returned after authentication
 */
export class UserResponseDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  fullName: string;

  @ApiProperty({
    description: 'User role',
    enum: UserRole,
    enumName: 'UserRole',
  })
  role: UserRole;

  @ApiProperty({
    description: 'Account creation timestamp',
    example: '2025-11-07T10:00:00.000Z',
  })
  createdAt: Date;
}

/**
 * Response DTO returned after successful authentication
 *
 * CHANGES from previous version:
 * - Renamed 'token' to 'accessToken' (BREAKING CHANGE)
 * - Added 'refreshToken' field (new)
 * - Added 'expiresIn' field (new)
 * - Added 'mustChangePassword' field (new) - indicates if user must change password on first login
 */
export class AuthResponseDto {
  @ApiProperty({
    description: 'User information',
    type: UserResponseDto,
  })
  user: UserResponseDto;

  @ApiProperty({
    description: 'JWT access token (short-lived: 15 minutes)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'JWT refresh token (long-lived: 7 days)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Access token expiration time in seconds',
    example: 900, // 15 minutes = 900 seconds
  })
  expiresIn: number;

  @ApiProperty({
    description: 'Flag indicating if user must change password on first login',
    example: true,
  })
  mustChangePassword: boolean;
}
