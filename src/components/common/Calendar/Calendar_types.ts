import { DefaultTheme } from 'styled-components';

export type SelectionMode = 'date-first' | 'hospital-first';

export interface CalendarProps {
  selectedDates: Date[];
  onDateSelect: (dates: Date[]) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  maxSelections?: number;
  availableCounts?: { [key: string]: number };
  mode?: 'date-first' | 'hospital-first';
  selectedHospitalId?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  renderDateContent?: (date: Date) => React.ReactNode;
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
  $mode?: 'date-first' | 'hospital-first';
} 