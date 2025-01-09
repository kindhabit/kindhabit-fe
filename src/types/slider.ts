export interface SliderItem {
  id: string;
  title: string;
  description: string;
  icon: {
    type: 'virus' | 'heart' | 'bone' | string;  // 아이콘 종류
    color: string;  // 아이콘 색상
  };
  tags: string[];  // 태그 목록
} 