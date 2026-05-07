import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common/pipes';

/**
 * Validation pipe for expense summary query (requires year and month)
 */
@Injectable()
export class ExpenseSummaryPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      year: Joi.number().integer().min(2020).max(2100).required().messages({
        'number.min': 'Year must be between 2020 and 2100',
        'number.max': 'Year must be between 2020 and 2100',
        'any.required': 'Year is required',
      }),
      month: Joi.number().integer().min(1).max(12).required().messages({
        'number.min': 'Month must be between 1 and 12',
        'number.max': 'Month must be between 1 and 12',
        'any.required': 'Month is required',
      }),
    });
  }
}
