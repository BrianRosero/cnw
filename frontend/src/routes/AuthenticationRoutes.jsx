import { lazy } from 'react';

// project imports
import Loadable from '../layout/Ui-Components/Loadable.jsx';
import MinimalLayout from '../layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('../layout/authentication/authentication3/Login3.jsx')));
const AuthRegister3 = Loadable(lazy(() => import('../layout/authentication/authentication3/Register3.jsx')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <AuthLogin3 />,
    },
    {
      path: '/register',
      element: <AuthRegister3 />,
    },
  ],
};

export default AuthenticationRoutes;
