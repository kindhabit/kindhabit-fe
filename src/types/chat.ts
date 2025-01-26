import { SliderItem } from './slider';

export type ChatType = 'jerry' | 'user' | 'slider' | 'loading';

export interface ChatLinkPosition {
  top?: number;
  bottom?: number;
  align?: 'left' | 'right';
}

export interface ChatProfilePosition {
  align?: 'left' | 'right';
  top?: number;
}

export interface ChatLink {
  text: string;
  onClick?: () => void;
  $position?: ChatLinkPosition;
}

export interface ChatButton {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export interface BaseMessage {
  id: string;
  type: ChatType;
  timestamp: number;
}

export interface TextMessage extends BaseMessage {
  type: 'jerry' | 'user';
  message: string;
  link?: ChatLink & { url?: string };
  buttons?: ChatButton[];
  buttonPosition?: 'bottom' | 'right' | 'inside';
  showProfile?: boolean;
  profileText?: string;
}

export interface SliderMessage extends BaseMessage {
  type: 'slider';
  sliderData: SliderItem[];
}

export interface LoadingMessage extends BaseMessage {
  type: 'loading';
  message: string;
  isTemporary?: boolean;
}

export type ChatMessage = TextMessage | SliderMessage | LoadingMessage;

export interface ChatBubbleProps {
  message: ChatMessage;
  onHeightChange?: (height: number) => void;
  margin?: string;
  'data-debug'?: boolean;
} 