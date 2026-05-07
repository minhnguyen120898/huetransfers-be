import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UserRepository } from '../../user/repositories/user.repository';
import { RefreshTokenRepository } from '../repositories/refresh-token.repository';
import { LoggerService } from '../../common/provider/logger.service';
import { EmailService } from '../../common/provider/email.service';
import { LoginDto } from '../dto/login.dto';
import { AuthResponseDto, UserResponseDto } from '../dto/auth-response.dto';
import { UserEntity } from '../../user/entities/user.entity';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';
import { convertToMilliseconds } from 'src/shared/utils';
import { randomUUID } from 'crypto';

/**
 * Authentication Service
 *
 * IMPORTANT: Uses UserRepository for data access (follows project architecture pattern)
 * - Consistent with other feature modules (User, Agency, etc.)
 * - No direct PrismaService dependency
 * - Separation of concerns: Service → Repository → Prisma
 *
 * NOTE: User creation is NOT handled here - it's done through the User module (admin-only)
 */
@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
    private readonly emailService: EmailService,
  ) {}

  async login(
    dto: LoginDto,
    deviceInfo?: string,
    ipAddress?: string,
  ): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    await this.userRepository.updateLastLogin(user.id);

    this.logger.info(`User logged in: ${user.email} (ID: ${user.id})`);

    const tokens = await this.generateTokenPair(user, deviceInfo, ipAddress);

    return {
      user: this.mapUserToResponse(user),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: tokens.expiresIn,
      mustChangePassword: user.mustChangePassword,
    };
  }

  /**
   * Change password for authenticated users
   *
   * Used for both:
   * - Force change: When mustChangePassword flag is true (temporary passwords)
   * - Voluntary change: When users want to update their password
   *
   * Process:
   * 1. Verifies user exists
   * 2. Validates current password
   * 3. Hashes new password with bcrypt (10 rounds)
   * 4. Updates password and clears mustChangePassword flag
   *
   * @param userId - User ID from JWT token
   * @param currentPassword - Current password for verification
   * @param newPassword - New password (already validated by pipe)
   * @throws UnauthorizedException if user not found or current password incorrect
   */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, this.SALT_ROUNDS);

    // Update password and clear mustChangePassword flag
    await this.userRepository.updatePassword(userId, newPasswordHash);

    this.logger.info(`User ${user.email} successfully changed password`);
  }

  private generateAccessToken(
    userId: string,
    email: string,
    role: string,
  ): string {
    const payload = {
      sub: userId,
      email,
      role,
      type: 'access',
    };

    const expiresInStr =
      this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN') || '15m';
    const expiresInMs = convertToMilliseconds(expiresInStr);

    return this.jwtService.sign(payload, {
      expiresIn: expiresInMs,
    });
  }

  private generateRefreshToken(userId: string): string {
    const payload = {
      sub: userId,
      type: 'refresh',
      jti: randomUUID(),
    };

    const expiresInStr =
      this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN') || '7d';
    const expiresInMs = convertToMilliseconds(expiresInStr);

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: expiresInMs,
      issuer:
        this.configService.get<string>('JWT_ISSUER') || 'tour-booking-api',
    });
  }

  private async generateTokenPair(
    user: UserEntity,
    deviceInfo?: string,
    ipAddress?: string,
  ): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }> {
    const accessToken = this.generateAccessToken(
      user.id,
      user.email,
      user.role,
    );
    const refreshToken = this.generateRefreshToken(user.id);

    /**
     * CRITICAL: Extract JTI from the JWT payload
     * The JTI (JWT ID) is a unique identifier embedded in the refresh token
     * We use it as the PRIMARY verification method to ensure tokens can only
     * match their exact database record, even if bcrypt behaves unexpectedly
     */
    const payload = this.jwtService.decode(refreshToken);
    const jti = payload.jti;

    if (!jti) {
      this.logger.error('Failed to extract JTI from refresh token');
      throw new Error('Failed to generate valid refresh token');
    }

    const hashedRefreshToken = await bcrypt.hash(
      refreshToken,
      this.SALT_ROUNDS,
    );

    const expiresAt = new Date();
    const expiresInDays = parseInt(
      this.configService
        .get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN')
        ?.replace('d', '') || '7',
    );
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    await this.refreshTokenRepository.create({
      userId: user.id,
      jti, // Store JTI for PRIMARY verification
      tokenHash: hashedRefreshToken, // Store hash for SECONDARY verification
      expiresAt,
      deviceInfo: deviceInfo || 'Unknown',
      ipAddress: ipAddress || undefined,
    });

    this.logger.info(
      `Generated token pair for user ${user.email} (JTI: ${jti})`,
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: 900,
    };
  }

  async refreshAccessToken(
    refreshToken: string,
    deviceInfo?: string,
    ipAddress?: string,
  ): Promise<AuthResponseDto> {
    /**
     * STEP 1: Verify JWT signature and extract payload
     */
    let payload: any;
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });
    } catch (error) {
      this.logger.error(`Invalid refresh token signature: ${error.message}`);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    if (payload.type !== 'refresh') {
      this.logger.error('Attempted to use access token as refresh token');
      throw new UnauthorizedException('Invalid token type');
    }

    /**
     * STEP 2: Extract JTI from the JWT payload
     * JTI is the PRIMARY verification mechanism
     */
    const jti = payload.jti;
    if (!jti) {
      this.logger.error('Refresh token missing JTI claim');
      throw new UnauthorizedException('Invalid refresh token format');
    }

    /**
     * STEP 3: Find the token by JTI (PRIMARY verification)
     * This ensures we're looking at the EXACT database record for this token
     * Even if bcrypt mysteriously matches the wrong hash, the JTI will not match
     */
    const allTokens: RefreshTokenEntity[] =
      await this.refreshTokenRepository.findAllNonExpiredByUserId(payload.sub);

    if (allTokens.length === 0) {
      this.logger.error(`No refresh tokens found for user ${payload.sub}`);
      throw new UnauthorizedException('Refresh token not found or expired');
    }

    // Find token by JTI FIRST
    const tokenByJti = allTokens.find((t) => t.jti === jti);

    if (!tokenByJti) {
      this.logger.error(
        `No token found with JTI: ${jti} for user ${payload.sub}`,
      );
      throw new UnauthorizedException('Refresh token not found');
    }

    /**
     * STEP 4: Verify bcrypt hash (SECONDARY verification)
     * Now that we've found the correct token by JTI, verify the hash matches
     * This adds an extra layer of security
     */
    const isHashValid = await bcrypt.compare(refreshToken, tokenByJti.token);

    if (!isHashValid) {
      this.logger.error(
        `Hash mismatch for token with JTI: ${jti} - Possible tampering`,
      );
      throw new UnauthorizedException('Invalid refresh token');
    }

    /**
     * STEP 5: Check if token has been revoked (token reuse detection)
     */
    if (tokenByJti.isRevoked) {
      this.logger.error(
        `Token reuse detected for user ${payload.sub} (JTI: ${jti}) - Revoking all tokens`,
      );

      await this.revokeAllUserTokens(payload.sub);

      throw new UnauthorizedException(
        'Token reuse detected - all sessions revoked for security',
      );
    }

    const validToken = tokenByJti;

    const user = await this.userRepository.findById(payload.sub);
    if (!user || !user.isActive) {
      this.logger.error(`User not found or inactive: ${payload.sub}`);
      throw new UnauthorizedException('User not found or inactive');
    }

    const rotationEnabled =
      this.configService.get<string>('JWT_REFRESH_TOKEN_ROTATION_ENABLED') ===
      'true';

    if (rotationEnabled) {
      await this.refreshTokenRepository.revoke(validToken.id, user.id);
      const newTokens = await this.generateTokenPair(
        user,
        deviceInfo,
        ipAddress,
      );

      this.logger.info(
        `Token rotation: Issued new tokens for user ${user.email} (old token revoked)`,
      );

      return {
        user: this.mapUserToResponse(user),
        accessToken: newTokens.accessToken,
        refreshToken: newTokens.refreshToken,
        expiresIn: newTokens.expiresIn,
        mustChangePassword: user.mustChangePassword,
      };
    } else {
      await this.refreshTokenRepository.updateLastUsed(validToken.id);

      const accessToken = this.generateAccessToken(
        user.id,
        user.email,
        user.role,
      );

      this.logger.info(
        `Access token refreshed for user: ${user.email} (no rotation)`,
      );

      return {
        user: this.mapUserToResponse(user),
        accessToken,
        refreshToken,
        expiresIn: 900,
        mustChangePassword: user.mustChangePassword,
      };
    }
  }

  async logout(userId: string, refreshToken?: string): Promise<number> {
    if (refreshToken) {
      const payload = this.jwtService.decode(refreshToken);
      const jti = payload?.jti;

      if (!jti) {
        this.logger.error('Logout: Refresh token missing JTI claim');
        throw new UnauthorizedException('Invalid refresh token format');
      }

      const storedTokens =
        await this.refreshTokenRepository.findActiveByUserId(userId);

      const tokenByJti = storedTokens.find((t) => t.jti === jti);

      if (!tokenByJti) {
        this.logger.error(`Logout: No token found with JTI: ${jti}`);
        throw new UnauthorizedException('Refresh token not found');
      }

      const isHashValid = await bcrypt.compare(refreshToken, tokenByJti.token);

      if (!isHashValid) {
        this.logger.error(`Logout: Hash mismatch for token with JTI: ${jti}`);
        throw new UnauthorizedException('Invalid refresh token');
      }

      await this.refreshTokenRepository.revoke(tokenByJti.id, userId);

      this.logger.info(
        `User logged out (single device): ${userId} (JTI: ${jti})`,
      );
      return 1;
    } else {
      const count = await this.refreshTokenRepository.revokeAllByUserId(
        userId,
        userId,
      );

      this.logger.info(
        `User logged out (all devices): ${userId} - ${count} tokens revoked`,
      );
      return count;
    }
  }

  async revokeAllUserTokens(
    userId: string,
    revokedBy?: string,
  ): Promise<number> {
    const count = await this.refreshTokenRepository.revokeAllByUserId(
      userId,
      revokedBy || null,
    );

    this.logger.error(
      `All tokens revoked for user: ${userId} by ${revokedBy || 'system (auto)'} - ${count} tokens revoked`,
    );

    return count;
  }
  async getActiveSessions(userId: string) {
    const sessions =
      await this.refreshTokenRepository.findActiveByUserId(userId);

    return sessions.map((session) => ({
      id: session.id,
      deviceInfo: session.deviceInfo,
      ipAddress: session.ipAddress,
      createdAt: session.createdAt,
      lastUsedAt: session.lastUsedAt,
      expiresAt: session.expiresAt,
    }));
  }

  /**
   * Request password reset by email
   *
   * SECURITY FEATURES:
   * - Email enumeration prevention (always returns success)
   * - Cryptographically secure token (crypto.randomBytes)
   * - Token hashed in database (defense in depth)
   * - 15-minute expiration
   *
   * Process:
   * 1. Find user by email (case-insensitive)
   * 2. If not found or inactive: Silent fail (prevents email enumeration)
   * 3. Generate secure token: crypto.randomBytes(32) = 64 char hex string
   * 4. Hash token with bcrypt before storing
   * 5. Calculate expiry: 15 minutes from now
   * 6. Save hashed token + expiry to database
   * 7. Send email with plain token (user needs this)
   * 8. Log success
   *
   * @param email - User email address
   */
  async requestPasswordReset(email: string): Promise<void> {
    // Find user by email (case-insensitive)
    const user = await this.userRepository.findByEmail(email.toLowerCase());

    // EMAIL ENUMERATION PREVENTION:
    // Always return success, even if user not found or inactive
    // This prevents attackers from discovering valid email addresses
    if (!user || !user.isActive) {
      this.logger.info(
        `Password reset requested for invalid/inactive email: ${email}`,
      );
      return; // Silent fail - don't throw error
    }

    // Generate cryptographically secure token
    // crypto.randomBytes(32) = 256 bits of entropy = 64 char hex string
    // More secure than UUID (not designed for cryptographic purposes)
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash token before storing (defense in depth)
    // Even if database is compromised, tokens are useless
    const hashedToken = await bcrypt.hash(resetToken, this.SALT_ROUNDS);

    // Calculate expiry: 15 minutes from now
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Save hashed token and expiry to database
    await this.userRepository.updatePasswordResetToken(
      user.id,
      hashedToken,
      expiresAt,
    );

    // Send email with plain token (user needs this to reset password)
    // NOTE: Email is sent AFTER database update to ensure consistency
    try {
      await this.emailService.sendPasswordResetEmail(
        user.email,
        user.fullName,
        resetToken,
      );

      this.logger.info(
        `Password reset email sent to: ${user.email} (User ID: ${user.id})`,
      );
    } catch (error) {
      // If email fails, clear the reset token to prevent orphaned tokens
      await this.userRepository.clearPasswordResetToken(user.id);

      this.logger.error(
        `Failed to send password reset email to ${user.email}: ${error.message}`,
      );

      throw new Error('Failed to send password reset email');
    }
  }

  /**
   * Reset password with token
   *
   * SECURITY FEATURES:
   * - Token verified via bcrypt comparison loop
   * - Expiration check
   * - One-time use (token cleared after reset)
   * - All devices logged out (revoke all refresh tokens)
   *
   * Process:
   * 1. Get all users with reset tokens
   * 2. Find matching token via bcrypt comparison
   * 3. Throw error if no match or token expired
   * 4. Hash new password
   * 5. Atomic update: password + clear reset token (one-time use)
   * 6. Revoke all refresh tokens (logout from all devices)
   * 7. Log success
   *
   * @param token - Reset token from email (plain text)
   * @param newPassword - New password (already validated by pipe)
   * @throws UnauthorizedException if token invalid, expired, or not found
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    // Get all users with reset tokens
    // We need to do this because tokens are hashed in database
    // Can't query by token directly - must compare with bcrypt
    const users = await this.userRepository.findUsersWithResetToken();

    if (users.length === 0) {
      this.logger.error('Password reset attempted but no active reset tokens');
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    // Find matching token via bcrypt comparison
    let user: UserEntity | null = null;
    for (const u of users) {
      if (!u.passwordResetToken) {
        continue;
      }

      const isMatch = await bcrypt.compare(token, u.passwordResetToken);
      if (isMatch) {
        user = u;
        break;
      }
    }

    // No matching token found
    if (!user) {
      this.logger.error('Password reset attempted with invalid token');
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    // Check if token has expired
    if (!user.passwordResetExpires || user.passwordResetExpires < new Date()) {
      // Clear expired token
      await this.userRepository.clearPasswordResetToken(user.id);

      this.logger.error(
        `Password reset attempted with expired token for user: ${user.email}`,
      );
      throw new UnauthorizedException('Reset token has expired');
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, this.SALT_ROUNDS);

    // ATOMIC UPDATE: Update password AND clear reset token
    // This ensures one-time use - token cannot be reused
    await this.userRepository.updatePasswordAndClearResetToken(
      user.id,
      newPasswordHash,
    );

    // SECURITY: Revoke all refresh tokens (logout from all devices)
    // This prevents unauthorized access if account was compromised
    // Don't pass revokedBy - this is a system operation (not triggered by a specific user)
    const revokedCount = await this.revokeAllUserTokens(user.id);

    this.logger.info(
      `Password reset successful for user: ${user.email} (ID: ${user.id}) - ${revokedCount} sessions revoked`,
    );
  }

  private mapUserToResponse(user: UserEntity): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}
