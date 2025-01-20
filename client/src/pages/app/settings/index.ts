import { lazy } from 'react';

export const Settings = lazy(() =>
  import('../settings/page').then(({ SettingsPage }) => ({
    default: SettingsPage,
  }))
);
