export class RefreshTokenEntity {
  id: string;
  userId: string;
  jti: string; // JWT ID - unique identifier for this token (PRIMARY verification)
  token: string; // Hashed token (SECONDARY verification via bcrypt)
  deviceInfo: string | null;
  ipAddress: string | null;
  expiresAt: Date;
  isRevoked: boolean;
  revokedAt: Date | null;
  revokedBy: string | null;
  createdAt: Date;
  lastUsedAt: Date | null;

  /**
   * Check if token is still valid (not expired and not revoked)
   */
  isValid(): boolean {
    return !this.isRevoked && this.expiresAt > new Date();
  }

  /**
   * Check if token is expired
   */
  isExpired(): boolean {
    return this.expiresAt <= new Date();
  }

  /**
   * Check if token is revoked
   */
  isTokenRevoked(): boolean {
    return this.isRevoked;
  }
}
