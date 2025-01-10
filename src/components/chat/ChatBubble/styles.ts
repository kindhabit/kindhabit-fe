import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { colors } from '@/theme';
import { ChatLinkPosition } from '@/types/chat';
import { CHAT_CONSTANTS, DEBUG_COLORS } from '@/constants/layout';
import { debugBorder } from '@/styles/debug';

interface BubbleWrapperProps {
  margin?: string;
  type?: 'jerry' | 'user';
}

interface MessageBubbleProps {
  type: 'jerry' | 'user';
  isHistory?: boolean;
}

interface BubbleSpacing {
  spacing: number;
}

export const BubbleWrapper = styled('div')<BubbleWrapperProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  padding: ${({ type }) => 
    type === 'jerry' 
      ? '0 24px 0 8px'     // 제리: 왼쪽 8px, 오른쪽 24px
      : '0 8px 0 24px'     // 사용자: 왼쪽 24px, 오른쪽 8px
  };
  z-index: 0;
  ${debugBorder('BubbleWrapper')}
`;

export const BubbleContainer = styled('div')<{ type: 'jerry' | 'user' }>`
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 80%;
  align-self: ${({ type }) => type === 'jerry' ? 'flex-start' : 'flex-end'};
  margin: ${({ type }) => 
    type === 'jerry' 
      ? '0 16px 0 0'    // 제리: 오른쪽 여백
      : '0 0 0 16px'    // 사용자: 왼쪽 여백
  };
  position: relative;
  ${debugBorder('BubbleContainer')}
`;

export const MessageSection = styled('div')`
  border: 2px solid cyan;
`;

export const ProfileSection = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  margin-left: 0;
  width: fit-content;
  ${debugBorder('ProfileSection')}
`;

export const ProfileName = styled('span')`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.textPrimary};
`;

export const MessageBubble = styled('div')<MessageBubbleProps>`
  padding: 12px 16px;
  margin-bottom: 0;
  border-radius: ${({ type }) => 
    type === 'jerry' ? '16px' : '8px'
  };
  background-color: ${({ type }) => 
    type === 'jerry' 
      ? colors.chat.jerryBubble 
      : '#F5F5DC'
  };
  color: ${({ type }) => 
    type === 'jerry' 
      ? colors.textPrimary 
      : '#000000'
  };
  font-size: 15px;
  line-height: 1.5;
  white-space: pre-wrap;
  opacity: ${({ isHistory }) => isHistory ? 0.6 : 1};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 12px;
    height: 20px;
    ${({ type }) => {
      if (type === 'jerry') {
        return `
          left: -10px;
          border-radius: 0 0 20px 0;
          background: ${colors.chat.jerryBubble};
          transform: skew(-10deg);
        `;
      } else {
        return `
          right: -10px;
          border-radius: 0 0 0 20px;
          background: #F5F5DC;
          transform: skew(10deg);
        `;
      }
    }}
    bottom: 0;
  }

  &::after {
    content: '디버깅 모드';
    position: absolute;
    top: -20px;
    left: 0;
    font-size: 12px;
    color: green;
  }
`;

export const ButtonContainer = styled('div')`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

export const BubbleButton = styled('button')<{ variant?: 'primary' | 'secondary' }>`
  padding: 6px 20px;
  border-radius: 8px;
  border: ${({ variant }) => 
    variant === 'primary' 
      ? 'none' 
      : '1px solid rgba(0, 0, 0, 0.2)'  // 검정색 테두리로 변경
  };
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(4px);

  background: ${({ variant }) => 
    variant === 'primary' 
      ? '#ffffff'
      : 'transparent'
  };
  color: ${({ variant }) => 
    variant === 'primary' 
      ? '#428BCA' 
      : '#000000'  // 검정색 텍스트로 변경
  };

  &:hover {
    background: ${({ variant }) => 
      variant === 'primary' 
        ? '#ffffff' 
        : 'rgba(255, 255, 255, 0.1)'
    };
  }
`;

export const LinkText = styled('div')<{ position: ChatLinkPosition }>`
  position: absolute;
  ${({ position }) => {
    if (position.align === 'right') {
      return `right: 0; text-align: right;`;
    }
    return `left: 0; text-align: left;`;
  }}
  bottom: ${({ position }) => Math.max(position.bottom - 8, 0)}px;
  font-size: 13px;
  color: ${colors.textSecondary};
  cursor: pointer;
  margin-top: 0;
  padding: 2px 4px;
  ${debugBorder('LinkText')}

  &:hover {
    text-decoration: underline;
  }
`; 