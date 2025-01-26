import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/core/components/common/Layout';
import Loading from '@/core/components/common/Loading';

// 레이지 로딩 적용
const ChatPage = React.lazy(() => import('@/pages/kindhabit/supplement/chat/ChatPage'));
const AnalysisPage = React.lazy(() => import('@/pages/analysis/AnalysisPage'));
const ReportPage = React.lazy(() => import('@/pages/analysis/ReportPage'));

const Router = () => {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default Router; 