import { DefaultTheme } from 'styled-components';
import styled from 'styled-components';

export type CardType = 'default' | 'namecard-A' | 'namecard-B' | 'hospital';
export type CardLayoutType = 'grid' | 'slider';

// 공통 속성
interface CommonCardProps {
  id: string;
  title: string;
  subtitle?: string;      // 부서/섹션 정보
  description?: string;
  icon?: CardIcon;
  tags?: string[];
  selected?: boolean;
  onClick?: () => void;
  index?: number;
  showTags?: boolean;
  showDescription?: boolean;
  iconSize?: string;
  titleSize?: string;
  subtitleSize?: string;  // subtitle 크기 조절을 위한 속성
  descriptionSize?: string;
  width?: string;
  selectionData?: {
    buttonText?: string;
  };
  buttonText?: string;
  birthDate?: string;     // 생년월일
  tag?: string;          // 본인/가족 등 태그
}

// 버튼 타입 카드 속성
interface ButtonCardProps {
  type: 'button';
  buttonText?: string;
}

// 네임카드 이미지 타입
export interface NameCardImage {
  type: 'userImage';
  image: string;
  gender: 'M' | 'F';
  fallbackEmoji: string;
  size: number;
}

// 아이콘 타입 정의
export type CardIconType = 'emoji' | 'userImage';

// 아이콘 베이스 타입
interface BaseCardIcon {
  size?: number;
  gender?: 'M' | 'F';
}

// 이모지 아이콘
interface EmojiCardIcon extends BaseCardIcon {
  type: 'emoji';
  emoji: string;
  color?: string;
  image?: never;
}

// 사용자 이미지 아이콘
interface UserImageCardIcon extends BaseCardIcon {
  type: 'userImage';
  image: string;
  gender: 'M' | 'F';
  fallbackEmoji?: string;
  emoji?: never;
}

// 최종 아이콘 타입
export type CardIcon = EmojiCardIcon | UserImageCardIcon;

// 기본 카드 타입 속성
interface DefaultCardProps {
  type: 'default';
  description: string;
  tags: string[];
  buttonText: string;
  icon?: CardIcon;  // 일반 카드 아이콘 타입
}

// 네임카드A 타입 속성
interface NameCardAProps {
  type: 'namecard-A';
  subtitle: string;      // 부서/섹션 정보
  buttonText: string;    // 버튼 텍스트
  birthDate: string;     // 생년월일
  icon?: CardIcon;       // 네임카드 전용 이미지 타입
}

// 네임카드B 타입 속성
interface NameCardBProps {
  type: 'namecard-B';
  title: string;         // 이름
  birthDate: string;     // 생년월일
  subtitle?: string;     // 부서/섹션 정보 (선택적)
  tag?: string;         // 본인/가족 등 태그
  icon?: CardIcon;      // 프로필 이미지
}

// 병원 카드 타입 속성
interface HospitalCardProps {
  type: 'hospital';
  title: string;         // 병원명
  subtitle: string;      // 주소
  tags: string[];        // 검진 종류
  icon?: CardIcon;       // 병원 아이콘
  buttonText: string;    // 버튼 텍스트
}

// 레이아웃 속성
export interface CardLayoutProps {
  layoutType: CardLayoutType;
  gridColumns?: number;
  gap?: string;
  showNavigator?: boolean;
  cardMinWidth?: string;
  cardMaxWidth?: string;
  cardPadding?: string;
  cardBorderRadius?: string;
  onComplete?: () => void;
  onCardSelect?: (card: CardProps) => void;
  showTags?: boolean;
  showDescription?: boolean;
  iconSize?: string;
  titleSize?: string;
  descriptionSize?: string;
}

// 최종 카드 Props
export type CardProps = CommonCardProps & (DefaultCardProps | NameCardAProps | NameCardBProps | HospitalCardProps);

// 스타일 Props
export interface StyledCardProps {
  $type?: CardType;
  $selected?: boolean;
  $width?: string;
  $layoutType?: 'grid' | 'slider';
  $size?: string;
  theme?: DefaultTheme;
  $minWidth?: string;
  $maxWidth?: string;
  $padding?: string;
  $borderRadius?: string;
  $showTags?: boolean;
  $showDescription?: boolean;
  $iconSize?: string;
  $titleSize?: string;
  $descriptionSize?: string;
  $index?: number;  // 애니메이션 딜레이를 위한 인덱스
  $animation?: {
    type: 'fadeIn' | 'fadeInUp';
    delay?: number;
    duration?: number;
    easing?: string;
  };
}

// 스타일 컴포넌트 Props
interface StyledSizeProps {
  $size?: string;
}

export const IconWrapper = styled.div<StyledSizeProps>`
  // ... existing styles ...
`;

export const Title = styled.div<StyledSizeProps>`
  // ... existing styles ...
`;

export const Description = styled.div<StyledSizeProps>`
  // ... existing styles ...
`;

// Slider 관련 타입
export interface SliderStyleProps extends StyledCardProps {
  showNavigator?: boolean;
  cardMinWidth?: string;
  cardMaxWidth?: string;
  cardPadding?: string;
  cardBorderRadius?: string;
}

export interface SliderProps extends SliderStyleProps {
  cards: CardProps[];
  onComplete?: () => void;
  onCardSelect?: (card: CardProps) => void;
}

export interface NavigatorProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
} 