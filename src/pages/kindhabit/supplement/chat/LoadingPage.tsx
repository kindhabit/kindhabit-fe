import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Splash } from '@/core/components/common/Splash';

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('../chat', { replace: true });
    }, 2000); // 2초 후 chat 페이지로 이동

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Splash 
      variant="standalone"
      variantProps={{ $type: 'fixed' }}
      message="영양제 추천을 준비하고 있어요..."
      isVisible={true}
      animation="fade"
    />
  );
};

export default LoadingPage; 