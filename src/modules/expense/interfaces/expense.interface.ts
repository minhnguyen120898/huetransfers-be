import { ExpenseCategory } from 'generated/prisma';
import { PaginationQueryDTO } from '../../common/models/pagination.model';

/**
 * Input interface for creating an expense
 */
export interface ExpenseCreateInput {
  title: string;
  amount: number;
  category: ExpenseCategory;
  month: number;
  year: number;
  note?: string;
  createdById?: string;
  updatedById?: string;
}

/**
 * Input interface for updating an expense
 */
export interface ExpenseUpdateInput {
  title?: string;
  amount?: number;
  category?: ExpenseCategory;
  month?: number;
  year?: number;
  note?: string | null;
  updatedById?: string;
}

/**
 * Query input interface for listing expenses with filters
 */
export interface ExpenseQueryInput extends PaginationQueryDTO {
  search?: string;
  category?: ExpenseCategory;
  year?: number;
  month?: number;
}

/**
 * Summary data for a specific month grouped by category
 */
export interface ExpenseSummary {
  totalAmount: number;
  byCategory: {
    gasoline: number;
    maintenance: number;
    insurance: number;
    bank: number;
    other: number;
  };
  expenseCount: number;
  year: number;
  month: number;
}
