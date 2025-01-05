import React, { useState, useCallback } from 'react';
import { Box, useTheme, useMediaQuery, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { colors } from '@/theme';
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
  overflow: hidden;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    grid-template-columns: ${({ isSidebarOpen }) => 
      isSidebarOpen ? 'minmax(350px, 400px) minmax(0, 1fr)' : '0 1fr'};
  }
`;

const DashboardSection = styled(Box)<{ isVisible: boolean }>`
  display: none;
  height: 100%;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    display: ${({ isVisible }) => isVisible ? 'flex' : 'none'};
    flex-direction: column;
    border-right: 1px solid #eee;
  }
`;

const ChatSection = styled(Box)<{ isFullWidth: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: fixed;
  inset: 64px 0 0 0;
  overflow: hidden;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    position: relative;
    inset: auto;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [isSidebarOpen, setIsSidebarOpen] = useState(isDesktop);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  return (
    <LayoutWrapper>
      <Header onMenuClick={toggleSidebar} />
      <MainContent isSidebarOpen={isSidebarOpen}>
        <DashboardSection isVisible={isDesktop && isSidebarOpen}>
          <Dashboard />
        </DashboardSection>
        <ChatSection isFullWidth={!isDesktop || !isSidebarOpen}>
          {children}
        </ChatSection>
      </MainContent>
    </LayoutWrapper>
  );
};

export default Layout; 