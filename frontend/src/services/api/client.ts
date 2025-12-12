import { API_BASE_URL } from '@/constants/apiConfig';
import { ApiError } from '@/types/API';
import axios, { AxiosError, AxiosInstance } from 'axios';

const client: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000, // 120 seconds timeout for API responses (2 minutes)
});

// Response interceptor for error handling
client.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      // API returned an error response
      const apiError: ApiError = error.response.data || {
        code: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred',
        timestamp: new Date().toISOString(),
      };
      const err = new Error(apiError.message);
      Object.assign(err, apiError);
      return Promise.reject(err);
    } else if (error.request) {
      // No response received
      const apiError: ApiError = {
        code: 'NETWORK_ERROR',
        message: 'Network error. Please check your connection.',
        timestamp: new Date().toISOString(),
      };
      const err = new Error(apiError.message);
      Object.assign(err, apiError);
      return Promise.reject(err);
    }
    // Other errors
    const apiError: ApiError = {
      code: 'ERROR',
      message: error.message || 'An unexpected error occurred',
      timestamp: new Date().toISOString(),
    };
    const err = new Error(apiError.message);
    Object.assign(err, apiError);
    return Promise.reject(err);
  }
);

export default client;
