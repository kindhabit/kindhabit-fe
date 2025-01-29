import React, { useEffect, useState } from 'react';
import { BookingStepProps } from '../BookingFlow_types';
import { StepContainer, StyledFlowSplash } from '../BookingFlow_styles';
import { CardContainer, selectedCardStyle } from '@/components/common/Card/Card_styles';
import { Hospital } from '@/services/xog/booking/types';
import styled from 'styled-components';

const hospitalImages = import.meta.glob('@/assets/hospital/*.(jpg|png|jpeg)', { eager: true }) as Record<string, { default: string }>;

const FixedContainer = styled(StepContainer)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
`;

const HospitalList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  padding-bottom: 20px;
`;

const HospitalCard = styled(CardContainer)<{ $selected?: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 16px;
  background: #FFFFFF;
  border: none;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s ease-out;

  ${props => props.$selected && selectedCardStyle}

  &:hover {
    background: ${props => props.theme.colors.primary}10;
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }

  .thumbnail {
    width: 120px;
    height: 120px;
    flex-shrink: 0;
    border-radius: 12px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .fallback {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F5F5F5;
      color: ${props => props.theme.colors.text.secondary};
      font-size: 14px;

      &.hidden {
        display: none;
      }
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .title {
      font-size: 18px;
      font-weight: 600;
      color: ${props => props.theme.colors.text.primary};
      margin: 0;
    }

    .subtitle {
      color: ${props => props.theme.colors.text.secondary};
      font-size: 14px;
      margin: 0;
    }

    .tags {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;

      .tag {
        padding: 4px 8px;
        background: #F5F5F5;
        border-radius: 6px;
        font-size: 12px;
        color: ${props => props.theme.colors.text.secondary};
      }
    }
  }
`;

const HospitalListStep: React.FC<BookingStepProps> = ({
  onNext,
  onBack,
  bookingData,
  onUpdateBookingData,
  bookingState
}) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    if (!bookingData?.selectedDate || !bookingState) return;

    const dateStr = bookingData.selectedDate.toISOString().split('T')[0];
    const availableDates = bookingState.getAvailableDates();
    const dateData = availableDates.find(date => date === dateStr);
    if (dateData) {
      setHospitals(bookingState.getHospitalsForDate(dateStr) || []);
    }
  }, [bookingData?.selectedDate, bookingState]);

  const handleHospitalSelect = (hospital: Hospital) => {
    setShowSplash(true);
    onUpdateBookingData?.({
      selectedHospital: hospital
    });
    setTimeout(() => {
      setShowSplash(false);
      onNext('basic-checkup');
    }, 3000);
  };

  return (
    <FixedContainer>
      <HospitalList>
        {hospitals.map((hospital) => (
          <HospitalCard 
            key={hospital.id}
            $selected={bookingData?.selectedHospital?.id === hospital.id}
            onClick={() => handleHospitalSelect(hospital)}
          >
            <div className="thumbnail">
              <img 
                src={hospitalImages[`/src/assets/hospital/${hospital.id}.jpg`]?.default || 
                     hospitalImages[`/src/assets/hospital/${hospital.id}.png`]?.default || 
                     hospitalImages[`/src/assets/hospital/${hospital.id}.jpeg`]?.default}
                alt={hospital.name}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="fallback hidden">{hospital.id}</div>
            </div>
            <div className="content">
              <h3 className="title">{hospital.name}</h3>
              <p className="subtitle">{hospital.address}</p>
              <div className="tags">
                {hospital.availableCheckups.map((tag: string, index: number) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </HospitalCard>
        ))}
      </HospitalList>
      <StyledFlowSplash 
        variant="flowItem"
        isVisible={showSplash}
        animation="pulse"
        variantProps={{
          $verticalAlign: 'bottom',
          $offset: 80
        }}
      />
    </FixedContainer>
  );
};

export default HospitalListStep; 