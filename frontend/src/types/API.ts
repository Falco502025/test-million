export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface FilterParams {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
  pageNumber: number;
  pageSize: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]> | string;
  timestamp: string;
}
