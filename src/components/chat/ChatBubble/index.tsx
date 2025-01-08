import React, { useEffect, useRef } from 'react';
import { ChatBubbleMessage, ChatLinkMessage } from '@/types/chat';
import {
  BubbleWrapper,
  Avatar,
  MessageBubble,
  LinkText,
  MessageSection,
  ButtonContainer,
  BubbleButton
} from './styles';

interface ChatBubbleProps {
  message: ChatBubbleMessage;
  link?: ChatLinkMessage;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  link
}) => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (bubbleRef.current && linkRef.current) {
      const bubbleRect = bubbleRef.current.getBoundingClientRect();
      const linkRect = linkRef.current.getBoundingClientRect();

      console.log('Bubble right X:', bubbleRect.right);
      console.log('Link right X:', linkRect.right);
      
      // 디버깅용 마커 추가
      const marker = document.createElement('div');
      marker.style.position = 'fixed';
      marker.style.right = `${window.innerWidth - bubbleRect.right}px`;
      marker.style.top = `${bubbleRect.bottom}px`;
      marker.style.width = '2px';
      marker.style.height = '100px';
      marker.style.backgroundColor = 'red';
      document.body.appendChild(marker);

      const linkMarker = document.createElement('div');
      linkMarker.style.position = 'fixed';
      linkMarker.style.right = `${window.innerWidth - linkRect.right}px`;
      linkMarker.style.top = `${linkRect.top}px`;
      linkMarker.style.width = '2px';
      linkMarker.style.height = '20px';
      linkMarker.style.backgroundColor = 'blue';
      document.body.appendChild(linkMarker);

      return () => {
        document.body.removeChild(marker);
        document.body.removeChild(linkMarker);
      };
    }
  }, []);

  const { type, message: content, showProfile, consecutive, buttons } = message;

  return (
    <BubbleWrapper type={type}>
      <MessageSection type={type}>
        {type === 'jerry' && showProfile && !consecutive && (
          <div>
            <Avatar>김제리</Avatar>
          </div>
        )}
        <MessageBubble ref={bubbleRef} type={type}>
          {content}
          {buttons && (
            <ButtonContainer>
              {buttons.map((button, index) => (
                <BubbleButton
                  key={index}
                  className={button.variant}
                  onClick={button.onClick}
                >
                  {button.text}
                </BubbleButton>
              ))}
            </ButtonContainer>
          )}
          {link && (
            <LinkText 
              ref={linkRef}
              position={link.position}
              onClick={link.onClick}
            >
              {link.text}
            </LinkText>
          )}
        </MessageBubble>
      </MessageSection>
    </BubbleWrapper>
  );
};

export default ChatBubble; 