import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common/pipes';
import { PaymentStatus } from 'generated/prisma';

/**
 * Validation pipe for bulk payment status update.
 */
@Injectable()
export class BulkCarPaymentStatusPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      bookingIds: Joi.array()
        .items(Joi.string().uuid())
        .min(1)
        .required()
        .messages({
          'array.min': 'At least one booking ID is required',
          'any.required': 'bookingIds is required',
          'string.uuid': 'Each booking ID must be a valid UUID',
        }),

      paymentStatus: Joi.string()
        .valid(...Object.values(PaymentStatus))
        .required()
        .messages({
          'any.only': `Payment status must be one of: ${Object.values(PaymentStatus).join(', ')}`,
          'any.required': 'Payment status is required',
        }),
    });
  }
}
