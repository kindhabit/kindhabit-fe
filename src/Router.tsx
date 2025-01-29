import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Splash } from '@/components/common/Splash';
import Layout from '@/components/common/Layout';
import { ChatBooking } from '@/pages/xog/booking/ChatBooking';
import { useBookingChat } from '@/hooks/xog/booking';
import { XOGThemeProvider } from '@/pages/xog/theme/ThemeProvider';

// 채팅 버전 래퍼 컴포넌트
const ChatBookingWrapper = () => {
  const bookingChat = useBookingChat();
  return (
    <ChatBooking 
      messages={bookingChat.messages}
      showLoading={bookingChat.showLoading}
      loadingStep={bookingChat.loadingStep}
      handleTargetSelection={bookingChat.handleTargetSelection}
      handleProgramSelection={bookingChat.handleProgramSelection}
    />
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
      <XOGThemeProvider>
        <Routes>
          <Route path="*" element={
            <Layout>
              <ChatBookingWrapper />
            </Layout>
          } />
        </Routes>
      </XOGThemeProvider>
    </Suspense>
  );
};

export default Router; 