import React from 'react';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/core/store/debug';
import { Message } from '@/types/chat';
import {
  BubbleWrapper,
  BubbleContainer,
  MessageBubble,
  ButtonContainer,
  BubbleButton,
  LinkText,
  ProfileName,
} from './styles';
import { Splash } from '@/components/common/Splash';

interface ChatBubbleProps {
  message: Message.ChatMessage;
  prevType?: Message.Type.Display;
  prevSender?: Message.Type.Sender;
  prevHasLink?: boolean;
  buttonPosition?: 'bottom' | 'right';
  isWaiting?: boolean;
  onClick?: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message, 
  prevType,
  prevSender,
  prevHasLink, 
  buttonPosition = 'bottom', 
  isWaiting = false, 
  onClick 
}) => {
  const debugMode = useRecoilValue(debugModeState);
  const [showSplash, setShowSplash] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  console.log('ChatBubble 렌더링:', {
    messageId: message.id,
    sender: message.sender,
    isWaiting,
    messageState: message.state,
    text: message.content.text?.value
  });

  const handleButtonClick = (buttonOnClick?: () => void) => {
    if (onClick) onClick();
    if (buttonOnClick) buttonOnClick();
  };

  const shouldShowProfile = message.content.text?.profile?.show && 
    message.content.text?.profile?.text && 
    (prevSender !== 'system' || !prevSender);

  React.useEffect(() => {
    // message.state?.isWaiting이 false면 무조건 스플래시를 숨김
    if (message.state?.isWaiting === false) {
      console.log('대기 상태 해제됨:', {
        messageId: message.id,
        messageState: message.state
      });
      
      // 2.5초 후에 완전히 제거
      setTimeout(() => {
        setShowSplash(false);
      }, 2500);
      
      return;
    }

    // 그 외의 경우 isWaiting prop에 따라 결정
    if (isWaiting) {
      console.log('대기 상태 시작:', {
        messageId: message.id,
        isWaiting
      });
      // 0.8초 후에 스플래시 표시
      setTimeout(() => {
        setShowSplash(true);
      }, 800);
    }
  }, [isWaiting, message.state?.isWaiting, message.id]);

  return (
    <BubbleWrapper 
      $type={message.display}
      $sender={message.sender}
      $prevType={prevType}
      $hasLink={!!message.content.actions?.link}
      data-debug={debugMode}
    >
      {shouldShowProfile && message.content.text?.profile?.text && (
        <ProfileName data-debug={debugMode}>
          {message.content.text.profile.text}
        </ProfileName>
      )}
      <BubbleContainer 
        $type={message.display} 
        $sender={message.sender}
        $verticalAlign="bottom"
        data-debug={debugMode}
      >
        <MessageBubble 
          $type={message.display} 
          $sender={message.sender}
          data-debug={debugMode} 
          $hasButtons={buttonPosition === 'bottom' && !!message.content.actions?.buttons}
        >
          {message.content.text && (
            <div className="message-text">
              {message.content.text.value}
              {showSplash && (
                <Splash
                  variant="indicator"
                  variantProps={{ 
                    $placement: message.sender === 'system' ? 'right' : 'left',
                    $offset: 4,
                    $verticalAlign: 'center'
                  }}
                  isVisible={true}
                  animation="pulse"
                />
              )}
            </div>
          )}
          {buttonPosition === 'bottom' && message.content.actions?.buttons && (
            <ButtonContainer data-debug={debugMode} $position="bottom">
              {message.content.actions.buttons.map((button: Message.Button, index: number) => (
                <BubbleButton
                  key={`${message.id}_btn_${index}`}
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
        {buttonPosition === 'right' && message.content.actions?.buttons && (
          <ButtonContainer data-debug={debugMode} $position="right">
            {message.content.actions.buttons.map((button: Message.Button, index: number) => (
              <BubbleButton
                key={`${message.id}_btn_${index}`}
                onClick={() => handleButtonClick(button.onClick)}
                $variant={button.variant || 'secondary'}
                data-debug={debugMode}
              >
                {button.text}
              </BubbleButton>
            ))}
          </ButtonContainer>
        )}
        {message.content.actions?.link && (
          <LinkText
            onClick={message.content.actions.link.onClick}
            data-debug={debugMode}
          >
            {message.content.actions.link.text}
          </LinkText>
        )}
      </BubbleContainer>
    </BubbleWrapper>
  );
};

export default ChatBubble; 