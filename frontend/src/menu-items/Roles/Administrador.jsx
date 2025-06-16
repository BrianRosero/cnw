import { IconServerCog, IconTournament, IconHeartRateMonitor, IconVectorBezierCircle, IconArrowIteration } from '@tabler/icons-react';
const icons = { IconServerCog, IconTournament, IconHeartRateMonitor, IconVectorBezierCircle, IconArrowIteration };

const administrador = (isVisible = false) => {
  // Verificar si debe mostrarse el administrador
  if (!isVisible) return null;

  return {
    id: 'administrador',
    title: 'Infraestructura y Tecnología',
    type: 'group',
    children: [
      {
        id: 'panel',
        title: 'Panel de Control del Datacenter',
        type: 'item',
        url: '/datacenter/panel-control',
        icon: icons.IconServerCog,
        breadcrumbs: false,
      },
      {
        id: 'monitoreo',
        title: 'Monitoreo en Tiempo Real',
        type: 'item',
        url: '/datacenter/monitoreo',
        icon: icons.IconHeartRateMonitor,
        breadcrumbs: false,
      },
      {
        id: 'gestion',
        title: 'Gestión de Clientes',
        type: 'item',
        url: '/datacenter/gestion-clientes',
        icon: icons.IconTournament,
        breadcrumbs: false,
      },
      {
        id: 'infraestructura',
        title: 'Infraestructura',
        type: 'item',
        url: '/datacenter/infraestructura',
        icon: icons.IconVectorBezierCircle,
        breadcrumbs: false,
      },
      {
        id: 'mapa fibra',
        title: 'Mapa de Fibra Optica',
        type: 'item',
        url: '/datacenter/mapa fibra',
        icon: icons.IconVectorBezierCircle,
        breadcrumbs: false,
      },
      {
        id: 'continuidad',
        title: 'Continuidad Operativa',
        type: 'item',
        url: '/datacenter/continuidad-op',
        icon: icons.IconArrowIteration,
        breadcrumbs: false,
      },
    ],
  };
};

export default administrador;
