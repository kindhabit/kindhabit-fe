import { ReactNode } from 'react';

export type BookingStep = 
  | 'options'
  | 'date'
  | 'hospital'
  | 'hospital-list'
  | 'basic-checkup'
  | 'additional-checkup'
  | 'date-selection'
  | 'info'
  | 'complete';

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
  bookingData?: BookingData;
  onUpdateBookingData?: (data: Partial<BookingData>) => void;
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
  selectedHospital?: Hospital;
  basicCheckups?: CheckupItem[];
  additionalCheckups?: CheckupItem[];
  consultationType?: 'direct' | 'phone';
} 
