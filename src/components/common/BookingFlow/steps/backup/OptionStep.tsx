import React, { useState } from 'react';
import { BookingStepProps } from '../BookingFlow_types';
import { StepContainer, OptionsGrid, StyledFlowSplash } from '../BookingFlow_styles';

const OptionStep: React.FC<BookingStepProps> = ({
  onNext,
  onBack,
  bookingData,
  onUpdateBookingData,
  bookingState
}) => {
  const [showSplash, setShowSplash] = useState(false);

  const handleOptionSelect = async (option: string) => {
    setShowSplash(true);
    
    if (option === 'date') {
      setTimeout(() => {
        setShowSplash(false);
        onNext('date-select');
      }, 1000);
    }
  };

  return (
    <StepContainer>
      <OptionsGrid>
        {/* ... existing options ... */}
      </OptionsGrid>
      <StyledFlowSplash 
        variant="flowItem"
        isVisible={showSplash}
        animation="pulse"
        variantProps={{
          $verticalAlign: 'bottom',
          $offset: 80
        }}
      />
    </StepContainer>
  );
};

export default OptionStep; 