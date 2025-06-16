// assets
import { IconChecklist, IconBooks, IconReceiptRefund,} from '@tabler/icons-react';

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const capacitacion = {
  id: 'capacitacion',
  title: 'Formación y Capacitación',
  type: 'group',
  children: [
    {
      id: 'plataforma',
      title: 'Plataforma de Aprendizaje',
      type: 'item',
      url: '/capacitacion/plataforma',
      icon: IconChecklist,
      breadcrumbs: false,
    },
    {
      id: 'evaluacion',
      title: 'Evaluación y Seguimiento',
      type: 'item',
      url: '/capacitacion/evaluacion',
      icon: IconBooks,
      breadcrumbs: false,
    },
    {
      id: 'recursos',
      title: 'Recursos y Soporte',
      type: 'item',
      url: '/capacitacion/recursos',
      icon: IconReceiptRefund,
      breadcrumbs: false,
    },
  ],
};

export default capacitacion;
