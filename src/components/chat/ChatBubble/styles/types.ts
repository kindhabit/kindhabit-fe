import { Theme } from '@/core/theme/types/theme';
import { Message } from '@/types/chat';

export interface StyledProps {
  theme: Theme;
  'data-debug'?: boolean;
}

export interface BubbleProps extends StyledProps {
  $type?: Message.Type.Display;
  $sender?: Message.Type.Sender;
  $prevSender?: Message.Type.Sender;
  $prevType?: Message.Type.Display;
  $hasLink?: boolean;
  $margin?: string;
  $animation?: Message.Type.Animation;
  $animationDelay?: number;
  $verticalAlign?: 'top' | 'center' | 'bottom';
}

export interface MessageProps extends StyledProps {
  $type?: Message.Type.Display;
  $sender?: Message.Type.Sender;
  $hasButtons?: boolean;
  $animation?: Message.Type.Animation;
  $animationDelay?: number;
}

export interface ButtonProps extends StyledProps {
  $position?: 'bottom' | 'right';
  $variant?: 'primary' | 'secondary';
}

export interface ProfileProps extends StyledProps {
  $position?: {
    top?: number;
    left?: number;
    align?: 'left' | 'right';
  };
} 