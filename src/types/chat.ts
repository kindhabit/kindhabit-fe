import { SliderItem } from './slider';

export type ChatType = 'user' | 'jerry' | 'slider';

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
  position?: ChatLinkPosition;
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
  showProfile?: boolean;
  profilePosition?: ChatProfilePosition;
}

export interface TextMessage extends BaseMessage {
  type: 'user' | 'jerry';
  message: string;
  buttons?: ChatButton[];
  link?: ChatLink;
  profileText?: string;
  isLink?: boolean;
  buttonPosition?: 'inside' | 'outside';
}

export interface SliderMessage extends BaseMessage {
  type: 'slider';
  sliderData: SliderItem[];
}

export type ChatMessage = TextMessage | SliderMessage;

export interface ChatBubbleProps {
  message: ChatMessage;
  onHeightChange?: (height: number) => void;
  margin?: string;
  'data-debug'?: boolean;
} 