export type ComponentLevel = {
  level: number;
  name: string;
};

export type ComponentHierarchy = {
  [key: string]: ComponentLevel;
};

export const COMPONENT_HIERARCHY: ComponentHierarchy = {
  // 최상위 컨테이너
  ChatWrapper: { level: 1, name: 'ChatWrapper' },
  ContentSection: { level: 2, name: 'ContentSection' },
  MessageSection: { level: 3, name: 'MessageSection' },
  InputSection: { level: 3, name: 'InputSection' },
  
  // 버블 관련
  BubbleWrapper: { level: 4, name: 'BubbleWrapper' },
  ProfileSection: { level: 5, name: 'ProfileSection' },
  BubbleContainer: { level: 5, name: 'BubbleContainer' },
  MessageBubble: { level: 6, name: 'MessageBubble' },
  ButtonContainer: { level: 7, name: 'ButtonContainer' },
  LinkText: { level: 7, name: 'LinkText' },
  
  // 슬라이더 관련
  SliderSection: { level: 4, name: 'SliderSection' },
  SliderContainer: { level: 5, name: 'SliderContainer' },
  SliderCard: { level: 6, name: 'SliderCard' }
}; 