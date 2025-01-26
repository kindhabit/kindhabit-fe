import { useState, useEffect, useCallback, useRef } from 'react';
import { TextMessage, SliderMessage, ChatMessage, LoadingMessage } from '@/types/chat';
import { createInitialMessages, loadingMessages, ChatState, ChatStateType } from '@/services/kindhabit/supplement-main-chat';

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
  const isInitializedRef = useRef(false);

  const log = useCallback((message: string, data?: any) => {
    if (isDebugMode) {
      console.log(`[Chat] ${message}`, data || '');
    }
  }, [isDebugMode]);

  const addMessage = useCallback((message: ChatMessage) => {
    if (isDebugMode) {
      console.log('[Chat] Adding message:', message);
    }
    setMessages(prev => [...prev, message]);
    return message.id;
  }, [isDebugMode]);

  const removeMessage = useCallback((messageId: string) => {
    if (isDebugMode) {
      console.log('[Chat] Removing message:', messageId);
    }
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  }, [isDebugMode]);

  const addLoadingMessage = useCallback((text: string): string => {
    const loadingMessage: LoadingMessage = {
      id: `loading-${Date.now()}`,
      type: 'loading',
      message: text,
      timestamp: Date.now(),
      isTemporary: true
    };
    if (isDebugMode) {
      console.log('[Chat] Adding loading message:', loadingMessage);
    }
    setMessages(prev => [...prev, loadingMessage]);
    return loadingMessage.id;
  }, [isDebugMode]);

  const clearTimers = useCallback(() => {
    if (timersRef.current.length > 0) {
      log('Cleaning up timers');
      timersRef.current.forEach(id => clearTimeout(id));
      timersRef.current = [];
    }
  }, [log]);

  const initializeChat = useCallback(() => {
    if (isInitializedRef.current) {
      log('Already initialized, skipping');
      return;
    }

    isInitializedRef.current = true;
    log('Initializing Chat');
    const baseTimestamp = Date.now();
    const initialMessages = createInitialMessages(baseTimestamp);

    const showFirstMessage = () => {
      addMessage(initialMessages[0]);
      log('First Message Set');
      
      const showLoadingMessage = () => {
        setShowLoading(true);
        const loadingId = addLoadingMessage(loadingMessages[0]);
        log('Loading Message Added');

        const showSliderMessage = () => {
          setShowLoading(false);
          removeMessage(loadingId);
          const sliderMessage = initialMessages.find(msg => msg.type === 'slider');
          if (sliderMessage) {
            log('Adding Slider Message');
            addMessage(sliderMessage);

            const showQuestionMessage = () => {
              const questionMessage = initialMessages.find(msg => 
                msg.type === 'jerry' && msg.message?.includes('혈압약')
              );
              if (questionMessage) {
                log('Adding Question Message');
                addMessage(questionMessage);

                const showSelectionMessage = () => {
                  const selectionMessage = initialMessages.find(msg => msg.type === 'user');
                  if (selectionMessage) {
                    log('Adding Selection Message');
                    addMessage(selectionMessage);
                    setChatState(ChatState.WAITING);
                  }
                };

                timersRef.current.push(setTimeout(showSelectionMessage, 1000));
              }
            };

            timersRef.current.push(setTimeout(showQuestionMessage, 1500));
          }
        };

        timersRef.current.push(setTimeout(showSliderMessage, 2000));
      };

      timersRef.current.push(setTimeout(showLoadingMessage, 1000));
    };

    timersRef.current.push(setTimeout(showFirstMessage, 1000));
  }, [log, addMessage, addLoadingMessage, removeMessage]);

  useEffect(() => {
    if (chatState === ChatState.INITIAL) {
      clearTimers();
      isInitializedRef.current = false;
      setMessages([]);
      initializeChat();
    }
    return () => {
      if (chatState === ChatState.INITIAL) {
        clearTimers();
      }
    };
  }, [chatState, initializeChat, clearTimers]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.type === 'user') {
      log('Setting waiting state for user message', lastMessage.id);
      setWaitingMessageId(lastMessage.id);
    }
  }, [messages, log]);

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
    removeMessage
  };
}; 