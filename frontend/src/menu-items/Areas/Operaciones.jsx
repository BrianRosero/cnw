// assets
import { IconBrandVite, IconTimelineEvent, IconCalendarEvent, IconPencilBolt, IconSettingsAutomation} from '@tabler/icons-react';

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const operaciones = {
  id: 'operaciones',
  title: 'Operaciones Internas',
  type: 'group',
  children: [
    {
      id: 'proyectos',
      title: 'Gestión de Proyectos',
      type: 'item',
      url: '/operaciones/proyectos',
      icon: IconBrandVite,
      breadcrumbs: false,
    },
    // más elementos del administrador...
    /*{
      id: 'actividades',
      title: 'Tareas y Actividades',
      type: 'item',
      url: '/operaciones/actividades',
      icon: IconTimelineEvent,
      breadcrumbs: false,
    },*/
    {
      id: 'planificacion',
      title: 'Planificacion y Calendario',
      type: 'item',
      url: '/operaciones/planificacion',
      icon: IconCalendarEvent,
      breadcrumbs: false,
    },
    /*{
      id: 'soporte',
      title: 'Soporte Interno',
      type: 'item',
      url: '/operaciones/soporte',
      icon: IconPencilBolt,
      breadcrumbs: false,
    },*/
    {
      id: 'automatizacion',
      title: 'Automatización',
      type: 'item',
      url: '/operaciones/automatizacion',
      icon: IconSettingsAutomation,
      breadcrumbs: false,
    },
  ],
};

export default operaciones;