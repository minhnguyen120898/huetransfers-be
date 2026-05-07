import * as Joi from 'joi';
import { JoiValidationPipe } from 'src/modules/common/pipes/joi-validation.pipe';
import { PaymentStatus } from 'generated/prisma';

/**
 * Joi Validation Pipe for Debt Query Parameters
 *
 * Validates query parameters for debt report requests:
 * - year: Valid year (2000-2100)
 * - month: Valid month (1-12)
 * - partnerId: Optional UUID for filtering specific partner
 * - paymentStatus: Optional payment status filter (pending, partial, completed)
 */
export class DebtQueryPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      year: Joi.number().integer().min(2000).max(2100).required().messages({
        'number.base': 'Year must be a number',
        'number.integer': 'Year must be an integer',
        'number.min': 'Year cannot be earlier than 2000',
        'number.max': 'Year cannot be later than 2100',
        'any.required': 'Year is required',
      }),

      month: Joi.number().integer().min(1).max(12).required().messages({
        'number.base': 'Month must be a number',
        'number.integer': 'Month must be an integer',
        'number.min': 'Month must be between 1 and 12',
        'number.max': 'Month must be between 1 and 12',
        'any.required': 'Month is required',
      }),

      partnerId: Joi.string().uuid().optional().messages({
        'string.guid': 'Partner ID must be a valid UUID',
      }),

      // Payment status filter - supports comma-separated string (?paymentStatus=pending,partial)
      paymentStatus: Joi.custom((value, helpers) => {
        if (value === undefined || value === null) return value;
        const values: string[] =
          typeof value === 'string'
            ? value.split(',').map((v: string) => v.trim())
            : Array.isArray(value)
              ? value
              : [String(value)];
        const valid = [
          PaymentStatus.pending,
          PaymentStatus.partial,
          PaymentStatus.completed,
        ];
        for (const v of values) {
          if (!valid.includes(v as PaymentStatus)) {
            return helpers.error('any.only');
          }
        }
        return values;
      })
        .optional()
        .messages({
          'any.only':
            'Payment status must be one of: pending, partial, completed',
        }),

      search: Joi.string().optional().allow('').messages({
        'string.base': 'Search term must be a string',
      }),
    })
      .custom((value, helpers) => {
        // Additional validation: Prevent querying future months
        const { year, month } = value;
        const queryDate = new Date(year, month - 1, 1);
        const now = new Date();
        const currentMonthStart = new Date(
          now.getFullYear(),
          now.getMonth(),
          1,
        );

        // Allow querying current month and past months only
        if (queryDate > currentMonthStart) {
          return helpers.error('any.invalid', {
            message: `Cannot query future months. Latest allowed: ${now.getFullYear()}-${now.getMonth() + 1}`,
          });
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return value;
      })
      .messages({
        'any.invalid': 'Cannot query future months',
      });
  }
}
