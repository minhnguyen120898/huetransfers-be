import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common/pipes';

/**
 * Validation pipe for updating compensation amount on an existing transfer.
 */
@Injectable()
export class UpdateCarTransferPricingPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      compensationAmount: Joi.number()
        .positive()
        .precision(2)
        .required()
        .messages({
          'number.positive': 'Compensation amount must be greater than 0',
          'any.required': 'Compensation amount is required',
        }),

      reason: Joi.string().max(500).optional().allow(null, ''),
    });
  }
}
