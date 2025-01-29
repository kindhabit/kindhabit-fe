import styled from 'styled-components';
import { StyledContainerProps } from './CheckupDateSelector_types';

export const Container = styled.div<StyledContainerProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.white};
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  // 캘린더를 감싸는 wrapper
  .calendar-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    // 캘린더 내부 간격 조정
    .calendar-grid {
      flex: 1;
      display: grid;
      grid-template-rows: auto 1fr;
      row-gap: 1rem;
    }
  }

  // Footer 영역은 하단에 고정
  .footer {
    margin-top: auto;
    padding: 16px 24px;
    background: ${props => props.theme.colors.background};
    border-top: 1px solid ${props => props.theme.colors.border};
  }
`;

export const Header = styled.div`
  padding: 24px 24px 0;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin: 0 0 8px;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.text.secondary};
  margin: 0 0 24px;
`;

export const Footer = styled.div`
  padding: 16px 24px;
  background: ${props => props.theme.colors.background};
  border-top: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
`;

export const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }

  &:disabled {
    background: ${props => props.theme.colors.disabled};
    cursor: not-allowed;
  }
`; 