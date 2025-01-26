import { TextMessage, SliderMessage } from '@/types/chat';

export const createInitialMessages = (baseTimestamp: number): (TextMessage | SliderMessage)[] => {
  return [
    {
      id: `msg1_${baseTimestamp}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'jerry',
      timestamp: baseTimestamp,
      message: '우선 개별의 건강 항목 기반으로 기본 적인 성분을 추천 해 드릴께요 🧐',
      showProfile: true,
      profileText: '김제리'
    },
    {
      id: `slider1_${baseTimestamp + 1}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'slider',
      timestamp: baseTimestamp + 500,
      sliderData: [
        {
          id: '1',
          title: '오메가3',
          description: '혈행 개선과 혈중 중성지방 감소에\n도움을 줄 수 있습니다',
          icon: { emoji: '🐟' },
          tags: ['혈행개선', 'EPA/DHA']
        },
        {
          id: '2',
          title: '코엔자임Q10',
          description: '항산화 작용으로 심장 건강과\n에너지 생성을 도와줍니다',
          icon: { emoji: '⚡' },
          tags: ['항산화', '심장건강']
        },
        {
          id: '3',
          title: '마그네슘',
          description: '혈압에 도움을 줄 수 있음',
          icon: { emoji: '🌿' },
          tags: ['혈압', '근육']
        },
        {
          id: '4',
          title: '비타민D',
          description: '면역력 증진에 도움',
          icon: { emoji: '☀️' },
          tags: ['면역력', '뼈건강']
        },
        {
          id: '5',
          title: '아연',
          description: '면역 기능 유지에 필요',
          icon: { emoji: '🔋' },
          tags: ['면역력', '항산화']
        }
      ]
    },
    {
      id: `msg2_${baseTimestamp + 2}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'jerry',
      timestamp: baseTimestamp + 1000,
      message: '기본 5개의 성분이 추천되었어요. 혹시.... 혈압약을 드시나요? 👀',
      showProfile: true,
      profileText: '김제리',
      link: {
        text: '이 질문을 한 이유는 무엇일까요? 🤔',
        onClick: () => console.log('Link clicked'),
        $position: {
          bottom: -1,
          align: 'right'
        }
      }
    },
    {
      id: `msg3_${baseTimestamp + 3}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'user',
      timestamp: baseTimestamp + 1500,
      message: '과거/현재에 혈압약을 드시거나 드실 예정인가요?',
      showProfile: false,
      buttonPosition: 'inside',
      buttons: [
        { 
          text: '네',
          onClick: () => console.log('Yes clicked'),
          variant: 'primary'
        },
        { 
          text: '아니오',
          onClick: () => console.log('No clicked'),
          variant: 'secondary'
        }
      ]
    }
  ];
};

// 로딩 메시지 관리
export const loadingMessages = [
  '유효 성분을 고민 중이에요...',
  '성분을 매칭 중입니다...',
  '곧 화면에 분석결과가 표출됩니다...'
];

// 채팅 상태 관리
export const ChatState = {
  INITIAL: 'initial',
  LOADING: 'loading',
  READY: 'ready',
  WAITING: 'waiting'
} as const;

export type ChatStateType = typeof ChatState[keyof typeof ChatState]; 