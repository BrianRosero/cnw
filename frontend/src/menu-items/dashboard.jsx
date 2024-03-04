// assets
import { IconDashboard, IconTimeline, IconAlignBoxBottomCenter } from '@tabler/icons-react';

// constant
const icons = { IconDashboard, IconTimeline, IconAlignBoxBottomCenter, };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: 'rendimiento',
      title: 'Rendimiento',
      type: 'item',
      url: '/dashboard/rendimiento',
      icon: icons.IconTimeline,
      breadcrumbs: false,
    },
    {
      id: 'crm',
      title: 'CRM',
      type: 'item',
      url: '/dashboard/crm',
      icon: icons.IconAlignBoxBottomCenter,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
