import React, { useState } from 'react';
import { BookingStepProps } from '../BookingFlow_types';
import { StepContainer, StyledFlowSplash } from '../BookingFlow_styles';
import styled from 'styled-components';
import { AvailableDatesResponse } from '@/services/xog/booking/types';

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 8px;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  text-align: center;
  white-space: pre-line;
`;

const CardDescription = styled.p`
  font-size: 14px;
  text-align: center;
  white-space: pre-line;
  color: ${props => props.theme.colors.text.secondary};
`;

const Icon = styled.div`
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledOptionCard = styled.div<{ $type: 'date' | 'hospital'; $selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  background: ${props => props.$selected ? props.theme.colors.primary + '10' : '#FFFFFF'};
  border: ${props => props.$selected ? `1px solid ${props.theme.colors.primary}40` : 'none'};
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), 
              box-shadow 0.2s ease,
              background 0.2s ease;
  box-shadow: ${props => props.$selected 
    ? '0 4px 12px rgba(0, 0, 0, 0.1)'
    : '0 2px 4px rgba(0, 0, 0, 0.05)'};
  will-change: transform;

  &:hover {
    background: #D9EBFFB0;
    transform: translateY(-8px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }

  &:active {
    transform: translateY(-4px);
  }
`;

const OptionsStep: React.FC<BookingStepProps> = ({
  onNext,
  onBack,
  bookingData,
  onUpdateBookingData,
  bookingState,
  availableDates,
  onAvailableDatesUpdate
}) => {
  const [showSplash, setShowSplash] = useState(false);

  const handleDateFirstClick = async () => {
    try {
      if (!bookingState) return;
      
      console.log('날짜 우선 예약 시작:', { bookingData });
      
      onUpdateBookingData?.({ 
        selectedOption: 'date',
        checkupType: bookingData?.checkupType || '일반+특수'
      });
      setShowSplash(true);
      const counts = await bookingState.handleDateFirstBooking(bookingData?.checkupType || '일반+특수');
      console.log('날짜별 가용 병원 수:', counts);
      
      const availableDates = Object.entries(counts).map(([date, count]) => {
        const dateData = bookingState.getHospitalsForDate(date);
        return {
          date,
          availableHospitals: count,
          hospitals: dateData
        };
      });
      
      const response: AvailableDatesResponse = {
        status: 'success' as const,
        code: 'SUCCESS',
        message: 'OK',
        data: {
          dates: availableDates,
          total: availableDates.length
        }
      };
      console.log('생성된 응답 데이터:', response);

      onAvailableDatesUpdate?.(response);
      setTimeout(() => {
        setShowSplash(false);
        onNext('date');
      }, 3000);
    } catch (error) {
      console.error('날짜 우선 예약 처리 중 오류:', error);
      setShowSplash(false);
    }
  };

  const handleHospitalFirstClick = () => {
    onUpdateBookingData?.({ selectedOption: 'hospital' });
    setShowSplash(true);
    setTimeout(() => {
      setShowSplash(false);
      onNext('hospital');
    }, 3000);
  };

  return (
    <StepContainer>
      <CardGrid>
        <StyledOptionCard 
          $type="date" 
          $selected={bookingData?.selectedOption === 'date'}
          onClick={handleDateFirstClick}
        >
          <Icon>📅</Icon>
          <CardTitle>날짜 우선으로{'\n'}예약하기</CardTitle>
          <CardDescription>희망하는 날짜를{'\n'}우선 선택하여{'\n'}예약합니다</CardDescription>
        </StyledOptionCard>
        <StyledOptionCard 
          $type="hospital" 
          $selected={bookingData?.selectedOption === 'hospital'}
          onClick={handleHospitalFirstClick}
        >
          <Icon>🏥</Icon>
          <CardTitle>병원 우선으로{'\n'}예약하기</CardTitle>
          <CardDescription>희망하는 병원을{'\n'}우선 선택하여{'\n'}예약합니다</CardDescription>
        </StyledOptionCard>
      </CardGrid>
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

export default OptionsStep; 