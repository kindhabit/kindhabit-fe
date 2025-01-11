import { styled } from '@mui/material/styles';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/store/debug';
import { createDebugStyles } from '@/styles/debug';
import Header from './Header';

interface DebugProps {
  'data-debug'?: boolean;
}

const LayoutWrapper = styled('div')<DebugProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  position: relative;
  
  ${createDebugStyles({
    name: 'App > Layout',
    hierarchy: '1',
    color: '#FF0000',
    borderWidth: '2px'
  })}
`;

const HeaderArea = styled('div')<DebugProps>`
  position: relative;
  
  ${createDebugStyles({
    name: 'Layout > HeaderSection',
    hierarchy: '2',
    color: '#00FF00'
  })}
`;

const MainContent = styled('div')<DebugProps>`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
  
  ${createDebugStyles({
    name: 'Layout > MainSection',
    hierarchy: '2',
    color: '#0000FF'
  })}
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const debugMode = useRecoilValue(debugModeState);

  const childrenWithDebug = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { 'data-debug': debugMode });
    }
    return child;
  });

  return (
    <LayoutWrapper data-debug={debugMode}>
      <HeaderArea data-debug={debugMode}>
        <Header data-debug={debugMode} />
      </HeaderArea>
      <MainContent data-debug={debugMode}>
        {childrenWithDebug}
      </MainContent>
    </LayoutWrapper>
  );
};

export default Layout; 