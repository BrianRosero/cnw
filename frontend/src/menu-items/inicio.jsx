// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconHome, } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconHome,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const inicio = {
  id: 'inicio',
  title: 'Inicio',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Inicio',
      type: 'item',
      url: '/inicio/inicio',
      icon: icons.IconHome,
      breadcrumbs: false,
    },
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '/inicio/home',
      icon: icons.IconHome,
      breadcrumbs: false,
    },
  ],
};

export default inicio;
