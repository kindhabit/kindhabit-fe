// 영양제 추천 대상 타입
export type SupplementTarget = 'basic' | 'health' | 'custom';

// 영양제 추천 상태 관리
export const SupplementState = {
  INITIAL: 'initial',           // 초기 상태
  BASIC_RECOMMEND: 'basic_recommend', // 기본 추천
  HEALTH_CHECK: 'health_check',    // 건강 상태 체크
  CUSTOM_RECOMMEND: 'custom_recommend', // 맞춤 추천
  CONFIRM: 'confirm'              // 추천 확정
} as const;

export type SupplementStateType = typeof SupplementState[keyof typeof SupplementState];

// 건강 정보 인터페이스
export interface HealthInfo {
  takingMedicine?: boolean;
  hasAllergy?: boolean;
  healthConcerns?: string[];
}

// 추천 정보 인터페이스
export interface RecommendInfo {
  target?: SupplementTarget;
  healthInfo?: HealthInfo;
  selectedSupplements?: string[];
}

// 영양제 추천 서비스
export const supplementService = {
  // 기본 추천 처리
  handleBasicRecommend: (): RecommendInfo => {
    return {
      target: 'basic'
    };
  },

  // 건강 정보 처리
  handleHealthCheck: (healthInfo: HealthInfo): RecommendInfo => {
    return {
      target: 'health',
      healthInfo
    };
  },

  // 현재 상태에서 다음 상태 반환
  getNextState: (currentState: SupplementStateType): SupplementStateType => {
    switch (currentState) {
      case SupplementState.INITIAL:
        return SupplementState.BASIC_RECOMMEND;
      case SupplementState.BASIC_RECOMMEND:
        return SupplementState.HEALTH_CHECK;
      case SupplementState.HEALTH_CHECK:
        return SupplementState.CUSTOM_RECOMMEND;
      case SupplementState.CUSTOM_RECOMMEND:
        return SupplementState.CONFIRM;
      default:
        return SupplementState.INITIAL;
    }
  },

  // 추천 정보 검증
  validateRecommendInfo: (info: RecommendInfo): boolean => {
    return !!info.target;
  }
}; 