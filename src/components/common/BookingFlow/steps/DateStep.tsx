import React, { useState, useMemo, useEffect } from 'react';
import { BookingStepProps } from '../BookingFlow_types';
import { StepContainer, StyledFlowSplash } from '../BookingFlow_styles';
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
  const [selectedDates, setSelectedDates] = useState<Date[]>(
    bookingData?.selectedDate ? [bookingData.selectedDate] : []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  // 가용 병원 수는 이미 변환된 형태로 전달됨
  const availableCounts = useMemo(() => {
    if (!propAvailableDates?.data?.dates) return {};
    
    return propAvailableDates.data.dates.reduce((acc, date) => {
      acc[date.date] = date.availableHospitals;
      return acc;
    }, {} as Record<string, number>);
  }, [propAvailableDates]);

  // bookingData.selectedDate가 변경될 때 selectedDates 업데이트
  useEffect(() => {
    if (bookingData?.selectedDate) {
      setSelectedDates([bookingData.selectedDate]);
    }
  }, [bookingData?.selectedDate]);

  const handleDateSelect = (dates: Date[]) => {
    if (dates.length === 0) return;
    
    setSelectedDates(dates);
    onUpdateBookingData?.({ 
      selectedDate: dates[0] 
    });
  };

  const handleButtonClick = () => {
    if (selectedDates.length > 0) {
      setShowSplash(true);
      setTimeout(() => {
        setShowSplash(false);
        onNext('hospital-list');
      }, 3000);
    }
  };

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

export default DateStep; 
