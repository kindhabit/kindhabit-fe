import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Splash } from '@/components/common/Splash';

interface LoadingPageProps {
  type?: 'chat' | 'form';
}

const LoadingPage: React.FC<LoadingPageProps> = ({ type = 'chat' }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`booking/${type}`, { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, type]);

  return (
    <Splash 
      variant="standalone"
      variantProps={{ $type: 'fixed' }}
      message="예약 상담을 준비하고 있어요..."
      isVisible={true}
      animation="fade"
    />
  );
};

export default LoadingPage; 