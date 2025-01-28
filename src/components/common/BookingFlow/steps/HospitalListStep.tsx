import React, { useState, useEffect } from 'react';
import { BookingStepProps, Hospital } from '../BookingFlow_types';
import { ReservationOptionsGrid, ReservationOptionCard } from '../../Modal/Modal_styles';
import styled from 'styled-components';

const HospitalGrid = styled(ReservationOptionsGrid)`
  grid-template-columns: 1fr;
  gap: 12px;
`;

const HospitalCard = styled(ReservationOptionCard)`
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  gap: 16px;
  
  .hospital-thumbnail {
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
  }

  .hospital-content {
    flex: 1;
    text-align: left;
    
    h3 {
      text-align: left;
      margin-bottom: 4px;
    }

    p {
      text-align: left;
      margin-bottom: 8px;
    }

    .tags {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      
      span {
        padding: 4px 8px;
        border-radius: 6px;
        background: ${props => props.theme.colors.primary}08;
        color: ${props => props.theme.colors.primary};
        font-size: 12px;
      }
    }
  }
`;

const HospitalListStep: React.FC<BookingStepProps> = ({ onNext, onBack, bookingData, onUpdateBookingData }) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    // TODO: API 호출로 변경
    const fetchHospitals = async () => {
      // 임시 데이터
      const data: Hospital[] = [
        {
          id: '1',
          name: '한국의료재단 IFC 종합검진',
          address: '서울 영등포구 국제금융로 10',
          tags: ['일반+특수', '종합'],
          image: '/images/hospital1.jpg'
        },
        {
          id: '2',
          name: '구로성심병원',
          address: '서울 영등포구 국제금융로 10',
          tags: ['일반+특수', '종합'],
          image: '/images/hospital2.jpg'
        }
      ];
      
      setHospitals(data);
    };

    fetchHospitals();
  }, []);

  const handleHospitalSelect = (hospital: Hospital) => {
    onUpdateBookingData?.({ selectedHospital: hospital });
    onNext('basic-checkup');
  };

  return (
    <HospitalGrid>
      {hospitals.map(hospital => (
        <HospitalCard
          key={hospital.id}
          $type="hospital"
          onClick={() => handleHospitalSelect(hospital)}
        >
          <div className="hospital-thumbnail">
            <img src={hospital.image} alt={hospital.name} />
          </div>
          <div className="hospital-content">
            <h3>{hospital.name}</h3>
            <p>{hospital.address}</p>
            <div className="tags">
              {hospital.tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </div>
          </div>
        </HospitalCard>
      ))}
    </HospitalGrid>
  );
};

export default HospitalListStep; 