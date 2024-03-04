// assets
import { IconBrandChrome, IconHelp, IconDeviceDesktopQuestion } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp, IconDeviceDesktopQuestion };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'integrations',
  title: 'Integraciones',
  caption: 'integrations',
  type: 'group',
  children: [
    {
      id: 'integrations',
      title: 'CONSULNETWORKS',
      type: 'item',
      url: 'integrations/consulnetworks',
      icon: icons.IconBrandChrome,
      breadcrumbs: false,
    },
    {
      id: 'helpdesk',
      title: 'Help Desk',
      type: 'item',
      url: 'http://helpdesk.cnw.co/scp/login.php',
      icon: icons.IconDeviceDesktopQuestion,
      external: true,
      target: true,
    },
  ],
};

export default other;