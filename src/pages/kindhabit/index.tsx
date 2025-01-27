import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { KindhabitThemeProvider } from './theme/ThemeProvider';

const KindhabitApp = () => {
  const element = useRoutes(routes);
  
  return (
    <KindhabitThemeProvider>
      {element}
    </KindhabitThemeProvider>
  );
};

export default KindhabitApp; 