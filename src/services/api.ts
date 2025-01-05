import axios from 'axios';
import { HealthData, AnalysisResult } from '@/types/health.types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

export const healthService = {
  analyzeHealthData: async (data: HealthData): Promise<AnalysisResult> => {
    const response = await api.post('/analyze', data);
    return response.data;
  },
  
  getSecondaryAnalysis: async (questionId: string, answer: string) => {
    const response = await api.post('/analyze/secondary', { questionId, answer });
    return response.data;
  }
}; 