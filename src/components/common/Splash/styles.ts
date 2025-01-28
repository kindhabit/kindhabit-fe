export const SplashContainer = styled.div<SplashProps>`
  position: absolute;
  right: ${props => props.$placement === 'right' ? '20px' : 'auto'};
  left: ${props => props.$placement === 'left' ? '20px' : 'auto'};
  bottom: ${props => props.$prevElement ? '0' : '20px'};
  transform: ${props => props.$prevElement ? 'translateY(calc(100% + 8px))' : 'none'};
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: ${props => props.theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;

  animation: ${props => props.$animation === 'pulse' ? pulseAnimation : fadeInAnimation} 1s ease-in-out infinite;
`; 