import React, { useState, useEffect } from 'react';
import { BookingStepProps } from '../BookingFlow_types';
import Selector from '../../Selector/Selector_index';
import { bookingAPI, HospitalAvailabilityResponse } from '@/core/api/booking';
import { StepContainer } from '../BookingFlow_styles';
import styled from 'styled-components';

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const DateStep: React.FC<BookingStepProps> = ({ onNext, onBack, onUpdateBookingData }) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [availableHospitals, setAvailableHospitals] = useState<HospitalAvailabilityResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAvailability = async () => {
      setIsLoading(true);
      try {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1);
        
        const data = await bookingAPI.getHospitalAvailability(startDate, endDate);
        setAvailableHospitals(data);
      } catch (error) {
        console.error('병원 가용성 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailability();
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDates([date]);
    onUpdateBookingData?.({ selectedDate: date });
  };

  const handleButtonClick = () => {
    if (selectedDates.length > 0) {
      onNext('hospital-list');
    }
  };

  const renderDateContent = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const hospitalData = availableHospitals.find(h => h.date === dateStr);
    
    if (hospitalData) {
      return (
        <div className="date-content">
          <span className="hospital-count">{hospitalData.count}개 병원</span>
        </div>
      );
    }
    return null;
  };

  return (
    <StepContainer>
      {isLoading && (
        <LoadingOverlay>
          <div>로딩 중...</div>
        </LoadingOverlay>
      )}
      <Selector
        selectedDates={selectedDates}
        onDateSelect={handleDateSelect}
        minDate={new Date()}
        maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
        checkupType="일반+특수 건강검진"
        subtitle="희망하시는 검진일을 선택해주세요"
        buttonText="선택 완료"
        onButtonClick={handleButtonClick}
        renderDateContent={renderDateContent}
        checkboxOptions={[
          { id: 'morning', label: '오전 예약 가능', checked: false, onChange: () => {} },
          { id: 'afternoon', label: '오후 예약 가능', checked: false, onChange: () => {} }
        ]}
        showDateContent={true}
      />
    </StepContainer>
  );
};

export default DateStep; 
