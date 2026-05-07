import { Injectable } from '@nestjs/common';
import Joi from 'joi';
import { JoiValidationPipe } from 'src/modules/common';
import { ChangePasswordInput } from '../models';

@Injectable()
export class ChangePasswordPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object<ChangePasswordInput>({
      currentPassword: Joi.string().required(),
      newPassword: Joi.string()
        .min(8)
        .max(100)
        .pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/)
        .required()
        .invalid(Joi.ref('currentPassword'))
        .messages({
          'any.invalid': 'New password must be different from current password',
        }),
    });
  }
}
