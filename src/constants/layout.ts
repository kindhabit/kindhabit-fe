export const DEBUG_MODE = true;  // 또는 환경변수에서 가져올 수 있음

export const DEBUG_STYLES = {
  BubbleWrapper: {
    color: 'red',
    label: 'BubbleWrapper'
  },
  BubbleContainer: {
    color: 'orange',
    label: 'BubbleContainer'
  },
  ProfileSection: {
    color: 'blue',
    label: 'ProfileSection'
  },
  MessageBubble: {
    color: 'green',
    label: 'MessageBubble'
  },
  LinkText: {
    color: 'purple',
    label: 'LinkText'
  },
  ChatWrapper: {
    color: 'brown',
    label: 'ChatWrapper'
  },
  ContentArea: {
    color: 'pink',
    label: 'ContentArea'
  },
  MessageArea: {
    color: 'black',
    label: 'MessageArea'
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