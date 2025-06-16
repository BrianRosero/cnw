// assets
import {IconReceipt, IconCoin, IconZoomMoney,IconMessage2Dollar } from '@tabler/icons-react';

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const gestionfi = {
  id: 'gestion financiera',
  title: 'Gestion Financiera',
  type: 'group',
  children: [
    {
      id: 'facturacion',
      title: 'Facturacion y Pagos',
      type: 'item',
      url: '/gestion financiera/facturacion',
      icon: IconReceipt,
      breadcrumbs: false,
    },
    {
      id: 'comisiones',
      title: 'Esquema de Comisiones',
      type: 'item',
      url: '/gestion financiera/comisiones',
      icon: IconCoin,
      breadcrumbs: false,
    },
    {
      id: 'analisis financiero',
      title: 'Analisis financiero',
      type: 'item',
      url: '/gestion financiera/analisis financiero',
      icon: IconZoomMoney,
      breadcrumbs: false,
    },
    {
      id: 'presupuestos',
      title: 'Presupuestos y Control',
      type: 'item',
      url: '/gestion financiera/presupuestos',
      icon: IconMessage2Dollar,
      breadcrumbs: false,
    },
  ],
};

export default gestionfi;
