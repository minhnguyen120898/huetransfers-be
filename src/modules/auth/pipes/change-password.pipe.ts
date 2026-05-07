import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';

/**
 * Change Password Validation Pipe
 *
 * Validates password change requests with:
 * - Password strength requirements
 * - Password confirmation matching
 * - New password different from current
 */
export class ChangePasswordPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      currentPassword: Joi.string().required().messages({
        'any.required': 'Current password is required',
        'string.empty': 'Current password cannot be empty',
      }),

      newPassword: Joi.string()
        .min(8)
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
        )
        .required()
        .invalid(Joi.ref('currentPassword'))
        .messages({
          'string.min': 'New password must be at least 8 characters',
          'string.pattern.base':
            'New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
          'any.required': 'New password is required',
          'any.invalid': 'New password must be different from current password',
        }),

      confirmPassword: Joi.string()
        .valid(Joi.ref('newPassword'))
        .required()
        .messages({
          'any.only': 'Password confirmation does not match new password',
          'any.required': 'Password confirmation is required',
        }),
    });
  }
}
