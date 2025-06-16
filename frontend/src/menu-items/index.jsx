import { useAuth } from '../services/AuthContext';

import administrador from './Roles/Administrador.jsx';
import moderator from './Roles/Moderador.jsx';
import user from './Roles/User.jsx';

import inicio from './Areas/inicio.jsx';
import clientes from './Areas/Clientes.jsx';
import operaciones from './Areas/Operaciones.jsx';
import inteligencia from './Areas/Inteligencia.jsx'
import usuarios from './Areas/Usuarios.jsx';
import seguridad from '@/menu-items/Areas/Seguridad.jsx';
import comunicacion from './Areas/Comunicacion.jsx';
import gestionfi from '@/menu-items/Areas/Gestion-Financiera.jsx';
import gobiernoTIC from '@/menu-items/Areas/Gobierno TIC.jsx';
import capacitacion from '@/menu-items/Areas/Capacitacion.jsx';
import RRHH from '@/menu-items/Areas/RRHH.jsx';
import perfil from './Perfil.jsx';
import apariencia from '@/menu-items/Areas/Apariencia.jsx';
import integraciones from '@/menu-items/Areas/Integraciones.jsx';
import laboratorio from '@/menu-items/Laboratorio.jsx';

import administracion from './administracion.jsx';
import integrations from './integrations.jsx';
import { widget } from './widget.jsx';
import pages from './pages.jsx';
import other from './other.jsx';

const MenuItems = () => {
  const { isAdmin, isUser, isModerator, isAdminCOSMITET } = useAuth();

  const roleBasedItems = [
    (isAdmin || isAdminCOSMITET) && administrador(true),
    isModerator && moderator(true),
    isUser && user(true),
    (isAdmin || isAdminCOSMITET || isModerator || isUser) && perfil(true),
  ].filter(Boolean);

  const sharedItems = [
    inicio,
    ...(isAdmin ? [administrador(true)] : []),
    ...(isAdmin ? [clientes] : []),
    ...(isAdmin ? [operaciones, inteligencia, usuarios] : []),
    ...(isAdmin ? [seguridad] : []),
    ...(isAdmin ? [comunicacion] : []),
    ...(isAdmin ? [gestionfi] : []),
    ...(isAdmin ? [gobiernoTIC] : []),
    //...(isAdmin ? [capacitacion] : []),
    //...(isAdmin ? [RRHH] : []),
    //...roleBasedItems.filter(item => item?.id !== 'administrador'), // Evita duplicar 'administrador'
    ...(isAdmin ? [apariencia] : []),
    ...(isAdmin ? [integraciones] : []),
    laboratorio,
  ];

  return { items: sharedItems };
};

export default MenuItems;
