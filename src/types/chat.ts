import { SliderItem } from './slider';

export interface BaseMessage {
  type: 'message' | 'slider';
}

export interface ChatTextMessage extends BaseMessage {
  type: 'message';
  message: ChatBubbleMessage;
  link?: ChatLinkMessage;
}

export interface ChatSliderMessage extends BaseMessage {
  type: 'slider';
  sliderData: SliderItem[];
}

export type ChatMessage = ChatTextMessage | ChatSliderMessage;

export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ChatButton {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export interface ChatBubbleMessage {
  id: string;
  type: 'jerry' | 'user';
  message: string;
  showProfile: boolean;
  consecutive: boolean;
  buttons?: ChatButton[];
  isHistory?: boolean;
  depth: number;
  parentMessageId?: string;
  timestamp: number;
}

export interface ChatLinkPosition {
  align: 'left' | 'right';
  bottom: number;
}

export interface ChatLinkMessage {
  text: string;
  onClick?: () => void;
  position: ChatLinkPosition;
} 