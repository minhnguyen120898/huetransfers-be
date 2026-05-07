import { ExpenseCategory } from 'generated/prisma';
import { Decimal } from '@prisma/client/runtime/library';

/**
 * Expense Domain Entity
 *
 * Represents a fleet expense record (gasoline, maintenance, insurance, etc.).
 * Used for tracking car fleet operational costs separate from tour booking finances.
 */
export class ExpenseEntity {
  id: string;
  title: string;
  amount: Decimal;
  category: ExpenseCategory;
  month: number;
  year: number;
  note: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdById: string | null;
  updatedById: string | null;

  /**
   * Get the amount as a number (for calculations and responses)
   */
  getAmountAsNumber(): number {
    return Number(this.amount);
  }

  /**
   * Get formatted period string (e.g., "02/2026")
   */
  getPeriodString(): string {
    return `${this.month.toString().padStart(2, '0')}/${this.year}`;
  }
}
