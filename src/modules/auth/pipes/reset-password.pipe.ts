import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';

/**
 * Reset Password Validation Pipe
 *
 * Validates password reset completion with:
 * - Token format (alphanumeric hex string, 32-64 chars)
 * - Password strength requirements
 * - Password confirmation matching
 */
export class ResetPasswordPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      token: Joi.string()
        .pattern(/^[a-f0-9]{32,64}$/)
        .required()
        .messages({
          'string.pattern.base':
            'Invalid token format. Token must be a hexadecimal string between 32-64 characters',
          'any.required': 'Reset token is required',
          'string.empty': 'Reset token cannot be empty',
        }),

      newPassword: Joi.string()
        .min(8)
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
        )
        .required()
        .messages({
          'string.min': 'New password must be at least 8 characters',
          'string.pattern.base':
            'New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&#)',
          'any.required': 'New password is required',
          'string.empty': 'New password cannot be empty',
        }),

      confirmPassword: Joi.string()
        .valid(Joi.ref('newPassword'))
        .required()
        .messages({
          'any.only': 'Password confirmation does not match new password',
          'any.required': 'Password confirmation is required',
          'string.empty': 'Password confirmation cannot be empty',
        }),
    });
  }
}
