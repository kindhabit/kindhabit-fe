import { styled } from '@mui/material/styles';
import { colors } from '@/theme';

export const SliderSection = styled('div')`
  padding: 16px;
  margin: 8px 0;
  background-color: ${colors.dashboard.background};
  width: 100%;
  border: 2px solid yellow;
`;

export const SliderContainer = styled('div')`
  display: flex;
  gap: 12px;
  padding: 8px 0;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  border: 2px dashed pink;
  
  & > * {
    scroll-snap-align: start;
  }
`;

export const SliderCard = styled('div')<{ selected?: boolean }>`
  flex: 0 0 auto;
  width: 200px;
  background: ${colors.chat.jerryBubble};
  border-radius: 16px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  scroll-snap-align: start;
  border: 2px solid lightgreen;
  
  ${({ selected }) => selected && `
    border: 2px solid ${colors.primary};
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(107, 68, 35, 0.1);
  `}
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(107, 68, 35, 0.1);
  }
`;

export const CardImage = styled('img')`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
`;

export const CardContent = styled('div')`
  padding: 0 4px;
  border: 2px dotted brown;
`;

export const CardTitle = styled('h3')`
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: ${colors.textPrimary};
`;

export const CardDescription = styled('p')`
  margin: 0;
  font-size: 14px;
  color: ${colors.textSecondary};
  line-height: 1.4;
`;

export const IconWrapper = styled('div')<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.color}15;  // 15% 투명도
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  
  svg {
    width: 24px;
    height: 24px;
    color: ${props => props.color};
  }
`;

export const TagsContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

export const Tag = styled('span')`
  padding: 6px 12px;
  background-color: ${colors.chat.background};
  border-radius: 16px;
  font-size: 13px;
  color: ${colors.textSecondary};
  white-space: nowrap;
`;

export const DotsContainer = styled('div')`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  border: 2px solid violet;
`;

export const Dot = styled('div')<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ active }) => active ? colors.primary : colors.textSecondary}40;
  transition: all 0.2s ease;
`; 