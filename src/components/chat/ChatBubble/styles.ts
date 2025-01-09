import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { colors } from '@/theme';
import { ChatLinkPosition } from '@/types/chat';
import { CHAT_CONSTANTS, DEBUG_COLORS } from '@/constants/layout';
import { debugBorder } from '@/styles/debug';

interface BubbleWrapperProps {
  margin?: string;
}

interface MessageBubbleProps {
  type: 'jerry' | 'user';
  isHistory?: boolean;
}

export const BubbleWrapper = styled('div')<BubbleWrapperProps>`
  display: flex;
  flex-direction: column;
  margin: ${({ margin }) => margin || '0'};
  position: relative;
  width: 100%;
  padding: 0 16px;
  border: 2px dashed purple;
`;

export const MessageSection = styled('div')`
  border: 2px solid cyan;
`;

export const ProfileSection = styled('div')`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  margin-left: 0;
  border: 2px dotted orange;
`;

export const ProfileName = styled('span')`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.textPrimary};
`;

export const ProfileImage = styled('div')`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MessageBubble = styled('div')<MessageBubbleProps>`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 16px;
  background-color: ${({ type }) => type === 'jerry' ? colors.chat.jerryBubble : colors.chat.userBubble};
  color: ${colors.textPrimary};
  font-size: 15px;
  line-height: 1.5;
  white-space: pre-wrap;
  margin-left: ${({ type }) => type === 'jerry' ? '0' : 'auto'};
  opacity: ${({ isHistory }) => isHistory ? 0.6 : 1};
`;

export const ButtonContainer = styled('div')`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

export const BubbleButton = styled('button')<{ variant?: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  background: ${({ variant }) => 
    variant === 'primary' ? colors.primary : colors.secondary};
  color: ${({ variant }) => 
    variant === 'primary' ? '#fff' : colors.textPrimary};

  &:hover {
    background: ${({ variant }) => 
      variant === 'primary' ? colors.primaryDark : colors.secondaryDark};
  }
`;

export const LinkText = styled('div')<{ position: ChatLinkPosition }>`
  position: absolute;
  ${({ position }) => position.align}: 0;
  bottom: ${({ position }) => position.bottom}px;
  font-size: 13px;
  color: ${colors.textSecondary};
  cursor: pointer;
  margin-top: 8px;

  &:hover {
    text-decoration: underline;
  }
`; 