import { SupplementInfo, HealthInfo } from '../types';
import { BASIC_SUPPLEMENTS, HEALTH_SUPPLEMENTS } from '../constants';

export class SupplementUtils {
  // 태그로 영양제 필터링
  static filterByTags(supplements: SupplementInfo[], tags: string[]): SupplementInfo[] {
    return supplements.filter(supplement => 
      tags.some(tag => supplement.tags.includes(tag))
    );
  }

  // 건강 정보 기반 영양제 추천
  static getRecommendedSupplements(healthInfo: HealthInfo): SupplementInfo[] {
    const recommendations: SupplementInfo[] = [];
    
    // 혈압약 복용자
    if (healthInfo.takingMedicine) {
      recommendations.push(...HEALTH_SUPPLEMENTS);
    }

    // 알레르기가 있는 경우
    if (healthInfo.hasAllergy) {
      const immunitySupplements = this.filterByTags(BASIC_SUPPLEMENTS, ['면역력']);
      recommendations.push(...immunitySupplements);
    }

    // 건강 고민사항 기반 추천
    if (healthInfo.healthConcerns) {
      const concernBasedSupplements = this.filterByTags(BASIC_SUPPLEMENTS, healthInfo.healthConcerns);
      recommendations.push(...concernBasedSupplements);
    }

    // 중복 제거
    return this.removeDuplicates(recommendations);
  }

  // 중복 제거
  private static removeDuplicates(supplements: SupplementInfo[]): SupplementInfo[] {
    return Array.from(new Map(supplements.map(item => [item.id, item])).values());
  }

  // 영양제 상호작용 체크
  static checkInteractions(selectedSupplements: SupplementInfo[]): string[] {
    const warnings: string[] = [];
    
    // 예시: 특정 조합의 영양제 상호작용 체크
    const hasOmega3 = selectedSupplements.some(s => s.name.includes('오메가3'));
    const hasVitaminD = selectedSupplements.some(s => s.name.includes('비타민D'));
    
    if (hasOmega3 && hasVitaminD) {
      warnings.push('오메가3와 비타민D는 함께 섭취하면 흡수율이 높아질 수 있습니다.');
    }

    return warnings;
  }

  // 추천 점수 계산
  static calculateRecommendationScore(supplement: SupplementInfo, healthInfo: HealthInfo): number {
    let score = 0;

    // 혈압약 복용자에게 적합한 영양제 점수 가중치
    if (healthInfo.takingMedicine) {
      if (supplement.tags.includes('심장건강')) score += 3;
      if (supplement.tags.includes('혈압조절')) score += 2;
    }

    // 알레르기가 있는 경우 면역력 관련 영양제 점수 가중치
    if (healthInfo.hasAllergy && supplement.tags.includes('면역력')) {
      score += 2;
    }

    // 건강 고민사항과 일치하는 태그당 점수 추가
    if (healthInfo.healthConcerns) {
      healthInfo.healthConcerns.forEach(concern => {
        if (supplement.tags.includes(concern)) score += 1;
      });
    }

    return score;
  }

  // 우선순위에 따른 영양제 정렬
  static sortByPriority(supplements: SupplementInfo[], healthInfo: HealthInfo): SupplementInfo[] {
    return [...supplements].sort((a, b) => {
      const scoreA = this.calculateRecommendationScore(a, healthInfo);
      const scoreB = this.calculateRecommendationScore(b, healthInfo);
      return scoreB - scoreA;
    });
  }
} 