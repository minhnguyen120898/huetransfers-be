import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { ExpenseController } from './controller/expense.controller';
import { ExpenseService } from './service/expense.service';
import { ExpenseRepository } from './repositories/expense.repository';

/**
 * Expense Module
 *
 * Manages fleet operational expenses (gasoline, maintenance, insurance, etc.).
 * Separate from tour booking finances — tracks car fleet running costs.
 *
 * Key Features:
 * - CRUD operations for expense records
 * - Category classification (gasoline, maintenance, insurance, other)
 * - Monthly summary grouped by category
 * - Soft deletes for data preservation
 * - Filters by category, year, month
 */
@Module({
  imports: [CommonModule],
  controllers: [ExpenseController],
  providers: [ExpenseService, ExpenseRepository],
  exports: [ExpenseService],
})
export class ExpenseModule {}
