import { DEBUG_MODE } from '@/constants/layout';

export const debugBorder = (
  name: string, 
  color: string, 
  showAlways = false,
  position = 'top-left'
) => {
  if (!DEBUG_MODE && !showAlways) return '';
  
  return `
    border: 1px solid ${color};
    &::before {
      content: '${name}';
      position: absolute;
      ${position === 'top-left' ? 'top: 0; left: 0;' : 'top: 0; right: 0;'}
      font-size: 10px;
      padding: 2px 4px;
      background: ${color};
      color: white;
      opacity: 0.7;
    }
  `;
}; 