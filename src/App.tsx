import React from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Layout from './components/common/Layout';
import ChatContainer from './components/chat/ChatContainer';
import { debugModeState } from './store/debug';
import styled from 'styled-components';
import { DebugProps } from './types/debug';
import { debugLabel } from './components/chat/ChatBubble/styles';
import { colors } from './theme';

const AppLayout = styled.div<DebugProps>`
  ${props => props['data-debug'] && `
    border: 1px dashed ${colors.debug.appLayout};
    ${debugLabel(colors.debug.appLayout, 'AppLayout')}
  `}
`;

const Header = styled.header<DebugProps>`
  ${props => props['data-debug'] && `
    border: 1px dashed ${colors.debug.header};
    ${debugLabel(colors.debug.header, 'Header')}
  `}
`;

function AppContent() {
  const [debugMode, setDebugMode] = useRecoilState(debugModeState);

  const handleDoubleClick = (e: MouseEvent) => {
    setDebugMode(prev => {
      const newState = !prev;
      console.log(`Debug mode ${newState ? 'ON' : 'OFF'}`);
      return newState;
    });
  };

  React.useEffect(() => {
    window.addEventListener('dblclick', handleDoubleClick);
    return () => window.removeEventListener('dblclick', handleDoubleClick);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppLayout data-debug={debugMode}>
        <Header data-debug={debugMode}>
          <Layout>
            <ChatContainer />
          </Layout>
        </Header>
      </AppLayout>
    </ThemeProvider>
  );
}

function App() {
  return (
    <RecoilRoot>
      <AppContent />
    </RecoilRoot>
  );
}

export default App; 