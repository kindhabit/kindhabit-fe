import React, { useState, useCallback } from 'react';
import { styled } from '@mui/material/styles';

const SplitterBar = styled('div')`
  width: 8px;
  background-color: #f0f0f0;
  cursor: col-resize;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.palette.primary.main}20;
  }
  
  &:active {
    background-color: ${props => props.theme.palette.primary.main}40;
  }
`;

const SplitterContainer = styled('div')`
  display: flex;
  width: 100%;
  height: 100%;
`; 