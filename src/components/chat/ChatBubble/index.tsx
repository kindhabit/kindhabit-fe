import React from 'react';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/store/debug';
import { ChatType, TextMessage } from '@/types/chat';
import {
  BubbleWrapper,
  BubbleContainer,
  MessageBubble,
  ButtonContainer,
  BubbleButton,
  LinkText,
  ProfileSection,
  ProfileName
} from './styles';

interface ChatBubbleProps {
  message: TextMessage;
  onHeightChange?: (height: number) => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onHeightChange }) => {
  const debugMode = useRecoilValue(debugModeState);

  return (
    <BubbleWrapper $type={message.type} data-debug={debugMode}>
      <BubbleContainer $type={message.type} data-debug={debugMode}>
        {message.showProfile && message.profileText && (
          <span className="profile-name">{message.profileText}</span>
        )}
        <MessageBubble $type={message.type} data-debug={debugMode} $isLink={message.isLink}>
          {message.message}
        </MessageBubble>
        {message.buttons && (
          <ButtonContainer data-debug={debugMode}>
            {message.buttons.map((button, index) => (
              <BubbleButton
                key={index}
                onClick={button.onClick}
                $variant={button.variant || 'secondary'}
                data-debug={debugMode}
              >
                {button.text}
              </BubbleButton>
            ))}
          </ButtonContainer>
        )}
        {message.link && (
          <LinkText
            $position={message.link.position}
            onClick={message.link.onClick}
            data-debug={debugMode}
          >
            {message.link.text}
          </LinkText>
        )}
      </BubbleContainer>
    </BubbleWrapper>
  );
};

export default ChatBubble; 