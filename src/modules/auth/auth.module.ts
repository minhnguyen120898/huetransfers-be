import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoggerService } from '../common/provider/logger.service';
import { UserModule } from '../user/user.module';
import { CommonModule } from '../common/common.module';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';

/**
 * Authentication Module
 *
 * Provides:
 * - User registration and login
 * - JWT token generation and validation (access + refresh tokens)
 * - Token rotation for enhanced security
 * - JWT authentication guard
 * - Roles-based authorization guard
 * - Current user decorator
 *
 * Architecture (follows repository pattern):
 * - AuthService → UserRepository → PrismaService → Database (user operations)
 * - AuthService → RefreshTokenRepository → PrismaService → Database (token operations)
 * - No direct PrismaService dependency in AuthService (separation of concerns)
 * - Consistent with project architecture pattern (NOTES.md)
 *
 * Exports:
 * - AuthService (for use in other modules if needed)
 * - JwtModule (for JWT guards in other modules)
 * - PassportModule (for authentication strategies)
 */
@Module({
  imports: [
    CommonModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN') || '7d',
          issuer: configService.get<string>('JWT_ISSUER') || 'tour-booking-api',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LoggerService, RefreshTokenRepository],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
