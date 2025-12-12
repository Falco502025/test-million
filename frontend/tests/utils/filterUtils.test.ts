import { Property } from '@/types/Property';
import { filterProperties } from '@/utils/filterUtils';

const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Luxury Mansion',
    address: '100 Park Avenue, New York, NY 10016',
    price: 2000000,
    propertyType: 'House',
    mainImage: '/mansion.jpg',
    bedrooms: 4,
    bathrooms: 3,
    area: 5000,
    codeInternal: 'LM001',
    year: 2020,
    owner: {
      name: 'Rich Owner',
      email: 'rich@example.com',
      phone: '555-0001',
      address: 'Penthouse, NY',
      photo: '/rich.jpg',
      birthday: '1970-01-01',
    },
  },
  {
    id: '2',
    name: 'Modern Apartment',
    address: '500 5th Avenue, New York, NY 10110',
    price: 750000,
    propertyType: 'Apartment',
    mainImage: '/apartment.jpg',
    bedrooms: 2,
    bathrooms: 1,
    area: 1500,
    codeInternal: 'MA002',
    year: 2022,
    owner: {
      name: 'City Dweller',
      email: 'dweller@example.com',
      phone: '555-0002',
      address: 'Manhattan, NY',
      photo: '/dweller.jpg',
      birthday: '1975-01-01',
    },
  },
  {
    id: '3',
    name: 'Cozy Cottage',
    address: '200 Farm Road, Upstate, NY 12234',
    price: 250000,
    propertyType: 'House',
    mainImage: '/cottage.jpg',
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    codeInternal: 'CC003',
    year: 2010,
    owner: {
      name: 'Rural Settler',
      email: 'settler@example.com',
      phone: '555-0003',
      address: 'Upstate NY',
      photo: '/settler.jpg',
      birthday: '1980-01-01',
    },
  },
];

describe('filterUtils - filterProperties function', () => {
  it('returns all properties when no filter is applied', () => {
    const result = filterProperties(mockProperties);
    expect(result).toEqual(mockProperties);
  });

  it('filters properties by name', () => {
    const result = filterProperties(mockProperties, { name: 'Apartment' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Modern Apartment');
  });

  it('filters properties by name case-insensitively', () => {
    const result = filterProperties(mockProperties, { name: 'apartment' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Modern Apartment');
  });

  it('filters properties by address', () => {
    const result = filterProperties(mockProperties, { address: 'Park Avenue' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Luxury Mansion');
  });

  it('filters properties by address case-insensitively', () => {
    const result = filterProperties(mockProperties, { address: 'new york' });
    expect(result).toHaveLength(2);
  });

  it('filters properties by minimum price', () => {
    const result = filterProperties(mockProperties, { minPrice: 500000 });
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.price >= 500000)).toBe(true);
  });

  it('filters properties by maximum price', () => {
    const result = filterProperties(mockProperties, { maxPrice: 750000 });
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.price <= 750000)).toBe(true);
  });

  it('filters properties by price range', () => {
    const result = filterProperties(mockProperties, {
      minPrice: 400000,
      maxPrice: 900000,
    });
    expect(result).toHaveLength(1);
    expect(result[0].price).toBe(750000);
  });

  it('applies multiple filters together', () => {
    const result = filterProperties(mockProperties, {
      name: 'Apartment',
      maxPrice: 1000000,
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Modern Apartment');
  });

  it('returns empty array when no properties match filter', () => {
    const result = filterProperties(mockProperties, { name: 'NonExistent' });
    expect(result).toHaveLength(0);
  });

  it('handles empty property list', () => {
    const result = filterProperties([], { name: 'test' });
    expect(result).toHaveLength(0);
  });

  it('handles undefined filter parameters gracefully', () => {
    const result = filterProperties(mockProperties, {
      name: undefined,
      address: undefined,
    });
    expect(result).toEqual(mockProperties);
  });

  it('handles empty string filter parameters', () => {
    const result = filterProperties(mockProperties, {
      name: '',
      address: '',
    });
    expect(result).toEqual(mockProperties);
  });

  it('combines name and address filters with AND logic', () => {
    const result = filterProperties(mockProperties, {
      name: 'Apartment',
      address: 'New York',
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Modern Apartment');
  });

  it('handles price filter with zero values', () => {
    const result = filterProperties(mockProperties, { minPrice: 0 });
    expect(result).toEqual(mockProperties);
  });

  it('preserves property order in results', () => {
    const result = filterProperties(mockProperties, { minPrice: 250000 });
    expect(result.map((p) => p.id)).toEqual(['1', '2', '3']);
  });
});
