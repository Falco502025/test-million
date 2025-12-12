'use client';

import { Box, Typography, useTheme } from '@mui/material';

interface HeroSectionProps {
  readonly totalCount: number;
}

export default function HeroSection({ totalCount }: HeroSectionProps) {
  const theme = useTheme();

  return (
    <Box className="hero-section">
      <Typography
        variant="h2"
        component="h1"
        className="hero-title"
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Find Your Perfect Property
      </Typography>
      <Typography
        variant="h6"
        color="textSecondary"
        className="hero-subtitle"
      >
        Discover amazing properties tailored to your needs
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        className="hero-description"
      >
        Browse through {totalCount || 0}+ premium properties and find your dream home
      </Typography>
    </Box>
  );
}
