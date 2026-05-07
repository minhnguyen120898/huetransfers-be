import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDTO {
  @ApiPropertyOptional({
    description: 'User email address',
    example: 'john.doe@example.com',
    format: 'email',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  fullName?: string;

  @ApiPropertyOptional({
    description: 'User telephone number',
    example: '+84-987-654-321',
  })
  tel?: string;

  @ApiPropertyOptional({
    description: 'URL to user avatar image',
    example: 'https://example.com/avatars/johndoe.jpg',
    format: 'uri',
  })
  avatarUrl?: string;

  @ApiPropertyOptional({
    description: 'Whether the user account is active',
    example: true,
  })
  isActive?: boolean;
}
