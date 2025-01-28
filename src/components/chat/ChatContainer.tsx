import React, { useRef, useMemo, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/core/store/debug';
import { ChatWrapper, ContentSection, MessageSection, InputSection } from './ChatContainer.styles';
import { Splash } from '@/components/common/Splash';
import ChatBubble from './ChatBubble';
import { Message } from '@/types/chat';
import { CardList } from '@/components/common/Card/Card_index';
import { CardLayoutProps } from '@/components/common/Card/Card_types';

interface Props<T extends string = string> {
  $inputEnabled?: boolean;
  messages?: Message.ChatMessage[];
  showLoading?: boolean;
  loadingStep?: number;
  loadingMessages?: string[];
  waitingMessageId?: string;
  onSliderSelect?: (target: T) => void;
  sliderProps?: CardLayoutProps;
  'data-debug'?: boolean;
  sender?: never;
}

const ChatContainer = <T extends string = string>({ 
  $inputEnabled = true,
  messages = [],
  showLoading = false,
  loadingStep = 0,
  loadingMessages = [],
  waitingMessageId,
  onSliderSelect,
  sliderProps,
  'data-debug': debug
}: Props<T>) => {
  const isDebugMode = useRecoilValue(debugModeState);
  const lastBubbleRef = useRef<HTMLDivElement>(null);

  const handleLoadingComplete = useCallback(() => {
    // 외부에서 처리하도록 수정
  }, []);

  const renderChatBubble = useCallback((message: Message.ChatMessage, index: number, prevType?: Message.Type.Display, prevHasLink?: boolean) => {
    // 첫 번째 메시지면 무조건 isWaiting true
    const isMessageWaiting = index === 0;
    
    console.log('ChatBubble 렌더링 준비:', {
      messageId: message.id,
      isWaiting: isMessageWaiting,
      isFirstMessage: index === 0
    });
    
    return (
      <div key={message.id} ref={index === messages.length - 1 ? lastBubbleRef : undefined}>
        <ChatBubble
          message={message}
          prevType={prevType}
          prevHasLink={prevHasLink}
          isWaiting={isMessageWaiting}
        />
      </div>
    );
  }, [messages.length]);

  const renderSlider = useCallback((message: Message.ChatMessage) => {
    if (!message.content.card?.items) {
      throw new Error('Slider message must have card items property');
    }
    
    return (
      <CardList
        key={message.id}
        cards={message.content.card.items}
        layout={{
          layoutType: 'slider',
          gap: message.content.card.layout.spacing || '16px',
          showNavigator: message.content.card.layout.showNavigator,
          onCardSelect: () => onSliderSelect?.(message.id as T),
          cardMinWidth: message.content.card.layout.cardMinWidth,
          cardMaxWidth: message.content.card.layout.cardMaxWidth,
          cardPadding: message.content.card.layout.cardPadding,
          cardBorderRadius: message.content.card.layout.cardBorderRadius,
          ...sliderProps
        }}
      />
    );
  }, [onSliderSelect, sliderProps]);

  const renderCard = useCallback((message: Message.ChatMessage) => {
    if (!message.content.card?.items) {
      throw new Error('Card message must have card items property');
    }

    return (
      <CardList
        key={message.id}
        cards={message.content.card.items}
        layout={{
          layoutType: 'grid',
          gridColumns: message.content.card.layout.columns || 2,
          gap: message.content.card.layout.spacing || '16px',
          cardMinWidth: message.content.card.layout.cardMinWidth,
          cardMaxWidth: message.content.card.layout.cardMaxWidth,
          cardPadding: message.content.card.layout.cardPadding,
          cardBorderRadius: message.content.card.layout.cardBorderRadius
        }}
      />
    );
  }, []);

  const renderMessage = useCallback((message: Message.ChatMessage, index: number) => {
    const prevMessage = index > 0 ? messages[index - 1] : null;
    const prevType = prevMessage?.display;
    const prevHasLink = prevMessage?.content.actions?.link !== undefined;

    switch (message.display) {
      case 'slider':
        return renderSlider(message);
      case 'card':
        return renderCard(message);
      case 'text':
        return renderChatBubble(message, index, prevType, prevHasLink);
      default:
        return null;
    }
  }, [messages, renderChatBubble, renderSlider, renderCard]);

  const loadingOverlay = useMemo(() => {
    if (!showLoading) return null;
    
    return (
      <Splash
        variant="indicator"
        variantProps={{ 
          $placement: 'right',
          $offset: 8,
          $prevElement: lastBubbleRef.current 
        }}
        message={loadingMessages[loadingStep] || ''}
        isVisible={loadingStep !== loadingMessages.length}
        animation="pulse"
        onComplete={handleLoadingComplete}
      />
    );
  }, [showLoading, loadingStep, loadingMessages, handleLoadingComplete]);

  const messageList = useMemo(() => messages.map(renderMessage), [messages, renderMessage]);

  return (
    <ChatWrapper data-debug={!!isDebugMode}>
      <ContentSection>
        <MessageSection data-debug={!!isDebugMode} $padding={20}>
          {messageList}
          {loadingOverlay}
        </MessageSection>
        <InputSection data-debug={!!isDebugMode} $inputEnabled={$inputEnabled} />
      </ContentSection>
    </ChatWrapper>
  );
};

export default ChatContainer; 