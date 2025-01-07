import React, { forwardRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '@/theme';
import { ChatMessage } from '@/types/chat';

const MessageBubble = styled(Box)`
  display: flex;
  flex-direction: column;
  max-width: 80%;
  width: fit-content;
  min-width: 280px;
  background: #ffffff;
  border-radius: 4px 20px 20px 20px;
  padding: 16px;
  margin: 4px 0;
  margin-right: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
`;

const AvatarContainer = styled(Box)`
  display: flex;
  align-items: flex-end;
  gap: 4px;
  margin-bottom: 1px;
`;

const Avatar = styled('div')`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: fit-content;
  height: 32px;
  padding: 0 12px;
  border-radius: 16px;
  background: ${colors.primary}15;
  font-size: 14px;
  color: ${colors.primary};
  font-weight: 500;
  white-space: nowrap;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid ${colors.primary}20;
  
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      background: ${colors.primary}15;
    }
    50% {
      transform: scale(1.05);
      background: ${colors.primary}25;
    }
    100% {
      transform: scale(1);
      background: ${colors.primary}15;
    }
  }
  
  &:hover {
    animation: none;
    background: ${colors.primary}20;
    transition: all 0.2s ease;
  }
`;

const MessageText = styled(Typography)`
  font-family: 'Pretendard';
  font-size: 16px;
  line-height: 1.7;
  color: ${colors.textSecondary};
  margin-bottom: 16px;
  letter-spacing: -0.2px;
  white-space: pre-line;
`;

const ButtonContainer = styled(Box)`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const ActionButton = styled(Button)`
  padding: 8px 16px;
  border-radius: 20px;
  font-family: 'Pretendard';
  font-size: 14px;
  font-weight: 500;
  text-transform: none;
  box-shadow: none;
  
  &.proceed {
    background-color: ${colors.brown};
    color: white;
    
    &:hover {
      background-color: ${colors.brown}dd;
    }
  }
  
  &.skip {
    background-color: #f5f5f5;
    color: #666;
    border: 1px solid #e0e0e0;
    
    &:hover {
      background-color: #eeeeee;
    }
  }
`;

const MessageContainer = styled('div')<{ 
  show: boolean, 
  hasExplanation: boolean,
  showUserResponse: boolean 
}>`
  opacity: ${props => props.show ? 1 : 0};
  transform: translateY(${props => props.show ? 0 : '20px'});
  transition: all 0.5s ease;
  position: relative;
  padding-bottom: ${props => !props.showUserResponse ? '0' : '16px'};
`;

const StyledSpan = styled('span')`
  font-weight: 600;
  color: ${colors.primary};
`;

const LinkButton = styled('button')`
  background: none;
  border: none;
  font-size: 12px;
  color: ${colors.primary};
  padding: 4px 8px;
  cursor: pointer;
  opacity: 0.8;
  text-decoration: underline;
  margin-left: auto;
  margin-right: 16px;
  margin-top: 8px;
  
  &:hover {
    opacity: 1;
  }
`;

const UserResponseBubble = styled(Box)<{ show: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: fit-content;
  background: white;
  border-radius: 20px 4px 20px 20px;
  padding: 16px;
  margin: 4px 0;
  margin-left: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  opacity: ${props => props.show ? 1 : 0};
  transform: ${props => props.show ? 'translateY(0)' : 'translateY(20px)'};
  transition: all 0.3s ease;
  position: relative;
  margin-top: ${props => props.show ? '16px' : '0'};
`;

const ResponseOption = styled(Box)`
  &:first-of-type {
    background: ${colors.brown};
  }
  &:last-of-type {
    background: #f5f5f5;
  }
`;

const MessageListWrapper = styled(Box)<{}>(`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  z-index: 1;
  margin-top: 2px;
`);

const QuestionItem = styled(Box)`
  &:first-of-type {
    margin-top: 0;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`;

interface AdditionalQuestionsProps {
  onProceed: () => void;
  onSkip: () => void;
  show: boolean;
  onLinkClick: () => void;
  explanationShown?: boolean;
  messageCount?: number;
  messages: ChatMessage[];
  showUserResponse?: boolean;
}

const AdditionalQuestions = forwardRef<HTMLDivElement, AdditionalQuestionsProps>((props, ref) => {
  return (
    <MessageContainer 
      show={props.show} 
      hasExplanation={props.explanationShown ?? false}
      showUserResponse={props.showUserResponse ?? false}
    >
      <AvatarContainer>
        <Avatar>김제리</Avatar>
      </AvatarContainer>
      <MessageBubble>
        <MessageText>
          항목만 갖고 우선 다섯가지 성분을 찾았어요.{'\n'}
          혹시 <StyledSpan>혈압약</StyledSpan>을 드시나요? 🤔
        </MessageText>
      </MessageBubble>
      <LinkButton onClick={props.onLinkClick}>
        이렇게 판단한 이유 알아보기 →
      </LinkButton>

      {props.showUserResponse && (
        <UserResponseBubble show={props.showUserResponse}>
          <ResponseOption onClick={props.onProceed}>네</ResponseOption>
          <ResponseOption onClick={props.onSkip}>아니요</ResponseOption>
        </UserResponseBubble>
      )}
    </MessageContainer>
  );
});

export default AdditionalQuestions; 