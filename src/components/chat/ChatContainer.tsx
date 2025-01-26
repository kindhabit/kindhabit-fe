import React, { useRef, useMemo, useCallback, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/core/store/debug';
import { useChat } from '@/hooks/useChat';
import { ChatWrapper, ContentSection, MessageSection, InputSection } from './ChatContainer.styles';
import { Splash } from '@/core/components/common/Splash';
import ChatBubble from './ChatBubble';
import Slider from '@/core/components/common/Slider';
import { TextMessage, SliderMessage, ChatMessage, ChatType } from '@/types/chat';

interface Props {
  $inputEnabled?: boolean;
}

const ChatContainer: React.FC<Props> = React.memo(({ $inputEnabled = true }) => {
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

  const handleLoadingComplete = useCallback(() => {
    setLoadingStep(0);
  }, [setLoadingStep]);

  const renderChatBubble = useCallback((message: TextMessage, index: number, prevType?: ChatType, prevHasLink?: boolean) => (
    <div key={message.id} ref={index === messages.length - 1 ? lastBubbleRef : undefined}>
      <ChatBubble
        message={message}
        prevType={prevType}
        prevHasLink={prevHasLink}
        isWaiting={message.id === waitingMessageId}
      />
    </div>
  ), [messages.length, waitingMessageId]);

  const renderSlider = useCallback((message: SliderMessage) => (
    <Slider
      key={message.id}
      items={message.sliderData}
      onComplete={() => {}}
    />
  ), []);

  const renderMessage = useCallback((message: ChatMessage, index: number) => {
    const prevMessage = index > 0 ? messages[index - 1] : null;
    const prevType = prevMessage?.type;
    const prevHasLink = prevMessage && 'link' in prevMessage ? !!prevMessage.link : false;

    switch (message.type) {
      case 'slider':
        return renderSlider(message as SliderMessage);
      case 'jerry':
      case 'user':
        return renderChatBubble(message as TextMessage, index, prevType, prevHasLink);
      default:
        return null;
    }
  }, [messages, renderChatBubble, renderSlider]);

  const loadingOverlay = useMemo(() => {
    if (!showLoading) return null;
    
    return (
      <Splash
        variant="flowItem"
        variantProps={{ 
          $prevElement: lastBubbleRef.current 
        }}
        message={loadingMessages[loadingStep] || ''}
        isVisible={loadingStep !== loadingMessages.length}
        animation="fade"
        onComplete={handleLoadingComplete}
      />
    );
  }, [showLoading, loadingStep, loadingMessages, handleLoadingComplete]);

  const messageList = useMemo(() => messages.map(renderMessage), [messages, renderMessage]);

  return (
    <ChatWrapper data-debug={!!isDebugMode}>
      <ContentSection>
        <MessageSection data-debug={!!isDebugMode}>
          {messageList}
          {loadingOverlay}
        </MessageSection>
        <InputSection data-debug={!!isDebugMode} $inputEnabled={$inputEnabled} />
      </ContentSection>
    </ChatWrapper>
  );
}, (prevProps, nextProps) => prevProps.$inputEnabled === nextProps.$inputEnabled);

export default ChatContainer; 