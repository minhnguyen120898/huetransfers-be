import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common/pipes';
import {
  CarBookingStatus,
  PaymentCollection,
  PaymentStatus,
  TransportType,
} from 'generated/prisma';

/**
 * Validation pipe for updating a car booking.
 * All fields are optional; at least one must be provided.
 */
@Injectable()
export class UpdateCarBookingPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      travelAgencyId: Joi.string().uuid().optional().messages({
        'string.guid': 'Travel agency ID must be a valid UUID',
      }),

      vehicleType: Joi.string()
        .valid(...Object.values(TransportType))
        .optional(),

      serviceDate: Joi.string().isoDate().optional().messages({
        'string.isoDate': 'Service date must be a valid ISO 8601 date',
      }),

      guestName: Joi.string().min(2).max(200).optional(),

      guestPhone: Joi.string().max(50).optional().allow(null, ''),

      guestCount: Joi.number().integer().min(1).max(100).optional(),

      pickupLocation: Joi.string().max(500).optional().allow(null, ''),
      dropoffLocation: Joi.string().max(500).optional().allow(null, ''),

      vat: Joi.boolean().optional(),

      sellingPrice: Joi.number().positive().precision(2).optional(),

      receivingPrice: Joi.number().min(0).precision(2).optional(),

      paymentCollection: Joi.string()
        .valid(...Object.values(PaymentCollection))
        .optional(),

      paymentCollectionNote: Joi.string().max(500).optional().allow(null, ''),

      paymentStatus: Joi.string()
        .valid(...Object.values(PaymentStatus))
        .optional(),

      status: Joi.string()
        .valid(...Object.values(CarBookingStatus))
        .optional(),

      note: Joi.string().max(1000).optional().allow(null, ''),

      routes: Joi.string().max(1000).optional().allow(null, ''),
    }).min(1); // At least one field required
  }
}
