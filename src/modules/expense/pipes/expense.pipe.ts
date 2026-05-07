import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common/pipes';
import { ExpenseCategory } from 'generated/prisma';

/**
 * Validation pipe for creating an expense
 */
@Injectable()
export class ExpensePipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      title: Joi.string().min(2).max(200).required().messages({
        'string.min': 'Title must be at least 2 characters',
        'string.max': 'Title cannot exceed 200 characters',
        'any.required': 'Title is required',
      }),

      amount: Joi.number().positive().precision(2).required().messages({
        'number.positive': 'Amount must be greater than 0',
        'any.required': 'Amount is required',
      }),

      category: Joi.string()
        .valid(...Object.values(ExpenseCategory))
        .required()
        .messages({
          'any.only': `Category must be one of: ${Object.values(ExpenseCategory).join(', ')}`,
          'any.required': 'Category is required',
        }),

      month: Joi.number().integer().min(1).max(12).required().messages({
        'number.min': 'Month must be between 1 and 12',
        'number.max': 'Month must be between 1 and 12',
        'any.required': 'Month is required',
      }),

      year: Joi.number().integer().min(2020).max(2100).required().messages({
        'number.min': 'Year must be between 2020 and 2100',
        'number.max': 'Year must be between 2020 and 2100',
        'any.required': 'Year is required',
      }),

      note: Joi.string().max(1000).optional().allow(null, '').messages({
        'string.max': 'Notes cannot exceed 1000 characters',
      }),
    });
  }
}
