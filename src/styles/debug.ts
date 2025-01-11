import { css } from 'styled-components';

interface DebugConfig {
  name: string;
  hierarchy: string;
  color: string;
  borderWidth?: string;
}

export const createDebugStyles = (config: DebugConfig) => css<{ 'data-debug'?: boolean }>`
  ${props =>
    props['data-debug'] &&
    css`
      ${debugBorder(config.color, config.borderWidth || '1px')}
      ${debugLabel({
        name: config.name,
        hierarchy: config.hierarchy,
        color: config.color
      })}
    `}
`;

export const debugBorder = (color: string, width: string = '1px') => css`
  border: ${width} dashed ${color};
`;

interface DebugLabelProps {
  name: string;
  hierarchy: string;
  color: string;
}

export const debugLabel = ({ name, hierarchy, color }: DebugLabelProps) => css`
  position: relative;

  &::before {
    content: '${hierarchy}';
    position: absolute;
    top: -20px;
    left: 0;
    font-size: 12px;
    padding: 2px 6px;
    background-color: ${color};
    color: white;
    border-radius: 4px;
    z-index: 9999;
    opacity: 0;
    pointer-events: none;
  }

  &:hover::before {
    opacity: 0.9;
  }

  &::after {
    content: '${name}';
    position: absolute;
    top: -20px;
    left: 24px;
    font-size: 12px;
    padding: 2px 6px;
    background-color: ${color};
    color: white;
    border-radius: 4px;
    z-index: 9999;
    opacity: 0;
    pointer-events: none;
  }

  &:hover::after {
    opacity: 0.9;
  }
`; 