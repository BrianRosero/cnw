import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout/index.jsx';
import Loadable from '../ui-component/Loadable.jsx';

// dashboard routing
const DashboardDefault1 = Loadable(lazy(() => import('../views/pages/Consulnetworks.jsx')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('../views/pages/utilities/Typography.jsx')));
const UtilsColor = Loadable(lazy(() => import('../views/pages/utilities/Color.jsx')));
const UtilsShadow = Loadable(lazy(() => import('../views/pages/utilities/Shadow.jsx')));
const UtilsMaterialIcons = Loadable(lazy(() => import('../views/pages/utilities/MaterialIcons.jsx')));
const UtilsTablerIcons = Loadable(lazy(() => import('../views/pages/utilities/TablerIcons.jsx')));

const Graficos = Loadable(lazy(() => import('../views/dashboard/Default/index.jsx')));
const Panel = Loadable(lazy(() => import('../views/pages/INICIO/Panel.jsx')));

import Home from '../views/pages/Home.jsx';
import Profile from '../views/pages/Profile.jsx';
import Administrador from '../views/pages/Administrador.jsx';
import Kanban from '../views/pages/Kanban.jsx';
import Estadisticas from '../views/pages/Estadisticas.jsx';
import BoardModerator from '@/views/pages/BoardModerator.jsx';
import Rendimiento from '../views/pages/Rendimiento.jsx';
import Chat from '../views/pages/Chat.jsx';
import Calendario from '../views/pages/Calendario.jsx';
import CRM from '../views/pages/CRM.jsx';
import Consulnetworks from '@/views/pages/Consulnetworks.jsx';
import Preguntas from '@/views/pages/Preguntas.jsx';
import Reportes from '@/views/pages/Reportes.jsx';
import Tickets from '@/views/pages/Tickets.jsx';
import BoardAdmin from '@/views/pages/BoardAdmin.jsx';
import BoardUser from '@/views/pages/BoardUser.jsx';
import BoardESECENTRO from '@/views/pages/ESECENTRO/Prueba/BoardESECENTRO2.jsx';

// sample page routing
const SamplePage = Loadable(lazy(() => import('../views/pages/sample-page/index.jsx')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault1 />,
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'inicio',
          element: <DashboardDefault1 />,
        },
      ],
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'panel-de-control',
          element: <Panel />,
        },
      ],
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'crm',
          element: <CRM />,
        },
      ],
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'rendimiento',
          element: <Rendimiento />,
        },
      ],
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'BoardAdministrator',
          element: <BoardAdmin />,
        },
      ],
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'BoardModerator',
          element: <BoardModerator />,
        },
      ],
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'BoardESECENTRO',
          element: <BoardESECENTRO />,
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
          element: <Administrador />,
        },
      ],
    },
    {
      path: 'profile',
      children: [
        {
          path: 'moderator',
          element: <BoardModerator />,
        },
      ],
    },
    {
      path: 'widget',
      children: [
        {
          path: 'kanban',
          element: <Kanban />,
        },
      ],
    },
    {
      path: 'widget',
      children: [
        {
          path: 'chat',
          element: <Chat />,
        },
      ],
    },
    {
      path: 'widget',
      children: [
        {
          path: 'calendar',
          element: <Calendario />,
        },
      ],
    },
    {
      path: 'widget',
      children: [
        {
          path: 'estadistics',
          element: <Estadisticas />,
        },
      ],
    },
    {
      path: 'widget',
      children: [
        {
          path: 'reports',
          element: <Reportes />,
        },
      ],
    },
    {
      path: 'integrations',
      children: [
        {
          path: 'consulnetworks',
          element: <Consulnetworks />,
        },
      ],
    },
    {
      path: 'widget',
      children: [
        {
          path: 'tickets',
          element: <Tickets />,
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
    {
      path: 'others',
      children: [
        {
          path: 'preguntas',
          element: <Preguntas />,
        },
      ],
    },
  ],
};

export default MainRoutes;
