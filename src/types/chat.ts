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