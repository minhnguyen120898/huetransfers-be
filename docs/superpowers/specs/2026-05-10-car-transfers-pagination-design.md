# Design: Car Transfers Pagination — Separate Endpoint

**Date:** 2026-05-10
**Status:** Approved

## Problem

`GET /profit/car-summary` embeds the full `transfers` array inside `transferFinancials`. As monthly transfer volume grows, this inflates the payload and slows the summary response — all row data is fetched even when only totals are needed.

## Solution

Split the concern into two endpoints:

1. `GET /profit/car-summary` — returns aggregated totals only (no transfers array)
2. `GET /profit/car-transfers` — returns paginated transfer detail rows

Approach: **Service-layer split** — add `getCarTransfers(year, month, page, limit)` to `CarProfitService`; replace the summary's `findMany` with `count` + `aggregate`. No new modules, no cross-module dependencies.

## API

### Modified: `GET /profit/car-summary?year=&month=`

`transferFinancials` drops the `transfers` array, keeps totals only:

```json
"transferFinancials": {
  "transferCount": 3,
  "totalOriginalSellingPrice": "15000000",
  "totalCompensationAmount": "16500000",
  "netTransferCost": "1500000"
}
```

### New: `GET /profit/car-transfers?year=&month=&page=&limit=`

**Query params:**

| Param | Required | Default | Constraints |
|-------|----------|---------|-------------|
| year  | yes      | —       | integer     |
| month | yes      | —       | 1–12        |
| page  | no       | 1       | ≥ 1         |
| limit | no       | 10      | 1–100       |

**Response:**

```json
{
  "data": [
    {
      "originalBookingCode": "CB-20260501-XXXX",
      "transferBookingCode": "CB-20260501-XXXX-T",
      "partnerAgencyName": "STours",
      "originalSellingPrice": "5000000",
      "compensationAmount": "5500000",
      "netCost": "500000"
    }
  ],
  "meta": {
    "total": 25,
    "page": 1,
    "limit": 10
  }
}
```

**Auth:** `JwtAuthGuard` (same as `car-summary`)
**Order:** `serviceDate ASC`
**Filter:** `isTransfer: true`, `status NOT IN ['cancelled']`, `serviceDate` within month

## Data Layer

### `getCarMonthlyProfitSummary` (modified)

Prisma cannot aggregate over a relation (`transferFrom.sellingPrice`) directly. The summary still uses `findMany` but with a minimal select — only the two price fields needed for totals, no booking codes or agency names:

```
findMany(where: isTransfer=true, status notIn cancelled, serviceDate in month,
  select: { sellingPrice, transferFrom: { select: { sellingPrice } } }
)
```

Totals are derived in-memory via reduce (same as today), but the payload fetched from DB is much smaller because no string fields (codes, names) are included. `transferCount = results.length`.

`netTransferCost = totalCompensationAmount - totalOriginalSellingPrice`

The `transfers` detail array is no longer built or returned from this method.

### `getCarTransfers` (new method)

```typescript
getCarTransfers(
  year: number,
  month: number,
  page: number,
  limit: number,
): Promise<PaginatedCarTransfers>
```

Runs `findMany` with:
- Same `where` as the old summary query
- `skip: (page - 1) * limit`, `take: limit`
- `orderBy: { serviceDate: 'asc' }`
- Returns `{ data: CarTransferDetail[], meta: { total, page, limit } }`

`total` is obtained via a separate `count` call (same `where`, no `skip/take`).

## Files

### Modified

| File | Change |
|------|--------|
| `src/modules/profit/services/car-profit.service.ts` | Replace `findMany` with `count`+`aggregate`; add `getCarTransfers` |
| `src/modules/profit/controllers/car-profit.controller.ts` | Add `GET /profit/car-transfers` route |
| `src/modules/profit/interfaces/car-profit.interface.ts` | Remove `transfers` from `CarTransferFinancials`; add `PaginatedCarTransfers` |
| `src/modules/profit/dto/car-profit-summary-response.dto.ts` | Remove `transfers` array from `CarTransferFinancialsDto` |

### Created

| File | Purpose |
|------|---------|
| `src/modules/profit/dto/car-transfer-query.dto.ts` | DTO: `year`, `month`, `page`, `limit` |
| `src/modules/profit/dto/car-transfer-response.dto.ts` | Paginated response DTO: `data[]` + `meta` |
| `src/modules/profit/pipes/car-transfer-query.pipe.ts` | Validates + coerces query params; sets defaults |

## Error Handling

- Invalid `year`/`month` → 400 Bad Request (same as `car-summary`)
- `page` or `limit` out of range → 400 Bad Request
- `limit > 100` → coerced to 100 (not rejected)

## Testing

- Unit: `CarProfitService.getCarTransfers` — pagination math, empty month, boundary page
- Unit: `getCarMonthlyProfitSummary` — verify `transfers` no longer in response, totals still correct
- Integration: `GET /profit/car-transfers` — correct pagination headers, auth guard enforced
