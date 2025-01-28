import styled, { css } from 'styled-components';
import { StyledCalendarProps, DateCellProps } from './Calendar_types';

export const CalendarContainer = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.white};
  border-radius: 16px;
  padding: 16px;
  color: #333333;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const MonthYearDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 20px;
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
  margin-bottom: 12px;
  text-align: center;
`;

export const WeekdayCell = styled.div<{ $isSaturday?: boolean; $isSunday?: boolean }>`
  font-size: 13px;
  font-weight: 500;
  color: ${props => {
    if (props.$isSaturday) return '#4A90E2';
    if (props.$isSunday) return '#2171D1';
    return '#333333';
  }};
  padding: 6px 4px;
`;

export const DatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  padding: 0 4px;
`;

export const DateCell = styled.button<DateCellProps>`
  width: 100%;
  height: 52px;
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
  padding: 6px 2px 4px;
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
    border: 1px solid ${props.theme.colors.primary};
    color: ${props.theme.colors.primary};
  `}

  ${props => props.$isSelected && css`
    background: ${props.theme.colors.primary};
    color: ${props.theme.colors.white};
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
    margin-bottom: 2px;
  }

  .available-count {
    font-size: 11px;
    padding: 1px 3px;
    border-radius: 3px;
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
  }
`;

export const Legend = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #333333;

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  &[data-type="today"]::before {
    border: 1px solid ${props => props.theme.colors.primary};
  }

  &[data-type="selected"]::before {
    background: ${props => props.theme.colors.primary};
  }
`;