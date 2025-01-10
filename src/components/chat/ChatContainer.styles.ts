import { styled } from '@mui/material/styles';
import { colors } from '@/theme';
import { debugBorder } from '@/styles/debug';

export const ChatWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${colors.dashboard.background};
  overflow: hidden;
  ${debugBorder('ChatWrapper')}
`;

export const ContentArea = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  ${debugBorder('ContentArea')}
`;

export const MessageArea = styled('div')`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 1;
`; 