import React, { lazy, Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '@/core/theme';
import { GlobalStyle } from '@/core/styles/global/GlobalStyle';

// future flags 설정
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

// 기존 건기식 서비스
const SupplementApp = lazy(() => import('./pages/kindhabit/supplement'));
// 새로운 예약 서비스
const BookingApp = lazy(() => import('./pages/xog/booking'));

const App = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter future={router.future}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/supplement/*" element={<SupplementApp />} />
              <Route path="/booking/*" element={<BookingApp />} />
              <Route path="/" element={<Navigate to="/supplement" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App; 