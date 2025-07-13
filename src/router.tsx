import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './components/Layout';
import PumpsPage from './features/pumps/PumpsPage';
import LoginPage from './features/auth/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'pumps', element: <PumpsPage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
