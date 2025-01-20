import { AppRoutes } from '@constants';
import { Layout } from '@layout';
import { Home, Login, Profile, Settings, SignUp } from '@pages';
import { useAuthStore } from '@store';
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export const RouteList = () => {
  const { authUser } = useAuthStore();

  return (
    <Suspense
      fallback={
        <span className="loading loading-spinner loading-lg m-auto flex h-screen justify-center" />
      }
    >
      <Routes>
        <Route path={AppRoutes.Home} element={<Layout />}>
          {/* auth */}
          <Route
            path={AppRoutes.Login}
            element={!authUser ? <Login /> : <Navigate to={AppRoutes.Home} />}
          />
          <Route
            path={AppRoutes.SignUp}
            element={!authUser ? <SignUp /> : <Navigate to={AppRoutes.Home} />}
          />

          {/* app */}
          <Route
            index
            element={authUser ? <Home /> : <Navigate to={AppRoutes.Login} />}
          />
          <Route
            path={AppRoutes.Profile}
            element={authUser ? <Profile /> : <Navigate to={AppRoutes.Login} />}
          />
          <Route path={AppRoutes.Settings} element={<Settings />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
