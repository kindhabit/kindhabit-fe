import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { xogTheme } from './index';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const XOGThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <StyledThemeProvider theme={xogTheme}>
      {children}
    </StyledThemeProvider>
  );
}; 