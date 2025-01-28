import { useState, useEffect, useCallback, useRef } from 'react';
import { ChatBookingState } from '@/services/xog/booking';

export const useBookingChat = () => {
  const [bookingChat] = useState(() => new ChatBookingState());
  const [state, setState] = useState(bookingChat.getState());
  const [error, setError] = useState<Error | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    
    const unsubscribe = bookingChat.subscribe(newState => {
      setState(newState);
      if (newState.error) {
        setError(newState.error);
      }
    });

    const initializeChat = async () => {
      try {
        isInitialized.current = true;
        await bookingChat.initialize();
      } catch (err) {
        console.error('Failed to initialize booking chat:', err);
        setError(err instanceof Error ? err : new Error('초기화 중 오류가 발생했습니다.'));
      }
    };

    initializeChat();

    return () => {
      unsubscribe();
      isInitialized.current = false;
    };
  }, [bookingChat]);

  const handleTargetSelection = useCallback((...args: Parameters<typeof bookingChat.handleTargetSelection>) => {
    try {
      return bookingChat.handleTargetSelection(...args);
    } catch (err) {
      console.error('Failed in target selection:', err);
      setError(err instanceof Error ? err : new Error('대상자 선택 중 오류가 발생했습니다.'));
      throw err;
    }
  }, [bookingChat]);

  const handleProgramSelection = useCallback((...args: Parameters<typeof bookingChat.handleProgramSelection>) => {
    try {
      return bookingChat.handleProgramSelection(...args);
    } catch (err) {
      console.error('Failed in program selection:', err);
      setError(err instanceof Error ? err : new Error('프로그램 선택 중 오류가 발생했습니다.'));
      throw err;
    }
  }, [bookingChat]);

  return {
    ...state,
    error,
    handleTargetSelection,
    handleProgramSelection
  };
}; 