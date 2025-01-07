import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DetailInfo } from '@/types/health.types';

const BottomSheet = styled('div')<{ isOpen: boolean }>`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(${props => props.isOpen ? '0' : '100%'});
  width: 80%;
  max-height: 80vh;
  overflow: hidden;
  background: white;
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
`;

const Backdrop = styled('div')<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${props => props.isOpen ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
  z-index: 999;
`;

const DialogContainer = styled('div')`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  & > * {
    pointer-events: auto;
  }
`;

const DialogTitle = styled(Typography)`
  font-family: 'Pretendard';
  font-size: 20px;
  font-weight: 800;
  color: #000;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const SectionTitle = styled(Typography)`
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 600;
  color: #000;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const SnippetContainer = styled(Box)`
  padding: 12px;
  margin-bottom: 16px;
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 12px;
`;

const ContentText = styled(Typography)`
  font-family: 'Pretendard';
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

const ListItem = styled('li')`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
  
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const ReferenceItem = styled('a')`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
  text-decoration: none;
  color: inherit;
  
  &:last-of-type {
    margin-bottom: 0;
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

const DialogContent = styled(Box)`
  padding: 24px;
  height: 100%;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
`;

interface DetailDialogProps {
  open: boolean;
  onClose: () => void;
  detail: DetailInfo;
}

const DetailDialog: React.FC<DetailDialogProps> = ({
  open,
  onClose,
  detail
}) => {
  return (
    <>
      <Backdrop isOpen={open} onClick={onClose} />
      <BottomSheet isOpen={open}>
        <DialogContent>
          <DialogTitle>
            {detail.title}
          </DialogTitle>

          <Box sx={{ mb: 2 }}>
            <SectionTitle>
              <span>💊</span>주요 효능
            </SectionTitle>
            <SnippetContainer>
              {detail.benefits.map((benefit, idx) => (
                <ListItem key={idx}>
                  <ContentText>{benefit}</ContentText>
                </ListItem>
              ))}
            </SnippetContainer>
          </Box>

          <Box sx={{ mb: 2 }}>
            <SectionTitle>
              <span>⚡</span>섭취 방법
            </SectionTitle>
            <SnippetContainer>
              <ContentText>{detail.usage}</ContentText>
            </SnippetContainer>
          </Box>

          <Box sx={{ mb: 2 }}>
            <SectionTitle>
              <span>⚠️</span>주의사항
            </SectionTitle>
            <SnippetContainer>
              {detail.warnings.map((warning, idx) => (
                <ListItem key={idx}>
                  <ContentText>{warning}</ContentText>
                </ListItem>
              ))}
            </SnippetContainer>
          </Box>

          <Box>
            <SectionTitle>
              <span>📚</span>참고 자료
            </SectionTitle>
            <SnippetContainer>
              {detail.references.map((ref, idx) => (
                <ReferenceItem 
                  key={idx}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${ref.title} 참고 자료 링크`}
                >
                  <ContentText>{ref.title}</ContentText>
                </ReferenceItem>
              ))}
            </SnippetContainer>
          </Box>
        </DialogContent>
      </BottomSheet>
    </>
  );
};

export default DetailDialog; 