import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { HealthRecommendation } from '@/types/common.types';

const MessageWrapper = styled(Box)`
  margin-bottom: 24px;
`;

const RecommendationCard = styled(Paper)`
  padding: 16px;
  margin-bottom: 8px;
  border-radius: 12px;
  background: #f8f9fa;
`;

const EvidenceSection = styled(Box)`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
`;

interface RecommendationMessageProps {
  recommendation: HealthRecommendation;
  onMoreInfo?: () => void;
}

const RecommendationMessage: React.FC<RecommendationMessageProps> = ({
  recommendation,
  onMoreInfo
}) => {
  return (
    <MessageWrapper>
      <RecommendationCard elevation={0}>
        <Typography variant="h6" gutterBottom>
          {recommendation.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {recommendation.description}
        </Typography>
        
        <EvidenceSection>
          <Typography variant="subtitle2" gutterBottom>
            근거 자료
          </Typography>
          {recommendation.evidence.map((evidence, index) => (
            <Box key={index} mb={1}>
              <Typography variant="body2" color="text.secondary">
                {evidence.source}: {evidence.description}
              </Typography>
            </Box>
          ))}
        </EvidenceSection>

        {recommendation.additionalQuestions && (
          <Box mt={2}>
            <Button 
              variant="outlined" 
              color="primary"
              onClick={onMoreInfo}
              fullWidth
            >
              추가 정보 확인하기
            </Button>
          </Box>
        )}
      </RecommendationCard>
    </MessageWrapper>
  );
};

export default RecommendationMessage; 