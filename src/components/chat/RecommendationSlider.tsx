import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Box, Paper, Typography, Chip } from '@mui/material';
import styled from '@emotion/styled';
import { Theme as MuiTheme, useTheme } from '@mui/material/styles';
import { Recommendation } from '@/types/health.types';
import { colors } from '@/theme';
import { debounce } from 'lodash';
import SectionTitle from '@/components/common/SectionTitle';

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
  font-family: 'Pretendard';
  font-size: 18px;
  font-weight: 600;
  color: ${colors.brown};
  margin-bottom: 12px;
`;

const ReasonText = styled(Typography)`
  font-family: 'Pretendard';
  font-size: 14px;
  color: ${colors.textSecondary};
  line-height: 1.6;
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

const SliderContainer = styled('div')<{ $show: boolean }>`
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  touch-action: pan-x pinch-zoom;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  margin: 0 -16px;
  padding: 0 16px;
  opacity: ${props => props.$show ? 1 : 0};
  transition: opacity 0.5s ease;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardList = styled('div')`
  display: flex;
  gap: 16px;
  width: max-content;  // 카드들이 한 줄로 나열되도록
`;

const Card = styled(Paper)`
  width: 200px;
  padding: 16px;
  border-radius: 16px;
  cursor: pointer;
  background: white;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
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
  padding: 8px;  // 호버 영역 확장
`;

const Dot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active: boolean }>(({ active }) => ({
  width: 6,
  height: 6,
  borderRadius: '50%',
  backgroundColor: active ? colors.primary : 'rgba(107, 68, 35, 0.2)',
  transform: active ? 'scale(1.2)' : 'scale(1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  
  '&:hover': {
    transform: 'scale(1.3)',
    backgroundColor: colors.primary,
  }
}));

const SliderWrapper = styled('div')<{ $show: boolean }>`
  padding: 20px 16px;
  background: ${colors.dashboard.background};
  opacity: ${props => props.$show ? 1 : 0};
  transition: opacity 0.5s ease;
`;

const SlideCard = styled(Paper)<{ delay: number }>`
  padding: 24px;
  border-radius: 24px;
  background: #ffffff;
  margin-right: 12px;
  min-width: 260px;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 16px rgba(107, 68, 35, 0.08);
  border: 1px solid rgba(107, 68, 35, 0.12);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  scroll-snap-align: start;
  opacity: 0;
  animation: slideIn 0.5s ease forwards;
  animation-delay: ${props => props.delay}ms;
  transform-origin: center bottom;
  
  &:first-of-type {
    margin-left: 0;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 32px rgba(107, 68, 35, 0.16);
    border-color: ${colors.primary}40;
    background: linear-gradient(to bottom, #ffffff, ${colors.primary}05);
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
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

interface RecommendationSliderProps {
  onCardClick: (ingredient: string) => void;
  show: boolean;
  onLoadComplete?: () => void;
}

const RecommendationSlider: React.FC<RecommendationSliderProps> = ({ 
  onCardClick, 
  show = true,
  onLoadComplete
}) => {
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

  const handleScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const cardWidth = 260 + 12; // 카드 너비 + 마진
    const scrollLeft = slider.scrollLeft;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    
    // 끝에 도달했을 때 처리
    if (Math.abs(scrollLeft - maxScroll) < 10) {
      requestAnimationFrame(() => {
        setActiveIndex(recommendations.length - 1);
      });
      return;
    }

    const newIndex = Math.round(scrollLeft / cardWidth);
    requestAnimationFrame(() => {
      setActiveIndex(Math.min(newIndex, recommendations.length - 1));
    });
  }, [recommendations.length]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener('scroll', handleScroll, { passive: true });
    
    const resizeObserver = new ResizeObserver(() => {
      handleScroll();
    });
    resizeObserver.observe(slider);

    return () => {
      slider.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, [handleScroll]);

  const scrollToCard = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const cardWidth = 260 + 12;
    slider.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
  };

  const handleCardClick = (ingredient: string) => {
    console.log('Card clicked:', ingredient);
    setSelectedCard(ingredient);
    onCardClick(ingredient);
  };

  useEffect(() => {
    // 마지막 카드의 애니메이션이 끝나면 onLoadComplete 호출
    const lastCardDelay = recommendations.length * 150 + 500; // 마지막 카드 애니메이션 완료 시간
    const timer = setTimeout(() => {
      onLoadComplete?.();
    }, lastCardDelay);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SliderWrapper $show={show}>
      <SliderContainer $show={show} ref={sliderRef}>
        {recommendations.map((rec, index) => (
          <SlideCard 
            key={index} 
            delay={index * 150}
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
            onClick={() => scrollToCard(index)}
            onMouseEnter={() => scrollToCard(index)}  // 호버 시 스크롤
          />
        ))}
      </DotContainer>
    </SliderWrapper>
  );
};

export default RecommendationSlider; 