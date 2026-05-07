import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { UserRole } from 'generated/prisma';

/**
 * Joi validation pipe for user registration
 * Extends JoiValidationPipe with comprehensive validation rules
 */
export class RegisterPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
      }),

      password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .required()
        .messages({
          'string.min': 'Password must be at least 8 characters',
          'string.pattern.base':
            'Password must contain at least one uppercase letter, one lowercase letter, and one number',
          'any.required': 'Password is required',
        }),

      fullName: Joi.string().min(2).max(100).required().messages({
        'string.min': 'Full name must be at least 2 characters',
        'string.max': 'Full name cannot exceed 100 characters',
        'any.required': 'Full name is required',
      }),

      role: Joi.string()
        .valid(...Object.values(UserRole))
        .optional()
        .default(UserRole.user)
        .messages({
          'any.only': 'Invalid user role',
        }),
    });
  }
}
