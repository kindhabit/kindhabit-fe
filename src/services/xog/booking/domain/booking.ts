import { 
  BookingInfo, 
  BookingTarget, 
  BookingProgram, 
  BookingStateType,
  BookingState
} from '../types';

export class BookingDomain {
  private bookingInfo: BookingInfo = {};
  private bookingState: BookingStateType = BookingState.INITIAL;

  // 상태 초기화
  initialize() {
    this.bookingInfo = {};
    this.bookingState = BookingState.INITIAL;
  }

  // 대상자 선택
  handleTargetSelection(target: BookingTarget): void {
    this.bookingInfo = { target };
    this.bookingState = BookingState.SELECT_PROGRAM;
  }

  // 프로그램 선택
  handleProgramSelection(program: BookingProgram): void {
    this.bookingInfo = { ...this.bookingInfo, program };
    this.bookingState = BookingState.SELECT_DATE;
  }

  // 날짜 및 시간 선택
  handleDateTimeSelection(date: string, time: string, hospitalId: string): void {
    this.bookingInfo = {
      ...this.bookingInfo,
      date,
      time,
      hospitalId
    };
    this.bookingState = BookingState.CONFIRM;
  }

  // 예약 완료
  completeBooking(): void {
    this.bookingState = BookingState.COMPLETE;
  }

  // 상태 조회
  getState() {
    return {
      bookingInfo: this.bookingInfo,
      bookingState: this.bookingState
    };
  }
} 