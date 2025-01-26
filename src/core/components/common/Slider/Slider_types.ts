import { CardProps, CardStyleProps } from '../Card/Card_types';

export interface SliderStyleProps extends CardStyleProps {
  showNavigator?: boolean;
  layoutType?: 'grid' | 'slider';
  gridColumns?: number;
  gap?: string;
  cardMinWidth?: string;
  cardMaxWidth?: string;
  cardPadding?: string;
  cardBorderRadius?: string;
  showTags?: boolean;
  iconSize?: string;
  titleSize?: string;
  descriptionSize?: string;
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