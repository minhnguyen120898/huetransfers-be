import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppConfig } from '../../config/app.config';
import { CommonModule, LogInterceptor } from '../../modules/common';
import { IApplicationConfigurator } from './configurator.interface';

export class LoggingConfigurator implements IApplicationConfigurator {
  async configure(
    app: NestFastifyApplication,
    _config: AppConfig,
  ): Promise<void> {
    const logInterceptor = app.select(CommonModule).get(LogInterceptor);
    app.useGlobalInterceptors(logInterceptor);
  }
}
