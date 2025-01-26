import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { DebugProps } from '@/core/theme/types/theme';
import { debugModeState } from '@/core/store/debug';
import Header from '@/core/components/common/Header';
import { createDebugStyles } from '@/core/styles/debug';

interface StyledProps extends DebugProps {
  $isSidebarOpen?: boolean;
}

const LayoutWrapper = styled.div<StyledProps>`
  ${createDebugStyles({
    name: 'DashboardLayout',
    color: props => props.theme.colors.debug?.appLayout ?? '#E8E8E8'
  })}
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const ContentWrapper = styled.div<StyledProps>`
  ${createDebugStyles({
    name: 'ContentWrapper',
    color: props => props.theme.colors.debug?.mainContent ?? '#C0C0C0'
  })}
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const MainContent = styled.main<StyledProps>`
  ${createDebugStyles({
    name: 'MainContent',
    color: props => props.theme.colors.debug?.mainContent ?? '#C0C0C0'
  })}
  flex: 1;
  overflow: hidden;
  background: ${props => props.theme.colors.background};
  transition: margin-right 0.3s ease;
  margin-right: ${props => props.$isSidebarOpen ? '300px' : '0'};
`;

const SidebarArea = styled.aside<StyledProps>`
  ${createDebugStyles({
    name: 'SidebarArea',
    color: props => props.theme.colors.debug?.sidebar ?? '#B8B8B8'
  })}
  width: 300px;
  height: 100%;
  position: fixed;
  right: ${props => props.$isSidebarOpen ? '0' : '-300px'};
  top: 0;
  background: ${props => props.theme.colors.cardBg};
  border-left: 1px solid ${props => props.theme.colors.primary}10;
  transition: right 0.3s ease;
  overflow-y: auto;
`;

interface Props {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children, sidebar }) => {
  const debugMode = useRecoilValue(debugModeState);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <LayoutWrapper data-debug={debugMode}>
      <Header />
      <ContentWrapper data-debug={debugMode}>
        <MainContent data-debug={debugMode} $isSidebarOpen={isSidebarOpen}>
          {children}
        </MainContent>
        {sidebar && (
          <SidebarArea data-debug={debugMode} $isSidebarOpen={isSidebarOpen}>
            {sidebar}
          </SidebarArea>
        )}
      </ContentWrapper>
    </LayoutWrapper>
  );
};

export default DashboardLayout; 