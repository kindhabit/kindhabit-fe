import React, { useEffect } from 'react';
import styled from 'styled-components';
import { DetailInfo } from '@/types/health.types';
import { colors } from '@/theme';

interface DetailDialogProps {
  open: boolean;
  onClose: () => void;
  detail: DetailInfo;
}

const DialogOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DialogPaper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 16px;
  border-radius: 16px;
  background-color: white;
  max-height: calc(100vh - 32px);
  overflow-y: auto;
`;

const DialogTitle = styled.h2`
  font-family: 'Pretendard';
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  padding: 16px 24px;
  color: ${colors.textPrimary};
  border-bottom: 1px solid ${colors.primary}10;
`;

const DialogContent = styled.div`
  padding: 20px 24px;
`;

const Description = styled.p`
  font-family: 'Pretendard';
  font-size: 16px;
  margin: 0 0 16px 0;
  color: ${colors.textPrimary};
  line-height: 1.5;
`;

const Section = styled.div`
  margin-top: 16px;
`;

const SectionTitle = styled.h3`
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: ${colors.textPrimary};
`;

const ListItem = styled.p`
  font-family: 'Pretendard';
  font-size: 14px;
  margin: 0 0 4px 0;
  color: ${colors.textSecondary};
  line-height: 1.5;
`;

const DetailDialog: React.FC<DetailDialogProps> = ({ open, onClose, detail }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <DialogOverlay isOpen={open} onClick={handleOverlayClick}>
      <DialogPaper>
        <DialogTitle>{detail.title}</DialogTitle>
        <DialogContent>
          <Description>{detail.description}</Description>
          
          <Section>
            <SectionTitle>효과</SectionTitle>
            {detail.benefits.map((benefit, index) => (
              <ListItem key={index}>• {benefit}</ListItem>
            ))}
          </Section>
          
          <Section>
            <SectionTitle>복용법</SectionTitle>
            <ListItem>{detail.usage}</ListItem>
          </Section>
          
          <Section>
            <SectionTitle>주의사항</SectionTitle>
            {detail.warnings.map((warning, index) => (
              <ListItem key={index}>• {warning}</ListItem>
            ))}
          </Section>
        </DialogContent>
      </DialogPaper>
    </DialogOverlay>
  );
};

export default DetailDialog; 