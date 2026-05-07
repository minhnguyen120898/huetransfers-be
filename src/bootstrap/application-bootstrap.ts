import { Type } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppConfig } from '../config/app.config';
import { IApplicationConfigurator } from './configurators';

export class ApplicationBootstrap {
  private configurators: IApplicationConfigurator[] = [];

  constructor(
    private readonly appModule: Type<unknown>,
    private readonly config: AppConfig,
  ) {}

  addConfigurator(configurator: IApplicationConfigurator): this {
    this.configurators.push(configurator);
    return this;
  }

  async createApplication(): Promise<NestFastifyApplication> {
    return NestFactory.create<NestFastifyApplication>(
      this.appModule,
      new FastifyAdapter({ logger: !this.config.isProduction }),
    );
  }

  async configureApplication(
    app: NestFastifyApplication,
  ): Promise<NestFastifyApplication> {
    app.setGlobalPrefix(this.config.apiPrefix);
    for (const configurator of this.configurators) {
      await configurator.configure(app, this.config);
    }
    return app;
  }

  async startServer(app: NestFastifyApplication): Promise<void> {
    await app.listen(this.config.port, this.config.host);
  }

  logStartupInfo(): void {
    const baseUrl = this.config.getBaseUrl();
    const lines = [
      '╔════════════════════════════════════════════════════════╗',
      '║  Hue Transfers API                                     ║',
      '╠════════════════════════════════════════════════════════╣',
      `║  Server running on: ${baseUrl.padEnd(31)} ║`,
      `║  API Prefix:        ${this.config.apiPrefix.padEnd(31)} ║`,
      `║  Environment:       ${this.config.environment.padEnd(31)} ║`,
    ];
    if (this.config.swaggerEnabled) {
      lines.push(
        `║  Swagger Docs:      ${this.config.getSwaggerUrl().padEnd(31)} ║`,
      );
    }
    lines.push('╚════════════════════════════════════════════════════════╝');
    console.log('\n' + lines.join('\n') + '\n');
  }

  async bootstrap(): Promise<NestFastifyApplication> {
    const app = await this.createApplication();
    await this.configureApplication(app);
    await this.startServer(app);
    this.logStartupInfo();
    return app;
  }
}
