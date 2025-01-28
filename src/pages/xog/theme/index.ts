import { Theme } from '@/core/theme/types/theme';

// XOG 테마 색상
export const xogTheme: Theme = {
  colors: {
    text: {
      primary: "#000000",
      secondary: "#666666"
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
        background: "#FFFFFF"
      },
      bubble: {
        system: {
          background: "#F5F8FF",
          backgroundAlpha: 1,
          text: "#000000",
          border: "#E8F0FF"
        },
        user: {
          background: "#4B7BF5",
          backgroundAlpha: 0.1,
          text: "#000000"
        },
        profile: {
          text: "#666666",
          spacing: {
            sameSpeaker: '8px',    // 동일 화자 메시지 간격
            differentSpeaker: '24px', // 다른 화자 메시지 간격
            profile: {
              top: '-24px',        // 프로필 상단 간격
              image: {
                size: '32px',      // 프로필 이미지 크기
                borderRadius: '50%' // 프로필 이미지 모서리
              }
            }
          }
        },
        button: {
          background: "#4B7BF5",
          text: "#FFFFFF",
          hover: "#6B93FF"
        }
      },
      slider: {
        card: {
          background: "#FFFFFF",
          backgroundAlpha: 1,
          border: "#E8F0FF",
          selectedBorder: "#4B7BF5",
          shadow: "rgba(75, 123, 245, 0.1)",
          hoverShadow: "rgba(75, 123, 245, 0.2)"
        },
        title: {
          text: "#000000"
        },
        description: {
          text: "#666666",
          border: "#E8F0FF"
        },
        tag: {
          background: "#F5F8FF",
          text: "#4B7BF5"
        },
        navigator: {
          active: "#4B7BF5",
          inactive: "#D4E0FF",
          hover: "#6B93FF"
        }
      }
    },
    debug: {}
  },
  assets: {
    splash: {
      image: '/assets/mdx.png'
    }
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
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
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
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px'
  },
  logo: {
    height: {
      kindhabit: '120px',
      xog: '20px'
    }
  }
}; 