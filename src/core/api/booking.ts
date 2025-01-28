import { Hospital, CheckupItem } from '@/components/common/BookingFlow/BookingFlow_types';

// API 응답 타입
export interface AvailableHospitalResponse {
  date: string;
  hospitals: Hospital[];
}

export interface HospitalAvailabilityResponse {
  date: string;
  count: number;
}

export interface CheckupProgramResponse {
  basicCheckups: CheckupItem[];
  additionalCheckups: {
    ct: CheckupItem[];
    ultrasound: CheckupItem[];
  };
}

export interface BookingRequest {
  hospitalId: string;
  date: string;
  checkups: string[]; // checkup ids
  consultationType: 'direct' | 'phone';
}

// 가상 데이터
const MOCK_HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    name: '한국의료재단 IFC 종합검진',
    address: '서울 영등포구 국제금융로 10',
    tags: ['일반+특수', '종합'],
    image: '/images/hospital1.jpg'
  },
  {
    id: 'h2',
    name: '구로성심병원',
    address: '서울 영등포구 국제금융로 10',
    tags: ['일반+특수', '종합'],
    image: '/images/hospital2.jpg'
  }
];

const MOCK_BASIC_CHECKUPS: CheckupItem[] = [
  {
    id: 'basic1',
    name: '기초검사',
    isRequired: true,
    isSelected: true
  },
  {
    id: 'basic2',
    name: '구강검사',
    isRequired: true,
    isSelected: true
  },
  {
    id: 'basic3',
    name: '신체계측',
    isRequired: true,
    isSelected: true
  },
  {
    id: 'basic4',
    name: '위내시경',
    price: 0,
    isSelected: true
  },
  {
    id: 'basic5',
    name: '위장조영촬영',
    price: 0,
    isSelected: false
  }
];

const MOCK_ADDITIONAL_CHECKUPS = {
  ct: [
    {
      id: 'ct1',
      name: '뇌 CT',
      price: 0,
      isSelected: true
    },
    {
      id: 'ct2',
      name: '폐 CT',
      price: 150000,
      isSelected: false
    },
    {
      id: 'ct3',
      name: '복부 CT',
      price: 150000,
      isSelected: false
    }
  ],
  ultrasound: [
    {
      id: 'ultra1',
      name: '갑상선 초음파',
      price: 0,
      isSelected: true
    },
    {
      id: 'ultra2',
      name: '경동맥 초음파',
      price: 150000,
      isSelected: false
    },
    {
      id: 'ultra3',
      name: '상복부 초음파',
      price: 140000,
      isSelected: false
    },
    {
      id: 'ultra4',
      name: '하복부 초음파',
      price: 70000,
      isSelected: false
    }
  ]
};

// API 함수
export const bookingAPI = {
  // 날짜별 가능한 병원 수 조회
  getHospitalAvailability: async (startDate: Date, endDate: Date): Promise<HospitalAvailabilityResponse[]> => {
    // 가상 데이터 생성
    const result: HospitalAvailabilityResponse[] = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      result.push({
        date: currentDate.toISOString().split('T')[0],
        count: Math.floor(Math.random() * MOCK_HOSPITALS.length) + 1
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return new Promise(resolve => setTimeout(() => resolve(result), 500));
  },

  // 특정 날짜의 가능한 병원 목록 조회
  getAvailableHospitals: async (date: string): Promise<Hospital[]> => {
    // 가상으로 일부 병원만 반환
    const availableHospitals = MOCK_HOSPITALS.filter(() => Math.random() > 0.3);
    return new Promise(resolve => setTimeout(() => resolve(availableHospitals), 500));
  },

  // 전체 병원 목록 조회
  getAllHospitals: async (): Promise<Hospital[]> => {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_HOSPITALS), 500));
  },

  // 검진 프로그램 조회
  getCheckupPrograms: async (hospitalId: string): Promise<CheckupProgramResponse> => {
    return new Promise(resolve => 
      setTimeout(() => resolve({
        basicCheckups: MOCK_BASIC_CHECKUPS,
        additionalCheckups: MOCK_ADDITIONAL_CHECKUPS
      }), 500)
    );
  },

  // 예약 생성
  createBooking: async (data: BookingRequest): Promise<{ success: boolean; bookingId: string }> => {
    // 실제로는 서버에 예약 정보를 전송
    console.log('Booking created:', data);
    return new Promise(resolve => 
      setTimeout(() => resolve({
        success: true,
        bookingId: Math.random().toString(36).substring(7)
      }), 1000)
    );
  }
}; 