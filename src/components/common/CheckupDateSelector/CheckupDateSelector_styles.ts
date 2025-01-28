import styled from 'styled-components';
import { StyledContainerProps } from './CheckupDateSelector_types';

export const Container = styled.div<StyledContainerProps>`
  width: 100%;
  background: ${props => props.theme.colors.white};
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: ${props => props.hasFooter ? '0' : '16px'};
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

export const CheckboxGroup = styled.div`
  padding: 0 24px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${props => props.theme.colors.text.primary};
  cursor: pointer;

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 2px solid ${props => props.theme.colors.border};
    appearance: none;
    cursor: pointer;
    position: relative;

    &:checked {
      background: ${props => props.theme.colors.primary};
      border-color: ${props => props.theme.colors.primary};

      &::after {
        content: '';
        position: absolute;
        left: 6px;
        top: 2px;
        width: 4px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }
  }
`;

export const Footer = styled.div`
  padding: 16px 24px;
  background: ${props => props.theme.colors.background};
  border-top: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: flex-end;
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