'use client';

import { darkTheme, lightTheme } from '@/styles/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { ReactNode } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeToggle() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeToggle must be used within MuiThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  readonly children: ReactNode;
}

export function MuiThemeProvider({ children }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const theme = isDark ? darkTheme : lightTheme;
  
  const contextValue = useMemo(() => ({ isDark, toggleTheme }), [isDark]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
