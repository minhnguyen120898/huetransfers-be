import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for refresh token request
 * Used to obtain a new access token without re-authentication
 */
export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token obtained from login/register',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;
}
