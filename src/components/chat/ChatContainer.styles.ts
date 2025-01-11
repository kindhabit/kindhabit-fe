import styled from 'styled-components';
import { colors } from '@/theme';
import { debugLabel, debugBorder } from '@/styles/debug';

interface DebugProps {
  'data-debug'?: boolean;
}

export const ChatWrapper = styled.div<DebugProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  
  ${props => props['data-debug'] && `
    ${debugBorder('#FF4444')}
    ${debugLabel({
      name: 'MainSection > ChatContainer',
      hierarchy: '3',
      color: '#FF4444'
    })}
  `}
`;

export const ContentArea = styled.div<DebugProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  
  ${props => props['data-debug'] && `
    ${debugBorder('#44FF44')}
    ${debugLabel({
      name: 'ChatContainer > ContentSection',
      hierarchy: '4',
      color: '#44FF44'
    })}
  `}
`;

export const MessageArea = styled.div<DebugProps>`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  
  ${props => props['data-debug'] && `
    ${debugBorder('#4444FF')}
    ${debugLabel({
      name: 'ContentSection > MessageSection',
      hierarchy: '5',
      color: '#4444FF'
    })}
  `}
`;

export const InputArea = styled.div<DebugProps>`
  padding: 20px;
  border-top: 1px solid #E0E0E0;
  position: relative;
  
  ${props => props['data-debug'] && `
    ${debugBorder('#FF8844')}
    ${debugLabel({
      name: 'ContentSection > InputSection',
      hierarchy: '5',
      color: '#FF8844'
    })}
  `}
`; 