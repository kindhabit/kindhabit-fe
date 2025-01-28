import styled from 'styled-components';

export const NavigatorContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 8px;
`;

export const NavigatorDot = styled.div<{ $active?: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ $active, theme }) => 
    $active ? theme.colors.primary : theme.colors.border};
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
`; 