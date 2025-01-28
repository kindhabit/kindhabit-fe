import { 
  BookingTarget, 
  BookingProgram,
  BookingStateType,
  ChatStateType,
  BookingInfo,
  BookingState,
  ChatState,
  UserInfo,
  Hospital
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
  private listeners: ((state: ReturnType<ChatBookingState['getState']>) => void)[] = [];

  private readonly targetDescriptions = {
    '성인': '성인 대상 프로그램',
    '청소년': '청소년 대상 프로그램'
  };

  private readonly programDescriptions = {
    '기본': '기본 프로그램입니다',
    '심화': '심화 프로그램입니다'
  };

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
          value: type === 'loading' ? message : `${message} 👋`,
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

  // 카드 생성 유틸리티
  private createProgramCard(userInfo: UserInfo): CardProps {
    const icon: CardIcon = {
      type: 'userImage',
      image: userInfo.gender === 'M' ? '/assets/ava_m.png' : '/assets/ava_f.png',
      gender: userInfo.gender,
      fallbackEmoji: '👤',
      size: 48
    };

    // 생년월일 포맷 변환 함수
    const formatBirthDate = (birthDate: string) => {
      return `${birthDate.slice(0,2)}.${birthDate.slice(2,4)}.${birthDate.slice(4,6)}`;
    };

    if (userInfo.relation === 'self') {
      return {
        id: `checkup_${userInfo.id}`,
        type: 'namecard-A',
        title: userInfo.name,
        birthDate: formatBirthDate(userInfo.birthDate),
        subtitle: `${userInfo.department}|${userInfo.section}`,
        description: `${userInfo.checkupYear}년도 건강검진 대상자입니다.`,
        icon,
        tags: userInfo.availableCheckups,
        buttonText: '건강검진 바로 예약하기',
        onClick: () => this.handleCheckupSelection(userInfo.availableCheckups[0])
      };
    } else {
      return {
        id: `checkup_${userInfo.id}`,
        type: 'namecard-B',
        title: userInfo.name,
        birthDate: formatBirthDate(userInfo.birthDate),
        subtitle: userInfo.department && userInfo.section ? `${userInfo.department}|${userInfo.section}` : undefined,
        tag: '가족',
        icon,
        onClick: () => this.handleCheckupSelection(userInfo.availableCheckups[0])
      };
    }
  }

  // 사용자 카드 생성
  private createUserCards(users: UserInfo[]): CardMessage {
    console.log('Creating user cards with animation');
    const cards = users.map((user, index) => ({
      ...this.createProgramCard(user),
      delay: index * 300,
      duration: 500,
      easing: 'ease-out'
    }));

    return {
      id: `card_${Date.now()}`,
      sender: 'system',
      display: 'card',
      timestamp: Date.now(),
      content: {
        card: {
          items: cards,
          layout: {
            type: 'slider' as Message.Type.LayoutType,
            columns: 1,
            spacing: '16px'
          }
        }
      },
      animation: 'fadeIn'
    };
  }

  // 병원 선택 카드 생성
  private async createHospitalCards(): Promise<CardMessage> {
    const response = await this.api.getHospitalList(this.bookingInfo.checkupType);
    
    if (response.status === 'error' || !response.data.hospitals) {
      throw new Error(response.message || '병원 목록을 불러올 수 없습니다.');
    }

    // 첫 번째 병원만 사용
    const cards = response.data.hospitals.slice(0, 1).map((hospital, index) => ({
      id: hospital.id,
      type: 'hospital' as const,
      title: hospital.name,
      subtitle: hospital.address,
      icon: { 
        type: 'userImage',
        image: `/src/assets/hospital/${hospital.id}.png`,
        gender: 'M',
        fallbackEmoji: '🏥'
      },
      tags: hospital.availableCheckups,
      buttonText: '기관 상세보기',
      onClick: () => this.handleHospitalSelection(hospital)
    }));

    return {
      id: `hospitals_${Date.now()}`,
      sender: 'system',
      display: 'card',
      timestamp: Date.now(),
      content: {
        card: {
          items: cards,
          layout: {
            type: 'grid' as Message.Type.LayoutType,
            columns: 1,
            spacing: '16px'
          }
        }
      },
      animation: 'slideIn'
    };
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

  // 검진 종류 선택 처리
  private async handleCheckupSelection(checkup: string) {
    this.bookingInfo = { 
      ...this.bookingInfo,
      checkupType: checkup 
    };
    
    try {
      // API 호출과 카드 생성을 하나의 작업으로 처리
      await this.sendMessageAndWait(
        `${checkup}을 선택하셨습니다. 원하시는 병원을 선택해주세요.`,
        async () => {
          const hospitalCards = await this.createHospitalCards();
          return hospitalCards;
        }
      ).then(hospitalCards => {
        // API 호출이 완료된 후 카드 추가
        this.messages = [...this.messages, hospitalCards];
        this.notifyStateChange();
      });
    } catch (error) {
      console.error('Failed to load hospitals:', error);
      this.messages = [...this.messages, this.createMessage('죄송합니다. 병원 정보를 불러오는데 실패했습니다.', 'system')];
      this.notifyStateChange();
    }
  }

  // 병원 선택 처리
  private handleHospitalSelection(hospital: Hospital) {
    this.bookingInfo = {
      ...this.bookingInfo,
      hospitalId: hospital.id,
      hospital
    };
    
    this.messages = [...this.messages, this.createMessage(`${hospital.name}을 선택하셨습니다.`)];
    this.bookingState = BookingState.SELECT_DATE;
    this.notifyStateChange();
  }

  // 초기화
  async initialize() {
    if (this.isInitializing) return;
    this.isInitializing = true;

    try {
      console.log('채팅 초기화 시작');
      
      // 사용자 정보 로딩 (대기 상태 포함)
      const response = await this.sendMessageAndWait(
        '예약을 도와드릴 엠텍이입니다. 올 해 받으실 건강검진을 조회 해 볼께요 🤔',
        () => this.api.getUserInfo()
      );
      console.log('사용자 정보 로딩 완료:', response);
      
      // 2초 대기
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 검진 목록 안내 메시지
      const users = response.data.users;
      const userNames = users.map(user => user.name).join(', ');
      const listMessage: TextMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        sender: 'system',
        display: 'text',
        timestamp: Date.now(),
        content: {
          text: {
            value: `올 해는 ${userNames} 님의 검진을 예약하실 수 있습니다.`,
            profile: { show: false }
          }
        },
        state: { isHistory: false },
        animation: 'slideIn'
      };
      this.messages = [...this.messages, listMessage];
      this.notifyStateChange();
      
      // 1.5초 대기
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 사용자 선택 카드를 하나씩 추가
      for (let i = 0; i < users.length; i++) {
        const cardMessage = this.createUserCards([users[i]]);
        this.messages = [...this.messages, cardMessage];
        this.notifyStateChange();
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // 1초 대기
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 병원 카드 추가
      const hospitalCard = await this.createHospitalCards();
      this.messages = [...this.messages, hospitalCard];
      this.notifyStateChange();
      
      this.bookingState = BookingState.SELECT_TARGET;
      this.notifyStateChange();

    } catch (error) {
      console.error('Failed to load user info:', error);
      this.messages = [...this.messages, this.createMessage('죄송합니다. 검진 정보를 불러오는데 실패했습니다.', 'system')];
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
    console.log('상태 조회:', {
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
      waitingMessageId: this.waitingMessageId
    };
  }
} 