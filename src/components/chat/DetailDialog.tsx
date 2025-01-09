import React from 'react';
import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, Typography, Box } from '@mui/material';
import { DetailInfo } from '@/types/health.types';

interface DetailDialogProps {
  open: boolean;
  onClose: () => void;
  detail: DetailInfo;
}

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 100%;
    max-width: 500px;
    margin: 16px;
    border-radius: 16px;
  }
`;

const DetailDialog: React.FC<DetailDialogProps> = ({ open, onClose, detail }) => {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogTitle>{detail.title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          {detail.description}
        </Typography>
        
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>효과</Typography>
          {detail.benefits.map((benefit, index) => (
            <Typography key={index} variant="body2" gutterBottom>
              • {benefit}
            </Typography>
          ))}
        </Box>
        
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>복용법</Typography>
          <Typography variant="body2" gutterBottom>
            {detail.usage}
          </Typography>
        </Box>
        
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>주의사항</Typography>
          {detail.warnings.map((warning, index) => (
            <Typography key={index} variant="body2" gutterBottom>
              • {warning}
            </Typography>
          ))}
        </Box>
      </DialogContent>
    </StyledDialog>
  );
};

export default DetailDialog; 