import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppConfig } from '../../config/app.config';
import { IApplicationConfigurator } from './configurator.interface';

export class ShutdownConfigurator implements IApplicationConfigurator {
  private readonly signals: string[] = ['SIGTERM', 'SIGINT'];

  configure(app: NestFastifyApplication, _config: AppConfig): Promise<void> {
    this.signals.forEach((signal) => {
      process.on(signal, () => {
        console.log(`\n${signal} received, closing application gracefully...`);
        app
          .close()
          .then(() => {
            console.log('Application closed successfully');
            process.exit(0);
          })
          .catch((error) => {
            console.error('Error during graceful shutdown:', error);
            process.exit(1);
          });
      });
    });
    return Promise.resolve();
  }
}
