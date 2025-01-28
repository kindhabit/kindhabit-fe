import styled from 'styled-components';

export const H1 = styled.h1`
  font-family: ${props => props.theme.typography.fontFamily};
  font-size: ${props => props.theme.typography.h1.fontSize};
  font-weight: ${props => props.theme.typography.h1.fontWeight};
  margin: 0;
  color: ${props => props.theme.colors.textPrimary};
`;

export const H2 = styled.h2`
  font-family: ${props => props.theme.typography.fontFamily};
  font-size: ${props => props.theme.typography.h2.fontSize};
  font-weight: ${props => props.theme.typography.h2.fontWeight};
  margin: 0;
  color: ${props => props.theme.colors.textPrimary};
`;

export const Body1 = styled.p`
  font-family: ${props => props.theme.typography.fontFamily};
  font-size: ${props => props.theme.typography.body1.fontSize};
  margin: 0;
  color: ${props => props.theme.colors.textPrimary};
  line-height: 1.5;
`;

export const Body2 = styled.p`
  font-family: ${props => props.theme.typography.fontFamily};
  font-size: ${props => props.theme.typography.body2.fontSize};
  margin: 0;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.5;
`;

// 추가적인 텍스트 변형을 위한 인터페이스
interface TextProps {
  color?: string;
  bold?: boolean;
  align?: 'left' | 'center' | 'right';
}

export const Text = styled.span<TextProps>`
  font-family: ${props => props.theme.typography.fontFamily};
  font-size: ${props => props.theme.typography.body1.fontSize};
  color: ${props => props.color || props.theme.colors.textPrimary};
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  text-align: ${props => props.align || 'left'};
  margin: 0;
`; 