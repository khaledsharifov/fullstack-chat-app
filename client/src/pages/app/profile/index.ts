import { lazy } from 'react';

export const Profile = lazy(() =>
  import('../profile/page').then(({ ProfilePage }) => ({
    default: ProfilePage,
  }))
);
