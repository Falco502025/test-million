import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '@/constants/filterConfig';
import { FilterParams } from '@/types/API';
import { useCallback, useState } from 'react';

export const useFilters = () => {
  const [filters, setFilters] = useState<FilterParams>({
    name: '',
    address: '',
    minPrice: undefined,
    maxPrice: undefined,
    pageNumber: DEFAULT_PAGE_NUMBER,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const updateFilter = useCallback((key: keyof FilterParams, value: string | number | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      pageNumber: DEFAULT_PAGE_NUMBER, // Reset to page 1 when filters change
    }));
  }, []);

  const setPageNumber = useCallback((pageNumber: number) => {
    setFilters((prev) => ({ ...prev, pageNumber }));
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    setFilters((prev) => ({ ...prev, pageSize, pageNumber: DEFAULT_PAGE_NUMBER }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      name: '',
      address: '',
      minPrice: undefined,
      maxPrice: undefined,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: DEFAULT_PAGE_SIZE,
    });
  }, []);

  return {
    filters,
    updateFilter,
    setPageNumber,
    setPageSize,
    resetFilters,
  };
};
