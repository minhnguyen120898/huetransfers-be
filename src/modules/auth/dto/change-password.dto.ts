import { ApiProperty } from '@nestjs/swagger';

/**
 * Change Password DTO
 *
 * Used for authenticated users who want to voluntarily change their password
 * Different from ForceChangePasswordDto (which is for mandatory password changes)
 *
 * Validation handled by ChangePasswordPipe (Joi)
 */
export class ChangePasswordDto {
  @ApiProperty({
    description: 'Current password',
    example: 'CurrentPass123!',
    minLength: 8,
  })
  currentPassword: string;

  @ApiProperty({
    description:
      'New password (min 8 chars, must contain uppercase, lowercase, number, special char)',
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
