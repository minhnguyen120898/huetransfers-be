import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'generated/prisma';

/**
 * Roles Guard
 * Checks if user has required role(s) to access route
 *
 * Usage with @Roles decorator:
 * @UseGuards(JwtAuthGuard, RolesGuard)
 * @Roles(UserRole.admin)
 * @Get('admin-only')
 * async adminRoute() {
 *   // Only admin can access
 * }
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return requiredRoles.some((role) => user?.role === role);
  }
}
