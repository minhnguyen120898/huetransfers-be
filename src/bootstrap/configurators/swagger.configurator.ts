import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppConfig } from '../../config/app.config';
import { IApplicationConfigurator } from './configurator.interface';

export class SwaggerConfigurator implements IApplicationConfigurator {
  configure(app: NestFastifyApplication, config: AppConfig): Promise<void> {
    if (!config.swaggerEnabled) return Promise.resolve();
    const options = new DocumentBuilder()
      .setTitle(config.swaggerTitle)
      .setDescription(config.swaggerDescription)
      .setVersion(config.swaggerVersion)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(config.swaggerPrefix, app, document);
    return Promise.resolve();
  }
}
