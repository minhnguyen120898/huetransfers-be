import { RefreshTokenEntity } from '../entities/refresh-token.entity';

/**
 * Metadata for creating a new refresh token
 */
export interface CreateRefreshTokenData {
  userId: string;
  jti: string; // JWT ID from the token payload (PRIMARY verification)
  tokenHash: string; // Hashed token (bcrypt) (SECONDARY verification)
  expiresAt: Date;
  deviceInfo?: string;
  ipAddress?: string;
}

/**
 * Repository interface for RefreshToken operations
 * Follows the repository pattern: AuthService → RefreshTokenRepository → PrismaService → Database
 */
export interface IRefreshTokenRepository {
  /**
   * Create a new refresh token record
   */
  create(data: CreateRefreshTokenData): Promise<RefreshTokenEntity>;

  /**
   * Find a refresh token by its hashed value
   */
  findByToken(tokenHash: string): Promise<RefreshTokenEntity | null>;

  /**
   * Find a refresh token by its ID
   */
  findById(id: string): Promise<RefreshTokenEntity | null>;

  /**
   * Get all active (valid, non-revoked) tokens for a user
   */
  findActiveByUserId(userId: string): Promise<RefreshTokenEntity[]>;

  /**
   * Get all non-expired tokens for a user (including revoked ones)
   * Used for token reuse detection during refresh
   */
  findAllNonExpiredByUserId(userId: string): Promise<RefreshTokenEntity[]>;

  /**
   * Update last used timestamp for a token
   */
  updateLastUsed(id: string): Promise<RefreshTokenEntity>;

  /**
   * Revoke a specific token
   */
  revoke(id: string, revokedBy: string | null): Promise<RefreshTokenEntity>;

  /**
   * Revoke all tokens for a user (logout from all devices)
   */
  revokeAllByUserId(userId: string, revokedBy: string | null): Promise<number>;

  /**
   * Delete expired tokens (cleanup job)
   */
  deleteExpired(): Promise<number>;

  /**
   * Delete all revoked tokens older than specified date (cleanup job)
   */
  deleteRevokedBefore(date: Date): Promise<number>;
}
