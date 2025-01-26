# 시스템 아키텍처 문서

## 1. 서비스 상태 흐름도
```mermaid
stateDiagram-v2
    [*] --> INITIAL
    
    %% Kindhabit(영양제 추천) 흐름
    state "영양제 추천 Flow" as KindhabitFlow {
        INITIAL --> BASIC_RECOMMEND: 기본 추천
        BASIC_RECOMMEND --> HEALTH_CHECK: 건강 정보 입력
        HEALTH_CHECK --> CUSTOM_RECOMMEND: 맞춤 추천
        CUSTOM_RECOMMEND --> CONFIRM: 추천 확정
    }

    %% XOG(검진 예약) 흐름
    state "검진 예약 Flow" as XOGFlow {
        INITIAL --> TARGET_SELECTION: 대상자 선택
        TARGET_SELECTION --> DATE_SELECTION: 날짜 선택
        DATE_SELECTION --> CONFIRM: 예약 확정
    }
```

## 2. 컴포넌트 구조도
```mermaid
classDiagram
    class ChatContainer {
        +messages: ChatMessage[]
        +showLoading: boolean
        +loadingStep: number
        +render()
    }
    
    class ChatBubble {
        +message: ChatMessage
        +onHeightChange(): void
        +render()
    }
    
    class Slider {
        +items: SliderItem[]
        +onAction(): void
        +render()
    }
    
    ChatContainer --> ChatBubble
    ChatContainer --> Slider
```

## 3. 테마 구조도
```mermaid
classDiagram
    class Theme {
        +colors: Colors
        +typography: Typography
        +spacing: Spacing
        +breakpoints: Breakpoints
    }
    
    class Colors {
        +textPrimary: string
        +background: string
        +primary: string
        +chat: ChatColors
    }
    
    class ChatColors {
        +background: string
        +bubble: BubbleColors
        +slider: SliderColors
    }
    
    Theme --> Colors
    Colors --> ChatColors
```

## 4. 비즈니스 로직 흐름도
```mermaid
flowchart TD
    A[시작] --> B{서비스 구분}
    
    %% Kindhabit Flow
    B -->|영양제 추천| C[기본 추천]
    C --> D[건강 정보 체크]
    D --> E[맞춤 추천]
    E --> F[추천 확정]
    
    %% XOG Flow
    B -->|검진 예약| G[대상자 선택]
    G --> H[날짜 선택]
    H --> I[예약 확정]
```

## 5. 메시지 처리 흐름도
```mermaid
sequenceDiagram
    participant U as User
    participant C as ChatContainer
    participant S as Service
    participant H as Hook
    
    U->>C: 메시지 입력/선택
    C->>H: useChat.addMessage()
    H->>S: handleMessage()
    S-->>H: 응답 메시지
    H-->>C: 상태 업데이트
    C-->>U: UI 업데이트
```

## 6. 서비스 구조 설명

### 6.1 공통 컴포넌트
- **ChatContainer**: 채팅 UI의 메인 컨테이너
- **ChatBubble**: 메시지 표시 컴포넌트
- **Slider**: 선택형 응답 UI 컴포넌트

### 6.2 서비스별 비즈니스 로직
#### Kindhabit (영양제 추천)
- `supplement.ts`: 영양제 추천 비즈니스 로직
- `supplement-main-chat.ts`: 채팅 인터페이스 로직

#### XOG (검진 예약)
- `book.ts`: 검진 예약 비즈니스 로직
- `book-main-chat.ts`: 채팅 인터페이스 로직

### 6.3 테마 시스템
- 서비스별 독립적인 테마 구성
- 공통 컴포넌트의 스타일 커스터마이징 지원
- 반응형 디자인을 위한 브레이크포인트 시스템 