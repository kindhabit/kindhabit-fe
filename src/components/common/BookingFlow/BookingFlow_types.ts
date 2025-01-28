import { ReactNode } from 'react';
import { AvailableDatesResponse } from '@/services/xog/booking/types';

export type BookingStep = 
  | 'options'
  | 'date'
  | 'hospital'
  | 'hospital-list'
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
  onNext: (nextStep: BookingStep) => void;
  onBack: (prevStep: BookingStep) => void;
  onUpdateBookingData?: (data: Partial<BookingData>) => void;
  onAvailableDatesUpdate?: (data: AvailableDatesResponse) => void;
  bookingData?: BookingData;
  availableDates?: AvailableDatesResponse | null;
}

export interface BookingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: BookingStep;
  onComplete?: () => void;
}

export interface StyledStepIndicatorProps {
  $totalSteps: number;
  $currentStep: number;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  tags: string[];
  image?: string;
}

export interface CheckupItem {
  id: string;
  name: string;
  price?: number;
  isRequired?: boolean;
  isSelected?: boolean;
}

export interface BookingData {
  selectedDate?: Date;
  selectedHospital?: string;
  selectedTime?: string;
  [key: string]: any;
} 
