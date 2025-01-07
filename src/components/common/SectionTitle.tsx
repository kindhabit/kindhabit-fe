import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '@/theme';

const SectionTitle = styled(Typography)`
  font-family: 'Pretendard';
  font-size: 20px;
  font-weight: 700;
  color: ${colors.brown};
  margin-bottom: 20px;
  padding: 0 4px;
`;

export default SectionTitle; 