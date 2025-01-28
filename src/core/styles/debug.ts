import type { DefaultTheme } from 'styled-components';
import { css } from 'styled-components';
import { DebugProps } from '@/types/debug';
import { Theme } from '@/core/theme/types/theme';

interface DebugConfig {
  name: string;
  hierarchy?: string;
  color?: string | ((props: { theme: DefaultTheme } & any) => string);
}

export const debugBorder = (color: string | ((props: { theme: DefaultTheme } & any) => string)) => 
  (props: { theme: DefaultTheme } & any) => `
    border: 2px dashed ${typeof color === 'function' ? color(props) : color};
  `;

export const debugLabel = (config: DebugConfig) => 
  (props: { theme: DefaultTheme } & any) => `
    &::before {
      content: '${config.name}${config.hierarchy ? ` (${config.hierarchy})` : ''}';
      position: absolute;
      top: -24px;
      left: ${config.hierarchy ? `${(parseInt(config.hierarchy) - 1) * 100}px` : '0'};
      background: ${typeof config.color === 'function' ? config.color(props) : (config.color || '#000')};
      color: white;
      padding: 2px 8px;
      font-size: 11px;
      border-radius: 4px;
      white-space: nowrap;
      z-index: ${config.hierarchy ? 9999 - parseInt(config.hierarchy) : 9999};
    }
  `;

export const createDebugStyles = (config: DebugConfig) => css<DebugProps>`
  ${props =>
    props['data-debug'] &&
    css`
      ${props => !props.style?.position && css`position: relative;`}
      ${debugBorder(config.color || '#000')(props)}
      ${debugLabel(config)(props)}
    `}
`; 