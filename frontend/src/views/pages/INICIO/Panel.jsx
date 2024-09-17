import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { IconHome } from '@tabler/icons-react';
import EventBus from '../../../common/EventBus.jsx';

import logoCNW from '../../../assets/images/CNW.svg';
import logoESECENTRO from '../../../assets/images/ESECENTRO.jpg';
import logoCAMARACC from '../../../assets/images/CAMARACC/CAMARACC.svg';
import logoDUANA from '../../../assets/images/DUANA.png';
import logoCOSMITET from '../../../assets/images/COSMITET.png';
import logoOZONO from '../../../assets/images/OZONO.png';
import logoSSOFIA from '../../../assets/images/SSOFIA.png';
import logoDUARTE from '../../../assets/images/DUARTE.jpg';
import logoPENITAS from '../../../assets/images/PEÑITAS.png';
import logoROCHE from '../../../assets/images/ROCHE.png';

// Importar componentes de páginas
import CNW from '../CONSULNETWORKS/Inicio.jsx';
import ESECENTRO from '../ESECENTRO/Inicio.jsx';
import COSMITET from '../../../views/pages/COSMITET/COSMITET/Inicio.jsx';
import DUANA from '../../../views/pages/COSMITET/DUANA/Inicio.jsx';
import SSOFIA from '../../../views/pages/COSMITET/SSOFIA/Inicio.jsx';
import DUARTE from '../../../views/pages/COSMITET/DUARTE/Inicio.jsx';
import PEÑITAS from '../../../views/pages/COSMITET/PEÑITAS/Inicio.jsx';
import CAMARACC from '../CAMARACC/Inicio.jsx';
import OZONO from '../OZONO/Inicio.jsx';
import ROCHE from '../ROCHE/Inicio.jsx';

import './style.css';
import UserService from '../../../services/user.service.jsx'; // Importar el archivo de estilos CSS

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

const CardContainerCCC = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  width: 130%;
  height: 500px;
  margin-left: -200px;

  /* Estilos para tablets (pantallas medianas) */
  @media (max-width: 1023px) and (min-width: 768px) {
    width: 100%;
    margin-left: -50px;
    padding: 15px;
    gap: 15px;
  }

  /* Estilos para teléfonos (pantallas pequeñas) */
  @media (max-width: 767px) {
    width: 100%;
    margin-left: 0;
    padding: 10px;
    gap: 10px;
  }
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
  //const [isAdminDUANA, setIsAdminDUANA] = useState(false);
  const [isAdminOZONO, setIsAdminOZONO] = useState(false);
  const [isAdminROCHE, setIsAdminROCHE] = useState(false);

    useEffect(() => {
      UserService.getModeratorBoard().then(
        (response) => {
          setIsModerator(true);
        },
        (error) => {
          handleErrorResponse(error);
        }
      );
    }, []);

    useEffect(() => {
      UserService.getAdminBoard().then(
        (response) => {
          setIsAdmin(true);
        },
        (error) => {
          handleErrorResponse(error);
        }
      );
    }, []);

    useEffect(() => {
      UserService.getAdminCAMARACC().then(
        (response) => {
          setIsAdminCAMARACC(true);
        },
        (error) => {
          handleErrorResponse(error);
        }
      );
    }, []);

   useEffect(() => {
    UserService.getAdminCOSMITET().then(
      (response) => {
        setIsAdminCOSMITET(true);
      },
      (error) => {
        handleErrorResponse(error);
      },
    );
  }, []);

  useEffect(() => {
    UserService.getAdminESECENTRO().then(
      (response) => {
        setIsAdminESECENTRO(true);
      },
      (error) => {
        handleErrorResponse(error);
      }
    );
  }, []);

  /*useEffect(() => {
    UserService.getAdminDUANA().then(
      (response) => {
        setIsAdminDUANA(true);
      },
      (error) => {
        handleErrorResponse(error);
      }
    );
  }, []);*/

  useEffect(() => {
    UserService.getAdminOZONO().then(
      (response) => {
        setIsAdminOZONO(true);
      },
      (error) => {
        handleErrorResponse(error);
      },
    );
  }, []);

  useEffect(() => {
    UserService.getAdminROCHE().then(
      (response) => {
        setIsAdminROCHE(true);
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
  };

  const handleBackButtonClick = () => {
    setCurrentPage(null);
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
            <CardContainerCCC>
              <CardWrapper onClick={() => handleButtonClick('camaracc')}>
                <LogoImage src={logoCAMARACC} alt="Logo" style={{ width: '105%' }} />
              </CardWrapper>
            </CardContainerCCC>
          )}
        </div>
      </div>
    );
  } else if (isAdmin) {
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
                <CardWrapper onClick={() => handleButtonClick('duana')}>
                  <LogoImage src={logoDUANA} alt="Logo" style={{ width: '100%' }} />
                </CardWrapper>
                <CardWrapper onClick={() => handleButtonClick('ssofia')}>
                  <LogoImage src={logoSSOFIA} alt="Logo" style={{ width: '110%' }} />
                </CardWrapper>
                <CardWrapper onClick={() => handleButtonClick('duarte')}>
                  <LogoImage src={logoDUARTE} alt="Logo" style={{ width: '90%' }} />
                </CardWrapper>
                <CardWrapper onClick={() => handleButtonClick('peñitas')}>
                  <LogoImage src={logoPENITAS} alt="Logo" style={{ width: '110%' }} />
                </CardWrapper>
                <CardWrapper onClick={() => handleButtonClick('camaracc')}>
                  <LogoImage src={logoCAMARACC} alt="Logo" style={{ width: '110%' }} />
                </CardWrapper>
                <CardWrapper onClick={() => handleButtonClick('ozono')}>
                  <LogoImage src={logoOZONO} alt="Logo" style={{ width: '110%' }} />
                </CardWrapper>
                <CardWrapper onClick={() => handleButtonClick('roche')}>
                  <LogoImage src={logoROCHE} alt="Logo" style={{ width: '110%' }} />
                </CardWrapper>
              </CardContainer>
            )}
          </div>
        </div>
      </Root>
    );
  } else if (isAdminESECENTRO) {
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
                <LogoImage src={logoESECENTRO} alt="Logo" style={{ width: '100%' }} />
              </CardWrapper>
            </CardContainer>
          )}
        </div>
      </div>
    );
  } else if (isAdminCAMARACC) {
    return (
      <div className="app-container">
        <Header onBackButtonClick={handleBackButtonClick} />
        <div className="main-content">
          {currentPage ? (
            <div className="page-content">
              {renderPageContent()}
            </div>
          ) : (
            <CardContainerCCC>
              <CardWrapper onClick={() => handleButtonClick('camaracc')}>
                <LogoImage src={logoCAMARACC} alt="Logo" style={{ width: '105%' }} />
              </CardWrapper>
            </CardContainerCCC>
          )}
        </div>
      </div>
    );
  } else if (isAdminCOSMITET) {
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
              <CardWrapper onClick={() => handleButtonClick('duana')}>
                <LogoImage src={logoDUANA} alt="Logo" style={{ width: '100%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('duarte')}>
                <LogoImage src={logoDUARTE} alt="Logo" style={{ width: '80%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('peñitas')}>
                <LogoImage src={logoPENITAS} alt="Logo" style={{ width: '110%' }} />
              </CardWrapper>
              <CardWrapper onClick={() => handleButtonClick('ssofia')}>
                <LogoImage src={logoSSOFIA} alt="Logo" style={{ width: '110%' }} />
              </CardWrapper>
            </CardContainer>
          )}
        </div>
      </div>
    );
  } else if (isAdminOZONO) {
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
              <CardWrapper onClick={() => handleButtonClick('ozono')}>
                <LogoImage src={logoOZONO} alt="Logo" style={{ width: '110%' }} />
              </CardWrapper>
            </CardContainer>
          )}
        </div>
      </div>
    );
  } else if (isAdminROCHE) {
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
              <CardWrapper onClick={() => handleButtonClick('roche')}>
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
