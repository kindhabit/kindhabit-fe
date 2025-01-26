import { TextMessage, SliderMessage, CardMessage } from '@/types/chat';
import { BookingTarget } from './book';

// 검진 프로그램 타입 정의
export type BookingProgram = 'normal' | 'comprehensive' | 'spouse';

export const createInitialMessages = (baseTimestamp: number): (TextMessage | SliderMessage)[] => {
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
      id: `msg2_${baseTimestamp + 1}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'jerry',
      timestamp: baseTimestamp + 500,
      message: '검진을 받으실 분을 선택해주세요.',
      showProfile: true,
      profileText: '엠텍'
    },
    {
      id: `slider1_${baseTimestamp + 2}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'slider',
      timestamp: baseTimestamp + 1000,
      cards: [
        {
          id: 'self',
          type: 'button',
          title: '본인',
          description: '본인을 위한 검진 예약',
          icon: { type: 'person' },
          buttonText: '예약하기'
        },
        {
          id: 'family',
          type: 'button',
          title: '가족',
          description: '가족을 위한 검진 예약',
          icon: { type: 'family' },
          buttonText: '예약하기'
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

// 검진 프로그램 선택 슬라이더 생성
export const createProgramSelectionSlider = (timestamp: number): CardMessage => {
  return {
    id: `slider2_${timestamp}_${Math.random().toString(36).substr(2, 9)}`,
    type: 'card',
    timestamp,
    layoutType: 'grid',
    gridColumns: 3,
    gap: '8px',
    cards: [
      {
        id: 'normal',
        type: 'button',
        title: '일반+특수검진',
        description: '기본적인 건강검진과 특수검진을 함께 받으실 수 있습니다.',
        icon: { type: 'health' },
        buttonText: '선택'
      },
      {
        id: 'comprehensive',
        type: 'button',
        title: '종합검진',
        description: '더 자세한 검진이 필요하신 분들을 위한 프로그램입니다.',
        icon: { type: 'comprehensive' },
        buttonText: '선택'
      },
      {
        id: 'spouse',
        type: 'button',
        title: '배우자검진',
        description: '배우자를 위한 맞춤형 검진 프로그램입니다.',
        icon: { type: 'spouse' },
        buttonText: '선택'
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