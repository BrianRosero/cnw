import React, { useEffect, useState } from 'react';
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

import axios from 'axios';
import SoftTypography from '@/components/SoftTypography/index.jsx';
import SoftBox from '@/components/SoftBox/index.jsx';
import Chart from 'react-apexcharts';
import GLAKE from '../GLAKECNW/index.jsx';
import CNWS from '../CNWS/index.jsx';
import CNWSImage from '../CNWS/CNWS.png';

// Soft UI Dashboard PRO React example components
import MiniStatisticsCard from '../../../../examples/Cards/StatisticsCards/MiniStatisticsCard/index.jsx';
import Globe from '../../../../examples/Globe/index.jsx';

// Soft UI Dashboard PRO React base styles
import breakpoints from '../../../../assets/theme/base/breakpoints.jsx';
import StorageIcon from '@mui/icons-material/Storage.js';

// Página principal del Datacenter
const Datacenter = () => {
  const [activeCard, setActiveCard] = useState('datacenters');
  const [view, setView] = useState('home');
  const [breadcrumbs, setBreadcrumbs] = useState(['Home']);

  const [dataGlake, setDataGlake] = useState(null);
  const [loadingGlake, setLoadingGlake] = useState(true);
  const [errorGlake, setErrorGlake] = useState(null);

  const [dataCNWS, setDataCNWS] = useState(null);
  const [loadingCNWS, setLoadingCNWS] = useState(true);
  const [errorCNWS, setErrorCNWS] = useState(null);

  const changeView = (newView, breadcrumbLabel) => {
    if (newView === 'home') {
      setBreadcrumbs(['Home']);
    } else if (newView === 'info') {
      setBreadcrumbs(['Home', '/', 'GLAKECNW']);
    } else if (newView === 'detalles') {
      setBreadcrumbs(['Home', 'Detalles']);
    }
    setView(newView);
  };

  // Función para obtener datos del backend
  const fetchDataGlake = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/vcenter/resources-glake`) // Cambia la URL según sea necesario
      .then((response) => {
        setDataGlake(response.data.data); // Actualizar estado con los datos obtenidos
        setLoadingGlake(false);
      })
      .catch((err) => {
        setErrorGlake(err.message);
        setLoadingGlake(false);
      });
  };

  // Función para obtener datos del backend
  const fetchDataCNWS = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/vcenter/resources-cnws`) // Cambia la URL según sea necesario
      .then((response) => {
        setDataCNWS(response.data.data); // Actualizar estado con los datos obtenidos
        setLoadingCNWS(false);
      })
      .catch((err) => {
        setErrorCNWS(err.message);
        setLoadingCNWS(false);
      });
  };

  // useEffect para configurar el intervalo de actualización
  useEffect(() => {
    fetchDataGlake(); // Carga inicial de datos
    const intervalId = setInterval(fetchDataGlake, 10000); // Actualizar cada 5 segundos
    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, []);

  // useEffect para configurar el intervalo de actualización
  useEffect(() => {
    fetchDataCNWS(); // Carga inicial de datos
    const intervalId = setInterval(fetchDataCNWS, 10000); // Actualizar cada 5 segundos
    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, []);

// Renderizar estados de carga y error
  if (loadingGlake || loadingCNWS) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (errorGlake || errorCNWS) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Alert severity="error">
          {errorGlake ? `Error en GLAKE: ${errorGlake}` : ''}
          {errorCNWS ? `Error en CNWS: ${errorCNWS}` : ''}
        </Alert>
      </Box>
    );
  }

  const renderContent = () => {
    const data = activeCard === 'datacenters' ? dataGlake : dataCNWS;
    const { cpu, memory, storage } = data;

    const cpuChartOptions = {
      chart: { type: 'radialBar' },
      plotOptions: {
        radialBar: {
          hollow: { size: '70%' },
          dataLabels: {
            name: { show: true, fontSize: '13px' },
            value: { show: true, fontSize: '20px', formatter: (val) => `${val}%` },
          },
        },
      },
      labels: ['Uso de CPU'],
      colors: ['#00a882'],
    };
    const cpuChartData = [cpu.usage_percent.toFixed(1)];

    const memoryChartOptions = {
      chart: { type: 'radialBar' },
      plotOptions: {
        radialBar: {
          hollow: { size: '70%' },
          dataLabels: {
            name: { show: true, fontSize: '13px' },
            value: { show: true, fontSize: '20px', formatter: (val) => `${val}%` },
          },
        },
      },
      labels: ['Uso de Memoria'],
      colors: ['#00a882'],
    };
    const memoryChartData = [memory.usage_percent.toFixed(1)];

    const storageChartOptions = {
      chart: { type: 'radialBar' },
      plotOptions: {
        radialBar: {
          hollow: { size: '70%' },
          dataLabels: {
            name: { show: true, fontSize: '13px' },
            value: { show: true, fontSize: '20px', formatter: (val) => `${val}%` },
          },
        },
      },
      labels: ['Uso de Storage'],
      colors: ['#00a882'],
    };
    const storageChartData = [storage.usage_percent.toFixed(1)];

    return (
      <Card
        sx={{
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
          image={activeCard === 'datacenters' ? 'https://www.hpe.com/content/dam/hpe/shared-publishing/images-norend/accolades/GreenLake-logo-wave-bkg-26-9.jpg' : CNWSImage}
          alt="DataCenters"
        />
        <CardContent>
          <SoftTypography variant="h2" fontWeight="bold" gutterBottom>
            {activeCard === 'datacenters' ? 'GLAKE CNW' : 'CNWS'}
          </SoftTypography>
          <SoftTypography variant="h4" fontWeight="bold" gutterBottom>
            {data.name}
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
                    <Chart options={cpuChartOptions} series={cpuChartData} type="radialBar" height={230} />
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
                    <Chart options={memoryChartOptions} series={memoryChartData} type="radialBar" height={200} />
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
                    <Chart options={storageChartOptions} series={storageChartData} type="radialBar" height={200} />
                    <Typography variant="h4"> <strong>Asignado:</strong> {storage.total_tb.toFixed(2)} TB</Typography>
                    <Typography variant="h4"> <strong>Utilizado:</strong> {storage.used_tb.toFixed(2)} TB</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={12} container justifyContent="center" alignItems="center">
                {activeCard === 'datacenters' ? (
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
                    Ampliar detalles GLAKE
                  </Button>
                ) : (
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
                    onClick={() => changeView('detalles', 'Detalles')}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,168,130,0.27)')} // Hover (entrada)
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,168,130,0.18)')} // Hover (salida)
                  >
                    Ampliar detalles CNWS
                  </Button>
                )}
              </Grid>
            </Grid>
          </SoftBox>
        </CardContent>
      </Card>
    );
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
                  changeView('info', 'GLAKECNW');
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
      <Box>
        {view === 'home' && (
          <div>
            <SoftBox>
              <Grid container style={{ overflow: 'visible' }}>
                <Grid item xs={12}>
                  <SoftBox
                    position="absolute"
                    style={{
                      top: '5%',
                      right: '-32%',
                      overflow: 'visible', // No cortar contenido
                      display: 'flex', // Alinear correctamente si hay más contenido
                      justifyContent: 'center', // Centrar horizontalmente el globo
                      alignItems: 'center', // Centrar verticalmente
                      width: '100%', // Asegurar que el contenedor use el espacio disponible
                      height: '800px', // Altura fija o flexible según sea necesario
                    }}
                  >
                    <Globe
                      canvasStyle={{
                        width: '100%', // Usar todo el ancho del contenedor padre
                        height: '100%', // Ajustar la altura al contenedor
                      }}
                      sx={{
                        width: { xs: '500px', md: '600px' },
                        height: 'auto',
                        display: { xs: 'none', md: 'block' },
                      }}
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} lg={7}>
                  <SoftTypography
                    variant="h1"
                    textTransform="capitalize"
                    fontWeight="bold"
                    color="primary"
                    gutterBottom
                    position={'relative'}
                  >
                    CONSULNETWORKS
                  </SoftTypography>
                  <Grid container spacing={2} alignItems="center" position={'relative'}>
                    {/* Tarjeta para el Datacenter GLAKE */}
                    <Grid item xs={12} sm={6} md={5}>
                      <Card
                        onClick={() => setActiveCard("datacenters")}
                        sx={{
                          cursor: "pointer",
                          padding: "16px",
                          background: "linear-gradient(135deg, #00a882, #00796b)",
                          borderRadius: "12px",
                          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                          transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0px 6px 15px rgba(0,0,0,0.3)",
                          },
                        }}
                      >
                        <CardContent>
                          <Box display="flex" alignItems="center" mb={2}>
                            <StorageIcon sx={{ fontSize: "4rem", color: "#004a8f", marginRight: "16px" }} />
                            <Typography
                              variant="h5"
                              sx={{
                                fontWeight: "bold",
                                color: "#ffffff",
                                fontSize: "1.5rem",
                              }}
                            >
                              GLAKE Datacenter
                            </Typography>
                          </Box>
                          <Typography
                            variant="body1"
                            sx={{
                              color: "#ffffff",
                              fontWeight: 600,
                              fontSize: "1.3rem",
                            }}
                          >
                            Infraestructura avanzada
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#ffffff",
                            }}
                          >
                            Conectividad óptima y procesamiento de alto rendimiento.
                            Datacenter en Wave
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={5}>
                      <SoftBox
                        mb={3}
                        onClick={() => setActiveCard('datacenters')}
                        style={{
                          cursor: 'pointer',
                          padding: '13px',
                          background: 'linear-gradient(135deg, #00a882, #00796b)',
                          borderRadius: '12px',
                          boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                          e.currentTarget.style.boxShadow = '0px 6px 15px rgba(0,0,0,0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = '0px 4px 10px rgba(0,0,0,0.2)';
                        }}
                      >
                        <MiniStatisticsCard
                          title={{
                            text: 'GLAKE Datacenter',
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                            color: '#004a8f', // Color del texto
                          }}
                          count={
                            <span style={{ color: '#004a8f', fontWeight: '600' }}>
                              Infraestructura avanzada
                            </span>
                          }
                          description={
                            <span style={{ color: '#004a8f' }}>
                              Conectividad óptima y procesamiento de alto rendimiento.
                            </span>
                          }
                          icon={{
                            color: '#004a8f',
                            component: <StorageIcon style={{ fontSize: '4rem', color: '#004a8f' }} />,
                          }}
                          bgColor="transparent"
                        />
                      </SoftBox>
                    </Grid>
                    {/* Tarjeta para el Datacenter CNWS */}
                    <Grid item xs={12} sm={6} md={5}>
                      <SoftBox
                        mb={3}
                        onClick={() => setActiveCard('host')}
                        style={{
                          cursor: 'pointer',
                          padding: '20px',
                          background: 'linear-gradient(135deg, #4caf50, #388e3c)',
                          borderRadius: '12px',
                          boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                          e.currentTarget.style.boxShadow = '0px 6px 15px rgba(0,0,0,0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = '0px 4px 10px rgba(0,0,0,0.2)';
                        }}
                      >
                        <MiniStatisticsCard
                          title={{
                            text: 'CNWS Datacenter',
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                            color: 'white',
                          }}
                          count="Centro de virtualización"
                          description="Optimización de recursos y administración de cargas de trabajo."
                          icon={{
                            color: 'white',
                            component: <StorageIcon style={{ fontSize: '4rem', color: 'white' }} />,
                          }}
                          bgColor="transparent"
                        />
                      </SoftBox>
                    </Grid>
                  </Grid>

                </Grid>
                <Grid item xs={12} md={8} lg={6} position={'relative'}>
                  {renderContent()}
                </Grid>
              </Grid>
            </SoftBox>
          </div>
        )}
        {view === 'info' && (
          <Grid item xs={12} md={8} lg={6} position={'relative'}>
            <GLAKE />
          </Grid>
        )}
        {view === 'detalles' && (
          <Grid item xs={12} md={8} lg={6} position={'relative'}>
            <CNWS />
          </Grid>
        )}
      </Box>
    </div>
  );
};

export default Datacenter;
