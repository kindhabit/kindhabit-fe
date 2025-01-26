import React, { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/store/debug';
import { useChat } from '@/hooks/useChat';
import { ChatWrapper, ContentSection, MessageSection, InputSection } from './ChatContainer.styles';
import { Splash } from '@/components/common/Splash';
import ChatBubble from './ChatBubble';
import Slider from './Slider';
import { TextMessage, SliderMessage } from '@/types/chat';

interface Props {
  $inputEnabled?: boolean;
}

const ChatContainer: React.FC<Props> = ({ $inputEnabled = true }) => {
  const isDebugMode = useRecoilValue(debugModeState);
  const lastBubbleRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    waitingMessageId,
    showLoading,
    loadingStep,
    loadingMessages,
    setShowLoading,
    setLoadingStep
  } = useChat({ isDebugMode });

  return (
    <ChatWrapper data-debug={isDebugMode}>
      <ContentSection>
        <MessageSection data-debug={isDebugMode}>
          {messages.map((message, index) => {
            const prevMessage = index > 0 ? messages[index - 1] : null;
            const prevType = prevMessage?.type;
            const prevHasLink = prevMessage && 'link' in prevMessage ? !!prevMessage.link : false;

            if (message.type === 'slider') {
              return (
                <Slider
                  key={message.id}
                  items={(message as SliderMessage).sliderData}
                  onComplete={() => {}}
                />
              );
            }

            if (message.type === 'jerry' || message.type === 'user') {
              return (
                <div key={message.id} ref={index === messages.length - 1 ? lastBubbleRef : undefined}>
                  <ChatBubble
                    message={message}
                    prevType={prevType}
                    prevHasLink={prevHasLink}
                    isWaiting={message.id === waitingMessageId}
                  />
                </div>
              );
            }

            return null;
          })}
          {showLoading && (
            <Splash
              variant="flowItem"
              variantProps={{ 
                prevElement: lastBubbleRef.current 
              }}
              message={loadingMessages[loadingStep] || ''}
              isVisible={loadingStep !== loadingMessages.length}
              animation="fade"
              onComplete={() => {
                setLoadingStep(0);
              }}
            />
          )}
        </MessageSection>
        <InputSection data-debug={isDebugMode} $inputEnabled={$inputEnabled} />
      </ContentSection>
    </ChatWrapper>
  );
};

export default ChatContainer; 