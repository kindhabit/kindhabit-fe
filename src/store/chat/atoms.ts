import { atom } from 'recoil';
import { ChatMessage, HealthData } from '@/types/health.types';

export const chatMessagesState = atom<ChatMessage[]>({
  key: 'chatMessagesState',
  default: []
});

export const healthDataState = atom<HealthData | null>({
  key: 'healthDataState',
  default: null
}); 