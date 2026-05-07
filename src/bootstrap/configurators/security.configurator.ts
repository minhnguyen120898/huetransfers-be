import helmet from '@fastify/helmet';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppConfig } from '../../config/app.config';
import { IApplicationConfigurator } from './configurator.interface';

export class SecurityConfigurator implements IApplicationConfigurator {
  async configure(
    app: NestFastifyApplication,
    config: AppConfig,
  ): Promise<void> {
    if (!config.helmetEnabled) return;
    await app.register(helmet as any, {
      contentSecurityPolicy: config.isProduction ? undefined : false,
    });
  }
}
