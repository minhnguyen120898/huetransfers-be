import { ExpenseEntity } from '../entities/expense.entity';
import { PaginatedResultDTO } from '../../common/models/pagination.model';
import {
  ExpenseCreateInput,
  ExpenseQueryInput,
  ExpenseSummary,
  ExpenseUpdateInput,
} from '../interfaces/expense.interface';

export interface IExpenseRepository {
  create(data: ExpenseCreateInput): Promise<ExpenseEntity>;
  findById(id: string): Promise<ExpenseEntity | null>;
  findMany(
    query: ExpenseQueryInput,
  ): Promise<PaginatedResultDTO<ExpenseEntity>>;
  update(id: string, data: ExpenseUpdateInput): Promise<ExpenseEntity>;
  softDelete(id: string, updatedById?: string): Promise<void>;
  getSummaryByMonth(year: number, month: number): Promise<ExpenseSummary>;
}
