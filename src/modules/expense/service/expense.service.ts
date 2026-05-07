import { Injectable, NotFoundException } from '@nestjs/common';
import { ExpenseRepository } from '../repositories/expense.repository';
import { LoggerService } from '../../common/provider/logger.service';
import {
  CreateExpenseDto,
  UpdateExpenseDto,
  ExpenseQueryDto,
  ExpenseResponseDto,
  ExpenseSummaryDto,
} from '../dto';
import { PaginatedResultDTO } from '../../common/models/pagination.model';
import { ExpenseEntity } from '../entities/expense.entity';

/**
 * Expense Service
 * Business logic for fleet expense management
 */
@Injectable()
export class ExpenseService {
  constructor(
    private readonly expenseRepository: ExpenseRepository,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Create a new expense record
   */
  async create(
    dto: CreateExpenseDto,
    userId?: string,
  ): Promise<ExpenseResponseDto> {
    const expense = await this.expenseRepository.create({
      title: dto.title,
      amount: dto.amount,
      category: dto.category,
      month: dto.month,
      year: dto.year,
      note: dto.note,
      createdById: userId,
      updatedById: userId,
    });

    this.logger.info(
      `[ExpenseService] Created expense: ${expense.id} - ${expense.title} (${expense.category}: ${expense.amount})`,
    );

    return this.mapToResponseDto(expense);
  }

  /**
   * Find many expenses with pagination and filters
   */
  async findMany(
    query: ExpenseQueryDto,
  ): Promise<PaginatedResultDTO<ExpenseResponseDto>> {
    const result = await this.expenseRepository.findMany(query);

    return {
      data: result.data.map((e) => this.mapToResponseDto(e)),
      meta: result.meta,
    };
  }

  /**
   * Find expense by ID
   */
  async findById(id: string): Promise<ExpenseResponseDto> {
    const expense = await this.expenseRepository.findById(id);

    if (!expense || !expense.isActive) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    return this.mapToResponseDto(expense);
  }

  /**
   * Update expense record
   */
  async update(
    id: string,
    dto: UpdateExpenseDto,
    userId?: string,
  ): Promise<ExpenseResponseDto> {
    const existing = await this.expenseRepository.findById(id);

    if (!existing || !existing.isActive) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    const expense = await this.expenseRepository.update(id, {
      ...dto,
      updatedById: userId,
    });

    this.logger.info(`[ExpenseService] Updated expense: ${id}`);

    return this.mapToResponseDto(expense);
  }

  /**
   * Soft delete expense (set isActive = false)
   */
  async remove(id: string, userId?: string): Promise<void> {
    const existing = await this.expenseRepository.findById(id);

    if (!existing || !existing.isActive) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    await this.expenseRepository.softDelete(id, userId);

    this.logger.info(`[ExpenseService] Soft deleted expense: ${id}`);
  }

  /**
   * Get monthly expense summary grouped by category
   */
  async getSummaryByMonth(
    year: number,
    month: number,
  ): Promise<ExpenseSummaryDto> {
    const summary = await this.expenseRepository.getSummaryByMonth(year, month);

    this.logger.info(
      `[ExpenseService] Summary for ${year}-${month.toString().padStart(2, '0')}: total=${summary.totalAmount}, count=${summary.expenseCount}`,
    );

    return {
      totalAmount: summary.totalAmount,
      byCategory: summary.byCategory,
      expenseCount: summary.expenseCount,
      year: summary.year,
      month: summary.month,
    };
  }

  /**
   * Map ExpenseEntity to ExpenseResponseDto
   */
  private mapToResponseDto(entity: ExpenseEntity): ExpenseResponseDto {
    return {
      id: entity.id,
      title: entity.title,
      amount: Number(entity.amount),
      category: entity.category,
      month: entity.month,
      year: entity.year,
      note: entity.note,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
