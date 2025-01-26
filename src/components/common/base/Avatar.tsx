import styled from 'styled-components';
import { DebugProps } from '@/types/theme';
import { createDebugStyles } from '@/styles/debug';

interface AvatarProps extends DebugProps {
  $size?: number;
  $bgColor?: string | ((props: any) => string);
  $color?: string | ((props: any) => string);
}

const avatarSizes = {
  small: '32px',
  medium: '36px',
  large: '40px'
};

export const Avatar = styled.div<AvatarProps>`
  ${createDebugStyles({
    name: 'Avatar',
    color: props => props.theme.colors.debug?.avatar || '#45B7D1'
  })}
  width: ${props => props.$size || 36}px;
  height: ${props => props.$size || 36}px;
  border-radius: 50%;
  background-color: ${props => 
    typeof props.$bgColor === 'function' 
      ? props.$bgColor(props) 
      : props.$bgColor || props.theme.colors.secondary};
  color: ${props => 
    typeof props.$color === 'function' 
      ? props.$color(props) 
      : props.$color || props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${props => props.theme.typography.fontFamily};
  font-size: ${props => (props.$size || 36) * 0.5}px;
  font-weight: 500;
  user-select: none;
`;

interface AvatarImageProps extends AvatarProps {
  src: string;
  alt?: string;
}

export const AvatarImage = styled(Avatar).attrs<AvatarImageProps>(props => ({
  as: 'img',
  src: props.src,
  alt: props.alt || 'avatar'
}))<AvatarImageProps>`
  object-fit: cover;
`; 