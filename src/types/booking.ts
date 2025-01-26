export interface BookingData {
  id: string;
  date: string;
  time: string;
  status: BookingStatus;
  customerName?: string;
  customerPhone?: string;
  memo?: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface BookingSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface BookingDay {
  date: string;
  slots: BookingSlot[];
  isFullyBooked: boolean;
} 