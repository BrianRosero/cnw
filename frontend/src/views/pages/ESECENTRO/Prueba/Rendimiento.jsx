// Tu código con mejoras de diseño

import React, { useState, useEffect } from "react";
import UserService from "../../../../services/user.service.jsx";
import EventBus from "../../../../common/EventBus.jsx";
import PrtgBarras from '../../prtg-barras.jsx';
import PrtgLineas from '../../prtg-lineas.jsx';
import PrtgPastel from '../../prtg-pastel.jsx';
import PrtgPastelSimple from '../../prtg-pastelsimple.jsx';
import { Typography, Box, Container, List, ListItem, Card, CardContent, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import empresa1 from '../../../../assets/images/ESECENTRO.jpg';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const empresas = [
  { nombre: "COSMITET", logo: empresa1 },
  // Agrega las otras empresas según sea necesario
];

const StyledListItem = styled(ListItem)({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
});

const HeaderTitle = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '1rem',
});

const DashboardDescription = styled(Typography)({
  fontSize: '1rem',
  color: '#666',
  marginBottom: '2rem',
});

const DashboardImage = styled('img')({
  width: '150px',
  height: 'auto',
  marginRight: '1rem',
  borderRadius: '50%',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
});

const StyledCard = styled(Card)({
  marginTop: '2rem',
  marginBottom: '2rem',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
});

const DarkModeToggle = styled(IconButton)({
  position: 'fixed',
  top: '2rem',
  right: '2rem',
});

const BoardModerator = () => {
  const [content, setContent] = useState("");
  const [isModerator, setIsModerator] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(empresas[0]);
  const [darkMode, setDarkMode] = useState(false);

  const handleComponentChange = (componentName) => {
    setSelectedComponent(componentName);
  };

  const handleCompanyChange = (company) => {
    setSelectedCompany(company);
  };

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
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  const handleTitleClick = () => {
    setSelectedComponent(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (content === "Requiere permisos de Moderador normal") {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{content}</h3>
        </header>
      </div>
    );
  }

  if (isModerator) {
    return (
      <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
        <DarkModeToggle onClick={toggleDarkMode}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </DarkModeToggle>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
          <DashboardImage src={selectedCompany.logo} alt={`Logo ${selectedCompany.nombre}`} />
          <HeaderTitle variant="h1" onClick={handleTitleClick} sx={{ cursor: 'pointer' }}>
            Dashboard {selectedCompany.nombre}
          </HeaderTitle>
        </Box>
        <DashboardDescription>
          Bienvenido al Dashboard {selectedCompany.nombre}. Aquí encontrarás diversas métricas y datos de rendimiento en tiempo real.
        </DashboardDescription>
        <List component="nav" aria-label="dashboard components">
          <StyledListItem onClick={() => handleComponentChange('prtg-barras.jsx')}>PRTG Barras</StyledListItem>
          <StyledListItem onClick={() => handleComponentChange('prtg-lineas.jsx')}>PRTG Líneas</StyledListItem>
          <StyledListItem onClick={() => handleComponentChange('prtg-pastel.jsx')}>PRTG Pastel</StyledListItem>
          <StyledListItem onClick={() => handleComponentChange('prtg-pastelsimple.jsx')}>PRTG Pastel Simple</StyledListItem>
        </List>
        <StyledCard variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div" sx={{ marginBottom: '1rem' }}>
              {selectedComponent ? `Visualizando: ${selectedComponent}` : 'Seleccione un componente'}
            </Typography>
            <div>
              {selectedComponent === 'prtg-barras.jsx' && <PrtgBarras />}
              {selectedComponent === 'prtg-lineas.jsx' && <PrtgLineas />}
              {selectedComponent === 'prtg-pastel.jsx' && <PrtgPastel />}
              {selectedComponent === 'prtg-pastelsimple.jsx' && <PrtgPastelSimple />}
            </div>
          </CardContent>
        </StyledCard>
        <Typography variant="h5" component="div" sx={{ marginTop: '2rem' }}>
          Empresas:
        </Typography>
        <List component="nav" aria-label="dashboard companies">
          {empresas.map((empresa, index) => (
            <StyledListItem key={index} onClick={() => handleCompanyChange(empresa)}>
              {empresa.nombre}
            </StyledListItem>
          ))}
        </List>
      </Container>
    );
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardModerator;
