import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { React.lazy } from 'react';

// 기존 건기식 서비스
const SupplementApp = React.lazy(() => import('./pages/supplement'));
// 새로운 예약 서비스
const BookingApp = React.lazy(() => import('./pages/booking'));

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/supplement/*" element={<SupplementApp />} />
              <Route path="/booking/*" element={<BookingApp />} />
              <Route path="/" element={<Navigate to="/supplement" replace />} />
            </Routes>
          </React.Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App; 