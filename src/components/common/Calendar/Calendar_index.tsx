import React, { useState, useCallback } from 'react';
import { CalendarProps, DateCellProps } from './Calendar_types';
import {
  CalendarContainer,
  CalendarHeader,
  MonthYearDisplay,
  NavigationButton,
  WeekdayHeader,
  WeekdayCell,
  DatesGrid,
  DateCell,
  Legend,
  LegendItem
} from './Calendar_styles';

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

const Calendar: React.FC<CalendarProps> = ({
  selectedDates,
  onDateSelect,
  minDate,
  maxDate,
  disabledDates = [],
  maxSelections = 2
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const isToday = useCallback((date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }, []);

  const isSelected = useCallback((date: Date) => {
    return selectedDates.some(selectedDate =>
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  }, [selectedDates]);

  const isDisabled = useCallback((date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return disabledDates.some(disabledDate =>
      date.getDate() === disabledDate.getDate() &&
      date.getMonth() === disabledDate.getMonth() &&
      date.getFullYear() === disabledDate.getFullYear()
    );
  }, [minDate, maxDate, disabledDates]);

  const isInRange = useCallback((date: Date) => {
    if (selectedDates.length !== 2) return false;
    const [start, end] = selectedDates.sort((a, b) => a.getTime() - b.getTime());
    return date > start && date < end;
  }, [selectedDates]);

  const handleDateClick = (date: Date) => {
    if (isDisabled(date)) return;
    
    if (isSelected(date)) {
      onDateSelect(date); // 선택 해제
    } else if (selectedDates.length < maxSelections) {
      onDateSelect(date); // 선택
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    // 이전 달의 날짜들
    const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - 1, prevMonthDays - i);
      days.push(
        <DateCell
          key={`prev-${i}`}
          $isDisabled={true}
          onClick={() => {}}
        >
          {prevMonthDays - i}
        </DateCell>
      );
    }

    // 현재 달의 날짜들
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      days.push(
        <DateCell
          key={i}
          $isSelected={isSelected(date)}
          $isToday={isToday(date)}
          $isDisabled={isDisabled(date)}
          $isInRange={isInRange(date)}
          onClick={() => handleDateClick(date)}
        >
          {i}
          {isSelected(date) && (
            <span className="label">
              {selectedDates.indexOf(date) === 0 ? '1차방' : '2차방'}
            </span>
          )}
        </DateCell>
      );
    }

    // 다음 달의 날짜들
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(currentYear, currentMonth + 1, i);
      days.push(
        <DateCell
          key={`next-${i}`}
          $isDisabled={true}
          onClick={() => {}}
        >
          {i}
        </DateCell>
      );
    }

    return days;
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <NavigationButton onClick={handlePrevMonth}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </NavigationButton>
        <MonthYearDisplay>
          {MONTHS[currentMonth]}, <span className="year">{currentYear}</span>
        </MonthYearDisplay>
        <NavigationButton onClick={handleNextMonth}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </NavigationButton>
      </CalendarHeader>

      <WeekdayHeader>
        {WEEKDAYS.map(day => (
          <WeekdayCell key={day}>{day}</WeekdayCell>
        ))}
      </WeekdayHeader>

      <DatesGrid>
        {renderDays()}
      </DatesGrid>

      <Legend>
        <LegendItem data-type="today">오늘</LegendItem>
        <LegendItem data-type="selected">희망일</LegendItem>
      </Legend>
    </CalendarContainer>
  );
};

export default Calendar; 