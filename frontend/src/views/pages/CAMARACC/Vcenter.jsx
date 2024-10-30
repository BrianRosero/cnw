import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Button, Grid, CircularProgress, Avatar, Alert, Divider, Box, Card, CardContent,
  CardActions, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton,
} from '@mui/material';
import {
  PowerSettingsNew as PowerIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Computer as ComputerIcon,
} from '@mui/icons-material';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import Chart from 'react-apexcharts';
import UserService from '@/services/user.service.jsx';
import EventBus from '../../../common/EventBus.jsx';

const buttonStyle = {
  borderRadius: '10px',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  transition: 'transform 0.2s, box-shadow 0.2s, background 0.3s, color 0.3s',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  width: '100%', // Botones ocupan todo el ancho del contenedor
  padding: '0px 0px', // Mantener el padding para compactar
  margin: '3px',
  // Responsive styles
  fontSize: '12px', // Tamaño de fuente por defecto
  '@media (min-width: 600px)': {
    fontSize: '5px', // Tamaño de fuente en pantallas medianas
  },
  '@media (min-width: 960px)': {
    fontSize: '6px', // Tamaño de fuente en pantallas grandes
  },
  '@media (min-width: 1280px)': {
    fontSize: '8px', // Tamaño de fuente en pantallas muy grandes
  },
};

// Estilo para el botón habilitado
const buttonEnabledStyle = {
  ...buttonStyle,
  color: '#ffffff',
  backgroundColor: '#333333',
  boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.3)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.4)',
  },
};

// Estilo para el botón deshabilitado
const buttonDisabledStyle = {
  ...buttonStyle,
  color: '#ffffff80',
  backgroundColor: '#cccccc',
  boxShadow: 'none',
  cursor: 'not-allowed',
};

// Estilo para el icono del botón
const buttonIconStyle = {
  marginRight: '1px',
  fontSize: 'inherit', // Asegura que el icono se ajuste al tamaño del botón
};

// Estilo para el botón de encendido
const buttonPowerOnStyle = {
  ...buttonEnabledStyle,
  backgroundColor: '#6daa25',
};

// Estilo para el botón de apagado
const buttonPowerOffStyle = {
  ...buttonEnabledStyle,
  backgroundColor: '#ff1000',
};

// Estilo para el botón de suspender
const buttonSuspendStyle = {
  ...buttonEnabledStyle,
  backgroundColor: '#dcd801',
};

function App() {
  const [content, setContent] = useState('');
  const [isModerator, setIsModerator] = useState(false);
  const [isAdminCAMARACC, setIsAdminCAMARACC] = useState(false);
  const [vms, setVms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vmStats, setVmStats] = useState({ running: 0, stopped: 0, suspended: 0 });
  const [vmStateHistory, setVmStateHistory] = useState({
    dates: [],
    running: [],
    stopped: [],
    suspended: [],
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [dialog, setDialog] = useState({ open: false, action: null, vmId: null });
  const [selectedEnvironment, setSelectedEnvironment] = useState(null); // Estado para controlar el entorno seleccionado

  const excludedVmIds = ['vm-1015', 'vm-2001', 'vm-2019', 'vm-2032', 'vm-2166', 'vm-2201'];

  // Función para agrupar las VMs por entorno según sus IDs
  const agruparPorEntorno = (vms) => {
    const entornos = {
      desarrollo: ['vm-2038', 'vm-2031', 'vm-2041', 'vm-4358', 'vm-2045', 'vm-2044', 'vm-2025', 'vm-2013', 'vm-2020', 'vm-2012', 'vm-2024', 'vm-2023', 'vm-2037', 'vm-2021', 'vm-2004' ],
      produccion: ['vm-2068', 'vm-2077', 'vm-2078', 'vm-2079', 'vm-2080', 'vm-2081', 'vm-2083', 'vm-2084', 'vm-2085', 'vm-2086', 'vm-2094', 'vm-2096', 'vm-2098', 'vm-2100', 'vm-2102',
        'vm-2104', 'vm-2106', 'vm-2108', 'vm-2110', 'vm-2112', 'vm-2114', 'vm-2119', 'vm-2121', 'vm-2136', 'vm-2143', 'vm-2144', 'vm-2146', 'vm-2148', 'vm-2150', 'vm-2210', 'vm-2217',
        'vm-2218', 'vm-2219', 'vm-2220', 'vm-2221' ],
      calidad: ['vm-2065', 'vm-2181', 'vm-2183', 'vm-2178', 'vm-2176', 'vm-2174', 'vm-2172', 'vm-2063', 'vm-2061', 'vm-2051',
        /*'vm-2069', 'vm-2070', 'vm-2072', 'vm-2074'*/],
    };

    const agrupadas = {
      desarrollo: [],
      produccion: [],
      calidad: [],
    };

    vms.forEach((vm) => {
      if (entornos.desarrollo.includes(vm.vm)) {
        agrupadas.desarrollo.push(vm);
      } else if (entornos.produccion.includes(vm.vm)) {
        agrupadas.produccion.push(vm);
      } else if (entornos.calidad.includes(vm.vm)) {
        agrupadas.calidad.push(vm);
      }
    });

    return agrupadas;
  };

  const fetchVMs = async () => {
    try {
      // Usa la URL base dependiendo del entorno (producción o desarrollo)
      const API_URL = `${import.meta.env.VITE_API_URL}/vms`;
      const response = await axios.get(API_URL);
      const filteredVms = response.data.filter(vm => !excludedVmIds.includes(vm.vm));
      setVms(filteredVms);

      // Calcular estadísticas de VM
      const running = filteredVms.filter(vm => vm.power_state === 'POWERED_ON').length;
      const stopped = filteredVms.filter(vm => vm.power_state === 'POWERED_OFF').length;
      const suspended = filteredVms.filter(vm => vm.power_state === 'SUSPENDED').length;

      setVmStats({ running, stopped, suspended });

      // Actualizar historial de estados de VM
      const now = new Date().toLocaleString();
      setVmStateHistory((prevHistory) => ({
        dates: [...prevHistory.dates, now],
        running: [...prevHistory.running, running],
        stopped: [...prevHistory.stopped, stopped],
        suspended: [...prevHistory.suspended, suspended],
      }));
    } catch (error) {
      setError('Error al obtener las VMs');
      console.error('Error al obtener las VMs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    UserService.getModeratorBoard().then(
      (response) => {
        setIsModerator(true);
      },
      (error) => {
        handleErrorResponse(error);
      }
    );
  }, []);

  useEffect(() => {
    UserService.getAdminCAMARACC().then(
      (response) => {
        setIsAdminCAMARACC(true);
      },
      (error) => {
        handleErrorResponse(error);
      }
    );
  }, []);

  // Función para manejar errores de respuesta de las API
  const handleErrorResponse = (error) => {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    setContent(errorMessage);

    if (error.response && error.response.status === 401) {
      EventBus.dispatch('logout');
    }
  };

  useEffect(() => {
    fetchVMs();
  }, []);

  useEffect(() => {
    const now = new Date().toLocaleString();
    setVmStateHistory((prevHistory) => ({
      dates: [...prevHistory.dates, now],
      running: [...prevHistory.running, vmStats.running],
      stopped: [...prevHistory.stopped, vmStats.stopped],
      suspended: [...prevHistory.suspended, vmStats.suspended],
    }));

    // Llamada a la API para almacenar los datos en MongoDB
    const storeVmData = async () => {
      try {
        // Usa la URL base desde la variable de entorno dependiendo del entorno
        const API_URL = `${import.meta.env.VITE_API_URL}/store-vm-data`;

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            running: vmStats.running,
            stopped: vmStats.stopped,
            suspended: vmStats.suspended,
            timestamp: new Date().toISOString(), // Enviar la fecha y hora exacta
          }),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error(error);
      }
    };

    storeVmData();
  }, [vmStats]);

  useEffect(() => {
    const fetchVmData = async () => {
      try {
        // Usa la URL base desde la variable de entorno
        const API_URL = `${import.meta.env.VITE_API_URL}/get-vm-data`;
        const response = await fetch(API_URL);
        const data = await response.json();

        // Ordenar los datos por fecha/timestamp
        const sortedData = data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        const dates = sortedData.map((entry) => new Date(entry.timestamp).toLocaleString());
        const running = sortedData.map((entry) => entry.running);
        const stopped = sortedData.map((entry) => entry.stopped);
        const suspended = sortedData.map((entry) => entry.suspended);

        setVmStateHistory({
          dates,
          running,
          stopped,
          suspended,
        });
      } catch (error) {
        console.error('Error al obtener los datos de las VMs:', error);
      }
    };
    fetchVmData();
  }, []);

  // Agrupar las VMs
  const vmsAgrupadas = agruparPorEntorno(vms); // Agrupar las VMs

  const handleEnvironmentClick = (environment) => {
    setSelectedEnvironment(selectedEnvironment === environment ? null : environment);
  };

  const handlePowerOn = async (vmId) => {
    try {
      // Usa la URL base desde la variable de entorno
      const API_URL = `${import.meta.env.VITE_API_URL}/vms/${vmId}/power-on`;
      await axios.post(API_URL);
      setSnackbar({ open: true, message: 'La VM se encendió exitosamente', severity: 'success' });
      updateVmStatus(vmId, 'POWERED_ON');
    } catch (error) {
      console.error('Error al encender la maquina virtual, posiblemente no tienes los permisos necesarios.', error);
      setSnackbar({
        open: true,
        message: 'Error al encender la maquina virtual, posiblemente no tienes los permisos necesarios.',
        severity: 'error',
      });
    }
  };

  const handlePowerOff = async (vmId) => {
    try {
      // Usa la URL base desde la variable de entorno
      const API_URL = `${import.meta.env.VITE_API_URL}/vms/${vmId}/power-off`;
      await axios.post(API_URL);
      setSnackbar({ open: true, message: 'La VM se apagó exitosamente', severity: 'success' });
      updateVmStatus(vmId, 'POWERED_OFF');
    } catch (error) {
      console.error('Error al apagar la maquina virtual, posiblemente no tienes los permisos necesarios.:', error);
      setSnackbar({
        open: true,
        message: 'Error al apagar la maquina virtual, posiblemente no tienes los permisos necesarios.',
        severity: 'error',
      });
    }
  };

  const handleSuspend = async (vmId) => {
    try {
      // Usa la URL base desde la variable de entorno
      const API_URL = `${import.meta.env.VITE_API_URL}/vms/${vmId}/suspend`;
      await axios.post(API_URL);
      setSnackbar({ open: true, message: 'La VM se suspendió exitosamente', severity: 'success' });
      updateVmStatus(vmId, 'SUSPENDED');
    } catch (error) {
      console.error('Error al suspender la maquina virtual, posiblemente no tienes los permisos necesarios.', error);
      setSnackbar({
        open: true,
        message: 'Error al suspender la maquina virtual, posiblemente no tienes los permisos necesarios.',
        severity: 'error',
      });
    }
  };

  const updateVmStatus = (vmId, status) => {
    if (excludedVmIds.includes(vmId)) return;

    setVms((prevVms) =>
      prevVms.map((vm) =>
        vm.vm === vmId ? { ...vm, power_state: status } : vm,
      ),
    );

    setVmStats((prevStats) => {
      const newStats = { ...prevStats };
      if (status === 'POWERED_ON') {
        newStats.running += 1;
        newStats.stopped -= 1;
      } else if (status === 'POWERED_OFF') {
        newStats.stopped += 1;
        newStats.running -= 1;
      } else if (status === 'SUSPENDED') {
        newStats.suspended += 1;
        newStats.running -= 1;
      }

      return newStats;
    });
  };

  const handleDialogOpen = (action, vmId) => {
    setDialog({ open: true, action, vmId });
  };

  const handleDialogClose = () => {
    setDialog({ open: false, action: null, vmId: null });
  };

  const handleDialogConfirm = () => {
    const { action, vmId } = dialog;
    handleDialogClose();
    if (action === 'power-on') handlePowerOn(vmId);
    if (action === 'power-off') handlePowerOff(vmId);
    if (action === 'suspend') handleSuspend(vmId);
  };

  // Renderizando las acciones
  const renderActions = (vm) => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Button
        size="small"
        startIcon={<PlayIcon style={buttonIconStyle} />}
        onClick={() => handleDialogOpen('power-on', vm.vm)}
        disabled={vm.power_state === 'POWERED_ON'}
        style={{
          ...(vm.power_state === 'POWERED_ON' ? buttonDisabledStyle : buttonPowerOnStyle),
        }}
      >
        Encender
      </Button>
      <Button
        size="small"
        startIcon={<PowerIcon style={buttonIconStyle} />}
        onClick={() => handleDialogOpen('power-off', vm.vm)}
        disabled={vm.power_state === 'POWERED_OFF'}
        style={{
          ...(vm.power_state === 'POWERED_OFF' ? buttonDisabledStyle : buttonPowerOffStyle),
        }}
      >
        Apagar
      </Button>
      <Button
        size="small"
        startIcon={<PauseIcon style={buttonIconStyle} />}
        onClick={() => handleDialogOpen('suspend', vm.vm)}
        disabled={vm.power_state === 'SUSPENDED'}
        style={{
          ...(vm.power_state === 'SUSPENDED' ? buttonDisabledStyle : buttonSuspendStyle),
        }}
      >
        Suspender
      </Button>
    </div>
  );

  const chartData = {
    series: [
      {
        name: 'Encendida',
        data: vmStateHistory.running,
      },
      {
        name: 'Apagada',
        data: vmStateHistory.stopped,
      },
      {
        name: 'Suspendida',
        data: vmStateHistory.suspended,
      },
    ],
    options: {
      chart: {
        type: 'line',
        height: 350,
        zoom: {
          enabled: true,
        },
      },
      colors: ['#6daa25', '#ff1000', '#dcd801'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: 'Cambios en el estado de las VMs a lo largo del tiempo',
        align: 'left',
        style: {
          color: '#214092',
        },
      },
      grid: {
        borderColor: '#e0e0e0',
      },
      xaxis: {
        categories: vmStateHistory.dates,
        labels: {
          style: {
            colors: '#214092',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#214092',
          },
        },
      },
      legend: {
        labels: {
          colors: '#214092',
        },
      },
    },
  };

  const pieData = {
    series: [vmStats.running, vmStats.stopped, vmStats.suspended],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Encendida', 'Apagada', 'Suspendida'],
      colors: ['#6daa25', '#ff1000', '#dcd801'],
      dataLabels: {
        style: {
          colors: ['#000000'] // Cambiar el color del texto a blanco
        }
      },
      legend: {
        labels: {
          colors: ['#ffffff', '#ffffff', '#ffffff',],
          useSeriesColors: false
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],

    },
  };

  const styles = {
    container: {
      backgroundColor: '#EEF2F6',
      color: '#000000',
      minHeight: '100vh',
      //padding: '0 40px',
      borderRadius: '8px',
      //minWidth: 'calc(100% + 40px)',
    },
    appBar: {
      backgroundColor: '#233b85',
      borderRadius: '8px',
      alignItems: 'center',
    },
    toolbar: {
      alignItems: 'center',
    },
    title: {
      flexGrow: 3,
    },
    gridContainer: {
      padding: 24,
    },
    card: {
      background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
      color: '#ffffff',
      borderRadius: '15px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      position: 'relative',
      padding: '20px',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      // Responsive styles
      '@media (max-width: 960px)': {
        padding: '10px',
      },
      '@media (min-width: 960px)': {
        padding: '20px',
      },
    },
    chartCard: {
      background: 'linear-gradient(135deg, #d3256b 0%, #233b85 100%)',
      color: '#ffffff',
      borderRadius: '15px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      overflow: 'hidden',
      position: 'relative',
      padding: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      // Responsive styles
      '@media (max-width: 960px)': {
        padding: '10px',
      },
      '@media (min-width: 960px)': {
        padding: '20px',
      },
    },
  };


  if (isAdminCAMARACC) {
    return (
      <div style={styles.container}>
        <AppBar position="static" style={styles.appBar}>
          <Toolbar style={styles.toolbar}>
            <Typography edge="start" color="inherit" aria-label="menu" variant="h2" style={styles.title}>
              Administrador de Maquinas Virtuales
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2} style={styles.gridContainer}>
          <Grid item xs={12} md={8}>
            <Card style={styles.card}>
              <CardContent style={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h3" style={{ color: '#233b85', fontWeight: 'bold', letterSpacing: '1px' }}>
                  Uso de Recursos
                </Typography>
                <div style={{ marginTop: '1px' }}>
                  <Chart options={chartData.options} series={chartData.series} type="line" height={320} />
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              style={styles.chartCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
              }}
            >
              <CardContent style={{ position: 'relative', zIndex: 1, color: '#fff' }}>
                <Typography variant="h3" style={{ color: '#ffffff', fontWeight: 'bold', letterSpacing: '1px' }}>
                  Distribución del Estado de las VMs
                </Typography>
                <Typography variant="h5" style={{ color: '#ffffff', marginBottom: '16px', fontWeight: '300' }}>
                  Total de VMs: {vms.length}
                </Typography>
                <Typography variant="h5" style={{ color: '#d0d0d0' }}>
                  Encendidas: {vmStats.running}
                </Typography>
                <Typography variant="h5" style={{ color: '#d0d0d0' }}>
                  Apagadas: {vmStats.stopped}
                </Typography>
                <Typography variant="h5" style={{ color: '#d0d0d0' }}>
                  Suspendidas: {vmStats.suspended}
                </Typography>
                <div style={{ marginTop: '20px' }}>
                  <Chart options={pieData.options} series={pieData.series} type="pie" width={380} />
                </div>
              </CardContent>
            </Card>
          </Grid>
          {loading ? (
            <Grid container alignItems="center" justifyContent="center" style={{ height: '80vh' }}>
              <CircularProgress style={{ color: '#233b85' }} />
            </Grid>
          ) : error ? (
            <Grid container alignItems="center" justifyContent="center" style={{ height: '80vh' }}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          ) : (
            <>
              {/*Tarjetas de Entornos*/}
              <Grid container spacing={3} style={{ marginBottom: '20px', paddingTop: 15 }}>
                {['desarrollo', 'produccion', 'calidad'].map((entorno) => (
                  <Grid item xs={12} sm={4} key={entorno}>
                    <Card
                      style={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        padding: '20px',
                        backgroundColor: selectedEnvironment === entorno ? '#28a745' : '#233b85', // Cambia a verde si está seleccionada, azul si no
                        color: '#fff', // Asegura que el texto siempre sea blanco
                        transition: 'transform 0.3s, background-color 0.3s',
                        boxShadow:
                          selectedEnvironment === entorno
                            ? '0 4px 20px rgba(40, 167, 69, 0.5)' // Sombra más intensa cuando está seleccionada
                            : '0 4px 10px rgba(0, 0, 0, 0.2)', // Sombra normal cuando no está seleccionada
                      }}
                      onClick={() => handleEnvironmentClick(entorno)}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      <Typography
                        variant="h5"
                        style={{
                          fontWeight: 'bold',
                          textShadow: '0px 1px 2px rgba(0, 0, 0, 0.3)',
                          color: '#fff', // Forzar color blanco en el texto
                        }}
                      >
                        {entorno.charAt(0).toUpperCase() + entorno.slice(1)}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              {/*Mostrar las VMs del entorno seleccionado*/}
              {selectedEnvironment && (
                <Grid container spacing={3}>
                  {vmsAgrupadas[selectedEnvironment].map((vm) => (
                    <Grid item xs={12} sm={3} md={3} key={vm.vm}>
                      <Card style={styles.card}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.05)';
                              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
                            }}
                      >
                        <CardContent style={{ padding: '1px' }}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                              <Typography
                                variant="h3"
                                style={{
                                  color: '#233b85',
                                  fontWeight: 'bold',
                                  textShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
                                }}
                              >
                                {vm.name}
                              </Typography>
                              <Typography variant="body2" style={{ color: '#6e6e6e' }}>
                                ID: {vm.vm}
                              </Typography>
                              <Typography variant="body2" style={{ color: '#6e6e6e' }}>
                                Estado: {vm.power_state}
                              </Typography>
                              <Typography variant="body2" style={{ color: '#6e6e6e' }}>
                                CPU: {vm.cpu_count} vCPU
                              </Typography>
                              <Typography variant="body2" style={{ color: '#6e6e6e' }}>
                                Memoria: {vm.memory_size_MiB} MB
                              </Typography>
                              <Typography variant="body2" style={{ color: '#6e6e6e' }}>
                                SO: {vm.guest_OS}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <ComputerIcon
                                  style={{
                                    position: 'absolute',
                                    fontSize: 60,
                                    color:
                                      vm.power_state === 'POWERED_ON'
                                        ? '#1eff03'
                                        : vm.power_state === 'POWERED_OFF'
                                          ? '#ff0000'
                                          : '#dcd801',
                                    transition: 'color 0.3s ease-in-out',
                                    zIndex: 1,
                                  }}
                                />
                                {vm.power_state === 'POWERED_ON' ? (
                                  <IconButton
                                    style={{
                                      fontSize: 50,
                                      color: '#1eff03',
                                      position: 'relative',
                                      zIndex: 0,
                                    }}
                                    onClick={() => handleAction('stop', vm)}
                                  >
                                    <PowerIcon />
                                  </IconButton>
                                ) : vm.power_state === 'POWERED_OFF' ? (
                                  <IconButton
                                    style={{
                                      fontSize: 50,
                                      color: '#ff0000',
                                      position: 'relative',
                                      zIndex: 0,
                                    }}
                                    onClick={() => handleAction('start', vm)}
                                  >
                                    <PowerOffIcon />
                                  </IconButton>
                                ) : (
                                  <IconButton
                                    style={{
                                      fontSize: 50,
                                      color: '#dcd801',
                                      position: 'relative',
                                      zIndex: 0,
                                    }}
                                    onClick={() => handleAction('pause', vm)}
                                  >
                                    <PauseIcon />
                                  </IconButton>
                                )}
                              </div>
                            </Grid>
                          </Grid>
                          <Divider
                            style={{
                              margin: '10px 0',
                              backgroundColor: '#d3256b',
                              height: '5px',
                            }}
                          />
                          <CardActions style={{ paddingTop: '1px', paddingLeft: '0px' }}>
                            {renderActions(vm)}
                          </CardActions>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          )}

          {/*
        {loading ? (
          <Grid container alignItems="center" justifyContent="center" style={{ height: '80vh' }}>
            <CircularProgress style={{ color: '#233b85' }} />
          </Grid>
        ) : error ? (
          <Grid container alignItems="center" justifyContent="center" style={{ height: '80vh' }}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        ) : (
          vms
            .map((vm) => (
              <Grid item xs={12} md={3} key={vm.vm}>
                <Card style={styles.card}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
                      }}
                >
                  <CardContent style={{ padding: '1px' }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs>
                        <Typography
                          variant="h3"
                          style={{
                            color: '#233b85',
                            fontWeight: 'bold',
                            textShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          {vm.name}
                        </Typography>
                        <Typography variant="body2" style={{ color: '#6e6e6e' }}>ID: {vm.vm}</Typography>
                        <Typography variant="body2" style={{ color: '#6e6e6e' }}>
                          Estado: {vm.power_state}
                        </Typography>
                        <Typography variant="body2" style={{ color: '#6e6e6e' }}>Descripción: {vm.description || 'No disponible'}</Typography>
                        <Typography variant="body2" style={{ color: '#6e6e6e' }}>
                          CPU: {vm.cpu_count} vCPU
                        </Typography>
                        <Typography variant="body2" style={{ color: '#6e6e6e' }}>
                          Memoria: {vm.memory_size_MiB} MB
                        </Typography>
                        <Typography variant="body2" style={{ color: '#6e6e6e' }}>
                          SO: {vm.guest_OS}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                          <ComputerIcon
                            style={{
                              position: 'absolute',
                              fontSize: 60,
                              color:
                                vm.power_state === 'POWERED_ON'
                                  ? '#1eff03'
                                  : vm.power_state === 'POWERED_OFF'
                                    ? '#ff0000'
                                    : '#dcd801',
                              transition: 'color 0.3s ease-in-out',
                              zIndex: 1,
                            }}
                          />
                          {vm.power_state === 'POWERED_ON' ? (
                            <IconButton
                              style={{
                                fontSize: 50,
                                color: '#1eff03',
                                position: 'relative',
                                zIndex: 0,
                              }}
                              onClick={() => handleAction('stop', vm)}
                            >
                              <PowerIcon />
                            </IconButton>
                          ) : vm.power_state === 'POWERED_OFF' ? (
                            <IconButton
                              style={{
                                fontSize: 50,
                                color: '#ff0000',
                                position: 'relative',
                                zIndex: 0,
                              }}
                              onClick={() => handleAction('start', vm)}
                            >
                              <PowerOffIcon />
                            </IconButton>
                          ) : (
                            <IconButton
                              style={{
                                fontSize: 50,
                                color: '#dcd801',
                                position: 'relative',
                                zIndex: 0,
                              }}
                              onClick={() => handleAction('pause', vm)}
                            >
                              <PauseIcon />
                            </IconButton>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                    <Divider style={{
                      margin: '10px 0',
                      backgroundColor: '#d3256b',
                      height: '5px',
                    }} />
                    <CardActions style={{paddingTop: '1px', paddingLeft: '0px'}}>
                      {renderActions(vm)}
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>
            ))
        )}*/}

        </Grid>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          severity={snackbar.severity}
          ContentProps={{
            style: {
              background: '#214092',
              color: '#fff',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '16px',
              fontFamily: 'Arial, sans-serif',
            },
          }}
          action={
            <Button
              style={{ backgroundColor: '#d3256b' }}
              color="inherit"
              size="small"
              onClick={() => setSnackbar({ ...snackbar, open: false })}
            >
              CERRAR
            </Button>
          }
        />
        <Dialog
          open={dialog.open}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              background: 'linear-gradient(135deg, #d3256b 0%, #214092 100%)',
              color: '#ffffff',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
              borderRadius: '15px',
              padding: '20px',
            },
          }}
        >
          <DialogTitle id="alert-dialog-title"
                       style={{ color: '#ffffff', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
            Confirmar Acción
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"
                               style={{ color: '#d0d0d0', fontFamily: 'Arial, sans-serif' }}>
              ¿Está seguro de que
              desea {dialog.action === 'power-on' ? 'encender' : dialog.action === 'power-off' ? 'apagar' : 'suspender'} la
              VM?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}
                    style={{ color: '#ffffff', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
              Cancelar
            </Button>
            <Button onClick={handleDialogConfirm}
                    style={{ color: '#ffffff', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }} autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  else if (isModerator) {
    return (
      <div style={styles.container}>
        <AppBar position="static" style={styles.appBar}>
          <Toolbar style={styles.toolbar}>
            <Typography edge="start" color="inherit" aria-label="menu" variant="h2" style={styles.title}>
              Administrador de Maquinas Virtuales
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2} style={styles.gridContainer}>
          <Grid item xs={12} md={8}>
            <Card style={styles.card}>
              <CardContent style={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h3" style={{ color: '#233b85', fontWeight: 'bold', letterSpacing: '1px' }}>
                  Uso de Recursos
                </Typography>
                <div style={{ marginTop: '1px' }}>
                  <Chart options={chartData.options} series={chartData.series} type="line" height={320} />
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              style={styles.chartCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
              }}
            >
              <CardContent style={{ position: 'relative', zIndex: 1, color: '#fff' }}>
                <Typography variant="h3" style={{ color: '#ffffff', fontWeight: 'bold', letterSpacing: '1px' }}>
                  Distribución del Estado de las VMs
                </Typography>
                <Typography variant="h5" style={{ color: '#ffffff', marginBottom: '16px', fontWeight: '300' }}>
                  Total de VMs: {vms.length}
                </Typography>
                <Typography variant="h5" style={{ color: '#d0d0d0' }}>
                  Encendidas: {vmStats.running}
                </Typography>
                <Typography variant="h5" style={{ color: '#d0d0d0' }}>
                  Apagadas: {vmStats.stopped}
                </Typography>
                <Typography variant="h5" style={{ color: '#d0d0d0' }}>
                  Suspendidas: {vmStats.suspended}
                </Typography>
                <div style={{ marginTop: '20px' }}>
                  <Chart options={pieData.options} series={pieData.series} type="pie" width={380} />
                </div>
              </CardContent>
            </Card>
          </Grid>
          {loading ? (
            <Grid container alignItems="center" justifyContent="center" style={{ height: '80vh' }}>
              <CircularProgress style={{ color: '#233b85' }} />
            </Grid>
          ) : error ? (
            <Grid container alignItems="center" justifyContent="center" style={{ height: '80vh' }}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          ) : (
            <>
              {/*Tarjetas de Entornos*/}
              <Grid container spacing={3} style={{ marginBottom: '20px', paddingTop: 15 }}>
                {['desarrollo', 'produccion', 'calidad'].map((entorno) => (
                  <Grid item xs={12} sm={4} key={entorno}>
                    <Card
                      style={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        padding: '20px',
                        backgroundColor: selectedEnvironment === entorno ? '#28a745' : '#233b85', // Cambia a verde si está seleccionada, azul si no
                        color: '#fff', // Asegura que el texto siempre sea blanco
                        transition: 'transform 0.3s, background-color 0.3s',
                        boxShadow:
                          selectedEnvironment === entorno
                            ? '0 4px 20px rgba(40, 167, 69, 0.5)' // Sombra más intensa cuando está seleccionada
                            : '0 4px 10px rgba(0, 0, 0, 0.2)', // Sombra normal cuando no está seleccionada
                      }}
                      onClick={() => handleEnvironmentClick(entorno)}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      <Typography
                        variant="h5"
                        style={{
                          fontWeight: 'bold',
                          textShadow: '0px 1px 2px rgba(0, 0, 0, 0.3)',
                          color: '#fff', // Forzar color blanco en el texto
                        }}
                      >
                        {entorno.charAt(0).toUpperCase() + entorno.slice(1)}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              {/*Mostrar las VMs del entorno seleccionado*/}
              {selectedEnvironment && (
                <Grid container spacing={3}>
                  {vmsAgrupadas[selectedEnvironment].map((vm) => (
                    <Grid item xs={12} sm={3} md={3} key={vm.vm}>
                      <Card style={styles.card}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.05)';
                              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
                            }}
                      >
                        <CardContent style={{ padding: '1px' }}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                              <Typography
                                variant="h3"
                                style={{
                                  color: '#233b85',
                                  fontWeight: 'bold',
                                  textShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
                                }}
                              >
                                {vm.name}
                              </Typography>
                              <Typography variant="body2" style={{ color: '#6e6e6e' }}>
                                ID: {vm.vm}
                              </Typography>
                              <Typography variant="body2" style={{ color: '#6e6e6e' }}>
                                Estado: {vm.power_state}
                              </Typography>
                              <Typography variant="body2" style={{ color: '#6e6e6e' }}>
                                CPU: {vm.cpu_count} vCPU
                              </Typography>
                              <Typography variant="body2" style={{ color: '#6e6e6e' }}>
                                Memoria: {vm.memory_size_MiB} MB
                              </Typography>
                              <Typography variant="body2" style={{ color: '#6e6e6e' }}>
                                SO: {vm.guest_OS}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <ComputerIcon
                                  style={{
                                    position: 'absolute',
                                    fontSize: 60,
                                    color:
                                      vm.power_state === 'POWERED_ON'
                                        ? '#1eff03'
                                        : vm.power_state === 'POWERED_OFF'
                                          ? '#ff0000'
                                          : '#dcd801',
                                    transition: 'color 0.3s ease-in-out',
                                    zIndex: 1,
                                  }}
                                />
                                {vm.power_state === 'POWERED_ON' ? (
                                  <IconButton
                                    style={{
                                      fontSize: 50,
                                      color: '#1eff03',
                                      position: 'relative',
                                      zIndex: 0,
                                    }}
                                    onClick={() => handleAction('stop', vm)}
                                  >
                                    <PowerIcon />
                                  </IconButton>
                                ) : vm.power_state === 'POWERED_OFF' ? (
                                  <IconButton
                                    style={{
                                      fontSize: 50,
                                      color: '#ff0000',
                                      position: 'relative',
                                      zIndex: 0,
                                    }}
                                    onClick={() => handleAction('start', vm)}
                                  >
                                    <PowerOffIcon />
                                  </IconButton>
                                ) : (
                                  <IconButton
                                    style={{
                                      fontSize: 50,
                                      color: '#dcd801',
                                      position: 'relative',
                                      zIndex: 0,
                                    }}
                                    onClick={() => handleAction('pause', vm)}
                                  >
                                    <PauseIcon />
                                  </IconButton>
                                )}
                              </div>
                            </Grid>
                          </Grid>
                          <Divider
                            style={{
                              margin: '10px 0',
                              backgroundColor: '#d3256b',
                              height: '5px',
                            }}
                          />
                          {/*<CardActions style={{ paddingTop: '1px', paddingLeft: '0px' }}>
                            {renderActions(vm)}
                          </CardActions>*/}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          )}

          {/*
        {loading ? (
          <Grid container alignItems="center" justifyContent="center" style={{ height: '80vh' }}>
            <CircularProgress style={{ color: '#233b85' }} />
          </Grid>
        ) : error ? (
          <Grid container alignItems="center" justifyContent="center" style={{ height: '80vh' }}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        ) : (
          vms
            .map((vm) => (
              <Grid item xs={12} md={3} key={vm.vm}>
                <Card style={styles.card}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
                      }}
                >
                  <CardContent style={{ padding: '1px' }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs>
                        <Typography
                          variant="h3"
                          style={{
                            color: '#233b85',
                            fontWeight: 'bold',
                            textShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          {vm.name}
                        </Typography>
                        <Typography variant="body2" style={{ color: '#6e6e6e' }}>ID: {vm.vm}</Typography>
                        <Typography variant="body2" style={{ color: '#6e6e6e' }}>
                          Estado: {vm.power_state}
                        </Typography>
                        <Typography variant="body2" style={{ color: '#6e6e6e' }}>Descripción: {vm.description || 'No disponible'}</Typography>
                        <Typography variant="body2" style={{ color: '#6e6e6e' }}>
                          CPU: {vm.cpu_count} vCPU
                        </Typography>
                        <Typography variant="body2" style={{ color: '#6e6e6e' }}>
                          Memoria: {vm.memory_size_MiB} MB
                        </Typography>
                        <Typography variant="body2" style={{ color: '#6e6e6e' }}>
                          SO: {vm.guest_OS}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                          <ComputerIcon
                            style={{
                              position: 'absolute',
                              fontSize: 60,
                              color:
                                vm.power_state === 'POWERED_ON'
                                  ? '#1eff03'
                                  : vm.power_state === 'POWERED_OFF'
                                    ? '#ff0000'
                                    : '#dcd801',
                              transition: 'color 0.3s ease-in-out',
                              zIndex: 1,
                            }}
                          />
                          {vm.power_state === 'POWERED_ON' ? (
                            <IconButton
                              style={{
                                fontSize: 50,
                                color: '#1eff03',
                                position: 'relative',
                                zIndex: 0,
                              }}
                              onClick={() => handleAction('stop', vm)}
                            >
                              <PowerIcon />
                            </IconButton>
                          ) : vm.power_state === 'POWERED_OFF' ? (
                            <IconButton
                              style={{
                                fontSize: 50,
                                color: '#ff0000',
                                position: 'relative',
                                zIndex: 0,
                              }}
                              onClick={() => handleAction('start', vm)}
                            >
                              <PowerOffIcon />
                            </IconButton>
                          ) : (
                            <IconButton
                              style={{
                                fontSize: 50,
                                color: '#dcd801',
                                position: 'relative',
                                zIndex: 0,
                              }}
                              onClick={() => handleAction('pause', vm)}
                            >
                              <PauseIcon />
                            </IconButton>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                    <Divider style={{
                      margin: '10px 0',
                      backgroundColor: '#d3256b',
                      height: '5px',
                    }} />
                    <CardActions style={{paddingTop: '1px', paddingLeft: '0px'}}>
                      {renderActions(vm)}
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>
            ))
        )}*/}

        </Grid>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          severity={snackbar.severity}
          ContentProps={{
            style: {
              background: '#214092',
              color: '#fff',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '16px',
              fontFamily: 'Arial, sans-serif',
            },
          }}
          action={
            <Button
              style={{ backgroundColor: '#d3256b' }}
              color="inherit"
              size="small"
              onClick={() => setSnackbar({ ...snackbar, open: false })}
            >
              CERRAR
            </Button>
          }
        />
        <Dialog
          open={dialog.open}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              background: 'linear-gradient(135deg, #d3256b 0%, #214092 100%)',
              color: '#ffffff',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
              borderRadius: '15px',
              padding: '20px',
            },
          }}
        >
          <DialogTitle id="alert-dialog-title"
                       style={{ color: '#ffffff', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
            Confirmar Acción
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"
                               style={{ color: '#d0d0d0', fontFamily: 'Arial, sans-serif' }}>
              ¿Está seguro de que
              desea {dialog.action === 'power-on' ? 'encender' : dialog.action === 'power-off' ? 'apagar' : 'suspender'} la
              VM?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}
                    style={{ color: '#ffffff', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
              Cancelar
            </Button>
            <Button onClick={handleDialogConfirm}
                    style={{ color: '#ffffff', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }} autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default App;
