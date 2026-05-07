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
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LoggerService } from '../../common/provider/logger.service';
import { ExpenseService } from '../service/expense.service';
import {
  CreateExpenseDto,
  UpdateExpenseDto,
  ExpenseQueryDto,
  ExpenseResponseDto,
  ExpenseSummaryDto,
} from '../dto';
import {
  ExpensePipe,
  UpdateExpensePipe,
  ExpenseQueryPipe,
  ExpenseSummaryPipe,
} from '../pipes';
import { PaginatedResultDTO } from '../../common/models/pagination.model';

/**
 * Expense Controller
 *
 * REST API endpoints for fleet expense management.
 * Tracks costs like gasoline, maintenance, insurance, and other fleet expenses.
 *
 * IMPORTANT: Route ordering — literal routes (summary) must come before /:id
 */
@Controller('expenses')
@ApiTags('expenses')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly logger: LoggerService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'List expenses with pagination and filters',
    description:
      'Retrieve paginated list of active expenses with optional category, year, month, and search filters',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Expenses retrieved successfully',
    type: ExpenseResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Invalid query parameters' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findMany(
    @Query(ExpenseQueryPipe) query: ExpenseQueryDto,
  ): Promise<PaginatedResultDTO<ExpenseResponseDto>> {
    return this.expenseService.findMany(query);
  }

  // ⚠️ MUST be before @Get(':id') — literal route takes priority
  @Get('summary')
  @ApiOperation({
    summary: 'Get monthly expense summary by category',
    description:
      'Returns total amounts grouped by category for a specific month',
  })
  @ApiQuery({ name: 'year', required: true, type: Number, example: 2026 })
  @ApiQuery({ name: 'month', required: true, type: Number, example: 3 })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Summary retrieved successfully',
    type: ExpenseSummaryDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid query parameters' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getSummary(
    @Query(ExpenseSummaryPipe) query: { year: number; month: number },
  ): Promise<ExpenseSummaryDto> {
    return this.expenseService.getSummaryByMonth(query.year, query.month);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get expense by ID' })
  @ApiParam({ name: 'id', description: 'Expense ID (UUID)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Expense retrieved successfully',
    type: ExpenseResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Expense not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findById(@Param('id') id: string): Promise<ExpenseResponseDto> {
    return this.expenseService.findById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create expense',
    description: 'Create a new fleet expense record',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Expense created successfully',
    type: ExpenseResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(
    @Body(ExpensePipe) dto: CreateExpenseDto,
    @Req() req: FastifyRequest,
  ): Promise<ExpenseResponseDto> {
    const userId = req.user?.id;
    const expense = await this.expenseService.create(dto, userId);
    this.logger.info(
      `[ExpenseController] POST /expenses → created ${expense.id}`,
    );
    return expense;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update expense' })
  @ApiParam({ name: 'id', description: 'Expense ID (UUID)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Expense updated successfully',
    type: ExpenseResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiNotFoundResponse({ description: 'Expense not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(
    @Param('id') id: string,
    @Body(UpdateExpensePipe) dto: UpdateExpenseDto,
    @Req() req: FastifyRequest,
  ): Promise<ExpenseResponseDto> {
    const userId = req.user?.id;
    return this.expenseService.update(id, dto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete expense (soft delete)',
    description: 'Soft deletes an expense by setting isActive = false',
  })
  @ApiParam({ name: 'id', description: 'Expense ID (UUID)' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Expense deleted successfully',
  })
  @ApiNotFoundResponse({ description: 'Expense not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async remove(
    @Param('id') id: string,
    @Req() req: FastifyRequest,
  ): Promise<void> {
    const userId = req.user?.id;
    await this.expenseService.remove(id, userId);
  }
}
