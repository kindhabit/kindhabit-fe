import React, { useState, useRef, useCallback, useMemo } from 'react';
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
  Tag,
  PhoneInputContainer,
  PhoneInput,
  PhoneDescription,
  SendButton,
  ReservationOptionsGrid,
  ReservationOptionCard,
  OptionsGrid,
  OptionCard
} from "./Card_styles";
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/core/store/debug';
import { theme } from '@/core/theme';
import Modal from '../Modal/Modal_index';
import { formatPhoneNumber } from '@/utils/string';
import BookingFlow from '../BookingFlow/BookingFlow_index';
import { BookingAPI } from '@/services/xog/booking/api/client';
import { AvailableDatesResponse } from '@/services/xog/booking/types';
import { ChatBookingState } from '@/services/xog/booking/presentation/chat/booking_main';
import { Splash } from '../Splash';
import { useTheme } from 'styled-components';

import { MdCheck } from 'react-icons/md';

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

const Card: React.FC<CardProps & { 
  width?: string; 
  layoutType?: 'grid' | 'slider';
  bookingState?: ChatBookingState;
}> = ({
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
  tag,
  bookingState
}) => {
  const theme = useTheme();
  const debugMode = useRecoilValue(debugModeState);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isBookingFlowOpen, setIsBookingFlowOpen] = useState(false);

  const handleButtonClick = () => {
    if (type === 'namecard-A' && bookingState) {
      console.log('🔍 [이벤트] 건강검진 바로 예약하기 버튼 클릭');
      if (tags && tags.length > 0) {
        bookingState.handleCheckupSelection(tags[0]);
      }
      setIsBookingFlowOpen(true);
    }
  };

  const handleCardClick = () => {
    if (type === 'namecard-B') {
      setIsPhoneModalOpen(true);
    }
  };

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
        <Tag $type="namecard-A">본인</Tag>
      )}
      {(type === 'namecard-B' && tag) && (
        <Tag $type="namecard-B" $gender={icon?.gender}>{tag}</Tag>
      )}
    </div>
  );

  return (
    <>
      <CardContainer
        onClick={handleCardClick}
        $type={type}
        $selected={selected}
        $width={width}
        $layoutType={layoutType}
        data-debug={debugMode}
      >
        {renderProfileSection()}
        {showDescription && description && (
          <div className="description-section">
            <div style={{ color: theme.colors.primary, fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MdCheck size={16} />
              {description}
            </div>
          </div>
        )}
        {showTags && tags && tags.length > 0 && (
          <TagContainer>
            {tags.map((tag, index) => (
              <Tag key={index} $type="default">{tag}</Tag>
            ))}
          </TagContainer>
        )}
        {buttonText && (
          <Button onClick={handleButtonClick}>
            {buttonText}
          </Button>
        )}
      </CardContainer>

      <Modal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        type="slideup"
        title="예약 초대"
        animation="slideIn"
      >
        <PhoneInputContainer>
          <PhoneDescription>
            {title}님의 전화번호를 입력해주세요.
            <br />
            입력하신 번호로 예약 초대 메시지가 발송됩니다.
          </PhoneDescription>
          <PhoneInput
            type="tel"
            placeholder="전화번호 입력 (예: 010-1234-5678)"
            maxLength={13}
          />
          <SendButton
            onClick={() => setIsPhoneModalOpen(false)}
            disabled={false}
          >
            예약 초대 발송하기
          </SendButton>
        </PhoneInputContainer>
      </Modal>

      {isBookingFlowOpen && (
        <BookingFlow
          isOpen={isBookingFlowOpen}
          onClose={() => setIsBookingFlowOpen(false)}
          bookingState={bookingState}
        />
      )}
    </>
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