import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';
import Dashboard from '../dashboard/Dashboard';

const LayoutWrapper = styled(Box)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #ffffff;
`;

const MainContent = styled('div')<{ isSidebarOpen: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  height: calc(100vh - 64px);
  
  @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    grid-template-columns: ${({ isSidebarOpen }) => 
      isSidebarOpen ? 'minmax(350px, 400px) 1fr' : '0 1fr'};
  }
`;

const DashboardSection = styled(Box)<{ isVisible: boolean }>`
  display: none;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    display: ${({ isVisible }) => isVisible ? 'flex' : 'none'};
    flex-direction: column;
    border-right: 1px solid #eee;
  }
`;

const ChatSection = styled(Box)<{ isFullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [isSidebarOpen, setIsSidebarOpen] = useState(isDesktop);

  return (
    <LayoutWrapper>
      <Header />
      <MainContent isSidebarOpen={isSidebarOpen}>
        <DashboardSection isVisible={isDesktop}>
          <Dashboard />
        </DashboardSection>
        <ChatSection isFullWidth={!isDesktop}>
          {children}
        </ChatSection>
      </MainContent>
    </LayoutWrapper>
  );
};

export default Layout; 