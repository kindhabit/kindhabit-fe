export interface SliderItem {
  id: string;
  title: string;
  description?: string;
  icon?: {
    type?: string;
    color?: string;
    emoji?: string;
  };
  tags?: string[];
}

export interface SliderNavigatorProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export interface NavigatorDotProps {
  $active: boolean;
} 