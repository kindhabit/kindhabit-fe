import React, { useState, useCallback } from 'react';
import { Dialog, Box, Typography } from '@mui/material';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import { DetailInfo } from '@/types/health.types';
import { colors } from '@/theme';
import { TransitionProps } from '@mui/material/transitions';

interface StyledDialogProps extends React.ComponentProps<typeof Dialog> {
  isMobile?: boolean;
}

const DialogWrapper = styled(Dialog)<StyledDialogProps>`
  && {
    position: absolute !important;
    inset: 0 !important;
    margin: 0 !important;
    max-width: 100% !important;
    height: 100% !important;
    transform: none !important;
    
    .MuiDialog-container {
      position: absolute !important;
      inset: 0 !important;
      height: 100% !important;
      align-items: flex-end !important;
      margin: 0 !important;
      max-width: 100% !important;
      transform: none !important;
    }

    .MuiPaper-root {
      width: 100% !important;
      margin: 0 !important;
      max-width: 100% !important;
      background: ${colors.dialogBg};
      border-radius: 24px 24px 0 0;
      max-height: 65vh;
      overflow-y: auto;
      transform: none !important;
      transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms !important;
      touch-action: pan-y;
      transform: translateZ(0);
      will-change: transform;
    }

    .MuiBackdrop-root {
      position: absolute !important;
      inset: 0 !important;
    }
  }
`;

interface DialogContentProps {
  onTouchStart?: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchMove?: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd?: (e: React.TouchEvent<HTMLDivElement>) => void;
}

const DialogContent = styled(Box)<DialogContentProps>`
  padding: 20px;
  height: 100%;
`;

const DialogTitle = styled(Typography)`
  font-family: 'Pretendard';
  font-size: 20px;
  font-weight: 800;
  color: #000;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
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
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 16px;
`;

const ContentText = styled(Typography)`
  font-family: 'Pretendard';
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

const ListItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isActive'
})<{ isActive?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ReferenceItem = styled('a', {
  shouldForwardProp: (prop) => prop !== 'isActive'
})<{ isActive?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
  text-decoration: none;
  color: inherit;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

type CustomTransitionProps = Omit<TransitionProps, 'children'> & {
  children: React.ReactElement;
};

const Transition = React.forwardRef<HTMLDivElement, CustomTransitionProps>(
  function Transition(props, ref) {
    return (
      <Slide
        direction="up"
        ref={ref}
        {...props}
        in={props.in ?? false}
      />
    );
  }
);

Transition.displayName = 'Transition';

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
  const [startY, setStartY] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    if (startY && e.touches[0].clientY - startY > 100) {
      setIsDragging(false);
      onClose();
    }
  }, [startY, onClose, isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setStartY(null);
  }, []);

  return (
    <DialogWrapper
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      TransitionProps={{
        timeout: {
          enter: 300,
          exit: 200
        },
        mountOnEnter: true,
        unmountOnExit: true
      }}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }
      }}
    >
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
    </DialogWrapper>
  );
};

export default DetailDialog; 