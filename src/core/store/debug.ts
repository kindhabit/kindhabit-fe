import { atom } from 'recoil';

export const debugModeState = atom<boolean>({
  key: 'debugModeState',
  default: false,
}); 