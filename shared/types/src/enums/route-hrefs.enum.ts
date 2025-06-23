import { Routes } from './routes.enum';

export const RouteHrefs = {
  [Routes.login]: '/login',
  [Routes.dashboard]: '/dashboard',
  [Routes.home]: '/',
  [Routes.users]: '/users',
  [Routes.user]: (id: number) => `/users/${id}`,
} as const;

export type RouteHrefs = (typeof RouteHrefs)[keyof typeof RouteHrefs];
