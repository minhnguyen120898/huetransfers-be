import { Controller, Get, Query, HttpStatus, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { LoggerService } from 'src/modules/common';
import { CarProfitService } from '../services';
import { CarProfitQueryDto, CarMonthlyProfitSummaryResponseDto } from '../dto';
import { CarProfitQueryPipe } from '../pipes';
import { CarMonthlyProfitSummary } from '../interfaces';

@ApiTags('Profit')
@Controller('profit')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CarProfitController {
  constructor(
    private readonly carProfitService: CarProfitService,
    private readonly logger: LoggerService,
  ) {}

  @Get('car-summary')
  @ApiOperation({
    summary: 'Get monthly car booking profit summary',
    description:
      'Retrieve monthly profit summary for the car booking system.\n\n' +
      '**Booking Financials:**\n' +
      '- Gross Revenue: SUM(sellingPrice) of non-transfer bookings\n' +
      '- Transfer Deductions: Net cost of bookings transferred to partners\n' +
      '- Revenue: Gross revenue minus transfer deductions\n\n' +
      '**Transfer Financials:**\n' +
      '- Per-transfer detail: original booking, partner agency, compensation vs original price\n\n' +
      '**Expense Financials:**\n' +
      '- Fleet expenses by category: gasoline, maintenance, insurance, bank, other\n\n' +
      '**Formula:**\n' +
      '- netProfit = revenue - totalExpenses\n' +
      '- totalProfit = netProfit',
  })
  @ApiQuery({ name: 'year', required: true, type: Number, example: 2026 })
  @ApiQuery({ name: 'month', required: true, type: Number, example: 4 })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Car booking profit summary retrieved successfully',
    type: CarMonthlyProfitSummaryResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid query parameters' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getCarMonthlyProfitSummary(
    @Query(CarProfitQueryPipe) query: CarProfitQueryDto,
  ): Promise<CarMonthlyProfitSummary> {
    this.logger.info(
      `[CarProfitController] GET /profit/car-summary?year=${query.year}&month=${query.month}`,
    );

    const summary = await this.carProfitService.getCarMonthlyProfitSummary(
      query.year,
      query.month,
    );

    this.logger.info(
      `[CarProfitController] Car profit summary completed: totalProfit=${summary.totalProfit.toString()} VND`,
    );

    return summary;
  }
}
