'use client'

import { Refine } from '@refinedev/core'
import routerProvider from '@refinedev/nextjs-router'
import React from 'react'

import { manageAuthProvider } from '@/components/manage/authProvider'
import { payloadManageDataProvider } from '@/components/manage/dataProvider'

const resources = [
  { name: 'announcements', list: '/manage/announcements', create: '/manage/announcements' },
  { name: 'events', list: '/manage/events', create: '/manage/events' },
  { name: 'documents', list: '/manage/documents', create: '/manage/documents' },
  { name: 'pages', list: '/manage/pages', create: '/manage/pages' },
  { name: 'users', list: '/manage/members', create: '/manage/members' },
]

export const ManageRefineProvider = ({ children }: { children: React.ReactNode }) => (
  <Refine
    authProvider={manageAuthProvider}
    dataProvider={payloadManageDataProvider}
    resources={resources}
    routerProvider={routerProvider}
    options={{
      syncWithLocation: false,
      warnWhenUnsavedChanges: false,
    }}
  >
    {children}
  </Refine>
)
