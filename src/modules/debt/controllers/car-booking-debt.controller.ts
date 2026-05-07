import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LoggerService } from '../../common/provider/logger.service';
import { CarBookingDebtService } from '../services/car-booking-debt.service';
import { DebtQueryPipe } from '../pipes/debt-query.pipe';
import { DebtQueryDto } from '../dto/debt-query.dto';
import {
  CarBookingDebtListReportResponseDto,
  CarBookingDebtDetailReportResponseDto,
} from '../dto/car-booking-debt-response.dto';
import {
  CarBookingDebtListReport,
  CarBookingDebtDetailReport,
} from '../services/car-booking-debt.service';

/**
 * Car Booking Debt Controller — Isolated from tour booking debt
 *
 * Provides receivables reporting for car rental bookings.
 *
 * ISOLATION GUARANTEE:
 * - Does NOT depend on or modify any existing debt service/controller
 * - Uses its own CarBookingDebtService
 * - Reuses DebtQueryPipe and DebtQueryDto (shared validation — read-only)
 *
 * QUERY RULES (always enforced):
 * - isTransfer=false: transfer compensation bookings excluded from all reports
 * - status IN (confirmed, completed, transferred): only active bookings
 * - serviceDate within the requested month
 *
 * ENDPOINTS:
 *   GET /debts/car-bookings          — list all agencies with car booking debt
 *   GET /debts/car-bookings/:id      — detail for one agency (with booking line items)
 */
@Controller('debts/car-bookings')
@ApiTags('Car Booking Debts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CarBookingDebtController {
  constructor(
    private readonly carBookingDebtService: CarBookingDebtService,
    private readonly logger: LoggerService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'List car booking debt by agency',
    description:
      'Returns summary-level car booking debt for all active agencies in the requested month. ' +
      'Transfer compensation bookings (isTransfer=true) are always excluded. ' +
      'Only counts bookings with status: confirmed, completed, or transferred.',
  })
  @ApiQuery({ name: 'year', required: true, type: Number, example: 2026 })
  @ApiQuery({ name: 'month', required: true, type: Number, example: 3 })
  @ApiQuery({
    name: 'paymentStatus',
    required: false,
    type: String,
    isArray: true,
    example: ['pending', 'partial'],
    description: 'Optional payment status filter',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Optional search by agency name (case-insensitive)',
  })
  @ApiResponse({
    status: 200,
    description: 'Car booking debt list retrieved successfully',
    type: CarBookingDebtListReportResponseDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getCarBookingDebtListReport(
    @Query(DebtQueryPipe) query: DebtQueryDto,
  ): Promise<CarBookingDebtListReport> {
    this.logger.info(
      `[CarBookingDebtController] GET /debts/car-bookings year=${query.year} month=${query.month}`,
    );
    return this.carBookingDebtService.getCarBookingDebtListReport(
      query.year,
      query.month,
      query.paymentStatus,
      query.search,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get car booking debt detail for one agency',
    description:
      'Returns full car booking debt detail for a specific travel agency, ' +
      'including individual booking line items. ' +
      'Transfer compensation bookings are always excluded.',
  })
  @ApiParam({ name: 'id', description: 'Travel agency ID (UUID)' })
  @ApiQuery({ name: 'year', required: true, type: Number, example: 2026 })
  @ApiQuery({ name: 'month', required: true, type: Number, example: 3 })
  @ApiQuery({
    name: 'paymentStatus',
    required: false,
    type: String,
    isArray: true,
    example: ['pending'],
  })
  @ApiResponse({
    status: 200,
    description: 'Car booking debt detail retrieved successfully',
    type: CarBookingDebtDetailReportResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Agency not found or inactive' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getCarBookingDebtDetailReport(
    @Param('id') agencyId: string,
    @Query(DebtQueryPipe) query: DebtQueryDto,
  ): Promise<CarBookingDebtDetailReport> {
    this.logger.info(
      `[CarBookingDebtController] GET /debts/car-bookings/${agencyId} year=${query.year} month=${query.month}`,
    );
    return this.carBookingDebtService.getCarBookingDebtDetailReport(
      query.year,
      query.month,
      agencyId,
      query.paymentStatus,
    );
  }
}
