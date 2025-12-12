'use client';

import { PAGE_SIZE_OPTIONS } from '@/constants/filterConfig';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography, useTheme } from '@mui/material';

interface ResultsHeaderProps {
  readonly itemsCount: number;
  readonly totalCount: number;
  readonly pageNumber: number;
  readonly totalPages: number;
  readonly pageSize: number;
  readonly onPageSizeChange: (size: number) => void;
}

export default function ResultsHeader({
  itemsCount,
  totalCount,
  pageNumber,
  totalPages,
  pageSize,
  onPageSizeChange,
}: ResultsHeaderProps) {
  const theme = useTheme();

  return (
    <Box
      className="results-header-container"
      sx={{
        background: theme.palette.action.hover,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box sx={{ flex: 1, width: '100%' }}>
        <Typography variant="subtitle1" className="results-header-title">
          {itemsCount === 0 ? 'No properties found' : `Showing ${itemsCount} of ${totalCount} properties`}
        </Typography>
        {itemsCount > 0 && (
          <Typography variant="caption" color="textSecondary" className="results-header-subtitle">
            Page {pageNumber} of {totalPages}
          </Typography>
        )}
      </Box>

      <FormControl size="small" className="results-header-pagesize">
        <InputLabel sx={{ fontSize: { xs: '0.75rem', sm: 'inherit' } }}>Items per page</InputLabel>
        <Select value={pageSize} label="Items per page" onChange={(e) => onPageSizeChange(Number.parseInt(e.target.value.toString()))}>
          {PAGE_SIZE_OPTIONS.map((size) => (
            <MenuItem key={size} value={size}>
              {size} items
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
