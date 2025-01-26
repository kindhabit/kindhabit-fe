import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import Layout from '@/core/components/common/Layout';

const MainPage = () => {
  return <div>Booking Service - Coming Soon</div>;
};

export const Routes = () => {
  return (
    <Layout>
      <RouterRoutes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </RouterRoutes>
    </Layout>
  );
}; 