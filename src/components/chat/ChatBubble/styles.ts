import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import { colors } from '@/theme';

interface BubbleProps {
  type: 'jerry' | 'user';
}

export const BubbleWrapper = styled(Box)<BubbleProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  align-items: ${props => props.type === 'user' ? 'flex-end' : 'flex-start'};
`;

export const MessageSection = styled(Box)<BubbleProps>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.type === 'user' ? 'flex-end' : 'flex-start'};
  max-width: 70%;
  padding: ${props => props.type === 'user' ? '0 20px 0 0' : '0 0 0 20px'};
  position: relative;
`;

export const Avatar = styled(Box)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: fit-content;
  height: 28px;
  padding: 0 12px;
  border-radius: 14px;
  background: ${colors.brown}15;
  color: ${colors.brown};
  font-size: 14px;
  font-weight: 500;
  border: 1px solid ${colors.brown}20;
`;

export const MessageBubble = styled(Box)<BubbleProps>`
  position: relative;
  background: ${props => props.type === 'user' ? colors.brown : '#FFFFFF'};
  color: ${props => props.type === 'user' ? '#FFFFFF' : colors.textSecondary};
  padding: 12px 16px;
  border-radius: ${props => props.type === 'user' ? '20px 4px 20px 20px' : '4px 20px 20px 20px'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-size: 14px;
  line-height: 1.5;
  width: fit-content;
  max-width: 100%;
  white-space: pre-wrap;
`;

interface LinkPosition {
  align: 'left' | 'right';
  bottom: number;
}

export const LinkText = styled('button')<{ position: LinkPosition }>`
  background: none;
  border: none;
  font-size: 13px;
  color: ${colors.brown};
  padding: 4px 0;
  cursor: pointer;
  opacity: 0.8;
  text-decoration: underline;
  position: absolute;
  bottom: ${props => -props.position.bottom}px;
  right: 0;
  white-space: nowrap;
  
  &:hover {
    opacity: 1;
  }
`;

export const ButtonContainer = styled(Box)`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e0e0e0;
`;

export const BubbleButton = styled(Button)`
  min-width: 60px;
  padding: 6px 12px;
  border-radius: 8px;
  text-transform: none;
  font-weight: 500;
  font-size: 14px;
  
  &.primary {
    background-color: ${colors.brown};
    color: white;
    border: none;
    
    &:hover {
      background-color: ${colors.brown}dd;
    }
  }
  
  &.secondary {
    background-color: white;
    color: ${colors.textSecondary};
    border: 1px solid #e0e0e0;
    
    &:hover {
      background-color: #f5f5f5;
    }
  }
`; 