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

const comunicacion = {
  id: 'comunicacion',
  title: 'Comunicación y Soporte',
  type: 'group',
  children: [
    {
      id: 'chat',
      title: 'Chat',
      type: 'item',
      url: '/comunicacion/chat',
      icon: icons.IconTypography,
      breadcrumbs: false,
    },
    {
      id: 'tickets1',
      title: 'Tickets',
      type: 'item',
      url: '/comunicacion/tickets1',
      icon: icons.IconPalette,
      breadcrumbs: false,
    },
    {
      id: 'helpdesk',
      title: 'HelpDesk',
      type: 'item',
      url: '/comunicacion/email',
      icon: icons.IconShadow,
      breadcrumbs: false,
    },
  ],
};

export default comunicacion;
