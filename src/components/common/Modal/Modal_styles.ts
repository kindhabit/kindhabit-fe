import styled, { css, keyframes } from 'styled-components';
import { StyledModalProps } from './Modal_types';
import { createDebugStyles } from '@/core/styles/debug';
import { DebugProps } from '@/core/theme/types/theme';

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

export const Overlay = styled.div<StyledModalProps>`
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

  ${createDebugStyles({
    name: 'Modal > Overlay',
    hierarchy: '1',
    color: '#FF44FF'
  })}
`;

export const ModalContainer = styled.div<StyledModalProps & DebugProps>`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.$type === 'popup' ? '16px' : '16px 16px 0 0'};
  width: ${props => props.$type === 'popup' ? 'auto' : '100%'};
  max-width: ${props => props.$type === 'popup' ? '90%' : '100%'};
  max-height: ${props => props.$type === 'popup' ? '90vh' : '90vh'};
  overflow-y: hidden;
  position: relative;
  animation: ${props => props.$animation === 'slideIn' ? slideUp : fadeIn} 0.3s ease-out;

  ${props => props.$type === 'popup' && css`
    margin: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `}

  ${createDebugStyles({
    name: 'Modal > Container',
    hierarchy: '2',
    color: '#44FFFF'
  })}
`;

export const Header = styled.div<DebugProps>`
  padding: 3px 16px;
  min-height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.white};
  position: relative;

  ${props => props['data-debug'] && css`
    background: rgba(255, 255, 0, 0.1);
    border: 2px dashed #FFFF44;
  `}

  ${createDebugStyles({
    name: 'Modal > Header',
    hierarchy: '3',
    color: '#FFFF44'
  })}
`;

export const Title = styled.h2<DebugProps>`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  flex: 1;

  ${props => props['data-debug'] && css`
    background: rgba(0, 255, 0, 0.1);
    border: 2px dashed #44FF44;
  `}

  ${createDebugStyles({
    name: 'Modal > Title',
    hierarchy: '4',
    color: '#44FF44'
  })}
`;

export const CloseButton = styled.button<DebugProps>`
  background: none;
  border: none;
  padding: 8px;
  margin-left: 12px;
  cursor: pointer;
  color: ${props => props.theme.colors.text.secondary};
  position: relative;
  
  &:hover {
    color: ${props => props.theme.colors.text.primary};
  }

  svg {
    width: 24px;
    height: 24px;
  }

  ${props => props['data-debug'] && css`
    background: rgba(255, 0, 0, 0.1);
    border: 2px dashed #FF4444;
  `}

  ${createDebugStyles({
    name: 'Modal > CloseButton',
    hierarchy: '4',
    color: '#FF4444'
  })}
`;

export const Content = styled.div<DebugProps>`
  padding: 20px;

  ${createDebugStyles({
    name: 'Modal > Content',
    hierarchy: '3',
    color: '#4444FF'
  })}
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
    white-space: pre-line;
  }

  &:hover {
    background: ${props => props.theme.colors.primary}08;
    transform: translateY(-2px);
  }
`; 