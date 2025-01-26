import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { loadingMessages } from '@/services/booking';
import { bookingStateAtom } from '@/store/booking/atoms';
import { BookingState } from '@/services/booking';

const LoadingPage = () => {
  const navigate = useNavigate();
  const [, setBookingState] = useRecoilState(bookingStateAtom);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBookingState(BookingState.READY);
      navigate('/xog/booking/booking', { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, setBookingState]);

  return (
    <LoadingContainer>
      <LoadingContent>
        <LoadingText>
          {loadingMessages[Math.floor(Math.random() * loadingMessages.length)]}
        </LoadingText>
      </LoadingContent>
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div\`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: \${({ theme }) => theme.colors.background};
\`;

const LoadingContent = styled.div\`
  text-align: center;
\`;

const LoadingText = styled.p\`
  color: \${({ theme }) => theme.colors.primary};
  font-size: \${({ theme }) => theme.fontSizes.large};
  margin: 0;
\`;

export default LoadingPage; 