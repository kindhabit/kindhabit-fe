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
  zIndex?: number;
  showOnHover?: boolean;
}

export const debugLabel = ({
  name,
  hierarchy,
  color,
  zIndex = 9000
}: DebugLabelProps) => css`
  position: relative;

  &::before {
    content: '[${hierarchy}] ${name}';
    position: absolute;
    top: 4px;
    left: 4px;
    background-color: ${color};
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 11px;
    white-space: nowrap;
    z-index: ${zIndex};
    opacity: 0;
    transition: opacity 0.2s;
  }
`; 