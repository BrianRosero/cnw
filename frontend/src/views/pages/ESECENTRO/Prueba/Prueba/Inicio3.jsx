/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Link, Card, CardContent, Grid} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import axios from 'axios';

// Estilos con Emotion
const styles = {
  appBar: css`
      background-color: #004a8f;
      border-radius: 5px;
  `,
  toolbar: css`
      display: flex;
      justify-content: space-between;
  `,
  mainContent: css`
      padding: 20px;
  `,
  menuItem: css`
      color: #fff;
      text-transform: uppercase;
  `,
  card: css`
      background-color: #ffffff;
      color: #000;
      margin-bottom: 20px;
  `,
  cardTitle: css`
      font-size: 1.5rem;
      color: #004a8f;
  `,
  section: css`
    margin-bottom: 40px;
  `,
  testimonial: css`
    background-color: #f5f5f5;
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
};

const Inicio3 = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [facebookPosts, setFacebookPosts] = useState([]);
  const [twitterPosts, setTwitterPosts] = useState([]);

  useEffect(() => {
    // Simulación de carga de noticias desde Facebook y Twitter
    const fetchFacebookPosts = async () => {
      try {
        // Lógica para obtener noticias de Facebook (simulado)
        const response = await axios.get('https://fakeapi.com/facebook/posts');
        setFacebookPosts(response.data.posts);
      } catch (error) {
        console.error('Error al obtener noticias de Facebook:', error);
      }
    };

    const fetchTwitterPosts = async () => {
      try {
        // Lógica para obtener noticias de Twitter (simulado)
        const response = await axios.get('https://fakeapi.com/twitter/posts');
        setTwitterPosts(response.data.posts);
      } catch (error) {
        console.error('Error al obtener noticias de Twitter:', error);
      }
    };

    fetchFacebookPosts();
    fetchTwitterPosts();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleContact = async () => {
    // Lógica para enviar mensaje de contacto
    try {
      await axios.post('/api/contact', { message: 'Hola, estoy interesado en sus servicios.' });
      alert('Mensaje enviado con éxito.');
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      alert('Ocurrió un error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.');
    }
  };

  return (
    <div>
      {/* Barra de navegación */}
      <AppBar position="static" css={styles.appBar}>
        <Toolbar css={styles.toolbar}>
          <Typography variant="h6">CONSULNETWORKS</Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} css={styles.menuItem}>
              <Link href="#nosotros" color="inherit">
                Nosotros
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose} css={styles.menuItem}>
              <Link href="#servicios" color="inherit">
                Servicios
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose} css={styles.menuItem}>
              <Link href="#proyectos" color="inherit">
                Proyectos
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose} css={styles.menuItem}>
              <Link href="#noticias" color="inherit">
                Noticias
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose} css={styles.menuItem}>
              <Link href="#contacto" color="inherit">
                Contacto
              </Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Contenido principal */}
      <div css={styles.mainContent}>
        {/* Sección de Bienvenida */}
        <Grid container spacing={3} css={styles.section}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4">¡Bienvenido a CONSULNETWORKS!</Typography>
            <Typography variant="body1">
              Somos una empresa líder en soluciones tecnológicas, dedicada a ofrecer servicios de consultoría, desarrollo de software, seguridad informática, inteligencia artificial, análisis de datos y mucho más. Nuestro objetivo es ayudar a las empresas a optimizar sus procesos y mejorar su rendimiento utilizando la última tecnología disponible.
            </Typography>
          </Grid>
        </Grid>

        {/* Sección de Servicios */}
        <Grid container spacing={3} css={styles.section}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" id="servicios">Nuestros Servicios</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card css={styles.card}>
              <CardContent>
                <Typography variant="h5" css={styles.cardTitle}>Consultoría Tecnológica</Typography>
                <Typography variant="body2">
                  Ofrecemos asesoramiento experto en tecnología para ayudar a su empresa a alcanzar sus objetivos.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card css={styles.card}>
              <CardContent>
                <Typography variant="h5" css={styles.cardTitle}>Desarrollo de Software</Typography>
                <Typography variant="body2">
                  Creamos soluciones de software personalizadas para satisfacer las necesidades específicas de su empresa.
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
                  Implementamos soluciones de inteligencia artificial para mejorar la eficiencia y la toma de decisiones en su empresa.
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
                <Typography variant="h5" css={styles.cardTitle}>Implementación de Sistema de Gestión Empresarial</Typography>
                <Typography variant="body2">
                  Desarrollamos un sistema de gestión empresarial personalizado para mejorar la eficiencia operativa de nuestro cliente.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card css={styles.card}>
              <CardContent>
                <Typography variant="h5" css={styles.cardTitle}>Integración de Chatbot en Plataforma de Servicio al Cliente</Typography>
                <Typography variant="body2">
                  Implementamos un chatbot inteligente para brindar soporte automatizado a los clientes de nuestro cliente, reduciendo los tiempos de respuesta y mejorando la satisfacción del cliente.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card css={styles.card}>
              <CardContent>
                <Typography variant="h5" css={styles.cardTitle}>Despliegue de Sistema de Seguridad Avanzado</Typography>
                <Typography variant="body2">
                  Instalamos un sistema de seguridad avanzado que utiliza tecnología de reconocimiento facial y análisis de comportamiento para proteger las instalaciones de nuestro cliente contra intrusiones.
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
                "CONSULNETWORKS ha transformado por completo nuestra empresa. Su equipo nos brindó soluciones innovadoras y un soporte excepcional."
              </Typography>
              <Typography variant="body2" css={styles.testimonialAuthor}>
                - Juan Pérez, CEO de Empresa Ejemplo
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div css={styles.testimonial}>
              <Typography variant="body1" css={styles.testimonialText}>
                "Estamos muy satisfechos con el trabajo realizado por CONSULNETWORKS. Su profesionalismo y dedicación nos han permitido alcanzar nuevos niveles de eficiencia."
              </Typography>
              <Typography variant="body2" css={styles.testimonialAuthor}>
                - María González, Directora de Tecnología de Otra Empresa
              </Typography>
            </div>
          </Grid>
        </Grid>

        {/* Sección de Noticias */}
        <Grid container spacing={3} css={styles.section}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" id="noticias">Últimas Noticias</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card css={styles.card}>
              <CardContent>
                <Typography variant="h5" css={styles.cardTitle}>Noticias de Facebook</Typography>
                {facebookPosts.map((post, index) => (
                  <Typography variant="body2" key={index}>{post}</Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card css={styles.card}>
              <CardContent>
                <Typography variant="h5" css={styles.cardTitle}>Noticias de Twitter</Typography>
                {twitterPosts.map((post, index) => (
                  <Typography variant="body2" key={index}>{post}</Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Redes sociales */}
        <Typography variant="h4" align="center" css={styles.section}>Síguenos en redes sociales</Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Button variant="contained" color="primary" href="https://facebook.com/consulnetworks">Facebook</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" href="https://twitter.com/consulnetworks">Twitter</Button>
          </Grid>
        </Grid>

        {/* Formulario de contacto */}
        <Typography variant="h4" align="center" id="contacto" css={styles.section}>¡Contáctanos!</Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleContact}>Enviar mensaje</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Inicio3;
