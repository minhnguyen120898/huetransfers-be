export interface PaginationMetaDTO {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResultDTO<T> {
  data: T[];
  meta: PaginationMetaDTO;
}

export interface PaginationQueryDTO {
  page?: number;
  limit?: number;
}
