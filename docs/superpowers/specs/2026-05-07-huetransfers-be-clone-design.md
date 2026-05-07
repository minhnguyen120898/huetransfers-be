# huetransfers-be — Clone Design Spec

**Date:** 2026-05-07
**Source repo:** `../booking-management-be`
**Target repo:** `../huetransfers-be` (fresh NestJS scaffold, git init done)

---

## Goal

Clone only the auth/user/travel-agency/car-booking/health feature set from `booking-management-be` into a new, standalone NestJS application. Keep all existing functionality for those modules unchanged. No new features. Fresh Prisma migrations.

---

## 1. Project Structure

```
src/
├── modules/
│   ├── common/          ← copied as-is
│   ├── auth/            ← copied as-is
│   ├── user/            ← copied as-is
│   ├── travel-agency/   ← copied as-is
│   ├── car-booking/     ← copied as-is
│   └── health/          ← copied as-is
├── config/
│   └── env.validation.ts  ← copied, stripped of unused env vars
├── app.module.ts          ← rewritten (5 modules only)
└── main.ts                ← rewritten (Fastify + Swagger + global prefix)
```

**Modules dropped (do not copy):**
`booking`, `booking-operation`, `tour`, `guide`, `restaurant`, `transport-provider`, `debt`, `expense`, `monthly-transaction`, `profit`, `cleanup`

---

## 2. Prisma Schema

Fresh `prisma/schema.prisma` — no migration files copied.

### Models

| Model | Purpose |
|-------|---------|
| `User` | Auth + user management |
| `RefreshToken` | JWT refresh token storage |
| `TravelAgency` | Agency management |
| `CarBooking` | Car rental bookings (linked to TravelAgency) |
| `PaymentRecord` | Payment tracking for car bookings |
| `ActivityLog` | Audit trail |

### Enums

| Enum | Values |
|------|--------|
| `UserRole` | `admin`, `user` |
| `CarBookingStatus` | `confirmed`, `completed`, `cancelled`, `transferred` |
| `PaymentStatus` | `pending`, `partial`, `completed` |
| `PaymentDirection` | `received`, `paid` |
| `ActivityAction` | `create`, `update`, `delete`, `login`, `export` |
| `PartnerType` | `agency`, `guide`, `restaurant`, `transport` |

### Migration strategy

Do NOT copy migration files from source. After setup, run:
```bash
npx prisma migrate dev --name init
```

---

## 3. Dependencies

Install these packages (not present in fresh scaffold):

```bash
# HTTP adapter
yarn add @nestjs/platform-fastify fastify

# Config
yarn add @nestjs/config joi

# Auth
yarn add @nestjs/jwt @nestjs/passport passport passport-jwt passport-local bcrypt
yarn add -D @types/bcrypt @types/passport-jwt @types/passport-local

# Database
yarn add @prisma/client prisma

# Swagger
yarn add @nestjs/swagger

# Scheduler
yarn add @nestjs/schedule

# Logging
yarn add winston nest-winston

# Utils
yarn add uuid
yarn add -D @types/uuid
```

Remove from `package.json`:
- `@nestjs/platform-express` (replaced by Fastify)
- `@types/express`

---

## 4. Configuration Files

Copy from source repo:

| File | Action |
|------|--------|
| `docker-compose.yml` | Copy unchanged (PostgreSQL + pgAdmin) |
| `.env.example` | Copy, strip vars not used by 5 modules |
| `tsconfig.json` | Update with `@/` path alias → `src/` |
| `nest-cli.json` | Keep scaffold version (already compatible) |

### Required env vars

```env
DATABASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
JWT_EXPIRES_IN=
JWT_REFRESH_EXPIRES_IN=
PORT=
NODE_ENV=
```

---

## 5. `main.ts`

Rewrite to match source repo pattern:

- Fastify adapter (`FastifyAdapter`)
- Global API prefix: `/api/v1`
- Swagger UI at `/api/docs`
- CORS enabled
- Winston logger via `nest-winston`
- Graceful shutdown hooks

---

## 6. `app.module.ts`

```typescript
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema }),
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

---

## 7. Implementation Order

1. Install dependencies + remove Express adapter
2. Copy `common/` module
3. Copy `config/env.validation.ts` (trimmed)
4. Write fresh `prisma/schema.prisma`
5. Copy `auth/` module
6. Copy `user/` module
7. Copy `travel-agency/` module
8. Copy `car-booking/` module
9. Copy `health/` module
10. Rewrite `main.ts`
11. Rewrite `app.module.ts`
12. Update `tsconfig.json` with path alias
13. Copy `docker-compose.yml` + `.env.example`
14. Run `prisma generate` + `prisma migrate dev --name init`
15. Start dev server and verify all endpoints respond

---

## 8. Success Criteria

- `yarn start:dev` boots without errors
- Swagger UI loads at `/api/docs`
- Health endpoint responds at `/api/v1/health`
- Auth endpoints work: login, refresh, logout
- User CRUD works (admin-only creation)
- Travel agency CRUD works
- Car booking CRUD works with TravelAgency FK
- Payment records work for car bookings
- `prisma migrate dev` produces a single clean `init` migration
