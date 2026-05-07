import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';

/**
 * Force Change Password Validation Pipe
 *
 * Validates password change request including:
 * - Current password is provided
 * - New password meets security requirements
 * - Confirmation password matches new password
 */
export class ForceChangePasswordPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      currentPassword: Joi.string().required().messages({
        'any.required': 'Current password is required',
        'string.empty': 'Current password cannot be empty',
      }),

      newPassword: Joi.string()
        .min(8)
        .max(100)
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
        )
        .required()
        .messages({
          'string.min': 'New password must be at least 8 characters long',
          'string.max': 'New password cannot exceed 100 characters',
          'string.pattern.base':
            'New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
          'any.required': 'New password is required',
        }),

      confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref('newPassword'))
        .messages({
          'any.required': 'Password confirmation is required',
          'any.only': 'Passwords do not match',
        }),
    });
  }
}
