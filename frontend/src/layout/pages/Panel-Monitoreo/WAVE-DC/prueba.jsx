import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Box, Button, Card, CardContent, CardMedia, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import DnsIcon from '@mui/icons-material/Dns';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Soft UI Dashboard PRO React components
import SoftBox from '@/layout/Ui-Components/Components/SoftBox/index.jsx';
import SoftTypography from '@/layout/Ui-Components/Components/SoftTypography/index.jsx';

// Soft UI Dashboard PRO React example components
import MiniStatisticsCard from '@/examples/Cards/StatisticsCards/MiniStatisticsCard/index.jsx';
import Globe from '@/examples/Globe/index.jsx';

// Soft UI Dashboard PRO React base styles
import breakpoints from '@/assets/theme/base/breakpoints.jsx';

// Data
import StorageIcon from '@mui/icons-material/Storage';
import MemoryIcon from '@mui/icons-material/Memory';
import LinkIcon from '@mui/icons-material/Link';

// Detalles
import Inicio from "./GLAKECNW/index.jsx"

import Chart from 'react-apexcharts';

function Default() {
  const [activeCard, setActiveCard] = useState('datacenters'); // Estado para controlar el contenido mostrado
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { values } = breakpoints;

  // Función para obtener datos del backend
  const fetchData = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/vcenter/resources`) // Cambia la URL según sea necesario
      .then((response) => {
        setData(response.data.data); // Actualizar estado con los datos obtenidos
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // useEffect para configurar el intervalo de actualización
  useEffect(() => {
    fetchData(); // Carga inicial de datos
    const intervalId = setInterval(fetchData, 10000); // Actualizar cada 5 segundos
    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, []);

  // Renderizar estados de carga y error
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Alert severity="error">Error al cargar los datos: {error}</Alert>
      </Box>
    );
  }

  const { cpu, memory, storage } = data;

  // Configuración de gráficos para ApexCharts

  // Gráfico de CPU
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

  // Gráfico de Memoria
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

  // Gráfico de Storage
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

  // Renderizar contenido basado en la tarjeta seleccionada
  const renderContent = () => {
    if (activeCard === 'datacenters') {
      return (
        <Card sx={{
          bgcolor: "#ffffff",
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
          p: 2,
        }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              maxWidth: '100%',
              height: "auto",
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
                    onClick={() => {
                      window.location.href = 'http://localhost:8082/widget/kanban'; // Redirigir a la ruta
                    }}
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
    } else if (activeCard === 'host') {
      return (
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Recursos de vCenter
          </Typography>
        </Box>
      );
    }
  };

  return (
    <div>
      <SoftBox py={3}>
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
            >
              CONSULNETWORKS
            </SoftTypography>
            <Grid container spacing={3} position={'relative'}>
              <Grid item xs={12} sm={5} >
                <SoftBox mb={3} onClick={() => setActiveCard('datacenters')} style={{ cursor: 'pointer' }}>
                  <MiniStatisticsCard
                    title={{ text: 'DATACENTER' }}
                    count="Datacenter"
                    icon={{ color: 'info', component: <StorageIcon /> }}
                    bgColor="primary"
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={5}>
                <SoftBox mb={3} onClick={() => setActiveCard('host')} style={{ cursor: 'pointer' }}>
                  <MiniStatisticsCard
                    title={{ text: 'Host', fontWeight: 'bold', sx: { color: '!white' } }}
                    count="2,300"
                    //percentage={{ color: 'success', text: '+3%', sx: { color: 'white' } }}
                    icon={{ color: 'info', component: <StorageIcon /> }}
                    bgColor={'primary'} color={'white'}
                  />
                </SoftBox>
              </Grid>
              {/*<Grid item xs={12} sm={5}>
                <SoftBox mb={3} onClick={() => setActiveCard('clusters')} style={{ cursor: 'pointer' }}>
                  <MiniStatisticsCard
                    title={{ text: 'Clusters', fontWeight: 'bold' }}
                    count="+3,462"
                    percentage={{ color: 'error', text: '-2%' }}
                    icon={{ color: 'info', component: <StorageIcon /> }}
                    bgColor={'primary'} sx={{ color: 'white' }}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={5}>
                <SoftBox mb={3} onClick={() => setActiveCard('ventas')} style={{ cursor: 'pointer' }}>
                  <MiniStatisticsCard
                    title={{ text: 'Ventas', fontWeight: 'bold' }}
                    count="$103,430"
                    percentage={{ color: 'success', text: '+5%' }}
                    icon={{ color: 'info', component: <StorageIcon /> }}
                    bgColor={'primary'} sx={{ color: 'white' }}
                  />
                </SoftBox>
              </Grid>*/}
            </Grid>
          </Grid>
          <Grid item xs={12} md={8} lg={6} position={'relative'}>
            {renderContent()}
          </Grid>
        </Grid>
      </SoftBox>
    </div>
  );
}

export default Default;
