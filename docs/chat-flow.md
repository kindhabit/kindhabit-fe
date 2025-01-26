# 채팅 흐름 문서

## 1. 라우팅 구조

```typescript
// src/pages/supplement/routes.tsx
export const Routes = () => {
  return (
    <Layout>
      <RouterRoutes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chat/loading" element={<LoadingPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </RouterRoutes>
    </Layout>
  );
};
```

### 라우팅 흐름
1. `/supplement` -> 메인 페이지
2. `/supplement/chat/loading` -> 로딩 페이지 (3초 후 자동 이동)
3. `/supplement/chat` -> 채팅 페이지

## 2. 데이터 흐름

### 2.1 상태 관리
```typescript
// 채팅 상태 정의
export const ChatState = {
  INITIAL: 'initial',   // 초기 상태
  LOADING: 'loading',   // 로딩 중
  READY: 'ready',      // 메시지 표시 준비 완료
  WAITING: 'waiting'   // 사용자 응답 대기
} as const;
```

### 2.2 메시지 구조
```typescript
interface Message {
  id: string;        // 메시지 고유 ID
  type: string;      // 'jerry' | 'user' | 'slider'
  timestamp: number; // 메시지 생성 시간
  message?: string;  // 텍스트 메시지 내용
  showProfile?: boolean;  // 프로필 표시 여부
  profileText?: string;   // 프로필 텍스트
}

interface SliderMessage extends Message {
  type: 'slider';
  sliderData: Array<{
    id: string;
    title: string;
    description: string;
    icon: { emoji: string };
    tags: string[];
  }>;
}
```

## 3. 비즈니스 로직 흐름

### 3.1 초기화 시퀀스
1. 로딩 페이지 표시
```typescript
// src/pages/chat/LoadingPage.tsx
const LoadingPage: React.FC = () => {
  useEffect(() => {
    const textTimer = setTimeout(() => {
      setLoadingText('건강 데이터를 확인하고 있습니다...');
    }, 1500);

    const navigationTimer = setTimeout(() => {
      navigate('/supplement/chat');
    }, 3000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(navigationTimer);
    };
  }, []);
};
```

2. 채팅 컴포넌트 초기화
```typescript
// useChat 훅 내부
useEffect(() => {
  if (chatState === ChatState.INITIAL) {
    const initialMessages = createInitialMessages(Date.now());
    setMessages([initialMessages[0]]);
    setChatState(ChatState.LOADING);
  }
}, [chatState]);
```

### 3.2 메시지 표시 시퀀스
1. 첫 메시지 표시
2. 로딩 메시지 순차 표시
```typescript
const loadingMessages = [
  '유효 성분을 고민 중이에요...',
  '성분을 매칭 중입니다...',
  '곧 화면에 분석결과가 표출됩니다...'
];
```
3. 슬라이더 및 추가 메시지 표시

### 3.3 사용자 상호작용
1. 버튼 클릭 처리
```typescript
const handleButtonClick = async (messageId: string, onClick?: () => void) => {
  if (onClick) onClick();
  
  try {
    const response = await handleUserSelection(messageId, "선택된 값");
    // 응답 메시지 표시
    response.nextMessages.forEach((msg, index) => {
      setTimeout(() => {
        setMessages(prev => [...prev, createMessage(msg)]);
      }, index * 1000);
    });
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## 4. API 인터페이스

### 4.1 사용자 선택 전송 API
```typescript
interface UserSelectionRequest {
  messageId: string;    // 메시지 고유 ID
  selection: string;    // 사용자가 선택한 값
}

interface UserSelectionResponse {
  success: boolean;     // 처리 성공 여부
  nextMessages: Array<{
    type: 'text' | 'slider';  // 메시지 타입
    content: string | {       // 메시지 내용
      id: string;
      title: string;
      description: string;
      icon: { emoji: string };
      tags: string[];
    }[];
    options?: {
      showProfile?: boolean;  // 프로필 표시 여부
      buttons?: Array<{      // 버튼 옵션
        text: string;
        value: string;
        variant?: 'primary' | 'secondary';
      }>;
    };
  }>;
}
```

### 4.2 API 엔드포인트
- POST `/api/chat/selection`
- Content-Type: `application/json`

## 5. 디버그 모드

디버그 모드에서는 다음과 같은 로그가 콘솔에 출력됩니다:
```
[ChatContainer] ChatContainer Mounted {isDebugMode: true}
[ChatContainer] State Changed {messagesCount: 0, waitingMessageId: null, showLoading: true, loadingStep: 0, initialized: false}
[ChatContainer] Initializing ChatContainer
[ChatContainer] Created Initial Messages
[ChatContainer] First Message Set
[ChatContainer] Starting Loading Sequence
[ChatContainer] Loading Step 0
...
```

## 6. 에러 처리

각 레이어별 에러 처리:
1. API 레이어: 네트워크 에러, 응답 형식 에러
2. 비즈니스 로직 레이어: 메시지 처리 에러, 상태 관리 에러
3. UI 레이어: 렌더링 에러, 사용자 입력 처리 에러 