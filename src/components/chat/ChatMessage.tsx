import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChatMessage as ChatMessageType } from '@/types/health.types';
import { LoadingState } from '@/types/common.types';
import colors from '@/theme/colors';

const MessageWrapper = styled(Box, {
  name: 'MessageWrapper',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== '$messageType',
})<{ $messageType: 'assistant' | 'user' }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$messageType === 'assistant' ? 'flex-start' : 'flex-end'};
  margin: 4px 0;
  position: relative;
  margin-top: ${props => props.$messageType === 'assistant' ? '32px' : '4px'};
  width: 100%;
  opacity: 0;
  transform: translateY(20px);
  animation: messageAppear 0.8s ease-out forwards;

  @keyframes messageAppear {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MessageBubble = styled(Box, {
  name: 'MessageBubble',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== '$messageType',
})<{ $messageType: 'assistant' | 'user' }>`
  display: flex;
  flex-direction: column;
  max-width: 80%;
  width: fit-content;
  background: ${props => props.$messageType === 'assistant' 
    ? colors.assistant.background 
    : colors.user.background};
  color: ${props => props.$messageType === 'assistant' 
    ? colors.assistant.text 
    : colors.user.text};
  border-radius: ${props => props.$messageType === 'assistant' 
    ? '4px 20px 20px 20px'
    : '20px 4px 20px 20px'};
  padding: 12px;
  margin: ${props => props.$messageType === 'assistant' ? '0 auto 0 0' : '0 0 0 auto'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  white-space: pre-line;
  position: relative;
  opacity: 0;
  transform: translateY(10px);
  animation: bubbleAppear 0.5s ease-out forwards;
  animation-delay: 0.3s;

  @keyframes bubbleAppear {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MessageText = styled(Typography)`
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
`;

const TypingIndicator = styled(Box)`
  display: flex;
  gap: 4px;
  padding: 8px;

  .dot {
    width: 8px;
    height: 8px;
    background: ${colors.primary};
    border-radius: 50%;
    animation: bounce 1.4s infinite;
    
    &:nth-of-type(2) { animation-delay: 0.2s; }
    &:nth-of-type(3) { animation-delay: 0.4s; }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
`;

const AvatarContainer = styled(Box)`
  display: flex;
  align-items: flex-end;
  gap: 4px;
  margin-bottom: 4px;
  position: absolute;
  top: -28px;
  left: -4px;
`;

const StyledAvatar = styled('div')`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: fit-content;
  height: 28px;
  padding: 0 12px;
  font-family: 'Pretendard';
  font-size: 14px;
  font-weight: 500;
  color: ${colors.grey[600]};
  white-space: nowrap;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LinkText = styled(Typography)`
  margin-top: 4px;
  color: ${colors.grey[600]};
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  position: absolute;
  right: 16px;
  bottom: -24px;
  
  &:hover {
    color: ${colors.grey[800]};
  }
`;

interface ChatMessageProps {
  message: ChatMessageType;
  loading: boolean | LoadingState;
  showLink?: boolean;
  onLinkClick?: () => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  loading = { isLoading: false },
  showLink = false,
  onLinkClick
}) => {
  const [linkClicked, setLinkClicked] = useState(false);

  const handleLinkClick = () => {
    if (!linkClicked) {
      setLinkClicked(true);
      onLinkClick?.();
    }
  };

  const isUser = message.type === 'user';
  const isLoading = typeof loading === 'boolean' ? loading : loading.isLoading;

  return (
    <MessageWrapper $messageType={message.type}>
      {message.type === 'assistant' && (
        <AvatarContainer>
          <StyledAvatar>김제리</StyledAvatar>
        </AvatarContainer>
      )}
      <MessageBubble $messageType={message.type}>
        <MessageText style={{ whiteSpace: 'pre-line' }}>
          {message.content}
        </MessageText>
        {message.type === 'assistant' && showLink && !linkClicked && (
          <LinkText onClick={handleLinkClick}>
            이 질문과 관련한 이유 알아보기 →
          </LinkText>
        )}
      </MessageBubble>
      {isLoading && (
        <TypingIndicator>
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </TypingIndicator>
      )}
    </MessageWrapper>
  );
};

export default ChatMessage; 