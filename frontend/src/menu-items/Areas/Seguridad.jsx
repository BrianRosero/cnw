// assets
import { IconLock, IconScanEye,} from '@tabler/icons-react';

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const seguridad = {
  id: 'seguridads',
  title: 'Seguridad',
  type: 'group',
  children: [
    {
      id: 'seguridads',
      title: 'Gestion de Seguridad',
      type: 'item',
      url: '/seguridads/seguridad',
      icon: IconLock,
      breadcrumbs: false,
    },
    {
      id: 'monitoreos',
      title: 'Monitoreo y Prevención',
      type: 'item',
      url: '/seguridads/monitoreos',
      icon: IconScanEye,
      breadcrumbs: false,
    },
  ],
};

export default seguridad;
