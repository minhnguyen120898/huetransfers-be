# Design: Cancel Transferred Car Booking

**Date:** 2026-05-10
**Branch:** bugfix/car-profit-wrong
**Status:** Approved

---

## Background

Currently, car bookings with `status=transferred` cannot be cancelled. When a transfer is created:
- The **original booking** is marked `status=transferred` (locked)
- A **compensation booking** is created with `isTransfer=true, status=confirmed` (linked via `transferFromId`)

The client requested allowing cancellation of transferred bookings to handle cases where a guest cancels (e.g., illness). The business decision is to cancel the entire transfer operation — both the original and the compensation booking — atomically.

---

## Decision Summary

| Question | Decision |
|---|---|
| Which bookings to cancel? | Both — original (transferred) + compensation (isTransfer=true) |
| Original final status? | `cancelled` |
| Payment guard? | Block if either booking has `paymentStatus=completed`; allow `pending` or `partial` |
| Time guard? | Only allow cancellation in the same month as `serviceDate` (current month/year, UTC) |
| API approach? | New dedicated endpoint `DELETE /car-bookings/:id/transfer` |

---

## API

```
DELETE /api/v1/car-bookings/:id/transfer
Authorization: Bearer <jwt>
```

- `:id` is the **original booking's ID** (status=`transferred`)
- No request body
- Returns both cancelled bookings

**Success response (200):**
```json
{
  "originalBooking": { ...CarBookingResponseDto },
  "compensationBooking": { ...CarBookingResponseDto }
}
```

---

## Guards (checked in order)

All guards run before the transaction. Any failure returns `400 BadRequestException` with a descriptive message.

1. **Booking exists** — original ID must resolve to a real car booking (`404` if not found)
2. **Is transferred** — `status === 'transferred'`; rejects confirmed, cancelled, completed
3. **Same-month guard** — `serviceDate` month+year must equal current month+year (UTC); past-month transfers are frozen to protect historical data integrity
4. **Payment guard (original)** — `paymentStatus` must be `pending` or `partial`; `completed` is blocked
5. **Compensation booking exists** — `transferBookings` relation must contain exactly one `isTransfer=true` booking; data inconsistency if missing
6. **Payment guard (compensation)** — compensation booking's `paymentStatus` must be `pending` or `partial`

---

## Transaction

Single Prisma `$transaction`, all-or-nothing:

```typescript
const [cancelledOriginal, cancelledCompensation] = await this.prisma.$transaction(async (tx) => {
  const orig = await tx.carBooking.update({
    where: { id: originalId },
    data: { status: CarBookingStatus.cancelled, updatedById: userId },
  });
  const comp = await tx.carBooking.update({
    where: { id: compensationBooking.id },
    data: { status: CarBookingStatus.cancelled, updatedById: userId },
  });
  return [orig, comp];
});
```

No hard deletes. Soft cancel only — consistent with all other cancel operations in the system.

---

## Effect on Reports

No report code changes required. Existing filters handle cancellation automatically:

| Report | Current filter | Effect after cancel |
|---|---|---|
| Car booking debt | `status IN (confirmed, completed, transferred)` | Both bookings drop off — `cancelled` excluded |
| Car profit (gross revenue) | `isTransfer=false, status IN (confirmed, completed, transferred)` | Original drops off gross revenue |
| Car profit (transfer deductions) | `isTransfer=true` + `serviceDate` range | Compensation drops off deductions |

**Net financial effect:** Both sides cancel out — no orphaned revenue or cost entries. This is the correct outcome for a full guest cancellation.

---

## Code Changes

### 1. `src/modules/car-booking/entities/car-booking.entity.ts`

Add helper method:

```typescript
canTransferBeCancelled(): boolean {
  return this.status === CarBookingStatus.transferred;
}
```

### 2. `src/modules/car-booking/service/car-booking.service.ts`

New method `cancelTransfer(originalId: string, userId?: string)`:
- Load original with `transferBookings` include
- Run all 6 guards
- Execute Prisma transaction
- Log the operation
- Return `{ originalBooking, compensationBooking }`

### 3. `src/modules/car-booking/controller/car-booking.controller.ts`

New route:

```typescript
@Delete(':id/transfer')
@ApiOperation({ summary: 'Cancel a transferred car booking and its compensation booking' })
@ApiResponse({ status: 200, description: 'Both bookings cancelled successfully' })
@ApiBadRequestResponse({ description: 'Guard failed — see message for reason' })
@ApiNotFoundResponse({ description: 'Car booking not found' })
async cancelTransfer(
  @Param('id') id: string,
  @CurrentUser('id') userId: string,
)
```

### 4. Tests

New test file or added to `car-booking.service.spec.ts`:

| Test case | Expected |
|---|---|
| Happy path | Both bookings return `status=cancelled` |
| `status=confirmed` (not transferred) | `400` — wrong status |
| `status=cancelled` already | `400` — wrong status |
| Past month `serviceDate` | `400` — time guard |
| Original `paymentStatus=completed` | `400` — payment guard |
| Compensation `paymentStatus=completed` | `400` — payment guard |
| No compensation booking found | `400` — data inconsistency |

---

## Out of Scope

- No schema migration needed
- No new Joi validation pipe (no request body)
- No changes to debt, profit, or Excel export services
- No UI changes (backend only)
- Cancelling a non-transfer `confirmed` booking is unchanged — existing `remove()` is untouched
