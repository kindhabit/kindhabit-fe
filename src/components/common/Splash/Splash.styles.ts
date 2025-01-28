import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const blink = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

interface BaseSplashProps {
  $isVisible: boolean;
  $animation?: 'fade' | 'pulse' | 'blink';
}

const getAnimation = ($animation?: string) => {
  switch ($animation) {
    case 'pulse':
      return css`${pulse} 2s ease-in-out infinite`;
    case 'blink':
      return css`${blink} 1s ease-in-out infinite`;
    default:
      return '';
  }
};

const BaseSplash = css<BaseSplashProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};
  transition: opacity 0.5s ease-in-out;
  animation: ${({ $isVisible }) => ($isVisible ? fadeIn : fadeOut)} 0.5s ease-in-out;
`;

export const StandaloneSplash = styled.div<BaseSplashProps & { type?: 'fixed' | 'absolute' }>`
  ${BaseSplash}
  position: ${({ type }) => type === 'fixed' ? 'fixed' : 'absolute'};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  z-index: 1000;
`;

export const FlowItemSplash = styled.div<BaseSplashProps>`
  ${BaseSplash}
  position: relative;
  padding: 16px;
  margin: 8px 0;
`;

export const IndicatorSplash = styled.div<BaseSplashProps & { 
  $placement?: 'left' | 'right';
  $verticalAlign?: 'top' | 'center' | 'bottom';
  $offset?: number;
}>`
  ${BaseSplash}
  position: absolute;
  ${({ $placement = 'left', $verticalAlign = 'center', $offset = 8 }) => {
    const basePosition = $placement === 'left'
      ? css`
          right: 100%;
          margin-right: ${$offset}px;
        `
      : css`
          left: 100%;
          margin-left: ${$offset}px;
        `;

    const verticalPosition = (() => {
      switch ($verticalAlign) {
        case 'top':
          return css`
            top: 0;
            transform: translateY(0);
          `;
        case 'bottom':
          return css`
            bottom: 0;
            transform: translateY(0);
          `;
        default:
          return css`
            top: 50%;
            transform: translateY(-50%);
          `;
      }
    })();

    return css`
      ${basePosition}
      ${verticalPosition}
    `;
  }}
`;

export const SplashImage = styled.img<{ $animation?: string; $variant?: 'standalone' | 'flowItem' | 'indicator' }>`
  width: ${({ $variant }) => {
    switch ($variant) {
      case 'indicator':
        return '25px';
      case 'flowItem':
        return '40px';
      case 'standalone':
      default:
        return '50px';
    }
  }};
  height: auto;
  animation: ${({ $animation }) => getAnimation($animation)};
`;

export const SplashMessage = styled.div`
  color: #666;
  font-size: 14px;
  text-align: center;
`; 