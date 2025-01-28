import React, { useState, useMemo } from 'react';
import { BookingStepProps } from '../BookingFlow_types';
import { StepContainer } from '../BookingFlow_styles';
import { Splash } from '@/components/common/Splash';
import CheckupDateSelector from '@/components/common/CheckupDateSelector/CheckupDateSelector_index';
import styled from 'styled-components';

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DateStep: React.FC<BookingStepProps> = ({ 
  onNext, 
  onBack, 
  onUpdateBookingData,
  bookingData,
  availableDates: propAvailableDates 
}) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  // 가용 병원 수는 이미 변환된 형태로 전달됨
  const availableCounts = useMemo(() => {
    return propAvailableDates || {};
  }, [propAvailableDates]);

  const handleDateSelect = (date: Date | Date[]) => {
    if (Array.isArray(date)) {
      setSelectedDates(date);
      onUpdateBookingData?.({ selectedDate: date[0] });
    } else {
      setSelectedDates([date]);
      onUpdateBookingData?.({ selectedDate: date });
    }
  };

  const handleButtonClick = () => {
    if (selectedDates.length > 0) {
      onNext('hospital-list');
    }
  };

  if (showSplash) {
    return (
      <Splash
        variant="standalone"
        message="가용 병원을 조회하는 중입니다..."
        isVisible={true}
        animation="pulse"
      />
    );
  }

  return (
    <StepContainer>
      {isLoading && (
        <LoadingOverlay>
          <div>로딩 중...</div>
        </LoadingOverlay>
      )}
      <CheckupDateSelector
        selectedDates={selectedDates}
        onDateSelect={handleDateSelect}
        minDate={new Date()}
        maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
        availableCounts={availableCounts}
        maxSelections={1}
        buttonText="선택 완료"
        onButtonClick={handleButtonClick}
        renderDateContent={(date) => {
          const dateStr = date.toISOString().split('T')[0];
          const count = availableCounts[dateStr];
          
          if (count) {
            return (
              <div className="date-content">
                <span className="available-count">{count}</span>
              </div>
            );
          }
          return null;
        }}
        showDateContent={true}
      />
    </StepContainer>
  );
};

export default DateStep; 
