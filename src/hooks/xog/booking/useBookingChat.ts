import { useState, useEffect } from 'react';
import { ChatBookingState } from '@/services/xog/booking';

export const useBookingChat = () => {
  const [bookingChat] = useState(() => new ChatBookingState());
  const [state, setState] = useState(bookingChat.getState());

  useEffect(() => {
    const unsubscribe = bookingChat.subscribe(newState => {
      setState(newState);
    });

    bookingChat.initialize();

    return () => {
      unsubscribe();
    };
  }, [bookingChat]);

  return {
    ...state,
    handleTargetSelection: bookingChat.handleTargetSelection.bind(bookingChat),
    handleProgramSelection: bookingChat.handleProgramSelection.bind(bookingChat)
  };
}; 