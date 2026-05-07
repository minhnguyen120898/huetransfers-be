import { Injectable } from '@nestjs/common';
import { JoiValidationPipe } from '../../common/pipes';
import * as Joi from 'joi';

/**
 * Validation pipe for creating a travel agency
 * Extends JoiValidationPipe to validate CreateTravelAgencyDTO
 */
@Injectable()
export class TravelAgencyPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      name: Joi.string().min(2).max(255).required().messages({
        'string.min': 'Agency name must be at least 2 characters',
        'string.max': 'Agency name cannot exceed 255 characters',
        'any.required': 'Agency name is required',
      }),

      tel: Joi.string().max(50).optional().allow(null, '').messages({
        'string.max': 'Telephone number cannot exceed 50 characters',
      }),

      address: Joi.string().optional().allow(null, '').messages({
        'string.base': 'Address must be a string',
      }),

      note: Joi.string().optional().allow(null, '').messages({
        'string.base': 'Note must be a string',
      }),
    });
  }
}
