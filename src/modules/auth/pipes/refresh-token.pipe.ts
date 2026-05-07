import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';

/**
 * Joi validation pipe for refresh token requests
 * Validates that a valid refresh token string is provided
 */
export class RefreshTokenPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      refreshToken: Joi.string().required().messages({
        'any.required': 'Refresh token is required',
        'string.empty': 'Refresh token cannot be empty',
        'string.base': 'Refresh token must be a string',
      }),
    });
  }
}
