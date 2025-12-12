'use client';

import type { PaginatedResponse } from '@/types/API';
import type { Property as PropertyListDto } from '@/types/Property';
import { Alert, Box, CircularProgress } from '@mui/material';
import PropertyGrid from '../Property/PropertyGrid';
import NoResultsMessage from './NoResultsMessage';
import ResultsHeader from './ResultsHeader';

interface ApiErrorLike {
  readonly message?: string;
}

interface ResultsSectionProps {
  readonly loading: boolean;
  readonly error: ApiErrorLike | null;
  readonly data: PaginatedResponse<PropertyListDto> | null;
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly onPropertyClick: (id: string) => void;
  readonly onPageSizeChange: (size: number) => void;
}

export default function ResultsSection({
  loading,
  error,
  data,
  pageNumber,
  pageSize,
  onPropertyClick,
  onPageSizeChange,
}: ResultsSectionProps) {
  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error.message || 'Failed to load properties'}
      </Alert>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <ResultsHeader
        itemsCount={data.items.length}
        totalCount={data.totalCount}
        pageNumber={pageNumber}
        totalPages={data.totalPages}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
      />

      {data.items.length > 0 ? (
        <>
          <PropertyGrid properties={data.items} onPropertyClick={onPropertyClick} />
          {data.totalPages > 1 && (
            <Box className="pagination-container">             
            </Box>
          )}
        </>
      ) : (
        <NoResultsMessage />
      )}
    </>
  );
}
