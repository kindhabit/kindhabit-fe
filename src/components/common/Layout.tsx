import React, { useState, useCallback } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';
import Dashboard from '../dashboard/Dashboard';
import { colors } from '@/theme';

const LayoutWrapper = styled(Box)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #ffffff;
`;

const MainContent = styled('div')<{ leftWidth: number }>`
  display: flex;
  height: calc(100vh - 64px);
  
  @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    & > div:first-of-type {
      width: ${props => props.leftWidth}%;
    }
    
    & > div:last-of-type {
      width: ${props => 100 - props.leftWidth}%;
    }
  }
`;

const DashboardSection = styled('div')<{ isVisible: boolean }>`
  display: ${({ isVisible }) => isVisible ? 'block' : 'none'};
  background-color: ${colors.dashboard.background};
  height: 100%;
  position: relative;
  z-index: 0;
`;

const ChatSection = styled('div')`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SplitterBar = styled('div')`
  width: 8px;
  background-color: #f0f0f0;
  cursor: col-resize;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.palette.primary.main}20;
  }
  
  &:active {
    background-color: ${props => props.theme.palette.primary.main}40;
  }
`;

const MenuItem = styled(Box)`
  &:first-of-type {
    margin-top: 0;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [leftWidth, setLeftWidth] = useState(70);
  
  const handleResize = useCallback((e: MouseEvent) => {
    const container = document.querySelector('.main-content');
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    if (newWidth >= 30 && newWidth <= 85) {
      setLeftWidth(newWidth);
    }
  }, []);

  return (
    <LayoutWrapper>
      <Header />
      <MainContent className="main-content" leftWidth={leftWidth}>
        <ChatSection>
          {children}
        </ChatSection>
        {isDesktop && (
          <>
            <SplitterBar
              onMouseDown={(e) => {
                const handleMouseMove = (e: MouseEvent) => handleResize(e);
                const handleMouseUp = () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };
                
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              }}
            />
            <DashboardSection isVisible={true}>
              <Dashboard />
            </DashboardSection>
          </>
        )}
      </MainContent>
    </LayoutWrapper>
  );
};

export default Layout; 