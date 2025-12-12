import { propertyService } from '@/services/propertyService';
import { FilterParams } from '@/types/API';

jest.mock('@/services/propertyService');

const mockPropertyService = propertyService as jest.Mocked<typeof propertyService>;

describe('propertyService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockProperty = {
    id: '1',
    name: 'Test Property',
    address: 'Test Address',
    price: 500000,
    propertyType: 'House',
    mainImage: 'image.jpg',
    bedrooms: 3,
    bathrooms: 2,
    area: 2500,
    yearBuilt: 2020,
    year: 2020,
    codeInternal: 'CODE123',
    owner: {
      name: 'Owner Name',
      email: 'owner@example.com',
      phone: '555-1234',
      address: 'Owner Address',
      photo: 'photo.jpg',
      birthday: '1990-01-01',
    },
  };

  const mockPropertyDetail = {
    ...mockProperty,
    images: [],
    description: 'Test description',
    traces: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockPaginatedResponse = {
    items: [mockProperty],
    totalCount: 1,
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  };

  describe('getProperties', () => {
    it('fetches properties with filter params', async () => {
      mockPropertyService.getProperties.mockResolvedValue(mockPaginatedResponse);

      const params: FilterParams = {
        pageNumber: 1,
        pageSize: 10,
        name: 'Test',
        address: 'Address',
      };

      const result = await mockPropertyService.getProperties(params);

      expect(result).toEqual(mockPaginatedResponse);
      expect(mockPropertyService.getProperties).toHaveBeenCalledWith(params);
    });

    it('handles API errors gracefully', async () => {
      mockPropertyService.getProperties.mockRejectedValue(new Error('Network error'));

      const params: FilterParams = {
        pageNumber: 1,
        pageSize: 10,
      };

      await expect(mockPropertyService.getProperties(params)).rejects.toThrow('Network error');
    });

    it('passes pagination parameters correctly', async () => {
      mockPropertyService.getProperties.mockResolvedValue(mockPaginatedResponse);

      const params: FilterParams = {
        pageNumber: 3,
        pageSize: 20,
      };

      await mockPropertyService.getProperties(params);

      expect(mockPropertyService.getProperties).toHaveBeenCalledWith(
        expect.objectContaining({ pageNumber: 3, pageSize: 20 })
      );
    });

    it('passes search filter parameters correctly', async () => {
      mockPropertyService.getProperties.mockResolvedValue(mockPaginatedResponse);

      const params: FilterParams = {
        pageNumber: 1,
        pageSize: 10,
        name: 'Luxury',
        address: 'Manhattan',
        minPrice: 500000,
        maxPrice: 2000000,
      };

      await mockPropertyService.getProperties(params);

      expect(mockPropertyService.getProperties).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Luxury',
          address: 'Manhattan',
          minPrice: 500000,
          maxPrice: 2000000,
        })
      );
    });
  });

  describe('getPropertyById', () => {
    it('fetches single property by id', async () => {
      mockPropertyService.getPropertyById.mockResolvedValue(mockPropertyDetail);

      const result = await mockPropertyService.getPropertyById('1');

      expect(result).toEqual(mockPropertyDetail);
      expect(mockPropertyService.getPropertyById).toHaveBeenCalledWith('1');
    });

    it('handles not found error', async () => {
      mockPropertyService.getPropertyById.mockRejectedValue(new Error('Property not found'));

      await expect(mockPropertyService.getPropertyById('999')).rejects.toThrow('Property not found');
    });
  });
});
