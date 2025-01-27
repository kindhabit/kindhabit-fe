import styled, { css } from 'styled-components';
import { StyledCardProps } from './Card_types';

export const CardContainer = styled.div<StyledCardProps>`
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.chat.slider.card.background};
  background-color: ${({ theme }) => `${theme.colors.chat.slider.card.background}${Math.floor(theme.colors.chat.slider.card.backgroundAlpha * 255).toString(16).padStart(2, '0')}`};
  border: 1px solid ${({ theme }) => theme.colors.chat.slider.card.border};
  cursor: pointer;
  min-height: 180px;
  width: ${props => props.$layoutType === 'grid' ? '100%' : (props.$width || '180px')};
  flex-shrink: 0;
  box-shadow: ${({ theme }) => theme.colors.chat.slider.card.shadow};
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: ${({ theme }) => theme.colors.chat.slider.card.hoverShadow};
  }

  ${({ $selected, theme }) => $selected && css`
    border-color: ${theme.colors.chat.slider.card.selectedBorder};
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};

    ${Description} {
      color: ${theme.colors.white};
    }

    ${Button} {
      border-color: ${theme.colors.white};
      color: ${theme.colors.white};
    }

    ${Tag} {
      background: ${theme.colors.primary}20;
      color: ${theme.colors.white};
    }
  `}
`;

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const IconWrapper = styled.div<{ $size?: string }>`
  width: ${props => props.$size || '48px'};
  height: ${props => props.$size || '48px'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`;

export const Title = styled.div<{ $size?: string }>`
  font-size: ${props => props.$size || '18px'};
  font-weight: 600;
  color: inherit;
  text-align: left;
`;

export const Subtitle = styled.div<{ $size?: string }>`
  font-size: ${props => props.$size || '14px'};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: left;
  font-weight: 500;
`;

export const CheckIcon = styled.div`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin: 16px 0;
`;

export const Description = styled.div<{ $size?: string }>`
  font-size: ${props => props.$size || '14px'};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: 24px;
  line-height: 1.4;
`;

export const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  justify-content: center;
  flex-wrap: nowrap;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const Tag = styled.span`
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.primary}20;
  white-space: nowrap;
`;

export const Button = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  margin-top: auto;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const CardGrid = styled.div<{ $columns?: number; $gap?: string }>`
  display: grid;
  grid-template-columns: repeat(${props => props.$columns || 2}, 1fr);
  gap: ${props => props.$gap || '24px'};
  width: 100%;
  padding: 12px 0;
`;

export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 12px 0;
`;

export const CardSlider = styled.div<{ $gap?: string }>`
  display: flex;
  gap: ${props => props.$gap || '24px'};
  width: 100%;
  overflow-x: auto;
  padding: 12px 4px;
  
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const SliderDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 8px;
`;

export const SliderDot = styled.div<{ $active?: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ $active, theme }) => 
    $active ? theme.colors.primary : theme.colors.border};
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
`;