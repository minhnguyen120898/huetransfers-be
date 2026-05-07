import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from 'generated/prisma';

/**
 * DTO for user registration
 * Contains only TypeScript types and Swagger decorators (NO validation decorators)
 * Validation is handled by RegisterPipe (Joi)
 */
export class RegisterDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    format: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'User password (minimum 8 characters)',
    example: 'SecurePass123!',
    minLength: 8,
  })
  password: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
    minLength: 2,
    maxLength: 100,
  })
  fullName: string;

  @ApiPropertyOptional({
    description: 'User role in the system',
    enum: UserRole,
    enumName: 'UserRole',
    default: UserRole.user,
  })
  role?: UserRole;
}
