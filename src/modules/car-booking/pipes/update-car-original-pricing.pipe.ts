import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common/pipes';

@Injectable()
export class UpdateCarOriginalPricingPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      sellingPrice: Joi.number().positive().precision(2).required().messages({
        'number.positive': 'Selling price must be greater than 0',
        'any.required': 'Selling price is required',
      }),

      receivingPrice: Joi.number().min(0).precision(2).required().messages({
        'number.min': 'Receiving price cannot be negative',
        'any.required': 'Receiving price is required',
      }),

      reason: Joi.string().max(500).optional().allow(null, ''),
    });
  }
}
