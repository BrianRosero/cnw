import React, { useState } from 'react';
import styled from '@emotion/styled';
import { IconDashboard, IconTimeline, IconAlignBoxBottomCenter, IconHome } from '@tabler/icons-react';


import logoCliente1 from '@/assets/images/ESECENTRO.jpg';
import logoCliente2 from '@/assets/images/CAMARACC.svg';
import logoCliente3 from '@/assets/images/DUANA.png';
import logoCliente4 from '@/assets/images/COSMITET.png';
import logoCliente5 from '@/assets/images/OZONO.png';

// Importar componentes de páginas
import ESECENTRO from '@/views/pages/ESECENTRO/Inicio.jsx';
import Inicio from '@/views/pages/Inicio/Inicio.jsx';
import COSMITET from '@/views/pages/COSMITET/Inicio.jsx';

import './style.css'; // Importar el archivo de estilos CSS

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
        {/*<button className="nav-link" onClick={onBackButtonClick}*/}
        {/*        style={{ width: 'auto', height: 'auto', background: '#004a8f', borderRadius: '8px' }}>*/}
        {/*  <IconHome size={24} strokeWidth={1.5} color="#fff" />*/}
        {/*</button>*/}
        {/*<b> - </b>*/}
        <button className="nav-link" onClick={onBackButtonClick}
                style={{ width: 'auto', height: 'auto', background: '#004a8f', color: '#fff', borderColor: '#004a8f', borderRadius: '8px', alignContent: 'center'}}>
          <IconHome size={24} strokeWidth={1.5} color="#fff">
          </IconHome>
        </button>
      </ul>
    </div>
  );
};

function Dashboard() {
  const [currentPage, setCurrentPage] = useState(null);

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
      case 'inicio':
        return <Inicio />;
      case 'cosmitet':
        return <COSMITET />;
      default:
        return null;
    }
  };

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
              <LogoImage onClick={() => handleButtonClick('esecentro')} src={logoCliente1} alt="Logo"
                         style={{ width: '90%' }} />
            </CardWrapper>
            <CardWrapper onClick={() => handleButtonClick('cosmitet')}>
              <LogoImage onClick={() => handleButtonClick('cosmitet')} src={logoCliente2} alt="Logo"
                         style={{ width: '105%' }} />
            </CardWrapper>
            <CardWrapper>
              <LogoImage onClick={() => handleButtonClick('pagina1')} src={logoCliente3} alt="Logo"
                         style={{ width: '100%' }} />
            </CardWrapper>
            <CardWrapper>
              <LogoImage onClick={() => handleButtonClick('pagina1')} src={logoCliente4} alt="Logo"
                         style={{ width: '110%' }} />
            </CardWrapper>
            <CardWrapper>
              <LogoImage onClick={() => handleButtonClick('pagina1')} src={logoCliente5} alt="Logo"
                         style={{ width: '100%' }} />
            </CardWrapper>
          </CardContainer>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
