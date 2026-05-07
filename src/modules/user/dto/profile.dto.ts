import { UserResponseDTO } from './user-response.dto';

export class ProfileDTO extends UserResponseDTO {
  // Same as UserResponseDTO for now
  // Can add additional computed fields if needed
  // Inherits all properties from UserResponseDTO:
  // - id, email, fullName, avatarUrl, role
  // - isActive, emailVerified, createdAt, updatedAt, lastLogin
}
