import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const SupplementTest = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 초기 진입시 loading 페이지로 이동
    if (location.pathname === '/kindhabit/supplement/test') {
      navigate('loading', { replace: true });
    }
  }, [location.pathname, navigate]);

  return <Outlet />;
};

export default SupplementTest; 