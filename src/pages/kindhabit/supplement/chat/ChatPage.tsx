import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/core/store/debug';
import ChatContainer from '@/components/chat/ChatContainer';

const ChatPage: React.FC = () => {
  const debugMode = useRecoilValue(debugModeState);
  
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
      <ChatContainer data-debug={debugMode} $inputEnabled={true} />
    </div>
  ), [debugMode]); // debugMode가 변경될 때마다 리렌더링
};

export default React.memo(ChatPage); // 불필요한 리렌더링 방지 