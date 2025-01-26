import React from 'react';
import styled from 'styled-components';
import { Flex } from './base';
import { Avatar } from './base';
import { Text } from './base';
import { createDebugStyles } from '@/styles/debug';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/store/debug';

const HeaderContainer = styled.header`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #eee;
  background: #ffffff;
  position: relative;
  ${createDebugStyles({ name: 'Header', color: '#33FFAA' })}
`;

const LogoContainer = styled(Flex)`
  position: relative;
  ${createDebugStyles({ name: 'LogoContainer', color: '#FFAA33' })}
`;

const LogoImage = styled.img`
  height: 38px;
  width: auto;
`;

const ProfileContainer = styled(Flex)`
  gap: 8px;
  align-items: center;
  position: relative;
  ${createDebugStyles({ name: 'ProfileContainer', color: '#AA33FF' })}
`;

const ProfileText = styled(Text)`
  font-size: 15px;
  font-weight: 500;
  color: ${props => props.theme.colors.textPrimary};
`;

const Header: React.FC = () => {
  const debugMode = useRecoilValue(debugModeState);
  
  return (
    <HeaderContainer data-debug={debugMode}>
      <LogoContainer $align="center" data-debug={debugMode}>
        <LogoImage src="/assets/logo.png" alt="착한습관" />
      </LogoContainer>
      <ProfileContainer $align="center" data-debug={debugMode}>
        <Avatar 
          $bgColor={props => props.theme.colors.secondary} 
          $color={props => props.theme.colors.textSecondary}
        >
          J
        </Avatar>
        <ProfileText>안녕, 제리?</ProfileText>
      </ProfileContainer>
    </HeaderContainer>
  );
};

export default Header; 