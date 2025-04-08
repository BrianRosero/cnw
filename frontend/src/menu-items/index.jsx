import { useAuth } from '../services/AuthContext';

import administrador from './Roles/Administrador.jsx';
import moderator from './Roles/Moderador.jsx';
import user from './Roles/User.jsx';

import inicio from './inicio.jsx'
import gestion from './gestion.jsx';
import comunicacion from './comunicación.jsx'
import administracion from './administracion.jsx'
import profile from './profile.jsx';
import utilities from './utilities.jsx';
import integrations from './integrations.jsx';
import { widget } from './widget.jsx';

import pages from './pages.jsx';
import other from './other.jsx';

const MenuItems = () => {
  const { isAdmin, isUser, isModerator, isAdminCOSMITET } = useAuth();

  console.log('Roles asignados:', { isAdmin, isUser, isModerator, isAdminCOSMITET });

  const roleBasedItems = [
    isAdmin || isAdminCOSMITET ? administrador(true) :
      isModerator ? moderator(true) :
        isUser ? user(true) : null,
  ].filter(Boolean);

  const roleBasedItems1 = [
    isAdmin || isAdminCOSMITET || isModerator || isUser ? profile(true) : null,
  ].filter(Boolean);

  return {
    items: [
      inicio,
      ...roleBasedItems,
      gestion,
      comunicacion,
      administracion,
      ...roleBasedItems1,
      utilities,
      integrations,
      widget,
    ],
  };
};


export default MenuItems;

