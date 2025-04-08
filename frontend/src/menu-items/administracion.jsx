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

const administracion = {
  id: 'administracion',
  title: 'Administración y Configuración',
  type: 'group',
  children: [
    {
      id: 'administracion',
      title: 'Panel de Administracion',
      type: 'item',
      url: '/administracion/panel',
      icon: icons.IconTypography,
      breadcrumbs: false,
    },
    {
      id: 'estadisticas',
      title: 'Estadisticas',
      type: 'item',
      url: '/administracion/estadisticas',
      icon: icons.IconPalette,
      breadcrumbs: false,
    },
    {
      id: 'perfil',
      title: 'Perfil',
      type: 'item',
      url: '/administracion/perfil',
      icon: icons.IconShadow,
      breadcrumbs: false,
    },
  ],
};

export default administracion;
