// assets
import { IconLayoutDashboard, IconFileTextAi, IconBulb, IconBrain} from '@tabler/icons-react';

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const inteligencia = {
  id: 'inteligencia',
  title: 'Inteligencia y Analisis',
  type: 'group',
  children: [
    {
      id: 'visualizacion',
      title: 'Paneles y Visualizacion',
      type: 'item',
      url: '/inteligencia/visualizacion',
      icon: IconLayoutDashboard,
      breadcrumbs: false,
    },
    {
      id: 'analisis',
      title: 'Analisis y Reportes',
      type: 'item',
      url: '/inteligencia/analisis',
      icon: IconFileTextAi,
      breadcrumbs: false,
    },
    {
      id: 'prediccion',
      title: 'Predicción',
      type: 'item',
      url: '/inteligencia/prediccion',
      icon: IconBulb,
      breadcrumbs: false,
    },
    {
      id: 'modelos',
      title: 'Modelos IA Y Automatizacion Inteligente',
      type: 'item',
      url: '/inteligencia/modelos',
      icon: IconBrain,
      breadcrumbs: false,
    },
  ],
};

export default inteligencia;
