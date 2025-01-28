import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { RedirectPage } from '@/components/common/RedirectPage';
import { ChatBooking } from './ChatBooking';
import { FormBooking } from './FormBooking';
import { useBookingChat, useBookingForm } from '@/hooks/xog/booking';
import LoadingPage from './LoadingPage';

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

const routes = (
  <RouterRoutes>
    <Route path="/" element={<RedirectPage to="loading/chat" />} />
    <Route path="chat" element={<ChatBookingWrapper />} />
    <Route path="form" element={<FormBookingWrapper />} />
    <Route path="loading/chat" element={<LoadingPage type="chat" />} />
    <Route path="loading/form" element={<LoadingPage type="form" />} />
    <Route path="*" element={<Navigate to="loading/chat" replace />} />
  </RouterRoutes>
);

export default routes; 