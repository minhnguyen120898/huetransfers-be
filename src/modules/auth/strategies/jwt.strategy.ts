import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../../user/repositories/user.repository';

/**
 * JWT payload structure
 */
interface JwtPayload {
  sub: string; // User ID
  email: string;
  role: string;
}

/**
 * JWT Strategy for Passport authentication
 * Validates JWT tokens and attaches user to request
 *
 * Architecture:
 * - Uses UserRepository for data access (follows project pattern)
 * - Consistent with AuthService architecture
 * - Single source of truth for User queries
 * - No direct PrismaService dependency (separation of concerns)
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  /**
   * Validate JWT payload and return user
   * This method is called automatically by Passport after token verification
   *
   * @param payload - Decoded JWT payload
   * @returns Safe user object (without sensitive fields)
   * @throws UnauthorizedException if user not found or inactive
   */
  async validate(payload: JwtPayload) {
    const user = await this.userRepository.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    };
  }
}
