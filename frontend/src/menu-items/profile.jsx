// assets
import {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconHome,
  IconUserCircle,
  IconUserCog,
  IconDashboard,
} from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconHome,
  IconUserCircle,
  IconUserCog,
  IconDashboard
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const profile = (isVisible) => {
  // Verificar si debe mostrarse el administrador
  if (!isVisible) return null;

  return {
    id: 'profile',
    title: 'Perfil',
    type: 'group',
    children: [
      {
        id: 'home',
        key: 'home', // Agrega la clave aquí
        title: 'Home',
        type: 'item',
        url: '/profile/home',
        icon: icons.IconHome,
        breadcrumbs: false,
      },
      {
        id: 'perfil',
        key: 'perfil', // Agrega la clave aquí
        title: 'Perfil',
        type: 'item',
        url: '/profile/profile',
        icon: icons.IconUserCircle,
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
        id: 'Admin',
        key: 'Admin', // Agrega la clave aquí
        title: 'Administración',
        type: 'item',
        url: '/profile/admin',
        icon: icons.IconUserCog,
        breadcrumbs: false,
      },
      {
        id: 'User',
        key: 'User', // Agrega la clave aquí
        title: 'Usuario',
        type: 'item',
        url: '/profile/user',
        icon: icons.IconPalette,
        breadcrumbs: false,
      },
      {
        id: 'Moderator',
        key: 'Moderator', // Agrega la clave aquí
        title: 'Moderador',
        type: 'item',
        url: '/profile/moderator',
        icon: icons.IconPalette,
        breadcrumbs: false,
      },
    ],
  }
};

export default profile;
