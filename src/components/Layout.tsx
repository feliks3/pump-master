import { Outlet } from 'react-router-dom';
import Header from './Header';

const AppLayout = () => {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4">
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
