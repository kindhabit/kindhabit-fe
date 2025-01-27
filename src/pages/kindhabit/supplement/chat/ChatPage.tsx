import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/core/store/debug';
import ChatContainer from '@/components/chat/ChatContainer';
import { useSupplementChat } from '@/hooks/kindhabit/supplement/useSupplementChat';
import { LOADING_MESSAGES } from '@/services/kindhabit/supplement/constants';

const ChatPage: React.FC = () => {
  const debugMode = useRecoilValue(debugModeState);
  const { 
    messages, 
    chatState, 
    showLoading, 
    loadingStep, 
    waitingMessageId 
  } = useSupplementChat();

  useEffect(() => {
    if (debugMode) {
      console.log('ChatPage Mounted, Debug Mode:', debugMode);
    }
    return () => {
      if (debugMode) {
        console.log('ChatPage Unmounted');
      }
    };
  }, [debugMode]);

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <ChatContainer 
        data-debug={debugMode}
        $inputEnabled={true}
        messages={messages}
        showLoading={showLoading}
        loadingStep={loadingStep}
        loadingMessages={LOADING_MESSAGES}
        waitingMessageId={waitingMessageId}
        sliderProps={{
          cardMinWidth: '180px',
          cardMaxWidth: '180px',
          cardPadding: '16px',
          showTags: true,
          iconSize: '28px',
          titleSize: '14px',
          descriptionSize: '12px'
        }}
      />
    </div>
  );
};

// 불필요한 리렌더링 방지
export default React.memo(ChatPage); 