# huetransfers-be Clone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clone auth/user/travel-agency/car-booking/health modules from `booking-management-be` into a fresh `huetransfers-be` NestJS scaffold, switching from Express to Fastify and generating a fresh minimal Prisma schema.

**Architecture:** Copy 5 feature modules + the common shared layer verbatim from source. Rewrite `main.ts` and `app.module.ts` to wire only those modules. Write a fresh `prisma/schema.prisma` containing only the 6 models those modules need.

**Tech Stack:** NestJS 11, Fastify, Prisma 6, PostgreSQL 16, TypeScript, Joi, Winston, Passport JWT

---

## File Map

### Files to create (new)
- `prisma/schema.prisma` — fresh schema with 6 models
- `prisma/seed.ts` — minimal seed for first admin user
- `src/config/app.config.ts` — app configuration class
- `src/config/env.validation.ts` — Joi env schema (trimmed)
- `src/bootstrap/application-bootstrap.ts` — Fastify bootstrap class
- `src/bootstrap/configurators/configurator.interface.ts`
- `src/bootstrap/configurators/cors.configurator.ts`
- `src/bootstrap/configurators/logging.configurator.ts`
- `src/bootstrap/configurators/security.configurator.ts`
- `src/bootstrap/configurators/shutdown.configurator.ts`
- `src/bootstrap/configurators/swagger.configurator.ts`
- `src/bootstrap/configurators/index.ts`
- `src/bootstrap/index.ts`
- `docker-compose.yml`
- `.env.example`

### Files to rewrite (scaffold → project)
- `src/main.ts` — use bootstrap pattern
- `src/app.module.ts` — register 5 modules only
- `tsconfig.json` — add `@/` path alias
- `package.json` — add scripts + swap Express for Fastify deps

### Files to copy verbatim from source
- `src/modules/common/` → full directory
- `src/modules/auth/` → full directory
- `src/modules/user/` → full directory
- `src/modules/travel-agency/` → full directory
- `src/modules/car-booking/` → full directory
- `src/modules/health/` → full directory

### Files to delete (scaffold artifacts)
- `src/app.controller.ts`
- `src/app.controller.spec.ts`
- `src/app.service.ts`

---

## Task 1: Install dependencies and swap HTTP adapter

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Remove Express, add Fastify and all required packages**

```bash
cd /Users/minhnn/Documents/workspaces/my-project/huetransfers-be
yarn remove @nestjs/platform-express @types/express
yarn add @nestjs/platform-fastify fastify @fastify/helmet @fastify/static
yarn add @nestjs/config @nestjs/jwt @nestjs/passport @nestjs/swagger @nestjs/schedule
yarn add passport passport-jwt bcrypt joi winston
yarn add @prisma/client prisma
yarn add -D @types/bcrypt @types/passport-jwt @types/passport-local ts-node
```

- [ ] **Step 2: Verify install succeeded**

```bash
node -e "require('@nestjs/platform-fastify'); console.log('fastify ok')"
node -e "require('@prisma/client'); console.log('prisma ok')"
```

Expected output:
```
fastify ok
prisma ok
```

- [ ] **Step 3: Add Prisma and dev scripts to package.json**

Open `package.json` and replace the `"scripts"` section with:

```json
"scripts": {
  "build": "nest build",
  "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\" \"prisma/**/*.ts\"",
  "start": "nest start",
  "start:dev": "nest start --watch",
  "start:debug": "nest start --debug --watch",
  "start:prod": "node dist/main",
  "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:cov": "jest --coverage",
  "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
  "test:e2e": "jest --config ./test/jest-e2e.json",
  "prisma:generate": "npx prisma generate",
  "prisma:migrate": "npx prisma migrate dev",
  "prisma:studio": "npx prisma studio",
  "prisma:seed": "ts-node prisma/seed.ts",
  "prisma:migrate:deploy": "npx prisma migrate deploy",
  "postinstall": "npx prisma generate"
}
```

- [ ] **Step 4: Commit**

```bash
git add package.json yarn.lock
git commit -m "chore: swap express for fastify, add all project dependencies"
```

---

## Task 2: Update tsconfig.json

**Files:**
- Modify: `tsconfig.json`

- [ ] **Step 1: Replace tsconfig.json contents**

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "resolvePackageJsonExports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2023",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    },
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "noFallthroughCasesInSwitch": false,
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src", "generated"]
}
```

- [ ] **Step 2: Commit**

```bash
git add tsconfig.json
git commit -m "chore: configure tsconfig with @/ path alias and project settings"
```

---

## Task 3: Write Prisma schema

**Files:**
- Create: `prisma/schema.prisma`

- [ ] **Step 1: Create prisma/schema.prisma**

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// ENUMS
// ============================================

enum UserRole {
  admin
  user
}

enum CarBookingStatus {
  confirmed
  completed
  cancelled
  transferred
}

enum PaymentStatus {
  pending
  partial
  completed
}

enum PaymentCollection {
  no_collection
  collect_from_guest
}

enum PaymentDirection {
  received
  paid
}

enum ActivityAction {
  create
  update
  delete
  login
  export
}

enum PartnerType {
  agency
  guide
  restaurant
  transport
}

enum TransportType {
  seats_4  @map("4")
  seats_7  @map("7")
  seats_16 @map("16")
  seats_29 @map("29")
  seats_45 @map("45")
}

// ============================================
// MODELS
// ============================================

model User {
  id                     String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  email                  String    @unique @db.VarChar(255)
  passwordHash           String    @map("password_hash") @db.VarChar(255)
  fullName               String    @map("full_name") @db.VarChar(255)
  tel                    String?   @db.VarChar(50)
  avatarUrl              String?   @map("avatar_url") @db.VarChar(500)
  role                   UserRole  @default(user)
  isActive               Boolean   @default(true) @map("is_active")
  emailVerified          Boolean   @default(false) @map("email_verified")
  mustChangePassword     Boolean   @default(false) @map("must_change_password")
  emailVerificationToken String?   @map("email_verification_token") @db.VarChar(255)
  passwordResetToken     String?   @map("password_reset_token") @db.VarChar(255)
  passwordResetExpires   DateTime? @map("password_reset_expires")
  createdAt              DateTime  @default(now()) @map("created_at")
  updatedAt              DateTime  @updatedAt @map("updated_at")
  lastLogin              DateTime? @map("last_login")

  refreshTokens          RefreshToken[]
  activityLogs           ActivityLog[]
  createdTravelAgencies  TravelAgency[]  @relation("TravelAgencyCreatedBy")
  updatedTravelAgencies  TravelAgency[]  @relation("TravelAgencyUpdatedBy")
  createdCarBookings     CarBooking[]    @relation("CarBookingCreatedBy")
  updatedCarBookings     CarBooking[]    @relation("CarBookingUpdatedBy")
  createdPaymentRecords  PaymentRecord[]

  @@map("users")
}

model RefreshToken {
  id         String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  userId     String    @map("user_id") @db.Uuid
  jti        String    @unique @db.VarChar(100)
  token      String    @unique @db.VarChar(500)
  deviceInfo String?   @map("device_info") @db.VarChar(255)
  ipAddress  String?   @map("ip_address") @db.VarChar(45)
  expiresAt  DateTime  @map("expires_at")
  isRevoked  Boolean   @default(false) @map("is_revoked")
  revokedAt  DateTime? @map("revoked_at")
  revokedBy  String?   @map("revoked_by") @db.Uuid
  createdAt  DateTime  @default(now()) @map("created_at")
  lastUsedAt DateTime? @map("last_used_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([expiresAt])
  @@map("refresh_tokens")
}

model TravelAgency {
  id          String   @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  name        String   @db.VarChar(255)
  tel         String?  @db.VarChar(50)
  address     String?  @db.Text
  note        String?  @db.Text
  isActive    Boolean  @default(true) @map("is_active")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")
  createdById String?  @map("created_by") @db.Uuid
  updatedById String?  @map("updated_by") @db.Uuid

  createdBy              User?        @relation("TravelAgencyCreatedBy", fields: [createdById], references: [id])
  updatedBy              User?        @relation("TravelAgencyUpdatedBy", fields: [updatedById], references: [id])
  carBookings            CarBooking[] @relation("CarBookingAgency")
  transferredCarBookings CarBooking[] @relation("CarBookingTransferredTo")

  @@index([name])
  @@map("travel_agencies")
}

model CarBooking {
  id                    String            @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  bookingCode           String            @unique @map("booking_code") @db.VarChar(50)
  travelAgencyId        String?           @map("travel_agency_id") @db.Uuid
  vehicleType           TransportType     @map("vehicle_type")
  serviceDate           DateTime          @map("service_date") @db.Date
  guestName             String            @map("guest_name") @db.VarChar(255)
  guestPhone            String?           @map("guest_phone") @db.VarChar(255)
  guestCount            Int               @default(1) @map("guest_count")
  pickupLocation        String?           @map("pickup_location") @db.Text
  dropoffLocation       String?           @map("dropoff_location") @db.Text
  vat                   Boolean           @default(false)
  sellingPrice          Decimal           @map("selling_price") @db.Decimal(15, 2)
  receivingPrice        Decimal           @map("receiving_price") @db.Decimal(15, 2)
  debtAmount            Decimal           @map("debt_amount") @db.Decimal(15, 2)
  paymentCollection     PaymentCollection @map("payment_collection")
  paymentCollectionNote String?           @map("payment_collection_note") @db.Text
  paymentStatus         PaymentStatus     @default(pending) @map("payment_status")
  paidAt                DateTime?         @map("paid_at")
  status                CarBookingStatus  @default(confirmed)
  note                  String?           @db.Text
  routes                String?           @db.Text
  isTransfer            Boolean           @default(false) @map("is_transfer")
  transferFromId        String?           @map("transfer_from_id") @db.Uuid
  transferToAgencyId    String?           @map("transfer_to_agency_id") @db.Uuid
  transferReason        String?           @map("transfer_reason") @db.Text
  transferredAt         DateTime?         @map("transferred_at")
  createdAt             DateTime          @default(now()) @map("created_at")
  updatedAt             DateTime          @updatedAt @map("updated_at")
  createdById           String?           @map("created_by") @db.Uuid
  updatedById           String?           @map("updated_by") @db.Uuid

  travelAgency     TravelAgency? @relation("CarBookingAgency", fields: [travelAgencyId], references: [id])
  createdBy        User?         @relation("CarBookingCreatedBy", fields: [createdById], references: [id])
  updatedBy        User?         @relation("CarBookingUpdatedBy", fields: [updatedById], references: [id])
  transferFrom     CarBooking?   @relation("CarBookingTransfer", fields: [transferFromId], references: [id])
  transferBookings CarBooking[]  @relation("CarBookingTransfer")
  transferToAgency TravelAgency? @relation("CarBookingTransferredTo", fields: [transferToAgencyId], references: [id])

  @@index([serviceDate])
  @@index([status])
  @@index([travelAgencyId, serviceDate, status, paymentStatus], name: "idx_car_agency_payment")
  @@index([isTransfer])
  @@index([transferFromId])
  @@index([transferToAgencyId])
  @@map("car_bookings")
}

model PaymentRecord {
  id              String           @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  partnerType     PartnerType      @map("partner_type")
  partnerId       String           @map("partner_id") @db.Uuid
  debtRecordId    String?          @map("debt_record_id") @db.Uuid
  paymentDirection PaymentDirection @map("payment_direction")
  amount          Decimal          @db.Decimal(15, 2)
  paymentDate     DateTime         @default(now()) @map("payment_date")
  paymentMethod   String?          @map("payment_method") @db.VarChar(50)
  referenceNumber String?          @map("reference_number") @db.VarChar(100)
  note            String?          @db.Text
  receiptUrl      String?          @map("receipt_url") @db.VarChar(500)
  createdAt       DateTime         @default(now()) @map("created_at")
  createdById     String?          @map("created_by") @db.Uuid

  createdBy User? @relation(fields: [createdById], references: [id])

  @@index([partnerType, partnerId, paymentDate])
  @@map("payment_records")
}

model ActivityLog {
  id         String         @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  userId     String?        @map("user_id") @db.Uuid
  action     ActivityAction
  entityType String         @map("entity_type") @db.VarChar(50)
  entityId   String?        @map("entity_id") @db.Uuid
  oldValues  Json?          @map("old_values")
  newValues  Json?          @map("new_values")
  ipAddress  String?        @map("ip_address") @db.VarChar(50)
  userAgent  String?        @map("user_agent") @db.Text
  createdAt  DateTime       @default(now()) @map("created_at")

  user User? @relation(fields: [userId], references: [id])

  @@index([userId])
  @@index([entityType, entityId])
  @@index([createdAt])
  @@map("activity_logs")
}
```

- [ ] **Step 2: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat: add prisma schema with 6 models for huetransfers"
```

---

## Task 4: Write config and bootstrap files

**Files:**
- Create: `src/config/app.config.ts`
- Create: `src/config/env.validation.ts`
- Create: `src/bootstrap/configurators/configurator.interface.ts`
- Create: `src/bootstrap/configurators/cors.configurator.ts`
- Create: `src/bootstrap/configurators/logging.configurator.ts`
- Create: `src/bootstrap/configurators/security.configurator.ts`
- Create: `src/bootstrap/configurators/shutdown.configurator.ts`
- Create: `src/bootstrap/configurators/swagger.configurator.ts`
- Create: `src/bootstrap/configurators/index.ts`
- Create: `src/bootstrap/application-bootstrap.ts`
- Create: `src/bootstrap/index.ts`

- [ ] **Step 1: Create src/config/env.validation.ts**

```typescript
import * as Joi from 'joi';

export const validationSchema = Joi.object({
  API_PORT: Joi.number().port().default(3000),
  HOST: Joi.string().default('0.0.0.0'),
  API_PREFIX: Joi.string().default('/api/v1'),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  DATABASE_URL: Joi.string().required(),
  CORS_ORIGIN: Joi.string().allow('*').optional(),
  SWAGGER_ENABLE: Joi.string().valid('0', '1').default('1'),
  JWT_SECRET: Joi.string().min(32).optional(),
  JWT_ISSUER: Joi.string().optional(),
  HEALTH_TOKEN: Joi.string().optional(),
});
```

- [ ] **Step 2: Create src/config/app.config.ts**

```typescript
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
```

- [ ] **Step 3: Create src/bootstrap/configurators/configurator.interface.ts**

```typescript
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppConfig } from '../../config/app.config';

export interface IApplicationConfigurator {
  configure(app: NestFastifyApplication, config: AppConfig): Promise<void>;
}
```

- [ ] **Step 4: Create src/bootstrap/configurators/cors.configurator.ts**

```typescript
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
```

- [ ] **Step 5: Create src/bootstrap/configurators/security.configurator.ts**

```typescript
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
    await app.register(helmet, {
      contentSecurityPolicy: config.isProduction ? undefined : false,
    });
  }
}
```

- [ ] **Step 6: Create src/bootstrap/configurators/swagger.configurator.ts**

```typescript
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
```

- [ ] **Step 7: Create src/bootstrap/configurators/logging.configurator.ts**

```typescript
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
```

- [ ] **Step 8: Create src/bootstrap/configurators/shutdown.configurator.ts**

```typescript
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
          .then(() => { console.log('Application closed successfully'); process.exit(0); })
          .catch((error) => { console.error('Error during graceful shutdown:', error); process.exit(1); });
      });
    });
    return Promise.resolve();
  }
}
```

- [ ] **Step 9: Create src/bootstrap/configurators/index.ts**

```typescript
export * from './configurator.interface';
export * from './cors.configurator';
export * from './logging.configurator';
export * from './security.configurator';
export * from './shutdown.configurator';
export * from './swagger.configurator';
```

- [ ] **Step 10: Create src/bootstrap/application-bootstrap.ts**

```typescript
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

  async configureApplication(app: NestFastifyApplication): Promise<NestFastifyApplication> {
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
      lines.push(`║  Swagger Docs:      ${this.config.getSwaggerUrl().padEnd(31)} ║`);
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
```

- [ ] **Step 11: Create src/bootstrap/index.ts**

```typescript
export * from './application-bootstrap';
export * from './configurators';
```

- [ ] **Step 12: Commit**

```bash
git add src/config/ src/bootstrap/
git commit -m "feat: add app config and fastify bootstrap configurators"
```

---

## Task 5: Copy shared modules

**Files:**
- Copy: `src/modules/common/` from source

- [ ] **Step 1: Copy common module**

```bash
cp -r /Users/minhnn/Documents/workspaces/my-project/booking-management-be/src/modules/common \
      /Users/minhnn/Documents/workspaces/my-project/huetransfers-be/src/modules/
```

- [ ] **Step 2: Commit**

```bash
git add src/modules/common/
git commit -m "feat: add common shared module (pipes, guards, interceptors, providers)"
```

---

## Task 6: Copy auth module

**Files:**
- Copy: `src/modules/auth/` from source

- [ ] **Step 1: Copy auth module**

```bash
cp -r /Users/minhnn/Documents/workspaces/my-project/booking-management-be/src/modules/auth \
      /Users/minhnn/Documents/workspaces/my-project/huetransfers-be/src/modules/
```

- [ ] **Step 2: Commit**

```bash
git add src/modules/auth/
git commit -m "feat: add auth module (JWT, passport, refresh tokens)"
```

---

## Task 7: Copy user module

**Files:**
- Copy: `src/modules/user/` from source

- [ ] **Step 1: Copy user module**

```bash
cp -r /Users/minhnn/Documents/workspaces/my-project/booking-management-be/src/modules/user \
      /Users/minhnn/Documents/workspaces/my-project/huetransfers-be/src/modules/
```

- [ ] **Step 2: Commit**

```bash
git add src/modules/user/
git commit -m "feat: add user module (admin-only creation, CRUD)"
```

---

## Task 8: Copy travel-agency module

**Files:**
- Copy: `src/modules/travel-agency/` from source

- [ ] **Step 1: Copy travel-agency module**

```bash
cp -r /Users/minhnn/Documents/workspaces/my-project/booking-management-be/src/modules/travel-agency \
      /Users/minhnn/Documents/workspaces/my-project/huetransfers-be/src/modules/
```

- [ ] **Step 2: Commit**

```bash
git add src/modules/travel-agency/
git commit -m "feat: add travel-agency module"
```

---

## Task 9: Copy car-booking module

**Files:**
- Copy: `src/modules/car-booking/` from source

- [ ] **Step 1: Copy car-booking module**

```bash
cp -r /Users/minhnn/Documents/workspaces/my-project/booking-management-be/src/modules/car-booking \
      /Users/minhnn/Documents/workspaces/my-project/huetransfers-be/src/modules/
```

- [ ] **Step 2: Commit**

```bash
git add src/modules/car-booking/
git commit -m "feat: add car-booking module with payment records"
```

---

## Task 10: Copy health module

**Files:**
- Copy: `src/modules/health/` from source

- [ ] **Step 1: Copy health module**

```bash
cp -r /Users/minhnn/Documents/workspaces/my-project/booking-management-be/src/modules/health \
      /Users/minhnn/Documents/workspaces/my-project/huetransfers-be/src/modules/
```

- [ ] **Step 2: Commit**

```bash
git add src/modules/health/
git commit -m "feat: add health module"
```

---

## Task 11: Rewrite main.ts and app.module.ts

**Files:**
- Modify: `src/main.ts`
- Modify: `src/app.module.ts`
- Delete: `src/app.controller.ts`, `src/app.controller.spec.ts`, `src/app.service.ts`

- [ ] **Step 1: Rewrite src/main.ts**

```typescript
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
```

- [ ] **Step 2: Rewrite src/app.module.ts**

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CommonModule } from './modules/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TravelAgencyModule } from './modules/travel-agency/travel-agency.module';
import { CarBookingModule } from './modules/car-booking/car-booking.module';
import { HealthModule } from './modules/health/health.module';
import { validationSchema } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      validationOptions: {
        abortEarly: false,
        allowUnknown: true,
      },
    }),
    ScheduleModule.forRoot(),
    CommonModule,
    HealthModule,
    AuthModule,
    UserModule,
    TravelAgencyModule,
    CarBookingModule,
  ],
})
export class AppModule {}
```

- [ ] **Step 3: Delete scaffold artifacts**

```bash
rm /Users/minhnn/Documents/workspaces/my-project/huetransfers-be/src/app.controller.ts
rm /Users/minhnn/Documents/workspaces/my-project/huetransfers-be/src/app.controller.spec.ts
rm /Users/minhnn/Documents/workspaces/my-project/huetransfers-be/src/app.service.ts
```

- [ ] **Step 4: Commit**

```bash
git add src/main.ts src/app.module.ts
git rm src/app.controller.ts src/app.controller.spec.ts src/app.service.ts
git commit -m "feat: wire app with 5 modules and fastify bootstrap"
```

---

## Task 12: Add Docker and env files

**Files:**
- Create: `docker-compose.yml`
- Create: `.env.example`

- [ ] **Step 1: Create docker-compose.yml**

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16
    container_name: huetransfers-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: huetransfers_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres123
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d huetransfers_db"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - huetransfers-network

  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: huetransfers-pgadmin
    restart: unless-stopped
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@admin.com
      PGADMIN_DEFAULT_PASSWORD: admin123
      PGADMIN_CONFIG_SERVER_MODE: 'False'
      PGADMIN_CONFIG_MASTER_PASSWORD_REQUIRED: 'False'
    ports:
      - "5050:80"
    volumes:
      - pgadmin_data:/var/lib/pgadmin
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - huetransfers-network

networks:
  huetransfers-network:
    driver: bridge

volumes:
  postgres_data:
  pgadmin_data:
```

- [ ] **Step 2: Create .env.example**

```env
# Server
API_PORT=3000
HOST=0.0.0.0
API_PREFIX=/api/v1
NODE_ENV=development

# Database
DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/huetransfers_db

# CORS
CORS_ORIGIN=*

# Swagger
SWAGGER_ENABLE=1

# Auth
JWT_SECRET=your-super-secret-key-min-32-characters-long
JWT_ISSUER=huetransfers-api

# Health
HEALTH_TOKEN=
```

- [ ] **Step 3: Create .env from example**

```bash
cp /Users/minhnn/Documents/workspaces/my-project/huetransfers-be/.env.example \
   /Users/minhnn/Documents/workspaces/my-project/huetransfers-be/.env
```

- [ ] **Step 4: Commit**

```bash
git add docker-compose.yml .env.example
git commit -m "chore: add docker-compose and env example for huetransfers"
```

---

## Task 13: Generate Prisma client and run migration

**Files:**
- Generate: `generated/prisma/`
- Create: `prisma/migrations/` (auto-generated)

- [ ] **Step 1: Start PostgreSQL**

```bash
cd /Users/minhnn/Documents/workspaces/my-project/huetransfers-be
docker compose up -d
```

Wait ~5 seconds for postgres to be healthy:
```bash
docker compose ps
```
Expected: `huetransfers-postgres` shows `healthy`.

- [ ] **Step 2: Enable uuid-ossp extension**

```bash
docker exec huetransfers-postgres psql -U postgres -d huetransfers_db -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
```

Expected output:
```
CREATE EXTENSION
```

- [ ] **Step 3: Run initial migration**

```bash
cd /Users/minhnn/Documents/workspaces/my-project/huetransfers-be
npx prisma migrate dev --name init
```

Expected output includes:
```
✔ Generated Prisma Client
The following migration(s) have been applied:
  migrations/YYYYMMDDHHMMSS_init/migration.sql
```

- [ ] **Step 4: Commit generated migration**

```bash
git add prisma/migrations/ generated/
git commit -m "chore: add initial prisma migration and generated client"
```

---

## Task 14: Write and run seed

**Files:**
- Create: `prisma/seed.ts`

- [ ] **Step 1: Create prisma/seed.ts**

```typescript
import { PrismaClient } from '../generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Admin@123456', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@huetransfers.com' },
    update: {},
    create: {
      email: 'admin@huetransfers.com',
      passwordHash,
      fullName: 'System Admin',
      role: 'admin',
      isActive: true,
      emailVerified: true,
    },
  });

  console.log('Seed complete. Admin user:', admin.email);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
```

- [ ] **Step 2: Run seed**

```bash
cd /Users/minhnn/Documents/workspaces/my-project/huetransfers-be
yarn prisma:seed
```

Expected output:
```
Seed complete. Admin user: admin@huetransfers.com
```

- [ ] **Step 3: Commit**

```bash
git add prisma/seed.ts
git commit -m "chore: add prisma seed with initial admin user"
```

---

## Task 15: Start server and verify

- [ ] **Step 1: Start dev server**

```bash
cd /Users/minhnn/Documents/workspaces/my-project/huetransfers-be
yarn start:dev
```

Expected: Server starts with banner showing:
```
║  Hue Transfers API                                     ║
║  Server running on: http://localhost:3000              ║
║  Swagger Docs:      http://localhost:3000/docs         ║
```

- [ ] **Step 2: Verify health endpoint**

```bash
curl http://localhost:3000/api/v1/health
```

Expected: `200 OK` with health status response.

- [ ] **Step 3: Verify Swagger loads**

Open browser at `http://localhost:3000/docs` — should show Swagger UI with Auth, User, Travel Agency, Car Booking, and Health tags.

- [ ] **Step 4: Verify login works**

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@huetransfers.com","password":"Admin@123456"}'
```

Expected: `200 OK` with `accessToken` and `refreshToken` in response.

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "chore: verify huetransfers-be is fully operational"
```

---

## Success Criteria

- [ ] `yarn start:dev` boots without TypeScript or runtime errors
- [ ] Swagger UI loads at `http://localhost:3000/docs`
- [ ] Health check responds at `GET /api/v1/health`
- [ ] Login returns JWT tokens
- [ ] User CRUD works (with admin JWT)
- [ ] Travel agency CRUD works
- [ ] Car booking CRUD works with travelAgencyId FK
- [ ] Payment records work for car bookings
- [ ] Single clean `init` migration in `prisma/migrations/`
