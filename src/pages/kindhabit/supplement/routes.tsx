import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { RedirectPage } from '@/components/common/RedirectPage';
import ChatPage from './chat/ChatPage';
import LoadingPage from './chat/LoadingPage';
import SupplementTest from './test';

const routes = (
  <RouterRoutes>
    <Route path="/" element={<RedirectPage to="loading" />} />
    <Route path="loading" element={<LoadingPage />} />
    <Route path="chat" element={<ChatPage />} />
    <Route path="test/*" element={<SupplementTest />} />
    <Route path="*" element={<Navigate to="loading" replace />} />
  </RouterRoutes>
);

export default routes; 