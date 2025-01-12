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
  ProfileName,
  UserWaitingIndicator
} from './styles';

interface ChatBubbleProps {
  message: TextMessage;
  prevType?: ChatType;
  prevHasLink?: boolean;
  buttonPosition?: 'inside' | 'outside';
  isWaitingForResponse?: boolean;
  onClick?: () => void;
}

interface MessageBubbleProps {
  $type: ChatType;
  $isHistory?: boolean;
  'data-debug'?: boolean;
  $isLink?: boolean;
  $hasButtons?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, prevType, prevHasLink, buttonPosition = 'outside', isWaitingForResponse = false, onClick }) => {
  const debugMode = useRecoilValue(debugModeState);

  const handleButtonClick = (buttonOnClick?: () => void) => {
    if (onClick) onClick();
    if (buttonOnClick) buttonOnClick();
  };

  return (
    <BubbleWrapper 
      $type={message.type}
      $prevType={prevType}
      $hasLink={prevHasLink}
      data-debug={debugMode}
    >
      <BubbleContainer $type={message.type} data-debug={debugMode}>
        {message.showProfile && message.profileText && (
          <span className="profile-name">{message.profileText}</span>
        )}
        <MessageBubble 
          $type={message.type} 
          data-debug={debugMode} 
          $isLink={message.isLink}
          $hasButtons={buttonPosition === 'inside' && !!message.buttons}
        >
          {message.message}
          {isWaitingForResponse && (
            <UserWaitingIndicator>
              <img src="/assets/splash.png" alt="Waiting for response..." />
            </UserWaitingIndicator>
          )}
          {buttonPosition === 'inside' && message.buttons && (
            <ButtonContainer data-debug={debugMode} $position="inside">
              {message.buttons.map((button, index) => (
                <BubbleButton
                  key={index}
                  onClick={() => handleButtonClick(button.onClick)}
                  $variant={button.variant || 'secondary'}
                  data-debug={debugMode}
                >
                  {button.text}
                </BubbleButton>
              ))}
            </ButtonContainer>
          )}
        </MessageBubble>
        {buttonPosition === 'outside' && message.buttons && (
          <ButtonContainer data-debug={debugMode}>
            {message.buttons.map((button, index) => (
              <BubbleButton
                key={index}
                onClick={() => handleButtonClick(button.onClick)}
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