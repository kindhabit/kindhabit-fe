import { ThemeColors } from '../types/theme';

export const xogOverrides: Partial<ThemeColors> = {
  chat: {
    background: "#FFFFFF",
    messageArea: {
      background: "#FFFFFF"
    },
    bubble: {
      user: {
        background: "#4B7BF5",
        backgroundAlpha: 0.1,
        text: "#000000"
      },
      system: {
        background: "#F5F8FF",
        backgroundAlpha: 1,
        text: "#000000",
        border: "#E8F0FF"
      },
      profile: {
        text: "#666666",
        spacing: {
          sameSpeaker: '8px',
          differentSpeaker: '24px',
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
      }
    }
  }
}; 