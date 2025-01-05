import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChatMessage as ChatMessageType } from '@/types/health.types';
import { LoadingState } from '@/types/common.types';
import { colors } from '@/theme';

const MessageWrapper = styled(Box)<{ type: 'user' | 'assistant' }>`
  opacity: 0;
  transform: translateY(20px);
  animation: slideIn 0.3s ease forwards;

  @keyframes slideIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MessageBubble = styled(Paper)<{ isUser: boolean }>`
  padding: 12px 16px;
  max-width: 70%;
  border-radius: 16px;
  background-color: ${props => props.isUser ? '#1976d2' : '#f5f5f5'};
  color: ${props => props.isUser ? '#ffffff' : 'inherit'};
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
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
    
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
`;

interface ChatMessageProps {
  message: ChatMessageType;
  loading: boolean | LoadingState;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  loading = { isLoading: false }
}) => {
  const isUser = message.type === 'user';
  const isLoading = typeof loading === 'boolean' ? loading : loading.isLoading;

  return (
    <MessageWrapper type={isUser ? 'user' : 'assistant'}>
      <MessageBubble isUser={isUser} elevation={0}>
        <Typography variant="body1">
          {message.content}
        </Typography>
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