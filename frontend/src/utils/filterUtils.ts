import { Property } from '@/types/Property';

export interface FilterOptions {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
}

export function filterProperties(properties: Property[], filters?: FilterOptions): Property[] {
  if (!filters) {
    return properties;
  }

  return properties.filter((property) => 
    filterByName(property, filters) && 
    filterByAddress(property, filters) && 
    filterByPrice(property, filters)
  );
}

function filterByName(property: Property, filters: FilterOptions): boolean {
  if (!filters.name || filters.name.trim() === '') {
    return true;
  }
  const nameLower = filters.name.toLowerCase();
  return property.name.toLowerCase().includes(nameLower);
}

function filterByAddress(property: Property, filters: FilterOptions): boolean {
  if (!filters.address || filters.address.trim() === '') {
    return true;
  }
  const addressLower = filters.address.toLowerCase();
  return property.address.toLowerCase().includes(addressLower);
}

function filterByPrice(property: Property, filters: FilterOptions): boolean {
  const { minPrice, maxPrice } = filters;
  
  if (minPrice !== undefined && minPrice > 0 && property.price < minPrice) {
    return false;
  }

  if (maxPrice !== undefined && maxPrice > 0 && property.price > maxPrice) {
    return false;
  }

  return true;
}
