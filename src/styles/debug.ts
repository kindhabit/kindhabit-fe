import { css } from '@mui/material/styles';
import { DEBUG_MODE, DEBUG_STYLES } from '@/constants/layout';

// 컴포넌트의 깊이에 따라 위치 자동 계산
const calculatePosition = (component: keyof typeof DEBUG_STYLES, type?: 'jerry' | 'user') => {
  const positions = {
    BubbleWrapper: 0,
    BubbleContainer: 1,
    ProfileSection: 1,
    MessageBubble: 2,
    LinkText: 2,
    ChatWrapper: 0,
    ContentArea: 1,
    MessageArea: 2
  };

  const depth = positions[component];
  const offset = depth * 20;

  // 컴포넌트별 기본 위치 결정
  switch(component) {
    case 'BubbleWrapper':
      return { top: '-20px', right: '16px' };
    case 'BubbleContainer':
      return { 
        top: '4px',
        right: '4px'
      };
    case 'ProfileSection':
      return { top: '-20px', left: '0' };
    case 'MessageBubble':
      return { top: `${offset}px`, right: '-120px' };
    case 'LinkText':
      return { bottom: '-20px', right: '0' };
    case 'ChatWrapper':
      return { top: '0', left: '-100px' };
    case 'ContentArea':
      return { top: '50%', left: '-100px', transform: 'translateY(-50%)' };
    case 'MessageArea':
      return { bottom: '0', left: '-100px' };
    default:
      return { top: '0', left: '0' };
  }
};

export const debugBorder = (component: keyof typeof DEBUG_STYLES, type?: 'jerry' | 'user') => {
  if (!DEBUG_MODE) return '';

  const style = DEBUG_STYLES[component];
  const position = calculatePosition(component, type);

  return css`
    ${component === 'MessageArea' ? 
      'border: 5px solid red !important; position: relative !important; z-index: 100 !important;' :
      `border: 1px dashed ${style.color};`
    }
    position: relative;
    
    &::after {
      content: '${style.label} - Width: ' attr(data-width) 'px';
      position: absolute;
      ${Object.entries(position)
        .map(([key, value]) => `${key}: ${value};`)
        .join('\n')}
      font-size: 11px;
      color: ${style.color};
      background-color: ${component === 'BubbleContainer' ? 'white' : 'transparent'};
      padding: ${component === 'BubbleContainer' ? '2px 4px' : '0'};
      border-radius: ${component === 'BubbleContainer' ? '4px' : '0'};
      white-space: nowrap;
      pointer-events: none;
      z-index: 1000;
    }
  `;
}; 