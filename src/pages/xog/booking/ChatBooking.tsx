import React from 'react';
import styled from 'styled-components';
import { ChatContainer } from '@/components/chat';
import { BookingTarget, BookingProgram } from '@/services/xog/booking/types';
import { LOADING_MESSAGES } from '@/services/xog/booking/constants';
import { ChatMessage } from '@/types/chat';

interface ChatBookingWrapperProps {
  sender?: never;
}

const ChatBookingWrapper = styled.div<ChatBookingWrapperProps>`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

interface ChatBookingProps {
  messages: ChatMessage[];
  showLoading: boolean;
  loadingStep: number;
  handleTargetSelection: (target: BookingTarget) => void;
  handleProgramSelection: (program: BookingProgram) => void;
}

export const ChatBooking: React.FC<ChatBookingProps> = ({
  messages,
  showLoading,
  loadingStep,
  handleTargetSelection,
  handleProgramSelection
}) => {
  const handleSliderSelect = (value: string) => {
    if (value === 'self' || value === 'family' || value === 'other') {
      handleTargetSelection(value as BookingTarget);
    } else if (value === 'normal' || value === 'premium' || value === 'special') {
      handleProgramSelection(value as BookingProgram);
    }
  };

  return (
    <ChatBookingWrapper>
      <ChatContainer
        messages={messages}
        showLoading={showLoading}
        loadingStep={loadingStep}
        loadingMessages={LOADING_MESSAGES}
        onSliderSelect={handleSliderSelect}
        sliderProps={{
          layoutType: 'grid',
          gridColumns: 1,
          gap: '16px',
          cardWidth: '100%',
          cardPadding: '20px',
          cardBorderRadius: '12px',
          showTags: true,
          iconSize: '32px',
          titleSize: '16px',
          descriptionSize: '14px'
        }}
      />
    </ChatBookingWrapper>
  );
}; 