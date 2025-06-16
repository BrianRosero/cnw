import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { IconBackspace } from '@tabler/icons-react';
import EventBus from '@/common/EventBus.jsx';
import {CardContent} from '@mui/material';

import logoCNW from '@/assets/images/CNW.svg';
import logoESECENTRO from '@/assets/images/ESECENTRO.jpg';
import logoCAMARACC from '@/assets/images/CAMARACC/CAMARACC.svg';
import logoDUANA from '@/assets/images/DUANA.png';
import logoCOSMITET from '@/assets/images/COSMITET.png';
import logoOZONO from '@/assets/images/OZONO.png';
import logoSSOFIA from '@/assets/images/SSOFIA.png';
import logoDUARTE from '@/assets/images/DUARTE.jpg';
import logoPENITAS from '@/assets/images/PEÑITAS.png';
import logoROCHE from '@/assets/images/ROCHE.png';

// Importar componentes de páginas
import CNW from '@/layout/pages/Clientes-Datacenter/CONSULNETWORKS/Inicio.jsx';
import ESECENTRO from '@/layout/pages/Clientes-Datacenter/ESECENTRO/Inicio.jsx';
import COSMITET from '@/layout/pages/Clientes-Datacenter/COSMITET/COSMITET/Inicio.jsx';
import DUANA from '@/layout/pages/Clientes-Datacenter/COSMITET/DUANA/Inicio.jsx';
import SSOFIA from '@/layout/pages/Clientes-Datacenter/COSMITET/SSOFIA/Inicio.jsx';
import DUARTE from '@/layout/pages/Clientes-Datacenter/COSMITET/DUARTE/Inicio.jsx';
import PEÑITAS from '@/layout/pages/Clientes-Datacenter/COSMITET/PEÑITAS/Inicio.jsx';
import CAMARACC from '@/layout/pages/Clientes-Datacenter/CAMARACC/Inicio.jsx';
import OZONO from '@/layout/pages/Clientes-Datacenter/OZONO/Inicio.jsx';
import ROCHE from '@/layout/pages/Clientes-Datacenter/ROCHE/Inicio.jsx';

import './INICIO/style.css';
import UserService from '@/services/user.service.jsx'; // Importar el archivo de estilos CSS

const Root = styled('div')({
  backgroundColor: '#eef2f6',
  color: '#fff',
  minHeight: '100vh',
  padding: '20px 0',
});

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 20px;
`;

const CardWrapper = styled.div`
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: calc(20% - 20px);
    height: 300px; /* Altura fija para mantener el mismo tamaño de tarjeta */
    display: flex;
    flex-direction: column;
    align-items: center; /* Centra el contenido horizontalmente */
    justify-content: space-between; /* Espacio entre el contenido */
    transition: transform 0.3s;

    @media (max-width: 600px) {
        width: 100%;
    }

    &:hover {
        transform: translateY(-5px);
    }
`;

const LogoImage = styled.img`
    width: 100%;
    height: auto;
    margin-top: auto; /* Alinear el logo hacia abajo */
    margin-bottom: auto; /* Alinear el logo hacia arriba */
    cursor: pointer;
`;

const Header = ({ onBackButtonClick }) => {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#004a8f',
      padding: '15px 30px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      position: 'relative'
    }}>
      <button onClick={onBackButtonClick} style={{
        position: 'absolute',
        left: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}>
        <IconBackspace size={28} strokeWidth={2} color="#ffffff" />
      </button>
      <h1 style={{
        color: '#fff',
        fontSize: '30px',
        fontWeight: 'bold',
        margin: 0,
      }}>CRM</h1>
    </header>
  );
};


function Dashboard() {
  const [currentPage, setCurrentPage] = useState(null);
  const [content, setContent] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setIsAdmin(true);
      },
      (error) => {
        handleErrorResponse(error);
      },
    );
  }, []);

  // Función para manejar errores de respuesta de las API
  const handleErrorResponse = (error) => {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    setContent(errorMessage);

    if (error.response && error.response.status === 401) {
      EventBus.dispatch('logout');
    }
  };

  const handleButtonClick = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackButtonClick = () => {
    setCurrentPage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'cnw':
        return <CNW />;
      case 'esecentro':
        return <ESECENTRO />;
      case 'cosmitet':
        return <COSMITET />;
      case 'duana':
        return <DUANA />;
      case 'ssofia':
        return <SSOFIA />;
      case 'duarte':
        return <DUARTE />;
      case 'peñitas':
        return <PEÑITAS />;
      case 'camaracc':
        return <CAMARACC />;
      case 'ozono':
        return <OZONO />;
      case 'roche':
        return <ROCHE />;
      default:
        return null;
    }
  };

  if (isAdmin) {
    return (
      <Root>
        <div className="app-container">
          <Header onBackButtonClick={handleBackButtonClick} />
          <div className="main-content">
            {currentPage ? (
              <div className="page-content">
                {renderPageContent()}
              </div>
            ) : (
              <CardContent className="card-container">
                {/*<CardWrapper onClick={() => handleButtonClick('cnw')}>
                <CardWrapper className="card-wrapper">
                  <LogoImage src={logoCNW} alt="Logo" style={{ width: '100%' }} />
                </CardWrapper>*/}
                <CardWrapper className="card-wrapper" onClick={() => handleButtonClick('esecentro')}>
                  <LogoImage src={logoESECENTRO} alt="Logo" style={{ width: '60%' }} />
                </CardWrapper>
                <CardWrapper className="card-wrapper" onClick={() => handleButtonClick('cosmitet')}>
                  <LogoImage src={logoCOSMITET} alt="Logo" style={{ width: '100%' }} />
                </CardWrapper>
                <CardWrapper className="card-wrapper" onClick={() => handleButtonClick('duana')}>
                  <LogoImage src={logoDUANA} alt="Logo" style={{ width: '90%' }} />
                </CardWrapper>
                <CardWrapper className="card-wrapper" onClick={() => handleButtonClick('ssofia')}>
                  <LogoImage src={logoSSOFIA} alt="Logo" style={{ width: '100%' }} />
                </CardWrapper>
                <CardWrapper className="card-wrapper" onClick={() => handleButtonClick('duarte')}>
                  <LogoImage src={logoDUARTE} alt="Logo" style={{ width: '60%' }} />
                </CardWrapper>
                <CardWrapper className="card-wrapper" onClick={() => handleButtonClick('peñitas')}>
                  <LogoImage src={logoPENITAS} alt="Logo" style={{ width: '100%' }} />
                </CardWrapper>
                <CardWrapper className="card-wrapper" onClick={() => handleButtonClick('camaracc')}>
                  <LogoImage src={logoCAMARACC} alt="Logo" style={{ width: '100%' }} />
                </CardWrapper>
                <CardWrapper className="card-wrapper" onClick={() => handleButtonClick('ozono')}>
                  <LogoImage src={logoOZONO} alt="Logo" style={{ width: '100%' }} />
                </CardWrapper>
                {/*<CardWrapper onClick={() => handleButtonClick('roche')}>*/}
                <CardWrapper className="card-wrapper">
                  <LogoImage src={logoROCHE} alt="Logo" style={{ width: '100%' }} />
                </CardWrapper>
              </CardContent>
            )}
          </div>
        </div>
      </Root>
    );
  }
}

export default Dashboard;
