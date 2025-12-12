import { Property } from '@/types/Property';
import { Box, Typography } from '@mui/material';
import React from 'react';
import PropertyCard from './PropertyCard';

interface PropertyGridProps {
  properties: Property[];
  onPropertyClick: (id: string) => void;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ properties, onPropertyClick }) => {
  if (properties.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 400,
        }}
      >
        <Typography variant="h6" color="textSecondary">
          No properties found. Try adjusting your filters.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: 3,
      }}
    >
      {properties.map((property) => (
        <Box key={property.id}>
          <PropertyCard property={property} onClick={() => onPropertyClick(property.id)} />
        </Box>
      ))}
    </Box>
  );
};

export default PropertyGrid;
