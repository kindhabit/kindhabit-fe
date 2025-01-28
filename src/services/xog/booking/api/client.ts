import { 
  BookingInfo, 
  AvailableDate, 
  BookingResponse, 
  UserInfoResponse,
  Hospital,
  HospitalListResponse,
  AvailableDatesResponse
} from '../types';
import { BOOKING_API } from './endpoints';
import { MOCK_USER_INFO } from '../constants';

// 시뮬레이션 데이터
const SIMULATION_DATA = {
  year: '2024',
  employeeId: '123456',
  users: [
    {
      id: '1',
      name: '김엠텍',
      birthDate: '840413',
      department: '개발팀',
      section: '프론트엔드',
      checkupYear: '2024',
      employeeId: '123456',
      gender: 'M',
      availableCheckups: ['일반+특수검진','종합검진','가족검진'],
      relation: 'self'
    },
    {
      id: '2',
      name: '박영희',
      birthDate: '850413',
      department: '',
      section: '',
      checkupYear: '2024',
      employeeId: '123456',
      gender: 'F',
      availableCheckups: ['일반+특수검진'],
      relation: 'family'
    }
  ]
};

const SIMULATION_HOSPITALS: Hospital[] = [
  { 
    id: 'PH01', 
    name: '세명기독병원', 
    address: '포항',
    availableCheckups: ['일반', '일반+특수', '종합'],
    contact: {
      manager: '금인규 실장',
      phone: '054-289-1438'
    }
  },
  { 
    id: 'PH02', 
    name: '성모병원', 
    address: '포항',
    availableCheckups: ['일반', '일반+특수', '종합'],
    contact: {
      manager: '이상규 팀장',
      phone: '054-260-8189'
    },
    emr: '자체 EMR'
  },
  { 
    id: 'PH03', 
    name: '대구KMI의학연구소', 
    address: '포항',
    availableCheckups: ['일반', '종합'],
    contact: {
      manager: '㈜옴니케어 추교석 매니저',
      phone: '053-476-9388'
    },
    emr: '자체 EMR'
  },
  { 
    id: 'SL01', 
    name: '서울KMI의학연구소', 
    address: '서울,강릉',
    availableCheckups: ['일반', '종합'],
    contact: {
      manager: '㈜옴니케어 이연수 파트장',
      phone: '02-727-9930'
    },
    emr: '자체 EMR'
  },
  { 
    id: 'GY01', 
    name: '순천병원', 
    address: '광양',
    availableCheckups: ['일반', '일반+특수', '종합'],
    contact: {
      manager: '신성욱차장(수가담당)',
      phone: '061-720-7115'
    }
  },
  { 
    id: 'GY02', 
    name: '광양사랑병원', 
    address: '광양',
    availableCheckups: ['일반', '일반+특수', '종합'],
    contact: {
      manager: '오재근실장',
      phone: '010-9222-1240'
    }
  },
  { 
    id: 'GY03', 
    name: '순천제일병원', 
    address: '광양',
    availableCheckups: ['일반', '일반+특수', '종합'],
    contact: {
      manager: '김상영센터장',
      phone: '010-5444-2142'
    }
  },
  { 
    id: 'GY04', 
    name: '광양서울병원', 
    address: '광양',
    availableCheckups: ['일반', '종합'],
    contact: {
      manager: '현도관센터장',
      phone: '010-4619-2882'
    }
  },
  { 
    id: 'GY05', 
    name: '순천드림내과', 
    address: '광양',
    availableCheckups: ['일반', '종합'],
    contact: {
      manager: '장혁신본부장',
      phone: '010-9809-9090'
    }
  },
  { 
    id: 'GY06', 
    name: '순천 성가롤로', 
    address: '광양',
    availableCheckups: ['일반', '종합'],
    contact: {
      manager: '담당자 미지정',
      phone: '061-907-7302'
    }
  },
  { 
    id: 'GY07', 
    name: '광주KMI의학연구소', 
    address: '광양',
    availableCheckups: ['일반', '종합'],
    contact: {
      manager: '장혁신본부장',
      phone: '010-3177-2976'
    },
    emr: '자체 EMR'
  }
];

export class BookingAPI {
  // 사용자 정보 조회
  async getUserInfo(): Promise<UserInfoResponse> {
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 연도와 사번으로 사용자 정보 조회 시뮬레이션
    const users = Object.values(SIMULATION_DATA.users).map(user => ({
      ...user,
      gender: user.gender as 'M' | 'F'
    }));
    
    console.log('Filtered Users:', users);  // 필터링된 사용자 목록 로깅
    
    if (!users.length) {
      return {
        status: 'error' as const,
        code: '404',
        message: '해당 연도와 사번으로 검진 대상자를 찾을 수 없습니다.',
        data: {
          users: [],
          total: 0
        }
      };
    }
    
    const response: UserInfoResponse = {
      status: 'success' as const,
      code: '200',
      message: '사용자 정보 조회 성공',
      data: {
        users,
        total: users.length
      }
    };
    
    console.log('API Response:', response);  // API 응답 로깅
    return response;
  }

  // 병원 목록 조회
  async getHospitalList(checkupType?: string): Promise<HospitalListResponse> {
    await new Promise(resolve => setTimeout(resolve, 800));

    let filteredHospitals = SIMULATION_HOSPITALS;
    if (checkupType) {
      filteredHospitals = SIMULATION_HOSPITALS.filter(hospital => 
        hospital.availableCheckups.includes(checkupType)
      );
    }

    return {
      status: 'success',
      code: '200',
      message: '병원 목록 조회 성공',
      data: {
        hospitals: filteredHospitals,
        total: filteredHospitals.length
      }
    };
  }

  // 예약 가능한 날짜 조회
  async getAvailableDates(hospitalId: string, checkupType: string): Promise<AvailableDatesResponse> {
    await new Promise(resolve => setTimeout(resolve, 600));

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();
    
    const availableDates: AvailableDate[] = [];
    for (let day = 1; day <= lastDay; day++) {
      const date = new Date(year, month, day);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        availableDates.push({
          date: date.toISOString().split('T')[0],
          availableTimes: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
          hospitalId,
          hospitalName: SIMULATION_HOSPITALS.find(h => h.id === hospitalId)?.name || ''
        });
      }
    }

    return {
      status: 'success',
      code: '200',
      message: '예약 가능 날짜 조회 성공',
      data: {
        dates: availableDates,
        total: availableDates.length
      }
    };
  }
  
  // 예약 생성
  async createBooking(info: BookingInfo): Promise<BookingResponse> {
    await new Promise(resolve => setTimeout(resolve, 1200));

    return {
      status: 'success',
      code: '200',
      message: '예약이 성공적으로 생성되었습니다.',
      data: {
        bookingId: `BOOK_${Date.now()}`,
        status: 'confirmed',
        bookingInfo: info
      }
    };
  }
  
  // 예약 조회
  async getBooking(bookingId: string): Promise<BookingResponse> {
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      status: 'success',
      code: '200',
      message: '예약 정보 조회 성공',
      data: {
        bookingId,
        status: 'confirmed',
        bookingInfo: {
          target: 'self',
          program: 'normal',
          date: '2024-02-01',
          time: '09:00'
        }
      }
    };
  }
} 