import { DefaultTheme } from 'styled-components';

export interface CalendarProps {
  selectedDates: Date[];
  onDateSelect: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  maxSelections?: number;
}

export interface StyledCalendarProps {
  theme?: DefaultTheme;
  $isSelected?: boolean;
  $isToday?: boolean;
  $isDisabled?: boolean;
  $isInRange?: boolean;
}

export interface DateCellProps extends StyledCalendarProps {
  date: Date;
  onClick: () => void;
  label?: string;
} 