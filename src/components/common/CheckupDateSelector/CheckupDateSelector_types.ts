import { ReactNode } from 'react';

export interface CheckupDateSelectorProps {
  selectedDates: Date[];
  onDateSelect: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  maxSelections?: number;
  checkupType?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  checkboxOptions?: Array<{
    id: string;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }>;
  footer?: ReactNode;
}

export interface StyledContainerProps {
  hasFooter: boolean;
} 