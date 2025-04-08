import { IconDashboard, IconTimeline, IconAlignBoxBottomCenter, IconHome } from '@tabler/icons-react';
const icons = { IconDashboard, IconTimeline, IconAlignBoxBottomCenter, IconHome };

const user = (isVisible = false) => {
  // Verificar si debe mostrarse el administrador
  if (!isVisible) return null;

  return {
    id: 'user',
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
        id: 'Statistics',
        title: 'Estadisticas',
        type: 'item',
        url: '/dashboard/Statistics',
        icon: icons.IconAlignBoxBottomCenter,
        breadcrumbs: false,
      },
    ],
  };
};

export default user;
