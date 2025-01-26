import { BookingData, BookingDay, BookingSlot } from '@/types/booking';

// 로딩 메시지 관리
export const loadingMessages = [
  '예약 가능한 시간을 확인하고 있어요...',
  '예약 정보를 불러오는 중입니다...',
  '곧 예약 화면이 표시됩니다...'
];

// 부킹 상태 관리
export const BookingState = {
  INITIAL: 'initial',
  LOADING: 'loading',
  READY: 'ready',
  WAITING: 'waiting',
  CONFIRMING: 'confirming',
  COMPLETED: 'completed'
} as const;

export type BookingStateType = typeof BookingState[keyof typeof BookingState];

// 초기 예약 가능 시간 생성 (예시)
export const createInitialBookingSlots = (date: string): BookingSlot[] => {
  const slots: BookingSlot[] = [];
  const startHour = 10; // 오전 10시 시작
  const endHour = 20;   // 오후 8시 종료

  for (let hour = startHour; hour < endHour; hour++) {
    // 1시간 단위로 슬롯 생성
    slots.push({
      id: `slot_${date}_${hour}`,
      startTime: `${hour}:00`,
      endTime: `${hour + 1}:00`,
      isAvailable: true
    });
  }

  return slots;
};

// 예약 가능한 날짜 생성 (예시)
export const createInitialBookingDays = (startDate: Date, numberOfDays: number): BookingDay[] => {
  const days: BookingDay[] = [];

  for (let i = 0; i < numberOfDays; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dateString = date.toISOString().split('T')[0];

    days.push({
      date: dateString,
      slots: createInitialBookingSlots(dateString),
      isFullyBooked: false
    });
  }

  return days;
}; 