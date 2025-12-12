export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const ENDPOINTS = {
  PROPERTIES: `${API_BASE_URL}/properties`,
  PROPERTY_DETAIL: (id: string) => `${API_BASE_URL}/properties/${id}`,
};
