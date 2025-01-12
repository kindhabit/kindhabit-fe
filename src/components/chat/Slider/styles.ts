import styled from 'styled-components';
import { colors } from '@/theme';
import { debugLabel, debugBorder } from '@/styles/debug';
import { NavigatorDotProps } from '@/types/slider';

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
  gap: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 8px 0;
  width: 100%;
  position: relative;
  
  /* Chrome, Safari, Opera */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }
  
  /* Firefox */
  scrollbar-width: none;
  
  /* IE, Edge */
  -ms-overflow-style: none;
  
  /* 추가적인 스크롤바 숨김 처리 */
  &::-webkit-scrollbar-track {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    display: none;
  }

  ${props => props['data-debug'] && `
    ${debugBorder('#FF8844')}
    ${debugLabel({
      name: 'MessageArea > SliderContainer',
      hierarchy: '6',
      color: '#FF8844',
      zIndex: 9060
    })}
  `}
`;

export const Card = styled.div<DebugProps & { $selected?: boolean }>`
  min-width: 160px;
  max-width: 200px;
  padding: 16px;
  border-radius: 20px;
  background-color: #F8F4F0;
  border: 1.5px solid ${props => props.$selected ? colors.primary : '#E8E1D9'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
    border-color: ${colors.primary};
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.06);
  }

  ${props => props['data-debug'] && `
    ${debugBorder('#88FF44')}
    ${debugLabel({
      name: 'SliderContainer > Card',
      hierarchy: '7',
      color: '#88FF44',
      zIndex: 9070
    })}
  `}
`;

export const IconWrapper = styled.div<DebugProps>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 12px;
  position: relative;

  ${props => props['data-debug'] && `
    ${debugBorder('#4488FF')}
    ${debugLabel({
      name: 'Card > IconWrapper',
      hierarchy: '8',
      color: '#4488FF'
    })}
  `}
`;

export const HeaderTitle = styled.div<DebugProps>`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: 4px;
  position: relative;

  ${props => props['data-debug'] && `
    ${debugBorder('#44FF88')}
    ${debugLabel({
      name: 'Card > HeaderTitle',
      hierarchy: '8',
      color: '#44FF88'
    })}
  `}
`;

export const CardDescription = styled.div<DebugProps>`
  font-size: 12px;
  color: ${colors.textSecondary};
  margin-bottom: 12px;
  border-bottom: 1px solid #F0F0F0;
  padding-bottom: 12px;
  position: relative;

  ${props => props['data-debug'] && `
    ${debugBorder('#8844FF')}
    ${debugLabel({
      name: 'Card > CardDescription',
      hierarchy: '8',
      color: '#8844FF'
    })}
  `}
`;

export const TagContainer = styled.div<DebugProps>`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  position: relative;

  ${props => props['data-debug'] && `
    ${debugBorder('#FF4488')}
    ${debugLabel({
      name: 'Card > TagContainer',
      hierarchy: '8',
      color: '#FF4488'
    })}
  `}
`;

export const Tag = styled.span<DebugProps>`
  padding: 4px 8px;
  border-radius: 12px;
  background-color: #E3F2FD;
  color: #1976D2;
  font-size: 12px;
  font-weight: 500;
  position: relative;

  ${props => props['data-debug'] && `
    ${debugBorder('#FF8844')}
    ${debugLabel({
      name: 'TagContainer > Tag',
      hierarchy: '9',
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

export const NavigatorDot = styled.button<NavigatorDotProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.$active ? colors.primary : colors.secondaryDark};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.$active ? colors.primary : colors.secondaryHover};
  }
`; 