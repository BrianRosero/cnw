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
import Detalles from '../../../../../layout/pages/Panel-Monitoreo/WAVE-DC/GLAKECNW/index.jsx';
import SoftTypography from '@/layout/Ui-Components/Components/SoftTypography/index.jsx';
import SoftBox from '@/layout/Ui-Components/Components/SoftBox/index.jsx';
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
