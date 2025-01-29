import React from 'react';
import { RouteObject, useRoutes, Outlet } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import { ChatBooking } from './booking/ChatBooking';
import LoadingPage from './booking/LoadingPage';
import { useBookingChat } from '@/hooks/xog/booking';

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

const routes: RouteObject[] = [
  {
    path: 'xog',
    element: <Layout><Outlet /></Layout>,
    children: [
      {
        path: '',
        element: <LoadingPage type="chat" />
      },
      {
        path: 'booking/chat',
        element: <ChatBookingWrapper />
      }
    ]
  }
];

export default routes; 