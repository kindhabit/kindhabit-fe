import styled from 'styled-components';
import { BubbleProps, MessageProps, ButtonProps, ProfileProps, StyledProps } from './types';
import { createDebugStyles } from '@/core/styles/debug';

const shouldForwardProp = (prop: string): boolean => 
  !prop.startsWith('$') && !['theme', 'as', 'forwardedAs'].includes(prop);

export const BubbleWrapper = styled.div.withConfig({ shouldForwardProp })<BubbleProps>`
  ${props => createDebugStyles({
    name: 'BubbleWrapper',
    hierarchy: '6',
    color: props.theme.colors.debug?.chatBubble ?? '#8844FF'
  })}
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  margin: ${({ $margin, $prevType, $hasLink, theme, $prevSender, $sender }) => {
    if ($prevType === 'slider') return '8px 0 4px';
    if ($hasLink) return '1px 0 0';
    if ($prevSender && $prevSender === $sender) {
      return '0';
    }
    return '4px 0';
  }};
  padding: 0;
  animation: ${props => props.$animation === 'fadeIn' ? 'fadeOut 2s ease-out' : 'slideIn 0.5s ease-out'};
  animation-fill-mode: forwards;

  @keyframes fadeOut {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }

  @keyframes slideIn {
    0% { 
      opacity: 0;
      transform: translateY(20px);
    }
    100% { 
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const BubbleContainer = styled.div.withConfig({ shouldForwardProp })<BubbleProps>`
  ${props => createDebugStyles({
    name: 'BubbleContainer',
    hierarchy: '7',
    color: props.theme.colors.debug?.chatBubble ?? '#8844FF'
  })}
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  max-width: 70%;
  min-width: 120px;
  padding: 0;
  height: auto;
  box-sizing: border-box;
  margin-left: ${props => props.$sender === 'user' ? 'auto' : '0'};
  overflow: visible;

  .splash-wrapper {
    position: absolute;
    ${props => props.$sender === 'system' ? 'right: -5px;' : 'left: -5px;'}
    ${props => {
      switch (props.$verticalAlign) {
        case 'top':
          return 'top: 0; transform: translateY(0);';
        case 'bottom':
          return 'bottom: 0; transform: translateY(0);';
        default:
          return 'top: 50%; transform: translateY(-50%);';
      }
    }}
  }
`;

export const MessageBubble = styled.div.withConfig({ shouldForwardProp })<MessageProps>`
  ${props => createDebugStyles({
    name: 'MessageBubble',
    hierarchy: '8',
    color: props.theme.colors.debug?.chatBubble ?? '#8844FF'
  })}
  position: relative;
  padding: ${props => props.$sender === 'system' ? '4px 8px' : '6px'};
  border-radius: ${props => props.$sender === 'system' ? '16px 16px 2px 16px' : '16px 16px 16px 2px'};
  background: ${props => props.$sender ? props.theme.colors.chat.bubble[props.$sender].background : 'transparent'};
  border: ${props => props.$sender === 'system' ? `1px solid ${props.theme.colors.chat.bubble.system.border}` : 'none'};
  color: ${props => props.$sender ? props.theme.colors.chat.bubble[props.$sender].text : 'inherit'};
  padding-bottom: ${props => props.$hasButtons ? '6px' : props.$sender === 'system' ? '4px' : '6px'};
  font-size: 14px;
  line-height: 1.4;
  flex: 1;

  .message-text {
    font-size: 14px;
    line-height: 1.4;
    word-break: break-word;
  }
`;

export const ButtonContainer = styled.div.withConfig({ shouldForwardProp })<ButtonProps>`
  display: flex;
  gap: 8px;
  margin-top: ${props => props.$position === 'bottom' ? '8px' : '0'};
  margin-left: ${props => props.$position === 'right' ? '8px' : '0'};
  flex-direction: ${props => props.$position === 'bottom' ? 'column' : 'row'};
`;

export const BubbleButton = styled.button.withConfig({ shouldForwardProp })<ButtonProps>`
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.chat.bubble.button.background};
  color: ${props => props.theme.colors.chat.bubble.button.text};
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.chat.bubble.button.hover};
  }
`;

export const ProfileSection = styled.div.withConfig({ shouldForwardProp })<ProfileProps>`
  ${props => createDebugStyles({
    name: 'ProfileSection',
    hierarchy: '9',
    color: props.theme.colors.debug?.chatBubble ?? '#8844FF'
  })}
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  background: ${props => props.theme.colors.white};
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 480px;
`;

export const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ProfileImage = styled.img.withConfig({ shouldForwardProp })<StyledProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
`;

export const NameSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ProfileName = styled.span.withConfig({ shouldForwardProp })<StyledProps>`
  display: block;
  font-size: 13px;
  color: ${props => props.theme.colors.chat.bubble.profile.text};
  margin-bottom: 2px;
  margin-left: 8px;
`;

export const DepartmentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${props => props.theme.colors.text.secondary};
  font-size: 13px;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: auto;
`;

export const Tag = styled.span<{ $type?: 'verify' | 'checkup' }>`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 6px;
  background: ${props => props.$type === 'verify' ? props.theme.colors.primary + '15' : props.theme.colors.background};
  color: ${props => props.$type === 'verify' ? props.theme.colors.primary : props.theme.colors.text.secondary};
  white-space: nowrap;
`;

export const BookingButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
`;

export const BookingButton = styled.button`
  width: 100%;
  max-width: 320px;
  height: 44px;
  margin-top: 12px;
  border: none;
  border-radius: 8px;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

export const LinkText = styled.span.withConfig({ shouldForwardProp })<StyledProps>`
  display: block;
  text-align: right;
  margin-top: 2px;
  color: ${props => props.theme.colors.chat.bubble.button.background};
  font-size: 12px;
  cursor: pointer;
  text-decoration: underline;
  
  &:hover {
    color: ${props => props.theme.colors.chat.bubble.button.hover};
  }
`;