import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { EmailService } from '../common/provider/email.service';
import { LoggerService } from '../common/provider/logger.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [HealthController],
  providers: [EmailService, LoggerService],
})
export class HealthModule {}
