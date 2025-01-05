import React from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { colors } from '@/theme';

const HeaderWrapper = styled(Box)`
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border-bottom: 1px solid #eee;
`;

const LogoImage = styled('img')`
  height: 38px;
  width: auto;
`;

const ProfileContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProfileText = styled(Typography)`
  font-size: 15px;
  font-weight: 500;
  color: #333;
`;

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <HeaderWrapper>
      <LogoImage src="/assets/logo.png" alt="착한습관" />
      <ProfileContainer>
        <Avatar sx={{ width: 36, height: 36, bgcolor: '#f5f5f5', color: '#666' }}>J</Avatar>
        <ProfileText>안녕, 제리?</ProfileText>
      </ProfileContainer>
      <IconButton onClick={onMenuClick} edge="start">
        <MenuIcon />
      </IconButton>
    </HeaderWrapper>
  );
};

export default Header; 