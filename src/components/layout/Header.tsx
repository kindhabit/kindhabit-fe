import React from 'react';
import styled from 'styled-components';
import { colors } from '@/theme';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/core/store/debug';
import { debugLabel, debugBorder } from '@/core/styles/debug';

interface DebugProps {
  'data-debug'?: boolean;
}

interface DebugLabelProps {
  'data-debug'?: boolean;
  showOnHover?: boolean;
}

const HeaderWrapper = styled.div<DebugProps>`
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  background: ${colors.cardBg};
  border-bottom: 1px solid ${colors.dashboard.background};
  position: relative;
  
  ${props => props['data-debug'] && `
    ${debugBorder('#FF00FF')}
    ${debugLabel({
      name: 'MainContent > HeaderWrapper',
      hierarchy: '3',
      color: '#FF00FF',
      showOnHover: true
    })}
  `}
`;

const LogoContainer = styled.div<DebugProps>`
  display: flex;
  align-items: center;
  position: relative;
  
  ${props => props['data-debug'] && `
    ${debugBorder('#FFFF00')}
    ${debugLabel({
      name: 'HeaderWrapper > LogoContainer',
      hierarchy: '4',
      color: '#FFFF00',
      showOnHover: true
    })}
  `}
`;

const Logo = styled.img<DebugProps>`
  height: 32px;
  width: auto;
  position: relative;
  
  ${props => props['data-debug'] && `
    ${debugBorder('#00FFFF')}
    ${debugLabel({
      name: 'LogoContainer > Logo',
      hierarchy: '5',
      color: '#00FFFF',
      showOnHover: true
    })}
  `}
`;

const Header: React.FC = () => {
  const debugMode = useRecoilValue(debugModeState);

  return (
    <HeaderWrapper data-debug={debugMode}>
      <LogoContainer data-debug={debugMode}>
        <Logo src="/logo.png" alt="Logo" data-debug={debugMode} />
      </LogoContainer>
    </HeaderWrapper>
  );
};

export default Header; 