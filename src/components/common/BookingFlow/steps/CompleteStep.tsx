import React from 'react';
import { BookingStepProps } from '../BookingFlow_types';
import styled from 'styled-components';

const CompleteSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 40px 20px;
  text-align: center;
`;

const Icon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary}10;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary};

  svg {
    width: 32px;
    height: 32px;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
`;

const Description = styled.p`
  font-size: 16px;
  color: ${props => props.theme.colors.text.secondary};
  margin: 0;
  white-space: pre-line;
`;

const InfoBox = styled.div`
  width: 100%;
  padding: 20px;
  background: ${props => props.theme.colors.background};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 14px;
    &.label {
      color: ${props => props.theme.colors.text.secondary};
    }
    &.value {
      color: ${props => props.theme.colors.text.primary};
      font-weight: 500;
    }
  }
`;

const CloseButton = styled.button`
  width: 100%;
  padding: 16px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    opacity: 0.9;
  }
`;

const CompleteStep: React.FC<BookingStepProps> = ({ onBack, bookingData }) => {
  const formatDate = (date?: Date) => {
    if (!date) return '-';
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }).format(date);
  };

  return (
    <CompleteSection>
      <Icon>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Icon>
      <Title>예약이 완료되었습니다</Title>
      <Description>
        예약하신 내용을 확인해주세요.{'\n'}
        검진일 하루 전 안내 문자를 보내드립니다.
      </Description>

      <InfoBox>
        <InfoRow>
          <span className="label">병원</span>
          <span className="value">{bookingData?.selectedHospital?.name}</span>
        </InfoRow>
        <InfoRow>
          <span className="label">검진일</span>
          <span className="value">{formatDate(bookingData?.selectedDate)}</span>
        </InfoRow>
        <InfoRow>
          <span className="label">검진 항목</span>
          <span className="value">
            {[
              ...(bookingData?.basicCheckups || []),
              ...(bookingData?.additionalCheckups || [])
            ].filter(item => item.isSelected).length}개
          </span>
        </InfoRow>
      </InfoBox>

      <CloseButton onClick={onBack}>
        확인
      </CloseButton>
    </CompleteSection>
  );
};

export default CompleteStep; 