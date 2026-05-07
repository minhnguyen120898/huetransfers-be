import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Delete,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import type { FastifyRequest } from 'fastify';
import { TravelAgencyService } from '../service';
import { LoggerService } from '../../common/provider/logger.service';
import {
  CreateTravelAgencyDTO,
  UpdateTravelAgencyDTO,
  TravelAgencyResponseDTO,
  TravelAgencyQueryDTO,
} from '../dto';
import {
  TravelAgencyPipe,
  UpdateTravelAgencyPipe,
  TravelAgencyQueryPipe,
} from '../pipes';
import { PaginatedResultDTO } from '../../common/models/pagination.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('travel-agency')
@ApiTags('travel-agencies')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TravelAgencyController {
  constructor(
    private readonly logger: LoggerService,
    private readonly travelAgencyService: TravelAgencyService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Find travel agencies with pagination and filters',
    description:
      'Retrieve a paginated list of travel agencies with optional filters for active status and search by name',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved travel agencies list',
    type: TravelAgencyResponseDTO,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Invalid query parameters' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getAll(
    @Query(TravelAgencyQueryPipe) query: TravelAgencyQueryDTO,
  ): Promise<PaginatedResultDTO<TravelAgencyResponseDTO>> {
    return this.travelAgencyService.findMany(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find travel agency by ID',
    description:
      'Retrieve detailed information of a specific travel agency by their ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Travel Agency ID (UUID)',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved travel agency',
    type: TravelAgencyResponseDTO,
  })
  @ApiNotFoundResponse({ description: 'Travel agency not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getAgencyById(
    @Param('id') id: string,
  ): Promise<TravelAgencyResponseDTO> {
    return this.travelAgencyService.findById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create travel agency',
    description:
      'Create a new travel agency with name and optional contact information',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Travel agency successfully created',
    type: TravelAgencyResponseDTO,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data or agency name already exists',
  })
  @ApiConflictResponse({
    description: 'Travel agency with this name already exists',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(
    @Body(TravelAgencyPipe) input: CreateTravelAgencyDTO,
    @Req() req: FastifyRequest,
  ): Promise<TravelAgencyResponseDTO> {
    // JwtAuthGuard sets req.user after JWT verification
    const userId = req.user?.id;

    const travelAgency = await this.travelAgencyService.create(input, userId);
    this.logger.info(`Created new travel agency with ID ${travelAgency.id}`);
    return travelAgency;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update travel agency',
    description:
      'Update travel agency information (name, contact details, active status)',
  })
  @ApiParam({
    name: 'id',
    description: 'Travel Agency ID (UUID)',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Travel agency successfully updated',
    type: TravelAgencyResponseDTO,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiNotFoundResponse({ description: 'Travel agency not found' })
  @ApiConflictResponse({
    description: 'Another travel agency with this name already exists',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(
    @Param('id') id: string,
    @Body(UpdateTravelAgencyPipe) input: UpdateTravelAgencyDTO,
    @Req() req: FastifyRequest,
  ): Promise<TravelAgencyResponseDTO> {
    // JwtAuthGuard sets req.user after JWT verification
    const userId = req.user?.id;

    return this.travelAgencyService.update(id, input, userId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deactivate travel agency (soft delete)',
    description:
      'Soft delete a travel agency by setting their active status to false',
  })
  @ApiParam({
    name: 'id',
    description: 'Travel Agency ID (UUID)',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Travel agency successfully deactivated',
  })
  @ApiNotFoundResponse({ description: 'Travel agency not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.travelAgencyService.softDelete(id);
  }
}
