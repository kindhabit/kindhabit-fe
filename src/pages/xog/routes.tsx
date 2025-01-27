import React from 'react';
import { Routes as RouterRoutes, Route, RouteObject } from 'react-router-dom';
import { XOGThemeProvider } from './theme/ThemeProvider';
import ChatBooking from './booking/ChatBooking';
import FormBooking from './booking/FormBooking';
import TestBooking from './booking/TestBooking';
import { useBookingChat, useBookingForm } from '@/hooks/xog/booking';

// 채팅 버전 래퍼 컴포넌트
const ChatBookingWrapper = () => {
  const state = useBookingChat();
  
  return (
    <ChatBooking
      messages={state.messages}
      showLoading={state.showLoading}
      loadingStep={state.loadingStep}
      bookingState={state.bookingState}
      handleTargetSelection={state.handleTargetSelection}
      handleProgramSelection={state.handleProgramSelection}
    />
  );
};

// 폼 버전 래퍼 컴포넌트
const FormBookingWrapper = () => {
  const state = useBookingForm();
  
  return (
    <FormBooking
      bookingState={state.bookingState}
      handleTargetSelection={state.handleTargetSelection}
      handleProgramSelection={state.handleProgramSelection}
      handleDateSelection={state.handleDateSelection}
      handleTimeSelection={state.handleTimeSelection}
      handleConfirm={state.handleConfirm}
    />
  );
};

export const xogRoutes: RouteObject[] = [
  {
    path: 'booking/chat',
    element: <ChatBookingWrapper />
  },
  {
    path: 'booking/form',
    element: <FormBookingWrapper />
  },
  {
    path: 'booking/test',
    element: <TestBooking />
  }
];

export const Routes = () => {
  return (
    <XOGThemeProvider>
      <RouterRoutes>
        <Route path="/" element={<ChatBookingWrapper />} />
        <Route path="/form" element={<FormBookingWrapper />} />
        <Route path="/test" element={<TestBooking />} />
      </RouterRoutes>
    </XOGThemeProvider>
  );
}; 