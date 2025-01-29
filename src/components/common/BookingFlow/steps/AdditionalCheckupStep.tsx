import React, { useState, useEffect } from 'react';
import { BookingStepProps, CheckupItem } from '../BookingFlow_types';
import Card from '../../Card/Card_index';
import { CardGrid } from '../../Card/Card_styles';
import styled from 'styled-components';
import { bookingAPI } from '@/core/api/booking';
import { StepContainer, StyledFlowSplash } from '../BookingFlow_styles';

const CheckupSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
`;

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 8px;
`;

const AdditionalCheckupStep: React.FC<BookingStepProps> = ({ onNext, onBack, bookingData, onUpdateBookingData }) => {
  const [ctCheckups, setCtCheckups] = useState<CheckupItem[]>([]);
  const [ultraCheckups, setUltraCheckups] = useState<CheckupItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const fetchCheckups = async () => {
      if (!bookingData?.selectedHospital?.id) return;

      setIsLoading(true);
      try {
        const data = await bookingAPI.getCheckupPrograms(bookingData.selectedHospital.id);
        setCtCheckups(data.additionalCheckups.ct);
        setUltraCheckups(data.additionalCheckups.ultrasound);
      } catch (error) {
        console.error('검진 프로그램 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCheckups();
  }, [bookingData?.selectedHospital?.id]);

  const handleCheckupSelect = (checkup: CheckupItem, type: 'ct' | 'ultra') => {
    const updateCheckups = (items: CheckupItem[]) =>
      items.map(item =>
        item.id === checkup.id ? { ...item, isSelected: !item.isSelected } : item
      );

    if (type === 'ct') {
      const updated = updateCheckups(ctCheckups);
      setCtCheckups(updated);
      onUpdateBookingData?.({
        additionalCheckups: [...updated, ...ultraCheckups]
      });
    } else {
      const updated = updateCheckups(ultraCheckups);
      setUltraCheckups(updated);
      onUpdateBookingData?.({
        additionalCheckups: [...ctCheckups, ...updated]
      });
    }
  };

  const handleNext = () => {
    const selectedCheckups = [
      ...ctCheckups.filter(item => item.isSelected),
      ...ultraCheckups.filter(item => item.isSelected)
    ];
    onUpdateBookingData?.({ additionalCheckups: selectedCheckups });
    setShowSplash(true);
    setTimeout(() => {
      setShowSplash(false);
      onNext(bookingData?.selectedHospital ? 'date-selection' : 'hospital');
    }, 3000);
  };

  const formatPrice = (price: number) => {
    if (price === 0) return '선택 완료';
    return `+${price.toLocaleString()}원`;
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <CheckupSection>
      <div>
        <SectionTitle>CT</SectionTitle>
        <CardGrid $columns={1} $gap="8px">
          {ctCheckups.map(checkup => (
            <Card
              key={checkup.id}
              id={checkup.id}
              type="default"
              title={checkup.name}
              description={formatPrice(checkup.price || 0)}
              selected={checkup.isSelected}
              onClick={() => handleCheckupSelect(checkup, 'ct')}
            />
          ))}
        </CardGrid>
      </div>

      <div>
        <SectionTitle>초음파</SectionTitle>
        <CardGrid $columns={1} $gap="8px">
          {ultraCheckups.map(checkup => (
            <Card
              key={checkup.id}
              id={checkup.id}
              type="default"
              title={checkup.name}
              description={formatPrice(checkup.price || 0)}
              selected={checkup.isSelected}
              onClick={() => handleCheckupSelect(checkup, 'ultra')}
            />
          ))}
        </CardGrid>
      </div>

      <button onClick={handleNext}>
        다음 단계
      </button>

      <StyledFlowSplash 
        variant="flowItem"
        isVisible={showSplash}
        animation="pulse"
        variantProps={{
          $verticalAlign: 'bottom',
          $offset: 80
        }}
      />
    </CheckupSection>
  );
};

export default AdditionalCheckupStep; 
