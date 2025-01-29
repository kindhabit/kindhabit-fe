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
  LegendItem,
  Footer,
  Button,
  BottomSection
} from './Calendar_styles';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

const Calendar: React.FC<CalendarProps> = ({
  selectedDates,
  onDateSelect,
  minDate,
  maxDate,
  disabledDates = [],
  maxSelections = 2,
  availableCounts = {},
  buttonText,
  onButtonClick,
  renderDateContent,
  showDateContent = false
}) => {
  const [currentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  // API에서 받은 availableCounts 객체의 키 값들을 Date 객체로 변환
  const availableDates = Object.keys(availableCounts).map(dateStr => new Date(dateStr));

  const isToday = useCallback((date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }, []);

  const isAvailable = useCallback((date: Date) => {
    if (minDate && date < minDate) return false;
    if (maxDate && date > maxDate) return false;
    if (date.getDay() === 0 || date.getDay() === 6) return false;
    
    const dateStr = date.toISOString().split('T')[0];
    return availableCounts[dateStr] > 0;
  }, [availableCounts, minDate, maxDate]);

  const isDisabled = useCallback((date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    if (date.getDay() === 0 || date.getDay() === 6) return true;

    const dateStr = date.toISOString().split('T')[0];
    return !availableCounts[dateStr] || availableCounts[dateStr] === 0;
  }, [availableCounts, minDate, maxDate]);

  const isSelected = useCallback((date: Date) => {
    return selectedDates.some(selectedDate =>
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  }, [selectedDates]);

  const isInRange = useCallback((date: Date) => {
    if (selectedDates.length !== 2) return false;
    const [start, end] = selectedDates.sort((a, b) => a.getTime() - b.getTime());
    return date > start && date < end;
  }, [selectedDates]);

  const getAvailableCount = useCallback((dateString: string) => {
    return availableCounts[dateString] || 0;
  }, [availableCounts]);
    
  const handleDateClick = (date: Date) => {
    if (isDisabled(date)) return;
    onDateSelect([date]);
    setCurrentMonth(date.getMonth());
    setCurrentYear(date.getFullYear());
  };

  const handlePrevMonth = () => {
    if (!availableDates.length) return;
    
    const firstAvailableDate = availableDates[0];
    const targetDate = new Date(currentYear, currentMonth - 1, 1);

    if (targetDate.getMonth() >= firstAvailableDate.getMonth() &&
        targetDate.getFullYear() >= firstAvailableDate.getFullYear()) {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(prev => prev - 1);
      } else {
        setCurrentMonth(prev => prev - 1);
      }
    }
  };

  const handleNextMonth = () => {
    if (!availableDates.length) return;
    
    const lastAvailableDate = availableDates[availableDates.length - 1];
    const targetDate = new Date(currentYear, currentMonth + 1, 1);

    if (targetDate.getMonth() <= lastAvailableDate.getMonth() &&
        targetDate.getFullYear() <= lastAvailableDate.getFullYear()) {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(prev => prev + 1);
      } else {
        setCurrentMonth(prev => prev + 1);
      }
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
      const dayOfWeek = date.getDay();
      days.push(
        <DateCell
          key={`prev-${i}`}
          $isOtherMonth={true}
          $isSaturday={dayOfWeek === 6}
          $isSunday={dayOfWeek === 0}
          $isDisabled={true}
          onClick={() => handleDateClick(date)}
        >
          <span className="date-number">{prevMonthDays - i}</span>
        </DateCell>
      );
    }

    // 현재 달의 날짜들
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const dayOfWeek = date.getDay();
      const dateString = date.toISOString().split('T')[0];
      const availableCount = getAvailableCount(dateString);

      days.push(
        <DateCell
          key={i}
          $isSelected={isSelected(date)}
          $isToday={isToday(date)}
          $isDisabled={isDisabled(date)}
          $isInRange={isInRange(date)}
          $isSaturday={dayOfWeek === 6}
          $isSunday={dayOfWeek === 0}
          onClick={() => handleDateClick(date)}
        >
          <span className="date-number">{i}</span>
          {showDateContent && renderDateContent ? (
            renderDateContent(date)
          ) : (
            isAvailable(date) && (
              <span className="available-count">
                {availableCount}
              </span>
            )
          )}
        </DateCell>
      );
    }

    // 다음 달의 날짜들
    const lastDayOfMonth = new Date(currentYear, currentMonth, daysInMonth).getDay();
    const remainingCells = 6 - lastDayOfMonth;
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(currentYear, currentMonth + 1, i);
      const dayOfWeek = date.getDay();
      days.push(
        <DateCell
          key={`next-${i}`}
          $isOtherMonth={true}
          $isSaturday={dayOfWeek === 6}
          $isSunday={dayOfWeek === 0}
          $isDisabled={true}
          onClick={() => handleDateClick(date)}
        >
          <span className="date-number">{i}</span>
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
        {WEEKDAYS.map((day, index) => (
          <WeekdayCell 
            key={day} 
            $isSaturday={index === 6}
            $isSunday={index === 0}
          >
            {day}
          </WeekdayCell>
        ))}
      </WeekdayHeader>

      <DatesGrid>
        {renderDays()}
      </DatesGrid>

      <BottomSection>
        <Legend>
          <LegendItem data-type="today">오늘</LegendItem>
          <LegendItem data-type="selected">희망일</LegendItem>
        </Legend>
        {buttonText && onButtonClick && (
          <Button 
            onClick={onButtonClick} 
            disabled={selectedDates.length === 0}
          >
            {buttonText}
          </Button>
        )}
      </BottomSection>
    </CalendarContainer>
  );
};

export default Calendar; 