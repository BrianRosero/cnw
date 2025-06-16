import React, { useState, useEffect, useCallback } from 'react';
import {
  Container, Typography, Box, Grid, Paper, Chip, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, IconButton, Tooltip, AppBar, Toolbar,
  TextField, FormControl, InputLabel, Select, MenuItem,
  LinearProgress, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions,
  List, ListItem, ListItemText, ListItemIcon,
  Accordion, AccordionSummary, AccordionDetails,
  Tabs, Tab,
  Alert, AlertTitle,
  Snackbar,
  Card, CardContent, CardHeader,
  Switch, FormControlLabel, Checkbox,
  Avatar,
  Badge, InputAdornment,
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import AnalyticsIcon from '@mui/icons-material/Analytics'; // Icono principal de Analíticas/Estadísticas
import PeopleIcon from '@mui/icons-material/People'; // Usuarios
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // Tendencias/Crecimiento
import EventNoteIcon from '@mui/icons-material/EventNote'; // Logs/Actividad
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Tiempo
import DashboardIcon from '@mui/icons-material/Dashboard'; // Dashboard
import GraphIcon from '@mui/icons-material/ShowChart'; // Gráficas
import InsightsIcon from '@mui/icons-material/Insights'; // Insights
import RefreshIcon from '@mui/icons-material/Refresh'; // Refrescar
import FilterListIcon from '@mui/icons-material/FilterList'; // Filtros
import DownloadIcon from '@mui/icons-material/Download'; // Descargar/Exportar
import SearchIcon from '@mui/icons-material/Search'; // Buscar
import LaptopMacIcon from '@mui/icons-material/LaptopMac'; // Dispositivo
import PublicIcon from '@mui/icons-material/Public'; // IP/Ubicación
import TaskAltIcon from '@mui/icons-material/TaskAlt'; // Evento exitoso
import CancelIcon from '@mui/icons-material/Cancel'; // Evento fallido
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Error/Advertencia
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'; // Crecimiento
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'; // Decrecimiento
import TimerIcon from '@mui/icons-material/Timer'; // Tiempo de sesión
import StorageIcon from '@mui/icons-material/Storage'; // Uso de recursos
import DatabaseIcon from '@mui/icons-material/Dataset'

// --- Gráficas (React-Chartjs-2) ---
// NOTA: Para usar estas gráficas, necesitarás instalar las dependencias:
// npm install react-chartjs-2 chart.js
// y luego importar los componentes necesarios:
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip, // Renombrado para evitar conflicto con MUI Tooltip
  Legend,
} from 'chart.js';
import CakeIcon from '@mui/icons-material/Cake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DnsIcon from '@mui/icons-material/Dns';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend
);


// --- Datos Simulados ---

const userOverviewStats = {
  totalUsers: 1250,
  activeUsersLast24h: 345,
  newUsersLast7d: 55,
  avgSessionDuration: '12 min 30 s',
  bounceRate: '35%', // Porcentaje de sesiones de una sola página
  peakConcurrentUsers: 180,
};

const userActivityLog = [
  { id: 'LOG-001', timestamp: '2025-06-11 23:58:10 -05', user: 'Andrea González', event: 'Acceso a "Panel de Proyectos"', ip: '192.168.1.101', device: 'Desktop - Chrome', status: 'Éxito' },
  { id: 'LOG-002', timestamp: '2025-06-11 23:55:05 -05', user: 'Juan Pérez', event: 'Subida de archivo "reporte_ventas.xlsx"', ip: '172.16.0.25', device: 'Laptop - Firefox', status: 'Éxito' },
  { id: 'LOG-003', timestamp: '2025-06-11 23:50:30 -05', user: 'Maria García', event: 'Intento de login con credenciales incorrectas', ip: '203.0.113.45', device: 'Mobile - Android', status: 'Fallido' },
  { id: 'LOG-004', timestamp: '2025-06-11 23:45:00 -05', user: 'Carlos López', event: 'Visualización de "Base de Datos de Clientes"', ip: '192.168.1.105', device: 'Desktop - Edge', status: 'Éxito' },
  { id: 'LOG-005', timestamp: '2025-06-11 23:40:15 -05', user: 'Andrea González', event: 'Cambio de configuración de perfil', ip: '192.168.1.101', device: 'Desktop - Chrome', status: 'Éxito' },
  { id: 'LOG-006', timestamp: '2025-06-11 23:35:00 -05', user: 'Pedro Sánchez', event: 'Error al cargar informe (Acceso Denegado)', ip: '10.0.0.30', device: 'Laptop - Chrome', status: 'Error' },
  { id: 'LOG-007', timestamp: '2025-06-11 23:30:45 -05', user: 'Sistema Automático', event: 'Actualización de datos de inventario', ip: 'N/A', device: 'Servidor', status: 'Éxito' },
];

const userDemographics = {
  gender: { male: 550, female: 450, other: 50 },
  ageGroups: { '18-24': 100, '25-34': 400, '35-44': 300, '45-54': 150, '55+': 100 },
  locationTop5: [
    { city: 'Cali', users: 300 },
    { city: 'Bogotá', users: 250 },
    { city: 'Medellín', users: 200 },
    { city: 'Barranquilla', users: 100 },
    { city: 'Cartagena', users: 80 },
  ],
};

const performanceMetrics = {
  avgPageLoadTime: '2.5s',
  avgApiResponseTime: '150ms',
  errorRate: '0.5%',
  serverLoadAvg: '45%',
  databaseQueriesPerSec: 120,
};

// Datos para gráficas (ejemplos)
const dailyActiveUsersData = {
  labels: ['Jun 05', 'Jun 06', 'Jun 07', 'Jun 08', 'Jun 09', 'Jun 10', 'Jun 11'],
  datasets: [
    {
      label: 'Usuarios Activos Diarios',
      data: [280, 310, 305, 340, 330, 360, 345],
      borderColor: '#42a5f5',
      backgroundColor: 'rgba(66, 165, 245, 0.2)',
      fill: true,
      tension: 0.3,
    },
  ],
};

const userSourceData = {
  labels: ['Directo', 'Búsqueda Orgánica', 'Referencia', 'Redes Sociales', 'Email Marketing'],
  datasets: [
    {
      label: '# Usuarios',
      data: [300, 250, 150, 100, 50],
      backgroundColor: [
        '#2196f3', // Azul
        '#4caf50', // Verde
        '#ff9800', // Naranja
        '#9c27b0', // Púrpura
        '#ef5350', // Rojo
      ],
      borderColor: [
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
      ],
      borderWidth: 2,
    },
  ],
};

const topFeaturesUsageData = {
  labels: ['Panel de Proyectos', 'Gestión de Clientes', 'Generación de Informes', 'Configuración de Perfil', 'Base de Datos de Productos'],
  datasets: [
    {
      label: 'Veces Usado',
      data: [1500, 1200, 800, 600, 400],
      backgroundColor: '#26c6da', // Cyan
    },
  ],
};


function UserAnalyticsPanel({ onGoToHome }) {
  const [currentTab, setCurrentTab] = useState('dashboard'); // 'dashboard', 'activity_logs', 'demographics', 'performance_metrics'
  const [activityLogs, setActivityLogs] = useState(userActivityLog);

  const [filterUser, setFilterUser] = useState('');
  const [filterEvent, setFilterEvent] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const showSnackbar = useCallback((message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const filteredActivityLogs = activityLogs.filter(log => {
    const userMatch = filterUser ? log.user.toLowerCase().includes(filterUser.toLowerCase()) : true;
    const eventMatch = filterEvent ? log.event.toLowerCase().includes(filterEvent.toLowerCase()) : true;
    const statusMatch = filterStatus ? log.status === filterStatus : true;
    return userMatch && eventMatch && statusMatch;
  });

  const getStatusChipColor = (status) => {
    switch (status) {
      case 'Éxito': return 'success';
      case 'Fallido': return 'error';
      case 'Error': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', minHeight: '100vh', color: '#333', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#ffffff', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2, color: '#424242' }}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}
          <AnalyticsIcon sx={{ fontSize: 36, mr: 1, color: '#007bff' }} /> {/* Azul para analíticas */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#424242' }}>
            Panel de Estadísticas y Seguimiento de Usuarios
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            sx={{ textTransform: 'none', bgcolor: '#007bff', '&:hover': { bgcolor: '#0056b3' } }}
          >
            Actualizar Datos
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#007bff' }}>
            Comprende el Comportamiento de tus Usuarios
          </Typography>
          <Typography variant="h6" color="#616161">
            Analiza patrones, monitorea actividades y optimiza la experiencia del usuario.
          </Typography>
        </Box>

        {/* Pestañas de Navegación Principal */}
        <Paper elevation={2} sx={{ mb: 4, bgcolor: '#ffffff', borderRadius: 2 }}>
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => setCurrentTab(newValue)}
            indicatorColor="primary"
            textColor="primary"
            centered
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#007bff',
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                '&.Mui-selected': {
                  color: '#007bff',
                },
              },
            }}
          >
            <Tab label="Dashboard General" value="dashboard" icon={<DashboardIcon />} iconPosition="start" />
            <Tab label="Actividad Detallada" value="activity_logs" icon={<EventNoteIcon />} iconPosition="start" />
            <Tab label="Demografía de Usuarios" value="demographics" icon={<PeopleIcon />} iconPosition="start" />
            <Tab label="Rendimiento y Uso" value="performance_metrics" icon={<InsightsIcon />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Contenido de las Pestañas */}
        <Box sx={{ p: 0 }}>
          {/* Tab: Dashboard General */}
          {currentTab === 'dashboard' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <DashboardIcon sx={{ color: '#007bff', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Resumen de Métricas Clave
                </Typography>
                <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ textTransform: 'none' }}>
                  Exportar Resumen
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd', borderLeft: '5px solid #2196f3' }}>
                    <PeopleIcon sx={{ fontSize: 40, color: '#2196f3', mb: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      {userOverviewStats.totalUsers}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Usuarios Totales</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9', borderLeft: '5px solid #4caf50' }}>
                    <PeopleIcon sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      {userOverviewStats.activeUsersLast24h}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Activos (Últ. 24h)</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#fff3e0', borderLeft: '5px solid #ff9800' }}>
                    <TrendingUpIcon sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      {userOverviewStats.newUsersLast7d}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Nuevos Usuarios (7d)</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#ffebee', borderLeft: '5px solid #ef5350' }}>
                    <ErrorOutlineIcon sx={{ fontSize: 40, color: '#ef5350', mb: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      {userOverviewStats.bounceRate}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Tasa de Rebote</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#e0f7fa', borderLeft: '5px solid #00bcd4' }}>
                    <TimerIcon sx={{ fontSize: 40, color: '#00bcd4', mb: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      {userOverviewStats.avgSessionDuration}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Duración Prom. Sesión</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#ede7f6', borderLeft: '5px solid #673ab7' }}>
                    <PeopleIcon sx={{ fontSize: 40, color: '#673ab7', mb: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      {userOverviewStats.peakConcurrentUsers}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Usuarios Concurrentes (Pico)</Typography>
                  </Card>
                </Grid>
              </Grid>

              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  <Card elevation={2} sx={{ p: 2, bgcolor: '#ffffff' }}>
                    <CardHeader
                      title={
                        <Box display="flex" alignItems="center">
                          <GraphIcon sx={{ mr: 1, color: '#42a5f5' }} />
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>Tendencia de Usuarios Activos Diarios</Typography>
                        </Box>
                      }
                      sx={{ pb: 1 }}
                    />
                    <CardContent>
                      <Line data={dailyActiveUsersData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card elevation={2} sx={{ p: 2, bgcolor: '#ffffff' }}>
                    <CardHeader
                      title={
                        <Box display="flex" alignItems="center">
                          <PeopleIcon sx={{ mr: 1, color: '#2196f3' }} />
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>Fuentes de Adquisición de Usuarios</Typography>
                        </Box>
                      }
                      sx={{ pb: 1 }}
                    />
                    <CardContent>
                      <Doughnut data={userSourceData} options={{ responsive: true, plugins: { legend: { position: 'right' } } }} />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card elevation={2} sx={{ p: 2, bgcolor: '#ffffff' }}>
                    <CardHeader
                      title={
                        <Box display="flex" alignItems="center">
                          <InsightsIcon sx={{ mr: 1, color: '#26c6da' }} />
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>Uso de Funcionalidades Principales</Typography>
                        </Box>
                      }
                      sx={{ pb: 1 }}
                    />
                    <CardContent>
                      <Bar data={topFeaturesUsageData} options={{ responsive: true, plugins: { legend: { display: false } }, indexAxis: 'y' }} />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* Tab: Actividad Detallada (Logs de uso e interacciones) */}
          {currentTab === 'activity_logs' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <EventNoteIcon sx={{ color: '#616161', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Logs Detallados de Actividad de Usuarios
                </Typography>
                <Button variant="outlined" startIcon={<FilterListIcon />} sx={{ textTransform: 'none', mr: 1 }}>
                  Filtros Avanzados
                </Button>
                <Button variant="contained" startIcon={<DownloadIcon />} sx={{ textTransform: 'none', bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}>
                  Exportar Logs
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Filtrar por Usuario"
                    variant="outlined"
                    size="small"
                    value={filterUser}
                    onChange={(e) => setFilterUser(e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Filtrar por Evento"
                    variant="outlined"
                    size="small"
                    value={filterEvent}
                    onChange={(e) => setFilterEvent(e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Filtrar por Estado</InputLabel>
                    <Select
                      value={filterStatus}
                      label="Filtrar por Estado"
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <MenuItem value="">Todos</MenuItem>
                      <MenuItem value="Éxito">Éxito</MenuItem>
                      <MenuItem value="Fallido">Fallido</MenuItem>
                      <MenuItem value="Error">Error</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 600 }}>
                <Table stickyHeader size="small">
                  <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, width: '15%' }}>Timestamp</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '15%' }}>Usuario</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '30%' }}>Evento / Interacción</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '15%' }}>IP</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '15%' }}>Dispositivo</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '10%' }}>Estado</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredActivityLogs.length > 0 ? (
                      filteredActivityLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>{log.timestamp}</TableCell>
                          <TableCell><Box display="flex" alignItems="center"><Avatar src="https://i.pravatar.cc/30" sx={{ width: 24, height: 24, mr: 1 }} />{log.user}</Box></TableCell>
                          <TableCell>{log.event}</TableCell>
                          <TableCell><PublicIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />{log.ip}</TableCell>
                          <TableCell><LaptopMacIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />{log.device}</TableCell>
                          <TableCell>
                            <Chip
                              label={log.status}
                              size="small"
                              color={getStatusChipColor(log.status)}
                              icon={
                                log.status === 'Éxito' ? <TaskAltIcon /> :
                                  (log.status === 'Fallido' ? <CancelIcon /> : <ErrorOutlineIcon />)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={6} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No se encontraron logs de actividad para los filtros seleccionados.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                Mostrando {filteredActivityLogs.length} de {userActivityLog.length} registros.
              </Typography>
            </Paper>
          )}

          {/* Tab: Demografía de Usuarios */}
          {currentTab === 'demographics' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <PeopleIcon sx={{ color: '#9c27b0', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Análisis Demográfico de Usuarios
                </Typography>
                <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ textTransform: 'none' }}>
                  Exportar Datos Demográficos
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Card elevation={2} sx={{ p: 2, bgcolor: '#ffffff' }}>
                    <CardHeader
                      title={
                        <Box display="flex" alignItems="center">
                          <PeopleIcon sx={{ mr: 1, color: '#9c27b0' }} />
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>Distribución por Género</Typography>
                        </Box>
                      }
                      sx={{ pb: 1 }}
                    />
                    <CardContent>
                      <Doughnut
                        data={{
                          labels: ['Masculino', 'Femenino', 'Otro'],
                          datasets: [{
                            data: [userDemographics.gender.male, userDemographics.gender.female, userDemographics.gender.other],
                            backgroundColor: ['#2196f3', '#f06292', '#ffeb3b'], // Azul, Rosa, Amarillo
                            borderColor: '#ffffff',
                            borderWidth: 2,
                          }],
                        }}
                        options={{ responsive: true, plugins: { legend: { position: 'right' } } }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card elevation={2} sx={{ p: 2, bgcolor: '#ffffff' }}>
                    <CardHeader
                      title={
                        <Box display="flex" alignItems="center">
                          <CakeIcon sx={{ mr: 1, color: '#ff9800' }} />
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>Grupos de Edad</Typography>
                        </Box>
                      }
                      sx={{ pb: 1 }}
                    />
                    <CardContent>
                      <Bar
                        data={{
                          labels: Object.keys(userDemographics.ageGroups),
                          datasets: [{
                            label: 'Número de Usuarios',
                            data: Object.values(userDemographics.ageGroups),
                            backgroundColor: '#ffb74d', // Naranja claro
                          }],
                        }}
                        options={{ responsive: true, plugins: { legend: { display: false } } }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card elevation={2} sx={{ p: 2, bgcolor: '#ffffff' }}>
                    <CardHeader
                      title={
                        <Box display="flex" alignItems="center">
                          <LocationOnIcon sx={{ mr: 1, color: '#4caf50' }} />
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>Ubicaciones Principales</Typography>
                        </Box>
                      }
                      sx={{ pb: 1 }}
                    />
                    <CardContent>
                      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
                        <Table size="small">
                          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 700 }}>Ciudad</TableCell>
                              <TableCell sx={{ fontWeight: 700, textAlign: 'right' }}>Número de Usuarios</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {userDemographics.locationTop5.map((loc, index) => (
                              <TableRow key={index}>
                                <TableCell>{loc.city}</TableCell>
                                <TableCell sx={{ textAlign: 'right' }}>{loc.users}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* Tab: Rendimiento y Uso */}
          {currentTab === 'performance_metrics' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <InsightsIcon sx={{ color: '#00bcd4', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Métricas de Rendimiento y Uso del Sistema
                </Typography>
                <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ textTransform: 'none' }}>
                  Exportar Métricas
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#e0f7fa', borderLeft: '5px solid #00bcd4' }}>
                    <TimerIcon sx={{ fontSize: 40, color: '#00bcd4', mb: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      {performanceMetrics.avgPageLoadTime}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Tiempo Carga Página (Prom.)</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd', borderLeft: '5px solid #2196f3' }}>
                    <DnsIcon sx={{ fontSize: 40, color: '#2196f3', mb: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      {performanceMetrics.avgApiResponseTime}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Tiempo Respuesta API (Prom.)</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#ffebee', borderLeft: '5px solid #f44336' }}>
                    <ErrorOutlineIcon sx={{ fontSize: 40, color: '#f44336', mb: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      {performanceMetrics.errorRate}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Tasa de Errores</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9', borderLeft: '5px solid #4caf50' }}>
                    <StorageIcon sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      {performanceMetrics.serverLoadAvg}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Carga Prom. Servidor</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#fff3e0', borderLeft: '5px solid #ff9800' }}>
                    <DatabaseIcon sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      {performanceMetrics.databaseQueriesPerSec}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Consultas DB/seg</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#f3e5f5', borderLeft: '5px solid #ab47bc' }}>
                    <AccessTimeIcon sx={{ fontSize: 40, color: '#ab47bc', mb: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      10 GB / 25 GB
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Uso Almacenamiento (Prom.)</Typography>
                  </Card>
                </Grid>
              </Grid>
              <Alert severity="info" sx={{ mt: 4 }}>
                Estas métricas reflejan el rendimiento general del sistema y la experiencia del usuario.
              </Alert>
            </Paper>
          )}
        </Box>
      </Container>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default UserAnalyticsPanel;