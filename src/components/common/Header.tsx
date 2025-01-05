import React from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { colors } from '@/theme';

const HeaderContainer = styled(Box)`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #eee;
  background: #ffffff;
`;

const LeftSection = styled(Box)`
  display: flex;
  align-items: center;
`;

const RightSection = styled(Box)`
  display: flex;
  align-items: center;
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

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <LeftSection>
        <LogoImage src="/assets/logo.png" alt="착한습관" />
      </LeftSection>
      <RightSection>
        <ProfileContainer>
          <Avatar sx={{ width: 36, height: 36, bgcolor: '#f5f5f5', color: '#666' }}>J</Avatar>
          <ProfileText>안녕, 제리?</ProfileText>
        </ProfileContainer>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header; 