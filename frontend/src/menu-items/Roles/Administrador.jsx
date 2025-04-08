import { IconDashboard, IconTimeline, IconAlignBoxBottomCenter, IconHome } from '@tabler/icons-react';
const icons = { IconDashboard, IconTimeline, IconAlignBoxBottomCenter, IconHome };

const administrador = (isVisible = false) => {
  // Verificar si debe mostrarse el administrador
  if (!isVisible) return null;

  return {
    id: 'administrador',
    title: 'Panel de Control',
    type: 'group',
    children: [
      {
        id: 'panel',
        title: 'Panel de control',
        type: 'item',
        url: '/control/panel-de-control',
        icon: icons.IconDashboard,
        breadcrumbs: false,
      },
      {
        id: 'datacenter',
        title: 'Clientes Datacenter',
        type: 'item',
        url: '/control/datacenter',
        icon: icons.IconTimeline,
        breadcrumbs: false,
      },
      {
        id: 'prtg',
        title: 'Prtg Monitoreo',
        type: 'item',
        url: '/control/prtg',
        icon: icons.IconTimeline,
        breadcrumbs: false,
      },
    ],
  };
};

export default administrador;
