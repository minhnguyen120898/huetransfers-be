import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LoggerService } from '../../common/provider/logger.service';
import { CarBookingService } from '../service/car-booking.service';
import {
  CreateCarBookingDto,
  UpdateCarBookingDto,
  CarBookingQueryDto,
  CarBookingResponseDto,
  CarBookingCountQueryDto,
  CreateCarTransferBookingDto,
  UpdateCarTransferPricingDto,
  BulkCarPaymentStatusDto,
  CarBookingSummaryQueryDto,
  CarBookingSummaryResponseDto,
} from '../dto';
import {
  CarBookingPipe,
  UpdateCarBookingPipe,
  CarBookingQueryPipe,
  CarBookingCountQueryPipe,
  CreateCarTransferBookingPipe,
  UpdateCarTransferPricingPipe,
  BulkCarPaymentStatusPipe,
  CarBookingSummaryQueryPipe,
} from '../pipes';
import { PaginatedResultDTO } from '../../common/models/pagination.model';
import { CarBookingCountResult } from '../interfaces/car-booking.interface';

/**
 * Car Booking Controller
 *
 * REST API for car rental booking management.
 *
 * IMPORTANT ROUTE ORDERING (NestJS/Fastify):
 * Literal routes must be declared BEFORE parametric routes.
 * - @Get('count-by-status')   ← before @Get(':id')
 * - @Get('code/:bookingCode') ← uses own prefix, safe
 * - @Patch('bulk-payment-status') ← before @Patch(':id')
 */
@Controller('car-bookings')
@ApiTags('car-bookings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CarBookingController {
  constructor(
    private readonly carBookingService: CarBookingService,
    private readonly logger: LoggerService,
  ) {}

  // ============================================================
  // COLLECTION ENDPOINTS (before /:id to avoid route conflicts)
  // ============================================================

  @Get()
  @ApiOperation({
    summary: 'List car bookings',
    description:
      'Retrieve paginated list of car bookings. Transfer compensation bookings (isTransfer=true) are always excluded.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Car bookings retrieved successfully',
    type: CarBookingResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Invalid query parameters' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findAll(
    @Query(CarBookingQueryPipe) query: CarBookingQueryDto,
  ): Promise<PaginatedResultDTO<CarBookingResponseDto>> {
    return this.carBookingService.findAll(query);
  }

  // ⚠️ MUST be before @Get(':id')
  @Get('summary')
  @ApiOperation({
    summary: 'Get monthly car booking summary',
    description:
      'Get aggregated financial totals for car bookings in a specific month.\n\n' +
      '**Includes:** confirmed, completed, and transferred bookings. Excludes cancelled and transfer compensation bookings.\n\n' +
      '**Returns:** totalSellingPrice, totalReceivingPrice, totalDebtAmount, bookingCount',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Monthly summary retrieved successfully',
    type: CarBookingSummaryResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters (year or month out of range)',
  })
  async getSummary(
    @Query(CarBookingSummaryQueryPipe) query: CarBookingSummaryQueryDto,
  ): Promise<CarBookingSummaryResponseDto> {
    const result = await this.carBookingService.getSummary(
      query.year,
      query.month,
    );

    this.logger.info(
      `Retrieved car booking summary for ${query.year}-${query.month}: ${result.bookingCount} bookings`,
    );

    return result;
  }

  // ⚠️ MUST be before @Get(':id')
  @Get('count-by-status')
  @ApiOperation({
    summary: 'Get booking counts by status',
    description:
      'Returns confirmed count for badge display. Transfer bookings are always excluded.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Counts retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        confirmedCount: { type: 'number', example: 12 },
        totalCount: { type: 'number', example: 12 },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Invalid query parameters' })
  async getCountByStatus(
    @Query(CarBookingCountQueryPipe) query: CarBookingCountQueryDto,
  ): Promise<CarBookingCountResult> {
    return this.carBookingService.getCountByStatus(query);
  }

  // ⚠️ MUST be before @Get(':id') — uses 'code/' prefix, safe
  @Get('code/:bookingCode')
  @ApiOperation({ summary: 'Get car booking by booking code' })
  @ApiParam({
    name: 'bookingCode',
    description: 'Booking code (e.g. CB-20260220-A3F9B21C)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Car booking retrieved successfully',
    type: CarBookingResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Car booking not found' })
  async findByCode(
    @Param('bookingCode') bookingCode: string,
  ): Promise<CarBookingResponseDto> {
    return this.carBookingService.findByCode(bookingCode);
  }

  // ============================================================
  // SINGLE RESOURCE ENDPOINTS
  // ============================================================

  @Get(':id')
  @ApiOperation({ summary: 'Get car booking by ID' })
  @ApiParam({ name: 'id', description: 'Car booking ID (UUID)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Car booking retrieved successfully',
    type: CarBookingResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Car booking not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findOne(@Param('id') id: string): Promise<CarBookingResponseDto> {
    return this.carBookingService.findOne(id);
  }

  // ============================================================
  // CREATE
  // ============================================================

  @Post()
  @ApiOperation({
    summary: 'Create car booking',
    description:
      'Creates a new car booking. Status defaults to "confirmed". debtAmount = sellingPrice - receivingPrice.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Car booking created successfully',
    type: CarBookingResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data or inactive agency',
  })
  @ApiNotFoundResponse({ description: 'Travel agency not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(
    @Body(CarBookingPipe) dto: CreateCarBookingDto,
    @Req() req: FastifyRequest,
  ): Promise<CarBookingResponseDto> {
    const userId = req.user?.id;
    const booking = await this.carBookingService.create(dto, userId);
    this.logger.info(
      `[CarBookingController] POST /car-bookings → created ${booking.bookingCode}`,
    );
    return booking;
  }

  // ============================================================
  // BULK — MUST be before @Patch(':id')
  // ============================================================

  @Patch('bulk-payment-status')
  @ApiOperation({
    summary: 'Bulk update payment status',
    description: 'Update payment status for multiple car bookings at once.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Payment statuses updated successfully',
    schema: {
      type: 'object',
      properties: {
        count: { type: 'number', example: 5 },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid input or some booking IDs not found',
  })
  @ApiNotFoundResponse({ description: 'One or more booking IDs not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async bulkUpdatePaymentStatus(
    @Body(BulkCarPaymentStatusPipe) dto: BulkCarPaymentStatusDto,
    @Req() req: FastifyRequest,
  ): Promise<{ count: number }> {
    const userId = req.user?.id;
    return this.carBookingService.bulkUpdatePaymentStatus(dto, userId);
  }

  // ============================================================
  // UPDATE
  // ============================================================

  @Patch(':id')
  @ApiOperation({
    summary: 'Update car booking',
    description:
      'Update booking details. Status restrictions: confirmed=all editable; completed=note only; cancelled/transferred=blocked.',
  })
  @ApiParam({ name: 'id', description: 'Car booking ID (UUID)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Car booking updated successfully',
    type: CarBookingResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input or status does not allow updates',
  })
  @ApiNotFoundResponse({ description: 'Car booking not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(
    @Param('id') id: string,
    @Body(UpdateCarBookingPipe) dto: UpdateCarBookingDto,
    @Req() req: FastifyRequest,
  ): Promise<CarBookingResponseDto> {
    const userId = req.user?.id;
    return this.carBookingService.update(id, dto, userId);
  }

  // ============================================================
  // CANCEL TRANSFER
  // ============================================================

  // ⚠️ MUST be before @Delete(':id') — literal sub-path takes priority
  @Delete(':id/transfer')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Cancel a transferred car booking',
    description:
      'Atomically cancels a transferred car booking and its linked compensation booking.\n\n' +
      '**Guards:**\n' +
      '- Booking must have status `transferred`\n' +
      '- Service date must be in the current month (past months are frozen)\n' +
      '- Neither the original nor the compensation booking may have `paymentStatus=completed`\n\n' +
      '**Effect:** Both bookings are soft-cancelled. Debt and profit reports update automatically.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the original (transferred) car booking',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Both bookings cancelled successfully',
  })
  @ApiBadRequestResponse({
    description:
      'Guard failed — wrong status, past month, or payment already completed',
  })
  @ApiNotFoundResponse({ description: 'Car booking not found' })
  async cancelTransfer(
    @Param('id') id: string,
    @Req() req: FastifyRequest,
  ): Promise<{
    originalBooking: CarBookingResponseDto;
    compensationBooking: CarBookingResponseDto;
  }> {
    const userId = (req as any).user?.id as string | undefined;
    const result = await this.carBookingService.cancelTransfer(id, userId);
    this.logger.info(
      `[CarBookingController] Cancelled transfer for car booking ${id}`,
    );
    return result;
  }

  // ============================================================
  // CANCEL (soft delete)
  // ============================================================

  @Delete(':id')
  @ApiOperation({
    summary: 'Cancel car booking',
    description:
      'Cancel a car booking. Only confirmed bookings can be cancelled.',
  })
  @ApiParam({ name: 'id', description: 'Car booking ID (UUID)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Car booking cancelled successfully',
    type: CarBookingResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Booking cannot be cancelled in its current status',
  })
  @ApiNotFoundResponse({ description: 'Car booking not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async remove(
    @Param('id') id: string,
    @Req() req: FastifyRequest,
  ): Promise<CarBookingResponseDto> {
    const userId = req.user?.id;
    const booking = await this.carBookingService.remove(id, userId);
    this.logger.info(
      `[CarBookingController] DELETE /car-bookings/${id} → cancelled ${booking.bookingCode}`,
    );
    return booking;
  }

  // ============================================================
  // TRANSFER
  // ============================================================

  @Post(':id/transfer')
  @ApiOperation({
    summary: 'Transfer car booking to partner agency',
    description:
      'Marks the original booking as "transferred" and creates a compensation booking for the partner agency. ' +
      'Only confirmed non-transfer bookings can be transferred.',
  })
  @ApiParam({ name: 'id', description: 'Original car booking ID (UUID)' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Transfer completed successfully',
    schema: {
      type: 'object',
      properties: {
        originalBooking: { $ref: '#/components/schemas/CarBookingResponseDto' },
        transferBooking: { $ref: '#/components/schemas/CarBookingResponseDto' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Booking cannot be transferred or invalid input',
  })
  @ApiNotFoundResponse({ description: 'Booking or partner agency not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @HttpCode(HttpStatus.CREATED)
  async transferToPartnerAgency(
    @Param('id') id: string,
    @Body(CreateCarTransferBookingPipe) dto: CreateCarTransferBookingDto,
    @Req() req: FastifyRequest,
  ): Promise<{
    originalBooking: CarBookingResponseDto;
    transferBooking: CarBookingResponseDto;
  }> {
    const userId = req.user?.id;
    const result = await this.carBookingService.transferToPartnerAgency(
      id,
      dto,
      userId,
    );
    this.logger.info(
      `[CarBookingController] POST /car-bookings/${id}/transfer → ` +
        `original=${result.originalBooking.bookingCode}, transfer=${result.transferBooking.bookingCode}`,
    );
    return result;
  }

  @Patch(':id/transfer-pricing')
  @ApiOperation({
    summary: 'Update transfer compensation pricing',
    description:
      'Adjust the compensation amount for an already-transferred booking. ' +
      'Works on the original booking (must be status=transferred).',
  })
  @ApiParam({ name: 'id', description: 'Original car booking ID (UUID)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transfer pricing updated successfully',
    schema: {
      type: 'object',
      properties: {
        originalBooking: { $ref: '#/components/schemas/CarBookingResponseDto' },
        transferBooking: { $ref: '#/components/schemas/CarBookingResponseDto' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Booking is not in transferred status',
  })
  @ApiNotFoundResponse({ description: 'Booking or transfer booking not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async updateTransferPricing(
    @Param('id') id: string,
    @Body(UpdateCarTransferPricingPipe) dto: UpdateCarTransferPricingDto,
    @Req() req: FastifyRequest,
  ): Promise<{
    originalBooking: CarBookingResponseDto;
    transferBooking: CarBookingResponseDto;
  }> {
    const userId = req.user?.id;
    return this.carBookingService.updateTransferPricing(id, dto, userId);
  }
}
