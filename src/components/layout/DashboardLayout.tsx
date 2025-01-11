import { styled } from '@mui/material/styles';
import { colors } from '@/theme';
import Dashboard from '@/components/dashboard/Dashboard';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/store/debug';
import { debugLabel, debugBorder } from '@/styles/debug';
import Header from '../common/Header';

interface DebugProps {
  'data-debug'?: boolean;
}

const LayoutWrapper = styled('div')<DebugProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: ${colors.background};
  
  ${props => props['data-debug'] && `
    ${debugBorder('#FF4444')}
    ${debugLabel({
      name: 'DashboardLayout > LayoutWrapper',
      hierarchy: '1',
      color: '#FF4444'
    })}
  `}
`;

const ContentWrapper = styled('div')<DebugProps>`
  display: flex;
  flex: 1;
  overflow: hidden;
  
  ${props => props['data-debug'] && `
    ${debugBorder('#44FF44')}
    ${debugLabel({
      name: 'LayoutWrapper > ContentWrapper',
      hierarchy: '2',
      color: '#44FF44'
    })}
  `}
`;

const MainContent = styled('div')<DebugProps>`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
  width: 100%;
  
  @media (min-width: 1024px) {
    max-width: calc(100% - 320px);
  }
  
  ${props => props['data-debug'] && `
    ${debugBorder('#4444FF')}
    ${debugLabel({
      name: 'ContentWrapper > MainContent',
      hierarchy: '3',
      color: '#4444FF'
    })}
  `}
`;

const SidebarArea = styled('div')<DebugProps>`
  width: 320px;
  height: 100%;
  border-left: 1px solid ${colors.dashboard.background};
  background: ${colors.cardBg};
  display: none;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  
  @media (min-width: 1024px) {
    display: flex;
  }
  
  ${props => props['data-debug'] && `
    ${debugBorder('#FF44FF')}
    ${debugLabel({
      name: 'ContentWrapper > SidebarArea',
      hierarchy: '3',
      color: '#FF44FF'
    })}
  `}
`;

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const debugMode = useRecoilValue(debugModeState);

  return (
    <LayoutWrapper data-debug={debugMode}>
      <Header />
      <ContentWrapper data-debug={debugMode}>
        <MainContent data-debug={debugMode}>
          {children}
        </MainContent>
        <SidebarArea data-debug={debugMode}>
          <Dashboard />
        </SidebarArea>
      </ContentWrapper>
    </LayoutWrapper>
  );
};

export default DashboardLayout; 