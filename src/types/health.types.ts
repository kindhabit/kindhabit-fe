export interface HealthData {
  uuid: string;
  phoneno: string;
  name: string;
  hosnm: string;
  regdate: string;
  height: number;
  weight: number;
  waist_circumference: number;
  bmi: number;
  systolic_bp: number;
  diastolic_bp: number;
  sgotast: number;
  sgptalt: number;
  gammagtp: number;
  total_cholesterol: number;
  hdl_cholesterol: number;
  ldl_cholesterol: number;
  triglyceride: number;
  fasting_blood_sugar: number;
  creatinine: number;
  gfr: number;
  hmg: null;
  cancerdata: {
    recommendations: string;
  };
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AnalysisResult {
  primaryAnalysis: string;
  secondaryQuestions: Array<{
    id: string;
    question: string;
    context: string;
  }>;
}

export interface ReportData {
  recommendations: Array<{
    id: string;
    product: string;
    reason: string;
    evidence: string;
    shopLink: string;
  }>;
}

export interface HealthRecommendation {
  id: string;
  title: string;
  description: string;
  evidence: Array<{
    source: string;
    description: string;
  }>;
  additionalQuestions?: string[];
}

export interface Recommendation {
  ingredient: string;
  reason: string;
  icon?: string;
  tags: string[];
  message?: string;
}

export interface DetailInfo {
  title: string;
  description: string;
  benefits: string[];
  usage: string;
  warnings: string[];
  references: {
    title: string;
    url: string;
  }[];
} 