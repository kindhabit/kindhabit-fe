import { ThemeColors } from '../types/theme';

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