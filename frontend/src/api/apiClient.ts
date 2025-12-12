import axios, { AxiosInstance } from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

/**
 * Create and configure the API client
 */
const apiClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor - add auth token if available
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor - handle common errors
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('authToken');
      globalThis.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export { apiClient };
