import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '@/core/theme';
import KindhabitApp from '@/pages/kindhabit';
import XOGPage from '@/pages/xog';

const AppWithTheme = () => {
  const mode = import.meta.env.VITE_SERVICE_MODE;
  
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/kindhabit/*" element={<KindhabitApp />} />
      </Routes>
    </ThemeProvider>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/xog/*" element={<XOGPage />} />
      <Route path="/*" element={<AppWithTheme />} />
    </Routes>
  );
}

export default App; 