import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { LoggerService } from '../../common/provider/logger.service';
import { EmailService } from '../../common/provider/email.service';
import {
  UserResponseDTO,
  ProfileDTO,
  CreateUserDTO,
  UpdateUserDTO,
  ChangePasswordDTO,
  UserQueryDTO,
} from '../dto';
import { PaginatedResultDTO } from '../../common/models/pagination.model';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'generated/prisma';
import { UserEntity } from '../entities/user.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class UserService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: LoggerService,
    private readonly emailService: EmailService,
  ) {}

  /**
   * Generate a secure random temporary password
   * Format: 3 random words + 2 digits + 1 special character
   */
  private generateTemporaryPassword(): string {
    // Generate 12 random characters including:
    // - Uppercase letters
    // - Lowercase letters
    // - Numbers
    // - Special characters
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    const specialChars = '@#$%&*!';

    let password = '';

    // Add 10 random alphanumeric characters
    for (let i = 0; i < 10; i++) {
      const randomIndex = randomBytes(1)[0] % chars.length;
      password += chars[randomIndex];
    }

    // Add 2 special characters
    for (let i = 0; i < 2; i++) {
      const randomIndex = randomBytes(1)[0] % specialChars.length;
      password += specialChars[randomIndex];
    }

    // Shuffle the password
    return password
      .split('')
      .sort(() => randomBytes(1)[0] - 128)
      .join('');
  }

  /**
   * Create a new user with temporary password
   * Sends welcome email with credentials
   */
  async create(createUserDto: CreateUserDTO): Promise<UserResponseDTO> {
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException(
        `User with email ${createUserDto.email} already exists`,
      );
    }

    // Generate temporary password
    const temporaryPassword = this.generateTemporaryPassword();
    const passwordHash = await bcrypt.hash(temporaryPassword, this.SALT_ROUNDS);

    const user = await this.userRepository.create({
      email: createUserDto.email,
      passwordHash,
      fullName: createUserDto.fullName,
      role: createUserDto.role || UserRole.user,
      avatarUrl: createUserDto.avatarUrl,
      mustChangePassword: true,
    });

    this.logger.info(
      `User created: ${user.id} - ${user.email} (temporary password generated)`,
    );

    // Send welcome email with temporary password
    try {
      await this.emailService.sendNewUserEmail(
        user.email,
        user.fullName,
        temporaryPassword,
      );
      this.logger.info(`Welcome email sent to: ${user.email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send welcome email to ${user.email}: ${error.message}`,
      );
      // Don't fail user creation if email fails
      // Admin can manually communicate credentials if needed
    }

    return this.mapToResponseDTO(user);
  }

  async findMany(
    query: UserQueryDTO,
  ): Promise<PaginatedResultDTO<UserResponseDTO>> {
    const result = await this.userRepository.findMany(query);
    return {
      data: result.data.map((user) => this.mapToResponseDTO(user)),
      meta: result.meta,
    };
  }

  async findById(id: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.mapToResponseDTO(user);
  }

  async getMe(userId: string): Promise<ProfileDTO> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return this.mapToProfileDTO(user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDTO,
  ): Promise<UserResponseDTO> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const userWithEmail = await this.userRepository.findByEmail(
        updateUserDto.email,
      );
      if (userWithEmail) {
        throw new ConflictException(
          `Email ${updateUserDto.email} is already taken`,
        );
      }
    }

    const updatedUser = await this.userRepository.update(id, updateUserDto);
    this.logger.info(`User updated: ${id}`);
    return this.mapToResponseDTO(updatedUser);
  }

  async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDTO,
  ): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Business rule: Verify current password
    const isPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(
      changePasswordDto.newPassword,
      this.SALT_ROUNDS,
    );

    await this.userRepository.updatePassword(userId, newPasswordHash);
    this.logger.info(`Password changed for user: ${userId}`);
  }

  async softDelete(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.softDelete(id);
    this.logger.info(`User deactivated: ${id}`);
  }

  // Mapper methods - exclude sensitive fields
  private mapToResponseDTO(user: UserEntity): UserResponseDTO {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      tel: user.tel,
      avatarUrl: user.avatarUrl,
      role: user.role,
      isActive: user.isActive,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLogin: user.lastLogin,
    };
  }

  private mapToProfileDTO(user: UserEntity): ProfileDTO {
    return this.mapToResponseDTO(user);
  }
}
