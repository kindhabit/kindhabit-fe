import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/core/store/debug';
import ChatContainer from '@/components/chat/ChatContainer';
import { useChat } from '@/hooks/useChat';

const ChatPage: React.FC = () => {
  const debugMode = useRecoilValue(debugModeState);
  const {
    messages,
    waitingMessageId,
    showLoading,
    loadingStep,
    loadingMessages,
    setMessages,
    setWaitingMessageId,
    setShowLoading,
    setLoadingStep,
  } = useChat({ isDebugMode: debugMode });
  
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
  
  // 렌더링 최적화를 위해 메모이제이션 추가
  return React.useMemo(() => (
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
        loadingMessages={loadingMessages}
        waitingMessageId={waitingMessageId || undefined}
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
  ), [debugMode, messages, showLoading, loadingStep, loadingMessages, waitingMessageId]); // debugMode가 변경될 때마다 리렌더링
};

export default React.memo(ChatPage); // 불필요한 리렌더링 방지 