import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import type { FastifyRequest } from 'fastify';
import { AuthService } from '../service/auth.service';
import {
  LoginDto,
  AuthResponseDto,
  RefreshTokenDto,
  LogoutDto,
  ForceChangePasswordDto,
  ChangePasswordDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from '../dto';
import {
  LoginPipe,
  RefreshTokenPipe,
  LogoutPipe,
  ForceChangePasswordPipe,
  ChangePasswordPipe,
  ForgotPasswordPipe,
  ResetPasswordPipe,
} from '../pipes';
import { LoggerService } from '../../common/provider/logger.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ForgotPasswordRateLimitGuard } from '../guards/forgot-password-rate-limit.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

/**
 * Authentication Controller
 *
 * NOTE: No public registration endpoint - users can only be created
 * through POST /user endpoint by authenticated admins
 */
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Extract device info from request headers (User-Agent)
   * @private
   */
  private getDeviceInfo(req: FastifyRequest): string {
    return req.headers['user-agent'] || 'Unknown Device';
  }

  /**
   * Extract IP address from request
   * Handles proxy headers (X-Forwarded-For, X-Real-IP)
   * @private
   */
  private getIpAddress(req: FastifyRequest): string {
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) {
      // X-Forwarded-For can be comma-separated list, take first one
      return Array.isArray(forwarded)
        ? forwarded[0]
        : forwarded.split(',')[0].trim();
    }
    return (req.headers['x-real-ip'] as string) || req.ip || 'Unknown IP';
  }

  /**
   * Login user
   *
   * UPDATED: Now captures device info and IP for refresh token tracking
   *
   * @param dto - Login credentials validated by LoginPipe
   * @param req - Fastify request object for extracting metadata
   * @returns User object, access token, and refresh token
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login user',
    description:
      'Authenticate user with email and password. Returns access token (15m) and refresh token (7d).',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully logged in with token pair',
    type: AuthResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data (validation failed)',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials or account deactivated',
  })
  async login(
    @Body(LoginPipe) dto: LoginDto,
    @Req() req: FastifyRequest,
  ): Promise<AuthResponseDto> {
    const deviceInfo = this.getDeviceInfo(req);
    const ipAddress = this.getIpAddress(req);

    const result = await this.authService.login(dto, deviceInfo, ipAddress);
    this.logger.info(`User logged in: ${dto.email} (ID: ${result.user.id})`);
    return result;
  }

  /**
   * Force change password (for users with temporary passwords)
   *
   * IMPORTANT: This endpoint is semantically for users with mustChangePassword=true
   * Frontend should direct users here when they first login with temporary password
   *
   * Functionally identical to /auth/change-password, but kept separate for:
   * - Clear API semantics (explicit intent)
   * - Different UX flows (blocking vs optional)
   * - Better frontend organization
   *
   * @param dto - Current and new passwords
   * @param userId - User ID from JWT (extracted by CurrentUser decorator)
   * @returns Success message
   */
  @Post('force-change-password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Force change password',
    description:
      'Change password when mustChangePassword flag is true. Required for users with temporary passwords. Functionally identical to /auth/change-password.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password successfully changed',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example:
            'Password successfully changed. You can now access the system.',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'Invalid input data (validation failed or passwords do not match)',
  })
  @ApiUnauthorizedResponse({
    description: 'Not authenticated or current password is incorrect',
  })
  async forceChangePassword(
    @Body(ForceChangePasswordPipe) dto: ForceChangePasswordDto,
    @CurrentUser('id') userId: string,
  ) {
    // Use the same service method - both endpoints are functionally identical
    await this.authService.changePassword(
      userId,
      dto.currentPassword,
      dto.newPassword,
    );

    this.logger.info(`User ${userId} changed password (force change flow)`);

    return {
      message: 'Password successfully changed. You can now access the system.',
    };
  }

  /**
   * Change password (voluntary)
   *
   * For authenticated users who want to update their password from settings/profile
   * Frontend typically shows this in user settings or account management
   *
   * Functionally identical to /auth/force-change-password, but kept separate for:
   * - Clear API semantics (different user flows)
   * - Better UX (optional vs mandatory)
   *
   * @param dto - Current password, new password, and confirmation
   * @param userId - User ID from JWT (extracted by CurrentUser decorator)
   * @returns Success message
   */
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Change password',
    description:
      'Change password for authenticated users. Voluntary password change from settings. Functionally identical to /auth/force-change-password.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password successfully changed',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Password successfully changed',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'Invalid input data (validation failed, passwords do not match, or password requirements not met)',
  })
  @ApiUnauthorizedResponse({
    description: 'Not authenticated or current password is incorrect',
  })
  async changePassword(
    @Body(ChangePasswordPipe) dto: ChangePasswordDto,
    @CurrentUser('id') userId: string,
  ) {
    await this.authService.changePassword(
      userId,
      dto.currentPassword,
      dto.newPassword,
    );

    this.logger.info(`User ${userId} changed password (voluntary flow)`);

    return {
      message: 'Password successfully changed',
    };
  }

  /**
   * Refresh access token using refresh token
   *
   * Flow with TOKEN ROTATION:
   * 1. Validates refresh token signature
   * 2. Checks token exists in database and not revoked
   * 3. Detects token reuse (security breach)
   * 4. Revokes old refresh token
   * 5. Issues NEW access token + NEW refresh token
   *
   * @param dto - Refresh token from client
   * @param req - Fastify request object for extracting metadata
   * @returns New access token and new refresh token
   */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Refresh access token',
    description:
      'Exchange refresh token for new access token. With rotation enabled, also returns new refresh token.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token successfully refreshed (rotation: new tokens issued)',
    type: AuthResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data (validation failed)',
  })
  @ApiUnauthorizedResponse({
    description:
      'Invalid/expired refresh token, or token reuse detected (all sessions revoked)',
  })
  async refresh(
    @Body(RefreshTokenPipe) dto: RefreshTokenDto,
    @Req() req: FastifyRequest,
  ): Promise<AuthResponseDto> {
    const deviceInfo = this.getDeviceInfo(req);
    const ipAddress = this.getIpAddress(req);

    const result = await this.authService.refreshAccessToken(
      dto.refreshToken,
      deviceInfo,
      ipAddress,
    );

    this.logger.info(
      `Access token refreshed for user: ${result.user.email} (ID: ${result.user.id})`,
    );
    return result;
  }

  /**
   * Logout user
   *
   * Two modes:
   * 1. With refresh token → Logout from current device only
   * 2. Without refresh token → Logout from ALL devices
   *
   * @param dto - Optional refresh token (if provided, logout current device only)
   * @param userId - User ID from JWT (extracted by CurrentUser decorator)
   * @returns Success message with count of revoked tokens
   */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Logout user',
    description:
      'Logout from current device (if refreshToken provided) or all devices (if not provided)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully logged out',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Successfully logged out' },
        revokedCount: {
          type: 'number',
          example: 1,
          description: 'Number of tokens revoked',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Not authenticated or refresh token not found',
  })
  async logout(
    @Body(LogoutPipe) dto: LogoutDto,
    @CurrentUser('id') userId: string,
  ) {
    const count = await this.authService.logout(userId, dto.refreshToken);
    this.logger.info(`User logged out: ${userId} (${count} tokens revoked)`);
    return {
      message: 'Successfully logged out',
      revokedCount: count,
    };
  }

  /**
   * Get active sessions for current user
   *
   * @param userId - User ID from JWT (extracted by CurrentUser decorator)
   * @returns List of active sessions with metadata (device, IP, timestamps)
   */
  @Get('sessions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get active sessions',
    description: 'View all active refresh token sessions for current user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of active sessions',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          deviceInfo: { type: 'string', example: 'Mozilla/5.0...' },
          ipAddress: { type: 'string', example: '192.168.1.1' },
          createdAt: { type: 'string', format: 'date-time' },
          lastUsedAt: { type: 'string', format: 'date-time' },
          expiresAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Not authenticated',
  })
  async getSessions(@CurrentUser('id') userId: string) {
    const sessions = await this.authService.getActiveSessions(userId);
    this.logger.info(`User ${userId} retrieved ${sessions.length} sessions`);
    return sessions;
  }

  /**
   * Revoke specific session by ID
   *
   * @param sessionId - Session ID (refresh token ID)
   * @param userId - User ID from JWT (extracted by CurrentUser decorator)
   * @returns Success message
   */
  @Delete('sessions/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Revoke specific session',
    description: 'Revoke a specific refresh token session by its ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Session successfully revoked',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Session successfully revoked' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Session not found or does not belong to user',
  })
  @ApiUnauthorizedResponse({
    description: 'Not authenticated',
  })
  async revokeSession(
    @Param('id') sessionId: string,
    @CurrentUser('id') userId: string,
  ) {
    // First verify the session belongs to this user
    const sessions = await this.authService.getActiveSessions(userId);
    const session = sessions.find((s) => s.id === sessionId);

    if (!session) {
      this.logger.error(
        `User ${userId} attempted to revoke non-existent session ${sessionId}`,
      );
      throw new UnauthorizedException('Session not found');
    }

    await this.authService.logout(userId, session.id);
    this.logger.info(`User ${userId} revoked session ${sessionId}`);

    return {
      message: 'Session successfully revoked',
    };
  }

  /**
   * Request password reset
   *
   * SECURITY FEATURES:
   * - Rate limited (3 requests per 15 minutes per email)
   * - Email enumeration prevention (always returns success message)
   * - Generates cryptographically secure token
   * - Token expires in 15 minutes
   *
   * @param dto - Email address for password reset
   * @returns Success message (same for valid/invalid emails)
   */
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ForgotPasswordRateLimitGuard)
  @ApiOperation({
    summary: 'Request password reset',
    description:
      'Send password reset link to email. Rate limited to 3 requests per 15 minutes per email. Returns same message regardless of whether email exists (prevents email enumeration).',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password reset request processed',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example:
            'If an account exists with this email, a password reset link has been sent',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data (validation failed)',
  })
  @ApiTooManyRequestsResponse({
    description: 'Rate limit exceeded (too many requests)',
  })
  async forgotPassword(@Body(ForgotPasswordPipe) dto: ForgotPasswordDto) {
    await this.authService.requestPasswordReset(dto.email);

    this.logger.info(`Password reset requested for email: ${dto.email}`);

    // Always return same message (email enumeration prevention)
    return {
      message:
        'If an account exists with this email, a password reset link has been sent',
    };
  }

  /**
   * Reset password with token
   *
   * SECURITY FEATURES:
   * - Token verification (bcrypt comparison)
   * - Expiration check (15 minutes)
   * - One-time use (token cleared after reset)
   * - All devices logged out (all refresh tokens revoked)
   *
   * @param dto - Reset token and new password
   * @returns Success message
   */
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Reset password with token',
    description:
      'Complete password reset using token from email. Token is one-time use and expires in 15 minutes. All active sessions will be logged out.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password successfully reset',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example:
            'Password successfully reset. You can now login with your new password',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'Invalid input data (validation failed, passwords do not match, or password requirements not met)',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or expired reset token',
  })
  async resetPassword(@Body(ResetPasswordPipe) dto: ResetPasswordDto) {
    await this.authService.resetPassword(dto.token, dto.newPassword);

    this.logger.info('Password reset completed successfully');

    return {
      message:
        'Password successfully reset. You can now login with your new password',
    };
  }
}
