import { useEffect } from 'react';
import { useAuthStore, useThemeStore } from '@store';

import { RouteList } from './routes';

export const Routes = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <span className="loading loading-spinner loading-lg m-auto flex h-screen justify-center" />
    );

  return (
    <div data-theme={theme}>
      <RouteList />
    </div>
  );
};
