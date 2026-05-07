import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for completing password reset with token
 *
 * NOTE: Validation is handled by ResetPasswordPipe (Joi)
 * This DTO only contains TypeScript types and Swagger decorators
 */
export class ResetPasswordDto {
  @ApiProperty({
    description: 'Password reset token received via email',
    example: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2',
    minLength: 32,
    maxLength: 64,
  })
  token: string;

  @ApiProperty({
    description:
      'New password (min 8 chars, must contain uppercase, lowercase, number, and special character)',
    example: 'SecurePass123!',
    minLength: 8,
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])',
  })
  newPassword: string;

  @ApiProperty({
    description: 'Confirm new password (must match newPassword)',
    example: 'SecurePass123!',
    minLength: 8,
  })
  confirmPassword: string;
}
