import React from 'react';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/store/debug';
import { LayoutWrapper, HeaderArea, MainContent } from './styles';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const debugMode = useRecoilValue(debugModeState);

  return (
    <LayoutWrapper data-debug={debugMode}>
      <HeaderArea data-debug={debugMode}>
        <h1>착한습관</h1>
      </HeaderArea>
      <MainContent data-debug={debugMode}>
        {children}
      </MainContent>
    </LayoutWrapper>
  );
};

export default Layout; 