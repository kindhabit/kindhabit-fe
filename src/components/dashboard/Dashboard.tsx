import React, { useState } from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Flex, Paper, Text, H2 } from '@/components/common/base';
import SectionTitle from '@/components/common/SectionTitle';
import ContainerHeader from '@/components/common/ContainerHeader';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/store/debug';
import { debugLabel, debugBorder } from '@/styles/debug';

interface DebugProps {
  'data-debug'?: boolean;
}

const StyledContainer = styled.div<{ $padding?: string; $flex?: string }>`
  padding: ${props => props.$padding || '0'};
  flex: ${props => props.$flex || 'none'};
  height: 100%;
  width: 100%;
  background: ${props => props.theme.colors.dashboard.background};
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

const StatCard = styled.div<{ $isOpen?: boolean }>`
  background: ${props => props.theme.colors.white};
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.colors.hover};
  }
  
  ${props => props.$isOpen && `
    background: ${props => props.theme.colors.hover};
  `}
`;

const HealthMetricsCard = styled(Paper)<DebugProps & { $padding?: number }>`
  margin-bottom: 16px;
  border-radius: 16px;
  position: relative;
  padding: ${props => props.$padding ? `${props.$padding * 8}px` : '20px'};
  
  ${props => props['data-debug'] && `
    ${debugBorder('#FFFF44')}
    ${debugLabel({
      name: 'DashboardWrapper > HealthMetricsCard',
      hierarchy: '5',
      color: '#FFFF44'
    })}
  `}
`;

const CardHeader = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  cursor: pointer;
`;

const MetricItem = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid ${props => props.theme.colors.primary}05;
  
  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }
  
  &:first-of-type {
    padding-top: 0;
  }
`;

const MetricLabel = styled(Text)`
  color: ${props => props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MetricValue = styled(Text)`
  font-weight: 600;
  color: ${props => props.theme.colors.brown};
`;

const MetricGraph = styled.div`
  height: 40px;
  background: ${props => props.theme.colors.primary}03;
  border-radius: 6px;
  position: relative;
  margin-top: 8px;
`;

const MetricBar = styled.div<{ $value: number; $warning?: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: ${props => props.$value}%;
  background: ${props => props.$warning ? '#ff9800' : props.theme.colors.primary};
  border-radius: 6px;
  transition: width 0.3s ease-in-out;
`;

const MetricRange = styled(Text)`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
  margin-top: 4px;
  text-align: right;
`;

// 월별 데이터 타입
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

const MetricChart = styled.div`
  width: 100%;
  height: 100px;
  min-width: 200px;
  min-height: 100px;
  margin-top: 8px;
  overflow: hidden;
`;

const MetricsContent = styled.div<{ $isOpen: boolean }>`
  max-height: ${props => props.$isOpen ? '2000px' : '0'};
  overflow: hidden;
  opacity: ${props => props.$isOpen ? 1 : 0};
  transition: max-height 0.5s ease-in-out, opacity 0.3s ease-in-out;
`;

const StyledFlex = styled.div<{ $direction?: string; $flex?: string | number }>`
  display: flex;
  flex-direction: ${props => props.$direction || 'row'};
  flex: ${props => props.$flex || 'none'};
`;

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
    <StyledContainer $padding="20px" $flex="1" data-debug={debugMode}>
      <ContainerHeader title="건강 대시보드" />
      <HealthMetricsCard data-debug={debugMode} $padding={2.5} elevation={1}>
        <CardHeader onClick={() => setIsMetricsOpen(!isMetricsOpen)}>
          <H2>건강 지표</H2>
          <Text style={{ 
            transform: `rotate(${isMetricsOpen ? 180 : 0}deg)`,
            transition: 'transform 0.3s ease-in-out'
          }}>
            ▼
          </Text>
        </CardHeader>

        <MetricsContent $isOpen={isMetricsOpen}>
          <MetricItem>
            <StyledFlex $direction="column" $flex={1}>
              <MetricLabel>
                <span>📏</span>키
              </MetricLabel>
              <MetricValue>175cm</MetricValue>
            </StyledFlex>
          </MetricItem>

          <MetricItem onClick={() => toggleChart('체중')} style={{ cursor: 'pointer' }}>
            <StyledFlex $direction="column" $flex={1}>
              <MetricLabel>
                <span>⚖️</span>체중
              </MetricLabel>
              <MetricValue>68kg</MetricValue>
              <div style={{ 
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
                        stroke={props => props.theme.colors.primary}
                        strokeWidth={2}
                        dot={{ fill: props => props.theme.colors.primary }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </MetricChart>
              </div>
            </StyledFlex>
          </MetricItem>

          <MetricItem>
            <StyledFlex $direction="column" $flex={1}>
              <MetricLabel>
                <span>📏</span>허리둘레
              </MetricLabel>
              <MetricValue>82cm</MetricValue>
            </StyledFlex>
          </MetricItem>

          <MetricItem onClick={() => toggleChart('혈압')} style={{ cursor: 'pointer' }}>
            <StyledFlex $direction="column" $flex={1}>
              <MetricLabel>
                <span>💓</span>혈압
              </MetricLabel>
              <MetricValue>120/80 mmHg</MetricValue>
              <div style={{ 
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
                        stroke={props => props.theme.colors.primary}
                        strokeWidth={2}
                        dot={{ fill: props => props.theme.colors.primary }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </MetricChart>
              </div>
            </StyledFlex>
          </MetricItem>

          <MetricItem onClick={() => toggleChart('콜레스테롤')} style={{ cursor: 'pointer' }}>
            <StyledFlex $direction="column" $flex={1}>
              <MetricLabel>
                <span>🔬</span>콜레스테롤
              </MetricLabel>
              <MetricValue>180 mg/dL</MetricValue>
              <div style={{ 
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
                        stroke={props => props.theme.colors.primary}
                        strokeWidth={2}
                        dot={{ fill: props => props.theme.colors.primary }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </MetricChart>
              </div>
            </StyledFlex>
          </MetricItem>

          <MetricItem onClick={() => toggleChart('간수치')} style={{ cursor: 'pointer' }}>
            <StyledFlex $direction="column" $flex={1}>
              <MetricLabel>
                <span>🔋</span>간수치(AST/ALT)
              </MetricLabel>
              <MetricValue>28/30 U/L</MetricValue>
              <div style={{ 
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
                        stroke={props => props.theme.colors.primary}
                        strokeWidth={2}
                        dot={{ fill: props => props.theme.colors.primary }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </MetricChart>
              </div>
            </StyledFlex>
          </MetricItem>
        </MetricsContent>
      </HealthMetricsCard>
    </StyledContainer>
  );
};

export default Dashboard; 