# Design: Edit Original Booking Pricing After Transfer

**Date:** 2026-05-11  
**Status:** Approved  
**Module:** `car-booking`

---

## Problem

Once a car booking is transferred to a partner agency, its status becomes `transferred` and the normal `update()` guard blocks all field edits. However, the client may need to revise the original booking's `sellingPrice` or `receivingPrice` after transfer (e.g. due to renegotiation). There is currently no way to do this.

---

## Goal

Provide a dedicated endpoint to update `sellingPrice` and `receivingPrice` on a transferred car booking, with `debtAmount` recalculated server-side. The transfer booking's `receivingPrice` and `debtAmount` are also updated in the same transaction (see Business Logic).

---

## API Contract

```
PATCH /car-bookings/:id/original-pricing
Authorization: Bearer token

Request body:
{
  "sellingPrice": 2500000,           // required, positive number
  "receivingPrice": 1800000,         // required, positive number
  "reason": "Client renegotiated"    // optional, max 500 chars
}

Response 200:
{
  "originalBooking": { ...CarBookingResponseDto },
  "transferBooking": { ...CarBookingResponseDto }
}

Error responses:
  404 — booking not found
  400 — booking status is not "transferred"
  400 — service date is not in the current calendar month
  400 — original booking paymentStatus is "completed"
}
```

`debtAmount` is always recalculated server-side as `sellingPrice - receivingPrice`. It is never accepted from the client.

---

## Guards (applied in order)

1. **Exists** — `carBookingRepository.findById(originalId)`, 404 if not found
2. **Status** — must be `transferred`, 400 otherwise
3. **Same-month** — `serviceDate` month+year must match current UTC month+year, 400 otherwise
4. **Payment** — `paymentStatus` must not be `completed`, 400 otherwise

---

## Business Logic

### Original booking
- `debtAmount = new Decimal(sellingPrice) - new Decimal(receivingPrice)`
- Positive `debtAmount` = receivable (agency owes us)
- Negative `debtAmount` = payable (we owe agency)
- Append audit trail to `original.note`:
  ```
  [PRICING UPDATE - <datetime vi-VN>]
  Previous sellingPrice: X VND
  Previous receivingPrice: Y VND
  New sellingPrice: A VND
  New receivingPrice: B VND
  New debtAmount: C VND
  Reason: <reason if provided>
  ```

### Transfer booking (sync required)

The transfer booking's `receivingPrice` is copied from the original at transfer time and represents "what the partner agency collects from the guest" — the same guest, the same service. If the original's `receivingPrice` changes, the transfer booking holds stale data and its `debtAmount` becomes incorrect.

**Formula:**
```
transfer.receivingPrice = newReceivingPrice                              (sync)
transfer.debtAmount     = -(transfer.sellingPrice - newReceivingPrice)  (recalculate)
```

Where `transfer.sellingPrice` is the current compensation amount (already set, not changed here).

Both updates must be wrapped in a **`prisma.$transaction`**. If either update fails, neither is persisted.

---

## Files

### New
| File | Purpose |
|------|---------|
| `dto/update-car-original-pricing.dto.ts` | Request DTO: `sellingPrice`, `receivingPrice`, `reason?` |
| `pipes/update-car-original-pricing.pipe.ts` | Joi validation: positive numbers, optional reason ≤500 chars |

### Modified
| File | Change |
|------|--------|
| `dto/index.ts` | Export `UpdateCarOriginalPricingDto` |
| `pipes/index.ts` | Export `UpdateCarOriginalPricingPipe` |
| `service/car-booking.service.ts` | Add `updateOriginalPricing(originalId, dto, userId)` method |
| `controller/car-booking.controller.ts` | Add `PATCH /:id/original-pricing` route |
| `__tests__/car-booking.service.spec.ts` | Add test cases for `updateOriginalPricing` |

### No schema migration needed
All fields (`sellingPrice`, `receivingPrice`, `debtAmount`, `note`) already exist on `CarBooking`.

---

## Test Cases

| Scenario | Expected |
|----------|----------|
| Valid update on transferred booking | 200, original prices updated, transfer `receivingPrice` and `debtAmount` recalculated |
| Booking not found | 404 |
| Booking status is `confirmed` | 400 |
| Booking status is `cancelled` | 400 |
| Service date in previous month | 400 |
| Payment status is `completed` | 400 |
| `sellingPrice` is negative | 400 (pipe validation) |
| `receivingPrice` is zero | 400 (pipe validation) |
| `reason` exceeds 500 chars | 400 (pipe validation) |
| Note appended correctly | audit block appended to existing note |
| Transfer booking `receivingPrice` synced | equals original's new `receivingPrice` |
| Transfer booking `debtAmount` recalculated | `-(compensationAmount - newReceivingPrice)` |

---

## Out of Scope

- Transfer booking `sellingPrice` (compensation amount) is **not** changed — only `receivingPrice` and `debtAmount` are synced
- No changes to `updateTransferPricing` endpoint
- No new database migrations
