import React, { useState, useRef } from 'react';
import { CardProps, CardLayoutProps, SliderProps, NavigatorProps } from './Card_types';
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
  Button,
  CardGrid,
  HeaderSection,
  TitleSection,
  CheckIcon,
  SliderNavigator,
  NavigatorButton,
  Tag
} from "./Card_styles";
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/core/store/debug';
import { theme } from '@/core/theme';

interface CardListProps {
  cards: CardProps[];
  layout: CardLayoutProps;
}

export const CardList: React.FC<CardListProps> = ({
  cards,
  layout
}) => {
  const { 
    layoutType, 
    gap, 
    gridColumns,
    showNavigator,
    cardMinWidth,
    cardMaxWidth,
    cardPadding,
    cardBorderRadius,
    onComplete,
    onCardSelect 
  } = layout;

  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Grid 레이아웃
  if (layoutType === 'grid') {
    return (
      <CardGrid $columns={gridColumns} $gap={gap}>
        {cards.map((card) => (
          <Card
            key={card.id}
            {...card}
            layoutType="grid"
          />
        ))}
      </CardGrid>
    );
  }

  // Slider 레이아웃
  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const cardWidth = sliderRef.current.firstElementChild?.clientWidth || 0;
      const gap = parseInt(layout.gap || '16', 10);
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentIndex(newIndex);
      
      // 마지막 카드에 도달했을 때 onComplete 호출
      if (newIndex === cards.length - 1) {
        onComplete?.();
      }
    }
  };

  const handleCardClick = (card: CardProps) => {
    onCardSelect?.(card);
    card.onClick?.();
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
      <CardSlider 
        ref={sliderRef} 
        $gap={gap}
        onScroll={handleScroll}
      >
        {cards.map((card, index) => (
          <Card
            key={card.id}
            {...card}
            width={cardMinWidth || "180px"}
            layoutType="slider"
            selected={index === currentIndex}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </CardSlider>
      {showNavigator && (
        <SliderDots>
          {cards.map((_, index) => (
            <SliderDot
              key={index}
              $active={index === currentIndex}
              onClick={() => scrollToCard(index)}
            />
          ))}
        </SliderDots>
      )}
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
  birthDate,
  tag
}) => {
  const debugMode = useRecoilValue(debugModeState);
  console.log('Card Props:', { type, tags, showTags, tag });

  const renderProfileSection = () => (
    <div className="profile-section">
      {icon && (
        <IconWrapper $size={`${icon.size || 48}px`} data-debug={debugMode}>
          {icon.image ? (
            <img 
              src={icon.image} 
              alt={title}
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
                border: debugMode ? '1px solid blue' : 'none'
              }} 
              onError={(e) => {
                console.error('Card Avatar Image Load Error:', {
                  src: e.currentTarget.src,
                  iconSize: icon.size,
                  title,
                  element: e.currentTarget
                });
              }}
            />
          ) : icon.emoji}
        </IconWrapper>
      )}
      <TitleSection>
        <Title>{title}</Title>
        <span className="department">{subtitle}</span>
        <div className="info-row">
          <span className="birth-date">{birthDate}</span>
        </div>
      </TitleSection>
      {(type === 'namecard-A') && (
        <Tag $type="badge">
          본인
        </Tag>
      )}
      {(type === 'namecard-B' && tag) && (
        <Tag $type="namecard-B" $gender={icon?.gender}>{tag}</Tag>
      )}
    </div>
  );

  return (
    <CardContainer
      $type={type}
      $selected={selected}
      $width={width}
      $layoutType={layoutType}
      onClick={onClick}
      data-debug={debugMode}
    >
      {(type === 'namecard-A' || type === 'namecard-B') && renderProfileSection()}
      
      {type === 'namecard-A' && (
        <>
          <div className="description-section">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M16.6666 5L7.49992 14.1667L3.33325 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{description}</span>
          </div>
          
          {showTags && tags && tags.length > 0 && (
            <TagContainer>
              {tags.map((tag, idx) => (
                <Tag 
                  key={`${id}-tag-${idx}`}
                  $type="namecard-A"
                >
                  {tag}
                </Tag>
              ))}
            </TagContainer>
          )}
          
          {buttonText && (
            <Button>{buttonText}</Button>
          )}
        </>
      )}
      
      {type === 'default' && (
        <>
          {showDescription && description && (
            <Description $size={descriptionSize}>
              ⭐️ {description}
            </Description>
          )}
          {showTags && tags && tags.length > 0 && (
            <TagContainer>
              {tags.map((tag, idx) => (
                <Tag 
                  key={`${id}-tag-${idx}`}
                  $type="default"
                >
                  {tag}
                </Tag>
              ))}
            </TagContainer>
          )}
          {buttonText && (
            <Button>{buttonText}</Button>
          )}
        </>
      )}

      {type === 'hospital' && (
        <>
          <div className="hospital-thumbnail">
            {icon && (
              <img 
                src={icon.image} 
                alt={title}
                onError={(e) => {
                  console.error('Hospital Image Load Error:', {
                    title,
                    element: e.currentTarget
                  });
                }}
              />
            )}
          </div>
          <div className="hospital-content">
            <TitleSection>
              <Title>{title}</Title>
              <span className="subtitle">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 8.5C9.10457 8.5 10 7.60457 10 6.5C10 5.39543 9.10457 4.5 8 4.5C6.89543 4.5 6 5.39543 6 6.5C6 7.60457 6.89543 8.5 8 8.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 6.5C13 11 8 14.5 8 14.5C8 14.5 3 11 3 6.5C3 3.18629 5.23858 1 8 1C10.7614 1 13 3.18629 13 6.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {subtitle}
              </span>
            </TitleSection>
            
            {showTags && tags && tags.length > 0 && (
              <TagContainer>
                {tags.map((tag, idx) => (
                  <Tag 
                    key={`${id}-tag-${idx}`}
                    $type="hospital"
                  >
                    {tag}
                  </Tag>
                ))}
              </TagContainer>
            )}
            
            {buttonText && (
              <Button>{buttonText}</Button>
            )}
          </div>
        </>
      )}
    </CardContainer>
  );
};

// Slider Navigation 컴포넌트 통합
export const CardNavigator: React.FC<NavigatorProps> = ({
  total,
  current,
  onSelect
}) => {
  return (
    <SliderNavigator>
      {Array.from({ length: total }).map((_, index) => (
        <NavigatorButton
          key={index}
          $active={index === current}
          onClick={() => onSelect(index)}
        />
      ))}
    </SliderNavigator>
  );
};

export default Card; 