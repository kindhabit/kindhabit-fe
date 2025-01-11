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