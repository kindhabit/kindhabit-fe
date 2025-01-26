import { Theme } from './types/theme';
import { THEME_MODE } from './constants/theme';
import { brownTheme } from './variants/brown';
import { blueTheme } from './variants/blue';

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

export * from './types/theme';
export * from './variants/brown';
export * from './variants/blue';
export default theme; 