import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { XOGThemeProvider } from './theme/ThemeProvider';
import XogBookingPage from './booking';

export const Routes = () => {
  return (
    <XOGThemeProvider>
      <RouterRoutes>
        <Route path="/" element={<XogBookingPage />} />
      </RouterRoutes>
    </XOGThemeProvider>
  );
}; 