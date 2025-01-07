import React from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import colors from '@/theme/colors';

const ResponseWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  margin: 16px 0;
`;

const ResponseBubble = styled(Box)`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin: 8px 0;
  background: white;
  padding: 12px;
  border-radius: 20px 4px 20px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  align-self: flex-end;
  max-width: 80%;
  opacity: 0;
  transform: translateY(10px);
  animation: bubbleAppear 0.5s ease-out forwards;

  @keyframes bubbleAppear {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ResponseButton = styled(Button)`
  min-width: 60px;
  padding: 6px 12px;
  border-radius: 8px;
  text-transform: none;
  font-weight: 500;
  font-size: 14px;
  
  &.yes {
    background-color: ${colors.brown};
    color: white;
    &:hover {
      background-color: ${colors.brown}dd;
    }
  }
  
  &.no {
    background-color: white;
    color: ${colors.textSecondary};
    border: 1px solid ${colors.grey[200]};
    &:hover {
      background-color: ${colors.grey[50]};
    }
  }
`;

interface UserResponseBubbleProps {
  onYes: () => void;
  onNo: () => void;
}

const UserResponseBubble: React.FC<UserResponseBubbleProps> = ({ onYes, onNo }) => {
  return (
    <ResponseBubble>
      <ResponseButton className="yes" onClick={onYes}>
        예
      </ResponseButton>
      <ResponseButton className="no" onClick={onNo}>
        아니오
      </ResponseButton>
    </ResponseBubble>
  );
};

export default UserResponseBubble; 