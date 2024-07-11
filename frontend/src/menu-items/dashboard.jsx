// assets
import { IconDashboard, IconTimeline, IconAlignBoxBottomCenter, IconHome } from '@tabler/icons-react';

// constant
const icons = { IconDashboard, IconTimeline, IconAlignBoxBottomCenter, IconHome };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //


const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Inicio',
      type: 'item',
      url: '/dashboard/inicio',
      icon: icons.IconHome,
      breadcrumbs: false,
    },
    {
      id: 'panel',
      title: 'Panel de control',
      type: 'item',
      url: '/dashboard/panel-de-control',
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    /*{
      id: 'rendimiento',
      title: 'Rendimiento',
      type: 'item',
      url: '/dashboard/rendimiento',
      icon: icons.IconTimeline,
      breadcrumbs: false,
    },
    {
      id: 'crm',
      title: 'CRM',
      type: 'item',
      url: '/dashboard/crm',
      icon: icons.IconAlignBoxBottomCenter,
      breadcrumbs: false,
    },
    {
      id: 'BoardAdministrator',
      title: 'BoardAdministrator',
      type: 'item',
      url: '/dashboard/BoardAdministrator',
      icon: icons.IconAlignBoxBottomCenter,
      breadcrumbs: false,
    },
    {
      id: 'BoarModerator',
      title: 'ESE CENTRO',
      type: 'item',
      url: '/dashboard/BoardModerator',
      icon: icons.IconAlignBoxBottomCenter,
      breadcrumbs: false,
    },
    {
      id: 'BoarESECENTRO',
      title: 'Administración',
      type: 'item',
      url: '/dashboard/BoardESECENTRO',
      icon: icons.IconAlignBoxBottomCenter,
      breadcrumbs: false,
    },*/
  ],
};

export default dashboard;