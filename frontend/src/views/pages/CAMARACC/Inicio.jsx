/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Link,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import logo from '../../../assets/images/Logo-ccc.png';

// Importar componentes de páginas
import Rendimiento from './Sensors.jsx';
import Vcenter from './Vcenter.jsx';
import INICIO from './Inicio.jsx';

// Estilos con Emotion
const styles = {
  mainContent: {
    paddingTop: '10px',
    paddingBottom: '20px',
    backgroundColor: '#f4f4f4',
  },
  appBar: {
    backgroundColor: '#ffffff',
    position: 'auto',
    padding: '12px 20px',
    borderRadius: '8px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center', // Centra el contenido en el Toolbar
    alignItems: 'center',
    padding: '0 0 0 0', // Espaciado interno del toolbar
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1, // Permite que el logo tome el espacio necesario para estar centrado
  },
  logoImg: {
    maxWidth: '320px',
    height: 'auto',
  },
  menuLinks: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 0, // Permite que el contenedor de los enlaces ocupe espacio necesario para el centrado
    justifyContent: 'flex-end',
  },
  menuItem: {
    fontFamily: "Poppins, sans-serif",
    marginLeft: '20px',
    color: '#ffffff',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  card: css`
      background-color: #d3256b;
      color: rgba(255, 255, 255, 0.92);
      margin-bottom: 20px;
      &:hover {
          background-color: #d53575;
      }
  `,
  cardTitle: css`
      font-family: 'Montserrat', Helvetica, Arial, Lucida, sans-serif;
      font-size: 1.5rem;
      color: #ffffff;
      font-weight: bold;
  `,
  sectionTitle: {
    color: '#214092',
    fontFamily: 'Poppins, sans-serif',
    marginBottom: '20px',
  },
  section: css`
      margin-bottom: 40px;
      padding: 0 20px;
      font-weight: bold;
  `,
};

const Inicio = () => {
  const [currentPage, setCurrentPage] = useState(null);

  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };

  const handleBackButtonClick = () => {
    setCurrentPage(null);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'rendimiento':
        return <Rendimiento />;
      case 'inicio':
        return <INICIO />;
      case 'vcenter':
        return <Vcenter />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Barra de navegación */}
      <AppBar position="static" css={styles.appBar}>
        <Toolbar css={styles.toolbar}>
          <div css={styles.logo} onClick={handleBackButtonClick}>
            <img src={logo} alt="Logo" css={styles.logoImg} />
          </div>
        </Toolbar>
      </AppBar>
      <div css={styles.mainContent}>
        {currentPage ? (
          <div className="page-content">
            {renderPageContent()}
          </div>
        ) : (
          <Grid container spacing={3} css={styles.section}>
            {/* Sección de Bienvenida */}
            <Grid item xs={12}>
              <CardContent>
                <Typography variant="h2" align="center" css={styles.sectionTitle}>¡Bienvenido al Panel de Control de Servicios!</Typography>
              </CardContent>
            </Grid>

            {/* Sección de Servicios */}
            <Grid item xs={12}>
              <Typography variant="h3" align="center" css={styles.sectionTitle}>Servicios</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card css={styles.card}>
                <CardContent onClick={() => handleButtonClick('rendimiento')}>
                  <Typography variant="h5" css={styles.cardTitle}>Rendimiento</Typography>
                  <Typography variant="h4" style={{color: 'rgba(255,255,255,0.94)'}}>
                    Sistema de rendimiento de máquinas virtuales con información detallada.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card css={styles.card}>
                <CardContent onClick={() => handleButtonClick('vcenter')}>
                  <Typography variant="h5" css={styles.cardTitle}>Gestión</Typography>
                  <Typography variant="h4" style={{color: 'rgba(255,255,255,0.94)'}}>
                    Sistema de encargado de la gestión de energía para entornos virtualizados.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Inicio;
