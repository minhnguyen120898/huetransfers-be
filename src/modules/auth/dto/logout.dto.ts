import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO for logout request
 * Refresh token is optional:
 * - If provided: Logout from current device only
 * - If not provided: Logout from all devices
 */
export class LogoutDto {
  @ApiPropertyOptional({
    description:
      'Refresh token to logout from current device. If omitted, logs out from all devices.',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken?: string;
}
