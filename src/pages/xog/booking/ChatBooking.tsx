import React from 'react';
import ChatContainer from '@/components/chat/ChatContainer';
import { BookingState, BookingTarget, BookingProgram } from '@/services/xog/booking/types';
import { LOADING_MESSAGES } from '@/services/xog/booking/constants';

interface ChatBookingProps {
  messages: any[];
  showLoading: boolean;
  loadingStep: number;
  bookingState: BookingState;
  handleTargetSelection: (target: BookingTarget) => void;
  handleProgramSelection: (program: BookingProgram) => void;
}

const ChatBooking: React.FC<ChatBookingProps> = ({
  messages,
  showLoading,
  loadingStep,
  bookingState,
  handleTargetSelection,
  handleProgramSelection,
}) => {
  const handleSliderSelect = (target: BookingTarget | BookingProgram) => {
    switch (bookingState) {
      case BookingState.SELECT_TARGET:
        handleTargetSelection(target as BookingTarget);
        break;
      case BookingState.SELECT_PROGRAM:
        handleProgramSelection(target as BookingProgram);
        break;
      default:
        console.warn('Unexpected slider selection in state:', bookingState);
    }
  };

  return (
    <ChatContainer 
      messages={messages}
      showLoading={showLoading}
      loadingStep={loadingStep}
      loadingMessages={LOADING_MESSAGES}
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
  );
};

export default ChatBooking; 