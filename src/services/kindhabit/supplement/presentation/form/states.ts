import { SupplementInfo, HealthInfo, RecommendInfo } from '../../types';
import { SupplementAPI } from '../../api/client';

export class FormSupplementState {
  private api: SupplementAPI;
  private listeners: ((state: any) => void)[] = [];
  private state: {
    supplements: SupplementInfo[];
    healthInfo?: HealthInfo;
    recommendation?: RecommendInfo;
  };

  constructor() {
    this.api = new SupplementAPI();
    this.state = {
      supplements: []
    };
  }

  subscribe(listener: (state: any) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyStateChange() {
    this.listeners.forEach(listener => listener(this.state));
  }

  getState() {
    return this.state;
  }

  async initialize() {
    const supplements = await this.api.getBasicSupplements();
    this.state = {
      ...this.state,
      supplements
    };
    this.notifyStateChange();
  }

  async handleHealthInfoSubmit(healthInfo: HealthInfo) {
    this.state = {
      ...this.state,
      healthInfo
    };
    
    const supplements = await this.api.getHealthSupplements(healthInfo);
    this.state = {
      ...this.state,
      supplements
    };
    this.notifyStateChange();
  }

  async handleRecommendation(info: RecommendInfo) {
    this.state = {
      ...this.state,
      recommendation: info
    };
    await this.api.saveRecommendation(info);
    this.notifyStateChange();
  }
} 