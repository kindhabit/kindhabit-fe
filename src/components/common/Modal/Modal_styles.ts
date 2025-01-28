import styled, { css, keyframes } from 'styled-components';
import { StyledModalProps } from './Modal_types';

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Overlay = styled.div<Pick<StyledModalProps, '$isOpen'>>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: ${props => props.$type === 'popup' ? 'center' : 'flex-end'};
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalContainer = styled.div<StyledModalProps>`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.$type === 'popup' ? '16px' : '16px 16px 0 0'};
  width: ${props => props.$type === 'popup' ? 'auto' : '100%'};
  max-width: ${props => props.$type === 'popup' ? '90%' : '100%'};
  max-height: ${props => props.$type === 'popup' ? '90vh' : '70vh'};
  overflow-y: auto;
  position: relative;
  animation: ${props => props.$animation === 'slideIn' ? slideUp : fadeIn} 0.3s ease-out;

  ${props => props.$type === 'popup' && css`
    margin: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `}
`;

export const Header = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: ${props => props.theme.colors.text.secondary};
  
  &:hover {
    color: ${props => props.theme.colors.text.primary};
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const Content = styled.div`
  padding: 20px;
`;

export const ReservationOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 20px;
`;

export const ReservationOptionCard = styled.div<{ $type: 'date' | 'hospital' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
  background: ${props => props.theme.colors.background};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease-out;

  svg {
    width: 32px;
    height: 32px;
    color: ${props => props.theme.colors.primary};
  }

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.theme.colors.text.primary};
    text-align: center;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: ${props => props.theme.colors.text.secondary};
    text-align: center;
  }

  &:hover {
    background: ${props => props.theme.colors.primary}08;
    transform: translateY(-2px);
  }
`; 