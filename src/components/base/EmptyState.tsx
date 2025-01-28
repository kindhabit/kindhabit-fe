import React from 'react';
import styled from 'styled-components';

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  text-align: center;
  height: 100%;
  color: ${props => props.theme.colors.text?.secondary};
`;

interface EmptyStateProps {
  children: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ children }) => {
  return (
    <EmptyStateContainer>
      {children}
    </EmptyStateContainer>
  );
}; 