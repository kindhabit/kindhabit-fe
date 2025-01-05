import { createTheme } from '@mui/material/styles';

export const colors = {
  background: '#f5e6d3',
  cardBg: '#fff9f2',
  dialogBg: '#fdfaf7',
  primary: '#1976d2',
  textPrimary: '#000000',
  textSecondary: '#666666',
  brown: '#6B4423',
  logoText: '#4A3B2C',
};

const baseTheme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
    background: {
      default: colors.background,
      paper: colors.cardBg,
    },
  },
  spacing: 8, // 기본 spacing 단위 설정
  typography: {
    fontFamily: 'Pretendard, sans-serif',
    h1: {
      fontSize: '24px',
      fontWeight: 800,
    },
    h2: {
      fontSize: '20px',
      fontWeight: 700,
    },
    body1: {
      fontSize: '14px',
    },
    body2: {
      fontSize: '12px',
    },
  },
});

type FontSize = 'normal' | 'large';

const fontSettings = {
  normal: {
    fontSize: {
      title: '20px',
      subtitle: '16px',
      body: '14px',
      caption: '12px'
    },
    spacing: {
      card: '20px',
      element: '16px'
    },
    cardSize: {
      width: '260px',
      height: '180px'
    }
  },
  large: {
    fontSize: {
      title: '24px',
      subtitle: '20px',
      body: '18px',
      caption: '16px'
    },
    spacing: {
      card: '24px',
      element: '20px'
    },
    cardSize: {
      width: '300px',
      height: '220px'
    }
  }
};

export const createFontTheme = (size: FontSize) => {
  const settings = fontSettings[size];
  return settings;
};

export default baseTheme; 