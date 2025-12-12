import { apiClient } from '@/api/apiClient';

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('HTTP Methods', () => {
    it('has a get method', () => {
      expect(apiClient.get).toBeDefined();
      expect(typeof apiClient.get).toBe('function');
    });

    it('has a post method', () => {
      expect(apiClient.post).toBeDefined();
      expect(typeof apiClient.post).toBe('function');
    });

    it('has a put method', () => {
      expect(apiClient.put).toBeDefined();
      expect(typeof apiClient.put).toBe('function');
    });

    it('has a delete method', () => {
      expect(apiClient.delete).toBeDefined();
      expect(typeof apiClient.delete).toBe('function');
    });

    it('has a patch method', () => {
      expect(apiClient.patch).toBeDefined();
      expect(typeof apiClient.patch).toBe('function');
    });
  });

  describe('Configuration', () => {
    it('has correct base URL', () => {
      expect(apiClient.defaults.baseURL).toMatch(/^https?:\/\/.+|^http:\/\/.+|localhost/);
    });

    it('has timeout configured', () => {
      expect(apiClient.defaults.timeout).toBeGreaterThan(0);
    });

    it('has default headers', () => {
      expect(apiClient.defaults.headers).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('provides interceptor functionality', () => {
      expect(apiClient.interceptors).toBeDefined();
      expect(apiClient.interceptors.request).toBeDefined();
      expect(apiClient.interceptors.response).toBeDefined();
    });
  });
});
