import { Theme, ThemeColors } from './types/theme';
import { THEME_MODE, THEME_COLORS } from './constants/theme';

// 공통 색상
const commonColors = {
  textPrimary: "#000000",
  textSecondary: "#666666",
  white: "#ffffff",
  debug: {}
};

// 브라운 테마 색상
export const brownTheme: ThemeColors = {
  ...commonColors,
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
      background: "#FAF7F2"
    },
    bubble: {
      user: {
        background: "#7B5F3F",
        backgroundAlpha: 0.95,
        text: "#FFFFFF"
      },
      jerry: {
        background: "#F8F4F0",
        backgroundAlpha: 0.85,
        text: "#000000",
        border: "#E8E1D9"
      },
      profile: {
        text: "#8B7355"
      },
      button: {
        background: "#8B7355",
        text: "#FFFFFF",
        hover: "#A68B6C"
      }
    },
    slider: {
      card: {
        background: "#F8F4F0",
        backgroundAlpha: 0.92,
        border: "#E8E1D9",
        selectedBorder: "#6B4423",
        shadow: "rgba(0, 0, 0, 0.02)",
        hoverShadow: "rgba(0, 0, 0, 0.06)"
      },
      title: {
        text: "#000000"
      },
      description: {
        text: "#666666",
        border: "#F0F0F0"
      },
      tag: {
        background: "#F5E6D3",
        text: "#6B4423"
      },
      navigator: {
        active: "#6B4423",
        inactive: "#8B7355",
        hover: "#A68B6C"
      }
    }
  }
};

// 블루 테마 색상
export const blueTheme: ThemeColors = {
  ...commonColors,
  background: "#f5f8ff",
  cardBg: "#ffffff",
  dialogBg: "#ffffff",
  primary: "#4B7BF5",
  primaryDark: "#3561D6",
  primaryHover: "#6B93FF",
  secondary: "#82A4FF",
  secondaryDark: "#4B7BF5",
  secondaryHover: "#9DB8FF",
  logoText: "#3561D6",
  scrollbar: "#D4E0FF",
  border: "#E8F0FF",
  dashboard: {
    background: "#F5F8FF"
  },
  chat: {
    background: "#FFFFFF",
    messageArea: {
      background: "#F5F8FF"
    },
    bubble: {
      user: {
        background: "#4B7BF5",
        backgroundAlpha: 0.95,
        text: "#FFFFFF"
      },
      jerry: {
        background: "#F5F8FF",
        backgroundAlpha: 0.85,
        text: "#000000",
        border: "#E8F0FF"
      },
      profile: {
        text: "#4B7BF5"
      },
      button: {
        background: "#82A4FF",
        text: "#FFFFFF",
        hover: "#9DB8FF"
      }
    },
    slider: {
      card: {
        background: "#F5F8FF",
        backgroundAlpha: 0.92,
        border: "#E8F0FF",
        selectedBorder: "#4B7BF5",
        shadow: "rgba(0, 0, 0, 0.02)",
        hoverShadow: "rgba(0, 0, 0, 0.06)"
      },
      title: {
        text: "#000000"
      },
      description: {
        text: "#666666",
        border: "#F0F0F0"
      },
      tag: {
        background: "#E3F2FD",
        text: "#4B7BF5"
      },
      navigator: {
        active: "#4B7BF5",
        inactive: "#82A4FF",
        hover: "#9DB8FF"
      }
    }
  }
};

export const typography = {
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
};

export const spacing = {
  unit: 8,
  get: (multiplier: number) => `${multiplier * 8}px`,
};

const breakpointValues = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
} as const;

export const breakpoints = {
  ...breakpointValues,
  get: {
    mobile: `@media (min-width: ${breakpointValues.mobile})`,
    tablet: `@media (min-width: ${breakpointValues.tablet})`,
    desktop: `@media (min-width: ${breakpointValues.desktop})`,
  },
};

// 현재 활성화된 테마 색상
export const colors = process.env.VITE_SERVICE_MODE === THEME_MODE.BLUE ? blueTheme : brownTheme;

const theme: Theme = {
  colors,
  typography,
  spacing,
  breakpoints,
};

export type { Theme, ThemeColors };
export default theme; 