import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common/pipes';
import { ExpenseCategory } from 'generated/prisma';

/**
 * Validation pipe for updating an expense
 * All fields optional, at least one required
 */
@Injectable()
export class UpdateExpensePipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      title: Joi.string().min(2).max(200).optional().messages({
        'string.min': 'Title must be at least 2 characters',
        'string.max': 'Title cannot exceed 200 characters',
      }),

      amount: Joi.number().positive().precision(2).optional().messages({
        'number.positive': 'Amount must be greater than 0',
      }),

      category: Joi.string()
        .valid(...Object.values(ExpenseCategory))
        .optional()
        .messages({
          'any.only': `Category must be one of: ${Object.values(ExpenseCategory).join(', ')}`,
        }),

      month: Joi.number().integer().min(1).max(12).optional().messages({
        'number.min': 'Month must be between 1 and 12',
        'number.max': 'Month must be between 1 and 12',
      }),

      year: Joi.number().integer().min(2020).max(2100).optional().messages({
        'number.min': 'Year must be between 2020 and 2100',
        'number.max': 'Year must be between 2020 and 2100',
      }),

      note: Joi.string().max(1000).optional().allow(null, '').messages({
        'string.max': 'Notes cannot exceed 1000 characters',
      }),
    }).min(1);
  }
}
