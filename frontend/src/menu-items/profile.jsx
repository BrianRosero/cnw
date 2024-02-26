// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const profile = {
  id: 'profile',
  title: 'Profile',
  type: 'group',
  children: [
    {
      id: 'Home',
      title: 'Home',
      type: 'item',
      url: '/profile/home',
      icon: icons.IconTypography,
      breadcrumbs: false,
    },
    {
      id: 'profile',
      title: 'profile',
      type: 'item',
      url: '/profile/profile',
      icon: icons.IconPalette,
      breadcrumbs: false,
    },
    {
      id: 'Admin',
      title: 'Admin',
      type: 'item',
      url: '/profile/admin',
      icon: icons.IconPalette,
      breadcrumbs: false,
    },
  ],
};

export default profile;
