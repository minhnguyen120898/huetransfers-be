# Edit Original Booking Pricing After Transfer — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `PATCH /car-bookings/:id/original-pricing` so operators can edit `sellingPrice` and `receivingPrice` on a transferred car booking, with `debtAmount` recalculated server-side.

**Architecture:** New DTO + Joi pipe → new service method `updateOriginalPricing()` with four guards (transferred status, same-month, payment not completed, booking exists) → single `prisma.carBooking.update()` on the original booking only. Transfer booking is never touched. Pattern mirrors the existing `updateTransferPricing` flow exactly.

**Tech Stack:** NestJS, Prisma, Joi validation, Jest

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Create | `src/modules/car-booking/dto/update-car-original-pricing.dto.ts` | Request DTO shape |
| Create | `src/modules/car-booking/pipes/update-car-original-pricing.pipe.ts` | Joi validation |
| Modify | `src/modules/car-booking/dto/index.ts` | Export new DTO |
| Modify | `src/modules/car-booking/pipes/index.ts` | Export new pipe |
| Modify | `src/modules/car-booking/service/car-booking.service.ts` | Add `updateOriginalPricing()` |
| Modify | `src/modules/car-booking/controller/car-booking.controller.ts` | Add `PATCH /:id/original-pricing` route |
| Modify | `src/modules/car-booking/__tests__/car-booking.service.spec.ts` | Add test cases |

---

## Task 1: DTO + Pipe

**Files:**
- Create: `src/modules/car-booking/dto/update-car-original-pricing.dto.ts`
- Create: `src/modules/car-booking/pipes/update-car-original-pricing.pipe.ts`
- Modify: `src/modules/car-booking/dto/index.ts`
- Modify: `src/modules/car-booking/pipes/index.ts`

- [ ] **Step 1: Create the DTO**

Create `src/modules/car-booking/dto/update-car-original-pricing.dto.ts`:

```typescript
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCarOriginalPricingDto {
  @ApiProperty({
    description: 'New selling price in VND (what the client pays)',
    example: 2500000,
    minimum: 1,
  })
  sellingPrice: number;

  @ApiProperty({
    description: 'New receiving price in VND (what the agency pays us)',
    example: 1800000,
    minimum: 1,
  })
  receivingPrice: number;

  @ApiPropertyOptional({
    description: 'Reason for adjusting the pricing',
    example: 'Client renegotiated rate after service',
    maxLength: 500,
  })
  reason?: string;
}
```

- [ ] **Step 2: Create the Joi validation pipe**

Create `src/modules/car-booking/pipes/update-car-original-pricing.pipe.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';
import { JoiValidationPipe } from '../../common/pipes';

@Injectable()
export class UpdateCarOriginalPricingPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      sellingPrice: Joi.number()
        .positive()
        .precision(2)
        .required()
        .messages({
          'number.positive': 'Selling price must be greater than 0',
          'any.required': 'Selling price is required',
        }),

      receivingPrice: Joi.number()
        .positive()
        .precision(2)
        .required()
        .messages({
          'number.positive': 'Receiving price must be greater than 0',
          'any.required': 'Receiving price is required',
        }),

      reason: Joi.string().max(500).optional().allow(null, ''),
    });
  }
}
```

- [ ] **Step 3: Export DTO from dto/index.ts**

Open `src/modules/car-booking/dto/index.ts` and add at the end:

```typescript
export { UpdateCarOriginalPricingDto } from './update-car-original-pricing.dto';
```

- [ ] **Step 4: Export pipe from pipes/index.ts**

Open `src/modules/car-booking/pipes/index.ts` and add at the end:

```typescript
export { UpdateCarOriginalPricingPipe } from './update-car-original-pricing.pipe';
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/modules/car-booking/dto/update-car-original-pricing.dto.ts \
        src/modules/car-booking/pipes/update-car-original-pricing.pipe.ts \
        src/modules/car-booking/dto/index.ts \
        src/modules/car-booking/pipes/index.ts
git commit -m "feat: add UpdateCarOriginalPricingDto and pipe"
```

---

## Task 2: Service Method (TDD)

**Files:**
- Modify: `src/modules/car-booking/__tests__/car-booking.service.spec.ts`
- Modify: `src/modules/car-booking/service/car-booking.service.ts`

### Step 1 — Write failing tests first

- [ ] **Step 1: Add tests for `updateOriginalPricing` to the spec file**

Open `src/modules/car-booking/__tests__/car-booking.service.spec.ts`.

After the existing `describe` blocks, add the following new `describe` block. The `makeEntity` helper and module setup are already in the file — reuse them.

```typescript
describe('updateOriginalPricing', () => {
  const THIS_MONTH = new Date();
  const serviceDateThisMonth = new Date(
    Date.UTC(THIS_MONTH.getUTCFullYear(), THIS_MONTH.getUTCMonth(), 15),
  );
  const serviceDateLastMonth = new Date(
    Date.UTC(THIS_MONTH.getUTCFullYear(), THIS_MONTH.getUTCMonth() - 1, 15),
  );

  function makeTransferredEntity(
    overrides: Partial<CarBookingEntity> = {},
  ): CarBookingEntity {
    return makeEntity({
      status: CarBookingStatus.transferred,
      serviceDate: serviceDateThisMonth,
      paymentStatus: PaymentStatus.pending,
      sellingPrice: new Decimal(2000000),
      receivingPrice: new Decimal(1500000),
      debtAmount: new Decimal(500000),
      ...overrides,
    });
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('throws NotFoundException when booking does not exist', async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(
      service.updateOriginalPricing(
        'non-existent-id',
        { sellingPrice: 2500000, receivingPrice: 1800000 },
        'user-1',
      ),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws BadRequestException when booking is not transferred', async () => {
    mockRepository.findById.mockResolvedValue(
      makeTransferredEntity({ status: CarBookingStatus.confirmed }),
    );

    await expect(
      service.updateOriginalPricing(
        'car-booking-uuid-1',
        { sellingPrice: 2500000, receivingPrice: 1800000 },
        'user-1',
      ),
    ).rejects.toThrow(BadRequestException);
  });

  it('throws BadRequestException when service date is in a past month', async () => {
    mockRepository.findById.mockResolvedValue(
      makeTransferredEntity({ serviceDate: serviceDateLastMonth }),
    );

    await expect(
      service.updateOriginalPricing(
        'car-booking-uuid-1',
        { sellingPrice: 2500000, receivingPrice: 1800000 },
        'user-1',
      ),
    ).rejects.toThrow(BadRequestException);
  });

  it('throws BadRequestException when payment status is completed', async () => {
    mockRepository.findById.mockResolvedValue(
      makeTransferredEntity({ paymentStatus: PaymentStatus.completed }),
    );

    await expect(
      service.updateOriginalPricing(
        'car-booking-uuid-1',
        { sellingPrice: 2500000, receivingPrice: 1800000 },
        'user-1',
      ),
    ).rejects.toThrow(BadRequestException);
  });

  it('updates sellingPrice, receivingPrice, and recalculates debtAmount', async () => {
    const original = makeTransferredEntity();
    mockRepository.findById.mockResolvedValue(original);

    const updatedRecord = {
      ...original,
      sellingPrice: new Decimal(2500000),
      receivingPrice: new Decimal(1800000),
      debtAmount: new Decimal(700000),
      travelAgency: original.travelAgency,
      transferBookings: [],
      transferToAgency: null,
    };
    mockPrisma.carBooking.update = jest.fn().mockResolvedValue(updatedRecord);

    const result = await service.updateOriginalPricing(
      'car-booking-uuid-1',
      { sellingPrice: 2500000, receivingPrice: 1800000, reason: 'Renegotiated' },
      'user-1',
    );

    expect(mockPrisma.carBooking.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'car-booking-uuid-1' },
        data: expect.objectContaining({
          sellingPrice: expect.any(Object), // Decimal
          receivingPrice: expect.any(Object), // Decimal
          debtAmount: expect.any(Object), // Decimal
          updatedById: 'user-1',
        }),
      }),
    );

    expect(result.originalBooking.sellingPrice).toBe(2500000);
    expect(result.originalBooking.receivingPrice).toBe(1800000);
    expect(result.originalBooking.debtAmount).toBe(700000);
  });

  it('appends audit note when original note is null', async () => {
    const original = makeTransferredEntity({ note: null });
    mockRepository.findById.mockResolvedValue(original);

    const updatedRecord = {
      ...original,
      sellingPrice: new Decimal(2500000),
      receivingPrice: new Decimal(1800000),
      debtAmount: new Decimal(700000),
      note: '[PRICING UPDATE',
      travelAgency: original.travelAgency,
      transferBookings: [],
      transferToAgency: null,
    };
    mockPrisma.carBooking.update = jest.fn().mockResolvedValue(updatedRecord);

    await service.updateOriginalPricing(
      'car-booking-uuid-1',
      { sellingPrice: 2500000, receivingPrice: 1800000 },
      'user-1',
    );

    const updateCall = (mockPrisma.carBooking.update as jest.Mock).mock.calls[0][0];
    expect(updateCall.data.note).toContain('[PRICING UPDATE');
    expect(updateCall.data.note).toContain('2000000'); // previous sellingPrice
    expect(updateCall.data.note).toContain('2500000'); // new sellingPrice
  });

  it('appends audit note to existing note', async () => {
    const original = makeTransferredEntity({ note: 'Some existing note' });
    mockRepository.findById.mockResolvedValue(original);

    const updatedRecord = {
      ...original,
      sellingPrice: new Decimal(2500000),
      receivingPrice: new Decimal(1800000),
      debtAmount: new Decimal(700000),
      note: 'Some existing note\n\n[PRICING UPDATE',
      travelAgency: original.travelAgency,
      transferBookings: [],
      transferToAgency: null,
    };
    mockPrisma.carBooking.update = jest.fn().mockResolvedValue(updatedRecord);

    await service.updateOriginalPricing(
      'car-booking-uuid-1',
      { sellingPrice: 2500000, receivingPrice: 1800000 },
      'user-1',
    );

    const updateCall = (mockPrisma.carBooking.update as jest.Mock).mock.calls[0][0];
    expect(updateCall.data.note).toContain('Some existing note');
    expect(updateCall.data.note).toContain('[PRICING UPDATE');
  });
});
```

- [ ] **Step 2: Run the tests — they must FAIL**

```bash
npx jest src/modules/car-booking/__tests__/car-booking.service.spec.ts --no-coverage 2>&1 | tail -20
```

Expected: failures with `TypeError: service.updateOriginalPricing is not a function` or similar.

### Step 3 — Implement the service method

- [ ] **Step 3: Add `updateOriginalPricing` to the service**

Open `src/modules/car-booking/service/car-booking.service.ts`.

Add this import at the top (alongside existing DTO imports):

```typescript
import { UpdateCarOriginalPricingDto } from '../dto';
```

Then add the method after `updateTransferPricing` (before the `cancelTransfer` section):

```typescript
// ============================================================
// UPDATE ORIGINAL PRICING (post-transfer)
// ============================================================

/**
 * Edit sellingPrice / receivingPrice on a transferred booking.
 * debtAmount is recalculated as sellingPrice - receivingPrice.
 * Transfer booking (compensation) is NOT affected.
 *
 * Guards:
 *   1. Booking must exist
 *   2. Status must be "transferred"
 *   3. serviceDate must be in the current UTC month
 *   4. paymentStatus must not be "completed"
 */
async updateOriginalPricing(
  originalId: string,
  dto: UpdateCarOriginalPricingDto,
  userId?: string,
): Promise<{ originalBooking: CarBookingResponseDto }> {
  const original = await this.carBookingRepository.findById(originalId);
  if (!original) {
    throw new NotFoundException(
      `Car booking with ID ${originalId} not found`,
    );
  }

  if (!original.isTransferred()) {
    throw new BadRequestException(
      `Car booking ${originalId} has not been transferred (status: ${original.status}). ` +
        'Only transferred bookings can have their original pricing updated.',
    );
  }

  const now = new Date();
  const currentMonth = now.getUTCMonth();
  const currentYear = now.getUTCFullYear();
  const serviceMonth = original.serviceDate.getUTCMonth();
  const serviceYear = original.serviceDate.getUTCFullYear();

  if (serviceYear !== currentYear || serviceMonth !== currentMonth) {
    throw new BadRequestException(
      `Cannot update pricing for car booking ${original.bookingCode}. ` +
        `Pricing updates are only allowed in the same month as the service date ` +
        `(${original.serviceDate.toISOString().slice(0, 7)}).`,
    );
  }

  if (original.paymentStatus === PaymentStatus.completed) {
    throw new BadRequestException(
      `Cannot update pricing for car booking ${original.bookingCode}. ` +
        `Payment is already completed.`,
    );
  }

  const newSellingPrice = new Decimal(dto.sellingPrice);
  const newReceivingPrice = new Decimal(dto.receivingPrice);
  const newDebtAmount = newSellingPrice.minus(newReceivingPrice);

  const pricingNote =
    `\n\n[PRICING UPDATE - ${new Date().toLocaleString('vi-VN')}]\n` +
    `Previous sellingPrice: ${original.sellingPrice.toString()} VND\n` +
    `Previous receivingPrice: ${original.receivingPrice.toString()} VND\n` +
    `New sellingPrice: ${newSellingPrice.toString()} VND\n` +
    `New receivingPrice: ${newReceivingPrice.toString()} VND\n` +
    `New debtAmount: ${newDebtAmount.toString()} VND\n` +
    (dto.reason ? `Reason: ${dto.reason}\n` : '');

  const updatedNote = original.note
    ? `${original.note}${pricingNote}`
    : pricingNote;

  const updatedData = await this.prisma.carBooking.update({
    where: { id: originalId },
    data: {
      sellingPrice: newSellingPrice,
      receivingPrice: newReceivingPrice,
      debtAmount: newDebtAmount,
      note: updatedNote,
      updatedById: userId ?? null,
    },
    include: {
      travelAgency: {
        select: { id: true, name: true, tel: true, address: true },
      },
      transferBookings: true,
      transferToAgency: true,
    },
  });

  this.logger.info(
    `[CarBookingService] Updated original pricing for ${original.bookingCode}: ` +
      `sellingPrice=${newSellingPrice.toString()}, receivingPrice=${newReceivingPrice.toString()}, debtAmount=${newDebtAmount.toString()}`,
  );

  return {
    originalBooking: this.mapToResponseDto(this.mapPrismaToEntity(updatedData)),
  };
}
```

- [ ] **Step 4: Run the tests — they must PASS**

```bash
npx jest src/modules/car-booking/__tests__/car-booking.service.spec.ts --no-coverage 2>&1 | tail -20
```

Expected: all tests pass, including the new `updateOriginalPricing` describe block.

- [ ] **Step 5: Commit**

```bash
git add src/modules/car-booking/__tests__/car-booking.service.spec.ts \
        src/modules/car-booking/service/car-booking.service.ts
git commit -m "feat: add updateOriginalPricing service method with guards and TDD"
```

---

## Task 3: Controller Route

**Files:**
- Modify: `src/modules/car-booking/controller/car-booking.controller.ts`

- [ ] **Step 1: Add DTO and pipe imports to the controller**

Open `src/modules/car-booking/controller/car-booking.controller.ts`.

In the DTO import block, add `UpdateCarOriginalPricingDto`:

```typescript
import {
  CreateCarBookingDto,
  UpdateCarBookingDto,
  CarBookingQueryDto,
  CarBookingResponseDto,
  CarBookingCountQueryDto,
  CreateCarTransferBookingDto,
  UpdateCarTransferPricingDto,
  UpdateCarOriginalPricingDto,   // ← add this
  BulkCarPaymentStatusDto,
  CarBookingSummaryQueryDto,
  CarBookingSummaryResponseDto,
} from '../dto';
```

In the pipe import block, add `UpdateCarOriginalPricingPipe`:

```typescript
import {
  CarBookingPipe,
  UpdateCarBookingPipe,
  CarBookingQueryPipe,
  CarBookingCountQueryPipe,
  CreateCarTransferBookingPipe,
  UpdateCarTransferPricingPipe,
  UpdateCarOriginalPricingPipe,   // ← add this
  BulkCarPaymentStatusPipe,
  CarBookingSummaryQueryPipe,
} from '../pipes';
```

- [ ] **Step 2: Add the route handler**

In the controller, add the following method after the `updateTransferPricing` handler (still within the UPDATE section):

```typescript
@Patch(':id/original-pricing')
@ApiOperation({
  summary: 'Update original booking pricing after transfer',
  description:
    'Edit sellingPrice and receivingPrice on a transferred car booking. ' +
    'debtAmount is recalculated server-side as sellingPrice - receivingPrice. ' +
    'The linked transfer (compensation) booking is NOT affected.\n\n' +
    '**Guards:**\n' +
    '- Booking must have status `transferred`\n' +
    '- Service date must be in the current calendar month\n' +
    '- Original booking `paymentStatus` must not be `completed`',
})
@ApiParam({
  name: 'id',
  description: 'ID of the original (transferred) car booking',
})
@ApiResponse({
  status: HttpStatus.OK,
  description: 'Original booking pricing updated successfully',
  schema: {
    type: 'object',
    properties: {
      originalBooking: { $ref: '#/components/schemas/CarBookingResponseDto' },
    },
  },
})
@ApiBadRequestResponse({
  description:
    'Guard failed — wrong status, past month, or payment already completed',
})
@ApiNotFoundResponse({ description: 'Car booking not found' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
async updateOriginalPricing(
  @Param('id') id: string,
  @Body(UpdateCarOriginalPricingPipe) dto: UpdateCarOriginalPricingDto,
  @Req() req: FastifyRequest,
): Promise<{ originalBooking: CarBookingResponseDto }> {
  const userId = req.user?.id;
  const result = await this.carBookingService.updateOriginalPricing(
    id,
    dto,
    userId,
  );
  this.logger.info(
    `[CarBookingController] PATCH /car-bookings/${id}/original-pricing → updated pricing`,
  );
  return result;
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Run the full car-booking test suite**

```bash
npx jest src/modules/car-booking --no-coverage 2>&1 | tail -30
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/modules/car-booking/controller/car-booking.controller.ts
git commit -m "feat: add PATCH /car-bookings/:id/original-pricing endpoint"
```

---

## Task 4: Final Verification

- [ ] **Step 1: Run the full test suite**

```bash
npx jest --no-coverage 2>&1 | tail -20
```

Expected: all tests pass, no regressions.

- [ ] **Step 2: Build check**

```bash
npx tsc --noEmit
```

Expected: no TypeScript errors.

- [ ] **Step 3: Smoke test the route ordering**

Verify the new `PATCH /:id/original-pricing` route does not conflict with `PATCH /:id`. In NestJS/Fastify, literal sub-paths (`:id/original-pricing`) are distinct from plain `:id` — no reordering needed. Confirm by reviewing the controller method order:

1. `PATCH bulk-payment-status` (before `:id`)
2. `PATCH :id` (general update)
3. `PATCH :id/transfer-pricing`
4. `PATCH :id/original-pricing` ← new, safe as sub-path

- [ ] **Step 4: Final commit if any loose files**

```bash
git status
```

If clean, nothing to do. If any modified files remain unstaged, stage and commit them.
