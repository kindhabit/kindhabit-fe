import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { createTheme } from '@/core/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const XOGThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = createTheme('blue');

  return (
    <StyledThemeProvider theme={theme}>
      {children}
    </StyledThemeProvider>
  );
}; 