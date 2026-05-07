import {
  Controller,
  Get,
  Query,
  Param,
  HttpStatus,
  UseGuards,
  Res,
  StreamableFile,
} from '@nestjs/common';
import type { FastifyReply } from 'fastify';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiProduces,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { LoggerService } from 'src/modules/common';
import { CarBookingDebtExcelService } from '../services/car-booking-debt-excel.service';
import { CarBookingDebtService } from '../services/car-booking-debt.service';
import { DebtQueryDto } from '../dto';
import { DebtQueryPipe } from '../pipes';
import { PaymentStatus } from 'generated/prisma';

@ApiTags('Debt Excel Export')
@Controller('debts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DebtExcelController {
  constructor(
    private readonly carBookingDebtService: CarBookingDebtService,
    private readonly carBookingExcelService: CarBookingDebtExcelService,
    private readonly logger: LoggerService,
  ) {}

  @Get('car-bookings/:id/excel')
  @ApiOperation({
    summary: 'Download car booking debt report as Excel',
    description:
      'Generate and download Excel file for specific agency car booking debt report. ' +
      'File format: "CarDebt_[Month]_[Year]_[Agency_Name].xlsx"',
  })
  @ApiQuery({ name: 'year', required: true, type: Number, example: 2026 })
  @ApiQuery({ name: 'month', required: true, type: Number, example: 3 })
  @ApiQuery({
    name: 'paymentStatus',
    required: false,
    enum: PaymentStatus,
    isArray: true,
    example: ['pending', 'partial'],
  })
  @ApiProduces(
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  @ApiResponse({ status: HttpStatus.OK, description: 'Excel file downloaded' })
  @ApiBadRequestResponse({ description: 'Invalid parameters' })
  @ApiNotFoundResponse({ description: 'Agency not found or inactive' })
  @ApiInternalServerErrorResponse({ description: 'Failed to generate Excel' })
  async downloadCarBookingDebtExcel(
    @Param('id') agencyId: string,
    @Query(DebtQueryPipe) query: DebtQueryDto,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<StreamableFile> {
    this.logger.info(
      `[DebtExcelController] GET /debts/car-bookings/${agencyId}/excel year=${query.year} month=${query.month}`,
    );

    const report =
      await this.carBookingDebtService.getCarBookingDebtDetailReport(
        query.year,
        query.month,
        agencyId,
        query.paymentStatus,
      );

    const buffer =
      await this.carBookingExcelService.generateCarBookingDebtExcel(report);
    const filename = this.carBookingExcelService.generateFilename(report);

    reply.header(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    reply.header('Content-Disposition', `attachment; filename="${filename}"`);
    reply.header('Content-Length', buffer.length);

    return new StreamableFile(buffer);
  }
}
