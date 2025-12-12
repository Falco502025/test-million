'use client';

import { PropertyDetail } from '@/types/Property';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface PropertyDetailModalProps {
  readonly open: boolean;
  readonly property: PropertyDetail | null;
  readonly loading: boolean;
  readonly error: { message?: string } | null;
  readonly onClose: () => void;
}

const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  open,
  property,
  loading,
  error,
  onClose,
}) => {
  const theme = useTheme();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: '16px',
            background:
              theme.palette.mode === 'dark'
                ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, #2D3748 100%)`
                : '#FFFFFF',
          },
        },
      }}
    >
      {/* Close Button */}
      <Box className="modal-close-button-container">
        <IconButton
          onClick={onClose}
          className="modal-close-button"
          sx={{
            backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            '&:hover': {
              backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ 
        p: 0,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: theme.palette.background.paper,
        },
        '&::-webkit-scrollbar-thumb': {
          background: theme.palette.primary.main,
          borderRadius: '10px',
          '&:hover': {
            background: theme.palette.primary.dark,
          },
        },
      }}>
        {loading && (
          <Box className="loading-container">
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ m: 2 }}>
            {error.message || 'Failed to load property details'}
          </Alert>
        )}

        {property && !loading && (
          <>
            {/* Image Carousel */}
            {property.images && property.images.length > 0 && (
              <Box
                className="modal-carousel-container"
                sx={{
                  '& .carousel': {
                    height: '100%',
                  },
                  '& .slide': {
                    background: theme.palette.background.default,
                  },
                  '& .carousel-status': {
                    position: 'absolute !important',
                    bottom: 60,
                    top: 'auto !important',
                    backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}) !important`,
                    color: 'white !important',
                    borderRadius: '20px !important',
                    padding: '4px 12px !important',
                  },
                  '& .control-arrow.control-prev:before': {
                    borderRight: `10px solid #FF1493 !important`,
                    borderTop: `10px solid transparent !important`,
                    borderBottom: `10px solid transparent !important`,
                  },
                  '& .control-arrow.control-next:before': {
                    borderLeft: `10px solid #FF1493 !important`,
                    borderTop: `10px solid transparent !important`,
                    borderBottom: `10px solid transparent !important`,
                  },
                  '& .control-arrow:hover.control-prev:before': {
                    borderRight: `10px solid #FF69B4 !important`,
                  },
                  '& .control-arrow:hover.control-next:before': {
                    borderLeft: `10px solid #FF69B4 !important`,
                  },
                }}
              >
                <Carousel
                  showThumbs={property.images.length > 1}
                  autoPlay
                  interval={5000}
                  infiniteLoop
                  dynamicHeight={false}
                  emulateTouch
                >
                  {property.images.map((image) => (
                    <Box
                      key={image.id}
                      className="modal-carousel-image-box"
                      sx={{
                        background: theme.palette.background.default,
                      }}
                    >
                      <Image
                        src={image.imageUrl}
                        alt="Property"
                        fill
                        priority
                        style={{
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  ))}
                </Carousel>
              </Box>
            )}

            {/* Content */}
            <Box className="modal-content-wrapper">
              {/* Header */}
              <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'flex-start' }} className="modal-header-section">
                <Box className="modal-header-left">
                  <Typography variant="h5" className="modal-title">
                    {property.name}
                  </Typography>

                  {/* Location */}
                  <Stack direction="row" spacing={1} alignItems="flex-start" className="modal-location">
                    <LocationOnIcon className="modal-location-icon" sx={{ color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        {property.address}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Price */}
                  <Typography
                    variant="h5"
                    className="modal-price"
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {formatPrice(property.price)}
                  </Typography>
                </Box>

                {/* Property Type Badge */}
                <Chip
                  label={property.propertyType}
                  color="primary"
                  variant="filled"
                  className="modal-property-type-chip"
                  sx={{
                    height: { xs: '28px', md: 'auto' },
                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                    py: 1,
                    px: 2,
                  }}
                />
              </Stack>

              <Divider sx={{ my: 3 }} />

              {/* Key Features */}
              <Box className="modal-features-section">
                <Typography variant="h6" className="modal-features-title">
                  Key Features
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2} sx={{ flexWrap: 'wrap' }}>
                  {/* Bedrooms */}
                  <Box
                    className="modal-feature-box"
                    sx={{
                      background: theme.palette.action.hover,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <BedIcon className="modal-feature-icon" sx={{ color: 'primary.main' }} />
                    <Box>
                      <Typography variant="caption" color="textSecondary" className="modal-feature-label">
                        Bedrooms
                      </Typography>
                      <Typography variant="h6" className="modal-feature-value">
                        {property.bedrooms}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Bathrooms */}
                  <Box
                    className="modal-feature-box"
                    sx={{
                      background: theme.palette.action.hover,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <BathtubIcon className="modal-feature-icon" sx={{ color: 'primary.main' }} />
                    <Box>
                      <Typography variant="caption" color="textSecondary" className="modal-feature-label">
                        Bathrooms
                      </Typography>
                      <Typography variant="h6" className="modal-feature-value">
                        {property.bathrooms}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Area */}
                  <Box
                    className="modal-feature-box"
                    sx={{
                      background: theme.palette.action.hover,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <AspectRatioIcon className="modal-feature-icon" sx={{ color: 'primary.main' }} />
                    <Box>
                      <Typography variant="caption" color="textSecondary" className="modal-feature-label">
                        Area
                      </Typography>
                      <Typography variant="h6" className="modal-feature-value">
                        {property.area} m²
                      </Typography>
                    </Box>
                  </Box>

                  {/* Year */}
                  <Box
                    className="modal-feature-box"
                    sx={{
                      background: theme.palette.action.hover,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <CalendarTodayIcon className="modal-feature-icon" sx={{ color: 'primary.main' }} />
                    <Box>
                      <Typography variant="caption" color="textSecondary" className="modal-feature-label">
                        Year Built
                      </Typography>
                      <Typography variant="h6" className="modal-feature-value">
                        {property.year}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>

              {/* Description */}
              {property.description && (
                <Box className="modal-description-section">
                  <Typography variant="h6" className="modal-description-title">
                    Description
                  </Typography>
                  <Typography variant="body1" color="textSecondary" className="modal-description-text">
                    {property.description}
                  </Typography>
                </Box>
              )}

              <Divider sx={{ my: 3 }} />

              {/* Property Traces - History */}
              {property.traces && property.traces.length > 0 && (
                <Box className="modal-history-section">
                  <Typography variant="h6" className="modal-history-title">
                    Property History
                  </Typography>
                  <Stack spacing={2}>
                    {property.traces.map((trace) => (
                      <Box
                        key={`${trace.name}-${trace.dateSale}`}
                        className="modal-history-item"
                        sx={{
                          background: theme.palette.action.hover,
                          border: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
                          <Box>
                            <Typography variant="subtitle2" className="modal-history-item-date">
                              {trace.name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" className="modal-history-item-date-label">
                              {new Date(trace.dateSale).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                            <Typography variant="subtitle2" className="modal-history-item-value">
                              ${trace.value.toLocaleString()}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" className="modal-history-item-tax">
                              Tax: ${trace.tax.toLocaleString()}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}

              <Divider sx={{ my: 3 }} />

              {/* Owner Info */}
              {property.owner && (
                <Box className="modal-owner-section">
                  <Typography variant="h6" className="modal-owner-title">
                    Property Owner
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }}>
                    <Box
                      className="modal-owner-photo"
                      sx={{
                        border: `2px solid ${theme.palette.primary.main}`,
                      }}
                    >
                      <Image
                        src={property.owner.photo}
                        alt={property.owner.name}
                        fill
                        style={{
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                    <Box className="modal-owner-info">
                      <Typography variant="h6" className="modal-owner-name">
                        {property.owner.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" className="modal-owner-detail">
                        📧 {property.owner.email}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" className="modal-owner-detail">
                        📱 {property.owner.phone}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" className="modal-owner-detail">
                        📍 {property.owner.address}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" className="modal-owner-detail">
                        🎂 {new Date(property.owner.birthday).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              )}

              {/* Action Buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} className="modal-action-buttons">
                <Button
                  variant="outlined"
                  size="large"
                  onClick={onClose}
                  sx={{ flex: 1 }}
                >
                  Close
                </Button>
              </Stack>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetailModal;
