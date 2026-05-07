import { UserEntity } from '../entities/user.entity';
import { PaginatedResultDTO } from '../../common/models/pagination.model';
import { UserQueryInput } from '../models';
import { UserRole } from 'generated/prisma';

export interface IUserRepository {
  create(data: {
    email: string;
    passwordHash: string;
    fullName: string;
    role: UserRole;
    avatarUrl?: string;
  }): Promise<UserEntity>;

  findById(id: string): Promise<UserEntity | null>;

  findByEmail(email: string): Promise<UserEntity | null>;

  findMany(query: UserQueryInput): Promise<PaginatedResultDTO<UserEntity>>;

  update(id: string, data: Partial<UserEntity>): Promise<UserEntity>;

  updatePassword(id: string, passwordHash: string): Promise<UserEntity>;

  softDelete(id: string): Promise<UserEntity>;

  updateLastLogin(id: string): Promise<UserEntity>;

  findByResetToken(token: string): Promise<UserEntity | null>;
}
