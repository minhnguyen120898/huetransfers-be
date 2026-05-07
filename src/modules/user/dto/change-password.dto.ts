import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDTO {
  @ApiProperty({
    description: 'Current password for verification',
    example: 'OldPassword123!',
    minLength: 8,
  })
  currentPassword: string;

  @ApiProperty({
    description: 'New password (minimum 8 characters)',
    example: 'NewSecurePass456!',
    minLength: 8,
  })
  newPassword: string;
}
