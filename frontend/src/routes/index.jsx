import { useRoutes, Navigate } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes.jsx';
import AuthenticationRoutes from './AuthenticationRoutes.jsx';

import config from '../config.jsx';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, AuthenticationRoutes]);
}
