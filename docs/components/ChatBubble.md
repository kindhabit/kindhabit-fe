# ChatBubble 컴포넌트

## Props
| 속성 | 타입 | 필수 | 기본값 | 설명 |
|------|------|------|--------|------|
| message | TextMessage | ✓ | - | 채팅 메시지 내용 |
| prevType | ChatType | - | undefined | 이전 메시지 타입 |
| buttonPosition | 'inside' \| 'outside' | - | 'inside' | 버튼 위치 |

## 스타일 변수
| 변수 | 값 | 설명 |
|------|-----|------|
| padding | 8px 12px | 버블 내부 여백 |
| borderRadius | 16px 16px 2px 16px | 버블 모서리 |
| fontSize | 14px | 텍스트 크기 |

## 예시 