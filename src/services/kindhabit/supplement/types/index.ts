import { TextMessage as BaseTextMessage, CardMessage } from '@/types/chat';

// 영양제 추천 대상 타입
export type SupplementTarget = 'basic' | 'health' | 'custom';

// 영양제 추천 상태 관리
export const SupplementState = {
  INITIAL: 'initial',
  BASIC_RECOMMEND: 'basic_recommend',
  HEALTH_CHECK: 'health_check',
  CUSTOM_RECOMMEND: 'custom_recommend',
  CONFIRM: 'confirm'
} as const;

export type SupplementStateType = typeof SupplementState[keyof typeof SupplementState];

// 채팅 상태 타입
export const ChatState = {
  INITIAL: 'initial',
  LOADING: 'loading',
  READY: 'ready',
  WAITING: 'waiting'
} as const;

export type ChatStateType = typeof ChatState[keyof typeof ChatState];

// 링크 타입
export interface MessageLink {
  text: string;
  onClick: () => void;
  $position?: {
    bottom?: number;
    align?: 'left' | 'right';
  };
}

// 건강 정보 인터페이스
export interface HealthInfo {
  takingMedicine?: boolean;
  hasAllergy?: boolean;
  healthConcerns?: string[];
}

// 영양제 정보 인터페이스
export interface SupplementInfo {
  id: string;
  name: string;
  description: string;
  tags: string[];
  icon: string;
}

// 추천 정보 인터페이스
export interface RecommendInfo {
  target?: SupplementTarget;
  healthInfo?: HealthInfo;
  selectedSupplements?: string[];
}

// 확장된 메시지 타입
export interface ExtendedTextMessage extends Omit<BaseTextMessage, 'message'> {
  text: string;
  link?: MessageLink;
}

// 영양제 카드 타입
export interface SupplementCardProps {
  id: string;
  type: 'default';
  title: string;
  description: string;
  icon: { emoji: string };
  tags: string[];
  buttonText: string;
}

// 영양제 카드 메시지 타입
export interface SupplementCardMessage {
  id: string;
  type: 'slider';
  timestamp: number;
  layoutType: 'slider';
  gap: string;
  cards: SupplementCardProps[];
}

// 메시지 타입
export type SupplementMessage = ExtendedTextMessage | SupplementCardMessage; 