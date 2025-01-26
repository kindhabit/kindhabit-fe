import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const LoadingWrapper = styled.div<{ $isExiting: boolean }>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  animation: ${({ $isExiting }) => $isExiting ? fadeOut : fadeIn} 0.5s ease-in-out;
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const LoadingImage = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 16px;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const LoadingText = styled.div<{ $isChanging: boolean }>`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  line-height: 1.5;
  opacity: ${({ $isChanging }) => $isChanging ? 0 : 1};
  transition: opacity 0.3s ease-in-out;
`;

const LoadingPage: React.FC = () => {
  const navigate = useNavigate();
  const [loadingText, setLoadingText] = useState('분석을 시작합니다...');
  const [isExiting, setIsExiting] = useState(false);
  const [isTextChanging, setIsTextChanging] = useState(false);
  
  useEffect(() => {
    // 로딩 텍스트 변경
    const textChangeTimer = setTimeout(() => {
      setIsTextChanging(true);
      setTimeout(() => {
        setLoadingText('건강 데이터를 확인하고 있습니다...');
        setIsTextChanging(false);
      }, 300);
    }, 1500);

    // 페이지 전환 시작
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2500);

    // 채팅 페이지로 이동
    const navigationTimer = setTimeout(() => {
      navigate('/kindhabit/chat');
    }, 3000);

    return () => {
      clearTimeout(textChangeTimer);
      clearTimeout(exitTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <LoadingWrapper $isExiting={isExiting}>
      <LoadingImage src="/assets/splash.png" alt="Loading..." />
      <LoadingText $isChanging={isTextChanging}>{loadingText}</LoadingText>
    </LoadingWrapper>
  );
};

export default LoadingPage; 