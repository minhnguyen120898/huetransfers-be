import { TravelAgencyEntity } from '../entities/travel-agency.entity';
import { PaginatedResultDTO } from '../../common/models/pagination.model';
import { TravelAgencyQueryInput } from '../models';

/**
 * Interface contract for TravelAgency repository operations
 * Defines all data access methods for travel agencies
 */
export interface ITravelAgencyRepository {
  /**
   * Create a new travel agency
   */
  create(data: {
    name: string;
    tel?: string;
    address?: string;
    note?: string;
    createdById?: string;
    updatedById?: string;
  }): Promise<TravelAgencyEntity>;

  /**
   * Find travel agency by ID
   */
  findById(id: string): Promise<TravelAgencyEntity | null>;

  /**
   * Find travel agency by name (exact match)
   */
  findByName(name: string): Promise<TravelAgencyEntity | null>;

  /**
   * Find many travel agencies with pagination and filters
   */
  findMany(
    query: TravelAgencyQueryInput,
  ): Promise<PaginatedResultDTO<TravelAgencyEntity>>;

  /**
   * Update travel agency
   */
  update(
    id: string,
    data: Partial<TravelAgencyEntity>,
  ): Promise<TravelAgencyEntity>;

  /**
   * Soft delete travel agency (set isActive = false)
   */
  softDelete(id: string): Promise<TravelAgencyEntity>;
}
