import styled from 'styled-components';
import { debugLabel, debugBorder } from '@/styles/debug';

interface DebugProps {
  'data-debug'?: boolean;
}

export const LayoutWrapper = styled.div<DebugProps>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  
  ${props => props['data-debug'] && `
    ${debugBorder('#FF0000')}
    ${debugLabel({
      name: 'Layout > LayoutWrapper',
      hierarchy: '1',
      color: '#FF0000'
    })}
  `}
`;

export const HeaderArea = styled.header<DebugProps>`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  ${props => props['data-debug'] && `
    ${debugBorder('#00FF00')}
    ${debugLabel({
      name: 'LayoutWrapper > HeaderArea',
      hierarchy: '2',
      color: '#00FF00'
    })}
  `}
`;

export const MainContent = styled.main<DebugProps>`
  flex: 1;
  display: flex;
  overflow: hidden;
  
  ${props => props['data-debug'] && `
    ${debugBorder('#0000FF')}
    ${debugLabel({
      name: 'LayoutWrapper > MainContent',
      hierarchy: '2',
      color: '#0000FF'
    })}
  `}
`; 