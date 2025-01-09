import { styled } from '@mui/material/styles';
import { colors } from '@/theme';
import Dashboard from '@/components/dashboard/Dashboard';

const LayoutWrapper = styled('div')`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const MainContent = styled('div')`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

const SidebarArea = styled('div')`
  width: 320px;
  height: 100%;
  border-left: 1px solid ${colors.dashboard.background};
  background: ${colors.cardBg};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LayoutWrapper>
      <MainContent>
        {children}
      </MainContent>
      <SidebarArea>
        <Dashboard />
      </SidebarArea>
    </LayoutWrapper>
  );
};

export default DashboardLayout; 