import { 
  BookingTarget, 
  BookingProgram,
  BookingStateType,
  ChatStateType,
  BookingInfo,
  BookingState,
  ChatState,
  BookingMessage
} from '../../types';
import { 
  LOADING_MESSAGES, 
  RESPONSE_MESSAGES, 
  INITIAL_MESSAGE, 
  PROGRAM_SELECTION_MESSAGE 
} from '../../constants';

export class ChatBookingState {
  private messages: BookingMessage[] = [];
  private bookingInfo: BookingInfo = {};
  private bookingState: BookingStateType = BookingState.INITIAL;
  private chatState: ChatStateType = ChatState.INITIAL;
  private showLoading = false;
  private loadingStep = 0;
  private listeners: ((state: ReturnType<ChatBookingState['getState']>) => void)[] = [];

  private readonly targetDescriptions = {
    '성인': '성인 대상 프로그램',
    '청소년': '청소년 대상 프로그램'
  };

  private readonly programDescriptions = {
    '기본': '기본 프로그램입니다',
    '심화': '심화 프로그램입니다'
  };

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
    this.listeners.forEach(listener => listener(state));
  }

  // 메시지 생성 유틸리티
  private createMessage(message: string, type: 'jerry' | 'loading' = 'jerry'): BookingMessage {
    return {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      timestamp: Date.now(),
      text: message,
      showProfile: type === 'jerry',
      profileText: type === 'jerry' ? '엠텍' : undefined,
      isTemporary: type === 'loading'
    };
  }

  // 카드 생성 유틸리티
  private createProgramCard(): BookingMessage {
    return {
      id: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'card',
      timestamp: Date.now(),
      layoutType: 'grid',
      gridColumns: 2,
      gap: '16px',
      cards: [
        {
          id: 'normal',
          type: 'namecard-A',
          title: '엠텍이 84.04.13',
          subtitle: '포항철강사업실|정비섹션',
          description: '2025년 건강검진 대상자 입니다.',
          icon: { emoji: '👤', color: '#4B89FF' },
          tags: ['일반+특수검진', '종합검진', '배우자검진'],
          buttonText: '건강검진 바로 예약하기'
        },
        {
          id: 'comprehensive',
          type: 'namecard-A',
          title: '엠텍이 84.04.13',
          subtitle: '포항철강사업실|정비섹션',
          description: '2025년 건강검진 대상자 입니다.',
          icon: { emoji: '👤', color: '#4B89FF' },
          tags: ['일반+특수검진', '종합검진', '배우자검진'],
          buttonText: '건강검진 바로 예약하기'
        }
      ]
    };
  }

  // 초기화
  initialize() {
    this.messages = [];
    this.bookingInfo = {};
    this.bookingState = BookingState.INITIAL;
    this.chatState = ChatState.INITIAL;
    this.showLoading = false;
    this.loadingStep = 0;

    // 초기 메시지 추가
    this.addMessage(this.createMessage(INITIAL_MESSAGE));
    this.notifyStateChange();

    // 로딩 메시지 표시
    setTimeout(() => {
      this.showLoading = true;
      this.addMessage(this.createMessage(LOADING_MESSAGES[0], 'loading'));
      this.notifyStateChange();

      // 프로그램 선택 카드 표시
      setTimeout(() => {
        this.showLoading = false;
        this.addMessage(this.createProgramCard());
        this.bookingState = BookingState.SELECT_TARGET;
        this.notifyStateChange();
      }, 1500);
    }, 1000);
  }

  // 메시지 관리
  private addMessage(message: BookingMessage) {
    this.messages = [...this.messages, message];
    this.notifyStateChange();
  }

  private removeMessage(messageId: string) {
    this.messages = this.messages.filter(msg => msg.id !== messageId);
    this.notifyStateChange();
  }

  // 대상자 선택 처리
  handleTargetSelection(target: BookingTarget) {
    this.bookingInfo = { target };
    this.addMessage(this.createMessage(RESPONSE_MESSAGES.target[target]));
    
    // 로딩 메시지 표시
    this.showLoading = true;
    const loadingMessage = this.createMessage(LOADING_MESSAGES[1], 'loading');
    this.addMessage(loadingMessage);
    this.notifyStateChange();
    
    setTimeout(() => {
      this.showLoading = false;
      this.removeMessage(loadingMessage.id);
      
      // 프로그램 선택 안내
      this.addMessage(this.createMessage(PROGRAM_SELECTION_MESSAGE));
      setTimeout(() => {
        this.addMessage(this.createProgramCard());
        this.bookingState = BookingState.SELECT_PROGRAM;
        this.notifyStateChange();
      }, 500);
    }, 2000);
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
    return {
      messages: this.messages,
      showLoading: this.showLoading,
      loadingStep: this.loadingStep,
      chatState: this.chatState,
      bookingState: this.bookingState,
      bookingInfo: this.bookingInfo
    };
  }
} 