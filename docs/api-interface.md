# API 인터페이스 문서

## 채팅 API

### 1. 사용자 선택 전송

#### 요청
- **엔드포인트**: `POST /api/chat/selection`
- **Content-Type**: `application/json`

```typescript
interface UserSelectionRequest {
  messageId: string;    // 메시지 고유 ID
  selection: string;    // 사용자가 선택한 값 (예: "네", "아니오")
}
```

#### 응답
```typescript
interface UserSelectionResponse {
  success: boolean;
  nextMessages: Array<ChatMessage>;
}

interface ChatMessage {
  type: 'text' | 'slider';
  content: string | SliderContent[];
  options?: {
    showProfile?: boolean;
    buttons?: Button[];
  };
}

interface SliderContent {
  id: string;
  title: string;
  description: string;
  icon: { emoji: string };
  tags: string[];
}

interface Button {
  text: string;
  value: string;
  variant?: 'primary' | 'secondary';
}
```

#### 예시

요청:
```json
{
  "messageId": "msg3_1234567890_abc123",
  "selection": "네"
}
```

응답:
```json
{
  "success": true,
  "nextMessages": [
    {
      "type": "text",
      "content": "혈압약을 복용하시는군요. 마그네슘과 관련하여 주의가 필요합니다.",
      "options": {
        "showProfile": true
      }
    },
    {
      "type": "slider",
      "content": [
        {
          "id": "1",
          "title": "마그네슘",
          "description": "혈압약과 함께 복용시 주의가 필요합니다.",
          "icon": { "emoji": "⚠️" },
          "tags": ["주의", "복용시간"]
        }
      ]
    }
  ]
}
```

### 2. 에러 응답

#### 형식
```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}
```

#### 에러 코드
- `INVALID_MESSAGE_ID`: 잘못된 메시지 ID
- `INVALID_SELECTION`: 잘못된 선택값
- `SERVER_ERROR`: 서버 내부 오류

#### 예시
```json
{
  "success": false,
  "error": {
    "code": "INVALID_MESSAGE_ID",
    "message": "존재하지 않는 메시지 ID입니다.",
    "details": {
      "messageId": "msg3_1234567890_abc123"
    }
  }
}
```

## 클라이언트 구현 예시

```typescript
// src/services/api/chat.ts
export const chatApi = {
  async sendUserSelection(messageId: string, selection: string): Promise<UserSelectionResponse> {
    try {
      const response = await fetch('/api/chat/selection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageId, selection }),
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error.message);
      }

      return data;
    } catch (error) {
      console.error('Chat API Error:', error);
      throw error;
    }
  }
};

// 사용 예시
const handleUserSelection = async (messageId: string, selection: string) => {
  try {
    const response = await chatApi.sendUserSelection(messageId, selection);
    // 응답 처리
    response.nextMessages.forEach(message => {
      // 메시지 표시 로직
    });
  } catch (error) {
    // 에러 처리
    console.error('Failed to process user selection:', error);
  }
};
``` 