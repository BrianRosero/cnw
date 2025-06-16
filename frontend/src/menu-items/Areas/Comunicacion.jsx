// assets
import { IconBrandLine, IconMessageCircleQuestion, IconMessages, IconMessageReport } from '@tabler/icons-react';

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const comunicacion = {
  id: 'comunicacion',
  title: 'Comunicación',
  type: 'group',
  children: [
    {
      id: 'chats',
      title: 'Mensajería y Chats',
      type: 'item',
      url: '/comunicacion/chats',
      icon: IconBrandLine,
      breadcrumbs: false,
    },
    {
      id: 'soporte',
      title: 'Soporte y Colaboración',
      type: 'item',
      url: '/comunicacion/soporte',
      icon: IconMessageCircleQuestion,
      breadcrumbs: false,
    },
    {
      id: 'foros',
      title: 'Foros y Comunicaciones',
      type: 'item',
      url: '/comunicacion/foros',
      icon: IconMessages,
      breadcrumbs: false,
    },
    {
      id: 'alertas',
      title: 'Alertas',
      type: 'item',
      url: '/comunicacion/alertas',
      icon: IconMessageReport,
      breadcrumbs: false,
    },
  ],
};

export default comunicacion;
