import styled, { css } from 'styled-components';
import { StyledCalendarProps } from './Calendar_types';

export const CalendarContainer = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.white};
  border-radius: 16px;
  padding: 24px;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;

export const MonthYearDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};

  .year {
    color: ${props => props.theme.colors.text.secondary};
  }
`;

export const NavigationButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${props => props.theme.colors.hover};
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const WeekdayHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 16px;
  text-align: center;
`;

export const WeekdayCell = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.text.secondary};
  padding: 8px;
`;

export const DatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

export const DateCell = styled.button<StyledCalendarProps>`
  width: 100%;
  aspect-ratio: 1;
  border: none;
  border-radius: 50%;
  background: transparent;
  font-size: 16px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;

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

  .label {
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 10px;
    color: ${props => props.theme.colors.primary};
    white-space: nowrap;
  }
`;

export const Legend = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${props => props.theme.colors.text.secondary};

  &::before {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  &[data-type="today"]::before {
    border: 1px solid ${props => props.theme.colors.primary};
  }

  &[data-type="selected"]::before {
    background: ${props => props.theme.colors.primary};
  }
`; 