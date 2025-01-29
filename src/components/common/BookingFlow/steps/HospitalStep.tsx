import React, { useEffect, useState } from 'react';
import { BookingStepProps } from '../BookingFlow_types';
import { StepContainer, StyledFlowSplash } from '../BookingFlow_styles';
import { CardContainer } from '@/components/common/Card/Card_styles';
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
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; // iOS 스크롤 부드럽게
  
  // 스크롤바 숨기기
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  // IE and Edge
  scrollbar-width: none;  // Firefox
`;

const HospitalStep: React.FC<BookingStepProps> = ({
  onNext,
  onBack,
  bookingData,
  onUpdateBookingData,
  bookingState
}) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    if (!bookingState) return;
    
    // 모든 병원 데이터를 가져옵니다
    const fetchHospitals = async () => {
      const state = bookingState.getState();
      const allHospitals = await state.getAllHospitals();
      setHospitals(allHospitals);
    };

    fetchHospitals();
  }, [bookingState]);

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
          <CardContainer 
            key={hospital.id}
            $type="hospital-A"
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
          </CardContainer>
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

export default HospitalStep; 