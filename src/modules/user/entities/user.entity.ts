import { UserRole } from 'generated/prisma';

export class UserEntity {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  tel: string | null;
  avatarUrl: string | null;
  role: UserRole;
  isActive: boolean;
  emailVerified: boolean;
  mustChangePassword: boolean;
  emailVerificationToken: string | null;
  passwordResetToken: string | null;
  passwordResetExpires: Date | null;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;

  isAdmin(): boolean {
    return this.role === UserRole.admin;
  }

  isEmailVerified(): boolean {
    return this.emailVerified;
  }

  canLogin(): boolean {
    return this.isActive && this.emailVerified;
  }

  requiresPasswordChange(): boolean {
    return this.mustChangePassword;
  }
}
