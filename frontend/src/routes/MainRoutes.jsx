import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout/index.jsx';
import Loadable from '../ui-component/Loadable.jsx';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default/index.jsx')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('../views/utilities/Typography.jsx')));
const UtilsColor = Loadable(lazy(() => import('../views/utilities/Color.jsx')));
const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow.jsx')));
const UtilsMaterialIcons = Loadable(lazy(() => import('../views/utilities/MaterialIcons.jsx')));
const UtilsTablerIcons = Loadable(lazy(() => import('../views/utilities/TablerIcons.jsx')));

import Home from '../views/pages/Home.jsx';
import Profile from '../views/pages/Profile.jsx';
import BoardUser from '../views/pages/BoardUser.jsx';
import BoardAdmin from '../views/pages/BoardAdmin.jsx';

// sample page routing
const SamplePage = Loadable(lazy(() => import('../views/sample-page/index.jsx')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />,
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: 'profile',
      children: [
        {
          path: 'home',
          element: <Home />,
        },
      ],
    },
    {
      path: 'profile',
      children: [
        {
          path: 'profile',
          element: <Profile />,
        },
      ],
    },
    {
      path: 'profile',
      children: [
        {
          path: 'user',
          element: <BoardUser />,
        },
      ],
    },
    {
      path: 'profile',
      children: [
        {
          path: 'admin',
          element: <BoardAdmin />,
        },
      ],
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />,
        },
      ],
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />,
        },
      ],
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />,
        },
      ],
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />,
        },
      ],
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />,
        },
      ],
    },
    {
      path: 'sample-page',
      element: <SamplePage />,
    },
  ],
};

export default MainRoutes;
