export const Routes = {
  login: 'login',
  dashboard: 'dashboard',
  home: 'home',
  users: 'users',
  user: 'user',
} as const;

export type Routes = (typeof Routes)[keyof typeof Routes];
