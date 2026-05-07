import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { UserController } from './controller';
import { UserService } from './service';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [CommonModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
