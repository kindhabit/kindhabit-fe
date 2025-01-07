import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '@/theme';

const ResponseWrapper = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin: 4px 0;
  position: absolute;
  right: 0;
  top: 120px;
`;

const ResponseBubble = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: fit-content;
  background: white;
  border-radius: 20px 4px 20px 20px;
  padding: 16px;
  margin-left: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const ResponseOption = styled(Box)`
  padding: 8px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Pretendard';
  font-size: 14px;
  text-align: center;
  min-width: 80px;
  
  &:first-of-type {
    background: ${colors.brown};
    color: white;
    font-weight: 500;
    
    &:hover {
      background: ${colors.brown}ee;
    }
  }

  &:last-of-type {
    color: #666;
    border: 1px solid #e0e0e0;
    background: #f5f5f5;
    
    &:hover {
      background: #eeeeee;
    }
  }
`;

interface UserResponseMessageProps {
  onProceed: () => void;
  onSkip: () => void;
}

const UserResponseMessage: React.FC<UserResponseMessageProps> = ({
  onProceed,
  onSkip
}) => {
  return (
    <ResponseWrapper>
      <ResponseBubble>
        <ResponseOption onClick={onProceed}>네</ResponseOption>
        <ResponseOption onClick={onSkip}>아니요</ResponseOption>
      </ResponseBubble>
    </ResponseWrapper>
  );
};

export default UserResponseMessage; 