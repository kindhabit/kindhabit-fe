import React, { useRef, useMemo, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/core/store/debug';
import { ChatWrapper, ContentSection, MessageSection, InputSection } from './ChatContainer.styles';
import { Splash } from '@/core/components/common/Splash';
import ChatBubble from './ChatBubble';
import Slider from '@/core/components/common/Slider/Slider_index';
import { SliderStyleProps } from '@/core/components/common/Slider/Slider_types';
import { TextMessage, SliderMessage, ChatMessage, ChatType, CardMessage } from '@/types/chat';
import { CardList } from '@/core/components/common/Card/Card_index';

interface Props {
  $inputEnabled?: boolean;
  messages?: ChatMessage[];
  showLoading?: boolean;
  loadingStep?: number;
  loadingMessages?: string[];
  waitingMessageId?: string;
  onSliderSelect?: (target: string) => void;
  sliderProps?: SliderStyleProps;
}

const ChatContainer: React.FC<Props> = React.memo(({ 
  $inputEnabled = true,
  messages = [],
  showLoading = false,
  loadingStep = 0,
  loadingMessages = [],
  waitingMessageId,
  onSliderSelect,
  sliderProps
}) => {
  const isDebugMode = useRecoilValue(debugModeState);
  const lastBubbleRef = useRef<HTMLDivElement>(null);

  const handleLoadingComplete = useCallback(() => {
    // 외부에서 처리하도록 수정
  }, []);

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

  const renderSlider = useCallback((message: SliderMessage) => {
    if (!message.cards) {
      throw new Error('Slider message must have cards property');
    }
    
    return (
      <Slider
        key={message.id}
        items={message.cards}
        onComplete={() => onSliderSelect && onSliderSelect(message.id)}
        {...sliderProps}
      />
    );
  }, [onSliderSelect, sliderProps]);

  const renderCard = useCallback((message: CardMessage) => {
    return (
      <CardList
        key={message.id}
        cards={message.cards}
        layout={{
          layoutType: message.layoutType || 'grid',
          gridColumns: message.gridColumns || 2,
          gap: message.gap || '16px'
        }}
      />
    );
  }, []);

  const renderMessage = useCallback((message: ChatMessage, index: number) => {
    const prevMessage = index > 0 ? messages[index - 1] : null;
    const prevType = prevMessage?.type;
    const prevHasLink = prevMessage && 'link' in prevMessage ? !!prevMessage.link : false;

    switch (message.type) {
      case 'slider':
        return renderSlider(message as SliderMessage);
      case 'card':
        return renderCard(message as CardMessage);
      case 'jerry':
      case 'user':
        return renderChatBubble(message as TextMessage, index, prevType, prevHasLink);
      default:
        return null;
    }
  }, [messages, renderChatBubble, renderSlider, renderCard]);

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
});

export default ChatContainer; 