// assets
import { IconClipboardData, IconTransactionDollar, IconAd2 } from '@tabler/icons-react';

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const clientes = {
  id: 'clientes',
  title: 'Clientes y Servicios',
  type: 'group',
  children: [
    {
      id: 'crm',
      title: 'CRM',
      type: 'item',
      url: '/clientes/crm',
      icon: IconClipboardData,
      breadcrumbs: false,
    },
    /*{
      id: 'gestion-comercial',
      title: 'Gestión Comercial',
      type: 'item',
      url: '/clientes/gestion-comercial',
      icon: IconTransactionDollar,
      breadcrumbs: false,
    },
    {
      id: 'gestion-documental',
      title: 'Gestión Documental',
      type: 'item',
      url: '/clientes/gestion-documental',
      icon: IconAd2,
      breadcrumbs: false,
    },*/
  ],
};

export default clientes;
