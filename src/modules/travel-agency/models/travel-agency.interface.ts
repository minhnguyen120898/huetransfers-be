import { PaginationQueryDTO } from '../../common/models/pagination.model';

/**
 * Input interface for creating a travel agency
 */
export interface TravelAgencyInput {
  name: string;
  tel?: string;
  address?: string;
  note?: string;
}

/**
 * Input interface for updating a travel agency
 */
export interface TravelAgencyUpdateInput {
  name?: string;
  tel?: string;
  address?: string;
  note?: string;
  isActive?: boolean;
}

/**
 * Query input interface for listing travel agencies with filters
 */
export interface TravelAgencyQueryInput extends PaginationQueryDTO {
  search?: string;
  isActive?: boolean;
}
