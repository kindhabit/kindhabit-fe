import React, { useEffect } from 'react';
import { Routes as RouterRoutes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import ChatPage from '@/pages/chat/ChatPage';
import LoadingPage from '@/pages/chat/LoadingPage';

const MainPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('[MainPage] Mounted');
    // 메인 페이지 마운트 시 한 번만 리다이렉트
    const redirectTimer = setTimeout(() => {
      navigate('/supplement/chat/loading', { replace: true });
    }, 0);
    
    return () => {
      console.log('[MainPage] Unmounted');
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return null;  // 리다이렉트 중에는 아무것도 렌더링하지 않음
};

export const Routes = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log('[Routes] Location changed:', location.pathname);
  }, [location]);

  return (
    <Layout>
      <RouterRoutes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chat/loading" element={<LoadingPage />} />
        <Route path="/chat" element={<ChatPage />} />
        {/* 잘못된 경로로 접근시 메인으로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </RouterRoutes>
    </Layout>
  );
}; 