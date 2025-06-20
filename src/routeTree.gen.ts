/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProfileImport } from './routes/profile'
import { Route as LoginImport } from './routes/login'
import { Route as IndexImport } from './routes/index'
import { Route as UsersIndexImport } from './routes/users/index'
import { Route as CouponsIndexImport } from './routes/coupons/index'
import { Route as UsersIdImport } from './routes/users/$id'
import { Route as CouponsUsedImport } from './routes/coupons/used'
import { Route as CouponsIdImport } from './routes/coupons/$id'

// Create/Update Routes

const ProfileRoute = ProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const UsersIndexRoute = UsersIndexImport.update({
  id: '/users/',
  path: '/users/',
  getParentRoute: () => rootRoute,
} as any)

const CouponsIndexRoute = CouponsIndexImport.update({
  id: '/coupons/',
  path: '/coupons/',
  getParentRoute: () => rootRoute,
} as any)

const UsersIdRoute = UsersIdImport.update({
  id: '/users/$id',
  path: '/users/$id',
  getParentRoute: () => rootRoute,
} as any)

const CouponsUsedRoute = CouponsUsedImport.update({
  id: '/coupons/used',
  path: '/coupons/used',
  getParentRoute: () => rootRoute,
} as any)

const CouponsIdRoute = CouponsIdImport.update({
  id: '/coupons/$id',
  path: '/coupons/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileImport
      parentRoute: typeof rootRoute
    }
    '/coupons/$id': {
      id: '/coupons/$id'
      path: '/coupons/$id'
      fullPath: '/coupons/$id'
      preLoaderRoute: typeof CouponsIdImport
      parentRoute: typeof rootRoute
    }
    '/coupons/used': {
      id: '/coupons/used'
      path: '/coupons/used'
      fullPath: '/coupons/used'
      preLoaderRoute: typeof CouponsUsedImport
      parentRoute: typeof rootRoute
    }
    '/users/$id': {
      id: '/users/$id'
      path: '/users/$id'
      fullPath: '/users/$id'
      preLoaderRoute: typeof UsersIdImport
      parentRoute: typeof rootRoute
    }
    '/coupons/': {
      id: '/coupons/'
      path: '/coupons'
      fullPath: '/coupons'
      preLoaderRoute: typeof CouponsIndexImport
      parentRoute: typeof rootRoute
    }
    '/users/': {
      id: '/users/'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof UsersIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/profile': typeof ProfileRoute
  '/coupons/$id': typeof CouponsIdRoute
  '/coupons/used': typeof CouponsUsedRoute
  '/users/$id': typeof UsersIdRoute
  '/coupons': typeof CouponsIndexRoute
  '/users': typeof UsersIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/profile': typeof ProfileRoute
  '/coupons/$id': typeof CouponsIdRoute
  '/coupons/used': typeof CouponsUsedRoute
  '/users/$id': typeof UsersIdRoute
  '/coupons': typeof CouponsIndexRoute
  '/users': typeof UsersIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/profile': typeof ProfileRoute
  '/coupons/$id': typeof CouponsIdRoute
  '/coupons/used': typeof CouponsUsedRoute
  '/users/$id': typeof UsersIdRoute
  '/coupons/': typeof CouponsIndexRoute
  '/users/': typeof UsersIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/login'
    | '/profile'
    | '/coupons/$id'
    | '/coupons/used'
    | '/users/$id'
    | '/coupons'
    | '/users'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/login'
    | '/profile'
    | '/coupons/$id'
    | '/coupons/used'
    | '/users/$id'
    | '/coupons'
    | '/users'
  id:
    | '__root__'
    | '/'
    | '/login'
    | '/profile'
    | '/coupons/$id'
    | '/coupons/used'
    | '/users/$id'
    | '/coupons/'
    | '/users/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LoginRoute: typeof LoginRoute
  ProfileRoute: typeof ProfileRoute
  CouponsIdRoute: typeof CouponsIdRoute
  CouponsUsedRoute: typeof CouponsUsedRoute
  UsersIdRoute: typeof UsersIdRoute
  CouponsIndexRoute: typeof CouponsIndexRoute
  UsersIndexRoute: typeof UsersIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LoginRoute: LoginRoute,
  ProfileRoute: ProfileRoute,
  CouponsIdRoute: CouponsIdRoute,
  CouponsUsedRoute: CouponsUsedRoute,
  UsersIdRoute: UsersIdRoute,
  CouponsIndexRoute: CouponsIndexRoute,
  UsersIndexRoute: UsersIndexRoute,
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
        "/",
        "/login",
        "/profile",
        "/coupons/$id",
        "/coupons/used",
        "/users/$id",
        "/coupons/",
        "/users/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/profile": {
      "filePath": "profile.tsx"
    },
    "/coupons/$id": {
      "filePath": "coupons/$id.tsx"
    },
    "/coupons/used": {
      "filePath": "coupons/used.tsx"
    },
    "/users/$id": {
      "filePath": "users/$id.tsx"
    },
    "/coupons/": {
      "filePath": "coupons/index.tsx"
    },
    "/users/": {
      "filePath": "users/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
