import React from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { colors } from '@/theme';

// 2. HeaderProps 타입 확장
interface HeaderProps {
  onMenuClick: () => void;
  className?: string;
} 