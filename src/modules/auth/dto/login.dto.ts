import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for user login
 * Contains only TypeScript types and Swagger decorators (NO validation decorators)
 * Validation is handled by LoginPipe (Joi)
 */
export class LoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    format: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'SecurePass123!',
  })
  password: string;
}
