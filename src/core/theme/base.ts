import { Theme } from './types/theme';

export const baseTheme: Omit<Theme, 'colors'> = {
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