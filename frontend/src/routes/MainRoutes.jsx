import { lazy } from 'react';
import { useAuth } from '../services/AuthContext';

// project imports
import MainLayout from '../layout/MainLayout/index.jsx';
import Loadable from '../ui-component/Loadable.jsx';

// administrador routing
const DashboardDefault1 = Loadable(lazy(() => import('../views/pages/Consulnetworks.jsx')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('../views/pages/utilities/Typography.jsx')));
const UtilsColor = Loadable(lazy(() => import('../views/pages/utilities/Color.jsx')));
const UtilsShadow = Loadable(lazy(() => import('../views/pages/utilities/Shadow.jsx')));
const UtilsMaterialIcons = Loadable(lazy(() => import('../views/pages/utilities/MaterialIcons.jsx')));
const UtilsTablerIcons = Loadable(lazy(() => import('../views/pages/utilities/TablerIcons.jsx')));

const Graficos = Loadable(lazy(() => import('../views/dashboard/Default/index.jsx')));

import Panel from '../layout/pages/Panel-Monitoreo/WAVE-DC/default/index.jsx';
import Datacenter from '../layout/pages/Clientes-Datacenter/INICIO/Panel.jsx';
import PrtgMonitoreo from '../layout/pages/Clientes-Datacenter/INICIO/Panel.jsx';

import Home from '../views/pages/Home.jsx';
import Profile from '../views/pages/Perfil/Profile.jsx';
import Administrador from '../views/pages/Administrador.jsx';
import Kanban from '../layout/pages/Panel-Monitoreo//WAVE-DC/GLAKECNW';
import Estadisticas from '../views/pages/Estadisticas.jsx';
import BoardModerator from '../views/pages/BoardModerator.jsx';
import Rendimiento from '../views/pages/Rendimiento.jsx';
//import Chat from '../layout/dashboards/GLAKECNW/Datastores.jsx';
import Chat from '../layout/pages/Panel-Monitoreo/WAVE-DC/default/index.jsx';
import Calendario from '../views/pages/Calendario.jsx';
//import CRM from '../layout/dashboards/crm';
import CRM from '../views/pages/CRM/test.jsx'
import Consulnetworks from '../views/pages/Consulnetworks.jsx';
import Preguntas from '../views/pages/Preguntas.jsx';
import Reportes from '../views/pages/Reportes.jsx';
import Tickets from '../views/pages/Tickets.jsx';
import BoardAdmin from '../views/pages/BoardAdmin.jsx';
import BoardUser from '../views/pages/api/vsphere.jsx';

import Statistics from '@/views/pages/statistics.jsx';

// sample page routing
const SamplePage = Loadable(lazy(() => import('../views/pages/sample-page/index.jsx')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = () => {
  const { isAdmin, isUser } = useAuth(); // Obtener estado de administrador del contexto

  return {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <DashboardDefault1 />,
      },
      // Rutas de Dashboard (condicionales para administradores)
      ...(isAdmin
        ? [
          {
            path: 'control',
            children: [
              { path: 'panel-de-control', element: <Panel /> },
              { path: 'datacenter', element: <Datacenter />, },
              { path: 'prtg', element: <PrtgMonitoreo />, },

              { path: 'crm', element: <CRM /> },
              { path: 'rendimiento', element: <Rendimiento /> },
              { path: 'BoardAdministrator', element: <BoardAdmin /> },
              { path: 'Statistics', element: <Statistics /> },
              // Otras rutas de Dashboard para administradores
            ],
          },
        ]
        : []), // Si no es admin, omite el grupo de rutas de Dashboard
      ...(isAdmin
        ? [
          {
            path: 'gestion',
            children: [
              { path: 'crm', element: <CRM /> },
              { path: 'tickets', element: <Tickets /> },
              { path: 'monitoreo-int', element: <Tickets /> },
              // Otras rutas de Dashboard para administradores
            ],
          },
        ]
        : []), // Si no es admin, omite el grupo de rutas de Dashboard
      ...(isAdmin
        ? [
          {
            path: 'comunicacion',
            children: [
              { path: 'chat', element: <CRM /> },
              { path: 'tickets1', element: <Tickets /> },
              { path: 'helpdesk', element: <Tickets /> },
              { path: 'email', element: <Tickets /> },
              // Otras rutas de Dashboard para administradores
            ],
          },
        ]
        : []), // Si no es admin, omite el grupo de rutas de Dashboard
      ...(isAdmin
        ? [
          {
            path: 'administracion',
            children: [
              { path: 'panel', element: <Tickets /> },
              { path: 'estadisticas', element: <Tickets /> },
              { path: 'Perfil', element: <Tickets /> },
              // Otras rutas de Dashboard para administradores
            ],
          },
        ]
        : []), // Si no es admin, omite el grupo de rutas de Dashboard
      // Rutas de Dashboard (condicionales para administradores)
      ...(isUser
        ? [
          {
            path: 'dashboard',
            children: [
              { path: 'Statistics', element: <Statistics /> },
              // Otras rutas de Dashboard para Usuarios
            ],
          },
        ]
        : []), // Si no es admin, omite el grupo de rutas de Dashboard
      {
        path: 'inicio',
        children: [
          {
            path: 'inicio',
            element: <DashboardDefault1/>,
          },
        ],
      },
      {
        path: 'inicio',
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
};

export default MainRoutes;