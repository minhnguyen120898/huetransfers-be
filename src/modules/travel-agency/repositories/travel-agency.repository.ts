import { Injectable } from '@nestjs/common';
import { TravelAgency, Prisma } from 'generated/prisma';
import { PrismaService } from '../../common/provider/prisma.provider';
import { TravelAgencyEntity } from '../entities/travel-agency.entity';
import { ITravelAgencyRepository } from './travel-agency.repository.interface';
import { PaginatedResultDTO } from '../../common/models/pagination.model';
import { TravelAgencyQueryInput } from '../models';

/**
 * TravelAgency Repository Implementation
 * Handles all database operations for travel agencies using Prisma ORM
 */
@Injectable()
export class TravelAgencyRepository implements ITravelAgencyRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new travel agency
   */
  async create(data: {
    name: string;
    tel?: string;
    address?: string;
    note?: string;
    createdById?: string;
    updatedById?: string;
  }): Promise<TravelAgencyEntity> {
    const travelAgency = await this.prisma.travelAgency.create({
      data: {
        name: data.name,
        tel: data.tel || null,
        address: data.address || null,
        note: data.note || null,
        createdById: data.createdById || null,
        updatedById: data.updatedById || null,
      },
    });

    return this.mapToEntity(travelAgency);
  }

  /**
   * Find travel agency by ID
   */
  async findById(id: string): Promise<TravelAgencyEntity | null> {
    const travelAgency = await this.prisma.travelAgency.findUnique({
      where: { id },
    });

    return travelAgency ? this.mapToEntity(travelAgency) : null;
  }

  /**
   * Find travel agency by name (exact match)
   */
  async findByName(name: string): Promise<TravelAgencyEntity | null> {
    const travelAgency = await this.prisma.travelAgency.findFirst({
      where: { name },
    });

    return travelAgency ? this.mapToEntity(travelAgency) : null;
  }

  /**
   * Find many travel agencies with pagination and filters
   */
  async findMany(
    query: TravelAgencyQueryInput,
  ): Promise<PaginatedResultDTO<TravelAgencyEntity>> {
    const { page = 1, limit = 10, search, isActive } = query;
    const skip = (page - 1) * limit;

    // Build where clause with filters
    const where: Prisma.TravelAgencyWhereInput = {};

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    // Execute queries in parallel for better performance
    const [travelAgencies, total] = await Promise.all([
      this.prisma.travelAgency.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { isActive: 'desc' }, // Active agencies first
          { createdAt: 'desc' }, // Then newest first
        ],
      }),
      this.prisma.travelAgency.count({ where }),
    ]);

    return {
      data: travelAgencies.map((agency) => this.mapToEntity(agency)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Update travel agency
   */
  async update(
    id: string,
    data: Partial<TravelAgencyEntity>,
  ): Promise<TravelAgencyEntity> {
    const travelAgency = await this.prisma.travelAgency.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.tel !== undefined && { tel: data.tel }),
        ...(data.address !== undefined && { address: data.address }),
        ...(data.note !== undefined && { note: data.note }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
        ...(data.updatedById && { updatedById: data.updatedById }),
      },
    });

    return this.mapToEntity(travelAgency);
  }

  /**
   * Soft delete travel agency (set isActive = false)
   */
  async softDelete(id: string): Promise<TravelAgencyEntity> {
    const travelAgency = await this.prisma.travelAgency.update({
      where: { id },
      data: { isActive: false },
    });

    return this.mapToEntity(travelAgency);
  }

  /**
   * Map Prisma TravelAgency model to TravelAgencyEntity
   * @private
   */
  private mapToEntity(prismaTravelAgency: TravelAgency): TravelAgencyEntity {
    const entity = new TravelAgencyEntity();
    entity.id = prismaTravelAgency.id;
    entity.name = prismaTravelAgency.name;
    entity.tel = prismaTravelAgency.tel;
    entity.address = prismaTravelAgency.address;
    entity.note = prismaTravelAgency.note;
    entity.isActive = prismaTravelAgency.isActive;
    entity.createdAt = prismaTravelAgency.createdAt;
    entity.updatedAt = prismaTravelAgency.updatedAt;
    entity.createdById = prismaTravelAgency.createdById;
    entity.updatedById = prismaTravelAgency.updatedById;
    return entity;
  }
}
