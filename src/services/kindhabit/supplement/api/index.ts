import { HealthInfo, RecommendInfo, SupplementInfo } from '../types';
import { BASIC_SUPPLEMENTS, HEALTH_SUPPLEMENTS } from '../constants';
import { SupplementUtils } from '../utils/supplement';

// API 엔드포인트
export const SUPPLEMENT_API = {
  GET_BASIC_SUPPLEMENTS: '/api/kindhabit/supplement/basic',
  GET_HEALTH_SUPPLEMENTS: '/api/kindhabit/supplement/health',
  GET_CUSTOM_SUPPLEMENTS: '/api/kindhabit/supplement/custom',
  SAVE_RECOMMENDATION: '/api/kindhabit/supplement/save'
} as const;

// API 클라이언트
export class SupplementAPI {
  // 기본 영양제 목록 조회
  static async getBasicSupplements(): Promise<SupplementInfo[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return BASIC_SUPPLEMENTS;
  }

  // 건강 상태 기반 영양제 목록 조회
  static async getHealthSupplements(healthInfo: HealthInfo): Promise<SupplementInfo[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 건강 정보 기반으로 영양제 추천
    const recommendations = SupplementUtils.getRecommendedSupplements(healthInfo);
    
    // 우선순위에 따라 정렬
    return SupplementUtils.sortByPriority(recommendations, healthInfo);
  }

  // 맞춤 영양제 추천
  static async getCustomSupplements(healthInfo: HealthInfo): Promise<{
    supplements: SupplementInfo[];
    warnings: string[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 건강 정보 기반으로 영양제 추천
    const recommendations = SupplementUtils.getRecommendedSupplements(healthInfo);
    
    // 우선순위에 따라 정렬
    const sortedSupplements = SupplementUtils.sortByPriority(recommendations, healthInfo);
    
    // 상호작용 체크
    const warnings = SupplementUtils.checkInteractions(sortedSupplements);
    
    return {
      supplements: sortedSupplements,
      warnings
    };
  }

  // 추천 정보 저장
  static async saveRecommendation(supplements: string[]): Promise<{ success: boolean }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }
} 