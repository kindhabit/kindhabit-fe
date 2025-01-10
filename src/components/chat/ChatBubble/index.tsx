import React, { useEffect, useRef } from 'react';
import { ChatBubbleMessage, ChatLinkMessage } from '@/types/chat';
import { 
  BubbleWrapper,
  ProfileSection,
  ProfileName,
  MessageBubble,
  ButtonContainer,
  BubbleButton,
  LinkText,
  BubbleContainer
} from './styles';

interface ChatBubbleProps {
  message: ChatBubbleMessage;
  link?: ChatLinkMessage;
  margin?: string;
  onHeightChange?: (height: number) => void;
  previousMessage?: ChatBubbleMessage;
}

const BUBBLE_SPACING = 20;  // 여백 값 상수로 관리

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, link, margin, onHeightChange, previousMessage }) => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 각 요소의 너비를 측정하고 data-width 속성 설정
    const elements = [
      { ref: bubbleRef, name: 'bubble' },
      { ref: containerRef, name: 'container' },
      { ref: profileRef, name: 'profile' },
      { ref: messageRef, name: 'message' },
      { ref: linkRef, name: 'link' }
    ];

    elements.forEach(({ ref, name }) => {
      if (ref.current) {
        const width = Math.round(ref.current.getBoundingClientRect().width);
        ref.current.setAttribute('data-width', width.toString());
      }
    });

    if (bubbleRef.current && onHeightChange) {
      onHeightChange(bubbleRef.current.offsetHeight);
    }
  }, [message, onHeightChange]);

  // 프로필 표시 여부 계산
  const shouldShowProfile = message.type === 'jerry' && (
    !previousMessage || 
    previousMessage.type !== 'jerry' ||
    message.timestamp - previousMessage.timestamp > 300000  // 5분 이상 차이
  );

  return (
    <BubbleWrapper margin={margin} ref={bubbleRef} type={message.type}>
      {shouldShowProfile && (
        <ProfileSection>
          <ProfileName>김제리</ProfileName>
        </ProfileSection>
      )}
      <BubbleContainer 
        ref={containerRef}
        type={message.type}
      >
        <MessageBubble 
          ref={messageRef}
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
          <LinkText 
            ref={linkRef}
            position={link.position} 
            onClick={link.onClick}
          >
            {link.text}
          </LinkText>
        )}
      </BubbleContainer>
    </BubbleWrapper>
  );
};

export default ChatBubble; 