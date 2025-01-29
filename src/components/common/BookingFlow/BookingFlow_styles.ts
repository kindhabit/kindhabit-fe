import styled, { css } from 'styled-components';
import { StyledStepIndicatorProps } from './BookingFlow_types';
import { createDebugStyles } from '@/core/styles/debug';
import { DebugProps } from '@/core/theme/types/theme';
import { Splash } from '@/components/common/Splash';

export const ModalContainer = styled.div<DebugProps>`
  display: flex;
  flex-direction: column;
  height: 85vh;
  max-height: 85vh;
  overflow: hidden;
  position: relative;

  ${createDebugStyles({
    name: 'BookingFlow > ModalContainer',
    hierarchy: '1',
    color: '#FF44FF'
  })}
`;

export const Navigation = styled.div<DebugProps>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px;
  background: #FFFFFF;
  position: relative;

  ${createDebugStyles({
    name: 'ModalContainer > Navigation',
    hierarchy: '2',
    color: '#44FFFF'
  })}
`;

export const BackButton = styled.button<DebugProps>`
  border: none;
  background: none;
  padding: 8px;
  cursor: pointer;
  color: ${props => props.theme.colors.text.secondary};
  position: relative;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    color: ${props => props.theme.colors.text.primary};
  }

  ${createDebugStyles({
    name: 'Navigation > BackButton',
    hierarchy: '3',
    color: '#FFFF44'
  })}
`;

export const CloseButton = styled(BackButton)`
  margin-left: auto;

  ${createDebugStyles({
    name: 'Navigation > CloseButton',
    hierarchy: '3',
    color: '#FF4444'
  })}
`;

export const StepIndicator = styled.div<StyledStepIndicatorProps & DebugProps>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;

  .step {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${props => props.theme.colors.border};
    transition: all 0.2s ease-out;

    &.active {
      background: ${props => props.theme.colors.primary};
      width: 12px;
      border-radius: 2px;
    }
  }

  ${createDebugStyles({
    name: 'Navigation > StepIndicator',
    hierarchy: '3',
    color: '#44FF44'
  })}
`;

export const StepTitle = styled.div<DebugProps>`
  flex-shrink: 0;
  text-align: center;
  padding: 0 20px 4px;
  position: relative;
  
  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: ${props => props.theme.colors.text.primary};
  }

  p {
    margin: 2px 0 0;
    font-size: 14px;
    color: ${props => props.theme.colors.text.secondary};
  }

  ${createDebugStyles({
    name: 'ModalContainer > StepTitle',
    hierarchy: '2',
    color: '#FF44FF'
  })}
`;

export const Content = styled.div<DebugProps>`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  position: relative;

  ${createDebugStyles({
    name: 'ModalContainer > Content',
    hierarchy: '2',
    color: '#4444FF'
  })}
`;

export const StepHeader = styled.div`
  padding: 20px 20px 12px;
  
  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }
  
  p {
    margin: 8px 0 0;
    font-size: 14px;
    color: ${props => props.theme.colors.text.secondary};
  }
`;

export const StepContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  
  .calendar-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

// 옵션 선택 화면 스타일
export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 20px;
  flex-shrink: 0;
`;

export const OptionCard = styled.div<{ $type: 'date' | 'hospital' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
  background: #E8F3FF80;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
    background: #D9EBFFB0;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const StepDebugLabel = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: #000;
  color: #fff;
  padding: 4px 8px;
  border-radius: 0 0 4px 4px;
  font-size: 12px;
  opacity: 0.7;
  z-index: 1000;
`;

// 각 스텝별 컨테이너 스타일
export const StepContainer = styled.div<DebugProps>`
  display: flex;
  flex-direction: column;
  padding: 0 4px;
  position: relative;

  ${createDebugStyles({
    name: 'Content > StepContainer',
    hierarchy: '3',
    color: '#44FF44'
  })}
`;

// 접을 수 있는 섹션 스타일
export const CollapsibleSection = styled.div<{ $isOpen: boolean }>`
  border-bottom: 1px solid ${props => props.theme.colors.border};

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    cursor: pointer;
  }

  .section-content {
    padding: 0 16px;
    max-height: ${props => props.$isOpen ? '500px' : '0'};
    overflow: hidden;
    transition: max-height 0.3s ease-out;
  }
`;

export const StyledFlowSplash = styled(Splash)`
  .splash-image {
    transform: scale(0.6);
    opacity: 0.8;
  }
`; 
