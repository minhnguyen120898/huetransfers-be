import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from 'generated/prisma';
import { PaginationQueryDTO } from 'src/modules/common';

export class UserQueryDTO implements PaginationQueryDTO {
  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
    minimum: 1,
    default: 1,
  })
  page?: number;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10,
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  limit?: number;

  @ApiPropertyOptional({
    description: 'Filter users by role',
    enum: UserRole,
    enumName: 'UserRole',
    example: UserRole.user,
  })
  role?: UserRole;

  @ApiPropertyOptional({
    description: 'Filter users by active status',
    example: true,
    type: Boolean,
  })
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Search users by email or full name',
    example: 'john',
  })
  search?: string;
}
