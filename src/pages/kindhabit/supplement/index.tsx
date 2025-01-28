import React from 'react';
import Routes from './routes';
import { KindhabitThemeProvider } from '../theme/ThemeProvider';

const SupplementApp = () => {
  return (
    <KindhabitThemeProvider>
      <Routes />
    </KindhabitThemeProvider>
  );
};

export default SupplementApp; 