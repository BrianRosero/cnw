// assets
import { IconId, IconUserCheck, IconArrowGuide,} from '@tabler/icons-react';

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const RRHH = {
  id: 'RRHH',
  title: 'Recursos Humanos',
  type: 'group',
  children: [
    {
      id: 'gestion de personal',
      title: 'Gestión de Personal',
      type: 'item',
      url: '/RRHH/gestion de personal',
      icon: IconId,
      breadcrumbs: false,
    },
    {
      id: 'desempeño',
      title: 'Desempeño y Evaluación',
      type: 'item',
      url: '/RRHH/desempeño',
      icon: IconUserCheck,
      breadcrumbs: false,
    },
    {
      id: 'integracion',
      title: 'Procesos de Integración',
      type: 'item',
      url: '/RRHH/integracion',
      icon: IconArrowGuide,
      breadcrumbs: false,
    },
  ],
};

export default RRHH;
