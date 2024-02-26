import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes.jsx';
import AuthenticationRoutes from './AuthenticationRoutes.jsx';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, AuthenticationRoutes]);
}
