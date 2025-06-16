// assets
import { IconChecklist, IconBooks, IconReceiptRefund,} from '@tabler/icons-react';

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const gobiernotic = {
  id: 'gobierno TIC',
  title: 'Gobierno TIC & Legal',
  type: 'group',
  children: [
    {
      id: 'cumplimiento',
      title: 'Cumplimiento Normativo',
      type: 'item',
      url: '/gobierno TIC/cumplimiento',
      icon: IconChecklist,
      breadcrumbs: false,
    },
    {
      id: 'gestion documental',
      title: 'Gestión Documental Legal',
      type: 'item',
      url: '/gobierno TIC/gestion documental',
      icon: IconBooks,
      breadcrumbs: false,
    },
    /*{
      id: 'relacion facturacion',
      title: 'Relación con Facturación',
      type: 'item',
      url: '/gobierno TIC/relacion facturacion',
      icon: IconReceiptRefund,
      breadcrumbs: false,
    },*/
  ],
};

export default gobiernotic;
