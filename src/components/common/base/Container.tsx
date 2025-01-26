import styled from 'styled-components';

interface FlexProps {
  $direction?: 'row' | 'column';
  $align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  $justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  $gap?: number;
  $wrap?: 'nowrap' | 'wrap';
  $flex?: string | number;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${props => props.$direction || 'row'};
  align-items: ${props => props.$align || 'stretch'};
  justify-content: ${props => props.$justify || 'flex-start'};
  gap: ${props => props.$gap ? props.theme.spacing.get(props.$gap) : 0};
  flex-wrap: ${props => props.$wrap || 'nowrap'};
  flex: ${props => props.$flex || 'initial'};
`;

interface CardProps {
  padding?: number;
  elevation?: 'none' | 'low' | 'medium' | 'high';
}

const shadowMap = {
  none: 'none',
  low: '0 2px 4px rgba(0, 0, 0, 0.1)',
  medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
  high: '0 8px 16px rgba(0, 0, 0, 0.1)'
};

export const Card = styled.div<CardProps>`
  background: ${props => props.theme.colors.cardBg};
  border-radius: 8px;
  padding: ${props => props.padding ? props.theme.spacing.get(props.padding) : props.theme.spacing.get(2)};
  box-shadow: ${props => shadowMap[props.elevation || 'low']};
`;

interface GridProps {
  columns?: number;
  gap?: number;
}

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 1}, 1fr);
  gap: ${props => props.gap ? props.theme.spacing.get(props.gap) : props.theme.spacing.get(2)};
`;

export const Section = styled.section`
  padding: ${props => props.theme.spacing.get(2)};
  width: 100%;
`; 