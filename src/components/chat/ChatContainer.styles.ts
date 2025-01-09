import { styled } from '@mui/material/styles';
import { colors } from '@/theme';

export const ChatWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${colors.dashboard.background};
  overflow: hidden;
  border: 2px solid red;
`;

export const ContentArea = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 2px solid green;
`;

export const MessageArea = styled('div')`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: ${colors.dashboard.background};
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 2px solid blue;
`;

export const BubbleWrapper = styled('div')<BubbleWrapperProps>`
  display: flex;
  flex-direction: column;
  margin: ${({ margin }) => margin || '0'};
  position: relative;
  width: 100%;
  padding: 0 16px;
  border: 2px dashed purple;
`; 