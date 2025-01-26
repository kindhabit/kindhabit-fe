import React, { useCallback } from 'react';
import { useXogBooking } from '@/hooks/useXogBooking';
import ChatContainer from '@/components/chat/ChatContainer';
import { loadingMessages } from '@/services/xog/book-main-chat';
import { XOGThemeProvider } from '../theme/ThemeProvider';
import { BookingState } from '@/services/xog/book';

const XogBookingPage = () => {
  const booking = useXogBooking();
  
  const handleSliderSelect = useCallback((target: string) => {
    switch (booking.bookingState) {
      case BookingState.SELECT_TARGET:
        booking.handleTargetSelection(target);
        break;
      case BookingState.SELECT_PROGRAM:
        booking.handleProgramSelection(target);
        break;
      default:
        console.warn('Unexpected slider selection in state:', booking.bookingState);
    }
  }, [booking]);
  
  return (
    <XOGThemeProvider>
      <ChatContainer 
        messages={booking.messages}
        showLoading={booking.showLoading}
        loadingStep={booking.loadingStep}
        loadingMessages={loadingMessages}
        onSliderSelect={handleSliderSelect}
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
    </XOGThemeProvider>
  );
};

export default XogBookingPage; 