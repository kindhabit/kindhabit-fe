import { DefaultTheme } from 'styled-components';
import { ReactNode } from 'react';

export type SelectionMode = 'date-first' | 'hospital-first';

export interface CalendarProps {
  selectedDates: Date[];
  onDateSelect: (dates: Date[]) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  maxSelections?: number;
  availableCounts?: { [key: string]: number };
  mode?: SelectionMode;
  selectedHospitalId?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  renderDateContent?: (date: Date) => ReactNode;
  showDateContent?: boolean;
}

export interface StyledCalendarProps {
  theme?: DefaultTheme;
  $isSelected?: boolean;
  $isToday?: boolean;
  $isDisabled?: boolean;
  $isInRange?: boolean;
  $isOtherMonth?: boolean;
  $isSaturday?: boolean;
  $isSunday?: boolean;
}

export interface DateCellProps {
  $isSelected?: boolean;
  $isToday?: boolean;
  $isDisabled?: boolean;
  $isInRange?: boolean;
  $isOtherMonth?: boolean;
  $isSaturday?: boolean;
  $isSunday?: boolean;
  $mode?: SelectionMode;
} 