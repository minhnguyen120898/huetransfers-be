import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { LoggerService } from '../../common/provider/logger.service';

/**
 * Rate Limiting Guard for Forgot Password Endpoint
 *
 * SECURITY: Prevents abuse and brute-force attacks
 *
 * Configuration:
 * - MAX_ATTEMPTS: 3 requests
 * - WINDOW_MS: 15 minutes (900,000 ms)
 * - Tracks by email address (case-insensitive)
 *
 * Implementation:
 * - In-memory storage (simple, no external dependencies)
 * - Periodic cleanup to prevent memory leaks
 * - Suitable for MVP and small-scale deployments
 *
 * Future Enhancement:
 * - Migrate to Redis for multi-instance support
 * - Add IP-based rate limiting as secondary layer
 */
@Injectable()
export class ForgotPasswordRateLimitGuard implements CanActivate {
  private readonly attempts = new Map<
    string,
    { count: number; firstAttempt: Date }
  >();

  // Configuration
  private readonly MAX_ATTEMPTS = 3;
  private readonly WINDOW_MS = 15 * 60 * 1000; // 15 minutes
  private readonly CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // Cleanup every 5 minutes

  constructor(private readonly logger: LoggerService) {
    // Start periodic cleanup to prevent memory leaks
    this.startPeriodicCleanup();
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    // Extract email from request body
    const email = (request.body as { email?: string })?.email;

    if (!email) {
      // If no email provided, let it pass - validation pipe will catch it
      return true;
    }

    // Normalize email (lowercase) for consistent tracking
    const key = email.toLowerCase();
    const now = new Date();

    // Get existing attempt record
    const record = this.attempts.get(key);

    // First attempt from this email
    if (!record) {
      this.attempts.set(key, { count: 1, firstAttempt: now });
      this.logger.info(
        `Rate limit: First password reset attempt for email: ${key}`,
      );
      return true;
    }

    // Check if window has expired
    const windowExpired =
      now.getTime() - record.firstAttempt.getTime() > this.WINDOW_MS;

    if (windowExpired) {
      // Window expired - reset counter
      this.attempts.set(key, { count: 1, firstAttempt: now });
      this.logger.info(
        `Rate limit: Window expired, reset counter for email: ${key}`,
      );
      return true;
    }

    // Within window - check if max attempts reached
    if (record.count >= this.MAX_ATTEMPTS) {
      const timeRemaining = Math.ceil(
        (this.WINDOW_MS - (now.getTime() - record.firstAttempt.getTime())) /
          1000 /
          60,
      );

      this.logger.info(
        `Rate limit exceeded for email: ${key} - ${record.count} attempts`,
      );

      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: `Too many password reset requests. Please try again in ${timeRemaining} minute${timeRemaining !== 1 ? 's' : ''}`,
          error: 'Too Many Requests',
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    // Increment counter
    record.count++;
    this.logger.info(
      `Rate limit: Attempt ${record.count}/${this.MAX_ATTEMPTS} for email: ${key}`,
    );

    return true;
  }

  /**
   * Periodic cleanup to remove expired entries
   *
   * Prevents memory leaks by removing old attempt records
   * Runs every 5 minutes
   */
  private startPeriodicCleanup(): void {
    setInterval(() => {
      const now = new Date();
      let removedCount = 0;

      for (const [key, record] of this.attempts.entries()) {
        const windowExpired =
          now.getTime() - record.firstAttempt.getTime() > this.WINDOW_MS;

        if (windowExpired) {
          this.attempts.delete(key);
          removedCount++;
        }
      }

      if (removedCount > 0) {
        this.logger.info(
          `Rate limit cleanup: Removed ${removedCount} expired entries`,
        );
      }
    }, this.CLEANUP_INTERVAL_MS);
  }

  /**
   * Manual cleanup method (useful for testing)
   */
  clearAll(): void {
    const count = this.attempts.size;
    this.attempts.clear();
    this.logger.info(`Rate limit: Manually cleared ${count} entries`);
  }

  /**
   * Get current attempt count for an email (useful for testing)
   */
  getAttemptCount(email: string): number {
    const record = this.attempts.get(email.toLowerCase());
    return record?.count || 0;
  }
}
