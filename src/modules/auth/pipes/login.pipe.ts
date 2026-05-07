import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';

/**
 * Joi validation pipe for user login
 * Validates email and password format
 */
export class LoginPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
      }),

      password: Joi.string().required().messages({
        'any.required': 'Password is required',
      }),
    });
  }
}
