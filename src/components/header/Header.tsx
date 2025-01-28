import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Flex, Text } from '@/components/base';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/core/store/debug';
import { useLocation } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { createDebugStyles } from '@/core/styles/debug';

interface DebugProps {
  'data-debug'?: boolean;
}

const HeaderContainer = styled.header<DebugProps>`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.background};
  position: relative;

  ${createDebugStyles({
    name: 'HeaderSection',
    hierarchy: '2',
    color: '#00FF00'
  })}
`;

const LogoContainer = styled(Flex)<DebugProps>`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0;

  ${createDebugStyles({
    name: 'LogoContainer',
    hierarchy: '3',
    color: '#FFFF00'
  })}
`;

const LogoImage = styled.img<{ $isXOGPath: boolean } & DebugProps>`
  height: ${props => props.theme.logo.height[props.$isXOGPath ? 'xog' : 'kindhabit']};
  width: auto;
  cursor: pointer;
  object-fit: contain;
  max-height: 100%;

  ${createDebugStyles({
    name: 'LogoImage',
    hierarchy: '4',
    color: '#00FFFF'
  })}
`;

const ProfileContainer = styled(Flex)<DebugProps>`
  gap: 8px;
  align-items: center;
  position: relative;

  ${createDebugStyles({
    name: 'ProfileContainer',
    hierarchy: '3',
    color: '#FF00FF'
  })}
`;

const ProfileText = styled(Text)`
  font-size: 15px;
  font-weight: 500;
  color: ${props => props.theme.colors.text.primary};
`;

const Header: React.FC<DebugProps> = ({ 'data-debug': debug }) => {
  const debugMode = useRecoilValue(debugModeState);
  const location = useLocation();
  const theme = useTheme();
  
  const isXOGPath = location.pathname.startsWith('/xog');
  const logoSrc = isXOGPath ? '/assets/mtechlogo.png' : '/assets/logo.png';
  const logoAlt = isXOGPath ? 'M-TECH' : '착한습관';
  
  useEffect(() => {
    if (debugMode) {
      const themeDebugInfo = {
        debugMode,
        isXOGPath,
        theme: {
          logo: theme.logo,
          colors: {
            border: theme.colors.border,
            background: theme.colors.background
          }
        },
        computedLogoHeight: theme.logo.height[isXOGPath ? 'xog' : 'kindhabit']
      };
      console.log('Header Theme Debug:', JSON.stringify(themeDebugInfo, null, 2));
    }
  }, [debugMode, isXOGPath, theme]);
  
  useEffect(() => {
    if (debugMode) {
      const logoDebugInfo = {
        currentPath: location.pathname,
        isXOGPath,
        logoSrc,
        fullUrl: `${window.location.origin}${logoSrc}`,
        baseUrl: window.location.origin,
        themeProps: {
          logo: theme.logo,
          computedHeight: theme.logo.height[isXOGPath ? 'xog' : 'kindhabit'],
          colors: {
            border: theme.colors.border,
            background: theme.colors.background
          }
        },
        elementStyle: {
          height: `${theme.logo.height[isXOGPath ? 'xog' : 'kindhabit']}`,
          maxHeight: '100%',
          objectFit: 'contain'
        }
      };
      console.log('Logo Debug Info:', JSON.stringify(logoDebugInfo, null, 2));
    }
  }, [location.pathname, logoSrc, isXOGPath, theme, debugMode]);
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Image Load Error:', {
      src: e.currentTarget.src,
      path: location.pathname,
      isXOGPath
    });
  };
  
  return (
    <HeaderContainer data-debug={debug || debugMode}>
      <LogoContainer $align="center" data-debug={debug || debugMode}>
        <LogoImage 
          $isXOGPath={isXOGPath}
          src={logoSrc} 
          alt={logoAlt} 
          onError={handleImageError}
          loading="eager"
          data-debug={debug || debugMode}
        />
      </LogoContainer>
      <ProfileContainer $align="center" data-debug={debug || debugMode}>
        <img 
          src="/assets/ava_m.png"
          alt="Profile"
          style={{ width: '32px', height: '32px' }}
          onError={handleImageError}
        />
        <ProfileText>안녕, 제리?</ProfileText>
      </ProfileContainer>
    </HeaderContainer>
  );
};

export default Header; 