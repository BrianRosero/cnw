// assets
import { IconHome, IconFolderSymlink} from '@tabler/icons-react';

// constant
const icons = {
  IconHome,
  IconFolderSymlink,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const inicio = {
  id: 'inicio',
  title: 'Inicio',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Inicio',
      type: 'item',
      url: '/inicio/inicio',
      icon: icons.IconHome,
      breadcrumbs: false,
    },
    {
      id: 'accesos-rapidos',
      title: 'Accesos Rápidos',
      type: 'item',
      url: '/inicio/accesos-rapidos',
      icon: icons.IconFolderSymlink,
      breadcrumbs: false,
    },
  ],
};

export default inicio;
