import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '@/core/theme';
import { RecoilRoot } from 'recoil';
import App from './App';
import './index.css';

// 환경별 타이틀 설정
const SERVICE_TITLES = {
  supplement: '착한습관 AI 김제리 연구소 입니다',
  blue: 'Phems - XOG AI 검진 플래닝',
  brown: '착한습관 AI 김제리 연구소 입니다',
  default: '착한습관'
} as const;

// 타이틀 설정 함수
const setDocumentTitle = () => {
  const mode = import.meta.env.VITE_SERVICE_MODE;
  console.log('Current mode:', mode);
  document.title = SERVICE_TITLES[mode as keyof typeof SERVICE_TITLES] || SERVICE_TITLES.default;
};

// 초기 타이틀 설정
setDocumentTitle();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
