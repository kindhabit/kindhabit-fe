import { ThemeColors } from '../types/theme';

// 공통 색상
const commonColors = {
  textPrimary: "#000000",
  textSecondary: "#666666",
  white: "#ffffff",
  debug: {}
};

// 블루 테마 색상
export const blueColors: ThemeColors = {
  text: {
    primary: "#000000",
    secondary: "#666666"
  },
  gender: {
    male: "#4B7BF5",
    female: "#FF69B4"
  },
  white: "#ffffff",
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
      system: {
        background: "#FFFFFF",
        backgroundAlpha: 1,
        text: "#000000",
        border: "#E8F0FF"
      },
      profile: {
        text: "#4B7BF5",
        spacing: {
          sameSpeaker: '0px',
          differentSpeaker: '8px',
          profile: {
            top: '-24px',
            image: {
              size: '32px',
              borderRadius: '50%'
            }
          }
        }
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
  },
  debug: {},
  assets: {
    splash: {
      image: '/assets/mdx.png'
    }
  }
}; 