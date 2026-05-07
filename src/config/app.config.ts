export class AppConfig {
  readonly port: number;
  readonly host: string;
  readonly apiPrefix: string;
  readonly environment: string;
  readonly isProduction: boolean;
  readonly isDevelopment: boolean;
  readonly corsOrigin: string | string[] | boolean;
  readonly swaggerEnabled: boolean;
  readonly swaggerTitle: string;
  readonly swaggerDescription: string;
  readonly swaggerVersion: string;
  readonly swaggerPrefix: string;
  readonly helmetEnabled: boolean;

  constructor() {
    this.port = this.parsePort(process.env.API_PORT, 3000);
    this.host = process.env.HOST ?? '0.0.0.0';
    this.apiPrefix = process.env.API_PREFIX ?? '/api/v1';
    this.environment = process.env.NODE_ENV ?? 'development';
    this.isProduction = this.environment === 'production';
    this.isDevelopment = this.environment === 'development';
    this.corsOrigin = this.parseCorsOrigin();
    this.swaggerEnabled = this.parseSwaggerEnabled();
    this.swaggerTitle = 'Hue Transfers API';
    this.swaggerDescription = 'API for Hue Transfers management system';
    this.swaggerVersion = '1.0';
    this.swaggerPrefix = '/docs';
    this.helmetEnabled = true;
  }

  private parsePort(portEnv: string | undefined, defaultPort: number): number {
    const parsed = parseInt(portEnv ?? '', 10);
    return isNaN(parsed) ? defaultPort : parsed;
  }

  private parseCorsOrigin(): string | string[] | boolean {
    const originEnv = process.env.CORS_ORIGIN;
    if (!originEnv) return this.isProduction ? false : '*';
    if (originEnv === '*') return '*';
    const origins = originEnv.split(',').map((o) => o.trim());
    return origins.length === 1 ? origins[0] : origins;
  }

  private parseSwaggerEnabled(): boolean {
    if (this.isProduction) return false;
    return process.env.SWAGGER_ENABLE !== '0';
  }

  getBaseUrl(): string {
    return `http://localhost:${this.port}`;
  }

  getSwaggerUrl(): string {
    return `${this.getBaseUrl()}${this.swaggerPrefix}`;
  }

  getApiUrl(): string {
    return `${this.getBaseUrl()}${this.apiPrefix}`;
  }
}
