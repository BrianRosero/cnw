import { IconDashboard, IconTimeline, IconAlignBoxBottomCenter, IconHome } from '@tabler/icons-react';
const icons = { IconDashboard, IconTimeline, IconAlignBoxBottomCenter, IconHome };

const administrador = (isVisible = false) => {
  // Verificar si debe mostrarse el administrador
  if (!isVisible) return null;

  return {
    id: 'administrador',
    title: 'Dashboard',
    type: 'group',
    children: [
      /*{
        id: 'default',
        title: '1 Inicio',
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
      {
        id: 'rendimiento',
        title: 'Rendimiento',
        type: 'item',
        url: '/dashboard/rendimiento',
        icon: icons.IconTimeline,
        breadcrumbs: false,
      },*/
      {
        id: 'crm',
        title: 'CRM',
        type: 'item',
        url: '/dashboard/crm',
        icon: icons.IconAlignBoxBottomCenter,
        breadcrumbs: false,
      },
      // más elementos del administrador...
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
      /*{
        id: 'BoarESECENTRO',
        title: 'Administración',
        type: 'item',
        url: '/dashboard/BoardESECENTRO',
        icon: icons.IconAlignBoxBottomCenter,
        breadcrumbs: false,
      },
      {
        id: 'Statistics',
        title: 'Estadisticas',
        type: 'item',
        url: '/dashboard/Statistics',
        icon: icons.IconAlignBoxBottomCenter,
        breadcrumbs: false,
      },*/
    ],
  };
};

export default administrador;
