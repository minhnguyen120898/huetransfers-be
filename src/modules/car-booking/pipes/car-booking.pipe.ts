import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common/pipes';
import { PaymentCollection, TransportType } from 'generated/prisma';

/**
 * Validation pipe for creating a car booking.
 */
@Injectable()
export class CarBookingPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      travelAgencyId: Joi.string().uuid().required().messages({
        'string.guid': 'Travel agency ID must be a valid UUID',
        'any.required': 'Travel agency is required',
      }),

      vehicleType: Joi.string()
        .valid(...Object.values(TransportType))
        .required()
        .messages({
          'any.only': `Vehicle type must be one of: ${Object.values(TransportType).join(', ')}`,
          'any.required': 'Vehicle type is required',
        }),

      serviceDate: Joi.string().isoDate().required().messages({
        'string.isoDate':
          'Service date must be a valid ISO 8601 date (e.g. 2026-03-15)',
        'any.required': 'Service date is required',
      }),

      guestName: Joi.string().min(2).max(200).required().messages({
        'string.min': 'Guest name must be at least 2 characters',
        'string.max': 'Guest name cannot exceed 200 characters',
        'any.required': 'Guest name is required',
      }),

      guestPhone: Joi.string().max(50).optional().allow(null, ''),

      guestCount: Joi.number().integer().min(1).max(100).required().messages({
        'number.min': 'Guest count must be at least 1',
        'number.max': 'Guest count cannot exceed 100',
        'any.required': 'Guest count is required',
      }),

      pickupLocation: Joi.string().max(500).optional().allow(null, ''),
      dropoffLocation: Joi.string().max(500).optional().allow(null, ''),

      vat: Joi.boolean().optional().default(false),

      sellingPrice: Joi.number().positive().precision(2).required().messages({
        'number.positive': 'Selling price must be greater than 0',
        'any.required': 'Selling price is required',
      }),

      receivingPrice: Joi.number().min(0).precision(2).required().messages({
        'number.min': 'Receiving price cannot be negative',
        'any.required': 'Receiving price is required',
      }),

      paymentCollection: Joi.string()
        .valid(...Object.values(PaymentCollection))
        .required()
        .messages({
          'any.only': `Payment collection must be one of: ${Object.values(PaymentCollection).join(', ')}`,
          'any.required': 'Payment collection is required',
        }),

      paymentCollectionNote: Joi.string().max(500).optional().allow(null, ''),

      note: Joi.string().max(1000).optional().allow(null, ''),

      routes: Joi.string().max(1000).optional().allow(null, ''),
    });
  }
}
