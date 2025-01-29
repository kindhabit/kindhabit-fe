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
  {
    id: 'H001',
    name: '강남세브란스병원',
    address: '서울특별시 강남구 언주로 211',
    availableCheckups: ['일반건강검진', '암검진', '뇌검진', '심장검진'],
    contact: {
      manager: '김담당',
      phone: '02-1234-5678'
    }
  },
  {
    id: 'H002',
    name: '서울아산병원',
    address: '서울특별시 송파구 올림픽로43길 88',
    availableCheckups: ['일반건강검진', '암검진', '특화검진'],
    contact: {
      manager: '이담당',
      phone: '02-2345-6789'
    }
  },
  {
    id: 'H003',
    name: '삼성서울병원',
    address: '서울특별시 강남구 일원로 81',
    availableCheckups: ['일반건강검진', '암검진', '심장검진'],
    contact: {
      manager: '박담당',
      phone: '02-3456-7890'
    }
  },
  {
    id: 'H004',
    name: '서울대학교병원',
    address: '서울특별시 종로구 대학로 101',
    availableCheckups: ['일반건강검진', '암검진', '뇌검진'],
    contact: {
      manager: '최담당',
      phone: '02-4567-8901'
    }
  }
]; 