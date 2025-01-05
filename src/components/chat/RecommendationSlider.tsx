import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Box, Paper, Typography, Chip } from '@mui/material';
import styled from '@emotion/styled';
import { Theme as MuiTheme, useTheme } from '@mui/material/styles';
import { Recommendation } from '@/types/health.types';
import { colors } from '@/theme';
import { debounce } from 'lodash';

// Theme 타입 정의
const defaultTheme = {
  typography: {
    fontFamily: 'Pretendard, sans-serif'
  },
  palette: {
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary
    }
  }
};

const IngredientTitle = styled(Typography)`
  font-family: ${defaultTheme.typography.fontFamily};
  font-size: 20px;
  font-weight: 600;
  color: ${defaultTheme.palette.text.primary};
  margin-bottom: 12px;
`;

const ReasonText = styled(Typography)`
  font-family: ${defaultTheme.typography.fontFamily};
  font-size: 14px;
  color: ${defaultTheme.palette.text.secondary};
  line-height: 1.6;
`;

const HeaderText = styled(Typography)`
  font-family: ${defaultTheme.typography.fontFamily};
  font-size: 18px;
  font-weight: 600;
  color: ${defaultTheme.palette.text.primary};
  margin-bottom: 20px;
  padding: 0 4px;
`;

const Dot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active: boolean }>(({ active }) => ({
  width: 6,
  height: 6,
  borderRadius: '50%',
  backgroundColor: active ? defaultTheme.palette.text.primary : 'rgba(0, 0, 0, 0.2)',
  transition: 'all 0.2s ease-in-out'
}));

const SliderWrapper = styled(Box)`
  padding: 20px 16px;
  background: ${colors.background};
`;

const SlideCard = styled(Paper)`
  padding: 24px;
  border-radius: 24px;
  background: ${colors.cardBg};
  margin-right: 12px;
  min-width: 260px;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  scroll-snap-align: start;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    border-color: ${colors.primary}20;
  }
`;

const IconContainer = styled(Box)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  transition: all 0.3s ease;

  ${SlideCard}:hover & {
    transform: scale(1.1) rotate(5deg);
    background: ${colors.primary}10;
  }
`;

const ReasonContainer = styled(Box)`
  background: rgba(0, 0, 0, 0.03);
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 16px;
`;

const Divider = styled(Box)`
  height: 1px;
  background: rgba(0, 0, 0, 0.06);
  margin: 16px 0;
`;

const SliderContainer = styled(Box)`
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 4px 0;
  margin: 0 -16px;
  padding: 0 16px;
  touch-action: pan-x pinch-zoom;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardFooter = styled(Box)`
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const TagChip = styled(Chip)`
  height: 28px;
  padding: 0 12px;
  background: rgba(25, 118, 210, 0.08);
  color: #1976d2;
  font-size: 13px;
  border-radius: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    background: rgba(25, 118, 210, 0.12);
  }
`;

const DotContainer = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

interface RecommendationSliderProps {
  onCardClick: (ingredient: string) => void;
}

const RecommendationSlider: React.FC<RecommendationSliderProps> = ({ onCardClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const recommendations: Recommendation[] = [
    {
      ingredient: '프로바이오틱스',
      reason: '장 건강 개선이 필요해요',
      icon: '🦠',
      tags: ['장내 미생물 부족요', '면역력 저하요']
    },
    {
      ingredient: '오메가3',
      reason: '콜레스테롤 수치가 높아요',
      icon: '❤️',
      tags: ['수치 이상이에요', '혈관 건강해요']
    },
    {
      ingredient: '마그네슘',
      reason: '근육 경련이 잦으시네요',
      icon: '💪',
      tags: ['수면 질 개선해요', '근육 피로해요']
    },
    {
      ingredient: '비타민 D',
      reason: '실내 활동이 많으시네요',
      icon: '☀️',
      tags: ['면역력 저하요', '뼈 건강해요']
    },
    {
      ingredient: '루테인',
      reason: '디지털 기기 사용이 많아요',
      icon: '👁️',
      tags: ['시력 저하요', '청광 노출이에요']
    }
  ];

  const handleScroll = useCallback(
    debounce((scrollLeft: number) => {
      const cardWidth = 260 + 12;
      const maxScroll = sliderRef.current?.scrollWidth ?? 0 - (sliderRef.current?.clientWidth ?? 0);
      
      if (Math.abs(scrollLeft - maxScroll) < 10) {
        setActiveIndex(recommendations.length - 1);
      } else {
        const newIndex = Math.round(scrollLeft / cardWidth);
        setActiveIndex(Math.min(newIndex, recommendations.length - 1));
      }
    }, 100),
    [recommendations.length]
  );

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollHandler = () => handleScroll(slider.scrollLeft);
    slider.addEventListener('scroll', scrollHandler);
    return () => {
      handleScroll.cancel();
      slider.removeEventListener('scroll', scrollHandler);
    };
  }, [handleScroll]);

  const handleCardClick = (ingredient: string) => {
    console.log('Card clicked:', ingredient);
    setSelectedCard(ingredient);
    onCardClick(ingredient);
  };

  return (
    <SliderWrapper>
      <HeaderText>
        제리가 분석한 맞춤 영양소예요
      </HeaderText>
      <SliderContainer ref={sliderRef}>
        {recommendations.map((rec, index) => (
          <SlideCard 
            key={index} 
            elevation={0}
            onClick={() => handleCardClick(rec.ingredient)}
            sx={{ 
              cursor: 'pointer',
              ...(selectedCard === rec.ingredient && {
                borderColor: `${colors.primary}40`,
                background: `${colors.primary}05`,
              })
            }}
          >
            <IconContainer>
              <Typography fontSize="20px">{rec.icon}</Typography>
            </IconContainer>
            <IngredientTitle>
              {rec.ingredient}
            </IngredientTitle>
            <ReasonContainer>
              <ReasonText>
                {rec.reason}
              </ReasonText>
            </ReasonContainer>
            <Divider />
            <CardFooter>
              {rec.tags.map((tag, idx) => (
                <TagChip 
                  key={idx} 
                  label={tag}
                  size="small"
                />
              ))}
            </CardFooter>
          </SlideCard>
        ))}
      </SliderContainer>
      <DotContainer>
        {recommendations.map((_, index) => (
          <Dot 
            key={index} 
            active={index === activeIndex}
            onClick={() => {
              const slider = sliderRef.current;
              if (slider) {
                const cardWidth = 260 + 12;
                slider.scrollTo({
                  left: index * cardWidth,
                  behavior: 'smooth'
                });
              }
            }}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </DotContainer>
    </SliderWrapper>
  );
};

export default RecommendationSlider; 