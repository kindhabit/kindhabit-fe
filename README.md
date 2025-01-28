# KindHabit Frontend

건강검진 예약 및 영양제 추천 서비스의 프론트엔드 프로젝트입니다.

## 주요 기능

### 1. 건강검진 예약 (XOG)

#### API 엔드포인트
- `GET /api/xog/booking/available-dates`: 예약 가능 날짜 조회
- `POST /api/xog/booking`: 예약 생성
- `GET /api/xog/booking/:id`: 예약 조회

#### 데이터 타입
```typescript
// 예약 대상 타입
type BookingTarget = 'self' | 'family' | 'other';

// 예약 프로그램 타입
type BookingProgram = 'normal' | 'premium' | 'special';

// 예약 상태
type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

// 예약 정보
interface BookingInfo {
  target?: BookingTarget;
  program?: BookingProgram;
  date?: string;
  time?: string;
  name?: string;
  phone?: string;
  checkupType?: string;
  hospitalId?: string;
  hospital?: {
    id: string;
    name: string;
    address: string;
  };
}
```

### 2. 영양제 추천 (KindHabit)

#### API 엔드포인트
- `GET /api/kindhabit/supplement/basic`: 기본 영양제 목록
- `GET /api/kindhabit/supplement/health`: 건강 상태 기반 영양제
- `GET /api/kindhabit/supplement/custom`: 맞춤 영양제 추천
- `POST /api/kindhabit/supplement/save`: 추천 정보 저장

## 컴포넌트 구조

### 공통 컴포넌트
- Calendar: 날짜 선택 캘린더
- Card: 다용도 카드 컴포넌트
- CheckupDateSelector: 검진일 선택기

## 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 린트 검사
npm run lint

# 빌드
npm run build
```

## 가상 데이터

현재 개발 단계에서는 다음과 같은 가상 데이터를 사용합니다:

### 병원 목록
- 세명기독병원 (포항)
- 성모병원 (포항)
- 대구KMI의학연구소 (포항)
- 서울KMI의학연구소 (서울,강릉)
- 순천병원 (광양)
- 광양사랑병원 (광양)
- 순천제일병원 (광양)
- 광양서울병원 (광양)
- 순천드림내과 (광양)
- 순천 성가롤로 (광양)
- 광주KMI의학연구소 (광양)

### 검진 프로그램
- 일반 검진
- 일반+특수 검진
- 종합 검진
- 가족 검진

## 상태 관리

예약 상태는 다음과 같은 단계로 관리됩니다:

1. INITIAL: 초기 상태
2. SELECT_TARGET: 대상자 선택
3. SELECT_PROGRAM: 프로그램 선택
4. SELECT_DATE: 날짜 선택
5. SELECT_TIME: 시간 선택
6. CONFIRM: 확인
7. COMPLETE: 완료

## 주요 클래스 및 함수

### ChatBookingState 클래스

채팅 기반 예약 상태를 관리하는 클래스입니다.

#### 상태 관리 함수
```typescript
// 상태 구독
subscribe(listener: (state: State) => void): () => void

// 상태 조회
getState(): {
  messages: ChatMessage[];
  showLoading: boolean;
  loadingStep: number;
  chatState: ChatStateType;
  bookingState: BookingStateType;
  bookingInfo: Partial<BookingInfo>;
  waitingMessageId?: string;
}
```

#### 메시지 관리 함수
```typescript
// 메시지 생성
private createMessage(
  message: string, 
  type: 'system' | 'loading' = 'system', 
  isWaiting: boolean = false
): TextMessage

// 메시지 전송 및 API 호출
private async sendMessageAndWait<T>(
  message: string, 
  apiCall: () => Promise<T>
): Promise<T>
```

#### 카드 생성 함수
```typescript
// 프로그램 선택 카드 생성
private createProgramCard(userInfo: UserInfo): CardProps

// 사용자 선택 카드 생성
private createUserCards(users: UserInfo[]): CardMessage

// 병원 선택 카드 생성
private async createHospitalCards(): Promise<CardMessage>

// 검진일 선택 카드 생성
private createCheckupDateCard(checkupType: string): CardMessage
```

#### 선택 처리 함수
```typescript
// 대상자 선택 처리
async handleTargetSelection(target: BookingTarget): Promise<void>

// 검진 종류 선택 처리
private async handleCheckupSelection(checkup: string): Promise<void>

// 병원 선택 처리
private handleHospitalSelection(hospital: Hospital): void

// 프로그램 선택 처리
handleProgramSelection(program: BookingProgram): void

// 날짜 선택 처리
private async handleDateSelection(): Promise<void>
```

#### 초기화 및 예약 관리
```typescript
// 예약 초기화
async initialize(): Promise<void>
```

## 라이선스

이 프로젝트는 비공개 소프트웨어입니다.
