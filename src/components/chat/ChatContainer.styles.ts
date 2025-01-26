import styled from 'styled-components';
import { DebugProps } from '@/core/theme/types/theme';
import { createDebugStyles } from '@/core/styles/debug';

interface InputAreaProps extends DebugProps {
  $inputEnabled?: boolean;
}

interface MessageSectionProps extends DebugProps {
  $inputEnabled?: boolean;
}

export const ChatWrapper = styled.div<DebugProps>`
  ${createDebugStyles({
    name: 'MainSection > ChatContainer',
    hierarchy: '3',
    color: props => props.theme.colors.debug?.chatWrapper ?? '#FF4444'
  })}
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  background: ${props => props.theme.colors.background};
  overflow: hidden;
  padding: 0;
  margin: 0;
`;

export const ContentSection = styled.div<DebugProps>`
  ${createDebugStyles({
    name: 'ChatContainer > ContentSection',
    hierarchy: '4',
    color: props => props.theme.colors.debug?.contentSection ?? '#44FF44'
  })}
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
`;

export const MessageSection = styled.div<MessageSectionProps>`
  ${createDebugStyles({
    name: 'ContentSection > MessageSection',
    hierarchy: '5',
    color: props => props.theme.colors.debug?.messageSection ?? '#4444FF'
  })}
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  margin: 0;
  min-height: 0;
  height: ${props => props.$inputEnabled ? 'calc(100% - 80px)' : '100%'};
  
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.scrollbar};
    border-radius: 3px;
  }
`;

export const InputSection = styled.div<InputAreaProps>`
  ${createDebugStyles({
    name: 'ContentSection > InputSection',
    hierarchy: '5',
    color: props => props.theme.colors.debug?.inputSection ?? '#FF8844'
  })}
  padding: 20px;
  border-top: 1px solid ${props => props.theme.colors.border};
  position: relative;
  display: ${props => props.$inputEnabled ? 'block' : 'none'};
  height: ${props => props.$inputEnabled ? '80px' : '0'};
  min-height: ${props => props.$inputEnabled ? '80px' : '0'};
  background: ${props => props.theme.colors.background};
  margin: 0;
`;

export const LoadingOverlay = styled.div<DebugProps>`
  ${createDebugStyles({
    name: 'MessageSection > LoadingOverlay',
    hierarchy: '6',
    color: props => props.theme.colors.debug?.loadingOverlay ?? '#44FFFF'
  })}
  position: relative;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  justify-content: center;
  z-index: 1000;
  opacity: 1;
  transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 24px 0;
  
  &.fade-out {
    opacity: 0;
    transform: translateY(10px);
  }
`;

export const LoadingImage = styled.img`
  width: 50px;
  height: auto;
  opacity: 0.8;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
  animation: float 2s ease-in-out infinite;
  
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    25% {
      transform: translateY(-5px);
    }
    50% {
      transform: translateY(-3px);
    }
    75% {
      transform: translateY(-6px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

export const LoadingText = styled.div`
  color: #666;
  font-size: 11px;
  opacity: 0.8;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  
  &.changing {
    opacity: 0;
    transform: translateY(5px);
  }
`; 