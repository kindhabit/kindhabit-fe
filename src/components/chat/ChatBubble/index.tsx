import React, { useEffect, useRef } from 'react';
import { ChatBubbleMessage, ChatLinkMessage } from '@/types/chat';
import { 
  BubbleWrapper,
  ProfileSection,
  ProfileImage,
  ProfileName,
  MessageBubble,
  ButtonContainer,
  BubbleButton,
  LinkText
} from './styles';

interface ChatBubbleProps {
  message: ChatBubbleMessage;
  link?: ChatLinkMessage;
  margin?: string;
  onHeightChange?: (height: number) => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, link, margin, onHeightChange }) => {
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bubbleRef.current && onHeightChange) {
      onHeightChange(bubbleRef.current.offsetHeight);
    }
  }, [message, onHeightChange]);

  return (
    <BubbleWrapper margin={margin} ref={bubbleRef}>
      {message.showProfile && (
        <ProfileSection>
          <ProfileImage />
          <ProfileName>김제리</ProfileName>
        </ProfileSection>
      )}
      <MessageBubble 
        type={message.type}
        isHistory={message.isHistory}
      >
        {message.message}
        {message.buttons && (
          <ButtonContainer>
            {message.buttons.map((button, index) => (
              <BubbleButton
                key={index}
                variant={button.variant}
                onClick={button.onClick}
              >
                {button.text}
              </BubbleButton>
            ))}
          </ButtonContainer>
        )}
      </MessageBubble>
      {link && (
        <LinkText position={link.position} onClick={link.onClick}>
          {link.text}
        </LinkText>
      )}
    </BubbleWrapper>
  );
};

export default ChatBubble; 