import React from 'react';
import { StandaloneSplash, FlowItemSplash, IndicatorSplash, SplashImage, SplashMessage } from './Splash.styles';

export interface SplashProps {
  variant: 'standalone' | 'flowItem' | 'indicator';
  variantProps?: {
    $type?: 'fixed' | 'absolute';
    $prevElement?: HTMLElement | null;
    $targetElement?: HTMLElement | null;
    $placement?: 'left' | 'right' | 'top' | 'bottom';
    $offset?: number;
  };
  message?: string;
  isVisible: boolean;
  animation?: 'fade' | 'pulse' | 'blink';
  onComplete?: () => void;
}

export const Splash: React.FC<SplashProps> = ({
  variant,
  variantProps,
  message,
  isVisible,
  animation = 'fade',
  onComplete
}) => {
  const SplashComponent = {
    standalone: StandaloneSplash,
    flowItem: FlowItemSplash,
    indicator: IndicatorSplash
  }[variant];

  React.useEffect(() => {
    if (!isVisible && onComplete) {
      const timer = setTimeout(onComplete, 1000); // 페이드 아웃 후 콜백
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return (
    <SplashComponent
      $isVisible={isVisible}
      $animation={animation}
      {...variantProps}
    >
      <SplashImage src="/assets/splash.png" alt="Loading..." />
      {message && <SplashMessage>{message}</SplashMessage>}
    </SplashComponent>
  );
}; 