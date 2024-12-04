import React, { createContext, useContext, useState, useEffect } from 'react';
import UserService from './user.service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser , setIsUser] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isAdminCAMARA, setIsAdminCAMARA] = useState(false);
  const [isAdminESECENTRO, setIsAdminESECENTRO] = useState(false);
  const [isAdminCOSMITET, setIsAdminCOSMITET] = useState(false);
  const [isAdminOZONO, setIsAdminOZONO] = useState(false);
  const [isAdminROCHE, setIsAdminROCHE] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const userResponse = await UserService.getUserBoard();
        setIsUser(!!userResponse.data);

        const adminResponse = await UserService.getAdminBoard();
        setIsAdmin(!!adminResponse.data);

        const moderatorResponse = await UserService.getModeratorBoard();
        setIsModerator(!!moderatorResponse.data);

        const adminCAMARAResponse = await UserService.getAdminCAMARACC();
        setIsAdminCAMARA(!!adminCAMARAResponse.data);

        const adminESECENTROResponse = await UserService.getAdminESECENTRO();
        setIsAdminESECENTRO(!!adminESECENTROResponse.data);

        const adminCOSMITETResponse = await UserService.getAdminCOSMITET();
        setIsAdminCOSMITET(!!adminCOSMITETResponse.data);

        const adminOZONOResponse = await UserService.getAdminOZONO();
        setIsAdminOZONO(!!adminOZONOResponse.data);

        const adminROCHEResponse = await UserService.getAdminROCHE();
        setIsAdminROCHE(!!adminROCHEResponse.data);

      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  return (
    <AuthContext.Provider value={{ isUser, isAdmin, isModerator, isAdminCAMARA,
      isAdminESECENTRO, isAdminCOSMITET, isAdminOZONO, isAdminROCHE, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
