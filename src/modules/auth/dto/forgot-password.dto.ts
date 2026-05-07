import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for requesting password reset
 *
 * NOTE: Validation is handled by ForgotPasswordPipe (Joi)
 * This DTO only contains TypeScript types and Swagger decorators
 */
export class ForgotPasswordDto {
  @ApiProperty({
    description: 'User email address for password reset',
    example: 'user@example.com',
    format: 'email',
  })
  email: string;
}
