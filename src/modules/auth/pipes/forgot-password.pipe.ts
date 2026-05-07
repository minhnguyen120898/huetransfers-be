import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';

/**
 * Forgot Password Validation Pipe
 *
 * Validates password reset requests with:
 * - Valid email format
 * - Email normalization (lowercase, trim)
 */
export class ForgotPasswordPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      email: Joi.string().email().lowercase().trim().required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
        'string.empty': 'Email cannot be empty',
      }),
    });
  }
}
