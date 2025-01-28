import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/core/store/debug';
import { createDebugStyles } from '@/core/styles/debug';
import { SliderItem } from '@/types/slider';
import { CardProps, StyledCardProps } from '@/components/common/Card/Card_types';
import Card from '@/components/common/Card/Card_index';
import { colors } from '@/theme';
import { NavigatorContainer, NavigatorDot } from './Slider_styles';
import { CardGrid } from '@/components/common/Card/Card_styles';

interface DebugProps {
  'data-debug'?: boolean;
}

interface Props {
  items: (SliderItem | CardProps)[];
  onComplete?: () => void;
  onAction?: (item: SliderItem | CardProps) => void;
  layoutType?: 'grid' | 'slider';
  gridColumns?: number;
  gap?: string;
  cardMinWidth?: string;
  cardMaxWidth?: string;
  cardPadding?: string;
  cardBorderRadius?: string;
  showNavigator?: boolean;
  showTags?: boolean;
  showDescription?: boolean;
  iconSize?: string;
  titleSize?: string;
  descriptionSize?: string;
}

const SliderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SliderContainer = styled.div<{ 'data-debug'?: boolean }>`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 10px;
  margin: 10px 0;
  
  /* Chrome, Safari, Opera */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }
  
  /* Firefox */
  scrollbar-width: none;
  
  /* IE, Edge */
  -ms-overflow-style: none;
  
  ${createDebugStyles({
    name: 'MessageSection > SliderContainer',
    hierarchy: '6',
    color: '#FF8844'
  })}
`;

const IconWrapper = styled.div<DebugProps & { $size?: string }>`
  font-size: ${props => props.$size || '32px'};
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E8E1D9;
  margin-bottom: 8px;
`;

const HeaderTitle = styled.div<DebugProps & { $size?: string }>`
  font-size: ${props => props.$size || '14px'};
  font-weight: 600;
`;

const CardDescription = styled.div<DebugProps & { $size?: string }>`
  font-size: ${props => props.$size || '12px'};
  color: #666;
  margin-bottom: 12px;
  min-height: 32px;
  line-height: 1.4;
`;

const TagContainer = styled.div<DebugProps>`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-top: auto;
`;

const Tag = styled.span<DebugProps>`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  background-color: #E3F2FD;
  color: #1976D2;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const Slider: React.FC<Props> = ({ 
  items, 
  onComplete, 
  onAction,
  layoutType = 'slider',
  gridColumns = 2,
  gap = '16px',
  cardMinWidth,
  cardMaxWidth,
  cardPadding,
  cardBorderRadius,
  showNavigator = true,
  showTags = true,
  showDescription = true,
  iconSize,
  titleSize,
  descriptionSize
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const debugMode = useRecoilValue(debugModeState);
  const containerRef = useRef<HTMLDivElement>(null);

  const styleProps: StyledCardProps = {
    $minWidth: cardMinWidth,
    $maxWidth: cardMaxWidth,
    $padding: cardPadding,
    $borderRadius: cardBorderRadius,
    $showTags: showTags,
    $showDescription: showDescription,
    $iconSize: iconSize,
    $titleSize: titleSize,
    $descriptionSize: descriptionSize
  };

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
    
    if (onAction) {
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

  const renderItem = (item: SliderItem | CardProps, index: number) => {
    const cardProps: CardProps = {
      id: item.id,
      type: 'default',
      title: item.title,
      description: item.description,
      icon: item.icon,
      tags: item.tags,
      selected: index === currentIndex,
      index,
      onClick: () => handleSelect(index),
      buttonText: 'selectionData' in item ? item.selectionData?.buttonText : undefined,
      ...styleProps
    } as CardProps;

    return <Card key={item.id} {...cardProps} />;
  };

  // Grid 레이아웃
  if (layoutType === 'grid') {
    return (
      <CardGrid $columns={gridColumns} $gap={gap}>
        {items.map((item, index) => renderItem(item, index))}
      </CardGrid>
    );
  }

  // Slider 레이아웃
  return (
    <SliderSection>
      <SliderContainer 
        data-debug={debugMode} 
        ref={containerRef}
        onScroll={handleScroll}
      >
        {items.map((item, index) => renderItem(item, index))}
      </SliderContainer>
      {showNavigator && items.length > 1 && (
        <NavigatorContainer>
          {items.map((_, index) => (
            <NavigatorDot
              key={index}
              $active={index === currentIndex}
              onClick={() => handleSelect(index)}
            />
          ))}
        </NavigatorContainer>
      )}
    </SliderSection>
  );
};

export default Slider; 