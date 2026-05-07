import { ApiProperty } from '@nestjs/swagger';

/**
 * Force Change Password DTO
 *
 * Used when user must change their temporary password on first login
 */
export class ForceChangePasswordDto {
  @ApiProperty({
    description: 'Current temporary password',
    example: 'TemporaryPass123!',
    minLength: 8,
  })
  currentPassword: string;

  @ApiProperty({
    description: 'New password (minimum 8 characters)',
    example: 'NewSecurePass123!',
    minLength: 8,
  })
  newPassword: string;

  @ApiProperty({
    description: 'Confirm new password (must match newPassword)',
    example: 'NewSecurePass123!',
    minLength: 8,
  })
  confirmPassword: string;
}
