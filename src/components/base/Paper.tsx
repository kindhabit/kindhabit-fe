import styled, { css } from 'styled-components';
import { DebugProps } from '@/types/theme';
import { createDebugStyles } from '@/core/styles/debug';

interface PaperProps extends DebugProps {
  variant?: 'elevation' | 'outlined';
  elevation?: 0 | 1 | 2 | 3 | 4;
  padding?: number;
  radius?: number;
  bgColor?: string;
}

const elevationStyles = {
  0: 'none',
  1: '0 2px 4px rgba(0, 0, 0, 0.05)',
  2: '0 4px 8px rgba(0, 0, 0, 0.1)',
  3: '0 8px 16px rgba(0, 0, 0, 0.1)',
  4: '0 12px 24px rgba(0, 0, 0, 0.15)'
};

export const Paper = styled.div<PaperProps>`
  ${createDebugStyles({
    name: 'Paper',
    color: props => props.theme.colors.debug?.paper || '#845EC2'
  })}
  background: ${props => props.bgColor || props.theme.colors.cardBg};
  border-radius: ${props => props.radius !== undefined ? `${props.radius}px` : '8px'};
  padding: ${props => props.padding !== undefined ? props.theme.spacing.get(props.padding) : 0};
  
  ${props => {
    if (props.variant === 'outlined') {
      return css`
        border: 1px solid ${props.theme.colors.primary}10;
        box-shadow: none;
      `;
    }
    
    return css`
      border: none;
      box-shadow: ${elevationStyles[props.elevation || 1]};
    `;
  }}
`; 