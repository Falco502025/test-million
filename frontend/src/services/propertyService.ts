import { ENDPOINTS } from '@/constants/apiConfig';
import { FilterParams, PaginatedResponse } from '@/types/API';
import { Property, PropertyDetail } from '@/types/Property';
import client from './api/client';

export const propertyService = {
  async getProperties(filters: FilterParams): Promise<PaginatedResponse<Property>> {
    try {
      const params = new URLSearchParams();
      if (filters.name) params.append('name', filters.name);
      if (filters.address) params.append('address', filters.address);
      if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
      params.append('pageNumber', filters.pageNumber.toString());
      params.append('pageSize', filters.pageSize.toString());

      const url = `${ENDPOINTS.PROPERTIES}?${params.toString()}`;
      console.log('Fetching properties from:', url);
      
      const response = await client.get<PaginatedResponse<Property>>(url);
      
      console.log('Properties response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  },

  async getPropertyById(id: string): Promise<PropertyDetail> {
    try {
      const url = ENDPOINTS.PROPERTY_DETAIL(id);
      console.log('Fetching property detail from:', url);
      
      const response = await client.get<PropertyDetail>(url);
      
      console.log('Property detail response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching property detail:', error);
      throw error;
    }
  },
};
