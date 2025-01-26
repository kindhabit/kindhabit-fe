import styled, { css } from 'styled-components';
import { DebugProps } from '@/types/theme';
import { createDebugStyles } from '@/styles/debug';

interface ButtonProps extends DebugProps {
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  color?: string;
  disabled?: boolean;
}

const buttonSizes = {
  small: css`
    padding: ${props => `${props.theme.spacing.get(1)} ${props.theme.spacing.get(2)}`};
    font-size: ${props => props.theme.typography.body2.fontSize};
  `,
  medium: css`
    padding: ${props => `${props.theme.spacing.get(1.5)} ${props.theme.spacing.get(3)}`};
    font-size: ${props => props.theme.typography.body1.fontSize};
  `,
  large: css`
    padding: ${props => `${props.theme.spacing.get(2)} ${props.theme.spacing.get(4)}`};
    font-size: ${props => props.theme.typography.h2.fontSize};
  `
};

export const Button = styled.button<ButtonProps>`
  ${createDebugStyles({
    name: 'Button',
    color: props => props.theme.colors.debug?.button || '#FF6B6B'
  })}
  font-family: ${props => props.theme.typography.fontFamily};
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  ${props => buttonSizes[props.size || 'medium']}
  
  ${props => {
    const color = props.color || props.theme.colors.primary;
    
    switch(props.variant) {
      case 'outlined':
        return css`
          background: transparent;
          border: 1px solid ${color};
          color: ${color};
          
          &:hover {
            background: ${color}10;
          }
        `;
      case 'text':
        return css`
          background: transparent;
          color: ${color};
          
          &:hover {
            background: ${color}10;
          }
        `;
      default: // contained
        return css`
          background: ${color};
          color: white;
          
          &:hover {
            background: ${props.theme.colors.primaryHover};
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const IconButton = styled.button<{ size?: 'small' | 'medium' | 'large' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.2s;
  padding: 0;
  
  width: ${props => {
    switch(props.size) {
      case 'small': return props.theme.spacing.get(4);
      case 'large': return props.theme.spacing.get(6);
      default: return props.theme.spacing.get(5);
    }
  }};
  
  height: ${props => {
    switch(props.size) {
      case 'small': return props.theme.spacing.get(4);
      case 'large': return props.theme.spacing.get(6);
      default: return props.theme.spacing.get(5);
    }
  }};
  
  &:hover {
    background-color: ${props => props.theme.colors.primary}10;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`; 