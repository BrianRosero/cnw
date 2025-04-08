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

const gestion = {
  id: 'gestion',
  title: 'Gestion Empresarial',
  type: 'group',
  children: [
    {
      id: 'crm',
      title: 'CRM',
      type: 'item',
      url: '/gestion/crm',
      icon: icons.IconAlignBoxBottomCenter,
      breadcrumbs: false,
    },
    // más elementos del administrador...
    {
      id: 'tickets',
      title: 'Tickets',
      type: 'item',
      url: '/gestion/tickets',
      icon: icons.IconAlignBoxBottomCenter,
      breadcrumbs: false,
    },
    {
      id: 'monitoreo',
      title: 'Monitoreo Interno',
      type: 'item',
      url: '/gestion/monitoreo-int',
      icon: icons.IconAlignBoxBottomCenter,
      breadcrumbs: false,
    },
  ],
};

export default gestion;