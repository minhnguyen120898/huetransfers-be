import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ExpenseService } from '../service/expense.service';
import { ExpenseRepository } from '../repositories/expense.repository';
import { LoggerService } from '../../common/provider/logger.service';
import { ExpenseCategory } from 'generated/prisma';
import { Decimal } from '@prisma/client/runtime/library';
import { ExpenseEntity } from '../entities/expense.entity';

const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

const mockRepository = {
  create: jest.fn(),
  findById: jest.fn(),
  findMany: jest.fn(),
  update: jest.fn(),
  softDelete: jest.fn(),
  getSummaryByMonth: jest.fn(),
};

function makeEntity(overrides: Partial<ExpenseEntity> = {}): ExpenseEntity {
  const entity = new ExpenseEntity();
  entity.id = 'expense-uuid-1';
  entity.title = 'Gasoline refill';
  entity.amount = new Decimal(500000);
  entity.category = ExpenseCategory.gasoline;
  entity.month = 3;
  entity.year = 2026;
  entity.note = null;
  entity.isActive = true;
  entity.createdAt = new Date('2026-03-01');
  entity.updatedAt = new Date('2026-03-01');
  entity.createdById = 'user-1';
  entity.updatedById = 'user-1';
  return Object.assign(entity, overrides);
}

describe('ExpenseService', () => {
  let service: ExpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseService,
        { provide: ExpenseRepository, useValue: mockRepository },
        { provide: LoggerService, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
    jest.clearAllMocks();
  });

  // ============================================================
  // create()
  // ============================================================
  describe('create()', () => {
    it('creates expense and returns response DTO', async () => {
      const entity = makeEntity();
      mockRepository.create.mockResolvedValue(entity);

      const result = await service.create(
        {
          title: 'Gasoline refill',
          amount: 500000,
          category: ExpenseCategory.gasoline,
          month: 3,
          year: 2026,
        },
        'user-1',
      );

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Gasoline refill',
          amount: 500000,
          category: ExpenseCategory.gasoline,
          month: 3,
          year: 2026,
          createdById: 'user-1',
          updatedById: 'user-1',
        }),
      );
      expect(result.id).toBe('expense-uuid-1');
      expect(result.amount).toBe(500000);
      expect(result.category).toBe(ExpenseCategory.gasoline);
    });
  });

  // ============================================================
  // findById()
  // ============================================================
  describe('findById()', () => {
    it('returns expense when found and active', async () => {
      mockRepository.findById.mockResolvedValue(makeEntity());
      const result = await service.findById('expense-uuid-1');
      expect(result.id).toBe('expense-uuid-1');
    });

    it('throws NotFoundException when not found', async () => {
      mockRepository.findById.mockResolvedValue(null);
      await expect(service.findById('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws NotFoundException when expense is soft-deleted', async () => {
      mockRepository.findById.mockResolvedValue(
        makeEntity({ isActive: false }),
      );
      await expect(service.findById('expense-uuid-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ============================================================
  // update()
  // ============================================================
  describe('update()', () => {
    it('updates expense and returns updated response', async () => {
      const existing = makeEntity();
      const updated = makeEntity({
        title: 'Updated title',
        amount: new Decimal(600000),
      });
      mockRepository.findById.mockResolvedValue(existing);
      mockRepository.update.mockResolvedValue(updated);

      const result = await service.update(
        'expense-uuid-1',
        { title: 'Updated title', amount: 600000 },
        'user-1',
      );

      expect(result.title).toBe('Updated title');
      expect(result.amount).toBe(600000);
    });

    it('throws NotFoundException when expense not found on update', async () => {
      mockRepository.findById.mockResolvedValue(null);
      await expect(
        service.update('nonexistent', { title: 'x' }, 'user-1'),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws NotFoundException when expense is soft-deleted on update', async () => {
      mockRepository.findById.mockResolvedValue(
        makeEntity({ isActive: false }),
      );
      await expect(
        service.update('expense-uuid-1', { title: 'x' }, 'user-1'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // ============================================================
  // remove()
  // ============================================================
  describe('remove()', () => {
    it('calls softDelete and logs', async () => {
      mockRepository.findById.mockResolvedValue(makeEntity());
      mockRepository.softDelete.mockResolvedValue(undefined);

      await service.remove('expense-uuid-1', 'user-1');

      expect(mockRepository.softDelete).toHaveBeenCalledWith(
        'expense-uuid-1',
        'user-1',
      );
    });

    it('throws NotFoundException when expense not found on delete', async () => {
      mockRepository.findById.mockResolvedValue(null);
      await expect(service.remove('nonexistent', 'user-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ============================================================
  // getSummaryByMonth()
  // ============================================================
  describe('getSummaryByMonth()', () => {
    it('returns correctly structured summary', async () => {
      mockRepository.getSummaryByMonth.mockResolvedValue({
        totalAmount: 7000000,
        byCategory: {
          gasoline: 2000000,
          maintenance: 1500000,
          insurance: 3000000,
          other: 500000,
        },
        expenseCount: 12,
        year: 2026,
        month: 3,
      });

      const result = await service.getSummaryByMonth(2026, 3);

      expect(result.totalAmount).toBe(7000000);
      expect(result.byCategory.gasoline).toBe(2000000);
      expect(result.byCategory.maintenance).toBe(1500000);
      expect(result.byCategory.insurance).toBe(3000000);
      expect(result.byCategory.other).toBe(500000);
      expect(result.expenseCount).toBe(12);
      expect(result.year).toBe(2026);
      expect(result.month).toBe(3);
    });

    it('returns zero amounts when no expenses exist', async () => {
      mockRepository.getSummaryByMonth.mockResolvedValue({
        totalAmount: 0,
        byCategory: { gasoline: 0, maintenance: 0, insurance: 0, other: 0 },
        expenseCount: 0,
        year: 2026,
        month: 1,
      });

      const result = await service.getSummaryByMonth(2026, 1);

      expect(result.totalAmount).toBe(0);
      expect(result.expenseCount).toBe(0);
    });
  });

  // ============================================================
  // findMany()
  // ============================================================
  describe('findMany()', () => {
    it('returns paginated results mapped to response DTOs', async () => {
      mockRepository.findMany.mockResolvedValue({
        data: [
          makeEntity(),
          makeEntity({
            id: 'expense-uuid-2',
            category: ExpenseCategory.maintenance,
          }),
        ],
        meta: { page: 1, limit: 10, total: 2, totalPages: 1 },
      });

      const result = await service.findMany({ page: 1, limit: 10 });

      expect(result.data).toHaveLength(2);
      expect(result.meta.total).toBe(2);
      expect(result.data[0].amount).toBe(500000); // Decimal → number conversion
    });
  });
});
