import { 
  BookingTarget, 
  BookingProgram,
  BookingStateType,
  ChatStateType,
  BookingInfo,
  BookingState,
  ChatState,
  UserInfo,
  Hospital,
  CachedHospitalData,
  DateCache,
  DateCacheEntry,
  CountCache,
  convertToHospitalCache
} from '../../types';
import { ChatMessage, TextMessage, CardMessage } from '@/types/chat';
import { 
  LOADING_MESSAGES, 
  RESPONSE_MESSAGES, 
  INITIAL_MESSAGE, 
  PROGRAM_SELECTION_MESSAGE,
  TARGET_SELECTION_MESSAGE,
  MOCK_HOSPITALS
} from '../../constants';
import { BookingAPI } from '../../api/client';
import { CardProps, CardIcon } from '@/components/common/Card/Card_types';
import { Message } from '@/types/chat';

// API 응답 타입 정의
interface ApiResponse<T> {
  status: 'success' | 'error';
  data: T;
  message?: string;
}

interface HospitalListResponse {
  hospitals: Hospital[];
}

export class ChatBookingState {
  private api: BookingAPI;
  private messages: ChatMessage[] = [];
  private bookingInfo: Partial<BookingInfo> = {};
  private userInfo?: UserInfo;
  private bookingState: BookingStateType = BookingState.INITIAL;
  private chatState: ChatStateType = ChatState.INITIAL;
  private showLoading = false;
  private loadingStep = 0;
  private isInitializing = false;
  private waitingMessageId?: string;
  private error: Error | null = null;
  private listeners: ((state: ReturnType<ChatBookingState['getState']>) => void)[] = [];
  private _availableDatesCache: DateCache = {};
  private _availableCountsCache: CountCache = {};  // UI 표시용 별도 캐시

  constructor() {
    this.api = new BookingAPI();
  }

  // 상태 변경 구독
  subscribe(listener: (state: ReturnType<ChatBookingState['getState']>) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // 상태 변경 알림
  private notifyStateChange() {
    const state = this.getState();
    console.log('상태 변경 알림:', {
      messagesCount: state.messages.length,
      waitingMessageId: state.waitingMessageId,
      messages: state.messages.map(m => ({
        id: m.id,
        isWaiting: m.state?.isWaiting
      }))
    });
    this.listeners.forEach(listener => listener(state));
  }

  // 메시지 생성 유틸리티
  private createMessage(message: string, type: 'system' | 'loading' = 'system', isWaiting: boolean = false): TextMessage {
    console.log('Creating message:', { message, type, isWaiting });
    const msg: TextMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      sender: 'system' as Message.Type.Sender,
      display: 'text',
      timestamp: Date.now(),
      content: {
        text: {
          value: type === 'loading' ? message : `${message} `,
          profile: {
            show: type !== 'loading',
            text: '엠텍이',
            image: ''
          }
        }
      },
      state: {
        isHistory: false,
        isWaiting
      },
      animation: 'slideIn' as Message.Type.Animation
    };
    console.log('Created message:', msg);
    return msg;
  }

  // 메시지 전송 및 서버 호출 처리
  private async sendMessageAndWait<T>(message: string, apiCall: () => Promise<T>): Promise<T> {
    // 메시지 생성
    const msg = this.createMessage(message, 'system', true);
    
    // 메시지 추가 및 대기 상태 설정
    this.messages = [...this.messages, msg];
    this.waitingMessageId = msg.id;
    this.notifyStateChange();
    
    try {
      // API 호출
      const response = await apiCall();
      
      // 대기 상태 해제
      this.waitingMessageId = undefined;
      this.messages = this.messages.map(m => {
        if (m.id === msg.id) {
          return {
            ...m,
            state: {
              ...m.state,
              isWaiting: false
            }
          };
        }
        return m;
      });
      this.notifyStateChange();
      
      return response;
    } catch (error) {
      // 에러 발생시에도 대기 상태 해제
      this.waitingMessageId = undefined;
      this.messages = this.messages.map(m => {
        if (m.id === msg.id) {
          return {
            ...m,
            state: {
              ...m.state,
              isWaiting: false
            }
          };
        }
        return m;
      });
      this.notifyStateChange();
      throw error;
    }
  }

  // 통합된 카드 생성 함수 - 초기 사용자 카드 
  private createUserCardsFromResponse(users: UserInfo[]): CardMessage {
    const formatBirthDate = (birthDate: string) => 
      `${birthDate.slice(0,2)}.${birthDate.slice(2,4)}.${birthDate.slice(4,6)}`;

    const cardTemplate = {
      duration: 800,
      easing: 'ease-out'
    } as const;

    const animations: Message.Type.Animation[] = ['slideInLeft', 'bounceIn', 'zoomIn'];
    const getAnimation = (index: number) => animations[index % animations.length];

    const createCardContent = (user: UserInfo) => {
      const icon: CardIcon = {
        type: 'userImage',
        image: user.gender === 'M' ? '/assets/ava_m.png' : '/assets/ava_f.png',
        gender: user.gender,
        fallbackEmoji: '👤',
        size: 48
      };

      return {
        ...cardTemplate,
        id: `checkup_${user.id}`,
        birthDate: formatBirthDate(user.birthDate),
        icon,
        bookingState: this,
        ...(user.relation === 'self' 
          ? {
              type: 'namecard-A' as const,
              title: user.name,
              subtitle: `${user.department}|${user.section}`,
              description: `${user.checkupYear}년도 건강검진 대상자입니다.`,
              tags: user.availableCheckups,
              buttonText: '건강검진 바로 예약하기'
            }
          : {
              type: 'namecard-B' as const,
              title: user.name,
              subtitle: user.department && user.section ? `${user.department}|${user.section}` : undefined,
              tag: '가족'
            })
      };
    };

    return {
      id: `card_${Date.now()}_${users[0].id}`,
      sender: 'system',
      display: 'card',
      timestamp: Date.now(),
      content: {
        card: {
          items: [createCardContent(users[0])],
          layout: {
            type: 'slider' as Message.Type.LayoutType,
            columns: 1,
            spacing: '16px'
          }
        }
      },
      animation: getAnimation(users[0].id.length % animations.length),
      state: {
        isHistory: false,
        isWaiting: false
      }
    };
  }

  // 모든 병원 목록 가져오기
  public async getAllHospitals(): Promise<Hospital[]> {
    try {
      return await this.api.getHospitalList();
    } catch (error) {
      console.error('병원 목록 조회 중 오류:', error);
      return [];
    }
  }

  // 병원 선택 처리
  private async handleHospitalSelection(hospital: Hospital) {
    this.bookingInfo = {
      ...this.bookingInfo,
      hospitalId: hospital.id,
      hospital
    };
    
    // 상태 업데이트
    this.bookingState = BookingState.SELECT_DATE;
    this.notifyStateChange();
  }

  // 날짜 선택 처리 - 캘린더 버튼 클릭 시 한 번만 호출
  private async handleDateSelection() {
    console.log('Starting date selection...');
    if (!this.bookingInfo.hospital?.id || !this.bookingInfo.checkupType) {
      const error = new Error('병원 또는 검진 종류가 선택되지 않았습니다.');
      console.error(error);
      this.error = error;
      this.notifyStateChange();
      return;
    }

    // 이미 가용 날짜 정보가 있다면 다시 호출하지 않음
    if (Object.keys(this._availableDatesCache).length > 0) {
      console.log('Available dates already loaded:', this._availableDatesCache);
      return;
    }

    try {
      console.log('Fetching available dates...');
      const response = await this.api.getAvailableDates(this.bookingInfo.hospital!.id);

      console.log('API Response:', response);

      if (!response.data.dates) {
        throw new Error('날짜 정보가 없습니다.');
      }

      console.log('Caching available dates...');
      // 날짜별 가용 병원 정보 캐시 저장
      response.data.dates.forEach(d => {
        console.log('Caching date:', d);
        const hospitals = d.hospitals.map(convertToHospitalCache);
        this._availableDatesCache[d.date] = {
          count: hospitals.length,
          hospitals
        };
        this._availableCountsCache[d.date] = hospitals.length;
      });
      
      console.log('Cache after update:', this._availableDatesCache);
      this.notifyStateChange();
    } catch (error) {
      console.error('Failed to get available dates:', error);
      this.error = error instanceof Error ? error : new Error('날짜 정보를 불러오는데 실패했습니다.');
      this.notifyStateChange();
    }
  }

  // 병원 카드 생성 함수
  private createHospitalCard(hospital: CachedHospitalData): CardProps {
    console.log('🔍 [createHospitalCard] 병원 데이터:', hospital);
    const card: CardProps = {
      id: hospital.id,
      type: 'hospital' as const,
      title: hospital.name,
      subtitle: hospital.address,
      tags: hospital.availableCheckups,
      buttonText: '선택하기',
    };
    console.log('🔍 [createHospitalCard] 생성된 카드:', card);
    return card;
  }

  // 특정 날짜의 병원 목록 조회
  getHospitalsForDate(date: string): CachedHospitalData[] {
    console.log('🔍 [getHospitalsForDate] 날짜:', date);
    console.log('🔍 [getHospitalsForDate] 캐시 데이터:', this._availableDatesCache[date]);
    const hospitals = this._availableDatesCache[date]?.hospitals || [];
    console.log('🔍 [getHospitalsForDate] 조회된 병원 목록:', hospitals);
    return hospitals;
  }

  // 특정 날짜의 병원 카드 목록 생성
  getHospitalCardsForDate(date: string): CardProps[] {
    console.log('🔍 [getHospitalCardsForDate] 시작 - 날짜:', date);
    const hospitals = this.getHospitalsForDate(date);
    console.log('🔍 [getHospitalCardsForDate] 병원 목록:', hospitals);
    const cards = hospitals.map(hospital => this.createHospitalCard(hospital));
    console.log('🔍 [getHospitalCardsForDate] 생성된 카드 목록:', cards);
    return cards;
  }

  // 날짜 가용성 체크
  private isDateAvailable(date: string): boolean {
    console.log('🔍 [isDateAvailable] 날짜:', date);
    const dateData = this._availableDatesCache[date];
    console.log('🔍 [isDateAvailable] 날짜 데이터:', dateData);
    const isAvailable = dateData ? dateData.hospitals.length > 0 : false;
    console.log('🔍 [isDateAvailable] 가용 여부:', isAvailable);
    return isAvailable;
  }

  // 가용 날짜 목록 조회 - 캐시된 정보에서 가용한 날짜만 반환
  getAvailableDates(): string[] {
    console.log('🔍 [getAvailableDates] 캐시 데이터:', this._availableDatesCache);
    const dates = Object.entries(this._availableDatesCache)
      .filter(([_, data]) => data.count > 0)
      .map(([date]) => date);
    console.log('🔍 [getAvailableDates] 가용 날짜 목록:', dates);
    return dates;
  }

  // 날짜 선택 완료 처리
  async handleDateComplete(selectedDate: string) {
    console.log('🔍 [handleDateComplete] 시작');
    console.log('🔍 [handleDateComplete] 선택된 날짜:', selectedDate);
    console.log('🔍 [handleDateComplete] 현재 캐시 상태:', {
      availableDatesCache: this._availableDatesCache,
      availableCountsCache: this._availableCountsCache
    });
    
    if (!this.isDateAvailable(selectedDate)) {
      const error = new Error('선택할 수 없는 날짜입니다.');
      console.error('🔍 [handleDateComplete] 날짜 선택 불가:', error);
      this.error = error;
      this.notifyStateChange();
      return;
    }

    try {
      this.bookingInfo = {
        ...this.bookingInfo,
        date: selectedDate
      };
      console.log('🔍 [handleDateComplete] 업데이트된 예약 정보:', this.bookingInfo);
      
      this.bookingState = BookingState.CONFIRM;
      console.log('🔍 [handleDateComplete] 상태 변경:', this.bookingState);
      this.notifyStateChange();
      
      console.log('🔍 [handleDateComplete] 완료');
    } catch (error) {
      console.error('🔍 [handleDateComplete] 에러:', error);
      this.error = error instanceof Error ? error : new Error('날짜 선택 처리 중 오류가 발생했습니다.');
      this.messages = [...this.messages, this.createMessage(this.error.message, 'system')];
      this.notifyStateChange();
    }
  }

  // 대상자 선택 처리
  async handleTargetSelection(target: BookingTarget) {
    this.bookingInfo = { target };
    
    try {
      // 첫 번째 메시지와 대기
      await this.sendMessageAndWait(
        RESPONSE_MESSAGES.target[target],
        () => new Promise(resolve => setTimeout(resolve, 1000))
      );
      
      // 두 번째 메시지 (로딩 없이)
      this.messages = [...this.messages, this.createMessage(TARGET_SELECTION_MESSAGE)];
      this.bookingState = BookingState.SELECT_PROGRAM;
      this.notifyStateChange();
    } catch (error) {
      console.error('Failed in target selection:', error);
      this.messages = [...this.messages, this.createMessage('죄송합니다. 처리 중 오류가 발생했습니다.', 'system')];
      this.notifyStateChange();
    }
  }

  // 건강검진 바로 예약하기 -> 모달 팝업 (날짜 우선 병원 우선 선택창으로 이동)
  async handleCheckupSelection(checkupType: string) {
    console.log('🔍 [handleCheckupSelection] 시작');
    console.log('🔍 [handleCheckupSelection] 선택된 검진 타입:', checkupType);
    console.log('🔍 [handleCheckupSelection] 현재 캐시 상태:', {
      availableDatesCache: this._availableDatesCache,
      availableCountsCache: this._availableCountsCache
    });

    this.bookingInfo = { 
      ...this.bookingInfo,
      checkupType
    };
    console.log('🔍 [handleCheckupSelection] 업데이트된 예약 정보:', this.bookingInfo);

    // 모달 표시를 위한 상태 업데이트만 수행
    this.bookingState = BookingState.SELECT_DATE;
    console.log('🔍 [handleCheckupSelection] 상태 변경:', this.bookingState);
    this.notifyStateChange();
  }

  //예약진입 (초기화 및 예약 그리고 사후관리 )
  async initialize() {
    if (this.isInitializing) {
      console.log('Already initializing, skipping...');
      return;
    }
    
    console.log('Starting initialization...');
    this.isInitializing = true;
    this.showLoading = true;
    this.messages = [];
    this.notifyStateChange();

    try {
      // 첫 메시지 추가
      const initialMessage = this.createMessage('예약을 도와드릴 엠텍이입니다. 올 해 받으실 건강검진을 조회 해 볼께요 🤔');
      this.messages = [initialMessage];
      this.notifyStateChange();
      await new Promise(resolve => setTimeout(resolve, 1000));

      // API 호출
      const response = await this.api.getUserInfo();
      
      const users = response.data.users;
      if (!users || users.length === 0) {
        throw new Error('검진 대상자 정보가 없습니다.');
      }

      const userNames = users.map(user => user.name).join(', ');
      const listMessage = this.createMessage(`올 해는 ${userNames} 님의 검진을 예약하실 수 있습니다.`);
      this.messages = [...this.messages, listMessage];
      this.notifyStateChange();
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 각 사용자별로 카드를 순차적으로 생성하고 추가
      for (const user of users) {
        const singleUserCard = this.createUserCardsFromResponse([user]);
        this.messages = [...this.messages, singleUserCard];
        this.notifyStateChange();
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      this.bookingState = BookingState.SELECT_TARGET;
      this.showLoading = false;
      this.notifyStateChange();

    } catch (error) {
      console.error('Failed in initialization:', error);
      this.showLoading = false;
      this.error = error instanceof Error ? error : new Error('초기화 중 오류가 발생했습니다.');
      this.messages = [this.createMessage(this.error.message, 'system')];
      this.notifyStateChange();
    } finally {
      this.isInitializing = false;
    }
  }

  // 메시지 관리
  private addMessage(message: ChatMessage) {
    this.messages = [...this.messages, message];
    this.notifyStateChange();
  }

  private removeMessage(messageId: string) {
    this.messages = this.messages.filter(msg => msg.id !== messageId);
    this.notifyStateChange();
  }

  // 프로그램 선택 처리
  handleProgramSelection(program: BookingProgram) {
    this.bookingInfo = {
      ...this.bookingInfo,
      program
    };
    
    this.addMessage(this.createMessage(RESPONSE_MESSAGES.program[program]));
    this.bookingState = this.getNextState();
    this.notifyStateChange();
  }

  // 다음 상태 반환
  private getNextState(): BookingStateType {
    switch (this.bookingState) {
      case BookingState.INITIAL:
        return BookingState.SELECT_TARGET;
      case BookingState.SELECT_TARGET:
        return BookingState.SELECT_PROGRAM;
      case BookingState.SELECT_PROGRAM:
        return BookingState.SELECT_DATE;
      case BookingState.SELECT_DATE:
        return BookingState.CONFIRM;
      default:
        return BookingState.INITIAL;
    }
  }

  // 상태 조회
  getState() {
    console.log('🔍 [getState] 현재 상태:', {
      bookingState: this.bookingState,
      bookingInfo: this.bookingInfo,
      availableDatesCache: this._availableDatesCache,
      availableCountsCache: this._availableCountsCache,
      waitingMessageId: this.waitingMessageId,
      messages: this.messages.map(m => ({
        id: m.id,
        isWaiting: m.state?.isWaiting
      }))
    });
    
    return {
      messages: this.messages,
      showLoading: this.showLoading,
      loadingStep: this.loadingStep,
      chatState: this.chatState,
      bookingState: this.bookingState,
      bookingInfo: this.bookingInfo,
      waitingMessageId: this.waitingMessageId,
      error: this.error,
      getHospitalsForDate: this.getHospitalsForDate.bind(this),
      getAvailableDates: this.getAvailableDates.bind(this),
      handleDateFirstBooking: this.handleDateFirstBooking.bind(this),
      getAllHospitals: this.getAllHospitals.bind(this)
    };
  }

  // 검진 종류별 가용 날짜 및 병원 정보 조회
  async fetchAvailableDatesAndHospitals(checkupType: string): Promise<DateCache> {
    try {
      const [hospitalResponse, datesResponse] = await Promise.all([
        this.api.getHospitalList(checkupType),
        this.api.getAvailableDates(MOCK_HOSPITALS[0].id)
      ]);

      if (!hospitalResponse || hospitalResponse.length === 0) {
        throw new Error('병원 목록을 불러올 수 없습니다.');
      }

      if (datesResponse.data.dates) {
        this._availableDatesCache = datesResponse.data.dates.reduce((acc, d) => {
          const hospitals = d.hospitals.map(convertToHospitalCache);
          acc[d.date] = {
            count: hospitals.length,
            hospitals
          };
          return acc;
        }, {} as DateCache);
      }

      return this._availableDatesCache;
    } catch (error) {
      console.error('Failed to load hospitals and dates:', error);
      throw error;
    }
  }

  // 날짜별 가용 병원 수 조회 (UI 표시용)
  getAvailableCountsByDate(): Record<string, number> {
    return Object.entries(this._availableDatesCache).reduce((acc, [date, data]) => {
      acc[date] = data.count;
      return acc;
    }, {} as Record<string, number>);
  }

  // 날짜 우선 예약 처리
  async handleDateFirstBooking(checkupType: string): Promise<Record<string, number>> {
    try {
      const response = await this.api.getAvailableDates(checkupType);
      
      if (response.data.dates) {
        // 캐시 초기화
        this._availableDatesCache = {};

        // 캐시 업데이트
        response.data.dates.forEach(d => {
          const hospitals = d.hospitals.map(convertToHospitalCache);
          this._availableDatesCache[d.date] = {
            count: hospitals.length,
            hospitals
          };
        });
      }

      return this.getAvailableCountsByDate();
    } catch (error) {
      console.error('날짜 우선 예약 처리 중 오류:', error);
      throw error;
    }
  }
} 