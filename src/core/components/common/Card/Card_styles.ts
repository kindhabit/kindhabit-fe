import styled, { css } from 'styled-components';
import { StyledCardProps } from './Card_types';

export const CardContainer = styled.div<StyledCardProps>`
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 16px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  min-height: 180px;
  width: ${props => props.$layoutType === 'grid' ? '100%' : (props.$width || '180px')};
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  ${({ $selected, theme }) => $selected && css`
    background-color: ${theme.colors.primary};
    color: white;

    ${Button} {
      border-color: white;
      color: white;
    }
  `}
`;

export const IconWrapper = styled.div<{ $size?: string }>`
  width: ${props => props.$size || '64px'};
  height: ${props => props.$size || '64px'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 32px;
`;

export const Title = styled.div<{ $size?: string }>`
  font-size: ${props => props.$size || '18px'};
  font-weight: 600;
  color: inherit;
  margin-bottom: 8px;
  text-align: center;
`;

export const Description = styled.div<{ $size?: string }>`
  font-size: ${props => props.$size || '14px'};
  color: #666;
  text-align: center;
  margin-bottom: 24px;
  line-height: 1.4;

  ${CardContainer}[data-selected=true] & {
    color: white;
  }
`;

export const TagContainer = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-top: auto;
  justify-content: center;
`;

export const Tag = styled.span`
  padding: 4px 8px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Button = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  background: transparent;
  margin-top: auto;
  font-size: 16px;
  color: #666;
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