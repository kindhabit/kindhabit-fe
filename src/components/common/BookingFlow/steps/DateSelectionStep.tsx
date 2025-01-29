import React from 'react';
import { BookingStepProps } from '../BookingFlow_types';
import { StepContainer } from '../BookingFlow_styles';

const DateSelectionStep: React.FC<BookingStepProps> = ({
  onNext,
  onBack,
  bookingData,
  onUpdateBookingData,
  bookingState
}) => {
  return (
    <StepContainer>
      {/* 날짜 선택 UI 구현 */}
    </StepContainer>
  );
};

export default DateSelectionStep; 