import { createTheme } from '@mui/material/styles';

export const colors = {
  background: '#f5e6d3',
  cardBg: '#fff9f2',
  dialogBg: '#fdfaf7',
  primary: '#6B4423',
  primaryDark: '#4A3B2C',
  primaryHover: '#8B5E34',
  secondary: '#f5f5f5',
  secondaryDark: '#e0e0e0',
  secondaryHover: '#e8e8e8',
  textPrimary: '#000000',
  textSecondary: '#666666',
  brown: '#6B4423',
  logoText: '#4A3B2C',
  dashboard: {
    background: '#fff9f2'
  },
  chat: {
    background: '#fdfaf7',
    userBubble: '#6B4423',
    jerryBubble: '#ffffff',
    userText: '#ffffff',
    jerryText: '#000000',
    messageArea: {
      background: '#fff9f2'
    }
  },
  debug: {
    chatWrapper: '#FF4444',
    bubbleWrapper: '#FF6B6B',
    bubbleContainer: '#4ECDC4',
    profileSection: '#45B7D1',
    messageBubble: '#96CEB4',
    buttonContainer: '#FFD93D',
    linkText: '#FF9F1C',
    sliderSection: '#A8E6CF',
    sliderContainer: '#6C5CE7',
    sliderCard: '#FF8B94',
    cardContent: '#845EC2',
    iconWrapper: '#00C9A7',
    tagsContainer: '#C56CF0',
    tag: '#FF7675',
    dotsContainer: '#74B9FF',
    contentSection: '#44FF44',
    messageSection: '#4444FF',
    inputSection: '#FF8844'
  }
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