import React, { useState, useEffect } from 'react';
import { BookingStepProps, CheckupItem } from '../BookingFlow_types';
import Card from '../../Card/Card_index';
import { CardGrid } from '../../Card/Card_styles';
import styled from 'styled-components';
import { bookingAPI } from '@/core/api/booking';

const CheckupSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 8px;
`;

const BasicCheckupStep: React.FC<BookingStepProps> = ({ onNext, onBack, bookingData, onUpdateBookingData }) => {
  const [basicCheckups, setBasicCheckups] = useState<CheckupItem[]>([]);
  const [optionalCheckups, setOptionalCheckups] = useState<CheckupItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCheckups = async () => {
      if (!bookingData?.selectedHospital?.id) return;

      setIsLoading(true);
      try {
        const data = await bookingAPI.getCheckupPrograms(bookingData.selectedHospital.id);
        const required = data.basicCheckups.filter(item => item.isRequired);
        const optional = data.basicCheckups.filter(item => !item.isRequired);
        
        setBasicCheckups(required);
        setOptionalCheckups(optional);
      } catch (error) {
        console.error('검진 프로그램 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCheckups();
  }, [bookingData?.selectedHospital?.id]);

  const handleCheckupSelect = (checkup: CheckupItem) => {
    if (checkup.isRequired) return;

    const updatedCheckups = optionalCheckups.map(item =>
      item.id === checkup.id ? { ...item, isSelected: !item.isSelected } : item
    );
    setOptionalCheckups(updatedCheckups);

    const allCheckups = [...basicCheckups, ...updatedCheckups];
    onUpdateBookingData?.({ basicCheckups: allCheckups });
  };

  const handleNext = () => {
    const selectedCheckups = [...basicCheckups, ...optionalCheckups.filter(item => item.isSelected)];
    onUpdateBookingData?.({ basicCheckups: selectedCheckups });
    onNext('additional-checkup');
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <CheckupSection>
      <div>
        <SectionTitle>기본 검진</SectionTitle>
        <CardGrid $columns={1} $gap="8px">
          {basicCheckups.map(checkup => (
            <Card
              key={checkup.id}
              id={checkup.id}
              type="default"
              title={checkup.name}
              description="선택 완료"
              selected={true}
            />
          ))}
        </CardGrid>
      </div>

      <div>
        <SectionTitle>소화기 검진</SectionTitle>
        <CardGrid $columns={1} $gap="8px">
          {optionalCheckups.map(checkup => (
            <Card
              key={checkup.id}
              id={checkup.id}
              type="default"
              title={checkup.name}
              description={checkup.isSelected ? '선택 완료' : '선택 가능'}
              selected={checkup.isSelected}
              onClick={() => handleCheckupSelect(checkup)}
            />
          ))}
        </CardGrid>
      </div>

      <button onClick={handleNext}>
        다음 단계
      </button>
    </CheckupSection>
  );
};

export default BasicCheckupStep; 
