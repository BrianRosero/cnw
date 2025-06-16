// assets
import { IconPaint, IconPalette,} from '@tabler/icons-react';

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const apariencia = {
  id: 'apariencia',
  title: 'Configuración y Apariencia',
  type: 'group',
  children: [
    {
      id: 'diseño',
      title: 'Recursos de Diseño Visual',
      type: 'item',
      url: '/apariencia/diseño',
      icon: IconPaint,
      breadcrumbs: false,
    },
    {
      id: 'personalizacion',
      title: 'Personalización del Sistema',
      type: 'item',
      url: '/apariencia/personalizacion',
      icon: IconPalette,
      breadcrumbs: false,
    },
  ],
};

export default apariencia;
