import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { colors } from '@/theme';

interface RecommendationSliderProps {
  onCardClick: (ingredient: string) => void;
  show: boolean;
  onLoadComplete: () => void;
}

const SliderContainer = styled(Box)`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 4px;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled(Box)`
  min-width: 140px;
  padding: 16px;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const RecommendationSlider: React.FC<RecommendationSliderProps> = ({ 
  onCardClick, 
  show,
  onLoadComplete 
}) => {
  useEffect(() => {
    if (show) {
      onLoadComplete();
    }
  }, [show, onLoadComplete]);

  return (
    <SliderContainer>
      <Card onClick={() => onCardClick('프로바이오틱스')}>프로바이오틱스</Card>
      <Card onClick={() => onCardClick('오메가3')}>오메가3</Card>
      <Card onClick={() => onCardClick('비타민D')}>비타민D</Card>
    </SliderContainer>
  );
};

export default RecommendationSlider; 