# 착한습관 프론트엔드 기술 문서

<div align="center">
  <h3>AI 기반 대화형 서비스 플랫폼</h3>
  <p>건강 상담 및 예약 서비스를 위한 대화형 UI/UX 플랫폼</p>
</div>

## 📑 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [서비스 구성](#서비스-구성)
3. [기술 스택](#기술-스택)
4. [프로젝트 구조](#프로젝트-구조)
5. [테마 시스템](#테마-시스템)
6. [컴포넌트 구조](#컴포넌트-구조)
7. [시스템 아키텍처](ARCHITECTURE.md)
8. [채팅 흐름](chat-flow.md)
9. [API 인터페이스](api-interface.md)

## 프로젝트 개요
- AI 기반 대화형 인터페이스 플랫폼
- 사용자 맞춤형 건강 상담 및 예약 서비스
- 재사용 가능한 대화형 UI 컴포넌트 시스템

## 서비스 구성

### 1. 건강기능식품 상담 서비스 (supplement)
- 사용자 맞춤형 건강 상담
- 영양제 추천 시스템
- 건강 데이터 분석 및 시각화

### 2. 건강검진 예약 서비스 (booking)
- 대화형 예약 시스템
- 맞춤형 검진 프로그램 추천
- 예약 관리 및 알림

## 기술 스택
### Frontend Core
- React 18.3.1
- TypeScript 5.2.2
- Vite 4.5.5 (빌드 도구)

### 스타일링
- Styled-components 6.1.14
- Emotion 11.14.0
- Material-UI 5.16.14

### 상태 관리
- Recoil 0.7.7

### 유틸리티
- Axios (API 통신)
- Recharts (데이터 시각화)
- React Router DOM (라우팅)
- React Transition Group (애니메이션)

### 개발 도구
- ESLint
- TypeScript ESLint
- GitHub Actions (CI/CD)

## 프로젝트 구조

```
src/
├── assets/           # 정적 자원 (이미지, 폰트 등)
├── atoms/            # 아톰 단위 컴포넌트
├── components/       # 컴포넌트
│   ├── chat/        # 대화형 UI 컴포넌트
│   │   ├── ChatContainer.tsx
│   │   ├── ChatBubble/
│   │   └── Slider/
│   └── common/      # 공통 컴포넌트
├── constants/        # 상수 정의
├── pages/           # 페이지 컴포넌트
│   ├── supplement/  # 건기식 서비스
│   └── booking/     # 예약 서비스
├── services/        # 서비스 로직
├── store/           # 상태 관리
├── styles/          # 스타일 정의
├── theme/           # 테마 설정
├── types/           # 타입 정의
├── App.tsx          # 앱 진입점
├── Router.tsx       # 라우터 설정
└── main.tsx         # 메인 진입점
```

## 테마 시스템

### 색상 시스템
```typescript
colors: {
  // 기본 색상
  primary: '#6B4423',
  secondary: '#f5f5f5',
  background: '#f5e6d3',
  
  // 서비스별 색상
  chat: {
    background: '#fdfaf7',
    userBubble: '#6B4423',
    jerryBubble: '#ffffff',
    // ...
  },
  
  // 디버그 모드 색상
  debug: {
    chatWrapper: '#FF4444',
    bubbleWrapper: '#FF6B6B',
    // ...
  }
}
```

### 폰트 시스템
- 기본 폰트: Pretendard
- 크기 변형: normal, large
- 타이포그래피 스케일:
  - Title: 20px (normal) / 24px (large)
  - Subtitle: 16px (normal) / 20px (large)
  - Body: 14px (normal) / 18px (large)
  - Caption: 12px (normal) / 16px (large)

## 컴포넌트 구조

### 채팅 컴포넌트
1. ChatContainer
   - 채팅 UI의 메인 컨테이너
   - 메시지 상태 관리
   - 디버그 모드 지원

2. ChatBubble
   - 사용자/챗봇 메시지 표시
   - 스타일 변형: userBubble, jerryBubble
   - 애니메이션 효과

3. Slider
   - 선택형 응답 UI
   - 카드 기반 인터랙션
   - 반응형 레이아웃

### 공통 컴포넌트
- Button
- Dialog
- Header
- Layout
