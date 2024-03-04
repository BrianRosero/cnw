// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconHome, IconUserCircle,IconUserCog } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconHome,
  IconUserCircle,
  IconUserCog,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const profile = {
  id: 'profile',
  title: 'Perfil',
  type: 'group',
  children: [
    {
      id: 'Home',
      title: 'Home',
      type: 'item',
      url: '/profile/home',
      icon: icons.IconHome,
      breadcrumbs: false,
    },
    {
      id: 'profile',
      title: 'Perfil',
      type: 'item',
      url: '/profile/profile',
      icon: icons.IconUserCircle,
      breadcrumbs: false,
    },
    {
      id: 'Admin',
      title: 'Administración',
      type: 'item',
      url: '/profile/admin',
      icon: icons.IconUserCog,
      breadcrumbs: false,
    },
   /* {
      id: 'User',
      title: 'Usuario',
      type: 'item',
      url: '/profile/user',
      icon: icons.IconPalette,
      breadcrumbs: false,
    },*/
    /*{
      id: 'Moderator',
      title: 'Moderador',
      type: 'item',
      url: '/profile/moderator',
      icon: icons.IconPalette,
      breadcrumbs: false,
    },*/
  ],
};

export default profile;
