import { Injectable } from '@nestjs/common';
import { RefreshToken } from 'generated/prisma';
import { PrismaService } from 'src/modules/common/provider/prisma.provider';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';
import {
  IRefreshTokenRepository,
  CreateRefreshTokenData,
} from './refresh-token.repository.interface';

@Injectable()
export class RefreshTokenRepository implements IRefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new refresh token record
   */
  async create(data: CreateRefreshTokenData): Promise<RefreshTokenEntity> {
    const token = await this.prisma.refreshToken.create({
      data: {
        userId: data.userId,
        jti: data.jti, // JWT ID from token payload (PRIMARY verification)
        token: data.tokenHash, // Already hashed by auth service (SECONDARY verification)
        expiresAt: data.expiresAt,
        deviceInfo: data.deviceInfo,
        ipAddress: data.ipAddress,
      },
    });

    return this.mapToEntity(token);
  }

  /**
   * Find a refresh token by its hashed value
   * Used during token refresh to validate the token
   */
  async findByToken(tokenHash: string): Promise<RefreshTokenEntity | null> {
    const token = await this.prisma.refreshToken.findUnique({
      where: { token: tokenHash },
    });

    return token ? this.mapToEntity(token) : null;
  }

  /**
   * Find a refresh token by its ID
   */
  async findById(id: string): Promise<RefreshTokenEntity | null> {
    const token = await this.prisma.refreshToken.findUnique({
      where: { id },
    });

    return token ? this.mapToEntity(token) : null;
  }

  /**
   * Get all active (valid, non-revoked, non-expired) tokens for a user
   * Used for viewing active sessions
   */
  async findActiveByUserId(userId: string): Promise<RefreshTokenEntity[]> {
    const tokens = await this.prisma.refreshToken.findMany({
      where: {
        userId,
        isRevoked: false,
        expiresAt: {
          gt: new Date(), // Greater than now (not expired)
        },
      },
      orderBy: {
        lastUsedAt: 'desc', // Most recently used first
      },
    });

    return tokens.map((token) => this.mapToEntity(token));
  }

  /**
   * Get all non-expired tokens for a user (including revoked ones)
   * Used for token reuse detection during refresh
   */
  async findAllNonExpiredByUserId(
    userId: string,
  ): Promise<RefreshTokenEntity[]> {
    const tokens = await this.prisma.refreshToken.findMany({
      where: {
        userId,
        expiresAt: {
          gte: new Date(), // Greater than or equal to now (not expired)
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return tokens.map((token) => this.mapToEntity(token));
  }

  /**
   * Update last used timestamp for a token
   * Called every time a token is used to refresh access token
   */
  async updateLastUsed(id: string): Promise<RefreshTokenEntity> {
    const token = await this.prisma.refreshToken.update({
      where: { id },
      data: {
        lastUsedAt: new Date(),
      },
    });

    return this.mapToEntity(token);
  }

  /**
   * Revoke a specific token (logout from single device)
   */
  async revoke(
    id: string,
    revokedBy: string | null,
  ): Promise<RefreshTokenEntity> {
    const token = await this.prisma.refreshToken.update({
      where: { id },
      data: {
        isRevoked: true,
        revokedAt: new Date(),
        revokedBy,
      },
    });

    return this.mapToEntity(token);
  }

  /**
   * Revoke all tokens for a user (logout from all devices)
   * Returns the count of revoked tokens
   */
  async revokeAllByUserId(
    userId: string,
    revokedBy: string | null,
  ): Promise<number> {
    const result = await this.prisma.refreshToken.updateMany({
      where: {
        userId,
        isRevoked: false, // Only revoke active tokens
      },
      data: {
        isRevoked: true,
        revokedAt: new Date(),
        revokedBy,
      },
    });

    return result.count;
  }

  /**
   * Delete expired tokens (cleanup job)
   * Returns the count of deleted tokens
   */
  async deleteExpired(): Promise<number> {
    const result = await this.prisma.refreshToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(), // Less than now (expired)
        },
      },
    });

    return result.count;
  }

  /**
   * Delete all revoked tokens older than specified date (cleanup job)
   * Useful for keeping database clean while retaining recent revoked tokens for audit
   * Returns the count of deleted tokens
   */
  async deleteRevokedBefore(date: Date): Promise<number> {
    const result = await this.prisma.refreshToken.deleteMany({
      where: {
        isRevoked: true,
        revokedAt: {
          lt: date,
        },
      },
    });

    return result.count;
  }

  /**
   * Map Prisma RefreshToken model to RefreshTokenEntity
   * @private
   */
  private mapToEntity(prismaToken: RefreshToken): RefreshTokenEntity {
    const entity = new RefreshTokenEntity();
    entity.id = prismaToken.id;
    entity.userId = prismaToken.userId;
    entity.jti = prismaToken.jti; // JWT ID
    entity.token = prismaToken.token;
    entity.deviceInfo = prismaToken.deviceInfo;
    entity.ipAddress = prismaToken.ipAddress;
    entity.expiresAt = prismaToken.expiresAt;
    entity.isRevoked = prismaToken.isRevoked;
    entity.revokedAt = prismaToken.revokedAt;
    entity.revokedBy = prismaToken.revokedBy;
    entity.createdAt = prismaToken.createdAt;
    entity.lastUsedAt = prismaToken.lastUsedAt;
    return entity;
  }
}
