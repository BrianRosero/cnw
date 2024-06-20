import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, AppBar, Toolbar, Container, Card, Grid, Collapse, Box } from '@mui/material';
import { styled } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// Importa los logotipos
import logoCliente1 from '../../../../assets/images/ESECENTRO.jpg';
import logoCliente2 from '../../../../assets/images/CAMARACC/CAMARACC.svg';
import logoCliente3 from '../../../../assets/images/DUANA.png';
import logoCliente4 from '../../../../assets/images/COSMITET.png';
import logoCliente5 from '../../../../assets/images/SERTORI.jpg';
import './style.css'; // Estilos CSS globales

// Estilos Emotion
const MainContent = styled(Container)({
  paddingTop: '20px',
});

const Section = styled('div')({
  marginBottom: '20px',
});

const FuturisticCard = styled(Card)({
  padding: '20px',
  marginBottom: '20px',
  borderRadius: '20px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
});

// Datos de ejemplo
const clientes = [
  { id: 1, nombre: 'RED DE SALUD DEL CENTRO SAS', email: 'cliente1@example.com', telefono: '123456789', logo: logoCliente1, opciones: ['Opción 1', 'Opción 2', 'Opción 3'], reporte: 'ReporteCliente1' },
  { id: 2, nombre: 'CAMARA DE COMERCIO DE CALI SAS', email: 'cliente2@example.com', telefono: '987654321', logo: logoCliente2, opciones: ['Opción 1', 'Opción 2', 'Opción 3'], reporte: 'ReporteCliente2' },
  { id: 3, nombre: 'DUANA SAS', email: 'cliente3@example.com', telefono: '111222333', logo: logoCliente3, opciones: ['Opción 1', 'Opción 2', 'Opción 3'], reporte: 'ReporteCliente3' },
  { id: 4, nombre: 'COSMITET SAS', email: 'cliente4@example.com', telefono: '111222333', logo: logoCliente4, opciones: ['Opción 1', 'Opción 2', 'Opción 3'], reporte: 'ReporteCliente4' },
  { id: 5, nombre: 'OZONO STORE SAS', email: 'cliente4@example.com', telefono: '111222333', logo: logoCliente5, opciones: ['Opción 1', 'Opción 2', 'Opción 3'], reporte: 'ReporteCliente5' },
];

function BoardESECENTRO() {
  const [expandedCliente, setExpandedCliente] = useState(null);
  const [selectedCliente, setSelectedCliente] = useState(null);

  const handleExpandCliente = (id) => {
    setExpandedCliente(expandedCliente === id ? null : id);
    setSelectedCliente(null);
  };

  const mostrarReporte = (cliente) => {
    setSelectedCliente(cliente);
    setExpandedCliente(null);
  };

  const getReporteComponent = (reporte) => {
    switch (reporte) {
      case 'ReporteCliente1':
        return import('../../../pages/Reportes.jsx');
      case 'ReporteCliente2':
        return import('../../../pages/sample-page/index.jsx');
      case 'ReporteCliente3':
        return import('../../../pages/Reportes.jsx');
      case 'ReporteCliente4':
        return import('../../../pages/Reportes.jsx');
      case 'ReporteCliente5':
        return import('../../../pages/Reportes.jsx');
      default:
        return null;
    }
  };

  const RenderReporte = React.lazy(() => getReporteComponent(selectedCliente?.reporte));
  return (
    <div>
      <AppBar position="static" sx={{ marginBottom: '20px' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CRM Dashboard
          </Typography>
          <Button component={Link} to="/dashboard" color="inherit">Dashboard</Button>
          <Button component={Link} to="/reports" color="inherit">Reports</Button>
        </Toolbar>
      </AppBar>
      <MainContent>
        <Typography variant="h1" gutterBottom>Dashboard de Rendimiento</Typography>
        {selectedCliente ? (
          <React.Suspense fallback={<div>Loading...</div>}>
            <RenderReporte />
          </React.Suspense>
        ) : (
          <Section>
            <Typography variant="h2" gutterBottom>Empresas</Typography>
            <Grid container spacing={2}>
              {clientes.map(cliente => (
                <Grid item xs={12} sm={6} md={4} key={cliente.id}>
                  <FuturisticCard>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                      <img src={cliente.logo} alt={cliente.nombre} style={{ width: '250px', height: '110px' }} />
                    </Box>
                    <Typography variant="h4">{cliente.nombre}</Typography>
                    <Typography variant="body1">Email: {cliente.email}</Typography>
                    <Typography variant="body1">Teléfono: {cliente.telefono}</Typography>
                    <Button
                      variant="outlined"
                      onClick={() => handleExpandCliente(cliente.id)}
                      endIcon={<ExpandMoreIcon />}
                      sx={{ marginTop: '10px' }}
                    >
                      Ver opciones
                    </Button>
                    <Collapse in={expandedCliente === cliente.id} timeout="auto" unmountOnExit>
                      <Typography variant="h6" sx={{ marginTop: '10px' }}>Opciones</Typography>
                      <ul>
                        {cliente.opciones.map((opcion, index) => (
                          <li key={index}>
                            <Button
                              component={Link}
                              to={`/cliente/${cliente.id}/${index + 1}`}
                              color="primary"
                            >
                              {opcion}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </Collapse>
                    <Button variant="contained" onClick={() => mostrarReporte(cliente)} sx={{ marginTop: '20px' }}>Ver
                      Reporte</Button>
                  </FuturisticCard>
                </Grid>
              ))}
            </Grid>
          </Section>
        )}
      </MainContent>
    </div>
  );
}

export default BoardESECENTRO;