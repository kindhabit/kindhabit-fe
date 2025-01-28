import { useState, useEffect, useCallback } from 'react';
import { BookingState, BookingTarget, BookingProgram } from '@/services/xog/booking/types';
import { ChatBookingState } from '@/services/xog/booking/presentation/chat/booking_main';

export const useBooking = () => {
  const [bookingState] = useState<ChatBookingState>(new ChatBookingState());
  const [state, setState] = useState(bookingState.getState());
  
  useEffect(() => {
    const unsubscribe = bookingState.subscribe(setState);
    bookingState.initialize();
    return () => unsubscribe();
  }, [bookingState]);

  const handleTargetSelection = useCallback((target: string) => {
    if (state.bookingState === BookingState.SELECT_TARGET) {
      bookingState.handleTargetSelection(target as BookingTarget);
    }
  }, [state.bookingState, bookingState]);

  const handleProgramSelection = useCallback((program: string) => {
    if (state.bookingState === BookingState.SELECT_PROGRAM) {
      bookingState.handleProgramSelection(program as BookingProgram);
    }
  }, [state.bookingState, bookingState]);

  return {
    ...state,
    handleTargetSelection,
    handleProgramSelection
  };
}; 