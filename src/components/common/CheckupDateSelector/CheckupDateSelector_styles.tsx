import styled from 'styled-components';

export const Container = styled.div<{ $hasFooter?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  height: ${({ $hasFooter }) => ($hasFooter ? 'calc(100% - 80px)' : '100%')};
`; 