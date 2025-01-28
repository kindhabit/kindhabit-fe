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
  mode = 'date-first',
  selectedHospitalId
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 14);

    const isWithinRange = date >= today && date <= maxDate;
    if (!isWithinRange) return false;

    if (date.getDay() === 0 || date.getDay() === 6) return false;

    const dateStr = date.toISOString().split('T')[0];
    return availableCounts[dateStr] > 0;
  }, [availableCounts]);

  const isDisabled = useCallback((date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 14);

    if (date < today || date > maxDate) return true;
    if (date.getDay() === 0 || date.getDay() === 6) return true;

    const dateStr = date.toISOString().split('T')[0];
    return !availableCounts[dateStr] || availableCounts[dateStr] === 0;
  }, [availableCounts]);

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
    if (mode === 'date-first') {
      // 날짜 우선 모드: 전체 가용 병원 수 표시
      return availableCounts[dateString] || 0;
    } else {
      // 병원 우선 모드: 선택된 병원의 가용 여부만 표시 (0 또는 1)
      return selectedHospitalId && availableCounts[dateString] ? 1 : 0;
    }
  }, [mode, availableCounts, selectedHospitalId]);

  const handleDateClick = (date: Date, isOtherMonth: boolean) => {
    if (isDisabled(date)) return;
    
    if (isOtherMonth) {
        setCurrentMonth(date.getMonth());
        setCurrentYear(date.getFullYear());
        return;
    }
    
    const dateString = date.toISOString().split('T')[0];
    const availableCount = getAvailableCount(dateString);

    if (availableCount === 0) return;

    if (mode === 'hospital-first' && !selectedHospitalId) return;

    const isDateSelected = isSelected(date);
    
    if (isDateSelected) {
        // 선택 해제
        const newSelectedDates = selectedDates.filter(selectedDate => 
            selectedDate.getTime() !== date.getTime()
        );
        onDateSelect(newSelectedDates);
    } else if (selectedDates.length < maxSelections) {
        // 선택 추가
        const newSelectedDates = [...selectedDates, date];
        onDateSelect(newSelectedDates);
    }
  };

  const handlePrevMonth = () => {
    if (!availableDates.length) return;  // 가용 날짜가 없으면 이동하지 않음
    
    const firstAvailableDate = availableDates[0];
    const targetDate = new Date(currentYear, currentMonth - 1, 1);

    // 이전 달로 이동 시 사용 가능한 날짜가 있는 경우에만 이동
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
    if (!availableDates.length) return;  // 가용 날짜가 없으면 이동하지 않음
    
    const lastAvailableDate = availableDates[availableDates.length - 1];
    const targetDate = new Date(currentYear, currentMonth + 1, 1);

    // 다음 달로 이동 시 사용 가능한 날짜가 있는 경우에만 이동
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
          onClick={() => handleDateClick(date, true)}
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
          $mode={mode}
          onClick={() => handleDateClick(date, false)}
        >
          <span className="date-number">{i}</span>
          {isAvailable(date) && (
            <span className="available-count">
              {mode === 'date-first' ? `${availableCount}개소` : '예약가능'}
            </span>
          )}
        </DateCell>
      );
    }

    // 다음 달의 날짜들 (현재 달의 마지막 주 채우기)
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
          onClick={() => handleDateClick(date, true)}
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

      <Legend>
        <LegendItem data-type="today">오늘</LegendItem>
        <LegendItem data-type="selected">희망일</LegendItem>
      </Legend>
    </CalendarContainer>
  );
}

export { Calendar };
export { Calendar as CheckupDateSelector };
export default Calendar; 