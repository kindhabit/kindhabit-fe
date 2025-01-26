import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { supplementTheme } from './index';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const SupplementThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <StyledThemeProvider theme={supplementTheme}>
      {children}
    </StyledThemeProvider>
  );
}; 