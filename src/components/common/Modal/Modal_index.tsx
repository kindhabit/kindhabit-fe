import React, { useEffect, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/core/store/debug';
import { ModalProps } from './Modal_types';
import {
  Overlay,
  ModalContainer,
  Header,
  Title,
  CloseButton,
  Content
} from './Modal_styles';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  type = 'popup',
  title,
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
  animation = 'fadeIn'
}) => {
  const debugMode = useRecoilValue(debugModeState);

  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscapeKey]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay
      $isOpen={isOpen}
      $type={type}
      onClick={handleOverlayClick}
      data-debug={debugMode}
    >
      <ModalContainer
        $isOpen={isOpen}
        $type={type}
        $animation={animation}
        data-debug={debugMode}
      >
        {(title || showCloseButton) && (
          <Header data-debug={debugMode}>
            {title && <Title data-debug={debugMode}>{title}</Title>}
            {showCloseButton && (
              <CloseButton onClick={onClose} data-debug={debugMode}>
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </CloseButton>
            )}
          </Header>
        )}
        <Content data-debug={debugMode}>
          {children}
        </Content>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal; 