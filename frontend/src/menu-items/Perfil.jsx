// assets
import {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconUserCircle,
  IconUserCog,
  IconDashboard,
} from '@tabler/icons-react';

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const usuarios = (isVisible) => {
  if (!isVisible) return null;

  return {
    id: 'usuarios',
    title: 'Perfil',
    type: 'group',
    children: [
      {
        id: 'perfil',
        title: 'Perfil',
        type: 'item',
        url: '/profile/profile',
        icon: IconUserCircle,
        breadcrumbs: false,
      },
      {
        id: 'Admin',
        title: 'Gestion de Perfil',
        type: 'item',
        url: '/profile/admin',
        icon: IconUserCog,
        breadcrumbs: false,
      },
    ],
  }
};

export default usuarios;
