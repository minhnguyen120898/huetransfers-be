import { Injectable } from '@nestjs/common';
import Joi from 'joi';
import { UserQueryInput } from '../models';
import { JoiValidationPipe } from 'src/modules/common';
import { UserRole } from 'generated/prisma';

@Injectable()
export class UserQueryPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object<UserQueryInput>({
      page: Joi.number().integer().min(1).default(1),
      limit: Joi.number().integer().min(1).max(100).default(10),
      role: Joi.string()
        .valid(...Object.values(UserRole))
        .optional(),
      isActive: Joi.boolean().optional(),
      search: Joi.string().max(255).optional(),
    });
  }
}
