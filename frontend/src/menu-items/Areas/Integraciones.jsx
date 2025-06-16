import { IconWebhook, IconLayersIntersect} from '@tabler/icons-react';

const integraciones = {
  id: 'integraciones',
  title: 'Integraciones',
  type: 'group',
  children: [
    {
      id: 'sistemas corporativos',
      title: 'Sistemas Corporativos',
      type: 'item',
      url: '/integraciones/sistemas corporativos',
      icon: IconWebhook,
      breadcrumbs: false,
    },
    {
      id: 'automatizacion y conectividad',
      title: 'Automatización y Conectividad',
      type: 'item',
      url: '/integraciones/automatizacion y conectividad',
      icon: IconLayersIntersect,
      breadcrumbs: false,
    },
  ],
};

export default integraciones;
