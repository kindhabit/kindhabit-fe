import { Theme, ThemeMode } from './types/theme';
import { THEME_MODE } from './constants/theme';
import { brownColors } from './variants/brown';
import { blueColors } from './variants/blue';
import { baseTheme } from './base';
import { xogOverrides } from './variants/xog';
import deepmerge from 'deepmerge';

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
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px'
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
export const colors = import.meta.env.VITE_SERVICE_MODE === THEME_MODE.BLUE ? blueColors : brownColors;

export const createTheme = (variant: ThemeMode): Theme => {
  const base = baseTheme;
  const colors = variant === 'blue' 
    ? blueColors 
    : deepmerge(blueColors, xogOverrides);

  return {
    ...base,
    colors
  };
};

export const theme = createTheme('blue');

export * from './types/theme';
export * from './variants/brown';
export * from './variants/blue';
export default theme; 