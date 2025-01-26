import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const spinnerSizes = {
  small: '16px',
  medium: '24px',
  large: '32px'
};

export const Spinner = styled.div<SpinnerProps>`
  width: ${props => spinnerSizes[props.size || 'medium']};
  height: ${props => spinnerSizes[props.size || 'medium']};
  border: 2px solid ${props => props.theme.colors.primary}20;
  border-top: 2px solid ${props => props.color || props.theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

interface LoadingOverlayProps {
  blur?: boolean;
}

export const LoadingOverlay = styled.div<LoadingOverlayProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.blur ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)'};
  backdrop-filter: ${props => props.blur ? 'blur(4px)' : 'none'};
  z-index: 1000;
`; 