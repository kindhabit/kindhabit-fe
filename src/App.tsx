import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import theme from './theme';
import Router from './Router';
import { Profiler } from 'react';

function App() {
  const handleProfiler = (
    id: string,
    phase: string,
    actualDuration: number,
    baseDuration: number
  ) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${id}] ${phase}: ${Math.round(actualDuration)}ms`);
    }
  };

  return (
    <Profiler id="App" onRender={handleProfiler}>
      <RecoilRoot>
        <MuiThemeProvider theme={theme}>
          <EmotionThemeProvider theme={theme}>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </EmotionThemeProvider>
        </MuiThemeProvider>
      </RecoilRoot>
    </Profiler>
  );
}

export default App; 