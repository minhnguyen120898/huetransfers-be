import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { EmailService } from '../common/provider/email.service';
import { LoggerService } from '../common/provider/logger.service';

/**
 * Health Check and System Test Controller
 *
 * Provides endpoints for:
 * - Health checks
 * - Email configuration testing
 * - System diagnostics
 */
@ApiTags('Health & System')
@Controller('health')
export class HealthController {
  constructor(
    private readonly emailService: EmailService,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Basic health check endpoint
   */
  @Get()
  @ApiOperation({
    summary: 'Health check',
    description: 'Check if the API is running',
  })
  @ApiResponse({
    status: 200,
    description: 'API is healthy',
    schema: {
      properties: {
        status: { type: 'string', example: 'ok' },
        timestamp: { type: 'string', example: '2025-12-17T10:30:00.000Z' },
        uptime: { type: 'number', example: 123456 },
      },
    },
  })
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  /**
   * Test email configuration by sending a test email
   */
  @Post('test-email')
  @ApiOperation({
    summary: 'Test email configuration',
    description:
      'Send a test email to verify Resend API configuration is working correctly',
  })
  @ApiResponse({
    status: 200,
    description: 'Test email sent successfully',
    schema: {
      properties: {
        success: { type: 'boolean', example: true },
        message: {
          type: 'string',
          example: 'Test email sent successfully to test@example.com',
        },
        timestamp: { type: 'string', example: '2025-12-17T10:30:00.000Z' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid email or Resend API not configured',
  })
  async testEmail(@Body('email') email: string) {
    if (!email) {
      return {
        success: false,
        message: 'Email address is required',
        error: 'Please provide an email address in request body',
      };
    }

    try {
      const result = await this.emailService.testEmailConfiguration(email);

      if (result) {
        this.logger.info(`Test email sent successfully to ${email}`);
        return {
          success: true,
          message: `Test email sent successfully to ${email}`,
          timestamp: new Date().toISOString(),
        };
      } else {
        return {
          success: false,
          message: 'Failed to send test email',
          error:
            'Email service may not be configured correctly. Check server logs for details.',
        };
      }
    } catch (error) {
      this.logger.error(`Test email failed: ${error.message}`);
      return {
        success: false,
        message: 'Failed to send test email',
        error: error.message,
      };
    }
  }

  /**
   * Quick email test using query parameter (for easy browser testing)
   */
  @Get('test-email')
  @ApiOperation({
    summary: 'Test email (GET)',
    description:
      'Send a test email using GET request with query parameter (browser-friendly)',
  })
  @ApiResponse({
    status: 200,
    description: 'Test email sent successfully',
  })
  async testEmailGet(@Query('email') email: string) {
    if (!email) {
      return {
        success: false,
        message: 'Email address is required',
        usage: 'GET /api/v1/health/test-email?email=your@email.com',
      };
    }

    return this.testEmail(email);
  }
}
