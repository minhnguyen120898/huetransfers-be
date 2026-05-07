import { Injectable } from '@nestjs/common';
import { Expense, ExpenseCategory, Prisma } from 'generated/prisma';
import { PrismaService } from '../../common/provider/prisma.provider';
import { ExpenseEntity } from '../entities/expense.entity';
import { IExpenseRepository } from './expense.repository.interface';
import { PaginatedResultDTO } from '../../common/models/pagination.model';
import {
  ExpenseCreateInput,
  ExpenseQueryInput,
  ExpenseSummary,
  ExpenseUpdateInput,
} from '../interfaces/expense.interface';

/**
 * Expense Repository
 * Handles all database operations for fleet expenses using Prisma ORM
 */
@Injectable()
export class ExpenseRepository implements IExpenseRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new expense record
   */
  async create(data: ExpenseCreateInput): Promise<ExpenseEntity> {
    const expense = await this.prisma.expense.create({
      data: {
        title: data.title,
        amount: new Prisma.Decimal(data.amount),
        category: data.category,
        month: data.month,
        year: data.year,
        note: data.note || null,
        createdById: data.createdById || null,
        updatedById: data.updatedById || null,
      },
    });

    return this.mapToEntity(expense);
  }

  /**
   * Find expense by ID (active only)
   */
  async findById(id: string): Promise<ExpenseEntity | null> {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
    });

    return expense ? this.mapToEntity(expense) : null;
  }

  /**
   * Find many expenses with pagination and filters
   * Always filters isActive = true
   */
  async findMany(
    query: ExpenseQueryInput,
  ): Promise<PaginatedResultDTO<ExpenseEntity>> {
    const { page = 1, limit = 10, search, category, year, month } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ExpenseWhereInput = {
      isActive: true,
    };

    if (category) {
      where.category = category;
    }

    if (year) {
      where.year = year;
    }

    if (month) {
      where.month = month;
    }

    if (search) {
      where.title = {
        contains: search,
        mode: 'insensitive',
      };
    }

    const [expenses, total] = await Promise.all([
      this.prisma.expense.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ year: 'desc' }, { month: 'desc' }, { createdAt: 'desc' }],
      }),
      this.prisma.expense.count({ where }),
    ]);

    return {
      data: expenses.map((e) => this.mapToEntity(e)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Update expense record
   */
  async update(id: string, data: ExpenseUpdateInput): Promise<ExpenseEntity> {
    const updateData: Prisma.ExpenseUncheckedUpdateInput = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.amount !== undefined)
      updateData.amount = new Prisma.Decimal(data.amount);
    if (data.category !== undefined) updateData.category = data.category;
    if (data.month !== undefined) updateData.month = data.month;
    if (data.year !== undefined) updateData.year = data.year;
    if (data.note !== undefined) updateData.note = data.note;
    if (data.updatedById) updateData.updatedById = data.updatedById;

    const expense = await this.prisma.expense.update({
      where: { id },
      data: updateData,
    });

    return this.mapToEntity(expense);
  }

  /**
   * Soft delete expense (set isActive = false)
   */
  async softDelete(id: string, updatedById?: string): Promise<void> {
    await this.prisma.expense.update({
      where: { id },
      data: {
        isActive: false,
        ...(updatedById && { updatedById }),
      },
    });
  }

  /**
   * Get monthly summary by category
   * Always filters isActive = true
   */
  async getSummaryByMonth(
    year: number,
    month: number,
  ): Promise<ExpenseSummary> {
    const where: Prisma.ExpenseWhereInput = {
      year,
      month,
      isActive: true,
    };

    // Run all category aggregations and total count in parallel
    const [
      gasolineResult,
      maintenanceResult,
      insuranceResult,
      bankResult,
      otherResult,
      countResult,
    ] = await Promise.all([
      this.prisma.expense.aggregate({
        where: { ...where, category: ExpenseCategory.gasoline },
        _sum: { amount: true },
      }),
      this.prisma.expense.aggregate({
        where: { ...where, category: ExpenseCategory.maintenance },
        _sum: { amount: true },
      }),
      this.prisma.expense.aggregate({
        where: { ...where, category: ExpenseCategory.insurance },
        _sum: { amount: true },
      }),
      this.prisma.expense.aggregate({
        where: { ...where, category: ExpenseCategory.bank },
        _sum: { amount: true },
      }),
      this.prisma.expense.aggregate({
        where: { ...where, category: ExpenseCategory.other },
        _sum: { amount: true },
      }),
      this.prisma.expense.count({ where }),
    ]);

    const gasoline = Number(gasolineResult._sum.amount || 0);
    const maintenance = Number(maintenanceResult._sum.amount || 0);
    const insurance = Number(insuranceResult._sum.amount || 0);
    const bank = Number(bankResult._sum.amount || 0);
    const other = Number(otherResult._sum.amount || 0);

    return {
      totalAmount: gasoline + maintenance + insurance + bank + other,
      byCategory: { gasoline, maintenance, insurance, bank, other },
      expenseCount: countResult,
      year,
      month,
    };
  }

  /**
   * Map Prisma Expense model to ExpenseEntity
   */
  private mapToEntity(prismaExpense: Expense): ExpenseEntity {
    const entity = new ExpenseEntity();
    entity.id = prismaExpense.id;
    entity.title = prismaExpense.title;
    entity.amount = prismaExpense.amount;
    entity.category = prismaExpense.category;
    entity.month = prismaExpense.month;
    entity.year = prismaExpense.year;
    entity.note = prismaExpense.note;
    entity.isActive = prismaExpense.isActive;
    entity.createdAt = prismaExpense.createdAt;
    entity.updatedAt = prismaExpense.updatedAt;
    entity.createdById = prismaExpense.createdById;
    entity.updatedById = prismaExpense.updatedById;
    return entity;
  }
}
