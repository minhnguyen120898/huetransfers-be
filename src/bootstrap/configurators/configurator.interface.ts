import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppConfig } from '../../config/app.config';

export interface IApplicationConfigurator {
  configure(app: NestFastifyApplication, config: AppConfig): Promise<void>;
}
