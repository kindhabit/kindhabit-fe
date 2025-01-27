import React from 'react';
import { useBookingChat } from '@/hooks/xog/booking/useBookingChat';
import ChatContainer from '@/components/chat/ChatContainer';
import { LOADING_MESSAGES } from '@/services/xog/booking/constants';

const XogBookingPage = () => {
  const bookingState = useBookingChat();
  
  return (
    <ChatContainer 
      messages={bookingState.messages}
      showLoading={bookingState.showLoading}
      loadingStep={bookingState.loadingStep}
      loadingMessages={LOADING_MESSAGES}
      onSliderSelect={bookingState.handleTargetSelection}
      sliderProps={{
        layoutType: 'grid',
        gridColumns: 2,
        gap: '16px',
        cardPadding: '20px',
        cardBorderRadius: '12px',
        showTags: false,
        iconSize: '24px',
        titleSize: '16px',
        descriptionSize: '14px'
      }}
    />
  );
};

export default XogBookingPage; 