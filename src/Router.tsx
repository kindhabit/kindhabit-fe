import React, { Suspense } from 'react';
import { Routes, Route, RouteObject } from 'react-router-dom';
import routes from '@/pages/xog/routes';
import kindhabitRoutes from '@/pages/kindhabit/routes';
import { Splash } from '@/components/common/Splash';

const MainPage = React.lazy(() => import('@/pages/kindhabit/supplement/chat/ChatPage'));

// 라우트 객체를 Route 컴포넌트로 변환하는 함수
const renderRoute = (route: RouteObject) => {
  const { path, element, children } = route;
  return (
    <Route key={path} path={path} element={element}>
      {children?.map(renderRoute)}
    </Route>
  );
};

const Router = () => {
  return (
    <Suspense fallback={
      <Splash 
        variant="standalone"
        variantProps={{ $type: 'fixed' }}
        message="로딩중..."
        isVisible={true}
        animation="fade"
      />
    }>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {routes.map(renderRoute)}
        {kindhabitRoutes.map(renderRoute)}
      </Routes>
    </Suspense>
  );
};

export default Router; 