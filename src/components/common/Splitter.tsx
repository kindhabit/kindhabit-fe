import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { colors } from '@/theme';

const SplitterBar = styled.div`
  width: 8px;
  background-color: #f0f0f0;
  cursor: col-resize;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${colors.primary}20;
  }
  
  &:active {
    background-color: ${colors.primary}40;
  }
`;

const SplitterContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Splitter: React.FC = () => {
  return (
    <SplitterContainer>
      <SplitterBar />
    </SplitterContainer>
  );
};

export default Splitter; 