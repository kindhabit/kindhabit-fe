import React from 'react';
import { Routes, Route } from 'react-router-dom';
import KindhabitApp from '@/pages/kindhabit';
import XOGPage from '@/pages/xog';

function App() {
  return (
    <Routes>
      <Route path="/kindhabit/*" element={<KindhabitApp />} />
      <Route path="/xog/*" element={<XOGPage />} />
    </Routes>
  );
}

export default App; 