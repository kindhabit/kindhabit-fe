// 예약 대상자 타입
export type BookingTarget = 'self' | 'family';

// 예약 프로그램 타입
export type BookingProgram = 'normal' | 'comprehensive' | 'spouse';

// 예약 상태 관리
export const BookingState = {
  INITIAL: 'initial',           // 초기 상태
  SELECT_TARGET: 'select_target', // 대상자 선택
  SELECT_TYPE: 'select_type',     // 검진 종류 선택
  SELECT_PROGRAM: 'select_program', // 프로그램 선택
  SELECT_DATE: 'select_date',      // 날짜 선택
  CONFIRM: 'confirm'              // 예약 확정
} as const;

export type BookingStateType = typeof BookingState[keyof typeof BookingState];

// 예약 정보 인터페이스
export interface BookingInfo {
  target?: BookingTarget;
  type?: string;
  program?: BookingProgram;
  date?: string;
}

// 예약 서비스
export const bookingService = {
  // 대상자 선택 처리
  handleTargetSelection: (target: BookingTarget): BookingInfo => {
    return {
      target
    };
  },

  // 프로그램 선택 처리
  handleProgramSelection: (program: BookingProgram, currentInfo: BookingInfo): BookingInfo => {
    return {
      ...currentInfo,
      program
    };
  },

  // 현재 상태에서 다음 상태 반환
  getNextState: (currentState: BookingStateType): BookingStateType => {
    switch (currentState) {
      case BookingState.INITIAL:
        return BookingState.SELECT_TARGET;
      case BookingState.SELECT_TARGET:
        return BookingState.SELECT_PROGRAM; // 타입 선택 단계를 건너뛰고 프로그램 선택으로
      case BookingState.SELECT_PROGRAM:
        return BookingState.SELECT_DATE;
      case BookingState.SELECT_DATE:
        return BookingState.CONFIRM;
      default:
        return BookingState.INITIAL;
    }
  },

  // 예약 정보 검증
  validateBookingInfo: (info: BookingInfo): boolean => {
    if (!info.target) return false;
    if (info.program && !['normal', 'comprehensive', 'spouse'].includes(info.program)) return false;
    return true;
  }
}; 