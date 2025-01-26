export type ComponentLevel = {
  level: number;
  name: string;
};

export type ComponentHierarchy = {
  [key: string]: ComponentLevel;
};

export interface DebugProps {
  'data-debug'?: boolean;
  $inputEnabled?: boolean;
}

export const COMPONENT_HIERARCHY: ComponentHierarchy = {
  // 앱 레이아웃
  AppLayout: { level: 0, name: 'AppLayout' },
  Header: { level: 1, name: 'Header' },
  MainContent: { level: 1, name: 'MainContent' },
  Sidebar: { level: 1, name: 'Sidebar' },
  
  // 대시보드
  Dashboard: { level: 2, name: 'Dashboard' },
  DashboardHeader: { level: 3, name: 'DashboardHeader' },
  DashboardContent: { level: 3, name: 'DashboardContent' },
  DashboardSection: { level: 4, name: 'DashboardSection' },
  
  // 최상위 컨테이너
  ChatWrapper: { level: 2, name: 'ChatWrapper' },
  ContentSection: { level: 4, name: 'ContentSection' },
  MessageSection: { level: 3, name: 'MessageSection' },
  InputSection: { level: 3, name: 'InputSection' },
  
  // 로딩 관련
  LoadingOverlay: { level: 4, name: 'LoadingOverlay' },
  
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