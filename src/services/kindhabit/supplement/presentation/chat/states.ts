import { 
  SupplementStateType,
  ChatStateType,
  SupplementState,
  ChatState,
  HealthInfo,
  RecommendInfo,
  SupplementMessage
} from '../../types';
import { 
  LOADING_MESSAGES, 
  INITIAL_MESSAGE, 
  HEALTH_CHECK_MESSAGE,
  RESPONSE_MESSAGES 
} from '../../constants';
import { SupplementAPI } from '../../api';
import { MessageFactory } from './messages';

export class SupplementChatState {
  private messages: SupplementMessage[] = [];
  private recommendInfo: RecommendInfo = {};
  private supplementState: SupplementStateType = SupplementState.INITIAL;
  private chatState: ChatStateType = ChatState.INITIAL;
  private showLoading = false;
  private loadingStep = 0;
  private waitingMessageId?: string;
  private listeners: ((state: ReturnType<SupplementChatState['getState']>) => void)[] = [];

  // 상태 변경 구독
  subscribe(listener: (state: ReturnType<SupplementChatState['getState']>) => void) {
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

  // 초기화
  async initialize() {
    this.messages = [];
    this.recommendInfo = {};
    this.supplementState = SupplementState.INITIAL;
    this.chatState = ChatState.INITIAL;
    this.showLoading = false;
    this.loadingStep = 0;

    // 초기 메시지 추가 (1초 후)
    setTimeout(() => {
      this.addMessage(MessageFactory.createTextMessage(INITIAL_MESSAGE));

      // 로딩 메시지 표시 (2초 후)
      setTimeout(async () => {
        this.showLoading = true;
        this.addMessage(MessageFactory.createTextMessage(LOADING_MESSAGES[0], 'loading'));

        try {
          // 기본 영양제 목록 조회 (3초 후)
          const supplements = await SupplementAPI.getBasicSupplements();
          
          setTimeout(() => {
            this.showLoading = false;
            this.addMessage(MessageFactory.createSupplementCard(supplements));
            this.supplementState = SupplementState.BASIC_RECOMMEND;
            
            // 건강 체크 메시지 추가 (4초 후)
            setTimeout(() => {
              this.addMessage(MessageFactory.createTextMessage(HEALTH_CHECK_MESSAGE, 'jerry', {
                text: '이 질문을 한 이유는 무엇일까요? 🤔',
                onClick: () => console.log('Link clicked'),
                $position: {
                  bottom: -1,
                  align: 'right'
                }
              }));
              
              // 혈압약 관련 질문 (5초 후)
              setTimeout(() => {
                this.addMessage(MessageFactory.createButtonMessage(
                  '과거/현재에 혈압약을 드시거나 드실 예정인가요?',
                  [
                    { 
                      text: '네',
                      onClick: () => this.handleMedicineResponse(true),
                      variant: 'primary'
                    },
                    { 
                      text: '아니오',
                      onClick: () => this.handleMedicineResponse(false),
                      variant: 'secondary'
                    }
                  ]
                ));
              }, 1000);
            }, 1000);
          }, 1000);

        } catch (error) {
          console.error('Failed to get basic supplements:', error);
          this.showLoading = false;
          this.addMessage(MessageFactory.createErrorMessage('영양제 정보를 불러오는데 실패했습니다.'));
        }
      }, 1000);
    }, 1000);
  }

  // 메시지 관리
  private addMessage(message: SupplementMessage) {
    this.messages = [...this.messages, message];
    
    // 사용자 메시지인 경우 waitingMessageId 설정
    if (message.type === 'user') {
      this.waitingMessageId = message.id;
    }
    
    this.notifyStateChange();
  }

  private removeMessage(messageId: string) {
    this.messages = this.messages.filter(msg => msg.id !== messageId);
    
    // waitingMessageId가 삭제된 메시지인 경우 초기화
    if (this.waitingMessageId === messageId) {
      this.waitingMessageId = undefined;
    }
    
    this.notifyStateChange();
  }

  // 응답 처리 완료 시 호출
  private clearWaitingState() {
    this.waitingMessageId = undefined;
    this.notifyStateChange();
  }

  // 약 복용 여부 응답 처리
  private async handleMedicineResponse(takingMedicine: boolean) {
    const healthInfo: HealthInfo = { takingMedicine };
    this.recommendInfo.healthInfo = healthInfo;
    
    // 이전 대기 상태 클리어
    this.waitingMessageId = undefined;
    
    this.addMessage(MessageFactory.createTextMessage(
      takingMedicine ? RESPONSE_MESSAGES.medicine.yes : RESPONSE_MESSAGES.medicine.no
    ));

    // 로딩 메시지 표시
    this.showLoading = true;
    const loadingMessage = MessageFactory.createTextMessage(LOADING_MESSAGES[1], 'loading');
    this.addMessage(loadingMessage);

    try {
      // 건강 상태 기반 추천 조회
      const supplements = await SupplementAPI.getHealthSupplements(healthInfo);
      
      this.showLoading = false;
      this.removeMessage(loadingMessage.id);
      this.addMessage(MessageFactory.createSupplementCard(supplements));
      this.supplementState = SupplementState.HEALTH_CHECK;
      
    } catch (error) {
      console.error('Failed to get health supplements:', error);
      this.showLoading = false;
      this.removeMessage(loadingMessage.id);
      this.addMessage(MessageFactory.createErrorMessage('건강 상태 기반 추천을 불러오는데 실패했습니다.'));
    }
  }

  // 상태 조회
  getState() {
    return {
      messages: this.messages,
      showLoading: this.showLoading,
      loadingStep: this.loadingStep,
      chatState: this.chatState,
      supplementState: this.supplementState,
      recommendInfo: this.recommendInfo,
      waitingMessageId: this.waitingMessageId
    };
  }
} 