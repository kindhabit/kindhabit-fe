import { useState, useEffect, useRef } from 'react';
import { SupplementChatState } from '@/services/kindhabit/supplement';

export const useSupplementChat = () => {
  const supplementChatRef = useRef<SupplementChatState>();
  const [state, setState] = useState(() => {
    supplementChatRef.current = new SupplementChatState();
    return supplementChatRef.current.getState();
  });

  useEffect(() => {
    const supplementChat = supplementChatRef.current!;
    const unsubscribe = supplementChat.subscribe(newState => {
      setState(prev => {
        // 실제로 상태가 변경된 경우에만 업데이트
        if (JSON.stringify(prev) === JSON.stringify(newState)) {
          return prev;
        }
        return newState;
      });
    });

    supplementChat.initialize();

    return () => {
      unsubscribe();
    };
  }, []);

  return state;
}; 