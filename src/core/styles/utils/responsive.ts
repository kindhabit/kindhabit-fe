import { css } from 'styled-components';
import { Theme } from '@/core/theme/types/theme';

type BreakpointKey = keyof Theme['breakpoints']['get'];

export const responsive = (breakpoint: BreakpointKey, styles: string) => css`
  ${({ theme }) => theme.breakpoints.get[breakpoint]} {
    ${styles}
  }
`;

export const mobile = (styles: string) => responsive('mobile', styles);
export const tablet = (styles: string) => responsive('tablet', styles);
export const desktop = (styles: string) => responsive('desktop', styles); 