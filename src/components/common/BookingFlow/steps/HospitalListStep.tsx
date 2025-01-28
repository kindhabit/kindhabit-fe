import React, { useState, useEffect } from 'react';
import { BookingStepProps } from '../BookingFlow_types';
import { Hospital } from '@/services/xog/booking/types';
import { CardContainer, TitleSection, Title, TagContainer, Tag, Button } from '../../Card/Card_styles';
import styled from 'styled-components';
import { BookingAPI } from '@/services/xog/booking/api/client';
import { Splash } from '@/components/common/Splash';
import { EmptyState } from '@/components/base';
import { StepContainer } from '../BookingFlow_styles';

const HospitalGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

const EmptyThumbnail = styled.div`
  width: 120px;
  height: 120px;
  background-color: ${props => props.theme.colors.background.secondary};
  border-radius: 12px;
`;

const HospitalListStep: React.FC<BookingStepProps> = ({ 
  onNext, 
  onBack, 
  onUpdateBookingData,
  bookingData,
  availableDates 
}) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!bookingData?.selectedDate || !availableDates?.data?.dates) return;
    
    // 선택된 날짜의 병원 목록 찾기
    const selectedDateStr = bookingData.selectedDate.toISOString().split('T')[0];
    const selectedDateData = availableDates.data.dates.find(d => d.date === selectedDateStr);
    
    if (selectedDateData?.hospitals) {
      setHospitals(selectedDateData.hospitals);
    }
  }, [bookingData?.selectedDate, availableDates]);

  if (isLoading) {
    return (
      <StepContainer>
        <Splash
          variant="standalone"
          message="병원 목록을 불러오는 중입니다..."
          isVisible={true}
          animation="pulse"
        />
      </StepContainer>
    );
  }

  if (hospitals.length === 0) {
    return (
      <StepContainer>
        <EmptyState>
          선택하신 날짜에 예약 가능한 병원이 없습니다.
          <br />
          다른 날짜를 선택해주세요.
        </EmptyState>
      </StepContainer>
    );
  }

  return (
    <StepContainer>
      <HospitalGrid>
        {hospitals.map(hospital => (
          <CardContainer
            key={hospital.id}
            $type="hospital"
            onClick={() => {
              onNext('time-select');
            }}
          >
            <div className="hospital-thumbnail">
              <img 
                src={`/images/hospitals/${hospital.id}.jpg`} 
                onError={(e) => {
                  e.currentTarget.src = '/images/hospital-default.jpg';  // 기본 이미지 경로
                  e.currentTarget.onerror = null;  // 무한 루프 방지
                }}
                alt={hospital.name}
              />
            </div>
            <div className="hospital-content">
              <TitleSection>
                <Title>{hospital.name}</Title>
                <span className="subtitle">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 8.5C9.10457 8.5 10 7.60457 10 6.5C10 5.39543 9.10457 4.5 8 4.5C6.89543 4.5 6 5.39543 6 6.5C6 7.60457 6.89543 8.5 8 8.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 6.5C13 11 8 14.5 8 14.5C8 14.5 3 11 3 6.5C3 3.18629 5.23858 1 8 1C10.7614 1 13 3.18629 13 6.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {hospital.address}
                </span>
              </TitleSection>
              
              <TagContainer>
                {hospital.availableCheckups.map((checkup, idx) => (
                  <Tag 
                    key={`${hospital.id}-tag-${idx}`}
                    $type="default"
                  >
                    {checkup}
                  </Tag>
                ))}
              </TagContainer>
              
              <Button>선택하기</Button>
            </div>
          </CardContainer>
        ))}
      </HospitalGrid>
    </StepContainer>
  );
};

export default HospitalListStep; 