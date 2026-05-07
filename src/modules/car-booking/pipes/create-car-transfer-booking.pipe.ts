import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common/pipes';

/**
 * Validation pipe for transferring a car booking to a partner agency.
 */
@Injectable()
export class CreateCarTransferBookingPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      partnerAgencyId: Joi.string().uuid().required().messages({
        'string.uuid': 'Partner agency ID must be a valid UUID',
        'any.required': 'Partner agency ID is required',
      }),

      compensationAmount: Joi.number()
        .positive()
        .precision(2)
        .optional()
        .messages({
          'number.positive': 'Compensation amount must be greater than 0',
        }),

      reason: Joi.string().min(5).max(500).required().messages({
        'string.min': 'Transfer reason must be at least 5 characters',
        'string.max': 'Transfer reason cannot exceed 500 characters',
        'any.required': 'Transfer reason is required',
      }),
    });
  }
}
