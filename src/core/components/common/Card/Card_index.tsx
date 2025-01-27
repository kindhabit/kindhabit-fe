import React, { useState, useRef } from 'react';
import { CardProps, CardLayoutProps } from './Card_types';
import {
  CardContainer,
  SliderContainer,
  CardSlider,
  SliderDots,
  SliderDot,
  IconWrapper,
  Title,
  Subtitle,
  Description,
  TagContainer,
  Tag,
  Button,
  CardGrid,
  HeaderSection,
  TitleSection,
  CheckIcon
} from "./Card_styles";

interface CardListProps {
  cards: CardProps[];
  layout: CardLayoutProps;
}

export const CardList: React.FC<CardListProps> = ({
  cards,
  layout
}) => {
  const { layoutType, gap, gridColumns } = layout;
  console.log('[CardList] Props:', { 
    layoutType, 
    gap, 
    gridColumns,
    cardsCount: cards.length 
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Grid 레이아웃
  if (layoutType === 'grid') {
    console.log('[CardList] Rendering Grid Layout');
    return (
      <CardGrid $columns={gridColumns} $gap={gap}>
        {cards.map((card) => {
          console.log('[CardList] Grid Card:', { id: card.id, width: card.width });
          return (
            <Card
              key={card.id}
              {...card}
              layoutType="grid"
            />
          );
        })}
      </CardGrid>
    );
  }

  // Slider 레이아웃
  console.log('[CardList] Rendering Slider Layout');
  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const cardWidth = sliderRef.current.firstElementChild?.clientWidth || 0;
      const gap = parseInt(layout.gap || '16', 10);
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentIndex(newIndex);
    }
  };

  const scrollToCard = (index: number) => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.firstElementChild?.clientWidth || 0;
      const gap = parseInt(layout.gap || '16', 10);
      sliderRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth'
      });
    }
  };

  return (
    <SliderContainer>
      <CardSlider ref={sliderRef} $gap={gap} onScroll={handleScroll}>
        {cards.map((card, index) => {
          console.log('[CardList] Slider Card:', { 
            id: card.id, 
            originalWidth: card.width,
            appliedWidth: "180px",
            index,
            isSelected: index === currentIndex 
          });
          return (
            <Card
              key={card.id}
              {...card}
              width="180px"
              layoutType="slider"
              selected={index === currentIndex}
            />
          );
        })}
      </CardSlider>
      <SliderDots>
        {cards.map((_, index) => (
          <SliderDot
            key={index}
            $active={index === currentIndex}
            onClick={() => scrollToCard(index)}
          />
        ))}
      </SliderDots>
    </SliderContainer>
  );
};

const Card: React.FC<CardProps & { width?: string; layoutType?: 'grid' | 'slider' }> = ({
  id,
  type,
  title,
  subtitle,
  description,
  icon,
  tags,
  selected,
  index,
  onClick,
  showTags = true,
  showDescription = true,
  iconSize,
  titleSize,
  descriptionSize,
  width = '180px',
  layoutType,
  selectionData,
  buttonText,
}) => {
  return (
    <CardContainer
      $type={type}
      $selected={selected}
      $width={width}
      $layoutType={layoutType}
      onClick={onClick}
    >
      <HeaderSection>
        {icon && (
          <IconWrapper $size={iconSize}>
            {icon.emoji}
          </IconWrapper>
        )}
        <TitleSection>
          <Title $size={titleSize}>{title}</Title>
          {subtitle && (
            <Subtitle>{subtitle}</Subtitle>
          )}
        </TitleSection>
      </HeaderSection>

      {showDescription && description && (
        <Description $size={descriptionSize}>
          ⭐️ {description}
        </Description>
      )}
      
      {showTags && tags && tags.length > 0 && (
        <TagContainer>
          {tags.map((tag, idx) => (
            <Tag key={`${id}-tag-${idx}`}>{tag}</Tag>
          ))}
        </TagContainer>
      )}
      
      {(type === 'namecard-A' || type === 'xog' || selectionData?.buttonText || buttonText) && (
        <Button>{buttonText || selectionData?.buttonText}</Button>
      )}
    </CardContainer>
  );
};

export default Card; 