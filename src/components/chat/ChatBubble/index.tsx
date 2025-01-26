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
  buttonPosition?: 'bottom' | 'right';
  isWaiting?: boolean;
  onClick?: () => void;
}

interface MessageBubbleProps {
  $type: ChatType;
  $isHistory?: boolean;
  'data-debug'?: boolean;
  $isLink?: boolean;
  $hasButtons?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  message, 
  prevType, 
  prevHasLink, 
  buttonPosition = 'bottom', 
  isWaiting = false, 
  onClick 
}) => {
  const debugMode = useRecoilValue(debugModeState);

  const handleButtonClick = (buttonOnClick?: () => void) => {
    if (onClick) onClick();
    if (buttonOnClick) buttonOnClick();
  };

  return (
    <BubbleWrapper 
      $type={message.type}
      $prevType={prevType}
      $hasLink={!!message.link}
      data-debug={debugMode}
    >
      <BubbleContainer $type={message.type} data-debug={debugMode}>
        {message.showProfile && message.profileText && (
          <span className="profile-name">{message.profileText}</span>
        )}
        <MessageBubble 
          $type={message.type} 
          data-debug={debugMode} 
          $hasButtons={buttonPosition === 'bottom' && !!message.buttons}
        >
          {message.message}
          {isWaiting && (
            <UserWaitingIndicator>
              <img src="/assets/splash.png" alt="Waiting for response..." />
            </UserWaitingIndicator>
          )}
          {buttonPosition === 'bottom' && message.buttons && (
            <ButtonContainer data-debug={debugMode} $position="bottom">
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
        {buttonPosition === 'right' && message.buttons && (
          <ButtonContainer data-debug={debugMode} $position="right">
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
            $position={message.link.$position}
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