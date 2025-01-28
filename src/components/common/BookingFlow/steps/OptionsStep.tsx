import React, { useState } from 'react';
import { BookingStepProps } from '../BookingFlow_types';
import { OptionsGrid, OptionCard } from '../BookingFlow_styles';
import { Splash } from '@/components/common/Splash';
import styled from 'styled-components';

const OptionsContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const OptionsStep: React.FC<BookingStepProps> = ({ 
  onNext,
  bookingData,
  onUpdateBookingData,
  onAvailableDatesUpdate
}) => {
  const [showSplash, setShowSplash] = useState(false);

  return (
    <OptionsContainer>
      {showSplash && (
        <Splash
          variant="flowItem"
          isVisible={showSplash}
          animation="pulse"
        />
      )}
      <OptionsGrid>
        <OptionCard
          $type="date"
          onClick={async () => {
            if (!bookingData?.bookingState) return;
            
            console.log('🔍 [이벤트] 날짜 우선으로 예약하기 버튼 클릭');
            try {
              setShowSplash(true);
              const availableCounts = await bookingData.bookingState.handleDateFirstBooking();
              console.log('🔍 [이벤트] 날짜 조회 완료:', availableCounts);
              onAvailableDatesUpdate?.(availableCounts);
              setTimeout(() => {
                setShowSplash(false);
                onNext('date');
              }, 3000);
            } catch (error) {
              console.error('🔍 [에러] 날짜 정보 처리 중 오류:', error);
              setShowSplash(false);
            }
          }}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" 
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3>날짜 우선으로<br />예약하기</h3>
          <p>희망하는 날짜를{'\n'}우선 선택하여{'\n'}예약합니다</p>
        </OptionCard>

        <OptionCard
          $type="hospital"
          onClick={() => onNext('hospital')}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M3 9.11V14.88C3 17 3 17 5 18.35L10.5 21.53C11.33 22.01 12.68 22.01 13.5 21.53L19 18.35C21 17 21 17 21 14.89V9.11C21 7 21 7 19 5.65L13.5 2.47C12.68 1.99 11.33 1.99 10.5 2.47L5 5.65C3 7 3 7 3 9.11Z" 
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" 
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3>병원 우선으로<br />예약하기</h3>
          <p>희망하는 병원을{'\n'}우선 선택하여{'\n'}예약합니다</p>
        </OptionCard>
      </OptionsGrid>
    </OptionsContainer>
  );
};

export default OptionsStep; 