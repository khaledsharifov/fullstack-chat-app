import { lazy } from 'react';

export const Login = lazy(() =>
  import('../login/page').then(({ LoginPage }) => ({ default: LoginPage }))
);
