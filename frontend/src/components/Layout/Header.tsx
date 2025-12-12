'use client';

import { useThemeToggle } from '@/app/theme-provider';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '@mui/icons-material/Home';
import LightModeIcon from '@mui/icons-material/LightMode';
import { AppBar, Box, Container, IconButton, Stack, Tooltip, useTheme } from '@mui/material';

const Header: React.FC = () => {
  const muiTheme = useTheme();
  const { isDark, toggleTheme } = useThemeToggle();

  return (
    <AppBar
      position="sticky"
      suppressHydrationWarning
      sx={{
        background:
          muiTheme.palette.mode === 'dark'
            ? `linear-gradient(135deg, ${muiTheme.palette.background.paper} 0%, #2D3748 100%)`
            : `linear-gradient(135deg, #FFFFFF 0%, #F5F7FA 100%)`,
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${muiTheme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ py: 1.5 }}
        >
          {/* Logo */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: '10px',
                background: `linear-gradient(135deg, ${muiTheme.palette.primary.main} 0%, ${muiTheme.palette.primary.light} 100%)`,
              }}
            >
              <HomeIcon sx={{ color: 'white', fontSize: '1.5rem' }} />
            </Box>
            <Box>
              <Box sx={{ fontSize: '1.25rem', fontWeight: 800, color: muiTheme.palette.primary.main }}>
                RealEstate
              </Box>
              <Box sx={{ fontSize: '0.7rem', color: muiTheme.palette.text.secondary, fontWeight: 500 }}>
                Find Your Home
              </Box>
            </Box>
          </Stack>

          {/* Theme Toggle */}
          <Tooltip title={isDark ? 'Light Mode' : 'Dark Mode'}>
            <IconButton
              onClick={toggleTheme}
              size="small"
              sx={{
                color: isDark ? 'white' : 'primary.main',
              }}
            >
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Header;
