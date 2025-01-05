import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const LoadingWrapper = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  z-index: 1000;
`;

const SplashImage = styled('img')`
  width: 120px;
  height: 120px;
  margin-bottom: 24px;
`;

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = '분석 중입니다...' }) => {
  return (
    <LoadingWrapper>
      <SplashImage src="/assets/splash.png" alt="Loading" />
      <CircularProgress size={32} sx={{ mb: 2 }} />
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </LoadingWrapper>
  );
};

export default Loading; 