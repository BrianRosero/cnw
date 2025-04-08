import React, { createContext, useContext, useState, useEffect } from 'react';
import UserService from './user.service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isAdminCOSMITET, setIsAdminCOSMITET] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        // 🔍 Verificar usuario en localStorage
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        console.log("Usuario en localStorage:", storedUser);

        if (storedUser.roles && Array.isArray(storedUser.roles)) {
          console.log("Roles en localStorage:", storedUser.roles);
          setRoles(storedUser.roles); // Guardar roles en el estado

          // 🔄 Asignar estados basados en los roles
          setIsAdmin(storedUser.roles.includes('ROLE_ADMINISTRADOR'));
          setIsUser(storedUser.roles.includes('ROLE_USUARIO'));
          setIsModerator(storedUser.roles.includes('ROLE_MODERADOR'));
          setIsAdminCOSMITET(storedUser.roles.includes('ROLE_ADMIN_COSMITET'));

          return; // Evita hacer peticiones innecesarias si los roles están en localStorage
        }

        // 🚀 Si no hay roles en localStorage, hacer peticiones a la API
        const userResponse = await UserService.getUserBoard();
        console.log("User Response:", userResponse.data);
        setIsUser(!!userResponse.data);

        const adminResponse = await UserService.getAdminBoard();
        console.log("Admin Response:", adminResponse.data);
        setIsAdmin(!!adminResponse.data);

        const moderatorResponse = await UserService.getModeratorBoard();
        console.log("Moderator Response:", moderatorResponse.data);
        setIsModerator(!!moderatorResponse.data);

        const adminCOSMITETResponse = await UserService.getAdminCOSMITET();
        console.log("Admin COSMITET Response:", adminCOSMITETResponse.data);
        setIsAdminCOSMITET(!!adminCOSMITETResponse.data);

      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return (
    <AuthContext.Provider value={{
      roles, isUser, isAdmin, isModerator, isAdminCOSMITET, loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
