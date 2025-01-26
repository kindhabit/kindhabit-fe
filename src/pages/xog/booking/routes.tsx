import React, { useEffect } from 'react';
import { Routes as RouterRoutes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Layout from '@/core/components/common/Layout';
import LoadingPage from './LoadingPage';
import BookingPage from './BookingPage';

const MainPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/xog/booking/loading', { replace: true });
    }, 0);
    
    return () => {
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return null;
};

export const Routes = () => {
  const location = useLocation();

  return (
    <Layout>
      <RouterRoutes>
        <Route path="/" element={<MainPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </RouterRoutes>
    </Layout>
  );
}; 