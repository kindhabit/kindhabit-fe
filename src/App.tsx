import React from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Layout from './components/common/Layout';
import ChatContainer from './components/chat/ChatContainer';
import { debugModeState } from './store/debug';

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
      <div data-debug={debugMode}>
        <Layout>
          <ChatContainer />
        </Layout>
      </div>
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