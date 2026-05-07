import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common/pipes';

/**
 * Validation pipe for count-by-status query parameters.
 */
@Injectable()
export class CarBookingCountQueryPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      travelAgencyId: Joi.string().uuid().optional(),

      serviceDateFrom: Joi.string().isoDate().optional().messages({
        'string.isoDate': 'serviceDateFrom must be a valid ISO 8601 date',
      }),

      serviceDateTo: Joi.string().isoDate().optional().messages({
        'string.isoDate': 'serviceDateTo must be a valid ISO 8601 date',
      }),
    });
  }
}
