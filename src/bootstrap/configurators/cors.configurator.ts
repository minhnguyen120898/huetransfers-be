import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppConfig } from '../../config/app.config';
import { IApplicationConfigurator } from './configurator.interface';

export class CorsConfigurator implements IApplicationConfigurator {
  configure(app: NestFastifyApplication, config: AppConfig): Promise<void> {
    app.enableCors({
      origin: config.corsOrigin,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      exposedHeaders: ['Authorization'],
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });
    return Promise.resolve();
  }
}
