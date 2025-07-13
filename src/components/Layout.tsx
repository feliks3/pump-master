import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <h1>
      <p>app layout</p>
      <Outlet />
    </h1>
  );
};

export default AppLayout;
