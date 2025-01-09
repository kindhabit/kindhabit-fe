export interface DetailInfo {
  title: string;
  description: string;
  benefits: string[];
  usage: string;
  warnings: string[];
  references?: {
    title: string;
    url: string;
  }[];
}

export interface HealthRecommendation {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  warnings: string[];
}

export interface HealthData {
  age: number;
  gender: 'male' | 'female';
  conditions: string[];
  medications: string[];
}

export interface AnalysisResult {
  recommendations: HealthRecommendation[];
  warnings: string[];
  nextQuestions: string[];
} 