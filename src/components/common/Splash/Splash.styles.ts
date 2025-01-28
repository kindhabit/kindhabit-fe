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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  z-index: 99999;
`;

export const FlowItemSplash = styled.div<BaseSplashProps>`
  ${BaseSplash}
  position: absolute;
  top: -40%;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.5);
  z-index: 100;
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
        return '75px';
      case 'flowItem':
        return '120px';
      case 'standalone':
      default:
        return '240px';
    }
  }};
  height: auto;
  animation: ${({ $animation }) => getAnimation($animation)};
  opacity: 0.7;
`;

export const SplashMessage = styled.div`
  color: #666;
  font-size: 14px;
  text-align: center;
`; 