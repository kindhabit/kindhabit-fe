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
      department: '포항창강사업실',
      section: '정비섹션',
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
    await new Promise(resolve => setTimeout(resolve, 6000));
    
    // 연도와 사번으로 사용자 정보 조회 시뮬레이션
    const users = Object.values(SIMULATION_DATA.users).map(user => ({
      ...user,
      gender: user.gender as 'M' | 'F',
      relation: user.relation as 'self' | 'family'
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
  async getHospitalList(selectedDate?: string): Promise<Hospital[]> {
    await new Promise(resolve => setTimeout(resolve, 600));

    // 날짜가 없으면 모든 병원 반환
    if (!selectedDate) {
      return SIMULATION_HOSPITALS;
    }

    // 선택된 날짜에 예약 가능한 병원 필터링
    const availableHospitals = SIMULATION_HOSPITALS.filter(hospital => {
      // 주말이면 제외
      const date = new Date(selectedDate);
      if (date.getDay() === 0 || date.getDay() === 6) return false;

      // 랜덤하게 예약 가능 여부 결정 (실제로는 백엔드에서 처리)
      return Math.random() > 0.3; // 70% 확률로 예약 가능
    });

    return availableHospitals.map(hospital => ({
      ...hospital,
      isAvailable: true,  // 필터링된 병원은 모두 예약 가능
      availableCount: Math.floor(Math.random() * 4) + 2  // 2~5개의 예약 가능 슬롯
    }));
  }

  /**
   * 예약 가능한 날짜 조회 API
   * 
   * [TODO: 실제 서비스 개발 시 구현 사항]
   * 
   * 1. API 엔드포인트 구현
   *    - GET /api/v1/hospitals/available-dates
   *    - Query Parameters: checkupType, region, startDate, endDate
   *    - Response: AvailableDatesResponse
   * 
   * 2. 검진 종류별 병원 필터링
   *    - 병원별 가능한 검진 프로그램 마스터 데이터 구축
   *    - 검진 종류별 필수 장비/인력 정보 관리
   *    - 검진 프로그램별 소요시간 관리
   * 
   * 3. 지역별 병원 관리
   *    - 지역 마스터 데이터 구축 (포항/광양/서울 등)
   *    - 권역별 병원 그룹핑
   *    - 사용자 소속 지역에 따른 기본 필터링
   *    - 원거리 병원 조회 옵션 제공
   * 
   * 4. 예약 가능 일자 관리
   *    - 병원별 운영 시간 관리
   *      > 기본 운영 시간
   *      > 점심시간
   *      > 공휴일 휴진 여부
   *    - 병원별 블랙아웃 데이트 관리
   *      > 정기 휴진일 (매월 n번째 m요일 등)
   *      > 임시 휴진일
   *      > 공휴일 처리
   *    - 검진 프로그램별 예약 가능 시간대 관리
   * 
   * 5. 예약 가능 인원 관리
   *    - 병원별 하루 최대 수용 가능 인원 설정
   *      > 전체 수용인원
   *      > 검진 종류별 수용인원
   *      > 시간대별 수용인원
   *    - 예약 현황 실시간 반영
   *      > 기예약 인원 확인
   *      > 잔여 예약 가능 인원 계산
   *    - 동시성 제어
   *      > 동시 예약 요청 처리
   *      > 선착순 처리 로직
   * 
   * 6. 성능 최적화
   *    - 캐싱 전략 수립
   *      > Redis 등을 활용한 캐시 구현
   *      > 캐시 갱신 주기 설정
   *    - 실시간 데이터 처리
   *      > WebSocket 적용 검토
   *      > 폴링 주기 설정
   *    - 대용량 트래픽 처리
   *      > DB 인덱싱 최적화
   *      > 커넥션 풀 관리
   * 
   * 7. 에러 처리
   *    - 에러 케이스 정의
   *      > 필수 파라미터 누락
   *      > 유효하지 않은 검진 종류
   *      > 예약 가능 병원 없음
   *    - 에러 응답 포맷 정의
   *    - 에러 로깅 및 모니터링
   */
  async getAvailableDates(checkupType: string): Promise<AvailableDatesResponse> {
    console.log('[BookingAPI] getAvailableDates 호출됨:', { checkupType });
    await new Promise(resolve => setTimeout(resolve, 600));

    // 가용 날짜 생성 (2주 범위)
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 14);

    const availableDates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      // 주말 제외
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        // 랜덤하게 2-3개의 병원 선택
        const selectedHospitals = SIMULATION_HOSPITALS
          .filter(() => Math.random() > 0.3)
          .slice(0, Math.floor(Math.random() * 2) + 2);

        if (selectedHospitals.length > 0) {
          availableDates.push({
            date: currentDate.toISOString().split('T')[0],
            availableHospitals: selectedHospitals.length,
            hospitals: selectedHospitals
          });
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const response: AvailableDatesResponse = {
      status: 'success' as const,
      code: '200',
      message: '예약 가능 날짜 조회 성공',
      data: {
        dates: availableDates,
        total: availableDates.length
      }
    };

    return response;
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