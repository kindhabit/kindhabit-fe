import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '@/theme';

const HeaderWrapper = styled(Box)({
  padding: '0 0 20px 0',
  borderBottom: `1px solid ${colors.primary}10`
});

const HeaderTitle = styled(Typography)({
  fontFamily: 'Pretendard',
  fontSize: '20px',
  fontWeight: 700,
  color: colors.brown
});

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