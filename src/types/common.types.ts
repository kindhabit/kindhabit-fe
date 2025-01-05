export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface HealthRecommendation {
  id: string;
  title: string;
  description: string;
  evidence: {
    source: string;
    description: string;
  }[];
  additionalQuestions?: string[];
} 