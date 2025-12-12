'use client';

import { Box, Typography, useTheme } from '@mui/material';

export default function NoResultsMessage() {
  const theme = useTheme();

  return (
    <Box
      className="no-results-container"
      sx={{
        background: theme.palette.action.hover,
        borderColor: theme.palette.divider,
      }}
    >
      <Typography variant="h5" className="no-results-title">
        No Properties Found
      </Typography>
      <Typography variant="body2" color="textSecondary" className="no-results-subtitle">
        Try adjusting your filters or search criteria
      </Typography>
    </Box>
  );
}
