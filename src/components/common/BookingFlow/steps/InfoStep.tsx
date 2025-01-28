import React from 'react';
import { BookingStepProps, CheckupItem } from '../BookingFlow_types';
import styled from 'styled-components';
import { bookingAPI } from '@/core/api/booking';

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  background: ${props => props.theme.colors.background};
  border-radius: 8px;
`;

const Label = styled.span`
  font-size: 14px;
  color: ${props => props.theme.colors.text.secondary};
`;

const Value = styled.span`
  font-size: 16px;
  color: ${props => props.theme.colors.text.primary};
`;

const CheckupList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CheckupItemCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: ${props => props.theme.colors.background};
  border-radius: 8px;

  span {
    font-size: 14px;
    &.price {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${props => props.theme.colors.primary}10;
  border-radius: 8px;
  margin-top: 8px;

  span {
    font-size: 16px;
    font-weight: 600;
    &.price {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: 16px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const InfoStep: React.FC<BookingStepProps> = ({ onNext, onBack, bookingData }) => {
  const formatDate = (date?: Date) => {
    if (!date) return '-';
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }).format(date);
  };

  const calculateTotalPrice = (items?: CheckupItem[]) => {
    if (!items) return 0;
    return items.reduce((total, item) => total + (item.price || 0), 0);
  };

  const handleConfirm = async () => {
    if (!bookingData?.selectedHospital || !bookingData?.selectedDate) return;

    const allCheckups = [
      ...(bookingData.basicCheckups || []),
      ...(bookingData.additionalCheckups || [])
    ].filter(item => item.isSelected);

    const bookingRequest = {
      hospitalId: bookingData.selectedHospital.id,
      date: bookingData.selectedDate.toISOString().split('T')[0],
      checkups: allCheckups.map(item => item.id),
      consultationType: bookingData.consultationType || 'direct'
    };

    try {
      const result = await bookingAPI.createBooking(bookingRequest);
      if (result.success) {
        onNext('complete');
      }
    } catch (error) {
      console.error('예약 생성 실패:', error);
    }
  };

  const basicTotal = calculateTotalPrice(bookingData?.basicCheckups?.filter(item => item.isSelected));
  const additionalTotal = calculateTotalPrice(bookingData?.additionalCheckups?.filter(item => item.isSelected));
  const total = basicTotal + additionalTotal;

  return (
    <InfoSection>
      <Section>
        <SectionTitle>예약 정보</SectionTitle>
        <InfoRow>
          <Label>병원</Label>
          <Value>{bookingData?.selectedHospital?.name || '-'}</Value>
        </InfoRow>
        <InfoRow>
          <Label>검진일</Label>
          <Value>{formatDate(bookingData?.selectedDate)}</Value>
        </InfoRow>
      </Section>

      <Section>
        <SectionTitle>기본 검진</SectionTitle>
        <CheckupList>
          {bookingData?.basicCheckups?.filter(item => item.isSelected).map(checkup => (
            <CheckupItemCard key={checkup.id}>
              <span>{checkup.name}</span>
              <span className="price">
                {checkup.price ? `+${checkup.price.toLocaleString()}원` : '기본'}
              </span>
            </CheckupItemCard>
          ))}
        </CheckupList>
      </Section>

      <Section>
        <SectionTitle>추가 검진</SectionTitle>
        <CheckupList>
          {bookingData?.additionalCheckups?.filter(item => item.isSelected).map(checkup => (
            <CheckupItemCard key={checkup.id}>
              <span>{checkup.name}</span>
              <span className="price">
                {checkup.price ? `+${checkup.price.toLocaleString()}원` : '기본'}
              </span>
            </CheckupItemCard>
          ))}
        </CheckupList>
      </Section>

      <TotalPrice>
        <span>총 추가 금액</span>
        <span className="price">+{total.toLocaleString()}원</span>
      </TotalPrice>

      <ConfirmButton onClick={handleConfirm}>
        예약하기
      </ConfirmButton>
    </InfoSection>
  );
};

export default InfoStep; 