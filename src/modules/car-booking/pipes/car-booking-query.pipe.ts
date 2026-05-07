import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common/pipes';
import {
  CarBookingStatus,
  PaymentStatus,
  TransportType,
} from 'generated/prisma';

/**
 * Validation pipe for car booking list query parameters.
 */
@Injectable()
export class CarBookingQueryPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      page: Joi.number().integer().min(1).optional().default(1),
      limit: Joi.number().integer().min(1).max(100).optional().default(10),

      search: Joi.string().max(200).optional().allow(''),

      travelAgencyId: Joi.string().uuid().optional(),

      vehicleType: Joi.string()
        .valid(...Object.values(TransportType))
        .optional(),

      status: Joi.string()
        .valid(...Object.values(CarBookingStatus))
        .optional(),

      serviceDateFrom: Joi.string().isoDate().optional().messages({
        'string.isoDate': 'serviceDateFrom must be a valid ISO 8601 date',
      }),

      serviceDateTo: Joi.string().isoDate().optional().messages({
        'string.isoDate': 'serviceDateTo must be a valid ISO 8601 date',
      }),

      paymentStatus: Joi.string()
        .valid(...Object.values(PaymentStatus))
        .optional(),
    });
  }
}
