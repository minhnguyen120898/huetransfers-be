import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common/pipes';

export class CarBookingSummaryQueryPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      year: Joi.number().integer().min(2020).max(2100).required().messages({
        'number.base': 'Year must be a number',
        'number.integer': 'Year must be an integer',
        'number.min': 'Year must be at least 2020',
        'number.max': 'Year cannot exceed 2100',
        'any.required': 'Year is required',
      }),

      month: Joi.number().integer().min(1).max(12).required().messages({
        'number.base': 'Month must be a number',
        'number.integer': 'Month must be an integer',
        'number.min': 'Month must be at least 1',
        'number.max': 'Month cannot exceed 12',
        'any.required': 'Month is required',
      }),
    });
  }
}
