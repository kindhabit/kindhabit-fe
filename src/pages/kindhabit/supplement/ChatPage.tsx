import React from 'react';
import ChatContainer from '../../../components/chat/ChatContainer';

interface ChatPageProps {
  messages: any[];
  showLoading: boolean;
  loadingStep: number;
  loadingMessages: string[];
  handleSliderSelect: (value: any) => void;
}

const ChatPage: React.FC<ChatPageProps> = ({
  messages,
  showLoading,
  loadingStep,
  loadingMessages,
  handleSliderSelect
}) => {
  return (
    <ChatContainer 
      messages={messages}
      showLoading={showLoading}
      loadingStep={loadingStep}
      loadingMessages={loadingMessages}
      onSliderSelect={handleSliderSelect}
      sliderProps={{
        layoutType: 'slider',
        gap: '12px',
        cardMinWidth: '240px',
        cardMaxWidth: '280px',
        cardPadding: '16px',
        cardBorderRadius: '12px',
        showTags: true,
        iconSize: '32px',
        titleSize: '16px',
        descriptionSize: '14px'
      }}
    />
  );
}

export default ChatPage; 