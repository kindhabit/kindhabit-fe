import styled, { css } from 'styled-components';
import { StyledStepIndicatorProps } from './BookingFlow_types';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 85vh;
  max-height: 85vh;
  overflow: hidden;
`;

export const Navigation = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 20px;
  background: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

export const BackButton = styled.button`
  border: none;
  background: none;
  padding: 8px;
  cursor: pointer;
  color: ${props => props.theme.colors.text.secondary};

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    color: ${props => props.theme.colors.text.primary};
  }
`;

export const CloseButton = styled(BackButton)`
  margin-left: auto;
`;

export const StepIndicator = styled.div<StyledStepIndicatorProps>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;

  .step {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${props => props.theme.colors.border};
    transition: all 0.2s ease-out;

    &.active {
      background: ${props => props.theme.colors.primary};
      width: 16px;
      border-radius: 3px;
    }
  }
`;

export const StepTitle = styled.div`
  flex-shrink: 0;
  text-align: center;
  padding: 16px 20px;
  
  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: ${props => props.theme.colors.text.primary};
  }

  p {
    margin: 4px 0 0;
    font-size: 14px;
    color: ${props => props.theme.colors.text.secondary};
  }
`;

export const Content = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

// 옵션 선택 화면 스타일
export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 20px;
`;

export const OptionCard = styled.div<{ $type: 'date' | 'hospital' }>`
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
export const StepContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
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
