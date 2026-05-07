import { UserRole } from 'generated/prisma';
import { PaginationQueryDTO } from 'src/modules/common';

export interface UserInput {
  email: string;
  password: string;
  fullName: string;
  role?: UserRole;
  avatarUrl?: string;
}

export interface UserUpdateInput {
  email?: string;
  fullName?: string;
  tel?: string;
  avatarUrl?: string;
  isActive?: boolean;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface UserQueryInput extends PaginationQueryDTO {
  role?: UserRole;
  isActive?: boolean;
  search?: string;
}
