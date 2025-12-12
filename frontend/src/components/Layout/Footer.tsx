'use client';

import { Box, Container, Divider, Stack, Typography, useTheme } from '@mui/material';

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      suppressHydrationWarning
      sx={{
        py: 6,
        mt: 8,
        borderTop: `1px solid ${theme.palette.divider}`,
        background:
          theme.palette.mode === 'dark'
            ? `linear-gradient(to bottom, ${theme.palette.background.paper}, #0F172A)`
            : `linear-gradient(to bottom, #FFFFFF, #F5F7FA)`,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          {/* Main Content */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            justifyContent="space-between"
          >
            {/* Brand */}
            <Stack spacing={1}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                RealEstate
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ maxWidth: 300 }}>
                Find your perfect property with our modern real estate platform. Browse thousands
                of beautiful homes and make your dream come true.
              </Typography>
            </Stack>

            {/* Quick Links */}
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Quick Links
              </Typography>
              <Typography variant="body2" component="div" className="footer-link">
                Browse Properties
              </Typography>
              <Typography variant="body2" component="div" className="footer-link">
                About Us
              </Typography>
              <Typography variant="body2" component="div" className="footer-link">
                Contact
              </Typography>
            </Stack>

            {/* Contact */}
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Contact Us
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Email: info@realestate.com
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Phone: +1 (555) 123-4567
              </Typography>
            </Stack>
          </Stack>

          {/* Divider */}
          <Divider />

          {/* Copyright */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Typography variant="caption" color="textSecondary">
              © {new Date().getFullYear()} RealEstate. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Typography
                variant="caption"
                className="footer-link"
              >
                Privacy Policy
              </Typography>
              <Typography
                variant="caption"
                className="footer-link"
              >
                Terms of Service
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
