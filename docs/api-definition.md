# 건강검진 예약 API 정의서

## 1. 사용자 정보 조회 API

### Request
- **URL**: `/api/xog/booking/users`
- **Method**: `GET`
- **Parameters**: 
  ```typescript
  {
    year: string;      // 검진년도
    employeeId: string // 사번
  }
  ```

### Response
```typescript
{
  status: 'success' | 'error';
  code: string;
  message: string;
  data: {
    users: Array<{
      id: string;
      name: string;
      birthDate: string;      // 'YYMMDD' 형식
      department: string;     // 부서
      section: string;        // 섹션
      checkupYear: string;    // 검진년도
      employeeId: string;     // 사번
      gender: 'M' | 'F';
      availableCheckups: string[]; // ['일반+특수검진', '종합검진', '가족검진']
      relation: 'self' | 'family'; // 본인/가족 구분
    }>;
    total: number;
  }
}
```

### 더미 데이터 예시
```json
{
  "status": "success",
  "code": "200",
  "message": "사용자 정보 조회 성공",
  "data": {
    "users": [
      {
        "id": "1",
        "name": "김엠텍",
        "birthDate": "840413",
        "department": "개발팀",
        "section": "프론트엔드",
        "checkupYear": "2024",
        "employeeId": "123456",
        "gender": "M",
        "availableCheckups": ["일반+특수검진","종합검진","가족검진"],
        "relation": "self"
      },
      {
        "id": "2",
        "name": "박영희",
        "birthDate": "850413",
        "department": "",
        "section": "",
        "checkupYear": "2024",
        "employeeId": "123456",
        "gender": "F",
        "availableCheckups": ["일반+특수검진"],
        "relation": "family"
      }
    ],
    "total": 2
  }
}
```

## 2. 병원 목록 조회 API

### Request
- **URL**: `/api/xog/booking/hospitals`
- **Method**: `GET`
- **Parameters**:
  ```typescript
  {
    checkupType?: string; // 검진 종류 (선택적)
  }
  ```

### Response
```typescript
{
  status: 'success' | 'error';
  code: string;
  message: string;
  data: {
    hospitals: Array<{
      id: string;
      name: string;
      address: string;
      availableCheckups: string[];
      contact: {
        manager: string;
        phone: string;
      };
      emr?: string;
    }>;
    total: number;
  }
}
```

### 더미 데이터 예시
```json
{
  "status": "success",
  "code": "200",
  "message": "병원 목록 조회 성공",
  "data": {
    "hospitals": [
      {
        "id": "PH01",
        "name": "세명기독병원",
        "address": "포항",
        "availableCheckups": ["일반", "일반+특수", "종합"],
        "contact": {
          "manager": "금인규 실장",
          "phone": "054-289-1438"
        }
      },
      {
        "id": "PH02",
        "name": "성모병원",
        "address": "포항",
        "availableCheckups": ["일반", "일반+특수", "종합"],
        "contact": {
          "manager": "이상규 팀장",
          "phone": "054-260-8189"
        },
        "emr": "자체 EMR"
      }
    ],
    "total": 2
  }
}
```

## 3. 예약 가능 날짜 조회 API

### Request
- **URL**: `/api/xog/booking/available-dates`
- **Method**: `GET`
- **Parameters**:
  ```typescript
  {
    checkupType: string;   // 검진 종류
  }
  ```

### Response
```typescript
{
  status: 'success' | 'error';
  code: string;
  message: string;
  data: {
    dates: Array<{
      date: string;              // 'YYYY-MM-DD' 형식
      hospitalId: string;
      hospitalName: string;
      availableHospitals: number;// 해당 날짜에 예약 가능한 병원 수
    }>;
    total: number;
  }
}
```

### 더미 데이터 예시
```json
{
  "status": "success",
  "code": "200",
  "message": "예약 가능 날짜 조회 성공",
  "data": {
    "dates": [
      {
        "date": "2024-02-01",
        "hospitalId": "PH01",
        "hospitalName": "세명기독병원",
        "availableHospitals": 3
      }
    ],
    "total": 1
  }
}
```

## 에러 응답 형식

모든 API는 에러 발생시 다음과 같은 형식으로 응답합니다:

```typescript
{
  status: 'error';
  code: string;
  message: string;
  data: null;
}
```

### 에러 코드 정의
- `400`: 잘못된 요청
- `401`: 인증 실패
- `403`: 권한 없음
- `404`: 리소스 없음
- `500`: 서버 내부 오류
``` 