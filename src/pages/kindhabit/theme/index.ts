import { Theme } from '@/core/theme/types/theme';

// Kindhabit 테마 색상
export const kindhabitTheme: Theme = {
  colors: {
    textPrimary: "#000000",
    textSecondary: "#666666",
    white: "#ffffff",
    background: "#f5e6d3",
    cardBg: "#fff9f2",
    dialogBg: "#fdfaf7",
    primary: "#6B4423",
    primaryDark: "#4A3B2C",
    primaryHover: "#8B5E34",
    secondary: "#8B7355",
    secondaryDark: "#6B4423",
    secondaryHover: "#A68B6C",
    logoText: "#4A3B2C",
    scrollbar: "#D4C3B3",
    border: "#E8E1D9",
    dashboard: {
      background: "#FAF7F2"
    },
    chat: {
      background: "#FFFFFF",
      messageArea: {
        background: "#FFFFFF"
      },
      bubble: {
        jerry: {
          background: "#FAF7F2",
          backgroundAlpha: 1,
          text: "#000000",
          border: "#E8E1D9"
        },
        user: {
          background: "#6B4423",
          backgroundAlpha: 0.1,
          text: "#000000"
        },
        profile: {
          text: "#666666"
        },
        button: {
          background: "#6B4423",
          text: "#FFFFFF",
          hover: "#8B5E34"
        }
      },
      slider: {
        card: {
          background: "#FFFFFF",
          backgroundAlpha: 1,
          border: "#E8E1D9",
          selectedBorder: "#6B4423",
          shadow: "rgba(107, 68, 35, 0.1)",
          hoverShadow: "rgba(107, 68, 35, 0.2)"
        },
        title: {
          text: "#000000"
        },
        description: {
          text: "#666666",
          border: "#E8E1D9"
        },
        tag: {
          background: "#F5E6D3",
          text: "#6B4423"
        },
        navigator: {
          active: "#6B4423",
          inactive: "#D4C3B3",
          hover: "#8B5E34"
        }
      }
    },
    debug: {}
  },
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
  spacing: {
    unit: 8,
    get: (multiplier: number) => `${8 * multiplier}px`,
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    get: {
      mobile: '@media (min-width: 320px)',
      tablet: '@media (min-width: 768px)',
      desktop: '@media (min-width: 1024px)',
    },
  },
}; 