import { Property } from '@/types/Property';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Stack,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card
      onClick={onClick}
      className="property-card"
    >
      <CardMedia
        component="img"
        height="250"
        image={property.mainImage || '/placeholder.png'}
        alt={property.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" gutterBottom noWrap>
          {property.name}
        </Typography>

        <Typography variant="body2" color="textSecondary" gutterBottom noWrap>
          {property.address}
        </Typography>

        <Box sx={{ my: 2 }}>
          <Typography variant="h5" color="primary" fontWeight="bold">
            {formatPrice(property.price)}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Chip
              label={property.propertyType}
              size="small"
              variant="outlined"
            />
            <Chip
              label={`${property.year}`}
              size="small"
              variant="outlined"
              icon={<span>📅</span>}
            />
          </Stack>
        </Box>

        {/* Owner Info - Mini */}
        {property.owner && (
          <Box className="property-card-owner" sx={{ bgcolor: 'action.hover' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box className="property-card-owner-avatar" sx={{ borderColor: 'primary.main' }}>
                <Image
                  src={property.owner.photo}
                  alt={property.owner.name}
                  fill
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" display="block" sx={{ fontWeight: 600 }}>
                  {property.owner.name}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {property.codeInternal}
                </Typography>
              </Box>
            </Stack>
          </Box>
        )}

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Box className="property-card-feature-item">
            <BedIcon fontSize="small" />
            <Typography variant="caption">{property.bedrooms}</Typography>
          </Box>
          <Box className="property-card-feature-item">
            <BathtubIcon fontSize="small" />
            <Typography variant="caption">{property.bathrooms}</Typography>
          </Box>
          <Box className="property-card-feature-item">
            <AspectRatioIcon fontSize="small" />
            <Typography variant="caption">{property.area} m²</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
