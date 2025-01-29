import styled, { css } from 'styled-components';
import { StyledCalendarProps, DateCellProps } from './Calendar_types';

export const Footer = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 0;
  background: ${props => props.theme.colors.background};
  border-top: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin: 12px 20px 12px auto;
  min-width: 100px;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }

  &:disabled {
    background: ${props => props.theme.colors.disabled};
    cursor: not-allowed;
  }
`;

export const CalendarContainer = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.white};
  padding: 0;
  color: #333333;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

export const CalendarHeader = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 0;
`;

export const MonthYearDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 17px;
  font-weight: 600;
  color: #333333;

  .year {
    color: ${props => props.theme.colors.text.secondary};
  }
`;

export const NavigationButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: ${props => props.theme.colors.background};
  color: #333333;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${props => props.theme.colors.hover};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const WeekdayHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 8px;
  text-align: center;
`;

export const WeekdayCell = styled.div<{ $isSaturday?: boolean; $isSunday?: boolean }>`
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  color: ${props => {
    if (props.$isSaturday) return '#4A90E2';
    if (props.$isSunday) return '#2171D1';
    return '#333333';
  }};
  padding: 4px;
`;

export const DatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  padding: 0;
`;

export const DateCell = styled.button<DateCellProps>`
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 6px;
  background: transparent;
  font-size: ${props => props.$isOtherMonth ? '13px' : '15px'};
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 4px 2px 2px;
  color: ${props => {
    if (props.$isOtherMonth) return '#999999';
    if (props.$isSaturday) return '#4A90E2';
    if (props.$isSunday) return '#2171D1';
    return '#333333';
  }};

  ${props => props.$isDisabled && css`
    color: ${props.theme.colors.text.disabled};
    cursor: not-allowed;
  `}

  ${props => props.$isToday && css`
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: ${props.theme.colors.text.disabled};
    }
  `}

  ${props => props.$isSelected && css`
    background: ${props.theme.colors.primary};
    color: ${props.theme.colors.white};
    &::after {
      display: none;
    }
  `}

  ${props => props.$isInRange && css`
    background: ${props.theme.colors.primary}15;
  `}

  &:hover:not(:disabled) {
    background: ${props => props.$isSelected ? props.theme.colors.primaryDark : props.theme.colors.hover};
  }

  .date-number {
    font-weight: 500;
    line-height: 1;
    font-size: 15px;
    margin-bottom: 2px;
  }

  .available-count {
    font-size: 12px;
    margin-top: 2px;
    padding: 1px 4px;
    border-radius: 4px;
    background-color: ${({ $mode }) => 
      $mode === 'hospital-first' 
        ? '#E3F2FD'
        : '#FFE6E6'
    };
    color: ${({ $mode }) => 
      $mode === 'hospital-first'
        ? '#1976D2'
        : '#FF4081'
    };

    &::after {
      content: '개소';
      margin-left: 1px;
      font-size: 11px;
    }
  }
`;

export const Legend = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 20px;
  flex: 1;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${props => props.theme.colors.text.secondary};

  &[data-type="today"]::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #E0E0E0;
  }

  &[data-type="selected"]::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.theme.colors.primary};
  }
`;

export const BottomSection = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${props => props.theme.colors.border};
  margin-top: 2px;
`;