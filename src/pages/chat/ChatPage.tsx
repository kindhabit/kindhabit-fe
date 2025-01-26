import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/store/debug';
import ChatContainer from '@/components/chat/ChatContainer';

const ChatPage: React.FC = () => {
  const debugMode = useRecoilValue(debugModeState);
  
  useEffect(() => {
    console.log('ChatPage Mounted, Debug Mode:', debugMode);
    return () => {
      console.log('ChatPage Unmounted');
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
      <ChatContainer data-debug={true} $inputEnabled={true} />
    </div>
  ), []); // 의존성 배열이 비어있으므로 한 번만 생성됨
};

export default React.memo(ChatPage); // 불필요한 리렌더링 방지 