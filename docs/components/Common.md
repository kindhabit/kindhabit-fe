# 공통 컴포넌트

## SplashScreen

### Props
| 속성 | 타입 | 필수 | 기본값 | 설명 |
|------|------|------|--------|------|
| onComplete | () => void | - | - | 로딩 완료 콜백 |
| loadingText | string | - | '로딩중...' | 로딩 텍스트 |
| progress | number | - | - | 진행률 (0-100) |

### 스타일 변수
| 변수 | 값 | 설명 |
|------|-----|------|
| width | 50px | 로딩 이미지 크기 |
| opacity | 0.8 | 투명도 |
| animation | float 2s | 부드러운 움직임 |

### 예시 