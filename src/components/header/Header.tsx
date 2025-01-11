import React from 'react';
import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/store/debug';
import { createDebugStyles } from '@/styles/debug';

interface DebugProps {
  'data-debug'?: boolean;
}

const HeaderWrapper = styled.div<DebugProps>`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  
  ${createDebugStyles({
    name: 'HeaderSection > HeaderWrapper',
    hierarchy: '3',
    color: '#FF00FF'
  })}
`;

const LogoContainer = styled.div<DebugProps>`
  display: flex;
  align-items: center;
  
  ${createDebugStyles({
    name: 'HeaderWrapper > LogoContainer',
    hierarchy: '4',
    color: '#FFFF00'
  })}
`;

const Logo = styled.div<DebugProps>`
  font-size: 20px;
  font-weight: bold;
  
  ${createDebugStyles({
    name: 'LogoContainer > Logo',
    hierarchy: '5',
    color: '#00FFFF'
  })}
`;

const Header: React.FC<DebugProps> = ({ 'data-debug': debug }) => {
  const debugMode = useRecoilValue(debugModeState);
  
  return (
    <HeaderWrapper data-debug={debug || debugMode}>
      <LogoContainer data-debug={debug || debugMode}>
        <Logo data-debug={debug || debugMode}>
          KindHabit
        </Logo>
      </LogoContainer>
    </HeaderWrapper>
  );
};

export default Header; 