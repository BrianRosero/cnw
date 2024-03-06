// assets
import { IconKey, IconReceipt2, IconBug, IconBellRinging, IconPhoneCall, IconBrandChrome, IconLayoutKanban, IconChartBar, IconMessages, IconCalendar, IconReport } from '@tabler/icons-react';

// constant
const icons = {
  IconKey,
  IconReceipt2,
  IconBug,
  IconBellRinging,
  IconPhoneCall,
  IconBrandChrome,
  IconLayoutKanban,
  IconChartBar,
  IconMessages,
  IconCalendar,
  IconReport,
};

//-----------------------|| EXTRA PAGES MENU ITEMS ||-----------------------//
export const widget = {
  id: 'widget',
  title: 'Widget',
  caption: 'Widget',
  type: 'group',
  children: [

    {
      id: 'estadisticas',
      title: 'Estadisticas',
      type: 'item',
      url: '/widget/estadistics',
      icon: icons['IconChartBar'],
      breadcrumbs: false,
    },
    {
      id: 'kanban',
      title: 'Kanban',
      type: 'item',
      url: 'widget/kanban',
      icon: icons['IconLayoutKanban'],
      breadcrumbs: false,
    },
    {
      id: 'chat',
      title: 'Chat',
      type: 'item',
      url: 'widget/chat',
      icon: icons['IconMessages'],
      breadcrumbs: false,
    },
    {
      id: 'calendar',
      title: 'Calendario',
      type: 'item',
      url: 'widget/calendar',
      icon: icons['IconCalendar'],
      breadcrumbs: false,
    },
    {
      id: 'reports',
      title: 'Reportes',
      type: 'item',
      url: 'widget/reports',
      icon: icons['IconReport'],
      breadcrumbs: false,
    },
    {
      id: 'tickets',
      title: 'Tickets',
      type: 'item',
      url: 'widget/tickets',
      icon: icons['IconReport'],
      breadcrumbs: false,
    },
  ],
};
