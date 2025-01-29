import { ReactNode } from 'react';
import { AvailableDatesResponse } from '@/services/xog/booking/types';
import { ChatBookingState } from '@/services/xog/booking/presentation/chat/booking_main';
import { Hospital } from '@/services/xog/booking/types';

export type BookingStep = 
  | 'options'
  | 'date'
  | 'hospital-list'
  | 'hospital'
  | 'basic-checkup'
  | 'additional-checkup'
  | 'date-selection'
  | 'info'
  | 'complete'
  | 'time'
  | 'confirm';

export interface BookingNavigationProps {
  currentStep: BookingStep;
  onBack: () => void;
  onClose: () => void;
  steps: {
    [key in BookingStep]: {
      title: string;
      subtitle?: string;
    };
  };
}

export interface BookingStepProps {
  onNext: (step: BookingStep) => void;
  onBack: () => void;
  onUpdateBookingData?: (data: Partial<BookingData>) => void;
  onAvailableDatesUpdate?: (data: AvailableDatesResponse) => void;
  bookingData?: Partial<BookingData>;
  bookingState?: ChatBookingState;
  availableDates?: AvailableDatesResponse | null;
}

export interface BookingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  bookingState?: ChatBookingState;
}

export interface StyledStepIndicatorProps {
  $totalSteps: number;
  $currentStep: number;
}

export interface CheckupItem {
  id: string;
  name: string;
  description?: string;
  isRequired?: boolean;
  isSelected?: boolean;
}

export interface BookingData {
  selectedDate?: Date;
  selectedHospital?: Hospital;
  basicCheckups?: CheckupItem[];
  additionalCheckups?: CheckupItem[];
  consultationType?: 'direct' | 'invite';
  selectedOption?: 'date' | 'hospital';
  checkupType?: string;
} 
