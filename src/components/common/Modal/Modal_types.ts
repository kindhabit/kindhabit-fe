import { ReactNode } from 'react';

export type ModalType = 'popup' | 'slideup';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: ModalType;
  title?: string;
  children: ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  animation?: 'slideIn' | 'fadeIn';
}

export interface StyledModalProps {
  $isOpen: boolean;
  $type: ModalType;
  $animation?: 'slideIn' | 'fadeIn';
} 