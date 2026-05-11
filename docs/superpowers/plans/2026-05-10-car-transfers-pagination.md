# Car Transfers Pagination Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split `GET /profit/car-summary` to return transfer totals only, and introduce `GET /profit/car-transfers?year=&month=&page=&limit=` for paginated transfer detail rows.

**Architecture:** Add `getCarTransfers(year, month, page, limit)` to `CarProfitService` using the existing `findMany` pattern with `skip/take`. Slim down the summary's `findMany` to select price fields only (no codes or names), drop the `transfers` array from its response. All changes stay inside the profit module.

**Tech Stack:** NestJS, Prisma, Joi (validation pipes), Jest (unit tests), TypeScript, `@prisma/client/runtime/library` Decimal

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `src/modules/profit/dto/car-transfer-query.dto.ts` | DTO shape for `year`, `month`, `page`, `limit` |
| Create | `src/modules/profit/dto/car-transfer-response.dto.ts` | Swagger-annotated response: `data[]` + `meta` |
| Create | `src/modules/profit/pipes/car-transfer-query.pipe.ts` | Joi pipe: validate + coerce `page`/`limit` with defaults |
| Modify | `src/modules/profit/interfaces/car-profit.interface.ts` | Remove `transfers` from `CarTransferFinancials`; add `PaginatedCarTransfers` |
| Modify | `src/modules/profit/dto/car-profit-summary-response.dto.ts` | Remove `transfers` array from `CarTransferFinancialsDto` |
| Modify | `src/modules/profit/dto/index.ts` | Export new DTOs |
| Modify | `src/modules/profit/pipes/index.ts` | Export new pipe |
| Modify | `src/modules/profit/services/car-profit.service.ts` | Slim summary `findMany`; add `getCarTransfers` |
| Modify | `src/modules/profit/services/__tests__/car-profit.service.spec.ts` | Update existing tests; add `getCarTransfers` tests |
| Modify | `src/modules/profit/controllers/car-profit.controller.ts` | Add `GET /profit/car-transfers` route |

---

## Task 1: Update interfaces — remove `transfers` array, add `PaginatedCarTransfers`

**Files:**
- Modify: `src/modules/profit/interfaces/car-profit.interface.ts`

- [ ] **Step 1: Open the file and remove `transfers` from `CarTransferFinancials`, add `PaginatedCarTransfers`**

Replace the entire file content with:

```typescript
import { Decimal } from '@prisma/client/runtime/library';

export interface CarProfitPeriod {
  startDate: Date;
  endDate: Date;
}

export interface CarTransferDetail {
  originalBookingCode: string;
  transferBookingCode: string;
  partnerAgencyName: string;
  originalSellingPrice: Decimal;
  compensationAmount: Decimal;
  netCost: Decimal;
}

export interface CarTransferFinancials {
  transferCount: number;
  totalOriginalSellingPrice: Decimal;
  totalCompensationAmount: Decimal;
  netTransferCost: Decimal;
  // transfers array removed — use GET /profit/car-transfers for detail rows
}

export interface PaginatedCarTransfersMeta {
  total: number;
  page: number;
  limit: number;
}

export interface PaginatedCarTransfers {
  data: CarTransferDetail[];
  meta: PaginatedCarTransfersMeta;
}

export interface CarBookingFinancials {
  grossRevenue: Decimal;
  transferDeductions: Decimal;
  revenue: Decimal;
  bookingCount: number;
  guestCount: number;
  netProfit: Decimal;
}

export interface CarExpenseByCategory {
  gasoline: Decimal;
  maintenance: Decimal;
  insurance: Decimal;
  bank: Decimal;
  other: Decimal;
}

export interface CarExpenseFinancials {
  total: Decimal;
  byCategory: CarExpenseByCategory;
  expenseCount: number;
}

export interface CarMonthlyProfitSummary {
  year: number;
  month: number;
  period: CarProfitPeriod;
  bookingFinancials: CarBookingFinancials;
  transferFinancials: CarTransferFinancials;
  expenseFinancials: CarExpenseFinancials;
  totalProfit: Decimal;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/modules/profit/interfaces/car-profit.interface.ts
git commit -m "refactor: remove transfers array from CarTransferFinancials interface, add PaginatedCarTransfers"
```

---

## Task 2: Update summary response DTO — remove `transfers` array

**Files:**
- Modify: `src/modules/profit/dto/car-profit-summary-response.dto.ts`

- [ ] **Step 1: Remove the `transfers` field and `CarTransferDetailDto` class**

Replace `CarTransferFinancialsDto` class (lines 34–52) with:

```typescript
class CarTransferFinancialsDto {
  @ApiProperty({ example: 2 })
  transferCount: number;

  @ApiProperty({ example: '10000000' })
  totalOriginalSellingPrice: string;

  @ApiProperty({ example: '11000000' })
  totalCompensationAmount: string;

  @ApiProperty({
    description: 'totalCompensationAmount - totalOriginalSellingPrice',
    example: '1000000',
  })
  netTransferCost: string;
}
```

Also delete the `CarTransferDetailDto` class entirely (it's no longer referenced).

- [ ] **Step 2: Commit**

```bash
git add src/modules/profit/dto/car-profit-summary-response.dto.ts
git commit -m "refactor: remove transfers array from CarTransferFinancialsDto"
```

---

## Task 3: Create transfer query DTO

**Files:**
- Create: `src/modules/profit/dto/car-transfer-query.dto.ts`

- [ ] **Step 1: Write the DTO**

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class CarTransferQueryDto {
  @ApiProperty({
    description: 'Year to query',
    example: 2026,
    minimum: 2020,
    maximum: 2100,
  })
  year: number;

  @ApiProperty({
    description: 'Month to query (1-12)',
    example: 5,
    minimum: 1,
    maximum: 12,
  })
  month: number;

  @ApiProperty({
    description: 'Page number (1-based)',
    example: 1,
    minimum: 1,
    default: 1,
    required: false,
  })
  page: number;

  @ApiProperty({
    description: 'Items per page (1-100)',
    example: 10,
    minimum: 1,
    maximum: 100,
    default: 10,
    required: false,
  })
  limit: number;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/modules/profit/dto/car-transfer-query.dto.ts
git commit -m "feat: add CarTransferQueryDto for paginated transfers endpoint"
```

---

## Task 4: Create transfer response DTO

**Files:**
- Create: `src/modules/profit/dto/car-transfer-response.dto.ts`

- [ ] **Step 1: Write the DTO**

```typescript
import { ApiProperty } from '@nestjs/swagger';

class CarTransferDetailResponseDto {
  @ApiProperty({ example: 'CB-20260501-XXXX' })
  originalBookingCode: string;

  @ApiProperty({ example: 'CB-20260501-XXXX-T' })
  transferBookingCode: string;

  @ApiProperty({ example: 'STours' })
  partnerAgencyName: string;

  @ApiProperty({ example: '5000000' })
  originalSellingPrice: string;

  @ApiProperty({ example: '5500000' })
  compensationAmount: string;

  @ApiProperty({
    description: 'compensationAmount - originalSellingPrice',
    example: '500000',
  })
  netCost: string;
}

class CarTransferPaginationMetaDto {
  @ApiProperty({ example: 25 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;
}

export class PaginatedCarTransfersResponseDto {
  @ApiProperty({ type: [CarTransferDetailResponseDto] })
  data: CarTransferDetailResponseDto[];

  @ApiProperty({ type: CarTransferPaginationMetaDto })
  meta: CarTransferPaginationMetaDto;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/modules/profit/dto/car-transfer-response.dto.ts
git commit -m "feat: add PaginatedCarTransfersResponseDto for transfers endpoint"
```

---

## Task 5: Create transfer query pipe

**Files:**
- Create: `src/modules/profit/pipes/car-transfer-query.pipe.ts`

- [ ] **Step 1: Write the pipe (follows same Joi pattern as `CarProfitQueryPipe`)**

```typescript
import * as Joi from 'joi';
import { JoiValidationPipe } from 'src/modules/common/pipes/joi-validation.pipe';

export class CarTransferQueryPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object({
      year: Joi.number().integer().min(2020).max(2100).required().messages({
        'number.base': 'Year must be a number',
        'number.integer': 'Year must be an integer',
        'number.min': 'Year must be between 2020 and 2100',
        'number.max': 'Year must be between 2020 and 2100',
        'any.required': 'Year is required',
      }),
      month: Joi.number().integer().min(1).max(12).required().messages({
        'number.base': 'Month must be a number',
        'number.integer': 'Month must be an integer',
        'number.min': 'Month must be between 1 and 12',
        'number.max': 'Month must be between 1 and 12',
        'any.required': 'Month is required',
      }),
      page: Joi.number().integer().min(1).default(1).messages({
        'number.base': 'Page must be a number',
        'number.integer': 'Page must be an integer',
        'number.min': 'Page must be at least 1',
      }),
      limit: Joi.number().integer().min(1).max(100).default(10).messages({
        'number.base': 'Limit must be a number',
        'number.integer': 'Limit must be an integer',
        'number.min': 'Limit must be at least 1',
        'number.max': 'Limit must not exceed 100',
      }),
    });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/modules/profit/pipes/car-transfer-query.pipe.ts
git commit -m "feat: add CarTransferQueryPipe with Joi validation and defaults"
```

---

## Task 6: Update barrel exports

**Files:**
- Modify: `src/modules/profit/dto/index.ts`
- Modify: `src/modules/profit/pipes/index.ts`

- [ ] **Step 1: Add new exports to `dto/index.ts`**

```typescript
export * from './car-profit-query.dto';
export * from './car-profit-summary-response.dto';
export * from './car-transfer-query.dto';
export * from './car-transfer-response.dto';
```

- [ ] **Step 2: Add new export to `pipes/index.ts`**

```typescript
export * from './car-profit-query.pipe';
export * from './car-transfer-query.pipe';
```

- [ ] **Step 3: Commit**

```bash
git add src/modules/profit/dto/index.ts src/modules/profit/pipes/index.ts
git commit -m "chore: export CarTransferQueryDto, PaginatedCarTransfersResponseDto, CarTransferQueryPipe"
```

---

## Task 7: Update service — slim summary query, add `getCarTransfers`

**Files:**
- Modify: `src/modules/profit/services/car-profit.service.ts`

- [ ] **Step 1: Write the failing tests first**

Open `src/modules/profit/services/__tests__/car-profit.service.spec.ts` and add `count` to `mockPrisma`:

```typescript
const mockPrisma = {
  carBooking: {
    aggregate: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
  },
};
```

Then update the existing `'calculates transfer deductions correctly'` test — the `transfers` array is gone from `transferFinancials`:

```typescript
it('calculates transfer deductions correctly', async () => {
  const result = await service.getCarMonthlyProfitSummary(year, month);
  expect(result.transferFinancials.netTransferCost.toString()).toBe('500000');
  expect(result.transferFinancials.transferCount).toBe(1);
  // transfers array no longer exists on transferFinancials
  expect((result.transferFinancials as any).transfers).toBeUndefined();
});
```

Add a new `describe` block for `getCarTransfers` at the bottom of the file (before the closing `}` of the outer `describe`):

```typescript
describe('getCarTransfers', () => {
  const year = 2026;
  const month = 5;

  const mockTransferRows = [
    {
      bookingCode: 'CB-20260501-TRANSFER',
      sellingPrice: new Decimal('5500000'),
      travelAgency: { name: 'STours' },
      transferFrom: {
        bookingCode: 'CB-20260501-ORIG',
        sellingPrice: new Decimal('5000000'),
      },
    },
    {
      bookingCode: 'CB-20260502-TRANSFER',
      sellingPrice: new Decimal('3300000'),
      travelAgency: { name: 'BTours' },
      transferFrom: {
        bookingCode: 'CB-20260502-ORIG',
        sellingPrice: new Decimal('3000000'),
      },
    },
  ];

  it('returns paginated transfers with correct meta', async () => {
    mockPrisma.carBooking.findMany.mockResolvedValueOnce([mockTransferRows[0]]);
    mockPrisma.carBooking.count.mockResolvedValueOnce(2);

    const result = await service.getCarTransfers(year, month, 1, 1);

    expect(result.data).toHaveLength(1);
    expect(result.meta.total).toBe(2);
    expect(result.meta.page).toBe(1);
    expect(result.meta.limit).toBe(1);
  });

  it('maps transfer row fields correctly', async () => {
    mockPrisma.carBooking.findMany.mockResolvedValueOnce([mockTransferRows[0]]);
    mockPrisma.carBooking.count.mockResolvedValueOnce(1);

    const result = await service.getCarTransfers(year, month, 1, 10);
    const item = result.data[0];

    expect(item.originalBookingCode).toBe('CB-20260501-ORIG');
    expect(item.transferBookingCode).toBe('CB-20260501-TRANSFER');
    expect(item.partnerAgencyName).toBe('STours');
    expect(item.originalSellingPrice.toString()).toBe('5000000');
    expect(item.compensationAmount.toString()).toBe('5500000');
    expect(item.netCost.toString()).toBe('500000');
  });

  it('returns empty data for a month with no transfers', async () => {
    mockPrisma.carBooking.findMany.mockResolvedValueOnce([]);
    mockPrisma.carBooking.count.mockResolvedValueOnce(0);

    const result = await service.getCarTransfers(year, month, 1, 10);

    expect(result.data).toHaveLength(0);
    expect(result.meta.total).toBe(0);
  });

  it('calculates correct skip for page 2', async () => {
    mockPrisma.carBooking.findMany.mockResolvedValueOnce([mockTransferRows[1]]);
    mockPrisma.carBooking.count.mockResolvedValueOnce(2);

    await service.getCarTransfers(year, month, 2, 1);

    expect(mockPrisma.carBooking.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ skip: 1, take: 1 }),
    );
  });

  it('handles missing transferFrom gracefully', async () => {
    mockPrisma.carBooking.findMany.mockResolvedValueOnce([
      {
        bookingCode: 'CB-20260503-TRANSFER',
        sellingPrice: new Decimal('4000000'),
        travelAgency: null,
        transferFrom: null,
      },
    ]);
    mockPrisma.carBooking.count.mockResolvedValueOnce(1);

    const result = await service.getCarTransfers(year, month, 1, 10);
    const item = result.data[0];

    expect(item.originalBookingCode).toBe('');
    expect(item.partnerAgencyName).toBe('');
    expect(item.originalSellingPrice.toString()).toBe('0');
  });
});
```

- [ ] **Step 2: Run the tests — they should FAIL**

```bash
cd /Users/minhnn/Documents/workspaces/my-project/huetransfers-be
npx jest src/modules/profit/services/__tests__/car-profit.service.spec.ts --no-coverage
```

Expected: FAIL — `service.getCarTransfers is not a function`, and `transfers` undefined check may fail on old test.

- [ ] **Step 3: Implement the changes in `car-profit.service.ts`**

Replace the entire file with:

```typescript
import { Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/modules/common/provider/prisma.provider';
import { ExpenseService } from 'src/modules/expense/service/expense.service';
import { LoggerService } from 'src/modules/common';
import {
  CarMonthlyProfitSummary,
  CarTransferDetail,
  PaginatedCarTransfers,
} from '../interfaces';

@Injectable()
export class CarProfitService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly expenseService: ExpenseService,
    private readonly logger: LoggerService,
  ) {}

  async getCarMonthlyProfitSummary(
    year: number,
    month: number,
  ): Promise<CarMonthlyProfitSummary> {
    this.logger.info(
      `[CarProfitService] Calculating car profit summary for ${year}-${month}`,
    );

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);
    const period = { startDate, endDate };

    const transferWhere = {
      isTransfer: true,
      status: { notIn: ['cancelled'] as const },
      serviceDate: { gte: startDate, lte: endDate },
    };

    const [bookingAgg, transferRows, expenseSummary] = await Promise.all([
      this.prisma.carBooking.aggregate({
        where: {
          isTransfer: false,
          status: { in: ['confirmed', 'completed', 'transferred'] },
          serviceDate: { gte: startDate, lte: endDate },
        },
        _count: { id: true },
        _sum: { sellingPrice: true, guestCount: true },
      }),

      // Minimal select — price fields only, no codes or agency names
      this.prisma.carBooking.findMany({
        where: transferWhere,
        select: {
          sellingPrice: true,
          transferFrom: { select: { sellingPrice: true } },
        },
      }),

      this.expenseService.getSummaryByMonth(year, month),
    ]);

    const transferCount = transferRows.length;
    const totalCompensationAmount = transferRows.reduce(
      (sum, t) => sum.plus(new Decimal(t.sellingPrice)),
      new Decimal(0),
    );
    const totalOriginalSellingPrice = transferRows.reduce(
      (sum, t) => sum.plus(new Decimal(t.transferFrom?.sellingPrice ?? 0)),
      new Decimal(0),
    );
    const netTransferCost = totalCompensationAmount.minus(
      totalOriginalSellingPrice,
    );

    const grossRevenue = new Decimal(bookingAgg._sum.sellingPrice ?? 0);
    const transferDeductions = totalCompensationAmount;
    const revenue = grossRevenue.minus(transferDeductions);

    const totalExpenses = new Decimal(expenseSummary.totalAmount);
    const expenseFinancials = {
      total: totalExpenses,
      byCategory: {
        gasoline: new Decimal(expenseSummary.byCategory.gasoline),
        maintenance: new Decimal(expenseSummary.byCategory.maintenance),
        insurance: new Decimal(expenseSummary.byCategory.insurance),
        bank: new Decimal(expenseSummary.byCategory.bank),
        other: new Decimal(expenseSummary.byCategory.other),
      },
      expenseCount: expenseSummary.expenseCount,
    };

    const netProfit = revenue.minus(totalExpenses);

    this.logger.info(
      `[CarProfitService] Car profit summary: grossRevenue=${grossRevenue}, ` +
        `transferDeductions=${transferDeductions}, revenue=${revenue}, ` +
        `expenses=${totalExpenses}, netProfit=${netProfit}`,
    );

    return {
      year,
      month,
      period,
      bookingFinancials: {
        grossRevenue,
        transferDeductions,
        revenue,
        bookingCount: bookingAgg._count.id,
        guestCount: bookingAgg._sum.guestCount ?? 0,
        netProfit,
      },
      transferFinancials: {
        transferCount,
        totalOriginalSellingPrice,
        totalCompensationAmount,
        netTransferCost,
      },
      expenseFinancials,
      totalProfit: netProfit,
    };
  }

  async getCarTransfers(
    year: number,
    month: number,
    page: number,
    limit: number,
  ): Promise<PaginatedCarTransfers> {
    this.logger.info(
      `[CarProfitService] Fetching transfer list for ${year}-${month} page=${page} limit=${limit}`,
    );

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const where = {
      isTransfer: true,
      status: { notIn: ['cancelled'] as const },
      serviceDate: { gte: startDate, lte: endDate },
    };

    const [rows, total] = await Promise.all([
      this.prisma.carBooking.findMany({
        where,
        select: {
          bookingCode: true,
          sellingPrice: true,
          travelAgency: { select: { name: true } },
          transferFrom: {
            select: {
              bookingCode: true,
              sellingPrice: true,
            },
          },
        },
        orderBy: { serviceDate: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.carBooking.count({ where }),
    ]);

    const data: CarTransferDetail[] = rows.map((t) => {
      const compensationAmount = new Decimal(t.sellingPrice);
      const originalSellingPrice = new Decimal(
        t.transferFrom?.sellingPrice ?? 0,
      );
      return {
        originalBookingCode: t.transferFrom?.bookingCode ?? '',
        transferBookingCode: t.bookingCode,
        partnerAgencyName: t.travelAgency?.name ?? '',
        originalSellingPrice,
        compensationAmount,
        netCost: compensationAmount.minus(originalSellingPrice),
      };
    });

    return {
      data,
      meta: { total, page, limit },
    };
  }
}
```

- [ ] **Step 4: Run the tests — they should PASS**

```bash
npx jest src/modules/profit/services/__tests__/car-profit.service.spec.ts --no-coverage
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/modules/profit/services/car-profit.service.ts \
        src/modules/profit/services/__tests__/car-profit.service.spec.ts
git commit -m "feat: slim summary transfer query, add getCarTransfers with pagination"
```

---

## Task 8: Add `GET /profit/car-transfers` route to controller

**Files:**
- Modify: `src/modules/profit/controllers/car-profit.controller.ts`

- [ ] **Step 1: Add the new route**

Replace the entire file with:

```typescript
import { Controller, Get, Query, HttpStatus, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { LoggerService } from 'src/modules/common';
import { CarProfitService } from '../services';
import {
  CarProfitQueryDto,
  CarMonthlyProfitSummaryResponseDto,
  CarTransferQueryDto,
  PaginatedCarTransfersResponseDto,
} from '../dto';
import { CarProfitQueryPipe, CarTransferQueryPipe } from '../pipes';
import { CarMonthlyProfitSummary, PaginatedCarTransfers } from '../interfaces';

@ApiTags('Profit')
@Controller('profit')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CarProfitController {
  constructor(
    private readonly carProfitService: CarProfitService,
    private readonly logger: LoggerService,
  ) {}

  @Get('car-summary')
  @ApiOperation({
    summary: 'Get monthly car booking profit summary',
    description:
      'Retrieve monthly profit summary for the car booking system.\n\n' +
      '**Booking Financials:**\n' +
      '- Gross Revenue: SUM(sellingPrice) of non-transfer bookings\n' +
      '- Transfer Deductions: Total compensation paid to partner agencies\n' +
      '- Revenue: Gross revenue minus transfer deductions\n\n' +
      '**Transfer Financials:**\n' +
      '- Aggregated totals only. Use GET /profit/car-transfers for per-transfer detail.\n\n' +
      '**Expense Financials:**\n' +
      '- Fleet expenses by category: gasoline, maintenance, insurance, bank, other\n\n' +
      '**Formula:**\n' +
      '- netProfit = revenue - totalExpenses\n' +
      '- totalProfit = netProfit',
  })
  @ApiQuery({ name: 'year', required: true, type: Number, example: 2026 })
  @ApiQuery({ name: 'month', required: true, type: Number, example: 4 })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Car booking profit summary retrieved successfully',
    type: CarMonthlyProfitSummaryResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid query parameters' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getCarMonthlyProfitSummary(
    @Query(CarProfitQueryPipe) query: CarProfitQueryDto,
  ): Promise<CarMonthlyProfitSummary> {
    this.logger.info(
      `[CarProfitController] GET /profit/car-summary?year=${query.year}&month=${query.month}`,
    );

    const summary = await this.carProfitService.getCarMonthlyProfitSummary(
      query.year,
      query.month,
    );

    this.logger.info(
      `[CarProfitController] Car profit summary completed: totalProfit=${summary.totalProfit.toString()} VND`,
    );

    return summary;
  }

  @Get('car-transfers')
  @ApiOperation({
    summary: 'Get paginated transfer bookings for a month',
    description:
      'Retrieve per-transfer detail rows for the given year/month.\n\n' +
      'Each row includes the original booking code, transfer booking code, ' +
      'partner agency, original selling price, compensation amount, and net cost.\n\n' +
      'Excludes cancelled transfers.',
  })
  @ApiQuery({ name: 'year', required: true, type: Number, example: 2026 })
  @ApiQuery({ name: 'month', required: true, type: Number, example: 5 })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated transfer list retrieved successfully',
    type: PaginatedCarTransfersResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid query parameters' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getCarTransfers(
    @Query(CarTransferQueryPipe) query: CarTransferQueryDto,
  ): Promise<PaginatedCarTransfers> {
    this.logger.info(
      `[CarProfitController] GET /profit/car-transfers?year=${query.year}&month=${query.month}&page=${query.page}&limit=${query.limit}`,
    );

    return this.carProfitService.getCarTransfers(
      query.year,
      query.month,
      query.page,
      query.limit,
    );
  }
}
```

- [ ] **Step 2: Run the full profit module test suite**

```bash
npx jest src/modules/profit --no-coverage
```

Expected: All tests PASS.

- [ ] **Step 3: Commit**

```bash
git add src/modules/profit/controllers/car-profit.controller.ts
git commit -m "feat: add GET /profit/car-transfers paginated endpoint"
```

---

## Task 9: Build verification

- [ ] **Step 1: Run TypeScript build**

```bash
cd /Users/minhnn/Documents/workspaces/my-project/huetransfers-be
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 2: Run the full test suite**

```bash
npx jest --no-coverage
```

Expected: All tests PASS (no regressions).

- [ ] **Step 3: Commit if any lint/type fixes were needed**

Only commit if step 1 or 2 required fixes:

```bash
git add -p
git commit -m "fix: resolve type errors from transfers array removal"
```
