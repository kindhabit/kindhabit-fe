import { BookingInfo, AvailableDate, BookingResponse } from '../types';

// API 엔드포인트
export const BOOKING_API = {
  GET_AVAILABLE_DATES: '/api/xog/booking/available-dates',
  CREATE_BOOKING: '/api/xog/booking',
  GET_BOOKING: '/api/xog/booking/:id'
} as const;

// API 클라이언트
export class BookingAPI {
  // 가용 날짜 조회
  static async getAvailableDates(program: string): Promise<AvailableDate[]> {
    // TODO: 실제 API 호출로 대체
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() === 0 || date.getDay() === 6) return null; // 주말 제외
      
      return {
        date: date.toISOString().split('T')[0],
        availableTimes: ['10:00', '14:00', '16:00'],
        hospitalId: 'hospital_1',
        hospitalName: '메인 병원'
      };
    }).filter(Boolean) as AvailableDate[];
  }

  // 예약 생성
  static async createBooking(info: BookingInfo): Promise<BookingResponse> {
    // TODO: 실제 API 호출로 대체
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      bookingId: `booking_${Date.now()}`,
      status: 'confirmed',
      message: '예약이 완료되었습니다.'
    };
  }

  // 예약 조회
  static async getBooking(bookingId: string): Promise<BookingInfo> {
    // TODO: 실제 API 호출로 대체
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      target: '성인',
      program: '기본',
      date: '2024-03-01',
      time: '10:00',
      hospitalId: 'hospital_1'
    };
  }
} 