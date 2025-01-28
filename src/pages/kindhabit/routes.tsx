import React from 'react';
import { RouteObject, Outlet } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import { RedirectPage } from '@/components/common/RedirectPage';
import ChatPage from './supplement/chat/ChatPage';
import LoadingPage from './supplement/chat/LoadingPage';
import SupplementTest from './supplement/test';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RedirectPage to="./supplement/loading" />
  },
  {
    path: 'supplement',
    element: <Layout><Outlet /></Layout>,
    children: [
      {
        path: '',
        element: <RedirectPage to="./loading" />
      },
      {
        path: 'loading',
        element: <LoadingPage />
      },
      {
        path: 'chat',
        element: <ChatPage />
      },
      {
        path: 'test/*',
        element: <SupplementTest />
      },
      {
        path: '*',
        element: <RedirectPage to="./loading" />
      }
    ]
  }
];

export default routes; 