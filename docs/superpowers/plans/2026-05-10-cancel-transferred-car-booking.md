# Cancel Transferred Car Booking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `DELETE /api/v1/car-bookings/:id/transfer` endpoint that atomically cancels both a transferred car booking and its linked compensation booking, with guards for status, current-month-only, and payment status.

**Architecture:** New dedicated service method `cancelTransfer()` runs 6 sequential guards then a single Prisma `$transaction` that soft-cancels both bookings. No schema changes, no new pipes, no report changes — existing `status IN (confirmed, completed, transferred)` filters naturally exclude `cancelled` bookings.

**Tech Stack:** NestJS 11, Fastify, Prisma ORM, PostgreSQL, TypeScript, Jest

---

## File Map

| File | Change |
|---|---|
| `src/modules/car-booking/entities/car-booking.entity.ts` | Add `canTransferBeCancelled()` helper |
| `src/modules/car-booking/service/car-booking.service.ts` | Add `cancelTransfer()` method |
| `src/modules/car-booking/controller/car-booking.controller.ts` | Add `DELETE :id/transfer` route |
| `src/modules/car-booking/__tests__/car-booking-cancel-transfer.spec.ts` | New test file (7 cases) |

---

## Task 1: Add entity helper `canTransferBeCancelled()`

**Files:**
- Modify: `src/modules/car-booking/entities/car-booking.entity.ts`

- [ ] **Step 1: Add the helper method after `canBeTransferred()`**

Open `src/modules/car-booking/entities/car-booking.entity.ts`. After the `canBeTransferred()` method (currently ends around line 105), add:

```typescript
/**
 * Can have its transfer cancelled — transferred status only.
 * Guards for same-month and payment status are checked in the service.
 */
canTransferBeCancelled(): boolean {
  return this.status === CarBookingStatus.transferred;
}
```

- [ ] **Step 2: Verify TypeScript compiles cleanly**

```bash
yarn tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/modules/car-booking/entities/car-booking.entity.ts
git commit -m "feat: add canTransferBeCancelled helper to CarBookingEntity"
```

---

## Task 2: Write failing tests for `cancelTransfer()`

**Files:**
- Create: `src/modules/car-booking/__tests__/car-booking-cancel-transfer.spec.ts`

- [ ] **Step 1: Create the test file**

Create `src/modules/car-booking/__tests__/car-booking-cancel-transfer.spec.ts` with the full content below:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CarBookingService } from '../service/car-booking.service';
import { CarBookingRepository } from '../repositories/car-booking.repository';
import { LoggerService } from '../../common/provider/logger.service';
import { PrismaService } from '../../common/provider/prisma.provider';
import {
  CarBookingStatus,
  PaymentCollection,
  PaymentStatus,
  TransportType,
} from 'generated/prisma';
import { Decimal } from '@prisma/client/runtime/library';
import { CarBookingEntity } from '../entities/car-booking.entity';

const mockLogger = { info: jest.fn(), error: jest.fn(), warn: jest.fn() };
const mockRepository = {
  create: jest.fn(),
  findById: jest.fn(),
  findByCode: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  getCountByStatus: jest.fn(),
};
const mockPrisma = {
  travelAgency: { findUnique: jest.fn() },
  carBooking: { count: jest.fn(), updateMany: jest.fn(), aggregate: jest.fn() },
  $transaction: jest.fn(),
};

/** Build a CarBookingEntity with sensible defaults — override as needed. */
function makeEntity(overrides: Partial<CarBookingEntity> = {}): CarBookingEntity {
  const entity = new CarBookingEntity();
  entity.id = 'original-id';
  entity.bookingCode = 'CB-20260510-ORIG';
  entity.travelAgencyId = 'agency-1';
  entity.vehicleType = TransportType.seats_4;
  // serviceDate is in the CURRENT month (UTC) so the same-month guard passes by default
  const now = new Date();
  entity.serviceDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 15));
  entity.guestName = 'Nguyen Van A';
  entity.guestPhone = '+84-987-000-001';
  entity.guestCount = 2;
  entity.pickupLocation = 'Airport';
  entity.dropoffLocation = 'Hotel';
  entity.vat = false;
  entity.sellingPrice = new Decimal(1_000_000);
  entity.receivingPrice = new Decimal(0);
  entity.debtAmount = new Decimal(1_000_000);
  entity.paymentCollection = PaymentCollection.no_collection;
  entity.paymentCollectionNote = null;
  entity.paymentStatus = PaymentStatus.pending;
  entity.paidAt = null;
  entity.status = CarBookingStatus.transferred;
  entity.note = null;
  entity.routes = null;
  entity.isTransfer = false;
  entity.transferFromId = null;
  entity.transferToAgencyId = 'agency-2';
  entity.transferReason = 'Guest request';
  entity.transferredAt = new Date();
  entity.createdAt = new Date();
  entity.updatedAt = new Date();
  entity.createdById = 'user-1';
  entity.updatedById = 'user-1';
  entity.travelAgency = { id: 'agency-1', name: 'Agency One', tel: null, address: null };
  entity.transferToAgency = { id: 'agency-2', name: 'Agency Two', tel: null };
  // Default: one compensation booking linked
  entity.transferBookings = [
    {
      id: 'compensation-id',
      bookingCode: 'CB-20260510-ORIG-TRANSFER',
      status: CarBookingStatus.confirmed,
      paymentStatus: PaymentStatus.pending,
      debtAmount: new Decimal(-1_000_000),
      sellingPrice: new Decimal(1_000_000),
      receivingPrice: new Decimal(0),
      isTransfer: true,
      transferToAgencyId: 'agency-2',
      transferToAgency: { id: 'agency-2', name: 'Agency Two', tel: null },
    },
  ];
  return Object.assign(entity, overrides);
}

describe('CarBookingService.cancelTransfer()', () => {
  let service: CarBookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarBookingService,
        { provide: CarBookingRepository, useValue: mockRepository },
        { provide: LoggerService, useValue: mockLogger },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CarBookingService>(CarBookingService);
    jest.clearAllMocks();
  });

  // ─── Happy path ─────────────────────────────────────────────────────────────

  it('cancels both original and compensation booking in a transaction', async () => {
    const original = makeEntity();
    mockRepository.findById.mockResolvedValue(original);

    const cancelledOriginal = { ...original, status: CarBookingStatus.cancelled };
    const cancelledComp = {
      ...original.transferBookings![0],
      status: CarBookingStatus.cancelled,
      travelAgency: { id: 'agency-2', name: 'Agency Two', tel: null, address: null },
      transferBookings: [],
      transferToAgency: null,
    };

    mockPrisma.$transaction.mockImplementation(async (fn: any) =>
      fn({
        carBooking: {
          update: jest.fn()
            .mockResolvedValueOnce(cancelledOriginal)
            .mockResolvedValueOnce(cancelledComp),
        },
      }),
    );

    const result = await service.cancelTransfer('original-id', 'user-1');

    expect(mockPrisma.$transaction).toHaveBeenCalledTimes(1);
    expect(result.originalBooking.status).toBe(CarBookingStatus.cancelled);
    expect(result.compensationBooking.status).toBe(CarBookingStatus.cancelled);
  });

  // ─── Guard 1: booking not found ─────────────────────────────────────────────

  it('throws NotFoundException when booking does not exist', async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(service.cancelTransfer('no-such-id', 'user-1')).rejects.toThrow(
      NotFoundException,
    );
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });

  // ─── Guard 2: wrong status ───────────────────────────────────────────────────

  it('throws BadRequestException when booking status is confirmed (not transferred)', async () => {
    const original = makeEntity({ status: CarBookingStatus.confirmed });
    mockRepository.findById.mockResolvedValue(original);

    await expect(service.cancelTransfer('original-id', 'user-1')).rejects.toThrow(
      BadRequestException,
    );
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });

  it('throws BadRequestException when booking status is already cancelled', async () => {
    const original = makeEntity({ status: CarBookingStatus.cancelled });
    mockRepository.findById.mockResolvedValue(original);

    await expect(service.cancelTransfer('original-id', 'user-1')).rejects.toThrow(
      BadRequestException,
    );
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });

  // ─── Guard 3: same-month guard ───────────────────────────────────────────────

  it('throws BadRequestException when serviceDate is in a past month', async () => {
    // serviceDate is 3 months ago — past month guard must block it
    const pastDate = new Date();
    pastDate.setUTCMonth(pastDate.getUTCMonth() - 3);
    const original = makeEntity({ serviceDate: pastDate });
    mockRepository.findById.mockResolvedValue(original);

    await expect(service.cancelTransfer('original-id', 'user-1')).rejects.toThrow(
      BadRequestException,
    );
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });

  // ─── Guard 4: original payment completed ─────────────────────────────────────

  it('throws BadRequestException when original booking paymentStatus is completed', async () => {
    const original = makeEntity({ paymentStatus: PaymentStatus.completed });
    mockRepository.findById.mockResolvedValue(original);

    await expect(service.cancelTransfer('original-id', 'user-1')).rejects.toThrow(
      BadRequestException,
    );
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });

  // ─── Guard 5: no compensation booking found ───────────────────────────────────

  it('throws BadRequestException when no compensation booking is linked', async () => {
    const original = makeEntity({ transferBookings: [] });
    mockRepository.findById.mockResolvedValue(original);

    await expect(service.cancelTransfer('original-id', 'user-1')).rejects.toThrow(
      BadRequestException,
    );
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });

  // ─── Guard 6: compensation payment completed ──────────────────────────────────

  it('throws BadRequestException when compensation booking paymentStatus is completed', async () => {
    const original = makeEntity();
    original.transferBookings = [
      {
        ...original.transferBookings![0],
        paymentStatus: PaymentStatus.completed,
      },
    ];
    mockRepository.findById.mockResolvedValue(original);

    await expect(service.cancelTransfer('original-id', 'user-1')).rejects.toThrow(
      BadRequestException,
    );
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run the tests — they must all FAIL**

```bash
yarn test --testPathPattern="car-booking-cancel-transfer" --verbose
```

Expected: 7 tests all FAIL with `TypeError: service.cancelTransfer is not a function` (method doesn't exist yet).

---

## Task 3: Implement `cancelTransfer()` in the service

**Files:**
- Modify: `src/modules/car-booking/service/car-booking.service.ts`

- [ ] **Step 1: Add `cancelTransfer()` method**

In `src/modules/car-booking/service/car-booking.service.ts`, find the `// TRANSFER` section (around line 271). Add the new method **after** the existing `updateTransferPricing()` method and **before** the `// PRIVATE HELPERS` section (or `mapToResponseDto`):

```typescript
// ============================================================
// CANCEL TRANSFER
// ============================================================

/**
 * Cancel a transferred car booking and its linked compensation booking.
 *
 * Guards (in order):
 * 1. Booking exists
 * 2. status === 'transferred'
 * 3. serviceDate is in the current month (UTC) — past months are frozen
 * 4. Original paymentStatus is pending or partial (not completed)
 * 5. Compensation booking exists (linked via transferBookings)
 * 6. Compensation paymentStatus is pending or partial (not completed)
 *
 * Transaction: soft-cancels both bookings atomically.
 * Reports: no changes needed — existing filters exclude 'cancelled' automatically.
 */
async cancelTransfer(
  originalId: string,
  userId?: string,
): Promise<{
  originalBooking: CarBookingResponseDto;
  compensationBooking: CarBookingResponseDto;
}> {
  this.logger.info(
    `[CarBookingService] Attempting to cancel transfer for car booking ${originalId}`,
  );

  // Guard 1: booking exists
  const original = await this.carBookingRepository.findById(originalId);
  if (!original) {
    throw new NotFoundException(`Car booking with ID ${originalId} not found`);
  }

  // Guard 2: must be in transferred status
  if (!original.canTransferBeCancelled()) {
    throw new BadRequestException(
      `Cannot cancel transfer for car booking with status "${original.status}". ` +
        `Only bookings with status "transferred" can have their transfer cancelled.`,
    );
  }

  // Guard 3: serviceDate must be in the current month (UTC)
  const now = new Date();
  const currentMonth = now.getUTCMonth();
  const currentYear = now.getUTCFullYear();
  const serviceMonth = original.serviceDate.getUTCMonth();
  const serviceYear = original.serviceDate.getUTCFullYear();

  if (serviceYear !== currentYear || serviceMonth !== currentMonth) {
    throw new BadRequestException(
      `Cannot cancel transfer for car booking ${original.bookingCode}. ` +
        `Transfer cancellation is only allowed in the same month as the service date ` +
        `(${original.serviceDate.toISOString().slice(0, 7)}).`,
    );
  }

  // Guard 4: original payment must not be completed
  if (original.paymentStatus === PaymentStatus.completed) {
    throw new BadRequestException(
      `Cannot cancel transfer for car booking ${original.bookingCode}. ` +
        `Original booking payment is already completed.`,
    );
  }

  // Guard 5: compensation booking must exist
  const compensationBooking = original.transferBookings?.find((b) => b.isTransfer);
  if (!compensationBooking) {
    throw new BadRequestException(
      `Cannot cancel transfer for car booking ${original.bookingCode}. ` +
        `No linked compensation booking found — data may be inconsistent.`,
    );
  }

  // Guard 6: compensation payment must not be completed
  if (compensationBooking.paymentStatus === PaymentStatus.completed) {
    throw new BadRequestException(
      `Cannot cancel transfer for car booking ${original.bookingCode}. ` +
        `Compensation booking payment is already completed.`,
    );
  }

  // Transaction: soft-cancel both bookings
  const [cancelledOriginal, cancelledCompensation] = await this.prisma.$transaction(
    async (tx) => {
      const orig = await tx.carBooking.update({
        where: { id: originalId },
        data: {
          status: CarBookingStatus.cancelled,
          updatedById: userId ?? null,
        },
        include: {
          travelAgency: { select: { id: true, name: true, tel: true, address: true } },
          transferBookings: true,
          transferToAgency: { select: { id: true, name: true, tel: true } },
        },
      });

      const comp = await tx.carBooking.update({
        where: { id: compensationBooking.id },
        data: {
          status: CarBookingStatus.cancelled,
          updatedById: userId ?? null,
        },
        include: {
          travelAgency: { select: { id: true, name: true, tel: true, address: true } },
          transferBookings: true,
          transferToAgency: { select: { id: true, name: true, tel: true } },
        },
      });

      return [orig, comp] as const;
    },
  );

  this.logger.info(
    `[CarBookingService] Cancelled transfer for car booking ${original.bookingCode} ` +
      `and compensation booking ${compensationBooking.bookingCode}`,
  );

  return {
    originalBooking: this.mapToResponseDto(
      this.carBookingRepository['mapToEntity'](cancelledOriginal),
    ),
    compensationBooking: this.mapToResponseDto(
      this.carBookingRepository['mapToEntity'](cancelledCompensation),
    ),
  };
}
```

> **Note on `mapToEntity`:** The repository's `mapToEntity` is private. If calling it via `['mapToEntity']` feels fragile, check whether `mapToResponseDto` can accept a raw Prisma object directly by looking at how `transferToPartnerAgency` handles its transaction result — it passes the raw Prisma result directly to `mapToResponseDto` via a different path. Use whichever pattern `transferToPartnerAgency` already uses.

- [ ] **Step 2: Run the tests — they must all PASS**

```bash
yarn test --testPathPattern="car-booking-cancel-transfer" --verbose
```

Expected: 7 tests all PASS.

- [ ] **Step 3: Run the full car-booking test suite to check for regressions**

```bash
yarn test --testPathPattern="car-booking" --verbose
```

Expected: all tests PASS.

- [ ] **Step 4: Verify TypeScript compiles cleanly**

```bash
yarn tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/modules/car-booking/service/car-booking.service.ts \
        src/modules/car-booking/__tests__/car-booking-cancel-transfer.spec.ts
git commit -m "feat: add cancelTransfer method to CarBookingService"
```

---

## Task 4: Add `DELETE :id/transfer` controller route

**Files:**
- Modify: `src/modules/car-booking/controller/car-booking.controller.ts`

- [ ] **Step 1: Add the route**

In `src/modules/car-booking/controller/car-booking.controller.ts`, find the existing `@Delete(':id')` route. Add the new route **before** `@Delete(':id')` (NestJS/Fastify requires literal sub-paths before parametric routes — `DELETE :id/transfer` has a sub-path so it must come first):

```typescript
// ⚠️ MUST be before @Delete(':id') — literal sub-path takes priority
@Delete(':id/transfer')
@HttpCode(HttpStatus.OK)
@ApiOperation({
  summary: 'Cancel a transferred car booking',
  description:
    'Atomically cancels a transferred car booking and its linked compensation booking.\n\n' +
    '**Guards:**\n' +
    '- Booking must have status `transferred`\n' +
    '- Service date must be in the current month (past months are frozen)\n' +
    '- Neither the original nor the compensation booking may have `paymentStatus=completed`\n\n' +
    '**Effect:** Both bookings are soft-cancelled. Debt and profit reports update automatically.',
})
@ApiParam({ name: 'id', description: 'ID of the original (transferred) car booking' })
@ApiResponse({
  status: HttpStatus.OK,
  description: 'Both bookings cancelled successfully',
})
@ApiBadRequestResponse({
  description: 'Guard failed — wrong status, past month, or payment already completed',
})
@ApiNotFoundResponse({ description: 'Car booking not found' })
async cancelTransfer(
  @Param('id') id: string,
  @Req() req: FastifyRequest,
): Promise<{
  originalBooking: CarBookingResponseDto;
  compensationBooking: CarBookingResponseDto;
}> {
  const userId = (req as any).user?.id as string | undefined;
  const result = await this.carBookingService.cancelTransfer(id, userId);
  this.logger.info(
    `[CarBookingController] Cancelled transfer for car booking ${id}`,
  );
  return result;
}
```

- [ ] **Step 2: Verify TypeScript compiles cleanly**

```bash
yarn tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Start the server and smoke-test via Swagger**

```bash
yarn start:dev
```

Open `http://localhost:3000/api` (or your configured Swagger URL). Find `DELETE /car-bookings/{id}/transfer`. Confirm it appears and shows the correct description and parameters.

- [ ] **Step 4: Run all tests**

```bash
yarn test --verbose
```

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/modules/car-booking/controller/car-booking.controller.ts
git commit -m "feat: add DELETE :id/transfer endpoint to cancel transferred car booking"
```

---

## Implementation Note: `mapToEntity` in the transaction

In Task 3, the `cancelTransfer` method calls `this.carBookingRepository['mapToEntity']()` on the raw Prisma result from the transaction. Before implementing, check how the existing `transferToPartnerAgency` method handles the same problem (it also gets raw Prisma results from a transaction). It constructs the response DTO differently — follow that same pattern to stay consistent.

If `mapToEntity` is not accessible or the pattern is different, the simplest fix is to call `this.carBookingRepository.findById()` for each booking **after** the transaction commits to get fully-mapped entities. This adds two extra DB round-trips but is safe and consistent:

```typescript
// Alternative: re-fetch after transaction if mapToEntity is not accessible
const [orig, comp] = await Promise.all([
  this.carBookingRepository.findById(originalId),
  this.carBookingRepository.findById(compensationBooking.id),
]);
return {
  originalBooking: this.mapToResponseDto(orig!),
  compensationBooking: this.mapToResponseDto(comp!),
};
```

---

## Self-Review

**Spec coverage check:**
- ✅ Guard 1 (booking exists) → Task 3 `NotFoundException`
- ✅ Guard 2 (is transferred) → Task 3 `canTransferBeCancelled()` check
- ✅ Guard 3 (same-month) → Task 3 UTC month/year comparison
- ✅ Guard 4 (original payment) → Task 3 `PaymentStatus.completed` check
- ✅ Guard 5 (compensation exists) → Task 3 `transferBookings?.find()`
- ✅ Guard 6 (compensation payment) → Task 3 second payment check
- ✅ Transaction → Task 3 `$transaction` with two `update` calls
- ✅ Entity helper → Task 1
- ✅ Controller route → Task 4
- ✅ All 7 test cases → Task 2

**Placeholder scan:** No TBDs or vague steps. Implementation Note for `mapToEntity` covers the only ambiguity with a concrete alternative. ✅

**Type consistency:** `cancelTransfer` return type `{ originalBooking: CarBookingResponseDto; compensationBooking: CarBookingResponseDto }` is consistent across service method, controller return type, and test assertions. ✅
