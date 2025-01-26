import React from 'react';
import styled from 'styled-components';
import { colors } from '@/theme';

const HeaderWrapper = styled.div`
  padding: 0 0 20px 0;
  border-bottom: 1px solid ${colors.primary}10;
`;

const HeaderTitle = styled.h2`
  font-family: 'Pretendard';
  font-size: 20px;
  font-weight: 700;
  color: ${colors.primary};
  margin: 0;
`;

interface ContainerHeaderProps {
  title: string;
}

const ContainerHeader: React.FC<ContainerHeaderProps> = ({ title }) => {
  return (
    <HeaderWrapper>
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderWrapper>
  );
};

export default ContainerHeader; 