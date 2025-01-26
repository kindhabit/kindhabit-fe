import React from 'react';
import { Routes } from './routes';
import { KindhabitThemeProvider } from './theme/ThemeProvider';

const KindhabitApp = () => {
  return (
    <KindhabitThemeProvider>
      <Routes />
    </KindhabitThemeProvider>
  );
};

export default KindhabitApp; 