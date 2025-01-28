// 로딩 메시지
export const LOADING_MESSAGES = [
  '올해 받으실 건강검진목록을 조회 중이에요',
  '잠시만 기다려주세요',
  '곧 완료됩니다'
];

// 응답 메시지
export const RESPONSE_MESSAGES = {
  target: {
    self: '본인 검진을 선택하셨습니다.',
    family: '가족 검진을 선택하셨습니다.',
    other: '기타 검진을 선택하셨습니다.'
  },
  program: {
    normal: '일반 검진을 선택하셨습니다.',
    premium: '프리미엄 검진을 선택하셨습니다.',
    special: '특별 검진을 선택하셨습니다.'
  }
};

// 초기 메시지
export const INITIAL_MESSAGE = '안녕하세요! 예약을 도와드릴 엠텍이입니다.';

// 대상 선택 메시지
export const TARGET_SELECTION_MESSAGE = '검진 대상자를 선택해주세요.';

// 프로그램 선택 메시지
export const PROGRAM_SELECTION_MESSAGE = '어떤 프로그램을 선택하시겠습니까?';

// 가상 사용자 데이터
export const MOCK_USER_INFO = {
  id: 'user_001',
  name: '김엠텍',
  birthDate: '1984-04-13',
  department: '포항철강사업실',
  section: '정비섹션',
  checkupYear: 2025,
  availableCheckups: ['일반+특수검진']
};

// 가상 예약 가능 시간
export const MOCK_AVAILABLE_TIMES = [
  '09:00',
  '10:00',
  '11:00',
  '14:00',
  '15:00',
  '16:00'
];

// 가상 병원 데이터
export const MOCK_HOSPITALS = [
  { id: 'hosp1', name: '포항병원', address: '경상북도 포항시 남구' },
  { id: 'hosp2', name: '서울병원', address: '서울특별시 강남구' }
]; 