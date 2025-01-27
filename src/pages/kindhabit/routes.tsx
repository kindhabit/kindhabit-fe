import React from 'react';
import { RouteObject } from 'react-router-dom';
import Layout from '@/core/components/common/Layout';
import ChatPage from './supplement/chat/ChatPage';
import LoadingPage from './supplement/chat/LoadingPage';
import SupplementTest from './supplement/test';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Layout>
        <LoadingPage />
      </Layout>
    )
  },
  {
    path: 'chat',
    element: (
      <Layout>
        <ChatPage />
      </Layout>
    )
  },
  {
    path: 'supplement',
    element: (
      <Layout>
        <LoadingPage />
      </Layout>
    )
  },
  {
    path: 'supplement/chat',
    element: (
      <Layout>
        <ChatPage />
      </Layout>
    )
  },
  {
    path: 'supplement/test',
    element: <SupplementTest />,
    children: [
      {
        path: 'loading',
        element: (
          <Layout>
            <LoadingPage />
          </Layout>
        )
      },
      {
        path: 'chat',
        element: (
          <Layout>
            <ChatPage />
          </Layout>
        )
      }
    ]
  }
];

export default routes; 