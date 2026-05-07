import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JWT Authentication Guard
 * Protects routes by requiring valid JWT token
 *
 * Usage:
 * @UseGuards(JwtAuthGuard)
 * @Get('protected-route')
 * async protectedRoute(@CurrentUser() user) {
 *   // User is authenticated
 * }
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
