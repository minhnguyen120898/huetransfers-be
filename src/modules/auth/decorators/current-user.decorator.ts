import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Current User Decorator
 * Extracts the authenticated user from the request
 *
 * Usage:
 * @Get('profile')
 * async getProfile(@CurrentUser() user) {
 *   return user; // Full user object
 * }
 *
 * @Get('my-bookings')
 * async getMyBookings(@CurrentUser('id') userId: string) {
 *   return this.bookingService.findByUser(userId); // Just user ID
 * }
 */
export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data ? user?.[data] : user;
  },
);
