import React, { useState, useEffect, useCallback } from 'react';
import {
  Container, Typography, Box, Grid, Paper, Chip, Divider,
  Button, IconButton, AppBar, Toolbar, Tooltip,
  Card, CardContent, CardHeader, Avatar,
  List, ListItem, ListItemText, ListItemAvatar,
  Badge,
  Menu, MenuItem,
  LinearProgress,
  Alert,
  Snackbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';

// --- Iconos ---
import DashboardIcon from '@mui/icons-material/Dashboard'; // Dashboard principal
import GroupWorkIcon from '@mui/icons-material/GroupWork'; // Integraciones Corporativas
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'; // Automatización y Conectividad
import SettingsIcon from '@mui/icons-material/Settings'; // Personalización del Sistema
import NotificationsIcon from '@mui/icons-material/Notifications'; // Notificaciones
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Cerrar Sesión
import MenuIcon from '@mui/icons-material/Menu'; // Menú Hamburguesa (móvil)
import NewsroomIcon from '@mui/icons-material/Newspaper'; // Noticias
import AnnouncementIcon from '@mui/icons-material/Campaign'; // Comunicados
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // Gráficas de crecimiento
import TrendingDownIcon from '@mui/icons-material/TrendingDown'; // Gráficas de decrecimiento
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Ingresos / Ventas
import PeopleIcon from '@mui/icons-material/People'; // Usuarios / Clientes
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Tareas Completadas
import ErrorIcon from '@mui/icons-material/Error'; // Errores
import EventNoteIcon from '@mui/icons-material/EventNote'; // Eventos
import FiberNewIcon from '@mui/icons-material/FiberNew'; // Novedades
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'; // Soporte / Consultas
import MailOutlineIcon from '@mui/icons-material/MailOutline'; // Emails
import ScheduleIcon from '@mui/icons-material/Schedule'; // Tareas Pendientes
import InfoIcon from '@mui/icons-material/Info';
import LinkIcon from '@mui/icons-material/Link'; // Información General

// --- Librería de Gráficos (simulada) ---
// En un proyecto real, aquí integrarías librerías como Chart.js, Recharts, Nivo, etc.
// Por ahora, solo simularé la estructura y el título de las gráficas.
const ChartPlaceholder = ({ title, description, type, color = '#004a8f' }) => (
  <Paper elevation={2} sx={{ p: 2, height: 250, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#ffffff', border: `1px solid ${color}`, borderRadius: 2 }}>
    <Typography variant="h6" sx={{ color: '#333', mb: 1, fontWeight: 600 }}>{title}</Typography>
    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>{description}</Typography>
    <Box sx={{ width: '80%', height: '100px', bgcolor: `${color}20`, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 1 }}>
      <Typography variant="caption" color={color} sx={{ fontWeight: 700 }}>{type} GRÁFICO AQUÍ</Typography>
    </Box>
  </Paper>
);

// --- Datos Simulados ---
const currentUser = {
  id: 'EXEC001',
  name: 'Bryan Rosero',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Maria%20Gerente&backgroundColor=b6e3f4,c0aede,d1d4f9',
  role: 'Ingeniero de desarrollo',
};

const modules = [
  { id: 'dashboard', name: 'Dashboard General', icon: <DashboardIcon />, path: '/dashboard' },
  { id: 'corporate_integrations', name: 'Integraciones Corporativas', icon: <GroupWorkIcon />, path: '/integraciones' },
  { id: 'automation_connectivity', name: 'Automatización y Conectividad', icon: <AutoAwesomeIcon />, path: '/automatizacion' },
  { id: 'system_personalization', name: 'Personalización del Sistema', icon: <SettingsIcon />, path: '/personalizacion' },
];

const executiveMetrics = [
  { id: 'revenue', title: 'Ingresos Mensuales', value: '$2,500,000', change: '+5.2%', trend: 'up', color: '#009688' },
  { id: 'customers', title: 'Nuevos Clientes', value: '1,280', change: '+12.1%', trend: 'up', color: '#1976d2' },
  { id: 'tasks_completed', title: 'Tareas Completadas', value: '98%', change: '+1.5%', trend: 'up', color: '#4caf50' },
  { id: 'critical_alerts', title: 'Alertas Críticas', value: '3', change: '-2', trend: 'down', color: '#d32f2f' },
];

const newsFeed = [
  { id: 'N001', title: 'Nuevo Lanzamiento de Producto X en Q3', date: '2025-06-11', category: 'Producto', icon: <FiberNewIcon sx={{color: '#ff9800'}}/> },
  { id: 'N002', title: 'Resultados Financieros del Segundo Trimestre Superan Expectativas', date: '2025-06-10', category: 'Finanzas', icon: <TrendingUpIcon sx={{color: '#009688'}}/> },
  { id: 'N003', title: 'Actualización de Seguridad de la Plataforma Programada', date: '2025-06-09', category: 'TI', icon: <SettingsIcon sx={{color: '#1976d2'}}/> },
  { id: 'N004', title: 'Campaña de Marketing Digital Alcanza Hitos Históricos', date: '2025-06-08', category: 'Marketing', icon: <AnnouncementIcon sx={{color: '#00bcd4'}}/> },
  { id: 'N005', title: 'Reporte Anual de Sostenibilidad Disponible', date: '2025-06-07', category: 'Corporativo', icon: <InfoIcon sx={{color: '#607d8b'}}/> },
];

const announcements = [
  { id: 'A001', title: 'Recordatorio: Reunión General de Empleados el 15 de Junio', date: '2025-06-10', type: 'Evento', urgency: 'Alta' },
  { id: 'A002', title: 'Cambios en la Política de Teletrabajo - Efectivos 1 de Julio', date: '2025-06-05', type: 'Política', urgency: 'Media' },
  { id: 'A003', title: 'Encuesta de Clima Laboral - ¡Participa!', date: '2025-06-01', type: 'Recursos Humanos', urgency: 'Baja' },
];

const quickAccessItems = [
  { name: 'Soporte TI', icon: <QuestionAnswerIcon />, description: 'Generar tickets de soporte o consultar FAQ.' },
  { name: 'Directorio de Empleados', icon: <PeopleIcon />, description: 'Buscar información de contacto del personal.' },
  { name: 'Mi Calendario', icon: <EventNoteIcon />, description: 'Ver eventos y citas programadas.' },
  { name: 'Bandeja de Entrada', icon: <MailOutlineIcon />, description: 'Acceso rápido a tu correo corporativo.' },
  { name: 'Tareas Pendientes', icon: <ScheduleIcon />, description: 'Revisar asignaciones y plazos.' },
  { name: 'Reportes Detallados', icon: <TrendingUpIcon />, description: 'Acceder a informes financieros y operativos.' },
];

function ExecutiveHomePage({ onNavigate }) {
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const showSnackbar = useCallback((message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleNotificationsClick = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorElNotifications(null);
  };

  const handleModuleClick = (moduleId) => {
    const module = modules.find(m => m.id === moduleId);
    if (module && onNavigate) {
      onNavigate(module.path); // Llama a la función de navegación proporcionada por el padre
      showSnackbar(`Navegando a: ${module.name}`, 'info');
    } else {
      showSnackbar(`Módulo ${module?.name || moduleId} no implementado o no disponible.`, 'warning');
    }
  };

  const NotificationMenu = () => (
    <Menu
      anchorEl={anchorElNotifications}
      open={Boolean(anchorElNotifications)}
      onClose={handleNotificationsClose}
      PaperProps={{
        sx: { width: 300, maxHeight: 400, boxShadow: 3 },
      }}
    >
      <MenuItem disabled sx={{ fontWeight: 'bold', color: '#004a8f' }}>
        <NotificationsIcon sx={{ mr: 1 }} /> Notificaciones Recientes
      </MenuItem>
      <Divider />
      {executiveMetrics[3].value > 0 ? (
        <MenuItem onClick={handleNotificationsClose}>
          <ErrorIcon color="error" sx={{ mr: 1 }} />
          Tienes {executiveMetrics[3].value} alertas críticas.
        </MenuItem>
      ) : (
        <MenuItem onClick={handleNotificationsClose}>
          <CheckCircleIcon color="success" sx={{ mr: 1 }} />
          No hay alertas críticas.
        </MenuItem>
      )}
      <MenuItem onClick={handleNotificationsClose}>
        <EventNoteIcon color="primary" sx={{ mr: 1 }} />
        Próxima reunión: 15 de Junio.
      </MenuItem>
      <MenuItem onClick={handleNotificationsClose}>
        <ScheduleIcon color="info" sx={{ mr: 1 }} />
        Tienes 5 tareas pendientes.
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => { handleNotificationsClose(); showSnackbar('Ver todas las notificaciones', 'info'); }}>
        Ver Todas
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#eef2f6', minHeight: '100vh', color: '#000000', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={2} sx={{ bgcolor: '#004a8f', borderBottom: '1px solid #1565c0' }}>
        <Toolbar>
          {!isMobile && (
            <DashboardIcon sx={{ fontSize: 36, mr: 1, color: '#ffffff' }} />
          )}
          <Typography variant="h3" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            CONSULNETWORKS
          </Typography>
          <Tooltip title="Notificaciones">
            <IconButton color="inherit" onClick={handleNotificationsClick}>
              <Badge badgeContent={executiveMetrics[3].value} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <NotificationMenu />
          <Divider orientation="vertical" flexItem sx={{ mx: 2, bgcolor: 'rgba(255,255,255,0.3)' }} />
          <Chip
            avatar={<Avatar src={currentUser.avatar} />}
            label={currentUser.name}
            sx={{ bgcolor: '#ffffff', color: '#004a8f', fontWeight: 600, mr: 1 }}
          />
          <Tooltip title="Cerrar Sesión">
            <IconButton color="inherit" onClick={() => showSnackbar('Sesión cerrada (simulado).', 'info')}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h1" component="h1" gutterBottom sx={{ color: '#004a8f', fontWeight: 700 }}>
            Bienvenido {currentUser.name}
          </Typography>
          <Typography variant="h6" color="#616161">
            Resumen Ejecutivo y Noticias Clave.
          </Typography>
        </Box>

        {/* Sección de Métricas Ejecutivas (Key Performance Indicators) */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {executiveMetrics.map((metric) => (
            <Grid item xs={12} sm={6} md={3} key={metric.id}>
              <Card elevation={4} sx={{ bgcolor: '#ffffff', borderLeft: `5px solid ${metric.color}`, borderRadius: 2 }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="subtitle1" color="text.secondary" fontWeight={600}>{metric.title}</Typography>
                    {metric.trend === 'up' ? (
                      <TrendingUpIcon sx={{ color: '#009688' }} />
                    ) : (
                      <TrendingDownIcon sx={{ color: '#d32f2f' }} />
                    )}
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: metric.color }}>{metric.value}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {metric.change} {metric.trend === 'up' ? 'vs. período anterior' : 'respecto al objetivo'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          {/* Columna Izquierda: Gráficos y Quick Access */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" sx={{ mb: 2, color: '#004a8f', fontWeight: 600, borderBottom: '1px solid #e0e0e0', pb: 1 }}>
              <DashboardIcon sx={{verticalAlign: 'middle', mr:1}}/> Dashboard General
            </Typography>

            <Alert severity="info" sx={{ mb: 3 }}>
              Este es un resumen visual de los datos clave. Haz clic en las tarjetas de métricas para más detalles.
            </Alert>

            {/* Fila de Gráficos Principales */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} lg={6}>
                <ChartPlaceholder
                  title="Rendimiento de Ventas Mensuales"
                  description="Tendencia de ingresos y volumen de ventas."
                  type="LÍNEAS"
                  color="#009688"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <ChartPlaceholder
                  title="Distribución de Clientes por Región"
                  description="Segmentación geográfica de la base de clientes."
                  type="ANILLO"
                  color="#ff9800"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <ChartPlaceholder
                  title="Progreso de Proyectos Clave"
                  description="Estado de los proyectos críticos en curso."
                  type="BARRAS APILADAS"
                  color="#1976d2"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <ChartPlaceholder
                  title="Satisfacción del Cliente (NPS)"
                  description="Índice de promotores netos y feedback."
                  type="GAUGE / KPIs"
                  color="#d32f2f"
                />
              </Grid>
            </Grid>

            {/* Sección de Acceso Rápido */}
            <Typography variant="h5" sx={{ mb: 2, color: '#004a8f', fontWeight: 600, borderBottom: '1px solid #e0e0e0', pb: 1, mt: 4 }}>
              <LinkIcon sx={{verticalAlign: 'middle', mr:1}}/> Acceso Rápido
            </Typography>
            <Grid container spacing={2}>
              {quickAccessItems.map(item => (
                <Grid item xs={12} sm={6} lg={4} key={item.name}>
                  <Card elevation={2} sx={{ p: 1.5, display: 'flex', alignItems: 'center', bgcolor: '#e3f2fd', '&:hover': { bgcolor: '#bbdefb' }, cursor: 'pointer' }}
                        onClick={() => showSnackbar(`Abriendo: ${item.name} (simulado).`, 'info')}
                  >
                    <Avatar sx={{ bgcolor: '#90caf9', color: '#1976d2', mr: 2 }}>
                      {item.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{fontSize: '0.85rem'}}>{item.description}</Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Columna Derecha: Noticias y Comunicados */}
          <Grid item xs={12} md={4}>
            {/* Noticias Recientes */}
            <Paper elevation={4} sx={{ p: 3, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ color: '#004a8f', mb: 2, fontWeight: 600, borderBottom: '1px solid #e0e0e0', pb: 1 }}>
                <NewsroomIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Noticias Recientes
              </Typography>
              <List sx={{ maxHeight: 350, overflowY: 'auto' }}>
                {newsFeed.map((news) => (
                  <ListItem key={news.id} divider sx={{ '&:hover': { bgcolor: '#f5f5f5' }, cursor: 'pointer' }}
                            onClick={() => showSnackbar(`Abriendo noticia: ${news.title} (simulado).`, 'info')}
                  >004A8F
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: '#e0f2f7', color: '#004a8f' }}>
                        {news.icon || <InfoIcon />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography variant="subtitle1" fontWeight={500}>{news.title}</Typography>}
                      secondary={
                        <Box>
                          <Chip label={news.category} size="small" color="primary" sx={{ mr: 1, mt: 0.5 }} />
                          <Typography variant="caption" color="text.secondary">{news.date}</Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Button variant="outlined" sx={{ mt: 2, width: '100%', textTransform: 'none', color: '#004a8f', borderColor: '#004a8f' }}
                      onClick={() => showSnackbar('Navegando a la Sala de Prensa completa.', 'info')}>
                Ver Todas las Noticias
              </Button>
            </Paper>

            {/* Comunicados Importantes */}
            <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ color: '#004a8f', mb: 2, fontWeight: 600, borderBottom: '1px solid #e0e0e0', pb: 1 }}>
                <AnnouncementIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Comunicados Importantes
              </Typography>
              <List sx={{ maxHeight: 300, overflowY: 'auto' }}>
                {announcements.map((announcement) => (
                  <ListItem key={announcement.id} divider sx={{ '&:hover': { bgcolor: '#f5f5f5' }, cursor: 'pointer' }}
                            onClick={() => showSnackbar(`Abriendo comunicado: ${announcement.title} (simulado).`, 'info')}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: announcement.urgency === 'Alta' ? '#ffe0b2' : '#e3f2fd', color: announcement.urgency === 'Alta' ? '#e65100' : '#004a8f' }}>
                        <InfoIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="subtitle1" fontWeight={500}>{announcement.title}</Typography>
                          <Chip label={announcement.urgency} size="small" color={announcement.urgency === 'Alta' ? 'error' : 'info'} />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Chip label={announcement.type} size="small" variant="outlined" sx={{ mr: 1, mt: 0.5 }} />
                          <Typography variant="caption" color="text.secondary">{announcement.date}</Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Button variant="outlined" sx={{ mt: 2, width: '100%', textTransform: 'none', color: '#004a8f', borderColor: '#004a8f' }}
                      onClick={() => showSnackbar('Navegando a la sección de Comunicados.', 'info')}>
                Ver Todos los Comunicados
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Sección de Navegación a Otros Paneles (opcional, si no hay un menú lateral) */}
        <Typography variant="h5" sx={{ mb: 3, color: '#004a8f', fontWeight: 600, borderBottom: '1px solid #e0e0e0', pb: 1, mt: 6 }}>
          <MenuIcon sx={{verticalAlign: 'middle', mr:1}}/> Navegación Principal
        </Typography>
        <Grid container spacing={3}>
          {modules.map((module) => (
            <Grid item xs={12} sm={6} md={3} key={module.id}>
              <Card elevation={3} sx={{ p: 2, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#ffffff', '&:hover': { bgcolor: '#e3f2fd' }, cursor: 'pointer' }}
                    onClick={() => handleModuleClick(module.id)}
              >
                <Avatar sx={{ bgcolor: '#bbdefb', width: 60, height: 60, mb: 1, color: '#004a8f' }}>
                  {React.cloneElement(module.icon, { sx: { fontSize: 36 } })}
                </Avatar>
                <Typography variant="h6" fontWeight={600} sx={{ color: '#333', mb: 1 }}>
                  {module.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Accede a la gestión de {module.name.toLowerCase().replace(' del sistema', '')}.
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

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

export default ExecutiveHomePage;