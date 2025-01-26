import React, { useEffect } from 'react';
import { Routes as RouterRoutes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Layout from '@/core/components/common/Layout';
import ChatPage from './supplement/chat/ChatPage';
import LoadingPage from './supplement/chat/LoadingPage';

const MainPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/kindhabit/loading', { replace: true });
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
        <Route path="/chat" element={<ChatPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </RouterRoutes>
    </Layout>
  );
}; 