import { createTheme, ThemeOptions } from '@mui/material/styles';

const lightPalette = {
  primary: {
    main: '#9c27b0',
    light: '#ba68c8',
    dark: '#7b1fa2',
  },
  secondary: {
    main: '#f50057',
    light: '#f73378',
    dark: '#c51162',
  },
  background: {
    default: '#F8FAFB',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#1A202C',
    secondary: '#718096',
  },
  success: {
    main: '#10B981',
    light: '#34D399',
  },
  warning: {
    main: '#F59E0B',
    light: '#FBBF24',
  },
  error: {
    main: '#EF4444',
    light: '#F87171',
  },
};

const darkPalette = {
  primary: {
    main: '#ba68c8',
    light: '#ce93d8',
    dark: '#9c27b0',
  },
  secondary: {
    main: '#f73378',
    light: '#f85b95',
    dark: '#f50057',
  },
  background: {
    default: '#0F172A',
    paper: '#1E293B',
  },
  text: {
    primary: '#F1F5F9',
    secondary: '#94A3B8',
  },
  success: {
    main: '#10B981',
    light: '#34D399',
  },
  warning: {
    main: '#F59E0B',
    light: '#FBBF24',
  },
  error: {
    main: '#EF4444',
    light: '#F87171',
  },
};

const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.6,
    },
    subtitle1: {
      fontSize: '1.1rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    subtitle2: {
      fontSize: '0.95rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.95rem',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
};

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    ...lightPalette,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
          padding: '10px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          boxShadow: '0 4px 12px rgba(0, 82, 204, 0.3)',
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '16px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            transition: 'all 0.3s',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#0052CC',
              },
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    ...darkPalette,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
          padding: '10px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.5)',
          },
        },
        contained: {
          boxShadow: '0 4px 12px rgba(96, 165, 250, 0.3)',
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '16px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            transition: 'all 0.3s',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#60A5FA',
              },
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E293B',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        },
      },
    },
  },
});
