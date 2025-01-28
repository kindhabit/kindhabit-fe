import React from 'react';
import { RouteObject, useRoutes, Outlet } from 'react-router-dom';
import { XOGThemeProvider } from './theme/ThemeProvider';
import Layout from '@/components/common/Layout';
import { RedirectPage } from '@/components/common/RedirectPage';
import { ChatBooking } from './booking/ChatBooking';
import { FormBooking } from './booking/FormBooking';
import LoadingPage from './booking/LoadingPage';
import { useBookingChat, useBookingForm } from '@/hooks/xog/booking';

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

// 폼 버전 래퍼 컴포넌트
const FormBookingWrapper = () => {
  const bookingForm = useBookingForm();
  return (
    <FormBooking 
      handleTargetSelection={bookingForm.handleTargetSelection}
      handleProgramSelection={bookingForm.handleProgramSelection}
    />
  );
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RedirectPage to="booking/loading/chat" />
  },
  {
    path: 'booking',
    element: <Layout><Outlet /></Layout>,
    children: [
      {
        path: '',
        element: <RedirectPage to="loading/chat" />
      },
      {
        path: 'chat',
        element: <ChatBookingWrapper />
      },
      {
        path: 'form',
        element: <FormBookingWrapper />
      },
      {
        path: 'loading/chat',
        element: <LoadingPage type="chat" />
      },
      {
        path: 'loading/form',
        element: <LoadingPage type="form" />
      },
      {
        path: '*',
        element: <RedirectPage to="loading/chat" />
      }
    ]
  }
];

export const Routes = () => {
  const element = useRoutes(routes);
  return (
    <XOGThemeProvider>
      {element}
    </XOGThemeProvider>
  );
};

export default routes; 