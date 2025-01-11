import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Paper } from '@mui/material';
import { colors } from '@/theme';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SectionTitle from '@/components/common/SectionTitle';
import ContainerHeader from '@/components/common/ContainerHeader';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/store/debug';
import { debugLabel, debugBorder } from '@/styles/debug';

interface DebugProps {
  'data-debug'?: boolean;
}

const DashboardWrapper = styled(Box)<DebugProps>`
  padding: 20px;
  height: 100%;
  width: 100%;
  background: ${colors.dashboard.background};
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  
  ${props => props['data-debug'] && `
    ${debugBorder('#FF44FF')}
    ${debugLabel({
      name: 'DashboardSection > DashboardWrapper',
      hierarchy: '4',
      color: '#FF44FF'
    })}
  `}
`;

const StatCard = styled(Paper)<DebugProps>`
  padding: 20px;
  margin-bottom: 16px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(107, 68, 35, 0.06);
  border: 1px solid rgba(107, 68, 35, 0.08);
  position: relative;
  
  ${props => props['data-debug'] && `
    ${debugBorder('#44FFFF')}
    ${debugLabel({
      name: 'DashboardWrapper > StatCard',
      hierarchy: '5',
      color: '#44FFFF'
    })}
  `}
`;

const HealthMetricsCard = styled(Paper)<DebugProps>`
  padding: 20px;
  margin-bottom: 16px;
  border-radius: 16px;
  background: ${colors.cardBg};
  position: relative;
  
  ${props => props['data-debug'] && `
    ${debugBorder('#FFFF44')}
    ${debugLabel({
      name: 'DashboardWrapper > HealthMetricsCard',
      hierarchy: '5',
      color: '#FFFF44'
    })}
  `}
`;

const CardHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  cursor: pointer;
`;

const MetricItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 0',
  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
  
  '&:last-of-type': {
    borderBottom: 'none',
    paddingBottom: 0
  },
  
  '&:first-of-type': {
    paddingTop: 0
  }
});

const MetricLabel = styled(Typography)({
  fontFamily: 'Pretendard',
  fontSize: '14px',
  color: colors.textSecondary,
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
});

const MetricValue = styled(Typography)({
  fontFamily: 'Pretendard',
  fontSize: '15px',
  fontWeight: 600,
  color: colors.brown
});

const MetricGraph = styled(Box)({
  height: '40px',
  background: 'rgba(0, 0, 0, 0.03)',
  borderRadius: '6px',
  position: 'relative',
  marginTop: '8px'
});

const MetricBar = styled(Box)<{ value: number; warning?: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: ${props => props.value}%;
  background: ${props => props.warning ? '#ff9800' : colors.primary};
  border-radius: 6px;
  transition: width 0.3s ease-in-out;
`;

const MetricRange = styled(Typography)({
  fontSize: '12px',
  color: colors.textSecondary,
  marginTop: '4px',
  textAlign: 'right'
});

// 월별 데이터 타입 수정
interface MonthlyMetric {
  month: string;
  체중: number;
  혈압: number;
  콜레스테롤: number;
  간수치: number;
}

const monthlyData: MonthlyMetric[] = [
  { month: '1월', 체중: 68, 혈압: 120, 콜레스테롤: 185, 간수치: 25 },
  { month: '2월', 체중: 67, 혈압: 118, 콜레스테롤: 182, 간수치: 28 },
  { month: '3월', 체중: 69, 혈압: 122, 콜레스테롤: 180, 간수치: 27 },
  { month: '4월', 체중: 68, 혈압: 119, 콜레스테롤: 178, 간수치: 26 },
  { month: '5월', 체중: 70, 혈압: 121, 콜레스테롤: 183, 간수치: 29 },
  { month: '6월', 체중: 68, 혈압: 120, 콜레스테롤: 180, 간수치: 28 },
];

const MetricChart = styled(Box)`
  width: 100%;
  height: 100px;
  min-width: 200px;
  min-height: 100px;
  margin-top: 8px;
  overflow: hidden;
`;

const MetricsContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOpen'
})<{ isOpen: boolean }>(({ isOpen }) => ({
  maxHeight: isOpen ? '2000px' : '0',
  overflow: 'hidden',
  opacity: isOpen ? 1 : 0,
  transition: 'max-height 0.5s ease-in-out, opacity 0.3s ease-in-out'
}));

const Dashboard = () => {
  const [openCharts, setOpenCharts] = useState<{[key: string]: boolean}>({
    체중: false,
    혈압: false,
    콜레스테롤: false,
    간수치: false
  });
  const [isMetricsOpen, setIsMetricsOpen] = useState(true);
  const debugMode = useRecoilValue(debugModeState);

  const toggleChart = (metric: string) => {
    setOpenCharts(prev => ({
      ...prev,
      [metric]: !prev[metric]
    }));
  };

  return (
    <DashboardWrapper data-debug={debugMode}>
      <ContainerHeader title="건강 대시보드" />
      <HealthMetricsCard data-debug={debugMode}>
        <CardHeader onClick={() => setIsMetricsOpen(!isMetricsOpen)}>
          <Typography variant="h6">
            건강 지표
          </Typography>
          <Box sx={{ 
            transform: `rotate(${isMetricsOpen ? 180 : 0}deg)`,
            transition: 'transform 0.3s ease-in-out'
          }}>
            ▼
          </Box>
        </CardHeader>

        <MetricsContent isOpen={isMetricsOpen}>
          <MetricItem>
            <Box sx={{ flex: 1 }}>
              <MetricLabel>
                <span>📏</span>키
              </MetricLabel>
              <MetricValue>175cm</MetricValue>
            </Box>
          </MetricItem>

          <MetricItem onClick={() => toggleChart('체중')} sx={{ cursor: 'pointer' }}>
            <Box sx={{ flex: 1 }}>
              <MetricLabel>
                <span>⚖️</span>체중
              </MetricLabel>
              <MetricValue>68kg</MetricValue>
              <Box sx={{ 
                maxHeight: openCharts.체중 ? '120px' : '0',
                transition: 'max-height 0.3s ease-in-out',
                overflow: 'hidden'
              }}>
                <MetricChart>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="체중" 
                        stroke={colors.primary} 
                        strokeWidth={2}
                        dot={{ fill: colors.primary }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </MetricChart>
              </Box>
            </Box>
          </MetricItem>

          <MetricItem>
            <Box sx={{ flex: 1 }}>
              <MetricLabel>
                <span>📏</span>허리둘레
              </MetricLabel>
              <MetricValue>82cm</MetricValue>
            </Box>
          </MetricItem>

          <MetricItem onClick={() => toggleChart('혈압')} sx={{ cursor: 'pointer' }}>
            <Box sx={{ flex: 1 }}>
              <MetricLabel>
                <span>💓</span>혈압
              </MetricLabel>
              <MetricValue>120/80 mmHg</MetricValue>
              <Box sx={{ 
                maxHeight: openCharts.혈압 ? '120px' : '0',
                transition: 'max-height 0.3s ease-in-out',
                overflow: 'hidden'
              }}>
                <MetricChart>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="혈압" 
                        stroke={colors.primary} 
                        strokeWidth={2}
                        dot={{ fill: colors.primary }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </MetricChart>
              </Box>
            </Box>
          </MetricItem>

          <MetricItem onClick={() => toggleChart('콜레스테롤')} sx={{ cursor: 'pointer' }}>
            <Box sx={{ flex: 1 }}>
              <MetricLabel>
                <span>🔬</span>콜레스테롤
              </MetricLabel>
              <MetricValue>180 mg/dL</MetricValue>
              <Box sx={{ 
                maxHeight: openCharts.콜레스테롤 ? '120px' : '0',
                transition: 'max-height 0.3s ease-in-out',
                overflow: 'hidden'
              }}>
                <MetricChart>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="콜레스테롤" 
                        stroke={colors.primary} 
                        strokeWidth={2}
                        dot={{ fill: colors.primary }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </MetricChart>
              </Box>
            </Box>
          </MetricItem>

          <MetricItem onClick={() => toggleChart('간수치')} sx={{ cursor: 'pointer' }}>
            <Box sx={{ flex: 1 }}>
              <MetricLabel>
                <span>🔋</span>간수치(AST/ALT)
              </MetricLabel>
              <MetricValue>28/30 U/L</MetricValue>
              <Box sx={{ 
                maxHeight: openCharts.간수치 ? '120px' : '0',
                transition: 'max-height 0.3s ease-in-out',
                overflow: 'hidden'
              }}>
                <MetricChart>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="간수치" 
                        stroke={colors.primary} 
                        strokeWidth={2}
                        dot={{ fill: colors.primary }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </MetricChart>
              </Box>
            </Box>
          </MetricItem>
        </MetricsContent>
      </HealthMetricsCard>
    </DashboardWrapper>
  );
};

export default Dashboard; 