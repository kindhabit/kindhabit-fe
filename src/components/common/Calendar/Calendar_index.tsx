import React, { useState } from "react";
import { CalendarProps } from "./Calendar_types";
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
  BottomSection,
} from "./Calendar_styles";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const MONTHS = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

const Calendar: React.FC<CalendarProps> = ({ selectedDates, onDateSelect, buttonText, onButtonClick }) => {
  const [currentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    setCurrentYear((prev) => (currentMonth === 0 ? prev - 1 : prev));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    setCurrentYear((prev) => (currentMonth === 11 ? prev + 1 : prev));
  };

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const renderDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    // 빈칸 채우기 (이전 달)
    for (let i = 0; i < firstDay; i++) {
      days.push(<DateCell key={`prev-${i}`} disabled />);
    }

    // 현재 달의 날짜
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <DateCell key={i} onClick={() => onDateSelect([new Date(currentYear, currentMonth, i)])}>
          {i}
        </DateCell>
      );
    }

    return days;
  };

  return (
    <CalendarContainer>
      {/* 헤더 */}
      <CalendarHeader>
        <NavigationButton onClick={handlePrevMonth}>{"<"}</NavigationButton>
        <MonthYearDisplay>{`${MONTHS[currentMonth]} ${currentYear}`}</MonthYearDisplay>
        <NavigationButton onClick={handleNextMonth}>{">"}</NavigationButton>
      </CalendarHeader>

      {/* 요일 */}
      <WeekdayHeader>
        {WEEKDAYS.map((day) => (
          <WeekdayCell key={day}>{day}</WeekdayCell>
        ))}
      </WeekdayHeader>

      {/* 날짜 */}
      <DatesGrid>{renderDays()}</DatesGrid>

      {/* 하단 고정 영역 */}
      <BottomSection>
        <Legend>
          <LegendItem>오늘</LegendItem>
          <LegendItem>희망일</LegendItem>
        </Legend>
        {buttonText && (
          <Button onClick={onButtonClick} disabled={selectedDates.length === 0}>
            {buttonText}
          </Button>
        )}
      </BottomSection>
    </CalendarContainer>
  );
};

export default Calendar;
