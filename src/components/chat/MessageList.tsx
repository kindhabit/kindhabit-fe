import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChatMessage, LoadingState } from '@/types/chat';
import ChatMessageComponent from './ChatMessage';
import UserResponseMessage from './UserResponseMessage';
import UserResponseBubble from './UserResponseBubble';
import RecommendationMessage from './RecommendationMessage';

const MessageListWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

interface MessageWrapperProps {
  isNew?: boolean;
}

const MessageWrapper = styled(Box)<MessageWrapperProps>`
  &:first-of-type {
    margin-top: 0;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`;

interface MessageListProps {
  messages: ChatMessage[];
  loading: LoadingState;
  onMoreInfo: () => void;
  onProceed: () => void;
  onSkip: () => void;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  loading, 
  onMoreInfo,
  onProceed,
  onSkip 
}) => {
  console.log('Messages:', messages);
  
  const [newMessageIds, setNewMessageIds] = useState<string[]>([]);

  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    if (latestMessage && !(latestMessage.type === 'user' && latestMessage.subType === 'response')) {
      setNewMessageIds(prev => [...prev, latestMessage.id]);
      setTimeout(() => {
        setNewMessageIds(prev => prev.filter(id => id !== latestMessage.id));
      }, 300);
    }
  }, [messages]);

  const renderMessages = useCallback(() => {
    console.log('Rendering messages:', messages);  // 디버깅용

    // 일반 메시지들 (제리봇/사용자)
    const normalMessages = messages
      .filter(msg => !(msg.type === 'user' && msg.subType === 'response'))
      .map(message => (
        <MessageWrapper key={message.id} isNew={newMessageIds.includes(message.id)}>
          <ChatMessageComponent 
            message={message} 
            loading={loading.isLoading}
          />
        </MessageWrapper>
      ));

    // 응답 버블 (마지막에 한 번만)
    const responseMessage = messages.find(msg => msg.type === 'user' && msg.subType === 'response');
    
    return (
      <>
        {normalMessages}
        {responseMessage && (
          <UserResponseBubble 
            key={responseMessage.id}
            onYes={onProceed}
            onNo={onSkip}
          />
        )}
      </>
    );
  }, [messages, newMessageIds, loading.isLoading, onProceed, onSkip]);

  return (
    <MessageListWrapper>
      {renderMessages()}
    </MessageListWrapper>
  );
};

export default MessageList; 