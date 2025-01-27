import { SupplementInfo } from '../types';

// 로딩 메시지
export const LOADING_MESSAGES = [
  '유효 성분을 고민 중이에요...',
  '건강 상태를 분석하고 있어요...',
  '맞춤 영양제를 찾고 있어요...'
];

// 초기 메시지
export const INITIAL_MESSAGE = '우선 개별의 건강 항목 기반으로 기본 적인 성분을 추천 해 드릴께요 🧐';

// 건강 체크 메시지
export const HEALTH_CHECK_MESSAGE = '혹시.... 혈압약을 드시나요? 👀';

// 응답 메시지
export const RESPONSE_MESSAGES = {
  target: {
    basic: '기본적인 영양제를 추천해드렸어요.',
    health: '건강 상태에 맞는 영양제를 찾아볼게요.',
    custom: '맞춤 영양제를 추천해드릴게요.'
  },
  medicine: {
    yes: '혈압약과 함께 섭취해도 안전한 영양제를 추천해드릴게요.',
    no: '알겠습니다. 그럼 기본 추천 영양제를 보여드릴게요.'
  }
};

// 기본 영양제 목록 (서버 응답 시뮬레이션)
export const BASIC_SUPPLEMENTS: SupplementInfo[] = [
  {
    id: 'supplement_1',
    name: '오메가3',
    description: 'EPA, DHA가 풍부한 등푸른 생선에서 추출한 오메가3입니다.',
    tags: ['혈행개선', '눈건강'],
    icon: '🐟'
  },
  {
    id: 'supplement_2',
    name: '종합비타민',
    description: '일상생활에 필요한 13가지 비타민과 미네랄을 한번에!',
    tags: ['피로회복', '면역력'],
    icon: '💊'
  },
  {
    id: 'supplement_3',
    name: '유산균',
    description: '장건강을 위한 10종의 유산균 복합물',
    tags: ['장건강', '면역력'],
    icon: '🦠'
  },
  {
    id: 'supplement_4',
    name: '마그네슘',
    description: '근육과 신경 건강에 도움을 주는 마그네슘',
    tags: ['근육건강', '신경건강'],
    icon: '🏃'
  }
];

// 혈압약 복용자용 영양제 목록 (서버 응답 시뮬레이션)
export const HEALTH_SUPPLEMENTS: SupplementInfo[] = [
  {
    id: 'health_1',
    name: '코엔자임Q10',
    description: '혈압약 복용시 부족해질 수 있는 코엔자임Q10을 보충해줍니다.',
    tags: ['심장건강', '항산화'],
    icon: '❤️'
  },
  {
    id: 'health_2',
    name: '칼륨',
    description: '혈압 조절에 도움을 주는 칼륨 보충제',
    tags: ['혈압조절', '전해질균형'],
    icon: '🥗'
  },
  {
    id: 'health_3',
    name: '비타민D',
    description: '뼈 건강과 면역력 증진에 도움을 주는 비타민D',
    tags: ['뼈건강', '면역력'],
    icon: '☀️'
  }
]; 