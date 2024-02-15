import { lazy } from 'react';

// project imports
import Loadable from '../../ui-component/Loadable';
import MinimalLayout from '../../layout/layoutAdmin/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('../../views//authentication/authentication3/Login3.jsx')));
const AuthRegister3 = Loadable(lazy(() => import('../../views/authentication/authentication3/Register3.jsx')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/pages/login/login3',
      element: <AuthLogin3 />
    },
    {
      path: '/pages/register/register3',
      element: <AuthRegister3 />
    }
  ]
};

export default AuthenticationRoutes;