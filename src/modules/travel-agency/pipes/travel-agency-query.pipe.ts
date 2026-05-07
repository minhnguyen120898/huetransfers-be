import { Injectable } from '@nestjs/common';
import { JoiValidationPipe } from '../../common/pipes';
import * as Joi from 'joi';

/**
 * Validation pipe for travel agency query parameters
 * Validates pagination and filter parameters
 */
@Injectable()
export class TravelAgencyQueryPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      page: Joi.number().integer().min(1).optional().default(1).messages({
        'number.min': 'Page must be at least 1',
        'number.integer': 'Page must be an integer',
      }),

      limit: Joi.number()
        .integer()
        .min(1)
        .max(100)
        .optional()
        .default(10)
        .messages({
          'number.min': 'Limit must be at least 1',
          'number.max': 'Limit cannot exceed 100',
          'number.integer': 'Limit must be an integer',
        }),

      search: Joi.string().max(255).optional().allow('').messages({
        'string.max': 'Search term cannot exceed 255 characters',
      }),

      isActive: Joi.boolean().optional().messages({
        'boolean.base': 'isActive must be a boolean value',
      }),
    });
  }
}
