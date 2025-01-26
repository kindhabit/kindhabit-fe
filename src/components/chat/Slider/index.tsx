import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/store/debug';
import { createDebugStyles } from '@/styles/debug';
import { SliderItem } from '@/types/slider';
import { colors } from '@/theme';
import { NavigatorContainer, NavigatorDot } from './styles';

interface DebugProps {
  'data-debug'?: boolean;
}

const SliderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SliderContainer = styled.div<DebugProps>`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-right: 20px;
  margin: 10px 0;
  
  ${createDebugStyles({
    name: 'MessageSection > SliderContainer',
    hierarchy: '6',
    color: '#FF8844'
  })}
`;

const Card = styled.div<DebugProps & { $selected?: boolean; $index?: number }>`
  min-width: 200px;
  max-width: 240px;
  padding: 12px;
  border-radius: 20px;
  background-color: ${({ theme }) => {
    const color = theme.colors.chat.slider.card.background;
    const alpha = theme.colors.chat.slider.card.backgroundAlpha;
    // hex to rgba 변환
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }};
  border: 1.5px solid ${props => 
    props.$selected 
      ? props.theme.colors.chat.slider.card.selectedBorder 
      : props.theme.colors.chat.slider.card.border};
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.chat.slider.card.shadow};
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0;
  animation: cardAppear 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: ${props => props.$index ? props.$index * 0.5 : 0}s;
  
  @keyframes cardAppear {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.chat.slider.card.selectedBorder};
    box-shadow: 0 6px 12px ${({ theme }) => theme.colors.chat.slider.card.hoverShadow};
  }
  
  ${createDebugStyles({
    name: 'SliderContainer > Card',
    hierarchy: '7',
    color: '#88FF44'
  })}
`;

const IconWrapper = styled.div<DebugProps>`
  font-size: 32px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  
  ${createDebugStyles({
    name: 'Card > IconWrapper',
    hierarchy: '8',
    color: '#4488FF'
  })}
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E8E1D9;
  margin-bottom: 8px;
`;

const HeaderTitle = styled.div<DebugProps>`
  font-size: 14px;
  font-weight: 600;
  
  ${createDebugStyles({
    name: 'Card > HeaderTitle',
    hierarchy: '8',
    color: '#44FF88'
  })}
`;

const CardDescription = styled.div<DebugProps>`
  font-size: 12px;
  color: #666;
  margin-bottom: 12px;
  min-height: 32px;
  line-height: 1.4;
  
  ${createDebugStyles({
    name: 'Card > CardDescription',
    hierarchy: '8',
    color: '#8844FF'
  })}
`;

const TagContainer = styled.div<DebugProps>`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  
  ${createDebugStyles({
    name: 'Card > TagContainer',
    hierarchy: '8',
    color: '#FF4488'
  })}
`;

const Tag = styled.span<DebugProps>`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  background-color: #E3F2FD;
  color: #1976D2;
  
  ${createDebugStyles({
    name: 'TagContainer > Tag',
    hierarchy: '9',
    color: '#FF8844'
  })}
`;

interface SliderProps {
  items: SliderItem[];
  onComplete: () => void;
  onAction?: (item: SliderItem) => void;
}

const Slider: React.FC<SliderProps> = ({ items, onComplete, onAction }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const debugMode = useRecoilValue(debugModeState);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.firstElementChild?.clientWidth || 0;
      const newIndex = Math.round(scrollLeft / (cardWidth + 8));
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  const handleSelect = (index: number) => {
    setCurrentIndex(index);
    const selectedItem = items[index];
    
    if (selectedItem.action && onAction) {
      onAction(selectedItem);
    }
    
    if (containerRef.current) {
      const cards = containerRef.current.children;
      if (cards[index]) {
        cards[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        });
      }
    }
  };

  return (
    <SliderSection>
      <SliderContainer 
        data-debug={debugMode} 
        ref={containerRef}
        onScroll={handleScroll}
      >
        {items.map((item, index) => (
          <Card 
            key={item.id}
            data-debug={debugMode}
            $selected={index === currentIndex}
            onClick={() => handleSelect(index)}
          >
            <TitleRow>
              <IconWrapper data-debug={debugMode}>
                {item.icon?.emoji}
              </IconWrapper>
              <HeaderTitle data-debug={debugMode}>
                {item.title}
              </HeaderTitle>
            </TitleRow>
            <CardDescription data-debug={debugMode}>
              {item.description}
            </CardDescription>
            {item.tags && (
              <TagContainer data-debug={debugMode}>
                {item.tags.map((tag, index) => (
                  <Tag key={index} data-debug={debugMode}>
                    {tag}
                  </Tag>
                ))}
              </TagContainer>
            )}
          </Card>
        ))}
      </SliderContainer>
      <NavigatorContainer data-debug={debugMode}>
        {Array.from({ length: items.length }, (_, i) => (
          <NavigatorDot
            key={i}
            $active={i === currentIndex}
            onClick={() => handleSelect(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </NavigatorContainer>
    </SliderSection>
  );
};

export default Slider; 