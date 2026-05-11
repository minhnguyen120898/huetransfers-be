import * as Joi from 'joi';
import { JoiValidationPipe } from 'src/modules/common/pipes/joi-validation.pipe';

export class CarTransferQueryPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      year: Joi.number().integer().min(2020).max(2100).required().messages({
        'number.base': 'Year must be a number',
        'number.integer': 'Year must be an integer',
        'number.min': 'Year must be between 2020 and 2100',
        'number.max': 'Year must be between 2020 and 2100',
        'any.required': 'Year is required',
      }),
      month: Joi.number().integer().min(1).max(12).required().messages({
        'number.base': 'Month must be a number',
        'number.integer': 'Month must be an integer',
        'number.min': 'Month must be between 1 and 12',
        'number.max': 'Month must be between 1 and 12',
        'any.required': 'Month is required',
      }),
      page: Joi.number().integer().min(1).default(1).messages({
        'number.base': 'Page must be a number',
        'number.integer': 'Page must be an integer',
        'number.min': 'Page must be at least 1',
      }),
      limit: Joi.number().integer().min(1).max(100).default(10).messages({
        'number.base': 'Limit must be a number',
        'number.integer': 'Limit must be an integer',
        'number.min': 'Limit must be at least 1',
        'number.max': 'Limit must not exceed 100',
      }),
    });
  }
}
