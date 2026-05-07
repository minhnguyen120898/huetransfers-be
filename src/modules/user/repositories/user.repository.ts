import { Injectable } from '@nestjs/common';
import { User, UserRole, Prisma } from 'generated/prisma';
import { PrismaService } from 'src/modules/common/provider/prisma.provider';
import { UserEntity } from '../entities/user.entity';
import { PaginatedResultDTO } from '../../common/models/pagination.model';
import { UserQueryInput } from '../models';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    email: string;
    passwordHash: string;
    fullName: string;
    role: UserRole;
    avatarUrl?: string;
    mustChangePassword?: boolean;
  }): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash: data.passwordHash,
        fullName: data.fullName,
        role: data.role,
        avatarUrl: data.avatarUrl,
        mustChangePassword: data.mustChangePassword ?? false,
      },
    });

    return this.mapToEntity(user);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user ? this.mapToEntity(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user ? this.mapToEntity(user) : null;
  }

  async findMany(
    query: UserQueryInput,
  ): Promise<PaginatedResultDTO<UserEntity>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {
      ...(query.role && { role: query.role }),
      ...(query.isActive !== undefined && { isActive: query.isActive }),
      ...(query.search && {
        OR: [
          { email: { contains: query.search, mode: 'insensitive' as const } },
          {
            fullName: { contains: query.search, mode: 'insensitive' as const },
          },
        ],
      }),
    };

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users.map((user) => this.mapToEntity(user)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async update(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...(data.email && { email: data.email }),
        ...(data.fullName && { fullName: data.fullName }),
        ...(data.tel !== undefined && { tel: data.tel }),
        ...(data.avatarUrl !== undefined && { avatarUrl: data.avatarUrl }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
        ...(data.role && { role: data.role }),
      },
    });

    return this.mapToEntity(user);
  }

  async updatePassword(id: string, passwordHash: string): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        passwordHash,
        mustChangePassword: false, // Clear flag after password change
      },
    });

    return this.mapToEntity(user);
  }

  async softDelete(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });

    return this.mapToEntity(user);
  }

  async updateLastLogin(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { lastLogin: new Date() },
    });

    return this.mapToEntity(user);
  }

  async findByResetToken(token: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: {
          gte: new Date(),
        },
      },
    });

    return user ? this.mapToEntity(user) : null;
  }

  /**
   * Update password reset token (hashed) and expiration
   *
   * NOTE: Token should be hashed before passing to this method
   * for security (defense in depth)
   *
   * @param userId - User ID
   * @param hashedToken - Bcrypt hash of the reset token
   * @param expiresAt - Token expiration timestamp
   * @returns Updated user entity
   */
  async updatePasswordResetToken(
    userId: string,
    hashedToken: string,
    expiresAt: Date,
  ): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordResetToken: hashedToken,
        passwordResetExpires: expiresAt,
      },
    });

    return this.mapToEntity(user);
  }

  /**
   * Find users with non-null reset tokens
   *
   * Used for token verification via bcrypt comparison loop
   * (since we can't query hashed tokens directly)
   *
   * @returns Array of users with active reset tokens
   */
  async findUsersWithResetToken(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      where: {
        passwordResetToken: {
          not: null,
        },
      },
    });

    return users.map((user) => this.mapToEntity(user));
  }

  /**
   * Clear password reset token and expiration
   *
   * Called after successful password reset or when token expires
   *
   * @param userId - User ID
   */
  async clearPasswordResetToken(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });
  }

  /**
   * Atomic operation: Update password AND clear reset token
   *
   * CRITICAL: This ensures one-time use of reset tokens
   * Both operations happen in a single database transaction
   *
   * @param userId - User ID
   * @param newPasswordHash - Bcrypt hash of the new password
   * @returns Updated user entity
   */
  async updatePasswordAndClearResetToken(
    userId: string,
    newPasswordHash: string,
  ): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: newPasswordHash,
        mustChangePassword: false, // Clear flag after password reset
        passwordResetToken: null, // Clear token (one-time use)
        passwordResetExpires: null, // Clear expiration
      },
    });

    return this.mapToEntity(user);
  }

  /**
   * Map Prisma User model to UserEntity
   * @private
   */
  private mapToEntity(prismaUser: User): UserEntity {
    const entity = new UserEntity();
    entity.id = prismaUser.id;
    entity.email = prismaUser.email;
    entity.passwordHash = prismaUser.passwordHash;
    entity.fullName = prismaUser.fullName;
    entity.tel = prismaUser.tel;
    entity.avatarUrl = prismaUser.avatarUrl;
    entity.role = prismaUser.role;
    entity.isActive = prismaUser.isActive;
    entity.emailVerified = prismaUser.emailVerified;
    entity.mustChangePassword = prismaUser.mustChangePassword;
    entity.emailVerificationToken = prismaUser.emailVerificationToken;
    entity.passwordResetToken = prismaUser.passwordResetToken;
    entity.passwordResetExpires = prismaUser.passwordResetExpires;
    entity.createdAt = prismaUser.createdAt;
    entity.updatedAt = prismaUser.updatedAt;
    entity.lastLogin = prismaUser.lastLogin;
    return entity;
  }
}
