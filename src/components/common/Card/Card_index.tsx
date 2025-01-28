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
  Tag,
  PhoneInputContainer,
  PhoneInput,
  PhoneDescription,
  SendButton
} from "./Card_styles";
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/core/store/debug';
import { theme } from '@/core/theme';
import Modal from '../Modal/Modal_index';
import Selector from '../Selector/Selector_index';
import {
  ReservationOptionsGrid,
  ReservationOptionCard
} from '../Modal/Modal_styles';
import BookingFlow from '../BookingFlow/BookingFlow_index';

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

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isBookingFlowOpen, setIsBookingFlowOpen] = useState(false);

  const handleButtonClick = () => {
    if (type === 'namecard-A') {
      setIsBookingFlowOpen(true);
    } else if (type === 'checkup-date') {
      setIsReservationModalOpen(true);
    } else if (onClick) {
      onClick();
    }
  };

  const handleCardClick = () => {
    if (type === 'namecard-B') {
      setIsPhoneModalOpen(true);
    }
  };

  const handleDateSelect = (date: Date) => {
    if (selectedDates.some(d => d.getTime() === date.getTime())) {
      setSelectedDates(prev => prev.filter(d => d.getTime() !== date.getTime()));
    } else {
      setSelectedDates(prev => [...prev, date].slice(-2));
    }
  };

  const handlePhoneSubmit = () => {
    if (phoneNumber) {
      console.log('예약 초대 발송:', { phoneNumber, title });
      setIsPhoneModalOpen(false);
      setPhoneNumber('');
    }
  };

  const handleDateFirstReservation = () => {
    setIsReservationModalOpen(false);
    setIsCalendarOpen(true);
  };

  const handleHospitalFirstReservation = () => {
    setIsReservationModalOpen(false);
    // TODO: 병원 선택 모달 표시
    console.log('병원 우선 예약');
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return numbers.slice(0, 3) + '-' + numbers.slice(3);
    return numbers.slice(0, 3) + '-' + numbers.slice(3, 7) + '-' + numbers.slice(7, 11);
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
    <>
      <CardContainer
        $type={type}
        $selected={selected}
        $width={width}
        $layoutType={layoutType}
        onClick={type === 'namecard-B' ? handleCardClick : onClick}
        data-debug={debugMode}
      >
        {(type === 'namecard-A' || type === 'namecard-B') && (
          <>
            {renderProfileSection()}
            
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
                  <Button onClick={handleButtonClick}>{buttonText}</Button>
                )}
              </>
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
              <Button onClick={handleButtonClick}>{buttonText}</Button>
            )}
          </>
        )}

        {type === 'hospital' && (
          <>
            <div className="hospital-thumbnail">
              {icon && icon.image && (
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
                      $type="default"
                    >
                      {tag}
                    </Tag>
                  ))}
                </TagContainer>
              )}
              
              {buttonText && (
                <Button onClick={handleButtonClick}>{buttonText}</Button>
              )}
            </div>
          </>
        )}

        {type === 'checkup-date' && (
          <>
            <TitleSection>
              <Title>{title}</Title>
              <span className="subtitle">{subtitle}</span>
            </TitleSection>
            
            {buttonText && (
              <Button onClick={handleButtonClick}>{buttonText}</Button>
            )}
          </>
        )}
      </CardContainer>

      <Modal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        type="slideup"
        title="검진일 선택"
        animation="slideIn"
      >
        <Selector
          selectedDates={selectedDates}
          onDateSelect={handleDateSelect}
          minDate={new Date()}
          maxDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)}
          checkupType="일반+특수 건강검진"
          subtitle="희망하시는 검진일을 선택해주세요"
          buttonText="선택 완료"
          onButtonClick={() => {
            console.log('선택된 날짜:', selectedDates);
            setIsCalendarOpen(false);
          }}
          checkboxOptions={[
            { id: 'morning', label: '오전 예약 가능', checked: false, onChange: () => {} },
            { id: 'afternoon', label: '오후 예약 가능', checked: false, onChange: () => {} }
          ]}
        />
      </Modal>

      <Modal
        isOpen={isPhoneModalOpen}
        onClose={() => {
          setIsPhoneModalOpen(false);
          setPhoneNumber('');
        }}
        type="slideup"
        title="예약 초대 발송"
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
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
            maxLength={13}
          />
          <SendButton
            onClick={handlePhoneSubmit}
            disabled={phoneNumber.length < 12}
          >
            예약 초대 발송하기
          </SendButton>
        </PhoneInputContainer>
      </Modal>

      <Modal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
        type="slideup"
        title="건강검진 예약하기"
        animation="slideIn"
      >
        <ReservationOptionsGrid>
          <ReservationOptionCard
            $type="date"
            onClick={handleDateFirstReservation}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3>날짜 우선으로<br />예약하기</h3>
            <p>희망하는 날짜를 먼저<br />선택하여 예약합니다</p>
          </ReservationOptionCard>

          <ReservationOptionCard
            $type="hospital"
            onClick={handleHospitalFirstReservation}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 9.11V14.88C3 17 3 17 5 18.35L10.5 21.53C11.33 22.01 12.68 22.01 13.5 21.53L19 18.35C21 17 21 17 21 14.89V9.11C21 7 21 7 19 5.65L13.5 2.47C12.68 1.99 11.33 1.99 10.5 2.47L5 5.65C3 7 3 7 3 9.11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3>병원 우선으로<br />예약하기</h3>
            <p>희망하는 병원을 먼저<br />선택하여 예약합니다</p>
          </ReservationOptionCard>
        </ReservationOptionsGrid>
      </Modal>

      <BookingFlow
        isOpen={isBookingFlowOpen}
        onClose={() => setIsBookingFlowOpen(false)}
        onComplete={() => {
          console.log('예약 완료');
          setIsBookingFlowOpen(false);
        }}
      />
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