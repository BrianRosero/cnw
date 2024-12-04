// menu-items/index.jsx
import administrador from './Administrador.jsx';
import pages from './pages.jsx';
import utilities from './utilities.jsx';
import other from './other.jsx';
import profile from './profile.jsx';
import { widget } from './widget.jsx';
import integrations from './integrations.jsx';
import { useAuth } from '../services/AuthContext';
import user from '@/menu-items/User.jsx';

const MenuItems = () => {
  const { isAdmin, isUser } = useAuth();

  return {
    items: [
      administrador(isAdmin),
      user(isUser),
      profile(isUser),
      profile(isAdmin),
      utilities,
      integrations,
      widget,
      pages,
      other,
    ].filter(Boolean), // Eliminar elementos nulos
  };
};

export default MenuItems;
