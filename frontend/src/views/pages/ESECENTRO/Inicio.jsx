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
import logo from '@/assets/images/ESECENTRO/LOGO-WEB.png'

// Importar componentes de páginas
import Rendimiento from '@/views/pages/ESECENTRO/Sensors.jsx'
import INICIO from '@/views/pages/CONSULNETWORKS/Inicio.jsx'
import Maquina from '@/views/pages/COSMITET/Sensores/sensor1.jsx'

// Estilos con Emotion
const styles = {
  mainContent:{
    paddingTop: '10px',
  },
  appBar: {
    backgroundColor: '#ffffff', // Color de fondo del appbar
    borderRadius: '8px',
    position: 'auto',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 0 0 0', // Espaciado interno del toolbar
  },
  logoText: {
    fontFamily: "'Barlow Condensed', Helvetica, Arial, Lucida, sans-serif", // Fuentes para el texto del logo
    color: '#000000', // Color del texto del logo
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
    color: '#004884', // Color del texto del menú
    fontWeight: 'bold', // Grosor del texto del menú
  },
  card: css`
      background-color: #ffffff;
      color: #000;
      margin-bottom: 20px;
  `,
  cardTitle: css`
      font-family: 'Montserrat', Helvetica, Arial, Lucida, sans-serif; // Fuentes para el texto del logo
      font-size: 1.5rem;
      color: #004884;
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
    maxWidth: '100%',
    height: 'auto',
  },
};


const Inicio = () => {
  const [setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Header = ({onBackButtonClick}) => {
    return (
        <AppBar position="static" css={styles.appBar}>
          <Toolbar style={styles.toolbar}>
            <div className="logo" css={styles.logo}>
              <img src={logo} alt="Logo" style={styles.logoImg} onClick={onBackButtonClick}/>
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
  }

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
      case 'maquina':
        return <Maquina />;
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
              <Grid item xs={12} >
                <CardContent >
                  <Typography variant="h2" align="center">¡Bienvenido al Panel de Control de Servicios de la RED DE SALUD DEL CENTRO E.S.E!</Typography>
                </CardContent>
              </Grid>
            </Grid>
            {/* Sección de Servicios */}
            <Grid container spacing={3} css={styles.section}>
              <Grid item xs={12}>
                <Typography variant="h4" align="center" id="servicios">Servicios</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card css={styles.card}>
                  <CardContent onClick={() => handleButtonClick('rendimiento')}>
                    <Typography variant="h5" css={styles.cardTitle}>Rendimiento</Typography>
                    <Typography variant="body2">
                      Presentamos un sistema de rendimiento sobre las maquinas, así como información detallada de las maquinas en funcionamiento.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card css={styles.card}>
                  <CardContent onClick={() => handleButtonClick('maquina')}>
                    <Typography variant="h5" css={styles.cardTitle}>Desarrollo de Software</Typography>
                    <Typography variant="body2">
                      Creamos soluciones de software personalizadas para satisfacer las necesidades específicas de su
                      empresa.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card css={styles.card}>
                  <CardContent>
                    <Typography variant="h5" css={styles.cardTitle}>Seguridad Informática</Typography>
                    <Typography variant="body2">
                      Protegemos su infraestructura y datos con las últimas tecnologías de seguridad informática.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card css={styles.card}>
                  <CardContent>
                    <Typography variant="h5" css={styles.cardTitle}>Inteligencia Artificial</Typography>
                    <Typography variant="body2">
                      Implementamos soluciones de inteligencia artificial para mejorar la eficiencia y la toma de decisiones
                      en su empresa.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card css={styles.card}>
                  <CardContent>
                    <Typography variant="h5" css={styles.cardTitle}>Análisis de Datos</Typography>
                    <Typography variant="body2">
                      Ayudamos a extraer información valiosa de sus datos para mejorar su estrategia empresarial.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Sección de Proyectos */}
            <Grid container spacing={3} css={styles.section}>
              <Grid item xs={12}>
                <Typography variant="h4" align="center" id="proyectos">Nuestros Proyectos Recientes</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card css={styles.card}>
                  <CardContent>
                    <Typography variant="h5" css={styles.cardTitle}>Implementación de Sistema de Gestión
                      Empresarial</Typography>
                    <Typography variant="body2">
                      Desarrollamos un sistema de gestión empresarial personalizado para mejorar la eficiencia operativa de
                      nuestro cliente.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card css={styles.card}>
                  <CardContent>
                    <Typography variant="h5" css={styles.cardTitle}>Integración de Chatbot en Plataforma de Servicio al
                      Cliente</Typography>
                    <Typography variant="body2">
                      Implementamos un chatbot inteligente para brindar soporte automatizado a los clientes de nuestro
                      cliente, reduciendo los tiempos de respuesta y mejorando la satisfacción del cliente.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card css={styles.card}>
                  <CardContent>
                    <Typography variant="h5" css={styles.cardTitle}>Despliegue de Sistema de Seguridad Avanzado</Typography>
                    <Typography variant="body2">
                      Instalamos un sistema de seguridad avanzado que utiliza tecnología de reconocimiento facial y análisis
                      de comportamiento para proteger las instalaciones de nuestro cliente contra intrusiones.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Sección de Testimonios */}
            <Grid container spacing={3} css={styles.section}>
              <Grid item xs={12}>
                <Typography variant="h4" align="center">Lo que dicen nuestros clientes</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <div css={styles.testimonial}>
                  <Typography variant="body1" css={styles.testimonialText}>
                    "CONSULNETWORKS ha transformado por completo nuestra empresa. Su equipo nos brindó soluciones
                    innovadoras y un soporte excepcional."
                  </Typography>
                  <Typography variant="body2" css={styles.testimonialAuthor}>
                    - Juan Pérez, CEO de Empresa Ejemplo
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div css={styles.testimonial}>
                  <Typography variant="body1" css={styles.testimonialText}>
                    "Estamos muy satisfechos con el trabajo realizado por CONSULNETWORKS. Su profesionalismo y dedicación
                    nos han permitido alcanzar nuevos niveles de eficiencia."
                  </Typography>
                  <Typography variant="body2" css={styles.testimonialAuthor}>
                    - María González, Directora de Tecnología de Otra Empresa
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
    </div>
);
};

export default Inicio;