import { useFilters } from '@/hooks/useFilters';
import { act, renderHook } from '@testing-library/react';

describe('useFilters Hook', () => {
  it('initializes with default filter values', () => {
    const { result } = renderHook(() => useFilters());

    expect(result.current.filters.pageNumber).toBe(1);
    expect(result.current.filters.pageSize).toBe(10);
    expect(result.current.filters.name).toBe('');
    expect(result.current.filters.address).toBe('');
    expect(result.current.filters.minPrice).toBeUndefined();
    expect(result.current.filters.maxPrice).toBeUndefined();
  });

  it('updates filter name', () => {
    const { result } = renderHook(() => useFilters());

    act(() => {
      result.current.updateFilter('name', 'Luxury Apartment');
    });

    expect(result.current.filters.name).toBe('Luxury Apartment');
  });

  it('updates filter address', () => {
    const { result } = renderHook(() => useFilters());

    act(() => {
      result.current.updateFilter('address', 'New York');
    });

    expect(result.current.filters.address).toBe('New York');
  });

  it('updates filter minPrice', () => {
    const { result } = renderHook(() => useFilters());

    act(() => {
      result.current.updateFilter('minPrice', 100000);
    });

    expect(result.current.filters.minPrice).toBe(100000);
  });

  it('updates filter maxPrice', () => {
    const { result } = renderHook(() => useFilters());

    act(() => {
      result.current.updateFilter('maxPrice', 500000);
    });

    expect(result.current.filters.maxPrice).toBe(500000);
  });

  it('updates page number', () => {
    const { result } = renderHook(() => useFilters());

    act(() => {
      result.current.setPageNumber(3);
    });

    expect(result.current.filters.pageNumber).toBe(3);
  });

  it('updates page size', () => {
    const { result } = renderHook(() => useFilters());

    act(() => {
      result.current.setPageSize(20);
    });

    expect(result.current.filters.pageSize).toBe(20);
  });

  it('resets all filters to default values', () => {
    const { result } = renderHook(() => useFilters());

    act(() => {
      result.current.updateFilter('name', 'Test Property');
      result.current.updateFilter('address', 'Test Address');
      result.current.updateFilter('minPrice', 100000);
      result.current.updateFilter('maxPrice', 500000);
    });

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.filters).toEqual({
      pageNumber: 1,
      pageSize: 10,
      name: '',
      address: '',
      minPrice: undefined,
      maxPrice: undefined,
    });
  });

  it('resets page number when filter value updates', () => {
    const { result } = renderHook(() => useFilters());

    act(() => {
      result.current.setPageNumber(5);
    });
    expect(result.current.filters.pageNumber).toBe(5);

    act(() => {
      result.current.updateFilter('name', 'Test');
    });
    // updateFilter resets pageNumber to 1
    expect(result.current.filters.pageNumber).toBe(1);
  });

  it('allows setting price range', () => {
    const { result } = renderHook(() => useFilters());

    act(() => {
      result.current.updateFilter('minPrice', 300000);
      result.current.updateFilter('maxPrice', 800000);
    });

    expect(result.current.filters.minPrice).toBe(300000);
    expect(result.current.filters.maxPrice).toBe(800000);
  });

  it('handles undefined values for optional filters', () => {
    const { result } = renderHook(() => useFilters());

    act(() => {
      result.current.updateFilter('minPrice', 100000);
    });

    expect(result.current.filters.minPrice).toBe(100000);

    act(() => {
      result.current.updateFilter('minPrice', undefined);
    });

    expect(result.current.filters.minPrice).toBeUndefined();
  });

  it('allows clearing individual filter values', () => {
    const { result } = renderHook(() => useFilters());

    act(() => {
      result.current.updateFilter('name', 'Property');
    });
    expect(result.current.filters.name).toBe('Property');

    act(() => {
      result.current.updateFilter('name', '');
    });

    expect(result.current.filters.name).toBe('');
  });
});
