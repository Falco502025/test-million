import { propertyService } from '@/services/propertyService';
import { ApiError } from '@/types/API';
import { PropertyDetail } from '@/types/Property';
import { useEffect, useState } from 'react';

interface UsePropertyDetailState {
  data: PropertyDetail | null;
  loading: boolean;
  error: ApiError | null;
}

export const usePropertyDetail = (id: string | null) => {
  const [state, setState] = useState<UsePropertyDetailState>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    // If no ID provided, don't fetch - just skip
    if (!id) {
      return;
    }

    const fetchProperty = async () => {
      try {
        setState({ data: null, loading: true, error: null });
        const result = await propertyService.getPropertyById(id);
        setState({ data: result, loading: false, error: null });
      } catch (err) {
        const error = err as ApiError;
        setState({ data: null, loading: false, error });
      }
    };

    fetchProperty();
  }, [id]);

  return state;
};
