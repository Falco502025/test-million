import { propertyService } from '@/services/propertyService';
import { ApiError, FilterParams, PaginatedResponse } from '@/types/API';
import { Property } from '@/types/Property';
import { useEffect, useRef, useState } from 'react';

interface UsePropertiesState {
  data: PaginatedResponse<Property> | null;
  loading: boolean;
  error: ApiError | null;
}

export const useProperties = (filters: FilterParams) => {
  const [state, setState] = useState<UsePropertiesState>({
    data: null,
    loading: true,
    error: null,
  });
  
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Cancel previous request if new filters change
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const fetchProperties = async () => {
      try {
        setState({ data: null, loading: true, error: null });
        const result = await propertyService.getProperties(filters);
        setState({ data: result, loading: false, error: null });
      } catch (err) {
        // Don't update state if request was aborted
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        const error = err as ApiError;
        setState({ data: null, loading: false, error });
      }
    };

    fetchProperties();

    // Cleanup function to abort request on unmount or filter change
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [filters]);

  return state;
};
