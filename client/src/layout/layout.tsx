import { Header } from '@components';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div>
      <div className="h-16 lg:h-auto">
        <Header />
      </div>
      <Outlet />
    </div>
  );
};
