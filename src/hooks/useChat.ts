import { useState, useEffect, useCallback, useRef } from 'react';
import { TextMessage, SliderMessage, ChatMessage, LoadingMessage } from '@/types/chat';
import { createInitialMessages, loadingMessages, ChatState, ChatStateType } from '@/services/chat';

interface UseChatProps {
  isDebugMode?: boolean;
}

export const useChat = ({ isDebugMode = false }: UseChatProps = {}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [waitingMessageId, setWaitingMessageId] = useState<string | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [chatState, setChatState] = useState<ChatStateType>(ChatState.INITIAL);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const messagesRef = useRef<ChatMessage[]>([]);
  const isInitializedRef = useRef(false);

  // 디버그 로그
  const log = (message: string, data?: any) => {
    if (isDebugMode) {
      console.log('[Chat]', message, data ? data : '');
    }
  };

  // 메시지 추가 함수
  const addMessage = useCallback((message: ChatMessage): string => {
    setMessages(prev => [...prev, message]);
    return message.id;
  }, []);

  // 메시지 제거 함수
  const removeMessage = useCallback((messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  }, []);

  // 로딩 메시지 추가 함수
  const addLoadingMessage = useCallback((message: string): string => {
    const loadingMessage: LoadingMessage = {
      id: `loading_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'loading',
      timestamp: Date.now(),
      message,
      isTemporary: true
    };

    return addMessage(loadingMessage);
  }, [addMessage]);

  // 타이머 정리 함수
  const clearTimers = useCallback(() => {
    if (timersRef.current.length > 0) {
      log('Cleaning up timers');
      timersRef.current.forEach(id => clearTimeout(id));
      timersRef.current = [];
    }
  }, [log]);

  // 초기화
  useEffect(() => {
    if (isInitializedRef.current) {
      log('Already initialized, skipping');
      return;
    }

    if (chatState === ChatState.INITIAL) {
      isInitializedRef.current = true;
      log('Initializing Chat');
      const baseTimestamp = Date.now();
      const initialMessages = createInitialMessages(baseTimestamp);
      
      // 1. 첫 메시지 표시
      const firstMessageTimer = setTimeout(() => {
        addMessage(initialMessages[0]);
        log('First Message Set');
        
        // 2. 첫 메시지 표시 후 1초 뒤에 로딩 메시지 표시
        const loadingTimer = setTimeout(() => {
          setShowLoading(true);
          const loadingId = addLoadingMessage(loadingMessages[0]);
          log('Loading Message Added');

          // 3. 슬라이더 메시지 표시 (2초 후) + 로딩 메시지 제거
          const sliderTimer = setTimeout(() => {
            setShowLoading(false);  // 슬라이더 표시 전에 로딩 숨김
            removeMessage(loadingId);
            const sliderMessage = initialMessages.find(msg => msg.type === 'slider');
            if (sliderMessage) {
              log('Adding Slider Message');
              addMessage(sliderMessage);

              // 4. 혈압약 질문 메시지 표시 (1.5초 후)
              const questionTimer = setTimeout(() => {
                const questionMessage = initialMessages.find(msg => msg.type === 'jerry' && msg.message?.includes('혈압약'));
                if (questionMessage) {
                  log('Adding Question Message');
                  addMessage(questionMessage);

                  // 5. 사용자 선택 메시지 표시 (1초 후)
                  const selectionTimer = setTimeout(() => {
                    const selectionMessage = initialMessages.find(msg => msg.type === 'user');
                    if (selectionMessage) {
                      log('Adding Selection Message');
                      addMessage(selectionMessage);
                      setChatState(ChatState.WAITING);
                    }
                  }, 1000);
                  timersRef.current.push(selectionTimer);
                }
              }, 1500);
              timersRef.current.push(questionTimer);
            }
          }, 2000);
          timersRef.current.push(sliderTimer);
        }, 1000);
        timersRef.current.push(loadingTimer);
      }, 1000);
      
      timersRef.current.push(firstMessageTimer);
    }

    return () => {
      if (!isInitializedRef.current) {
        clearTimers();
      }
    };
  }, [chatState, log, addMessage, clearTimers, removeMessage, addLoadingMessage]);

  // 메시지 응답 대기
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && 'type' in lastMessage && lastMessage.type === 'user') {
      log('Setting waiting state for user message', lastMessage.id);
      setWaitingMessageId(lastMessage.id);
    }
  }, [messages, log]);

  const startLoading = useCallback(async (operation: () => Promise<any>) => {
    const loadingId = addLoadingMessage(loadingMessages[0]);
    setChatState(ChatState.LOADING);

    try {
      const result = await operation();
      removeMessage(loadingId);
      setChatState(ChatState.READY);
      return result;
    } catch (error) {
      removeMessage(loadingId);
      setChatState(ChatState.READY);
      throw error;
    }
  }, [addLoadingMessage, removeMessage]);

  return {
    messages,
    waitingMessageId,
    showLoading,
    loadingStep,
    chatState,
    loadingMessages,
    setMessages,
    setWaitingMessageId,
    setShowLoading,
    setLoadingStep,
    setChatState,
    addMessage,
    removeMessage,
    startLoading
  };
}; 