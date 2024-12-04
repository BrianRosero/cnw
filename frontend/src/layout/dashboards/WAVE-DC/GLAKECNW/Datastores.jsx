import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material';
import Detalles from '@/layout/dashboards/GLAKECNW/default/index.jsx';
import SoftTypography from '@/components/SoftTypography/index.jsx';
import SoftBox from '@/components/SoftBox/index.jsx';
import Chart from 'react-apexcharts';

// Soft UI Dashboard PRO React example components
import MiniStatisticsCard from '../../../examples/Cards/StatisticsCards/MiniStatisticsCard/index.jsx';
import Globe from '../../../examples/Globe/index.jsx';

// Soft UI Dashboard PRO React base styles
import breakpoints from '../../../assets/theme/base/breakpoints.jsx';

// Información del Datacenter
const DatacenterInfo = () => (
  <Card sx={{
    bgcolor: '#ffffff',
    borderRadius: 2,
    boxShadow: 3,
    textAlign: 'center',
    p: 2,
  }}>
    <CardMedia
      component="img"
      sx={{
        width: '100%',
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '8px',
        margin: '0 auto',
      }}
      image="https://www.hpe.com/content/dam/hpe/shared-publishing/images-norend/accolades/GreenLake-logo-wave-bkg-26-9.jpg"
      alt="Datacenter Info"
    />
    <CardContent>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Datacenter Information
      </Typography>
      <Typography variant="body1">
        Ubicación: Ciudad de la Innovación<br />
        Capacidad: 200 racks<br />
        Conectividad: 40 Gbps<br />
        Certificaciones: ISO 27001, Tier III
      </Typography>
    </CardContent>
  </Card>
);

// Página principal del Datacenter
const Datacenter = () => {
  const [view, setView] = useState('home');
  const [breadcrumbs, setBreadcrumbs] = useState(['Home']);

  const changeView = (newView, breadcrumbLabel) => {
    if (newView === 'home') {
      setBreadcrumbs(['Home']);
    } else if (newView === 'info') {
      setBreadcrumbs(['Home', 'Datacenter Info']);
    } else if (newView === 'detalles') {
      setBreadcrumbs(['Home', 'Detalles']);
    }
    setView(newView);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {breadcrumbs.map((breadcrumb, index) => (
            <Button
              key={index}
              color="inherit"
              onClick={() => {
                if (index === 0) {
                  changeView('home', 'Home');
                } else if (index === 1) {
                  changeView('info', 'Datacenter Info');
                } else if (index === 2) {
                  changeView('detalles', 'Detalles');
                }
              }}
            >
              {breadcrumb}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
      <Box py={3}>
        {view === 'home' && (
          <Grid container spacing={3} position={'relative'}>
            <Grid item xs={12} sm={5}>
              <SoftBox mb={3} onClick={() => changeView('info', 'Datacenter Info')} style={{ cursor: 'pointer' }}>
                <Card sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  borderRadius: 2,
                  boxShadow: 3,
                  textAlign: 'center',
                  p: 2,
                }}>
                  <Typography variant="h6" fontWeight="bold">
                    DATACENTER
                  </Typography>
                </Card>
              </SoftBox>
            </Grid>

            <Grid item xs={12} sm={5}>
              <Box mb={3} onClick={() => changeView('detalles', 'Detalles')} style={{ cursor: 'pointer' }}>
                <Card sx={{
                  bgcolor: 'secondary.main',
                  color: 'white',
                  borderRadius: 2,
                  boxShadow: 3,
                  textAlign: 'center',
                  p: 2,
                }}>
                  <Typography variant="h6" fontWeight="bold">
                    DETALLES
                  </Typography>
                </Card>
              </Box>
            </Grid>
          </Grid>
        )}
        {view === 'info' && (
          <Grid item xs={12} md={8} lg={6} position={'relative'}>
            <DatacenterInfo />
          </Grid>
        )}
        {view === 'detalles' && (
          <Grid item xs={12} md={8} lg={6} position={'relative'}>
            <Detalles />
          </Grid>
        )}
      </Box>
    </div>
  );
};

export default Datacenter;

return (
  <Card sx={{
    bgcolor: '#ffffff',
    borderRadius: 2,
    boxShadow: 3,
    textAlign: 'center',
  }}
  >
    <CardMedia
      component="img"
      sx={{
        width: '100%',
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '8px',
        margin: '0 auto',
      }}
      image="https://www.hpe.com/content/dam/hpe/shared-publishing/images-norend/accolades/GreenLake-logo-wave-bkg-26-9.jpg"
      alt="DataCenters"
    />
    <CardContent>
      <SoftTypography variant="h2" fontWeight="bold" gutterBottom>
        GLAKE CNW
      </SoftTypography>
      <SoftTypography variant="h4" fontWeight="bold" gutterBottom>
        glakecnw.cnw.local
      </SoftTypography>
      <SoftBox mt={2}>
        <Grid container spacing={2}>
          {/* Recursos CPU */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h3" gutterBottom>
                  CPU
                </Typography>
                <Chart
                  options={cpuChartOptions}
                  series={cpuChartData}
                  type="radialBar"
                  height={230}
                />
                <Typography variant="h4"> <strong>Asignado:</strong> {cpu.total_cpu_ghz.toFixed(2)} GHz</Typography>
                <Typography variant="h4"> <strong>Utilizado:</strong> {cpu.usage_mhz.toFixed(2)} GHz</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Recursos de Memoria */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h3" gutterBottom>
                  Memoria
                </Typography>
                <Chart
                  options={memoryChartOptions}
                  series={memoryChartData}
                  type="radialBar"
                  height={200}
                />
                <Typography variant="h4"><strong>Asignado:</strong> {memory.total_tb.toFixed(2)} TB</Typography>
                <Typography variant="h4"> <strong>Utilizado:</strong> {memory.used_tb.toFixed(2)} TB</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Recursos de Almacenamiento */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h3" gutterBottom>
                  Almacenamiento
                </Typography>
                <Chart
                  options={storageChartOptions}
                  series={storageChartData}
                  type="radialBar"
                  height={200}
                />
                <Typography variant="h4"> <strong>Asignado:</strong> {storage.total_tb.toFixed(2)} TB</Typography>
                <Typography variant="h4"> <strong>Utilizado:</strong> {storage.used_tb.toFixed(2)} TB</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={12} container justifyContent="center" alignItems="center">
            <Button
              style={{
                background: 'rgba(0,168,130,0.09)',
                color: '#00a882',
                fontSize: '1.3rem', // Aumentar el tamaño del texto
                padding: '0px 7px', // Aumentar el espacio interno
                borderRadius: '8px', // Botón redondeado
                transition: 'all 0.3s ease', // Suavidad en el cambio de estilos
              }}
              onMouseDown={(e) => (e.currentTarget.style.opacity = '0.7')} // Cambio al presionar
              onMouseUp={(e) => (e.currentTarget.style.opacity = '1')} // Volver al normal
              onClick={() => changeView('info', 'GLAKECNW')}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,168,130,0.27)')} // Hover (entrada)
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,168,130,0.18)')} // Hover (salida)
            >
              Ampliar detalles
            </Button>
          </Grid>
        </Grid>
      </SoftBox>
    </CardContent>
  </Card>
);