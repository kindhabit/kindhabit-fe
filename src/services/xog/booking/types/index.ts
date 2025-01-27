import { TextMessage, CardMessage } from '@/types/chat';

// 예약 대상 타입
export type BookingTarget = 'self' | 'family' | 'other';

// 예약 프로그램 타입
export type BookingProgram = 'normal' | 'premium' | 'special';

// 예약 상태 타입
export const BookingState = {
  INITIAL: 'initial',
  SELECT_TARGET: 'select_target',
  SELECT_PROGRAM: 'select_program',
  SELECT_DATE: 'select_date',
  SELECT_TIME: 'select_time',
  CONFIRM: 'confirm',
  COMPLETE: 'complete'
} as const;

export type BookingStateType = typeof BookingState[keyof typeof BookingState];

// 채팅 상태 타입
export const ChatState = {
  INITIAL: 'initial',
  LOADING: 'loading',
  READY: 'ready',
  WAITING: 'waiting'
} as const;

export type ChatStateType = typeof ChatState[keyof typeof ChatState];

// 예약 정보 인터페이스
export interface BookingInfo {
  target?: BookingTarget;
  program?: BookingProgram;
  date?: string;
  time?: string;
  name?: string;
  phone?: string;
}

// API 응답 타입
export interface AvailableDate {
  date: string;
  availableTimes: string[];
  hospitalId: string;
  hospitalName: string;
}

export interface BookingResponse {
  bookingId: string;
  status: 'confirmed' | 'pending' | 'failed';
  message?: string;
}

// 메시지 타입
export type BookingMessage = TextMessage | CardMessage;

// UI 타입
export type BookingUIType = 'chat' | 'form';

export interface UserPreference {
  uiType: BookingUIType;
} 