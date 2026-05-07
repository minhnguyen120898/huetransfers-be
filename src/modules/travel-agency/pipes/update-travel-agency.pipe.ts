import { Injectable } from '@nestjs/common';
import { JoiValidationPipe } from '../../common/pipes';
import * as Joi from 'joi';

/**
 * Validation pipe for updating a travel agency
 * All fields are optional, but at least one field must be provided
 */
@Injectable()
export class UpdateTravelAgencyPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      name: Joi.string().min(2).max(255).optional().messages({
        'string.min': 'Agency name must be at least 2 characters',
        'string.max': 'Agency name cannot exceed 255 characters',
      }),

      tel: Joi.string().max(50).optional().allow(null, '').messages({
        'string.max': 'Telephone number cannot exceed 50 characters',
      }),

      address: Joi.string().optional().allow(null, ''),

      note: Joi.string().optional().allow(null, ''),

      isActive: Joi.boolean().optional().messages({
        'boolean.base': 'isActive must be a boolean value',
      }),
    }).min(1); // At least one field must be provided for update
  }
}
