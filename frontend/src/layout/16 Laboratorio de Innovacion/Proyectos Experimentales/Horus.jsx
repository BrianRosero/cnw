/*
import React from 'react';
import { Container, Grid, Typography, Button, Card, CardContent, CardMedia, Paper, Divider } from '@mui/material';
import { styled } from '@mui/system';

const Root = styled('div')({
  backgroundColor: '#ffffff',
  color: '#fff',
  minHeight: '100vh',
  padding: '20px 0',
});

const Section = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
  marginBottom: theme.spacing(4),
}));

const ImageCard = styled(Card)({
  backgroundColor: '#1f2145',
  color: '#fff',
  height: '100%',
  '&:hover': {
    transform: 'scale(1.05)',
    transition: 'transform 0.3s ease-in-out',
  },
});

const CustomButton = styled(Button)({
  backgroundColor: '#0062cc',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#004b99',
  },
});

const HeaderSection = () => (
  <Section>
    <Typography variant="h2" align="center" gutterBottom>
      Bienvenido a CONSULNETWORKS
    </Typography>
    <Typography variant="h5" align="center" paragraph>
      Innovación y Tecnología al Servicio de Tu Empresa
    </Typography>
    <Typography variant="body1" align="center">
      Descubre nuestras soluciones tecnológicas avanzadas que impulsan el crecimiento y la eficiencia de tu negocio. Desde consultoría estratégica hasta implementación de software a medida, estamos aquí para ayudarte a alcanzar el éxito.
    </Typography>
    <Grid container justifyContent="center" spacing={2} marginTop={3}>
      <Grid item>
        <CustomButton variant="contained" size="large">
          Conócenos Más
        </CustomButton>
      </Grid>
      <Grid item>
        <CustomButton variant="contained" size="large">
          Nuestros Servicios
        </CustomButton>
      </Grid>
    </Grid>
  </Section>
);

const ServicesSection = () => (
  <Section>
    <Typography variant="h4" gutterBottom>
      Nuestros Servicios
    </Typography>
    <Typography variant="body1" paragraph>
      En CONSULNETWORKS, ofrecemos una amplia gama de servicios diseñados para satisfacer las necesidades tecnológicas de tu empresa. Nuestro equipo de expertos está listo para ayudarte a transformar tu negocio y llevarlo al siguiente nivel.
    </Typography>
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <ImageCard>
          <CardMedia
            component="img"
            height="140"
            image="https://via.placeholder.com/300"
            alt="Consultoría Estratégica"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              Consultoría Estratégica
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ofrecemos asesoría especializada para optimizar tus procesos de negocio, reduciendo costos y mejorando la eficiencia.
            </Typography>
            <Divider style={{ margin: '10px 0' }} />
            <Typography variant="body2" color="text.secondary">
              - Análisis de mercado y tendencias<br />
              - Planificación y gestión de proyectos<br />
              - Optimización de recursos
            </Typography>
          </CardContent>
        </ImageCard>
      </Grid>
      <Grid item xs={12} md={4}>
        <ImageCard>
          <CardMedia
            component="img"
            height="140"
            image="https://via.placeholder.com/300"
            alt="Desarrollo de Software"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              Desarrollo de Software
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Creamos soluciones tecnológicas personalizadas que se adaptan a las necesidades específicas de tu empresa.
            </Typography>
            <Divider style={{ margin: '10px 0' }} />
            <Typography variant="body2" color="text.secondary">
              - Aplicaciones web y móviles<br />
              - Integraciones.jsx de sistemas<br />
              - Plataformas en la nube
            </Typography>
          </CardContent>
        </ImageCard>
      </Grid>
      <Grid item xs={12} md={4}>
        <ImageCard>
          <CardMedia
            component="img"
            height="140"
            image="https://via.placeholder.com/300"
            alt="Ciberseguridad"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              Ciberseguridad
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Protege la información sensible de tu empresa con nuestras soluciones avanzadas de ciberseguridad.
            </Typography>
            <Divider style={{ margin: '10px 0' }} />
            <Typography variant="body2" color="text.secondary">
              - Auditorías de seguridad<br />
              - Protección contra amenazas<br />
              - Monitoreo 24/7
            </Typography>
          </CardContent>
        </ImageCard>
      </Grid>
    </Grid>
  </Section>
);

const AboutUsSection = () => (
  <Section>
    <Typography variant="h4" gutterBottom>
      ¿Quiénes Somos?
    </Typography>
    <Typography variant="body1" paragraph>
      En CONSULNETWORKS, somos líderes en soluciones tecnológicas innovadoras. Con más de 20 años de experiencia, hemos ayudado a más de 500 empresas en todo el mundo a alcanzar sus objetivos a través de nuestras soluciones de TI personalizadas.
    </Typography>
    <Typography variant="body1" paragraph>
      Nuestra misión es ofrecer un servicio excepcional y soluciones de vanguardia que impulsen el éxito de nuestros clientes. Desde pequeñas empresas hasta grandes corporaciones, nos adaptamos a las necesidades de cada cliente con un enfoque único y personalizado.
    </Typography>
    <Typography variant="body1" paragraph>
      Nuestra visión es ser el socio estratégico preferido para las empresas que buscan innovación y eficiencia en sus procesos tecnológicos. Estamos comprometidos con la calidad, la transparencia y la satisfacción del cliente.
    </Typography>
    <Grid container spacing={4} marginTop={2}>
      <Grid item xs={12} md={4}>
        <Typography variant="h6" gutterBottom>
          Nuestra Historia
        </Typography>
        <Typography variant="body2">
          Fundada en 2001, CONSULNETWORKS comenzó como una pequeña consultoría especializada en la optimización de procesos empresariales. Con el tiempo, expandimos nuestros servicios para incluir desarrollo de software, ciberseguridad, y más. Hoy en día, somos una empresa global con oficinas en 10 países y un equipo de más de 300 expertos en tecnología.
        </Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h6" gutterBottom>
          Nuestro Equipo
        </Typography>
        <Typography variant="body2">
          Nuestro equipo está compuesto por profesionales altamente calificados en diversas áreas de TI. Contamos con desarrolladores, ingenieros de seguridad, consultores de negocios y especialistas en datos, todos comprometidos con el éxito de nuestros clientes.
        </Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h6" gutterBottom>
          Valores Corporativos
        </Typography>
        <Typography variant="body2">
          - Innovación constante<br />
          - Integridad y ética<br />
          - Compromiso con la excelencia<br />
          - Enfoque en el cliente<br />
          - Responsabilidad social y ambiental
        </Typography>
      </Grid>
    </Grid>
  </Section>
);

const TestimonialsSection = () => (
  <Section>
    <Typography variant="h4" gutterBottom>
      Testimonios
    </Typography>
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <Paper style={{ padding: '20px', backgroundColor: '#1f2145', color: '#fff' }}>
          <Typography variant="h6" gutterBottom>
            "Una experiencia transformadora"
          </Typography>
          <Typography variant="body2" paragraph>
            "Trabajar con CONSULNETWORKS ha sido una experiencia increíble. Su equipo entendió nuestras necesidades y nos proporcionó soluciones que superaron nuestras expectativas. Gracias a ellos, hemos mejorado nuestra eficiencia y reducido costos significativamente."
          </Typography>
          <Typography variant="body2" align="right">
            - Juan Pérez, CEO de TechSolutions
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper style={{ padding: '20px', backgroundColor: '#1f2145', color: '#fff' }}>
          <Typography variant="h6" gutterBottom>
            "Innovación en su máxima expresión"
          </Typography>
          <Typography variant="body2" paragraph>
            "CONSULNETWORKS nos ayudó a implementar una solución de software a medida que ha revolucionado la forma en que operamos. Su enfoque innovador y su compromiso con la calidad son incomparables."
          </Typography>
          <Typography variant="body2" align="right">
            - María Gómez, Directora de Operaciones en FinCorp
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper style={{ padding: '20px', backgroundColor: '#1f2145', color: '#fff' }}>
          <Typography variant="h6" gutterBottom>
            "Protección garantizada"
          </Typography>
          <Typography variant="body2" paragraph>
            "Gracias a las soluciones de ciberseguridad de CONSULNETWORKS, hemos podido proteger nuestra información más valiosa. Su equipo de expertos siempre está disponible y ha demostrado ser una verdadera fortaleza para nuestra empresa."
          </Typography>
          <Typography variant="body2" align="right">
            - Carlos Ramírez, CIO de SecureData Inc.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </Section>
);

const StatisticsSection = () => (
  <Section>
    <Typography variant="h4" gutterBottom>
      Nuestras Estadísticas
    </Typography>
    <Grid container spacing={4} marginTop={2}>
      <Grid item xs={12} md={3}>
        <Typography variant="h2" align="center">
          20+
        </Typography>
        <Typography variant="body1" align="center">
          Años de experiencia
        </Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography variant="h2" align="center">
          500+
        </Typography>
        <Typography variant="body1" align="center">
          Empresas satisfechas
        </Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography variant="h2" align="center">
          300+
        </Typography>
        <Typography variant="body1" align="center">
          Expertos en nuestro equipo
        </Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography variant="h2" align="center">
          10
        </Typography>
        <Typography variant="body1" align="center">
          Oficinas internacionales
        </Typography>
      </Grid>
    </Grid>
  </Section>
);

const BlogSection = () => (
  <Section>
    <Typography variant="h4" gutterBottom>
      Blog y Noticias
    </Typography>
    <Typography variant="body1" paragraph>
      Mantente informado con las últimas noticias y artículos sobre tecnología, innovación y más. Nuestro blog es el lugar perfecto para descubrir tendencias, consejos y casos de estudio que pueden inspirarte a llevar tu negocio al siguiente nivel.
    </Typography>
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <ImageCard>
          <CardMedia
            component="img"
            height="140"
            image="https://via.placeholder.com/300"
            alt="Últimas Tendencias en IA"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              Últimas Tendencias en IA
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Explora cómo la inteligencia artificial está transformando el mundo empresarial y cómo puedes aprovechar estas tendencias.
            </Typography>
          </CardContent>
        </ImageCard>
      </Grid>
      <Grid item xs={12} md={4}>
        <ImageCard>
          <CardMedia
            component="img"
            height="140"
            image="https://via.placeholder.com/300"
            alt="Ciberseguridad en 2024"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              Ciberseguridad en 2024
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Descubre las nuevas amenazas y cómo proteger tu empresa de los ataques más sofisticados.
            </Typography>
          </CardContent>
        </ImageCard>
      </Grid>
      <Grid item xs={12} md={4}>
        <ImageCard>
          <CardMedia
            component="img"
            height="140"
            image="https://via.placeholder.com/300"
            alt="Transformación Digital"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              Transformación Digital
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Aprende cómo las empresas están adaptándose a la era digital y los pasos que debes seguir para no quedarte atrás.
            </Typography>
          </CardContent>
        </ImageCard>
      </Grid>
    </Grid>
  </Section>
);

const ContactSection = () => (
  <Section>
    <Typography variant="h4" gutterBottom>
      Contáctanos
    </Typography>
    <Typography variant="body1" paragraph>
      Estamos aquí para ayudarte. Si tienes alguna pregunta o deseas más información sobre nuestros servicios, no dudes en contactarnos.
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">Oficina Central</Typography>
        <Typography variant="body2">
          Calle Falsa 123, Ciudad Futurista, Mundo Virtual, 12345
        </Typography>
        <Typography variant="body2">Teléfono: +1 234 567 890</Typography>
        <Typography variant="body2">Email: contacto@cnw.co</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">Horas de Atención</Typography>
        <Typography variant="body2">Lunes a Viernes: 9:00 AM - 6:00 PM</Typography>
        <Typography variant="body2">Sábados: 10:00 AM - 2:00 PM</Typography>
        <Typography variant="body2">Domingos: Cerrado</Typography>
      </Grid>
    </Grid>
    <Grid container justifyContent="center" spacing={2} marginTop={3}>
      <Grid item>
        <CustomButton variant="contained" size="large">
          Enviar Mensaje
        </CustomButton>
      </Grid>
    </Grid>
  </Section>
);

const FooterSection = () => (
  <Section style={{ textAlign: 'center', backgroundColor: '#0a0c1d' }}>
    <Typography variant="body2" paragraph>
      &copy; 2024 CONSULNETWORKS. Todos los derechos reservados. | Política de Privacidad | Términos de Uso
    </Typography>
    <Typography variant="body2" paragraph>
      Síguenos en:
    </Typography>
    <Grid container justifyContent="center" spacing={2}>
      <Grid item>
        <Button variant="text" color="inherit">
          Facebook
        </Button>
      </Grid>
      <Grid item>
        <Button variant="text" color="inherit">
          Twitter
        </Button>
      </Grid>
      <Grid item>
        <Button variant="text" color="inherit">
          LinkedIn
        </Button>
      </Grid>
      <Grid item>
        <Button variant="text" color="inherit">
          Instagram
        </Button>
      </Grid>
    </Grid>
  </Section>
);

const HomePage = () => {
  return (
    <Root>
      <Container maxWidth="lg">
        <HeaderSection />
        <ServicesSection />
        <AboutUsSection />
        <TestimonialsSection />
        <StatisticsSection />
        <BlogSection />
        <ContactSection />
        <FooterSection />
      </Container>
    </Root>
  );
};

export default HomePage;
*/


import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

// styles
const IFrameWrapper = styled('iframe')(({ theme }) => ({
  height: 'calc(79vh + 69px)',
  border: '1px solid',
  borderColor: theme.palette.primary.light,
  borderRadius: '5px',
}));

// ============================|| MATERIAL ICONS ||============================ //

const MaterialIcons = () => (
  <Card sx={{ overflow: 'hidden' }}>
    <IFrameWrapper title="Pagina Consulnetworks" width="100%" src="https://jhugheswebdev.github.io/sound-equalizer-threejs/" />
  </Card>
);

export default MaterialIcons;