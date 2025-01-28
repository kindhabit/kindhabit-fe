import { ReactNode } from 'react';

export interface CheckupDateSelectorProps {
  selectedDates: Date[];
  onDateSelect: (dates: Date[]) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  maxSelections?: number;
  buttonText?: string;
  onButtonClick?: () => void;
  footer?: ReactNode;
  renderDateContent?: (date: Date) => ReactNode;
  showDateContent?: boolean;
  availableCounts?: { [key: string]: number };
}

export interface StyledContainerProps {
  $hasFooter: boolean;
} 