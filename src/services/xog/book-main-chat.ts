import { TextMessage, CardMessage } from '@/types/chat';
import { BookingTarget } from './book';

// 검진 프로그램 타입 정의
export type BookingProgram = 'normal' | 'comprehensive' | 'spouse';

export const createInitialMessages = (baseTimestamp: number): (TextMessage | CardMessage)[] => {
  return [
    {
      id: `msg1_${baseTimestamp}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'jerry',
      timestamp: baseTimestamp,
      message: '안녕하세요! XOG AI 검진 플래닝을 도와드릴 엠텍입니다 🏥',
      showProfile: true,
      profileText: '엠텍'
    },
    {
      id: `card1_${baseTimestamp + 1}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'card',
      timestamp: baseTimestamp + 500,
      layoutType: 'grid',
      gridColumns: 2,
      gap: '16px',
      cards: [
        {
          id: 'normal',
          type: 'namecard-A',
          title: '엠텍이 84.04.13',
          subtitle: '포항철강사업실|정비섹션',
          description: '체크-2025년 건강검진 대상자 입니다.',
          icon: { emoji: '👤', color: '#4B89FF' },
          tags: ['일반+특수검진', '종합검진', '배우자검진'],
          buttonText: '건강검진 바로 예약하기'
        },
        {
          id: 'comprehensive',
          type: 'namecard-A',
          title: '엠텍이 84.04.13',
          subtitle: '포항철강사업실|정비섹션',
          description: '체크-2025년 건강검진 대상자 입니다.',
          icon: { emoji: '👤', color: '#4B89FF' },
          tags: ['일반+특수검진', '종합검진', '배우자검진'],
          buttonText: '건강검진 바로 예약하기'
        }
      ]
    }
  ];
};

// 로딩 메시지 관리
export const loadingMessages = [
  '검진 항목을 분석중입니다...',
  '맞춤 검진을 구성중입니다...',
  '곧 검진 플래닝이 시작됩니다...'
];

// 채팅 상태 관리
export const ChatState = {
  INITIAL: 'initial',
  LOADING: 'loading',
  READY: 'ready',
  WAITING: 'waiting'
} as const;

export type ChatStateType = typeof ChatState[keyof typeof ChatState];

// 선택된 대상자에 따른 응답 메시지 생성
export const createTargetSelectionResponse = (target: BookingTarget, timestamp: number): TextMessage => {
  const responses = {
    self: '본인을 위한 검진을 예약하시는군요.',
    family: '가족을 위한 검진을 예약하시는군요.'
  };

  return {
    id: `response_${timestamp}_${Math.random().toString(36).substr(2, 9)}`,
    type: 'jerry',
    timestamp,
    message: responses[target],
    showProfile: true,
    profileText: '엠텍'
  };
};

// 검진 프로그램 선택 카드 생성
export const createProgramSelectionSlider = (timestamp: number): CardMessage => {
  return {
    id: `card2_${timestamp}_${Math.random().toString(36).substr(2, 9)}`,
    type: 'card',
    timestamp,
    layoutType: 'grid',
    gridColumns: 2,
    gap: '16px',
    cards: [
      {
        id: 'normal',
        type: 'namecard-A',
        title: '엠텍이 84.04.13',
        subtitle: '포항철강사업실|정비섹션',
        description: '체크-2025년 건강검진 대상자 입니다.',
        icon: { emoji: '👤', color: '#4B89FF' },
        tags: ['일반+특수검진', '종합검진', '배우자검진'],
        buttonText: '건강검진 바로 예약하기'
      },
      {
        id: 'comprehensive',
        type: 'namecard-A',
        title: '엠텍이 84.04.13',
        subtitle: '포항철강사업실|정비섹션',
        description: '체크-2025년 건강검진 대상자 입니다.',
        icon: { emoji: '👤', color: '#4B89FF' },
        tags: ['일반+특수검진', '종합검진', '배우자검진'],
        buttonText: '건강검진 바로 예약하기'
      }
    ]
  };
};

// 선택된 프로그램에 따른 응답 메시지 생성
export const createProgramSelectionResponse = (program: BookingProgram, timestamp: number): TextMessage => {
  const responses = {
    normal: '일반+특수검진을 선택하셨네요.',
    comprehensive: '종합검진을 선택하셨네요.',
    spouse: '배우자검진을 선택하셨네요.'
  };

  return {
    id: `response_${timestamp}_${Math.random().toString(36).substr(2, 9)}`,
    type: 'jerry',
    timestamp,
    message: responses[program],
    showProfile: true,
    profileText: '엠텍'
  };
}; 