import { DefaultTheme } from 'styled-components';
import styled from 'styled-components';

export type CardType = 'default' | 'namecard-A' | 'xog';
export type CardLayoutType = 'grid' | 'slider';

// 공통 속성
interface CommonCardProps {
  id: string;
  title: string;
  subtitle?: string;      // 부서/섹션 정보
  description?: string;
  icon?: {
    type?: string;
    emoji?: string;
    color?: string;
  };
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
}

// 버튼 타입 카드 속성
interface ButtonCardProps {
  type: 'button';
  buttonText?: string;
}

// 기본 카드 타입 속성
interface DefaultCardProps {
  type: 'default';
}

// XOG 카드 타입 속성
interface XOGCardProps {
  type: 'xog';
  buttonText: string;
}

// 네임카드A 타입 속성
interface NameCardAProps {
  type: 'namecard-A';
  subtitle: string;      // 부서/섹션 정보
  buttonText: string;    // 버튼 텍스트
}

// 레이아웃 속성
export interface CardLayoutProps {
  layoutType: CardLayoutType;
  gridColumns?: number;
  gap?: string;
}

// 최종 카드 Props
export type CardProps = CommonCardProps & (DefaultCardProps | NameCardAProps | XOGCardProps);

// 스타일 Props
export interface StyledCardProps {
  $type?: CardType;
  $selected?: boolean;
  $width?: string;
  $layoutType?: 'grid' | 'slider';
  $size?: string;
  theme?: DefaultTheme;
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