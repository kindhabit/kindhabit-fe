import styled from 'styled-components';
import { debugLabel, debugBorder } from '@/core/styles/debug';

interface DebugProps {
  'data-debug'?: boolean;
}

export const SliderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;  // 슬라이더와 네비게이터 사이 간격
`;

export const SliderContainer = styled.div<DebugProps>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  overflow-x: auto;
  padding: ${({ theme }) => theme.spacing.lg};
  
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  ${props => props['data-debug'] && `
    ${debugBorder('#FF8844')}
    ${debugLabel({
      name: 'MessageSection > SliderContainer',
      hierarchy: '6',
      color: '#FF8844'
    })}
  `}
`;

export const NavigatorContainer = styled.div<DebugProps>`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 4px 0;

  ${props => props['data-debug'] && `
    ${debugBorder('#FF44FF')}
    ${debugLabel({
      name: 'SliderSection > NavigatorContainer',
      hierarchy: '7',
      color: '#FF44FF'
    })}
  `}
`;

export const NavigatorDot = styled.button<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => 
    props.$active 
      ? props.theme.colors.chat.slider.navigator.active 
      : props.theme.colors.chat.slider.navigator.inactive};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => 
      props.$active 
        ? props.theme.colors.chat.slider.navigator.active 
        : props.theme.colors.chat.slider.navigator.hover};
  }
`; 