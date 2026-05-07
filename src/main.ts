import { AppModule } from './app.module';
import { ApplicationBootstrap } from './bootstrap';
import {
  CorsConfigurator,
  LoggingConfigurator,
  SecurityConfigurator,
  ShutdownConfigurator,
  SwaggerConfigurator,
} from './bootstrap/configurators';
import { AppConfig } from './config/app.config';

async function bootstrap(): Promise<void> {
  const config = new AppConfig();
  const bootstrapper = new ApplicationBootstrap(AppModule, config);

  bootstrapper.addConfigurator(new SecurityConfigurator());
  bootstrapper.addConfigurator(new SwaggerConfigurator());
  bootstrapper.addConfigurator(new CorsConfigurator());
  bootstrapper.addConfigurator(new LoggingConfigurator());
  bootstrapper.addConfigurator(new ShutdownConfigurator());

  await bootstrapper.bootstrap();
}

bootstrap().catch((err) => {
  console.error('Fatal error during application bootstrap:', err);
  process.exit(1);
});
