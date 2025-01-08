export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  subType?: 'message' | 'response';
  content: string;
  timestamp: Date;
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ChatBubbleMessage {
  type: 'jerry' | 'user';
  message: string;
  showProfile?: boolean;
  consecutive?: boolean;
  buttons?: {
    text: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
  }[];
}

// 링크를 위한 별도 타입 정의
export interface ChatLinkMessage {
  text: string;
  onClick?: () => void;
  position: {
    align: 'left' | 'right';
    bottom: number;
  };
} 