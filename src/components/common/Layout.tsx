import React from 'react';
import styled from 'styled-components';
import Header from '@/core/components/common/Header';
import { useRecoilValue } from 'recoil';
import theme from '@/core/theme';
import { useLocation } from 'react-router-dom';
import { createDebugStyles } from '@/core/styles/debug';
import { useEffect } from 'react';
import { debugModeState } from '@/core/store/debug';
import { DebugProps, Theme } from '@/core/theme/types/theme';

interface LayoutWrapperProps extends DebugProps {
  theme?: Theme;
}

const LayoutWrapper = styled.div<LayoutWrapperProps>`
  ${createDebugStyles({
    name: 'Layout',
    color: props => props.theme.colors.debug?.layout ?? '#FF5733'
  })}
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${props => props.theme.colors.background};
`;

const MainContent = styled.main<LayoutWrapperProps>`
  ${createDebugStyles({
    name: 'MainContent',
    color: props => props.theme.colors.debug?.mainContent ?? '#33FF57'
  })}
  flex: 1;
  width: 100%;
  overflow: hidden;
  background: ${props => props.theme.colors.background};
`;

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const isDebugMode = useRecoilValue(debugModeState);
  const location = useLocation();

  useEffect(() => {
    if (isDebugMode) {
      console.log('[Layout] Current location:', location.pathname);
    }
  }, [location, isDebugMode]);

  return (
    <LayoutWrapper data-debug={!!isDebugMode}>
      <Header />
      <MainContent data-debug={!!isDebugMode}>
        {children}
      </MainContent>
    </LayoutWrapper>
  );
};

export default Layout; 