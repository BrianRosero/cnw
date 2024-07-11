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
  Grid, Hidden,
} from '@mui/material';
import logo from '../../../../../assets/images/CAMARACC/Logo.jpg';

// Importar componentes de páginas
import Rendimiento from './Sensors/Sensors.jsx';
import Pruebas from './Sensors/Pruebas.jsx'

// Estilos con Emotion
const styles = {
  mainContent: {
    paddingTop: '10px',
  },
  appBar: {
    backgroundColor: '#ffffff', // Color de fondo del appbar
    borderRadius: '8px',
    position: 'static',
    marginBottom: '20px',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 0 0 0', // Espaciado interno del toolbar
  },
  logoText: {
    fontFamily: "'Barlow Condensed', Helvetica, Arial, Lucida, sans-serif", // Fuentes para el texto del logo
    color: '#fff', // Color del texto del logo
    fontSize: '24px', // Tamaño del texto del logo
    fontWeight: 'bold', // Grosor del texto del logo
    marginLeft: '10px', // Espacio entre el icono y el texto del logo
  },
  menuLinks: {
    display: 'flex',
    alignItems: 'center',
  },
  menuItem: {
    fontFamily: "'Barlow Condensed', Helvetica, Arial, Lucida, sans-serif", // Fuentes para el texto del logo
    marginRight: '20px', // Espacio entre cada elemento del menú
    color: '#253D90', // Color del texto del menú
    fontWeight: 'bold', // Grosor del texto del menú
  },
  card: css`
      background-color: #EF0074;
      color: #ffffff;
      margin-bottom: 20px;
      cursor: pointer;
      &:hover {
          background-color: #d60063;
      }
  `,
  cardTitle: css`
      font-family: 'Montserrat', Helvetica, Arial, Lucida, sans-serif; // Fuentes para el texto del logo
      font-size: 1.5rem;
      color: #FFF;
      font-weight: bold;
  `,
  section: css`
      margin-bottom: 40px;
  `,
  testimonial: css`
      background-color: #c3c1c1;
      padding: 20px;
      border-radius: 5px;
  `,
  testimonialText: css`
      margin-bottom: 10px;
  `,
  testimonialAuthor: css`
      font-weight: bold;
  `,
  image: css`
      max-width: 100%;
      height: auto;
      border-radius: 5px;
  `,
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    maxWidth: '60%',
    height: 'auto',
    margin: '20px',
  },
};

const Inicio = () => {
  const [setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Header = ({ onBackButtonClick }) => {
    return (
      <AppBar position="static" css={styles.appBar}>
        <Toolbar style={styles.toolbar}>
          <div className="logo" css={styles.logo}>
            <img src={logo} alt="Logo" style={styles.logoImg} onClick={onBackButtonClick} />
          </div>
          <Hidden mdDown>
            <div style={styles.menuLinks}>
              <div style={styles.menuLinks}>
                <MenuItem onClick={handleClose} style={styles.menuItem}>
                  <Link href="#inicio" color="inherit" onClick={onBackButtonClick}>
                    Inicio
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose} style={styles.menuItem}>
                  <Link href="#servicios" color="inherit">
                    Servicios
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose} style={styles.menuItem}>
                  <Link href="#proyectos" color="inherit">
                    Proyectos
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose} style={styles.menuItem}>
                  <Link href="#noticias" color="inherit">
                    Noticias
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose} style={styles.menuItem}>
                  <Link href="#contacto" color="inherit">
                    Contacto
                  </Link>
                </MenuItem>
              </div>
            </div>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  };

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
      case 'pruebas':
        return <Pruebas />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Barra de navegación */}
      <Header onBackButtonClick={handleBackButtonClick} />
      <div css={styles.mainContent}>
        {currentPage ? (
          <div className="page-content">
            {renderPageContent()}
          </div>
        ) : (
          <Grid container spacing={3} css={styles.section}>
            {/* Sección de Bienvenida */}
            <Grid container spacing={3} css={styles.section}>
              <Grid item xs={12}>
                <CardContent>
                  <Typography variant="h2" align="center">
                    ¡Bienvenido al Panel de Control de Servicios de la RED DE SALUD DEL CENTRO E.S.E!
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
            {/* Sección de Servicios */}
            <Grid container spacing={3} css={styles.section}>
              <Grid item xs={12}>
                <Typography variant="h4" align="center" id="servicios">
                  Servicios
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card css={styles.card} onClick={() => handleButtonClick('rendimiento')}>
                  <CardContent>
                    <Typography variant="h5" css={styles.cardTitle}>
                      Rendimientos
                    </Typography>
                    <Typography variant="body2" color="#fff">
                      Presentamos un sistema de rendimiento sobre las máquinas, así como información detallada de las máquinas en funcionamiento.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card css={styles.card} onClick={() => handleButtonClick('pruebas')}>
                  <CardContent>
                    <Typography variant="h5" css={styles.cardTitle}>
                      Desarrollo de Software
                    </Typography>
                    <Typography variant="body2" color="#fff">
                      Creamos soluciones de software personalizadas para satisfacer las necesidades específicas de su empresa.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card css={styles.card}>
                  <CardContent>
                    <Typography variant="h5" css={styles.cardTitle}>
                      Seguridad Informática
                    </Typography>
                    <Typography variant="body2" color="#fff">
                      Protegemos su infraestructura y datos con las últimas tecnologías de seguridad informática.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card css={styles.card}>
                  <CardContent>
                    <Typography variant="h5" css={styles.cardTitle}>
                      Inteligencia Artificial
                    </Typography>
                    <Typography variant="body2" color="#fff">
                      Implementamos soluciones de inteligencia artificial para mejorar la eficiencia y la toma de decisiones en su empresa.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card css={styles.card}>
                  <CardContent>
                    <Typography variant="h5" css={styles.cardTitle}>
                      Análisis de Datos
                    </Typography>
                    <Typography variant="body2" color="#fff">
                      Ayudamos a extraer información valiosa de sus datos para mejorar su estrategia empresarial.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Sección de Proyectos */}
            <Grid container spacing={3} css={styles.section}>
              <Grid item xs={12}>
                <Typography variant="h4" align="center" id="proyectos">
                  Nuestros Proyectos Recientes
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card css={styles.card}>
                  <CardContent>
                    <Typography variant="h5" css={styles.cardTitle}>
                      Implementación de Sistema de Gestión Empresarial
                    </Typography>
                    <Typography variant="body2" color="#fff">
                      Desarrollamos un sistema de gestión empresarial personalizado para mejorar la eficiencia operativa de una gran empresa.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card css={styles.card}>
                  <CardContent>
                    <Typography variant="h5" css={styles.cardTitle}>
                      Plataforma de Comercio Electrónico
                    </Typography>
                    <Typography variant="body2" color="#fff">
                      Creamos una plataforma de comercio electrónico para una empresa de retail, aumentando sus ventas en línea.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card css={styles.card}>
                  <CardContent>
                    <Typography variant="h5" css={styles.cardTitle}>
                      Solución de Análisis Predictivo
                    </Typography>
                    <Typography variant="body2" color="#fff">
                      Implementamos una solución de análisis predictivo para una empresa de logística, optimizando su cadena de suministro.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Sección de Noticias */}
            <Grid container spacing={3} css={styles.section}>
              <Grid item xs={12}>
                <Typography variant="h4" align="center" id="noticias">
                  Últimas Noticias
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card css={styles.card}>
                  <CardContent>
                    <Typography variant="h5" css={styles.cardTitle}>
                      Lanzamiento de Nueva Aplicación Móvil
                    </Typography>
                    <Typography variant="body2" color="#fff">
                      Anunciamos el lanzamiento de nuestra nueva aplicación móvil, diseñada para mejorar la experiencia del usuario.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card css={styles.card}>
                  <CardContent>
                    <Typography variant="h5" css={styles.cardTitle}>
                      Alianza Estratégica con TechCorp
                    </Typography>
                    <Typography variant="body2" color="#fff">
                      Hemos formado una alianza estratégica con TechCorp para impulsar la innovación en el sector tecnológico.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Sección de Contacto */}
            <Grid container spacing={3} css={styles.section}>
              <Grid item xs={12}>
                <Typography variant="h4" align="center" id="contacto">
                  Contáctanos
                </Typography>
                <Typography variant="body1" align="center">
                  ¿Tienes alguna pregunta? ¡Estamos aquí para ayudarte!
                </Typography>
                <Typography variant="body1" align="center">
                  <strong>Correo Electrónico:</strong> info@example.com
                </Typography>
                <Typography variant="body1" align="center">
                  <strong>Teléfono:</strong> +1 (123) 456-7890
                </Typography>
                <Typography variant="body1" align="center">
                  <strong>Dirección:</strong> Calle Principal 123, Ciudad, País
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Inicio;
