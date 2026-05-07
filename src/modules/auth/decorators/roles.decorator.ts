import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'generated/prisma';

/**
 * Roles Decorator
 * Specifies which roles can access a route
 * Must be used with RolesGuard
 *
 * Usage:
 * @UseGuards(JwtAuthGuard, RolesGuard)
 * @Roles(UserRole.admin)
 * @Delete(':id')
 * async deleteUser(@Param('id') id: string) {
 *   // Only admin can delete users
 * }
 *
 * @UseGuards(JwtAuthGuard, RolesGuard)
 * @Roles(UserRole.admin, UserRole.manager)
 * @Get('reports')
 * async getReports() {
 *   // Admin and manager can access
 * }
 */
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
