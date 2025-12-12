import { useProperties } from '@/hooks/useProperties';
import { propertyService } from '@/services/propertyService';
import { FilterParams } from '@/types/API';
import { act, renderHook, waitFor } from '@testing-library/react';

jest.mock('@/services/propertyService');

const mockPropertyService = propertyService as jest.Mocked<typeof propertyService>;

const mockFilterParams: FilterParams = {
  pageNumber: 1,
  pageSize: 10,
  name: '',
  address: '',
};

const mockPropertiesResponse = {
  items: [
    {
      id: '1',
      name: 'Beautiful House',
      address: '123 Main St',
      price: 500000,
      propertyType: 'House',
      mainImage: 'image.jpg',
      bedrooms: 3,
      bathrooms: 2,
      area: 2500,
      year: 2020,
      yearBuilt: 2020,
      codeInternal: 'CODE001',
      owner: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-1234',
        address: 'Owner Address',
        photo: 'photo.jpg',
        birthday: '1990-01-01',
      },
      images: [],
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      propertyTrace: [],
    },
    {
      id: '2',
      name: 'Modern Apartment',
      address: '456 Oak Ave',
      price: 300000,
      propertyType: 'Apartment',
      mainImage: 'image2.jpg',
      bedrooms: 2,
      bathrooms: 1,
      area: 1500,
      year: 2022,
      yearBuilt: 2022,
      codeInternal: 'CODE002',
      owner: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '555-5678',
        address: 'Owner Address 2',
        photo: 'photo2.jpg',
        birthday: '1992-05-15',
      },
      images: [],
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      propertyTrace: [],
    },
  ],
  totalCount: 2,
  pageNumber: 1,
  pageSize: 10,
  totalPages: 1,
  hasPreviousPage: false,
  hasNextPage: false,
};

describe('useProperties Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with loading state', () => {
    mockPropertyService.getProperties.mockResolvedValue(mockPropertiesResponse);
    const { result } = renderHook(() => useProperties(mockFilterParams));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('fetches properties successfully', async () => {
    mockPropertyService.getProperties.mockResolvedValue(mockPropertiesResponse);
    const { result } = renderHook(() => useProperties(mockFilterParams));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockPropertiesResponse);
    expect(result.current.error).toBeNull();
  });

  it('calls propertyService with correct filter parameters', async () => {
    mockPropertyService.getProperties.mockResolvedValue(mockPropertiesResponse);
    renderHook(() => useProperties(mockFilterParams));

    await waitFor(() => {
      expect(mockPropertyService.getProperties).toHaveBeenCalledWith(mockFilterParams);
    });
  });

  it('handles error when fetching properties', async () => {
    const mockError = new Error('Failed to fetch');
    mockPropertyService.getProperties.mockRejectedValue(mockError);

    const { result } = renderHook(() => useProperties(mockFilterParams));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeDefined();
  });

  it('refetches properties when filter parameters change', async () => {
    mockPropertyService.getProperties.mockResolvedValue(mockPropertiesResponse);

    const { rerender } = renderHook(
      ({ filters }) => useProperties(filters),
      { initialProps: { filters: mockFilterParams } }
    );

    await waitFor(() => {
      expect(mockPropertyService.getProperties).toHaveBeenCalledTimes(1);
    });

    const newFilters: FilterParams = {
      ...mockFilterParams,
      pageNumber: 2,
    };

    act(() => {
      rerender({ filters: newFilters });
    });

    await waitFor(() => {
      expect(mockPropertyService.getProperties).toHaveBeenCalledTimes(2);
      expect(mockPropertyService.getProperties).toHaveBeenLastCalledWith(newFilters);
    });
  });

  it('returns correct data structure', async () => {
    mockPropertyService.getProperties.mockResolvedValue(mockPropertiesResponse);
    const { result } = renderHook(() => useProperties(mockFilterParams));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockPropertiesResponse);
    expect(result.current.data).toHaveProperty('items');
    expect(result.current.data).toHaveProperty('totalCount');
    expect(result.current.data?.items).toHaveLength(2);
  });

  it('handles filter with search parameters', async () => {
    mockPropertyService.getProperties.mockResolvedValue(mockPropertiesResponse);

    const filterWithSearch: FilterParams = {
      ...mockFilterParams,
      name: 'Beautiful',
      address: 'Main',
    };

    renderHook(() => useProperties(filterWithSearch));

    await waitFor(() => {
      expect(mockPropertyService.getProperties).toHaveBeenCalledWith(filterWithSearch);
    });
  });

  it('handles filter with price range', async () => {
    mockPropertyService.getProperties.mockResolvedValue(mockPropertiesResponse);

    const filterWithPrice: FilterParams = {
      ...mockFilterParams,
      minPrice: 250000,
      maxPrice: 600000,
    };

    renderHook(() => useProperties(filterWithPrice));

    await waitFor(() => {
      expect(mockPropertyService.getProperties).toHaveBeenCalledWith(filterWithPrice);
    });
  });

  it('clears previous data when refetching', async () => {
    const firstResponse = {
      ...mockPropertiesResponse,
      items: [mockPropertiesResponse.items[0]],
    };

    mockPropertyService.getProperties.mockResolvedValueOnce(firstResponse);

    const { result, rerender } = renderHook(
      ({ filters }) => useProperties(filters),
      { initialProps: { filters: mockFilterParams } }
    );

    await waitFor(() => {
      expect(result.current.data?.items).toHaveLength(1);
    });

    mockPropertyService.getProperties.mockResolvedValueOnce(mockPropertiesResponse);

    const newFilters: FilterParams = {
      ...mockFilterParams,
      pageNumber: 2,
    };

    act(() => {
      rerender({ filters: newFilters });
    });

    await waitFor(() => {
      expect(result.current.data?.items).toHaveLength(2);
    });
  });
});
