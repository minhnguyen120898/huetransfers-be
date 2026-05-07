import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { LoggerService } from './logger.service';

/**
 * Email Service
 *
 * Handles all email sending functionality using Resend API
 * Resend is used instead of SMTP because Railway blocks SMTP ports on Hobby/Free plans
 *
 * IMPORTANT: Railway blocks SMTP ports (25, 465, 587, 2525) on non-Pro plans
 * Solution: Use HTTP-based email API (Resend) which works on all Railway plans
 *
 * Resend Free Tier: 100 emails/day, 3,000 emails/month
 * Docs: https://resend.com/docs/send-with-nodejs
 */
@Injectable()
export class EmailService {
  private resend: Resend | null = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {
    this.initializeResend();
  }

  /**
   * Initialize Resend client
   *
   * Railway blocks SMTP ports on Hobby/Free plans, so we use Resend API instead
   * Resend uses HTTPS (port 443) which is never blocked by hosting providers
   */
  private initializeResend() {
    const resendApiKey = this.configService.get<string>('RESEND_API_KEY');

    if (!resendApiKey) {
      this.logger.error(
        'RESEND_API_KEY not configured. Email sending will not work.',
      );
      this.logger.info('Get your API key from: https://resend.com/api-keys');
      return;
    }

    this.resend = new Resend(resendApiKey);
    this.logger.info('Email service initialized with Resend API');
  }

  /**
   * Send email with HTML content using Resend API
   */
  async sendMail(options: {
    to: string;
    subject: string;
    html: string;
    text?: string;
  }): Promise<void> {
    if (!this.resend) {
      this.logger.error('Cannot send email: Resend not initialized');
      throw new Error(
        'Email service not configured. Please set RESEND_API_KEY.',
      );
    }

    const fromEmail = this.configService.get<string>('EMAIL_FROM');
    const fromName =
      this.configService.get<string>('EMAIL_FROM_NAME') ||
      'Tour Booking System';

    try {
      const { data, error } = await this.resend.emails.send({
        from: `${fromName} <${fromEmail}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || this.stripHtml(options.html),
      });

      if (error) {
        throw new Error(error.message);
      }

      this.logger.info(
        `Email sent successfully to: ${options.to} (ID: ${data?.id})`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to send email to ${options.to}: ${error.message}`,
      );
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  /**
   * Send welcome email with temporary password to new user
   */
  async sendNewUserEmail(
    email: string,
    fullName: string,
    temporaryPassword: string,
  ): Promise<void> {
    const appName =
      this.configService.get<string>('APP_NAME') || 'Tour Booking System';
    const appUrl =
      this.configService.get<string>('APP_URL') || 'http://localhost:3000';
    const supportEmail =
      this.configService.get<string>('SUPPORT_EMAIL') || 'support@example.com';

    const html = this.getNewUserEmailTemplate(
      fullName,
      email,
      temporaryPassword,
      appName,
      appUrl,
      supportEmail,
    );

    await this.sendMail({
      to: email,
      subject: `Welcome to ${appName} - Your Account Credentials`,
      html,
    });
  }

  /**
   * Email template for new user with temporary password
   */
  private getNewUserEmailTemplate(
    fullName: string,
    email: string,
    temporaryPassword: string,
    appName: string,
    appUrl: string,
    supportEmail: string,
  ): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ${appName}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 2px solid #4CAF50;
        }
        .header h1 {
            color: #4CAF50;
            margin: 0;
        }
        .content {
            margin-top: 30px;
        }
        .credentials-box {
            background-color: #f9f9f9;
            border-left: 4px solid #4CAF50;
            padding: 20px;
            margin: 20px 0;
        }
        .credential-item {
            margin: 10px 0;
        }
        .credential-label {
            font-weight: bold;
            color: #555;
        }
        .credential-value {
            font-family: 'Courier New', monospace;
            background-color: #fff;
            padding: 8px 12px;
            border-radius: 4px;
            border: 1px solid #ddd;
            display: inline-block;
            margin-top: 5px;
        }
        .password-warning {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
        }
        .password-warning strong {
            color: #d35400;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4CAF50;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 4px;
            margin: 20px 0;
            text-align: center;
        }
        .button:hover {
            background-color: #45a049;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            color: #777;
            font-size: 14px;
        }
        .security-tips {
            background-color: #e3f2fd;
            border-left: 4px solid #2196F3;
            padding: 15px;
            margin: 20px 0;
        }
        .security-tips h3 {
            margin-top: 0;
            color: #1976D2;
        }
        .security-tips ul {
            margin: 10px 0;
            padding-left: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${appName}</h1>
            <p>Welcome to Your Account</p>
        </div>

        <div class="content">
            <p>Hello <strong>${fullName}</strong>,</p>

            <p>Your account has been created by an administrator. You can now access the ${appName} system using the credentials below.</p>

            <div class="credentials-box">
                <h3 style="margin-top: 0; color: #4CAF50;">Your Login Credentials</h3>

                <div class="credential-item">
                    <div class="credential-label">Email:</div>
                    <div class="credential-value">${email}</div>
                </div>

                <div class="credential-item">
                    <div class="credential-label">Temporary Password:</div>
                    <div class="credential-value">${temporaryPassword}</div>
                </div>
            </div>

            <div class="password-warning">
                <strong>⚠️ Important Security Notice</strong><br>
                This is a <strong>temporary password</strong>. For security reasons, you will be required to change your password upon your first login.
            </div>

            <div style="text-align: center;">
                <a href="${appUrl}/auth/login" class="button">Login Now</a>
            </div>

            <div class="security-tips">
                <h3>🔒 Security Best Practices</h3>
                <ul>
                    <li>Change your password immediately after first login</li>
                    <li>Use a strong password with at least 8 characters</li>
                    <li>Include uppercase, lowercase, numbers, and special characters</li>
                    <li>Never share your password with anyone</li>
                    <li>Do not reuse passwords from other accounts</li>
                </ul>
            </div>

            <p style="margin-top: 30px;">
                If you have any questions or need assistance, please contact our support team at
                <a href="mailto:${supportEmail}">${supportEmail}</a>
            </p>
        </div>

        <div class="footer">
            <p>This email was sent by ${appName}<br>
            If you did not expect this email, please contact your system administrator.</p>
            <p style="font-size: 12px; color: #999;">
                Please do not reply to this automated email.
            </p>
        </div>
    </div>
</body>
</html>
    `;
  }

  /**
   * Send password reset email with reset token
   *
   * Email contains:
   * - Reset link with token
   * - 15-minute expiration warning
   * - Security notice about one-time use
   * - Info about all devices being logged out
   */
  async sendPasswordResetEmail(
    email: string,
    fullName: string,
    resetToken: string,
  ): Promise<void> {
    const appName =
      this.configService.get<string>('APP_NAME') || 'Tour Booking System';
    const appUrl =
      this.configService.get<string>('APP_URL') || 'http://localhost:3000';
    const supportEmail =
      this.configService.get<string>('SUPPORT_EMAIL') || 'support@example.com';

    const html = this.getPasswordResetEmailTemplate(
      fullName,
      resetToken,
      appName,
      appUrl,
      supportEmail,
    );

    await this.sendMail({
      to: email,
      subject: `${appName} - Password Reset Request`,
      html,
    });
  }

  /**
   * Email template for password reset
   */
  private getPasswordResetEmailTemplate(
    fullName: string,
    resetToken: string,
    appName: string,
    appUrl: string,
    supportEmail: string,
  ): string {
    const resetLink = `${appUrl}/auth/reset-password?token=${resetToken}`;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset - ${appName}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 2px solid #2196F3;
        }
        .header h1 {
            color: #2196F3;
            margin: 0;
        }
        .content {
            margin-top: 30px;
        }
        .button {
            display: inline-block;
            padding: 14px 28px;
            background-color: #2196F3;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 4px;
            margin: 20px 0;
            text-align: center;
            font-weight: bold;
            font-size: 16px;
        }
        .button:hover {
            background-color: #1976D2;
        }
        .expiry-warning {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .expiry-warning strong {
            color: #d35400;
        }
        .security-notice {
            background-color: #f8d7da;
            border-left: 4px solid #dc3545;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .security-notice h3 {
            margin-top: 0;
            color: #dc3545;
        }
        .info-box {
            background-color: #e3f2fd;
            border-left: 4px solid #2196F3;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .info-box h3 {
            margin-top: 0;
            color: #1976D2;
        }
        .info-box ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            color: #777;
            font-size: 14px;
        }
        .token-box {
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 15px;
            margin: 15px 0;
            word-break: break-all;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${appName}</h1>
            <p>Password Reset Request</p>
        </div>

        <div class="content">
            <p>Hello <strong>${fullName}</strong>,</p>

            <p>We received a request to reset your password for your ${appName} account. If you made this request, click the button below to reset your password:</p>

            <div style="text-align: center;">
                <a href="${resetLink}" class="button">Reset Password</a>
            </div>

            <div class="expiry-warning">
                <strong>⏰ Time Sensitive</strong><br>
                This password reset link will <strong>expire in 15 minutes</strong> for security reasons. If the link expires, you'll need to request a new password reset.
            </div>

            <div class="security-notice">
                <h3>🔒 Security Information</h3>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>This reset link can only be used <strong>once</strong></li>
                    <li>After resetting your password, you will be <strong>logged out from all devices</strong></li>
                    <li>You'll need to log in again with your new password</li>
                </ul>
            </div>

            <div class="info-box">
                <h3>ℹ️ Didn't Request This?</h3>
                <p style="margin: 10px 0;">
                    If you did not request a password reset, <strong>you can safely ignore this email</strong>. Your password will remain unchanged and your account is secure.
                </p>
                <p style="margin: 10px 0;">
                    However, if you're concerned about unauthorized access attempts, please contact our support team immediately at <a href="mailto:${supportEmail}">${supportEmail}</a>
                </p>
            </div>

            <p style="margin-top: 30px; font-size: 14px; color: #666;">
                <strong>Alternative:</strong> If the button doesn't work, copy and paste this link into your browser:
            </p>
            <div class="token-box">
                ${resetLink}
            </div>

            <p style="margin-top: 30px;">
                If you have any questions or need assistance, please contact our support team at
                <a href="mailto:${supportEmail}">${supportEmail}</a>
            </p>
        </div>

        <div class="footer">
            <p>This email was sent by ${appName}<br>
            This is an automated security email.</p>
            <p style="font-size: 12px; color: #999;">
                Please do not reply to this automated email.
            </p>
        </div>
    </div>
</body>
</html>
    `;
  }

  /**
   * Strip HTML tags for plain text fallback
   */
  private stripHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim();
  }

  /**
   * Test email configuration by sending a test email
   */
  async testEmailConfiguration(testEmail: string): Promise<boolean> {
    try {
      await this.sendMail({
        to: testEmail,
        subject: 'Email Configuration Test - Resend API',
        html: `
          <h1>✅ Email Configuration Test Successful</h1>
          <p>If you receive this email, your Resend API configuration is working correctly!</p>
          <hr>
          <p><small>Sent via Resend API (HTTPS) - Railway compatible</small></p>
        `,
      });
      return true;
    } catch (error) {
      this.logger.error(`Email configuration test failed: ${error.message}`);
      return false;
    }
  }
}
