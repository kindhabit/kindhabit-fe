import React from 'react';
import { BookingStepProps } from '../BookingFlow_types';
import { StepContainer } from '../BookingFlow_styles';

const HospitalStep: React.FC<BookingStepProps> = ({
  onNext,
  onBack,
  bookingData,
  onUpdateBookingData,
  bookingState
}) => {
  return (
    <StepContainer>
      {/* 병원 선택 UI 구현 */}
    </StepContainer>
  );
};

export default HospitalStep; 