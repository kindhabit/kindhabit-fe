import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Header from '@/components/header/Header';
import Dashboard from './Dashboard';
import { useMediaQuery } from 'react-responsive';
import { createDebugStyles } from '@/core/styles/debug';
import { useRecoilState } from 'recoil';
import { debugModeState } from '@/core/store/debug';
import { DebugProps, Theme } from '@/core/theme/types/theme';
import { HTMLAttributes, DetailedHTMLProps } from 'react';

interface BaseStyledProps extends DebugProps {
  theme?: Theme;
}

interface LayoutWrapperProps extends BaseStyledProps {}

interface MainContentProps extends BaseStyledProps {
  $leftWidth: number;
}

interface ChatSectionProps extends BaseStyledProps {
  theme: Theme & { $leftWidth: number };
}

interface DashboardSectionProps extends BaseStyledProps {
  $isVisible: boolean;
  theme: Theme & { $leftWidth: number };
}

interface SplitterBarProps extends BaseStyledProps {}

const LayoutWrapper = styled.div<LayoutWrapperProps>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${props => props.theme.colors.background};
  ${props => props['data-debug'] && createDebugStyles({ name: 'LayoutWrapper', color: '#FF5733' })}
`;

const MainContent = styled.div<MainContentProps>`
  display: flex;
  height: calc(100vh - 64px);
  width: 100%;
  position: relative;
  background: ${props => props.theme.colors.background};
  ${props => props['data-debug'] && createDebugStyles({ name: 'MainContent', color: '#33FF57' })}
`;

const ChatSection = styled.div<ChatSectionProps>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
  
  @media (min-width: 768px) {
    width: ${props => props.theme.$leftWidth}%;
  }
  ${props => props['data-debug'] && createDebugStyles({ name: 'ChatSection', color: '#3357FF' })}
`;

const DashboardSection = styled.div<DashboardSectionProps>`
  display: ${({ $isVisible }) => $isVisible ? 'block' : 'none'};
  height: 100%;
  position: relative;
  z-index: 0;
  overflow-y: auto;
  
  @media (min-width: 768px) {
    width: ${props => 100 - props.theme.$leftWidth - 1}%;
  }
  ${props => props['data-debug'] && createDebugStyles({ name: 'DashboardSection', color: '#FF33F5' })}
`;

const SplitterBar = styled.div<SplitterBarProps>`
  width: 1%;
  background-color: #f0f0f0;
  cursor: col-resize;
  transition: background-color 0.2s;
  position: relative;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary}20;
  }
  
  &:active {
    background-color: ${props => props.theme.colors.primary}40;
  }
  ${props => props['data-debug'] && createDebugStyles({ name: 'SplitterBar', color: '#33FFF5' })}
`;

const MenuItem = styled.div`
  &:first-of-type {
    margin-top: 0;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const [leftWidth, setLeftWidth] = useState(70);
  const [debugMode, setDebugMode] = useRecoilState(debugModeState);
  
  const handleResize = useCallback((e: MouseEvent) => {
    const container = document.querySelector('.main-content');
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    if (newWidth >= 30 && newWidth <= 85) {
      setLeftWidth(newWidth);
    }
  }, []);

  const handleDoubleClick = useCallback(() => {
    setDebugMode(!debugMode);
  }, [debugMode, setDebugMode]);

  return (
    <LayoutWrapper data-debug={debugMode} onDoubleClick={handleDoubleClick}>
      <Header />
      <MainContent className="main-content" $leftWidth={leftWidth} data-debug={debugMode}>
        <ChatSection theme={{ $leftWidth: leftWidth }} data-debug={debugMode}>
          {children}
        </ChatSection>
        {isDesktop && (
          <>
            <SplitterBar
              data-debug={debugMode}
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
            <DashboardSection $isVisible={true} theme={{ $leftWidth: leftWidth }} data-debug={debugMode}>
              <Dashboard />
            </DashboardSection>
          </>
        )}
      </MainContent>
    </LayoutWrapper>
  );
};

export default Layout; 