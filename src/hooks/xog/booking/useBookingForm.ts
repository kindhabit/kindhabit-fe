import { useState, useEffect } from 'react';
import { FormBookingState } from '@/services/xog/booking';

export const useBookingForm = () => {
  const [bookingForm] = useState(() => new FormBookingState());
  const [state, setState] = useState(bookingForm.getState());

  useEffect(() => {
    const unsubscribe = bookingForm.subscribe(newState => {
      setState(newState);
    });

    bookingForm.initialize();

    return () => {
      unsubscribe();
    };
  }, [bookingForm]);

  return {
    ...state,
    handleTargetSelection: bookingForm.handleTargetSelection.bind(bookingForm),
    handleProgramSelection: bookingForm.handleProgramSelection.bind(bookingForm),
    handleDateSelection: bookingForm.handleDateSelection.bind(bookingForm),
    handleTimeSelection: bookingForm.handleTimeSelection.bind(bookingForm),
    handleConfirm: bookingForm.handleConfirm.bind(bookingForm)
  };
}; 