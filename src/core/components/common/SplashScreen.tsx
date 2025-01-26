import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { colors } from '@/theme';

const SplashWrapper = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${colors.dashboard.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const SplashImage = styled('img')`
  width: 200px;
  height: auto;
  margin-bottom: 24px;
`;

const SplashText = styled(Typography)`
  font-family: 'Pretendard';
  font-size: 18px;
  color: ${colors.brown};
`;

interface SplashScreenProps {
  message: string;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ message }) => {
  return (
    <SplashWrapper>
      <SplashImage src="/images/splash.png" alt="분석중" />
      <SplashText>{message}</SplashText>
    </SplashWrapper>
  );
};

export default SplashScreen; 