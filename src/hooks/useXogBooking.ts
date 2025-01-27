import { useState, useEffect, useCallback, useRef } from 'react';
import { ChatMessage, LoadingMessage } from '@/types/chat';
import { 
  createInitialMessages, 
  loadingMessages, 
  ChatState, 
  ChatStateType,
  createTargetSelectionResponse,
  createProgramSelectionResponse,
  BookingProgram
} from '@/services/xog/book-main-chat';
import { 
  BookingState, 
  BookingStateType, 
  BookingInfo,
  bookingService,
  BookingTarget
} from '@/services/xog/book';

interface UseXogBookingProps {
  isDebugMode?: boolean;
}

export const useXogBooking = ({ isDebugMode = false }: UseXogBookingProps = {}) => {
  // 채팅 UI 관련 상태
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [chatState, setChatState] = useState<ChatStateType>(ChatState.INITIAL);
  
  // 예약 관련 상태
  const [bookingState, setBookingState] = useState<BookingStateType>(BookingState.INITIAL);
  const [bookingInfo, setBookingInfo] = useState<BookingInfo>({});
  
  // 타이머 관리
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const isInitializedRef = useRef(false);

  // 디버그 로그
  const log = useCallback((message: string, data?: any) => {
    if (isDebugMode) {
      console.log(`[XOG Booking] ${message}`, data || '');
    }
  }, [isDebugMode]);

  // 메시지 추가
  const addMessage = useCallback((message: ChatMessage) => {
    log('Adding message:', message);
    setMessages(prev => [...prev, message]);
    return message.id;
  }, [log]);

  // 로딩 메시지 추가
  const addLoadingMessage = useCallback((text: string): string => {
    const loadingMessage: LoadingMessage = {
      id: `loading-${Date.now()}`,
      type: 'loading',
      message: text,
      timestamp: Date.now(),
      isTemporary: true
    };
    log('Adding loading message:', loadingMessage);
    setMessages(prev => [...prev, loadingMessage]);
    return loadingMessage.id;
  }, [log]);

  // 메시지 제거
  const removeMessage = useCallback((messageId: string) => {
    log('Removing message:', messageId);
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  }, [log]);

  // 타이머 정리
  const clearTimers = useCallback(() => {
    if (timersRef.current.length > 0) {
      log('Cleaning up timers');
      timersRef.current.forEach(id => clearTimeout(id));
      timersRef.current = [];
    }
  }, [log]);

  // 대상자 선택 처리
  const handleTargetSelection = useCallback((target: string) => {
    const bookingTarget = target as BookingTarget;
    const updatedInfo = bookingService.handleTargetSelection(bookingTarget);
    setBookingInfo(updatedInfo);
    
    // 선택 응답 메시지 추가
    const responseMessage = createTargetSelectionResponse(bookingTarget, Date.now());
    addMessage(responseMessage);
    
    // 로딩 메시지 표시
    setShowLoading(true);
    const loadingId = addLoadingMessage(loadingMessages[1]);
    
    // 프로그램 선택 카드 표시
    setTimeout(() => {
      setShowLoading(false);
      removeMessage(loadingId);
      
      // 프로그램 선택 안내 메시지
      addMessage({
        id: `msg_program_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'jerry',
        timestamp: Date.now(),
        message: '어떤 검진 프로그램을 선택하시겠어요?',
        showProfile: true,
        profileText: '엠텍'
      });
      
      // 프로그램 선택 카드
      setTimeout(() => {
        const programCard = {
          id: `card2_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: 'card' as const,
          timestamp: Date.now(),
          layoutType: 'grid' as const,
          gridColumns: 2,
          gap: '16px',
          cards: [
            {
              id: 'normal',
              type: 'namecard-A' as const,
              title: '엠텍이 84.04.13',
              subtitle: '포항철강사업실|정비섹션',
              description: '2025년 건강검진 대상자 입니다.',
              icon: { emoji: '👤', color: '#4B89FF' },
              tags: ['일반+특수검진', '종합검진', '배우자검진'],
              buttonText: '건강검진 바로 예약하기'
            },
            {
              id: 'comprehensive',
              type: 'namecard-A' as const,
              title: '엠텍이 84.04.13',
              subtitle: '포항철강사업실|정비섹션',
              description: '2025년 건강검진 대상자 입니다.',
              icon: { emoji: '👤', color: '#4B89FF' },
              tags: ['일반+특수검진', '종합검진', '배우자검진'],
              buttonText: '건강검진 바로 예약하기'
            }
          ]
        };
        addMessage(programCard);
        setBookingState(BookingState.SELECT_PROGRAM);
      }, 500);
    }, 2000);
  }, [bookingState, addMessage, addLoadingMessage, removeMessage]);

  // 프로그램 선택 처리
  const handleProgramSelection = useCallback((program: string) => {
    const bookingProgram = program as BookingProgram;
    const updatedInfo = bookingService.handleProgramSelection(bookingProgram, bookingInfo);
    setBookingInfo(updatedInfo);
    
    // 선택 응답 메시지 추가
    const responseMessage = createProgramSelectionResponse(bookingProgram, Date.now());
    addMessage(responseMessage);
    
    // 다음 상태로 전환
    const nextState = bookingService.getNextState(bookingState);
    setBookingState(nextState);
  }, [bookingState, bookingInfo, addMessage]);

  // 초기화
  const initializeBooking = useCallback(() => {
    if (isInitializedRef.current) {
      log('Already initialized, skipping');
      return;
    }

    isInitializedRef.current = true;
    log('Initializing XOG Booking');
    
    const baseTimestamp = Date.now();
    const initialMessages = createInitialMessages(baseTimestamp);

    // 첫 메시지와 카드 표시
    const showFirstMessage = () => {
      // 초기 메시지 추가
      initialMessages.forEach((message, index) => {
        setTimeout(() => {
          addMessage(message);
          log(`Message ${index + 1} Set`);
        }, index * 500);
      });
    };

    timersRef.current.push(setTimeout(showFirstMessage, 1000));
  }, [log, addMessage]);

  // 초기화 Effect
  useEffect(() => {
    if (chatState === ChatState.INITIAL) {
      clearTimers();
      isInitializedRef.current = false;
      setMessages([]);
      initializeBooking();
    }
    return () => {
      if (chatState === ChatState.INITIAL) {
        clearTimers();
      }
    };
  }, [chatState, initializeBooking, clearTimers]);

  return {
    // 상태
    messages,
    showLoading,
    loadingStep,
    chatState,
    bookingState,
    bookingInfo,
    
    // 액션
    handleTargetSelection,
    handleProgramSelection,
    
    // 상태 변경 함수
    setShowLoading,
    setLoadingStep,
    setChatState,
    
    // 메시지 관련 함수
    addMessage,
    removeMessage
  };
}; 