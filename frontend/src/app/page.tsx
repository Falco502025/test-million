'use client';

import FilterForm from '@/components/Filter/FilterForm';
import HeroSection from '@/components/Home/HeroSection';
import ResultsSection from '@/components/Home/ResultsSection';
import PropertyDetailModal from '@/components/Property/PropertyDetailModal';
import { useAlert } from '@/hooks/useAlert';
import { useFilters } from '@/hooks/useFilters';
import { useProperties } from '@/hooks/useProperties';
import { usePropertyDetail } from '@/hooks/usePropertyDetail';
import { Alert, Box, Container, Pagination, Snackbar, Stack, useTheme } from '@mui/material';
import { useState } from 'react';

export default function Home() {
  const theme = useTheme();
  const { filters, updateFilter, setPageNumber, setPageSize, resetFilters } = useFilters();
  const { data: propertiesData, loading: propertiesLoading, error: propertiesError } =
    useProperties(filters);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const { data: selectedProperty, loading: propertyDetailLoading, error: propertyDetailError } =
    usePropertyDetail(selectedPropertyId);
  const { alert, showAlert, hideAlert } = useAlert();

  const handleSearch = () => {
    if (filters.minPrice && filters.maxPrice && filters.minPrice > filters.maxPrice) {
      showAlert('Min price cannot be greater than Max price', 'error');
      return;
    }
    setPageNumber(1);
    if (propertiesData) {
      showAlert(`Found ${propertiesData.totalCount} properties`, 'success');
    }
  };

  const handleReset = () => {
    resetFilters();
    showAlert('Filters reset', 'info');
  };

  const handlePropertyClick = (id: string) => {
    setSelectedPropertyId(id);
  };

  const handleCloseModal = () => {
    setSelectedPropertyId(null);
  };

  const handlePaginationChange = (_: unknown, page: number) => {
    setPageNumber(page);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          theme.palette.mode === 'dark'
            ? `linear-gradient(to bottom, ${theme.palette.background.default}, #0F172A)`
            : `linear-gradient(to bottom, ${theme.palette.background.default}, #FFFFFF)`,
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <HeroSection totalCount={propertiesData?.totalCount ?? 0} />

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
          <FilterForm
            name={filters.name || ''}
            address={filters.address || ''}
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            onNameChange={(value) => updateFilter('name', value)}
            onAddressChange={(value) => updateFilter('address', value)}
            onMinPriceChange={(value) => updateFilter('minPrice', value)}
            onMaxPriceChange={(value) => updateFilter('maxPrice', value)}
            onSearch={handleSearch}
            onReset={handleReset}
          />

          <ResultsSection
            loading={propertiesLoading}
            error={propertiesError}
            data={propertiesData}
            pageNumber={filters.pageNumber}
            pageSize={filters.pageSize}
            onPropertyClick={handlePropertyClick}
            onPageSizeChange={setPageSize}
          />

          {propertiesData && propertiesData.totalPages > 1 && (
            <Stack className="page-pagination-wrapper">
              <Pagination
                count={propertiesData.totalPages}
                page={filters.pageNumber}
                onChange={handlePaginationChange}
                color="primary"
                size="large"
                sx={{
                  '& .MuiPaginationItem-root': {
                    borderRadius: '8px',
                  },
                }}
              />
            </Stack>
          )}
        </Box>
      </Container>

      <PropertyDetailModal
        open={!!selectedPropertyId}
        property={selectedProperty}
        loading={propertyDetailLoading}
        error={propertyDetailError}
        onClose={handleCloseModal}
      />

      <Snackbar
        open={!!alert}
        autoHideDuration={6000}
        onClose={hideAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {alert ? (
          <Alert onClose={hideAlert} severity={alert.severity} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </Box>
  );
}
