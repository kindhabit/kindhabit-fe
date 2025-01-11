export const DEBUG_MODE = true;  // 또는 환경변수에서 가져올 수 있음

export const DEBUG_STYLES = {
  // Layout Components
  LayoutWrapper: {
    color: '#E91E63',  // Pink
    label: 'LayoutWrapper'
  },
  HeaderArea: {
    color: '#9C27B0',  // Purple
    label: 'HeaderArea'
  },
  MainContent: {
    color: '#673AB7',  // Deep Purple
    label: 'MainContent'
  },
  
  // Chat Components
  ChatWrapper: {
    color: '#3F51B5',  // Indigo
    label: 'ChatWrapper'
  },
  ContentArea: {
    color: '#2196F3',  // Blue
    label: 'ContentArea'
  },
  MessageArea: {
    color: '#03A9F4',  // Light Blue
    label: 'MessageArea'
  },
  
  // Bubble Components
  BubbleWrapper: {
    color: '#00BCD4',  // Cyan
    label: 'BubbleWrapper'
  },
  BubbleContainer: {
    color: '#009688',  // Teal
    label: 'BubbleContainer'
  },
  ProfileSection: {
    color: '#4CAF50',  // Green
    label: 'ProfileSection'
  },
  MessageBubble: {
    color: '#8BC34A',  // Light Green
    label: 'MessageBubble'
  },
  ButtonContainer: {
    color: '#CDDC39',  // Lime
    label: 'ButtonContainer'
  },
  LinkText: {
    color: '#FFEB3B',  // Yellow
    label: 'LinkText'
  },
  
  // Slider Components
  SliderSection: {
    color: '#FFC107',  // Amber
    label: 'SliderSection'
  },
  SliderContainer: {
    color: '#FF9800',  // Orange
    label: 'SliderContainer'
  },
  SliderCard: {
    color: '#FF5722',  // Deep Orange
    label: 'SliderCard'
  },
  CardContent: {
    color: '#795548',  // Brown
    label: 'CardContent'
  },
  IconWrapper: {
    color: '#607D8B',  // Blue Grey
    label: 'IconWrapper'
  },
  TagsContainer: {
    color: '#9E9E9E',  // Grey
    label: 'TagsContainer'
  },
  Tag: {
    color: '#F44336',  // Red
    label: 'Tag'
  },
  DotsContainer: {
    color: '#E91E63',  // Pink
    label: 'DotsContainer'
  }
};

export const DEBUG_COLORS = {
  CHAT_WRAPPER: '#FF3333',
  CONTENT_AREA: '#3333FF',
  SLIDER_SECTION: '#33FF33',
  MESSAGE_AREA: '#FF9900',
  BUBBLE_WRAPPER: '#9933FF',
  MESSAGE_SECTION: '#00CCCC',
  DIALOG_CONTAINER: '#FF1493',
  SCROLL_INDICATOR: '#FFCC00',
  SPLASH_OVERLAY: '#00FFFF',
  BUBBLE_CONTAINER: '#FF4444'
} as const;

export const CHAT_CONSTANTS = {
  CONTAINER_PADDING: 20,
  BUBBLE: {
    JERRY_LEFT_MARGIN: 20,
    USER_RIGHT_MARGIN: 20,
    VERTICAL_SPACING: {
      SAME_SPEAKER: 8,
      DIFFERENT_SPEAKER: 24
    }
  }
} as const; 