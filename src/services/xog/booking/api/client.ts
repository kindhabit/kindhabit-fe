import { BookingInfo, AvailableDate, BookingResponse } from '../types';
import { BOOKING_API } from './endpoints';

// 가상의 병원 데이터
const HOSPITALS = [
  { id: 'hosp1', name: '포항병원' },
  { id: 'hosp2', name: '서울병원' }
];

export class BookingClient {
  // 예약 가능한 날짜 조회
  async getAvailableDates(program: string): Promise<AvailableDate[]> {
    // 실제로는 API 호출
    // await fetch(BOOKING_API.GET_AVAILABLE_DATES)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const today = new Date();
    const dates: AvailableDate[] = [];
    
    // 다음 7일간의 가능한 날짜 생성
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // 주말 제외
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      
      HOSPITALS.forEach(hospital => {
        dates.push({
          date: date.toISOString().split('T')[0],
          availableTimes: ['09:00', '10:00', '11:00', '14:00', '15:00'],
          hospitalId: hospital.id,
          hospitalName: hospital.name
        });
      });
    }
    
    return dates;
  }
  
  // 예약 생성
  async createBooking(info: BookingInfo): Promise<BookingResponse> {
    // 실제로는 API 호출
    // await fetch(BOOKING_API.CREATE_BOOKING, { method: 'POST', body: JSON.stringify(info) })
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      bookingId: `BOOK-${Date.now()}`,
      status: 'confirmed',
      message: '예약이 완료되었습니다.'
    };
  }
  
  // 예약 조회
  async getBooking(bookingId: string): Promise<BookingInfo> {
    // 실제로는 API 호출
    // await fetch(BOOKING_API.GET_BOOKING.replace(':id', bookingId))
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      target: 'self',
      program: 'normal',
      date: '2024-02-01',
      time: '09:00'
    };
  }
} 