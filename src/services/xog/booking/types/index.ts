import { TextMessage, CardMessage, ChatMessage } from '@/types/chat';

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
  checkupType?: string;
  hospitalId?: string;
  hospital?: {
    id: string;
    name: string;
    address: string;
  };
}

// 기본 병원 정보 타입
export interface Hospital {
  id: string;
  name: string;
  address: string;
  availableCheckups: string[];
  contact: {
    manager: string;
    phone: string;
  };
  emr?: string;
}

// 캐시된 병원 데이터 타입 (기본 Hospital 타입 확장)
export interface CachedHospitalData extends Hospital {
  availableCount: number;  // 예약 가능 슬롯 수
  image?: string;         // 병원 이미지 경로
}

// 날짜별 캐시 데이터 타입
export interface DateCacheEntry {
  count: number;
  hospitals: CachedHospitalData[];
}

export interface DateCache {
  [date: string]: DateCacheEntry;
}

// UI 표시용 카운트 캐시 타입
export interface CountCache {
  [date: string]: number;
}

// 병원 변환 유틸리티 함수
export const convertToHospitalCache = (hospital: Hospital): CachedHospitalData => ({
  ...hospital,
  availableCount: Math.floor(Math.random() * 4) + 2,  // 2~5개의 예약 가능 슬롯
  image: `/src/assets/hospital/${hospital.id}.jpg`     // 이미지 경로 추가
});

// API 응답 기본 구조
interface ApiResponse<T> {
  status: 'success' | 'error';
  code: string;
  message: string;
  data: T;
}

// 사용자 정보 타입
export interface UserInfo {
  id: string;
  name: string;
  birthDate: string;
  department: string;
  section: string;
  checkupYear: string;
  employeeId: string;
  gender: 'M' | 'F';
  availableCheckups: string[];
  relation: 'self' | 'family';  // 본인/가족 구분
}

// API 응답 타입들
export interface UserInfoResponse extends ApiResponse<{
  users: UserInfo[];
  total: number;
}> {}

export interface HospitalListResponse extends ApiResponse<{
  hospitals: Hospital[];
  total: number;
}> {}

export interface AvailableDatesResponse extends ApiResponse<{
  dates: AvailableDate[];
  total: number;
}> {}

export interface BookingResponse extends ApiResponse<{
  bookingId: string;
  status: 'confirmed' | 'pending' | 'failed';
  bookingInfo: BookingInfo;
}> {}

// API 응답 타입
export interface AvailableDate {
  date: string;                // 'YYYY-MM-DD' 형식
  availableHospitals: number;  // 해당 날짜에 예약 가능한 총 병원 수
  hospitals: Hospital[];       // 해당 날짜에 예약 가능한 병원 목록
}

// UI 타입
export type BookingUIType = 'chat' | 'form';

export interface UserPreference {
  uiType: BookingUIType;
}

export interface CardIcon {
  type?: string;
  emoji?: string;
  color?: string;
  image?: string;
  size?: number;
} 