import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { IconHome } from '@tabler/icons-react';
import EventBus from '@/common/EventBus.jsx';

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
import ESECENTRO from '@/views/pages/ESECENTRO/Inicio.jsx';
import CNW from '@/views/pages/CONSULNETWORKS/Inicio.jsx';
import COSMITET from '@/views/pages/COSMITET/Inicio.jsx';
import CAMARACC from '@/views/pages/CAMARACC/Inicio.jsx';

import './style.css';
import UserService from '@/services/user.service.jsx'; // Importar el archivo de estilos CSS

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
    <div className="navbar">
      <ul className="nav-list">
        <button className="nav-link" onClick={onBackButtonClick}
                style={{
                  width: 'auto',
                  height: 'auto',
                  background: '#004a8f',
                  color: '#fff',
                  borderColor: '#004a8f',
                  borderRadius: '8px',
                  alignContent: 'center',
                }}>
          <IconHome size={24} strokeWidth={1.5} color="#fff" />
        </button>
      </ul>
    </div>
  );
};

function Dashboard() {
  const [currentPage, setCurrentPage] = useState(null);
  const [content, setContent] = useState('');
  const [isModerator, setIsModerator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminESECENTRO, setIsAdminESECENTRO] = useState(false);
  const [isAdminCAMARACC, setIsAdminCAMARACC] = useState(false);
  const [isAdminCOSMITET, setIsAdminCOSMITET] = useState(false);
  const [isAdminDUANA, setIsAdminDUANA] = useState(false);
  const [isAdminOZONO, setIsAdminOZONO] = useState(false);
  const [isAdminROCHE, setIsAdminROCHE] = useState(false);

  useEffect(() => {
    UserService.getModeratorBoard().then(
      (response) => {
        setContent(response.data);
        setIsModerator(true);
      },
      (error) => {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(errorMessage);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch('logout');
        }
      },
    );
  }, []);

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
        setIsAdmin(true);
      },
      (error) => {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(errorMessage);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch('logout');
        }
      },
    );
  }, []);

  useEffect(() => {
    UserService.getAdminESECENTRO().then(
      (response) => {
        setContent(response.data);
        setIsAdminESECENTRO(true);
      },
      (error) => {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(errorMessage);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch('logout');
        }
      },
    );
  }, []);

  useEffect(() => {
    UserService.getAdminCAMARACC().then(
      (response) => {
        setContent(response.data);
        setIsAdminCAMARACC(true);
      },
      (error) => {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(errorMessage);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch('logout');
        }
      },
    );
  }, []);

  useEffect(() => {
    UserService.getAdminCOSMITET().then(
      (response) => {
        setContent(response.data);
        setIsAdminCOSMITET(true);
      },
      (error) => {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(errorMessage);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch('logout');
        }
      },
    );
  }, []);

  useEffect(() => {
    UserService.getAdminDUANA().then(
      (response) => {
        setContent(response.data);
        setIsAdminDUANA(true);
      },
      (error) => {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(errorMessage);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch('logout');
        }
      },
    );
  }, []);

  useEffect(() => {
    UserService.getAdminOZONO().then(
      (response) => {
        setContent(response.data);
        setIsAdminOZONO(true);
      },
      (error) => {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(errorMessage);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch('logout');
        }
      },
    );
  }, []);

  useEffect(() => {
    UserService.getAdminROCHE().then(
      (response) => {
        setContent(response.data);
        setIsAdminROCHE(true);
      },
      (error) => {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(errorMessage);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch('logout');
        }
      },
    );
  }, []);

  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };

  const handleBackButtonClick = () => {
    setCurrentPage(null);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'esecentro':
        return <ESECENTRO />;
      case 'cnw':
        return <CNW />;
      case 'cosmitet':
        return <COSMITET />;
      case 'camaracc':
        return <CAMARACC />;
      default:
        return null;
    }
  };

  if (isModerator) {
    return (
      <div className="app-container">
        <Header onBackButtonClick={handleBackButtonClick} />
        <div className="main-content">
          {currentPage ? (
            <div className="page-content">
              {renderPageContent()}
            </div>
          ) : (

            <CardContainer>
              <CardWrapper onClick={() => handleButtonClick('cnw')}>
                <LogoImage src={logoCNW} alt="Logo" style={{ width: '115%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('esecentro')}>
                <LogoImage src={logoESECENTRO} alt="Logo" style={{ width: '80%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('cosmitet')}>
                <LogoImage src={logoCOSMITET} alt="Logo" style={{ width: '110%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('cnw')}>
                <LogoImage src={logoDUANA} alt="Logo" style={{ width: '100%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('cnw')}>
                <LogoImage src={logoSSOFIA} alt="Logo" style={{ width: '110%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('cnw')}>
                <LogoImage src={logoDUARTE} alt="Logo" style={{ width: '90%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('cnw')}>
                <LogoImage src={logoPENITAS} alt="Logo" style={{ width: '110%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('camaracc')}>
                <LogoImage src={logoCAMARACC} alt="Logo" style={{ width: '110%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('cnw')}>
                <LogoImage src={logoOZONO} alt="Logo" style={{ width: '110%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('cnw')}>
                <LogoImage src={logoROCHE} alt="Logo" style={{ width: '110%' }} />
              </CardWrapper>
            </CardContainer>
          )}
        </div>
      </div>
    );
  }
  if (isAdmin) {
    return (
      <div className="app-container">
        <Header onBackButtonClick={handleBackButtonClick} />
        <div className="main-content">
          {currentPage ? (
            <div className="page-content">
              {renderPageContent()}
            </div>
          ) : (
            <CardContainer>
              <CardWrapper onClick={() => handleButtonClick('cnw')}>
                <LogoImage src={logoCNW} alt="Logo" style={{ width: '115%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('esecentro')}>
                <LogoImage src={logoESECENTRO} alt="Logo" style={{ width: '80%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('cosmitet')}>
                <LogoImage src={logoCOSMITET} alt="Logo" style={{ width: '110%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('cnw')}>
                <LogoImage src={logoDUANA} alt="Logo" style={{ width: '100%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('cnw')}>
                <LogoImage src={logoSSOFIA} alt="Logo" style={{ width: '110%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('cnw')}>
                <LogoImage src={logoDUARTE} alt="Logo" style={{ width: '90%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('cnw')}>
                <LogoImage src={logoPENITAS} alt="Logo" style={{ width: '110%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('camaracc')}>
                <LogoImage src={logoCAMARACC} alt="Logo" style={{ width: '110%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('cnw')}>
                <LogoImage src={logoOZONO} alt="Logo" style={{ width: '110%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('cnw')}>
                <LogoImage src={logoROCHE} alt="Logo" style={{ width: '110%' }} />
              </CardWrapper>
            </CardContainer>
          )}
        </div>
      </div>
    );
  }
  if (isAdminESECENTRO) {
    return (
      <div className="app-container">
        <Header onBackButtonClick={handleBackButtonClick} />
        <div className="main-content">
          {currentPage ? (
            <div className="page-content">
              {renderPageContent()}
            </div>
          ) : (
            <CardContainer>
              <CardWrapper onClick={() => handleButtonClick('esecentro')}>
                <LogoImage src={logoESECENTRO} alt="Logo" style={{ width: '95%' }} />
              </CardWrapper>
            </CardContainer>
          )}
        </div>
      </div>
    );
  }
  if (isAdminCAMARACC) {
    return (
      <div className="app-container">
        <Header onBackButtonClick={handleBackButtonClick} />
        <div className="main-content">
          {currentPage ? (
            <div className="page-content">
              {renderPageContent()}
            </div>
          ) : (
            <CardContainer>
              <CardWrapper onClick={() => handleButtonClick('camaracc')}>
                <LogoImage src={logoCAMARACC} alt="Logo" style={{ width: '110%' }} />
              </CardWrapper>
            </CardContainer>
          )}
        </div>
      </div>
    );
  }
  if (isAdminCOSMITET) {
    return (
      <div className="app-container">
        <Header onBackButtonClick={handleBackButtonClick} />
        <div className="main-content">
          {currentPage ? (
            <div className="page-content">
              {renderPageContent()}
            </div>
          ) : (
            <CardContainer>
              <CardWrapper onClick={() => handleButtonClick('cosmitet')}>
                <LogoImage src={logoCOSMITET} alt="Logo" style={{ width: '110%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('cnw')}>
                <LogoImage src={logoDUANA} alt="Logo" style={{ width: '100%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('cnw')}>
                <LogoImage src={logoSSOFIA} alt="Logo" style={{ width: '110%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('cnw')}>
                <LogoImage src={logoDUARTE} alt="Logo" style={{ width: '100%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('cnw')}>
                <LogoImage src={logoPENITAS} alt="Logo" style={{ width: '110%' }} />
              </CardWrapper>
            </CardContainer>
          )}
        </div>
      </div>
    );
  }
  if (isAdminDUANA) {
    return (
      <div className="app-container">
        <Header onBackButtonClick={handleBackButtonClick} />
        <div className="main-content">
          {currentPage ? (
            <div className="page-content">
              {renderPageContent()}
            </div>
          ) : (
            <CardContainer>
              <CardWrapper onClick={() => handleButtonClick('pagina1')}>
                <LogoImage src={logoDUANA} alt="Logo" style={{ width: '100%' }} />
              </CardWrapper>
            </CardContainer>
          )}
        </div>
      </div>
    );
  }
  if (isAdminOZONO) {
    return (
      <div className="app-container">
        <Header onBackButtonClick={handleBackButtonClick} />
        <div className="main-content">
          {currentPage ? (
            <div className="page-content">
              {renderPageContent()}
            </div>
          ) : (
            <CardContainer>
              <CardWrapper onClick={() => handleButtonClick('cnw')}>
                <LogoImage src={logoOZONO} alt="Logo" style={{ width: '110%' }} />
              </CardWrapper>
            </CardContainer>
          )}
        </div>
      </div>
    );
  }
  if (isAdminROCHE) {
    return (
      <div className="app-container">
        <Header onBackButtonClick={handleBackButtonClick} />
        <div className="main-content">
          {currentPage ? (
            <div className="page-content">
              {renderPageContent()}
            </div>
          ) : (
            <CardContainer>
              <CardWrapper onClick={() => handleButtonClick('CNW')}>
                <LogoImage src={logoROCHE} alt="Logo" style={{ width: '110%' }} />
              </CardWrapper>
            </CardContainer>
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
