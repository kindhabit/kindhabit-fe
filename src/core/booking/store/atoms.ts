import { atom } from 'recoil';
import { BookingData, BookingDay } from '../types/booking';
import { BookingState, BookingStateType } from '../services/booking';

export const bookingStateAtom = atom<BookingStateType>({
  key: 'bookingStateAtom',
  default: BookingState.INITIAL
});

export const selectedDateAtom = atom<string | null>({
  key: 'selectedDateAtom',
  default: null
});

export const bookingDaysAtom = atom<BookingDay[]>({
  key: 'bookingDaysAtom',
  default: []
});

export const currentBookingAtom = atom<BookingData | null>({
  key: 'currentBookingAtom',
  default: null
}); 