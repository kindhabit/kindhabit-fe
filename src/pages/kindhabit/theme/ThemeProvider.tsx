import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { kindhabitTheme } from './index';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const KindhabitThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <StyledThemeProvider theme={kindhabitTheme}>
      {children}
    </StyledThemeProvider>
  );
}; 