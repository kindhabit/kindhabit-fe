import React from 'react';
import styled from 'styled-components';
import { ChatType, ChatLinkPosition, ChatProfilePosition } from '@/types/chat';
import { COMPONENT_HIERARCHY } from '@/types/debug';
import { Theme } from '@/types/theme';

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
  $position?: {
    top?: number;
    bottom?: number;
  };
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

const getDebugColor = (props: any, key: string, fallback: string) => 
  props.theme.colors.debug?.[key] ?? fallback;

const debugAreaStyle = (color: string) => `
  &::after {
    content: attr(data-width) 'px';
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

const debugLabel = (color: string, label: string) => {
  const level = parseInt(label.match(/\[(\d+)\]/)?.[1] || '1');
  return `
    &::before {
      content: '${label}';
      position: absolute;
      top: -20px;
      left: 0;
      background: ${color};
      color: white;
      padding: 2px 4px;
      font-size: 10px;
      z-index: 9999;
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
      return '8px 0 6px';
    }
    return $margin || '10px 0';
  }};
  padding: 0 4px;
  opacity: 1;
  animation: bubbleAppear 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  @keyframes bubbleAppear {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${props => props['data-debug'] && `
    border: 1px dashed ${getDebugColor(props, 'bubbleWrapper', '#FF44FF')};
    ${debugLabel(getDebugColor(props, 'bubbleWrapper', '#FF44FF'), 'BubbleWrapper')}
    ${debugAreaStyle(getDebugColor(props, 'bubbleWrapper', '#FF44FF'))}
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
    border: 1px dashed ${getDebugColor(props, 'profileSection', '#FF44FF')};
    ${debugLabel(getDebugColor(props, 'profileSection', '#FF44FF'), 'ProfileSection')}
  `}
`;

export const ProfileName = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.chat.bubble.profile.text};
  font-weight: 500;
  margin-bottom: 4px;
`;

export const SenderName = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.chat.bubble.profile.text};
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
  margin: 4px 0;
  padding: 0;
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
    border: 1px dashed ${getDebugColor(props, 'bubbleContainer', '#44FF44')};
    ${debugLabel(getDebugColor(props, 'bubbleContainer', '#44FF44'), 'BubbleContainer')}
    ${debugAreaStyle(getDebugColor(props, 'bubbleContainer', '#44FF44'))}
  `}
`;

export const MessageBubble = styled.div<MessageBubbleProps>`
  position: relative;
  padding: ${props => props.$type === 'jerry' ? '8px 12px' : '10px'};
  border-radius: ${props =>
    props.$type === 'jerry' ? '16px 16px 2px 16px' : '16px 16px 16px 2px'};
  background-color: ${props => {
    const bubbleType = props.$type === 'jerry' ? 'jerry' : 'user';
    const color = props.theme.colors.chat.bubble[bubbleType].background;
    const alpha = props.theme.colors.chat.bubble[bubbleType].backgroundAlpha;
    // hex to rgba 변환
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }};
  border: ${props =>
    props.$type === 'jerry' 
      ? `1px solid ${props.theme.colors.chat.bubble.jerry.border}` 
      : 'none'};
  color: ${props => 
    props.$type === 'jerry'
      ? props.theme.colors.chat.bubble.jerry.text
      : props.theme.colors.chat.bubble.user.text};
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
    color: ${props.theme.colors.primary};
    text-decoration: underline;
    cursor: pointer;
    
    &:hover {
      color: ${props.theme.colors.primaryHover};
    }
  `}
  
  ${props => props['data-debug'] && `
    border: 1px dashed ${getDebugColor(props, 'messageBubble', '#4444FF')};
    ${debugLabel(getDebugColor(props, 'messageBubble', '#4444FF'), 'MessageBubble')}
    ${debugAreaStyle(getDebugColor(props, 'messageBubble', '#4444FF'))}
  `}
`;

export const ButtonContainer = styled.div<{ $position?: 'bottom' | 'right' }>`
  display: flex;
  gap: 8px;
  margin-top: ${({ $position }) => $position === 'bottom' ? '8px' : '0'};
  margin-left: ${({ $position }) => $position === 'right' ? '8px' : '0'};
  flex-direction: ${({ $position }) => $position === 'bottom' ? 'column' : 'row'};
`;

export const BubbleButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.chat.bubble.button.background};
  color: ${({ theme }) => theme.colors.chat.bubble.button.text};
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.chat.bubble.button.hover};
  }
`;

export const LinkText = styled.span<LinkTextProps>`
  position: relative;
  display: block;
  text-align: right;
  ${({ $position }) => $position?.top !== undefined ? `top: ${$position.top}px;` : ''}
  ${({ $position }) => $position?.bottom !== undefined ? `bottom: ${$position.bottom}px;` : ''}
  color: ${({ theme }) => theme.colors.chat.bubble.button.background};
  font-size: 12px;
  cursor: pointer;
  text-decoration: underline;
  
  &:hover {
    color: ${({ theme }) => theme.colors.chat.bubble.button.hover};
  }
`;

export const DraggableLabel = styled.div<DraggableLabelProps & { theme: Theme }>`
  position: fixed;
  top: ${props => props.$y}px;
  left: ${props => props.$x}px;
  transform: translate(-50%, -50%);
  background-color: ${props => getDebugColor(props, 'bubbleWrapper', '#FF44FF')};
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

const GlobalDebugStyle = styled.div<{ theme: Theme }>`
  .debug-label-dragging {
    position: fixed !important;
    pointer-events: none;
    z-index: 10000;
    opacity: 0.9;
    transform: translate(-50%, -50%);
    transition: none;
    background-color: ${props => getDebugColor(props, 'bubbleWrapper', '#FF44FF')};
    border: 1px dashed ${props => getDebugColor(props, 'bubbleWrapper', '#FF44FF')};
    ${props => debugLabel(getDebugColor(props, 'bubbleWrapper', '#FF44FF'), 'DraggingLabel')}
  }
`;

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
  background-color: ${props => props.theme.colors.chat.jerryBubble};
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

const updateDebugWidth = (element: HTMLElement) => {
  if (!element) return;
  
  const initialWidth = Math.round(element.getBoundingClientRect().width);
  element.setAttribute('data-width', initialWidth.toString());
  
  const observer = new ResizeObserver(entries => {
    requestAnimationFrame(() => {
      for (const entry of entries) {
        const width = Math.round(entry.contentRect.width);
        const currentWidth = element.getAttribute('data-width');
        
        if (currentWidth !== width.toString()) {
          element.setAttribute('data-width', width.toString());
        }
      }
    });
  });
  
  observer.observe(element);
  return () => observer.disconnect();
};

export const useDebugWidth = (ref: React.RefObject<HTMLElement>) => {
  React.useEffect(() => {
    if (ref.current && ref.current.hasAttribute('data-debug')) {
      const cleanup = updateDebugWidth(ref.current);
      return () => {
        if (cleanup) cleanup();
      };
    }
  }, []);
}; 

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

export const UserWaitingIndicator = styled.div`
  position: absolute;
  left: -32px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation: blink 1s ease-in-out infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
`;