import { 
  BookingTarget, 
  BookingProgram,
  BookingStateType,
  BookingState,
  BookingInfo
} from '../../types';
import { BookingAPI } from '../../api';

export class FormBookingState {
  private bookingInfo: BookingInfo = {};
  private bookingState: BookingStateType = BookingState.INITIAL;
  private listeners: ((state: ReturnType<FormBookingState['getState']>) => void)[] = [];

  // 상태 변경 구독
  subscribe(listener: (state: ReturnType<FormBookingState['getState']>) => void) {
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
  initialize() {
    this.bookingInfo = {};
    this.bookingState = BookingState.SELECT_TARGET;
    this.notifyStateChange();
  }

  // 대상자 선택 처리
  handleTargetSelection(target: BookingTarget) {
    this.bookingInfo = { target };
    this.bookingState = BookingState.SELECT_PROGRAM;
    this.notifyStateChange();
  }

  // 프로그램 선택 처리
  handleProgramSelection(program: BookingProgram) {
    this.bookingInfo = {
      ...this.bookingInfo,
      program
    };
    this.bookingState = BookingState.SELECT_DATE;
    this.notifyStateChange();
  }

  // 날짜 선택 처리
  async handleDateSelection(date: string) {
    this.bookingInfo = {
      ...this.bookingInfo,
      date
    };
    
    try {
      const availableDates = await BookingAPI.getAvailableDates(this.bookingInfo.program!);
      const selectedDate = availableDates.find(d => d.date === date);
      
      if (selectedDate) {
        this.bookingState = BookingState.SELECT_TIME;
        this.notifyStateChange();
      }
    } catch (error) {
      console.error('Failed to get available dates:', error);
    }
  }

  // 시간 선택 처리
  handleTimeSelection(time: string) {
    this.bookingInfo = {
      ...this.bookingInfo,
      time
    };
    this.bookingState = BookingState.CONFIRM;
    this.notifyStateChange();
  }

  // 예약 확인
  async handleConfirm() {
    try {
      const response = await BookingAPI.createBooking(this.bookingInfo);
      if (response.status === 'confirmed') {
        this.bookingState = BookingState.COMPLETE;
        this.notifyStateChange();
      }
    } catch (error) {
      console.error('Failed to create booking:', error);
    }
  }

  // 상태 조회
  getState() {
    return {
      bookingState: this.bookingState,
      bookingInfo: this.bookingInfo
    };
  }
} 