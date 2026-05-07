import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common/pipes';
import { ExpenseCategory } from 'generated/prisma';

/**
 * Validation pipe for expense list query parameters
 */
@Injectable()
export class ExpenseQueryPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      page: Joi.number().integer().min(1).optional().default(1),
      limit: Joi.number().integer().min(1).max(100).optional().default(10),
      search: Joi.string().optional().allow(''),
      category: Joi.string()
        .valid(...Object.values(ExpenseCategory))
        .optional(),
      year: Joi.number().integer().min(2020).max(2100).optional(),
      month: Joi.number().integer().min(1).max(12).optional(),
    });
  }
}
