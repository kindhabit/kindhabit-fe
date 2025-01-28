import React from 'react';
import { useBookingChat } from '@/hooks/xog/booking/useBookingChat';
import { ChatBooking } from './ChatBooking';
import Layout from '@/components/layout/Layout';

export const XogBookingPage = () => {
  const state = useBookingChat();

  return (
    <Layout>
      <ChatBooking {...state} />
    </Layout>
  );
}; 