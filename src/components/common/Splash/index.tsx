import React from 'react';
import { useTheme } from 'styled-components';
import { StandaloneSplash, FlowItemSplash, IndicatorSplash, SplashImage, SplashMessage } from './Splash.styles';

type SplashComponentType = typeof StandaloneSplash | typeof FlowItemSplash | typeof IndicatorSplash;

export interface SplashProps {
  variant: 'standalone' | 'flowItem' | 'indicator';
  variantProps?: {
    $type?: 'fixed' | 'absolute';
    $prevElement?: HTMLElement | null;
    $targetElement?: HTMLElement | null;
    $placement?: 'left' | 'right';
    $verticalAlign?: 'top' | 'center' | 'bottom';
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
  const theme = useTheme();
  const Component: React.ComponentType<any> = variant === 'standalone' 
    ? StandaloneSplash 
    : variant === 'flowItem' 
      ? FlowItemSplash 
      : IndicatorSplash;

  const defaultSplashImage = theme.logo?.height?.xog 
    ? '/assets/mdx.png' 
    : '/assets/splash.png';

  React.useEffect(() => {
    if (isVisible) {
      const checkSplashImage = () => {
        const img = new Image();
        img.onload = () => {
          console.log('Splash image loaded successfully:', {
            path: theme.assets?.splash?.image || defaultSplashImage,
            size: `${img.width}x${img.height}`,
            status: 'success',
            variant,
            message
          });
        };
        img.onerror = (error) => {
          console.error('Failed to load splash image:', {
            path: theme.assets?.splash?.image || defaultSplashImage,
            error: error,
            status: 'error',
            variant,
            message
          });
        };
        img.src = theme.assets?.splash?.image || defaultSplashImage;
      };
      
      checkSplashImage();
    }
  }, [isVisible, variant, message, theme.assets?.splash?.image, defaultSplashImage]);

  React.useEffect(() => {
    if (!isVisible && onComplete) {
      const timer = setTimeout(onComplete, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return (
    <Component
      $isVisible={isVisible}
      $animation={animation}
      {...variantProps}
    >
      <SplashImage 
        src={theme.assets?.splash?.image || defaultSplashImage} 
        alt="Loading..." 
        $animation={animation}
        $variant={variant}
      />
      {message && <SplashMessage>{message}</SplashMessage>}
    </Component>
  );
}; 