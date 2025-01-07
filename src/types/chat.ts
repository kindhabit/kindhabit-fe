export type MessageType = 'assistant' | 'user';
export type UserMessageSubType = 'message' | 'response';

export interface ChatMessageType {
  id: string;
  type: MessageType;
  subType?: UserMessageSubType;  // user 타입일 때만 사용
  content: string;
  timestamp: Date;
} 