// assets
import {
  IconUsersGroup,
  IconUserShield,
  IconUserEdit,
  IconUserSearch
} from '@tabler/icons-react';

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const usuarios = {
    id: 'usuarios',
    title: 'Gestión de Usuarios',
    type: 'group',
    children: [
      {
        id: 'administracion',
        title: 'Administración General',
        type: 'item',
        url: '/usuarios/administracion',
        icon: IconUsersGroup,
        breadcrumbs: false,
      },
      {
        id: 'seguridad',
        title: 'Seguridad y Control de Acceso',
        type: 'item',
        url: '/usuarios/seguridad',
        icon: IconUserShield,
        breadcrumbs: false,
      },
      {
        id: 'perfil',
        title: 'Perfil y Personalizacion',
        type: 'item',
        url: '/usuarios/perfil',
        icon: IconUserEdit,
        breadcrumbs: false,
      },
      {
        id: 'seguimiento',
        title: 'Estadisticas y Seguimiento',
        type: 'item',
        url: '/usuarios/seguimiento',
        icon: IconUserSearch,
        breadcrumbs: false,
      },
    ],
};

export default usuarios;
