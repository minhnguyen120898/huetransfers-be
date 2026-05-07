import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';
import { JoiValidationPipe } from 'src/modules/common/pipes/joi-validation.pipe';

/**
 * Validation pipe for logout request
 * Refresh token is optional - allows logout from all devices if not provided
 */
@Injectable()
export class LogoutPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      refreshToken: Joi.string().optional().allow(null, '').messages({
        'string.base': 'Refresh token must be a string',
      }),
    });
  }
}
