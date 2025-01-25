import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import Layout from '@/components/common/Layout';

export const Routes = () => {
  return (
    <Layout>
      <RouterRoutes>
        <Route path="/" element={<div>건기식 메인</div>} />
      </RouterRoutes>
    </Layout>
  );
}; 