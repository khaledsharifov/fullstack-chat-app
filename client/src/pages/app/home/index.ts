import { lazy } from 'react';

export const Home = lazy(() =>
  import('../home/page').then(({ HomePage }) => ({ default: HomePage }))
);
