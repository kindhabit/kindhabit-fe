import React from 'react';
import styled from 'styled-components';
import { ChatType, ChatLinkPosition, ChatProfilePosition } from '@/types/chat';
import { colors } from '@/theme';
import { COMPONENT_HIERARCHY } from '@/types/debug';

interface BubbleWrapperProps {
  $type: ChatType;
  $margin?: string;
  'data-debug'?: boolean;
  $prevType?: ChatType;
  $hasLink?: boolean;
}

interface BubbleContainerProps {
  type: ChatType;
  'data-debug'?: boolean;
  delay?: number;
}

interface MessageBubbleProps {
  $type: ChatType;
  $isHistory?: boolean;
  'data-debug'?: boolean;
  $isLink?: boolean;
  $hasButtons?: boolean;
}

interface LinkTextProps {
  position: ChatLinkPosition;
  'data-debug'?: boolean;
}

interface DraggableLabelProps {
  $isDragging?: boolean;
  $x?: number;
  $y?: number;
}

interface ProfileSectionProps {
  'data-debug'?: boolean;
  $position?: {
    top?: number;
    left?: number;
    align?: 'left' | 'right';
  };
}

const getDebugLabelPosition = (componentType: string, index: number = 0) => {
  const component = COMPONENT_HIERARCHY[componentType];
  if (!component) return '';

  const level = component.level;
  const baseOffset = 4;
  const levelOffset = level * 24;  // 레벨에 따라 위치 조정

  return `
    top: ${baseOffset + levelOffset}px;
    ${level % 2 === 0 ? 'left' : 'right'}: ${baseOffset + (level * 8)}px;
  `;
};

const getComponentHierarchy = (componentType: string): string => {
  const component = COMPONENT_HIERARCHY[componentType] || 
    { level: 1, name: componentType };
  return `[${component.level}] ${component.name}`;
};

export const debugLabel = (color: string, label: string) => {
  const level = parseInt(label.match(/\[(\d+)\]/)?.[1] || '1');
  return `
    position: relative;

    &::before {
      content: '${getComponentHierarchy(label)}';
      position: absolute;
      ${getDebugLabelPosition(label)}
      background-color: ${color};
      color: white;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 11px;
      white-space: nowrap;
      z-index: ${9000 + (level * 10)};
      opacity: 0;
      transition: opacity 0.2s;
      cursor: move;
      pointer-events: all;
      user-select: none;
      touch-action: none;
      display: none;
    }

    &:hover::before {
      opacity: 0.9;
      display: block;
    }

    &::after {
      content: 'width: ' attr(data-width) 'px';
      position: absolute;
      top: -18px;
      left: 50%;
      transform: translateX(-50%);
      background-color: transparent;
      color: ${color};
      padding: 0 4px;
      font-size: 10px;
      white-space: nowrap;
    }
  `;
};

const fadeInAnimation = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const slideInAnimation = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const BubbleWrapper = styled.div<BubbleWrapperProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$type === 'user' ? 'flex-end' : 'flex-start'};
  position: relative;
  box-sizing: border-box;
  height: auto;
  margin: ${({ $margin, $prevType, $hasLink }) => {
    if ($prevType === 'slider') {
      return '15px 0 10px';
    }
    if ($hasLink) {
      return '17px 0 10px';
    }
    return $margin || '10px 0';
  }};
  padding: 0 4px;
  opacity: 0;
  animation: bubbleAppear 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  
  @keyframes bubbleAppear {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    70% {
      opacity: 1;
      transform: translateY(-2px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${props => props['data-debug'] && `
    border: 1px dashed ${colors.debug.bubbleWrapper};
    ${debugLabel(colors.debug.bubbleWrapper, 'BubbleWrapper')}
    ${debugAreaStyle(colors.debug.bubbleWrapper)}
  `}
`;

export const ProfileSection = styled.div<ProfileSectionProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 32px;
  position: relative;
  margin: ${({ $position }) => {
    const topMargin = $position?.top ? `${$position.top}px` : '-24px';
    const leftMargin = $position?.left ? `${$position.left}px` : '0';
    return `${topMargin} 0 0 ${leftMargin}`;
  }};
  align-self: ${({ $position }) => $position?.align === 'right' ? 'flex-end' : 'flex-start'};
  
  ${props => props['data-debug'] && `
    border: 1px dashed ${colors.debug.profileSection};
    ${debugLabel(colors.debug.profileSection, 'ProfileSection')}
  `}
`;

export const ProfileName = styled.span`
  font-size: 12px;
  color: ${colors.textSecondary};
  font-weight: 500;
  margin-bottom: 4px;
`;

export const SenderName = styled.span`
  font-size: 12px;
  color: ${colors.textSecondary};
  font-weight: 500;
  margin-bottom: 4px;
  position: absolute;
  top: -20px;
  left: 0;
`;

export const BubbleContainer = styled.div<{ 
  $type: ChatType; 
  'data-debug'?: boolean;
  $hasButtons?: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 70%;
  min-width: 120px;
  margin-top: 4px;
  margin-bottom: ${props => props.$hasButtons ? '20px' : '4px'};
  padding-bottom: 0;
  height: auto;
  box-sizing: border-box;
  
  .profile-name {
    position: absolute;
    top: -20px;
    left: 0;
    font-size: 12.5px;
    color: #8B7355;
    font-weight: 500;
  }
  
  ${props => props['data-debug'] && `
    border: 1px dashed ${colors.debug.bubbleContainer};
    ${debugLabel(colors.debug.bubbleContainer, 'BubbleContainer')}
  `}
`;

export const MessageBubble = styled.div<MessageBubbleProps>`
  position: relative;
  padding: ${props => props.$type === 'jerry' ? '8px 12px' : '10px'};
  border-radius: ${props =>
    props.$type === 'jerry' ? '16px 16px 2px 16px' : '16px 16px 16px 2px'};
  background-color: ${props =>
    props.$type === 'jerry' ? colors.chat.jerryBubble : '#7B5F3F'};
  border: ${props =>
    props.$type === 'jerry' ? '1px solid #E8E1D9' : 'none'};
  color: ${props => props.$type === 'jerry' ? colors.textPrimary : '#FFFFFF'};
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
  white-space: pre-wrap;
  display: flex;
  flex-direction: column;
  ${props => props.$hasButtons && `
    padding-bottom: ${props.$type === 'user' ? 'auto' : '10px'};
  `}
  gap: 8px;
  animation: slideIn 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${props => props.$isLink && `
    color: ${colors.primary};
    text-decoration: underline;
    cursor: pointer;
    
    &:hover {
      color: ${colors.primaryHover};
    }
  `}
  
  ${props => props['data-debug'] && `
    border: 1px dashed ${colors.debug.messageBubble};
    ${debugLabel(colors.debug.messageBubble, 'MessageBubble')}
    ${debugAreaStyle(colors.debug.messageBubble)}
  `}
`;

export const ButtonContainer = styled.div<{ 'data-debug'?: boolean; $position?: 'inside' | 'outside' }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
  border-top: ${props => props.$position === 'inside' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none'};
  position: relative;
  padding: 8px 10px;
  background-color: #7B5F3F;
  z-index: 1;
  height: auto;
  width: 100%;
  box-sizing: border-box;

  ${props => props['data-debug'] && `
    border: 1px dashed ${colors.debug.buttonContainer};
    ${debugLabel(colors.debug.buttonContainer, 'ButtonContainer')}
    ${debugAreaStyle(colors.debug.buttonContainer)}
  `}
`;

export const BubbleButton = styled.button<{ 
  $variant: 'primary' | 'secondary';
  'data-debug'?: boolean;
}>`
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid ${props => 
    props.$variant === 'primary' 
      ? 'rgba(255, 255, 255, 0.15)'
      : 'rgba(255, 255, 255, 0.08)'
  };
  background-color: ${props => 
    props.$variant === 'primary' 
      ? 'rgba(255, 255, 255, 0.08)'
      : 'transparent'
  };
  color: #FFFFFF;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 13px;
  font-weight: ${props => props.$variant === 'primary' ? '500' : '400'};
  min-width: 48px;

  &:hover {
    background-color: ${props => 
      props.$variant === 'primary' 
        ? 'rgba(255, 255, 255, 0.15)'
        : 'rgba(255, 255, 255, 0.05)'
    };
    border-color: ${props => 
      props.$variant === 'primary' 
        ? 'rgba(255, 255, 255, 0.25)'
        : 'rgba(255, 255, 255, 0.15)'
    };
  }

  &:active {
    background-color: ${props => 
      props.$variant === 'primary' 
        ? 'rgba(255, 255, 255, 0.35)' 
        : 'rgba(255, 255, 255, 0.15)'
    };
  }

  ${props => props['data-debug'] && `
    border: 1px dashed ${colors.debug.bubbleButton};
    ${debugLabel(colors.debug.bubbleButton, 'BubbleButton')}
    ${debugAreaStyle(colors.debug.bubbleButton)}
  `}
`;

export const LinkText = styled.span<{ $position?: ChatLinkPosition; 'data-debug'?: boolean }>`
  position: absolute;
  ${({ $position }) => $position?.align === 'right' ? 'right: 0;' : 'left: 0;'}
  ${({ $position }) => $position?.top !== undefined ? `top: ${$position.top}px;` : ''}
  ${({ $position }) => $position?.bottom !== undefined ? `bottom: ${$position.bottom}px;` : ''}
  color: ${colors.primary};
  font-size: 12px;
  cursor: pointer;
  text-decoration: underline;
  
  &:hover {
    color: ${colors.primaryHover};
  }
  
  ${props => props['data-debug'] && `
    border: 1px dashed ${colors.debug.linkText};
  `}
`;

export const DraggableLabel = styled.div<DraggableLabelProps>`
  position: fixed;
  top: ${props => props.$y}px;
  left: ${props => props.$x}px;
  transform: translate(-50%, -50%);
  background-color: ${colors.debug.bubbleWrapper};
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  white-space: nowrap;
  z-index: ${props => props.$isDragging ? 10000 : 1};
  opacity: ${props => props.$isDragging ? 0.9 : 0};
  pointer-events: ${props => props.$isDragging ? 'none' : 'all'};
  transition: none;
`;

// 라벨 드래그 관련 JavaScript 코드를 위한 전역 스타일 추가
const GlobalDebugStyle = styled.div`
  .debug-label-dragging {
    position: fixed !important;
    pointer-events: none;
    z-index: 10000;
    opacity: 0.9;
    transform: translate(-50%, -50%);
    transition: none;
  }
`;

// 컴포넌트에서 사용할 드래그 이벤트 핸들러
const handleLabelDragStart = (e: React.MouseEvent) => {
  const label = e.target as HTMLElement;
  const rect = label.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;

  const onMouseMove = (e: MouseEvent) => {
    label.style.left = `${e.clientX - offsetX}px`;
    label.style.top = `${e.clientY - offsetY}px`;
  };

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    label.classList.remove('debug-label-dragging');
  };

  label.classList.add('debug-label-dragging');
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

export const ProfileImage = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${colors.chat.jerryBubble};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Add ResizeObserver logic to update widths
const updateDebugWidth = (element: HTMLElement) => {
  if (!element) return;
  
  // Set initial width
  const initialWidth = Math.round(element.getBoundingClientRect().width);
  element.setAttribute('data-width', initialWidth.toString());
  
  const observer = new ResizeObserver(entries => {
    requestAnimationFrame(() => {
      for (const entry of entries) {
        const width = Math.round(entry.contentRect.width);
        const currentWidth = element.getAttribute('data-width');
        
        // Only update if width has actually changed
        if (currentWidth !== width.toString()) {
          element.setAttribute('data-width', width.toString());
        }
      }
    });
  });
  
  observer.observe(element);
  return () => observer.disconnect();
};

// Export for use in the component
export const useDebugWidth = (ref: React.RefObject<HTMLElement>) => {
  React.useEffect(() => {
    if (ref.current && ref.current.hasAttribute('data-debug')) {
      const cleanup = updateDebugWidth(ref.current);
      return () => {
        if (cleanup) cleanup();
      };
    }
  }, []);  // Empty dependency array
}; 

// 디버그 모드용 공통 스타일 추가
const debugAreaStyle = (color: string) => `
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
      45deg,
      ${color}10 25%,
      transparent 25%,
      transparent 50%,
      ${color}10 50%,
      ${color}10 75%,
      transparent 75%,
      transparent
    );
    background-size: 20px 20px;
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none;
  }

  &:hover::before {
    opacity: 0.5;
  }
`; 

export const BubbleLoadingIndicator = styled.div`
  position: absolute;
  top: 50%;
  right: calc(100% + 16px);
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0% { opacity: 0.4; transform: translateY(-50%) scale(0.95); }
    50% { opacity: 1; transform: translateY(-50%) scale(1.05); }
    100% { opacity: 0.4; transform: translateY(-50%) scale(0.95); }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`; 

export const UserWaitingIndicator = styled.div<{ 'data-debug'?: boolean }>`
  position: absolute;
  top: 40%;
  right: calc(100% + 4px);
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0% { opacity: 0.4; transform: translateY(-40%) scale(0.95); }
    50% { opacity: 1; transform: translateY(-40%) scale(1.05); }
    100% { opacity: 0.4; transform: translateY(-40%) scale(0.95); }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    
    ${props => props['data-debug'] && `
      border: 1px dashed ${colors.debug.waitingIndicatorImage};
      ${debugLabel(colors.debug.waitingIndicatorImage, 'WaitingIndicatorImage')}
      ${debugAreaStyle(colors.debug.waitingIndicatorImage)}
    `}
  }

  ${props => props['data-debug'] && `
    border: 1px dashed ${colors.debug.waitingIndicator};
    ${debugLabel(colors.debug.waitingIndicator, 'UserWaitingIndicator')}
    ${debugAreaStyle(colors.debug.waitingIndicator)}
  `}
`; 