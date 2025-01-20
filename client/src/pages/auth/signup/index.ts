import { lazy } from 'react';

export const SignUp = lazy(() =>
  import('../signup/page').then(({ SignUpPage }) => ({ default: SignUpPage }))
);
