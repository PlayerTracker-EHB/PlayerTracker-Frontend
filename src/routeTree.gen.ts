/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as GuestImport } from './routes/_guest'
import { Route as AuthImport } from './routes/_auth'
import { Route as GuestIndexImport } from './routes/_guest/index'
import { Route as GuestAboutImport } from './routes/_guest/about'
import { Route as GuestSubscriptionsImport } from './routes/_guest/Subscriptions'
import { Route as GuestRegisterImport } from './routes/_guest/Register'
import { Route as GuestLoginImport } from './routes/_guest/Login'
import { Route as AuthAdminImport } from './routes/_auth/_admin'
import { Route as AuthStatisticsImport } from './routes/_auth/Statistics'
import { Route as AuthMatchStatsImport } from './routes/_auth/MatchStats'
import { Route as AuthAdminAdminUploaderImport } from './routes/_auth/_admin/admin/Uploader'
import { Route as AuthAdminAdminTeamImport } from './routes/_auth/_admin/admin/Team'
import { Route as AuthAdminAdminMyAdminImport } from './routes/_auth/_admin/admin/MyAdmin'
import { Route as AuthAdminAdminAccountsImport } from './routes/_auth/_admin/admin/Accounts'

// Create/Update Routes

const GuestRoute = GuestImport.update({
  id: '/_guest',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const GuestIndexRoute = GuestIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => GuestRoute,
} as any)

const GuestAboutRoute = GuestAboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => GuestRoute,
} as any)

const GuestSubscriptionsRoute = GuestSubscriptionsImport.update({
  id: '/Subscriptions',
  path: '/Subscriptions',
  getParentRoute: () => GuestRoute,
} as any)

const GuestRegisterRoute = GuestRegisterImport.update({
  id: '/Register',
  path: '/Register',
  getParentRoute: () => GuestRoute,
} as any)

const GuestLoginRoute = GuestLoginImport.update({
  id: '/Login',
  path: '/Login',
  getParentRoute: () => GuestRoute,
} as any)

const AuthAdminRoute = AuthAdminImport.update({
  id: '/_admin',
  getParentRoute: () => AuthRoute,
} as any)

const AuthStatisticsRoute = AuthStatisticsImport.update({
  id: '/Statistics',
  path: '/Statistics',
  getParentRoute: () => AuthRoute,
} as any)

const AuthMatchStatsRoute = AuthMatchStatsImport.update({
  id: '/MatchStats',
  path: '/MatchStats',
  getParentRoute: () => AuthRoute,
} as any)

const AuthAdminAdminUploaderRoute = AuthAdminAdminUploaderImport.update({
  id: '/admin/Uploader',
  path: '/admin/Uploader',
  getParentRoute: () => AuthAdminRoute,
} as any)

const AuthAdminAdminTeamRoute = AuthAdminAdminTeamImport.update({
  id: '/admin/Team',
  path: '/admin/Team',
  getParentRoute: () => AuthAdminRoute,
} as any)

const AuthAdminAdminMyAdminRoute = AuthAdminAdminMyAdminImport.update({
  id: '/admin/MyAdmin',
  path: '/admin/MyAdmin',
  getParentRoute: () => AuthAdminRoute,
} as any)

const AuthAdminAdminAccountsRoute = AuthAdminAdminAccountsImport.update({
  id: '/admin/Accounts',
  path: '/admin/Accounts',
  getParentRoute: () => AuthAdminRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_guest': {
      id: '/_guest'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof GuestImport
      parentRoute: typeof rootRoute
    }
    '/_auth/MatchStats': {
      id: '/_auth/MatchStats'
      path: '/MatchStats'
      fullPath: '/MatchStats'
      preLoaderRoute: typeof AuthMatchStatsImport
      parentRoute: typeof AuthImport
    }
    '/_auth/Statistics': {
      id: '/_auth/Statistics'
      path: '/Statistics'
      fullPath: '/Statistics'
      preLoaderRoute: typeof AuthStatisticsImport
      parentRoute: typeof AuthImport
    }
    '/_auth/_admin': {
      id: '/_auth/_admin'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthAdminImport
      parentRoute: typeof AuthImport
    }
    '/_guest/Login': {
      id: '/_guest/Login'
      path: '/Login'
      fullPath: '/Login'
      preLoaderRoute: typeof GuestLoginImport
      parentRoute: typeof GuestImport
    }
    '/_guest/Register': {
      id: '/_guest/Register'
      path: '/Register'
      fullPath: '/Register'
      preLoaderRoute: typeof GuestRegisterImport
      parentRoute: typeof GuestImport
    }
    '/_guest/Subscriptions': {
      id: '/_guest/Subscriptions'
      path: '/Subscriptions'
      fullPath: '/Subscriptions'
      preLoaderRoute: typeof GuestSubscriptionsImport
      parentRoute: typeof GuestImport
    }
    '/_guest/about': {
      id: '/_guest/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof GuestAboutImport
      parentRoute: typeof GuestImport
    }
    '/_guest/': {
      id: '/_guest/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof GuestIndexImport
      parentRoute: typeof GuestImport
    }
    '/_auth/_admin/admin/Accounts': {
      id: '/_auth/_admin/admin/Accounts'
      path: '/admin/Accounts'
      fullPath: '/admin/Accounts'
      preLoaderRoute: typeof AuthAdminAdminAccountsImport
      parentRoute: typeof AuthAdminImport
    }
    '/_auth/_admin/admin/MyAdmin': {
      id: '/_auth/_admin/admin/MyAdmin'
      path: '/admin/MyAdmin'
      fullPath: '/admin/MyAdmin'
      preLoaderRoute: typeof AuthAdminAdminMyAdminImport
      parentRoute: typeof AuthAdminImport
    }
    '/_auth/_admin/admin/Team': {
      id: '/_auth/_admin/admin/Team'
      path: '/admin/Team'
      fullPath: '/admin/Team'
      preLoaderRoute: typeof AuthAdminAdminTeamImport
      parentRoute: typeof AuthAdminImport
    }
    '/_auth/_admin/admin/Uploader': {
      id: '/_auth/_admin/admin/Uploader'
      path: '/admin/Uploader'
      fullPath: '/admin/Uploader'
      preLoaderRoute: typeof AuthAdminAdminUploaderImport
      parentRoute: typeof AuthAdminImport
    }
  }
}

// Create and export the route tree

interface AuthAdminRouteChildren {
  AuthAdminAdminAccountsRoute: typeof AuthAdminAdminAccountsRoute
  AuthAdminAdminMyAdminRoute: typeof AuthAdminAdminMyAdminRoute
  AuthAdminAdminTeamRoute: typeof AuthAdminAdminTeamRoute
  AuthAdminAdminUploaderRoute: typeof AuthAdminAdminUploaderRoute
}

const AuthAdminRouteChildren: AuthAdminRouteChildren = {
  AuthAdminAdminAccountsRoute: AuthAdminAdminAccountsRoute,
  AuthAdminAdminMyAdminRoute: AuthAdminAdminMyAdminRoute,
  AuthAdminAdminTeamRoute: AuthAdminAdminTeamRoute,
  AuthAdminAdminUploaderRoute: AuthAdminAdminUploaderRoute,
}

const AuthAdminRouteWithChildren = AuthAdminRoute._addFileChildren(
  AuthAdminRouteChildren,
)

interface AuthRouteChildren {
  AuthMatchStatsRoute: typeof AuthMatchStatsRoute
  AuthStatisticsRoute: typeof AuthStatisticsRoute
  AuthAdminRoute: typeof AuthAdminRouteWithChildren
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthMatchStatsRoute: AuthMatchStatsRoute,
  AuthStatisticsRoute: AuthStatisticsRoute,
  AuthAdminRoute: AuthAdminRouteWithChildren,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface GuestRouteChildren {
  GuestLoginRoute: typeof GuestLoginRoute
  GuestRegisterRoute: typeof GuestRegisterRoute
  GuestSubscriptionsRoute: typeof GuestSubscriptionsRoute
  GuestAboutRoute: typeof GuestAboutRoute
  GuestIndexRoute: typeof GuestIndexRoute
}

const GuestRouteChildren: GuestRouteChildren = {
  GuestLoginRoute: GuestLoginRoute,
  GuestRegisterRoute: GuestRegisterRoute,
  GuestSubscriptionsRoute: GuestSubscriptionsRoute,
  GuestAboutRoute: GuestAboutRoute,
  GuestIndexRoute: GuestIndexRoute,
}

const GuestRouteWithChildren = GuestRoute._addFileChildren(GuestRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof AuthAdminRouteWithChildren
  '/MatchStats': typeof AuthMatchStatsRoute
  '/Statistics': typeof AuthStatisticsRoute
  '/Login': typeof GuestLoginRoute
  '/Register': typeof GuestRegisterRoute
  '/Subscriptions': typeof GuestSubscriptionsRoute
  '/about': typeof GuestAboutRoute
  '/': typeof GuestIndexRoute
  '/admin/Accounts': typeof AuthAdminAdminAccountsRoute
  '/admin/MyAdmin': typeof AuthAdminAdminMyAdminRoute
  '/admin/Team': typeof AuthAdminAdminTeamRoute
  '/admin/Uploader': typeof AuthAdminAdminUploaderRoute
}

export interface FileRoutesByTo {
  '': typeof AuthAdminRouteWithChildren
  '/MatchStats': typeof AuthMatchStatsRoute
  '/Statistics': typeof AuthStatisticsRoute
  '/Login': typeof GuestLoginRoute
  '/Register': typeof GuestRegisterRoute
  '/Subscriptions': typeof GuestSubscriptionsRoute
  '/about': typeof GuestAboutRoute
  '/': typeof GuestIndexRoute
  '/admin/Accounts': typeof AuthAdminAdminAccountsRoute
  '/admin/MyAdmin': typeof AuthAdminAdminMyAdminRoute
  '/admin/Team': typeof AuthAdminAdminTeamRoute
  '/admin/Uploader': typeof AuthAdminAdminUploaderRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_auth': typeof AuthRouteWithChildren
  '/_guest': typeof GuestRouteWithChildren
  '/_auth/MatchStats': typeof AuthMatchStatsRoute
  '/_auth/Statistics': typeof AuthStatisticsRoute
  '/_auth/_admin': typeof AuthAdminRouteWithChildren
  '/_guest/Login': typeof GuestLoginRoute
  '/_guest/Register': typeof GuestRegisterRoute
  '/_guest/Subscriptions': typeof GuestSubscriptionsRoute
  '/_guest/about': typeof GuestAboutRoute
  '/_guest/': typeof GuestIndexRoute
  '/_auth/_admin/admin/Accounts': typeof AuthAdminAdminAccountsRoute
  '/_auth/_admin/admin/MyAdmin': typeof AuthAdminAdminMyAdminRoute
  '/_auth/_admin/admin/Team': typeof AuthAdminAdminTeamRoute
  '/_auth/_admin/admin/Uploader': typeof AuthAdminAdminUploaderRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
  | ''
  | '/MatchStats'
  | '/Statistics'
  | '/Login'
  | '/Register'
  | '/Subscriptions'
  | '/about'
  | '/'
  | '/admin/Accounts'
  | '/admin/MyAdmin'
  | '/admin/Team'
  | '/admin/Uploader'
  fileRoutesByTo: FileRoutesByTo
  to:
  | ''
  | '/MatchStats'
  | '/Statistics'
  | '/Login'
  | '/Register'
  | '/Subscriptions'
  | '/about'
  | '/'
  | '/admin/Accounts'
  | '/admin/MyAdmin'
  | '/admin/Team'
  | '/admin/Uploader'
  id:
  | '__root__'
  | '/_auth'
  | '/_guest'
  | '/_auth/MatchStats'
  | '/_auth/Statistics'
  | '/_auth/_admin'
  | '/_guest/Login'
  | '/_guest/Register'
  | '/_guest/Subscriptions'
  | '/_guest/about'
  | '/_guest/'
  | '/_auth/_admin/admin/Accounts'
  | '/_auth/_admin/admin/MyAdmin'
  | '/_auth/_admin/admin/Team'
  | '/_auth/_admin/admin/Uploader'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthRoute: typeof AuthRouteWithChildren
  GuestRoute: typeof GuestRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AuthRoute: AuthRouteWithChildren,
  GuestRoute: GuestRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_auth",
        "/_guest"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/MatchStats",
        "/_auth/Statistics",
        "/_auth/_admin"
      ]
    },
    "/_guest": {
      "filePath": "_guest.tsx",
      "children": [
        "/_guest/Login",
        "/_guest/Register",
        "/_guest/Subscriptions",
        "/_guest/about",
        "/_guest/"
      ]
    },
    "/_auth/MatchStats": {
      "filePath": "_auth/MatchStats.tsx",
      "parent": "/_auth"
    },
    "/_auth/Statistics": {
      "filePath": "_auth/Statistics.tsx",
      "parent": "/_auth"
    },
    "/_auth/_admin": {
      "filePath": "_auth/_admin.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/_admin/admin/Accounts",
        "/_auth/_admin/admin/MyAdmin",
        "/_auth/_admin/admin/Team",
        "/_auth/_admin/admin/Uploader"
      ]
    },
    "/_guest/Login": {
      "filePath": "_guest/Login.tsx",
      "parent": "/_guest"
    },
    "/_guest/Register": {
      "filePath": "_guest/Register.tsx",
      "parent": "/_guest"
    },
    "/_guest/Subscriptions": {
      "filePath": "_guest/Subscriptions.tsx",
      "parent": "/_guest"
    },
    "/_guest/about": {
      "filePath": "_guest/about.tsx",
      "parent": "/_guest"
    },
    "/_guest/": {
      "filePath": "_guest/index.tsx",
      "parent": "/_guest"
    },
    "/_auth/_admin/admin/Accounts": {
      "filePath": "_auth/_admin/admin/Accounts.tsx",
      "parent": "/_auth/_admin"
    },
    "/_auth/_admin/admin/MyAdmin": {
      "filePath": "_auth/_admin/admin/MyAdmin.tsx",
      "parent": "/_auth/_admin"
    },
    "/_auth/_admin/admin/Team": {
      "filePath": "_auth/_admin/admin/Team.tsx",
      "parent": "/_auth/_admin"
    },
    "/_auth/_admin/admin/Uploader": {
      "filePath": "_auth/_admin/admin/Uploader.tsx",
      "parent": "/_auth/_admin"
    }
  }
}
ROUTE_MANIFEST_END */
