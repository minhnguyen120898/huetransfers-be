import { Injectable } from '@nestjs/common';
import Joi from 'joi';
import { JoiValidationPipe } from 'src/modules/common';
import { UserUpdateInput } from '../models';

@Injectable()
export class UpdateUserPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object<UserUpdateInput>({
      email: Joi.string().email().optional(),
      fullName: Joi.string().max(255).optional(),
      tel: Joi.string().max(50).optional().allow(null, '').messages({
        'string.max': 'Telephone number cannot exceed 50 characters',
      }),
      avatarUrl: Joi.string().uri().max(500).optional().allow(null),
      isActive: Joi.boolean().optional(),
    }).min(1);
  }
}
