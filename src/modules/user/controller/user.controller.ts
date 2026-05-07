import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Patch,
  Delete,
  Query,
  Req,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import type { FastifyRequest } from 'fastify';
import { UserService } from '../service';
import { LoggerService } from '../../common/provider/logger.service';
import {
  CreateUserDTO,
  UpdateUserDTO,
  UserResponseDTO,
  ProfileDTO,
  ChangePasswordDTO,
  UserQueryDTO,
} from '../dto';
import {
  UserPipe,
  UpdateUserPipe,
  ChangePasswordPipe,
  UserQueryPipe,
} from '../pipes';
import { PaginatedResultDTO } from '../../common/models/pagination.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from 'generated/prisma';

@Controller('user')
@ApiTags('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly logger: LoggerService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Find users with pagination and filters',
    description:
      'Retrieve a paginated list of users with optional filters for role, active status, and search by email or name',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved users list',
    type: UserResponseDTO,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Invalid query parameters' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getAll(
    @Query(UserQueryPipe) query: UserQueryDTO,
  ): Promise<PaginatedResultDTO<UserResponseDTO>> {
    return this.userService.findMany(query);
  }

  @Get('me')
  @ApiOperation({
    summary: 'Get current user profile',
    description:
      'Retrieve the profile information of the currently authenticated user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved user profile',
    type: ProfileDTO,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getMe(@Req() req: FastifyRequest): Promise<ProfileDTO> {
    const user = req.user;
    const userId = user?.id;

    if (!userId) {
      throw new NotFoundException('User ID not found in request');
    }
    return this.userService.getMe(userId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find user by id',
    description: 'Retrieve detailed information of a specific user by their ID',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID (UUID)',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved user',
    type: UserResponseDTO,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getUserById(@Param('id') id: string): Promise<UserResponseDTO> {
    return this.userService.findById(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.admin)
  @ApiOperation({
    summary: 'Create user (Admin only)',
    description:
      'Create a new user account with email, password, and profile information. This endpoint is restricted to admin users only. There is no public registration endpoint.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully created',
    type: UserResponseDTO,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data or email already exists',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Admin role required',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body(UserPipe) input: CreateUserDTO): Promise<UserResponseDTO> {
    const user = await this.userService.create(input);
    this.logger.info(`Created new user with ID ${user.id}`);
    return user;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update user',
    description:
      'Update user profile information (email, full name, avatar, active status)',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID (UUID)',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully updated',
    type: UserResponseDTO,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(
    @Param('id') id: string,
    @Body(UpdateUserPipe) input: UpdateUserDTO,
  ): Promise<UserResponseDTO> {
    return this.userService.update(id, input);
  }

  @Patch(':id/password')
  @ApiOperation({
    summary: 'Change user password',
    description:
      'Change user password by providing current password and new password',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID (UUID)',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Password successfully changed',
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data or incorrect current password',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async changePassword(
    @Param('id') id: string,
    @Body(ChangePasswordPipe) input: ChangePasswordDTO,
  ): Promise<void> {
    await this.userService.changePassword(id, input);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deactivate user (soft delete)',
    description: 'Soft delete a user by setting their active status to false',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID (UUID)',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User successfully deactivated',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.userService.softDelete(id);
  }
}
