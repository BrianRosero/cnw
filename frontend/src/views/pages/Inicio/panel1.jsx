import React, {useState} from 'react';
import logoCliente1 from '@/assets/images/ESECENTRO.jpg';
import logoCliente2 from '@/assets/images/CAMARACC.svg';
import logoCliente3 from '@/assets/images/DUANA.png';
import logoCliente4 from '@/assets/images/COSMITET.png';
import logoCliente5 from '@/assets/images/OZONO.png';

import ESECENTRO from '@/views/pages/ESECENTRO/Inicio.jsx'
import Inicio from '@/views/pages/Inicio/Inicio.jsx'
import Pagina3 from '@/views/pages/Reportes.jsx'

import './style.css'; // Importar el archivo de estilos CSS
import styled from '@emotion/styled';
// Componentes con estilos Emotion
const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center; /* Centra el contenido horizontalmente */
`;

const CardWrapper = styled.div`
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: calc(20% - 20px);
    height: 300px; /* Altura fija para mantener el mismo tamaño de tarjeta */
    display: flex;
    flex-direction: column;
    align-items: center; /* Centra el contenido horizontalmente */
    justify-content: space-between; /* Espacio entre el contenido */
    transition: transform 0.3s;

    &:hover {
        transform: translateY(-5px);
    }
`;

const LogoImage = styled.img`
    height: auto; /* Altura automática */
    margin-top: auto; /* Alinear el logo hacia abajo */
    margin-bottom: auto; /* Alinear el logo hacia arriba */
`;

const ButtonContainer = styled.div`
    margin-bottom: 10px; /* Espacio en la parte inferior de la tarjeta */
`;

const Button = styled.button`
    background-color: #004a8f;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-right: 10px; /* Espacio entre los botones */

    &:hover {
        background-color: #5aad40;
    }
`;

// eslint-disable-next-line react/prop-types
const Header = ({ onBackButtonClick }) => {
  return (
    <div className="navbar"  >
      <ul className="nav-list">
        <li className="nav-item">
          <a href="#" className="nav-link">
            Link 1
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            Link 2
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            Link 3
          </a>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={onBackButtonClick}>Volver a las tarjetas</button>
        </li>
      </ul>
    </div>
  );
};

function Dashboard() {
  const [currentPage, setCurrentPage] = useState(null);

  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };

  const handleBackButtonClick = () => { // Función para manejar el clic en el botón de vuelta
    setCurrentPage(null); // Restaurar currentPage a null para mostrar las tarjetas nuevamente
  };

  // Función para renderizar el contenido de la página actual
  const renderPageContent = () => {
    switch (currentPage) {
      case 'esecentro':
        return <ESECENTRO />;
      case 'inicio':
        return <Inicio />;
      case 'pagina3':
        return <Pagina3 />;
      default:
        return null; // Mostrar nada si no hay página seleccionada
    }
  };

  return (
    <div className="app-container">
      <Header onBackButtonClick={handleBackButtonClick} />
      <div className="main-content" style={{padding: '40px'}}>
        {currentPage ? ( // Si hay una página seleccionada, mostrar solo el contenido de la página
          <div className="page-content">
            {renderPageContent()}
          </div>
        ) : (
          <CardContainer>
            <CardWrapper>
              <LogoImage onClick={() => handleButtonClick('esecentro')} src={logoCliente1} alt="Logo" style={{ width: '70%' }} />
              <ButtonContainer>
                <Button onClick={() => handleButtonClick('inicio')}>Button 1</Button>
                <Button onClick={() => handleButtonClick('esecentro')}>Button 2</Button>
              </ButtonContainer>
            </CardWrapper>
            <CardWrapper onClick={() => handleButtonClick('pagina1')}>
              <LogoImage onClick={() => handleButtonClick('pagina1')} src={logoCliente2} alt="Logo" style={{ width: '100%' }} />
              <ButtonContainer>
                <Button onClick={() => handleButtonClick('pagina1')}>Button 1</Button>
                <Button onClick={() => handleButtonClick('pagina2')}>Button 2</Button>
              </ButtonContainer>
            </CardWrapper>
            <CardWrapper onClick={() => handleButtonClick('pagina1')}>
              <LogoImage onClick={() => handleButtonClick('pagina1')} src={logoCliente3} alt="Logo" style={{ width: '80%' }} />
              <ButtonContainer>
                <Button onClick={() => handleButtonClick('pagina1')}>Button 1</Button>
                <Button onClick={() => handleButtonClick('pagina2')}>Button 2</Button>
              </ButtonContainer>
            </CardWrapper>
            <CardWrapper onClick={() => handleButtonClick('pagina1')}>
              <LogoImage onClick={() => handleButtonClick('pagina1')} src={logoCliente4} alt="Logo" style={{ width: '100%' }} />
              <ButtonContainer>
                <Button onClick={() => handleButtonClick('pagina1')}>Button 1</Button>
                <Button onClick={() => handleButtonClick('pagina2')}>Button 2</Button>
              </ButtonContainer>
            </CardWrapper>
            <CardWrapper onClick={() => handleButtonClick('pagina1')}>
              <LogoImage onClick={() => handleButtonClick('pagina1')} src={logoCliente5} alt="Logo" style={{ width: '90%' }} />
              <ButtonContainer>
                <Button onClick={() => handleButtonClick('pagina1')}>Button 1</Button>
                <Button onClick={() => handleButtonClick('pagina2')}>Button 2</Button>
              </ButtonContainer>
            </CardWrapper>
          </CardContainer>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
