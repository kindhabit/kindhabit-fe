export type ThemeMode = 'brown' | 'blue';

export interface Typography {
  fontFamily: string;
  h1: {
    fontSize: string;
    fontWeight: number;
  };
  h2: {
    fontSize: string;
    fontWeight: number;
  };
  body1: {
    fontSize: string;
  };
  body2: {
    fontSize: string;
  };
}

export interface Spacing {
  unit: number;
  get: (multiplier: number) => string;
}

export interface Breakpoints {
  mobile: string;
  tablet: string;
  desktop: string;
  get: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

export interface ThemeColors {
  background: string;
  cardBg: string;
  dialogBg: string;
  primary: string;
  primaryDark: string;
  primaryHover: string;
  secondary: string;
  secondaryDark: string;
  secondaryHover: string;
  logoText: string;
  scrollbar: string;
  border: string;
  dashboard: {
    background: string;
  };
  chat: {
    background: string;
    messageArea: {
      background: string;
    };
    bubble: {
      user: {
        background: string;
        backgroundAlpha: number;
        text: string;
      };
      jerry: {
        background: string;
        backgroundAlpha: number;
        text: string;
        border: string;
      };
      profile: {
        text: string;
      };
      button: {
        background: string;
        text: string;
        hover: string;
      };
    };
    slider: {
      card: {
        background: string;
        backgroundAlpha: number;
        border: string;
        selectedBorder: string;
        shadow: string;
        hoverShadow: string;
      };
      title: {
        text: string;
      };
      description: {
        text: string;
        border: string;
      };
      tag: {
        background: string;
        text: string;
      };
      navigator: {
        active: string;
        inactive: string;
        hover: string;
      };
    };
  };
  textPrimary: string;
  textSecondary: string;
  white: string;
  debug?: Record<string, string>;
}

export interface DebugProps {
  'data-debug'?: boolean;
  theme?: Theme;
}

export interface Theme {
  colors: ThemeColors;
  typography: Typography;
  spacing: Spacing;
  breakpoints: Breakpoints;
} 