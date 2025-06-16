import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Container, Typography, Box, Grid, Paper, Chip, Divider,
  List, ListItem, ListItemText, ListItemAvatar, Avatar,
  TextField, InputAdornment, IconButton, Button,
  AppBar, Toolbar, Tooltip,
  Tabs, Tab,
  Badge,
  Menu, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select,
  LinearProgress,
  Alert,
  Snackbar,
  Card, CardContent, CardActions, CardHeader,
  Accordion, AccordionSummary, AccordionDetails,
  Pagination,
  ButtonGroup,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  ToggleButton, ToggleButtonGroup,
  useMediaQuery,
  useTheme,
  FormGroup, FormControlLabel, Switch, Checkbox,
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'; // Icono principal de Alertas
import SettingsIcon from '@mui/icons-material/Settings'; // Configuración
import HistoryIcon from '@mui/icons-material/History'; // Historial
import MailOutlineIcon from '@mui/icons-material/MailOutline'; // Email
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'; // SMS / Push
import WebIcon from '@mui/icons-material/Web'; // Notificación Web
import DoneAllIcon from '@mui/icons-material/DoneAll'; // Marcar todo como leído
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Eliminar notificación
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Acordeón
import BugReportIcon from '@mui/icons-material/BugReport'; // Alerta de Error
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'; // Alerta de Ticket
import TaskAltIcon from '@mui/icons-material/TaskAlt'; // Alerta de Tarea
import ForumIcon from '@mui/icons-material/Forum'; // Alerta de Foro
import EventIcon from '@mui/icons-material/Event'; // Alerta de Evento
import UpdateIcon from '@mui/icons-material/Update'; // Alerta de Actualización
import InfoIcon from '@mui/icons-material/Info'; // Información general
import WarningIcon from '@mui/icons-material/Warning'; // Advertencia
import ErrorIcon from '@mui/icons-material/Error'; // Error Crítico
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Éxito
import FilterListIcon from '@mui/icons-material/FilterList'; // Filtros
import SortIcon from '@mui/icons-material/Sort';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
import CampaignIcon from '@mui/icons-material/Campaign';
import * as PropTypes from 'prop-types'; // Ordenar

// --- Datos Simulados para Alertas y Notificaciones ---

const currentUser = {
  id: 'U001',
  name: 'Bryan Rosero',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Bryan%20Rosero',
  role: 'Administrador',
  email: 'ing.desarrollo@example.com',
  phone: '+573101234567',

};

const notificationPreferences = {
  email: {
    newTicketAssigned: true,
    ticketStatusChange: true,
    newForumReply: false,
    systemUpdate: true,
    urgentAnnouncement: true,
    taskDueDate: true,
  },
  webPush: {
    newTicketAssigned: true,
    ticketStatusChange: true,
    newForumReply: true,
    systemUpdate: true,
    urgentAnnouncement: true,
    taskDueDate: true,
  },
  sms: { // Asumimos SMS solo para cosas muy críticas o específicas
    urgentAnnouncement: true,
    criticalSystemError: false,
  },
};

const notificationSounds = {
  newTicketAssigned: 'default',
  urgentAnnouncement: 'alert',
  general: 'ding',
};

const notificationTypes = {
  'ticket': { icon: <ConfirmationNumberIcon color="primary" />, label: 'Ticket de Soporte' },
  'task': { icon: <TaskAltIcon color="success" />, label: 'Tarea Asignada' },
  'forum': { icon: <ForumIcon color="info" />, label: 'Actividad en Foro' },
  'announcement': { icon: <CampaignIcon color="warning" />, label: 'Anuncio/Comunicado' },
  'system': { icon: <UpdateIcon color="action" />, label: 'Actualización del Sistema' },
  'error': { icon: <BugReportIcon color="error" />, label: 'Error Crítico' },
  'event': { icon: <EventIcon sx={{ color: '#9c27b0' }} />, label: 'Evento' }, // Morado
};

const notificationSeverities = {
  'info': { icon: <InfoIcon fontSize="small" color="info" />, label: 'Informativo' },
  'warning': { icon: <WarningIcon fontSize="small" color="warning" />, label: 'Advertencia' },
  'error': { icon: <ErrorIcon fontSize="small" color="error" />, label: 'Error' },
  'success': { icon: <CheckCircleIcon fontSize="small" color="success" />, label: 'Éxito' },
  'critical': { icon: <NotificationsActiveIcon fontSize="small" sx={{ color: 'red' }} />, label: 'Crítico' },
};


const userNotifications = [
  { id: 'N001', type: 'ticket', severity: 'critical', title: 'Ticket TKT005 reasignado: Problema con impresora de red', message: 'El ticket TKT005 ha sido reasignado a ti. Prioridad: Baja.', timestamp: 'Hace 5 minutos', read: false, relatedId: 'TKT005' },
  { id: 'N002', type: 'task', severity: 'warning', title: 'Vencimiento de Tarea: Revisar logs de servidor', message: 'La tarea "Revisar logs de servidor web" vence mañana (15 de junio).', timestamp: 'Hace 30 minutos', read: false, relatedId: 'TASK001' },
  { id: 'N003', type: 'forum', severity: 'info', title: 'Nueva respuesta en "Error al iniciar sesión"', message: 'María Fernández ha respondido a tu tema en el foro de Soporte Técnico.', timestamp: 'Hace 1 hora', read: true, relatedId: 'T001' },
  { id: 'N004', type: 'announcement', severity: 'critical', title: '¡COMUNICADO URGENTE! Cierre por festivo: 20 de junio', message: 'Nuestras oficinas permanecerán cerradas el 20 de junio. Por favor, toma precauciones.', timestamp: 'Hace 2 horas', read: false, relatedId: 'AN002' },
  { id: 'N005', type: 'system', severity: 'success', title: 'Actualización de Sistema Completada', message: 'La actualización del sistema se ha completado con éxito. Puede que necesites recargar la página.', timestamp: 'Ayer', read: true, relatedId: null },
  { id: 'N006', type: 'ticket', severity: 'success', title: 'Ticket TKT003 resuelto: Consulta de informes', message: 'El ticket TKT003 ha sido marcado como "Resuelto".', timestamp: 'Ayer', read: true, relatedId: 'TKT003' },
  { id: 'N007', type: 'error', severity: 'error', title: 'Error Crítico: Fallo en la base de datos de usuarios', message: 'Se ha detectado un fallo crítico en la base de datos de usuarios. El equipo técnico está trabajando en ello.', timestamp: 'Hace 3 días', read: true, relatedId: null },
  { id: 'N008', type: 'event', severity: 'info', title: 'Recordatorio de Evento: Reunión semanal de equipo', message: 'La reunión semanal de equipo es hoy a las 3 PM.', timestamp: 'Hoy, 2:00 PM', read: false, relatedId: null },
];

function VolumeUpIcon(props) {
  return null;
}

VolumeUpIcon.propTypes = { sx: PropTypes.shape({ verticalAlign: PropTypes.string, ml: PropTypes.number }) };

// Componente principal
function SmartAlertsNotificationsPanel({ onGoToHome }) {
  const [currentTab, setCurrentTab] = useState('inbox'); // 'inbox', 'preferences', 'history'
  const [notifications, setNotifications] = useState(userNotifications);
  const [unreadCount, setUnreadCount] = useState(notifications.filter(n => !n.read).length);

  const [filterType, setFilterType] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('');
  const [sortBy, setSortBy] = useState('latest'); // 'latest', 'oldest'

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const [localPreferences, setLocalPreferences] = useState(notificationPreferences);
  const [localSounds, setLocalSounds] = useState(notificationSounds);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const showSnackbar = useCallback((message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  const handleMarkAsRead = (id) => {
    const updatedNotifications = notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    showSnackbar('Notificación marcada como leída.', 'success');
  };

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updatedNotifications);
    showSnackbar('Todas las notificaciones marcadas como leídas.', 'success');
  };

  const handleDeleteNotification = (id) => {
    const updatedNotifications = notifications.filter(n => n.id !== id);
    setNotifications(updatedNotifications);
    showSnackbar('Notificación eliminada.', 'info');
  };

  const handleOpenNotificationDetail = (notification) => {
    setSelectedNotification(notification);
    setDialogOpen(true);
    handleMarkAsRead(notification.id); // Marca como leída al abrir
  };

  const handlePreferenceChange = (channel, type) => (event) => {
    setLocalPreferences(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [type]: event.target.checked,
      },
    }));
  };

  const handleSoundChange = (type) => (event) => {
    setLocalSounds(prev => ({
      ...prev,
      [type]: event.target.value,
    }));
  };

  const handleSaveChanges = () => {
    // Aquí se enviaría `localPreferences` y `localSounds` a la API
    showSnackbar('Preferencias guardadas con éxito.', 'success');
  };

  const sortedAndFilteredNotifications = [...notifications]
    .filter(n => (filterType ? n.type === filterType : true))
    .filter(n => (filterSeverity ? n.severity === filterSeverity : true))
    .sort((a, b) => {
      const dateA = new Date(a.timestamp.includes('Hoy') || a.timestamp.includes('Hace') ? new Date() : a.timestamp); // Simplificación
      const dateB = new Date(b.timestamp.includes('Hoy') || b.timestamp.includes('Hace') ? new Date() : b.timestamp); // Simplificación
      return sortBy === 'latest' ? dateB - dateA : dateA - dateB;
    });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', minHeight: '100vh', color: '#333', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#1a237e', borderBottom: '1px solid #3f51b5' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2, color: '#bdbdbd' }}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}
          <NotificationsActiveIcon sx={{ fontSize: 36, mr: 1, color: '#ffc107' }} /> {/* Amarillo para alertas */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Alertas y Notificaciones Inteligentes
          </Typography>
          <Chip
            avatar={<Avatar src={currentUser.avatar} />}
            label={currentUser.name}
            sx={{ bgcolor: '#3f51b5', color: '#ffffff', fontWeight: 600 }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#1a237e' }}>
            Tu Centro de Información Personalizado
          </Typography>
          <Typography variant="h6" color="#616161">
            Recibe solo lo que importa, cuando importa.
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
                backgroundColor: '#1a237e', // Azul oscuro
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                '&.Mui-selected': {
                  color: '#1a237e', // Azul oscuro
                },
              },
            }}
          >
            <Tab
              label={
                <Badge badgeContent={unreadCount} color="error">
                  Bandeja de Entrada
                </Badge>
              }
              value="inbox"
              icon={<MailOutlineIcon />}
              iconPosition="start"
            />
            <Tab label="Preferencias de Notificación" value="preferences" icon={<SettingsIcon />} iconPosition="start" />
            <Tab label="Historial de Notificaciones" value="history" icon={<HistoryIcon />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Contenido de las Pestañas */}
        <Box sx={{ p: 0 }}>
          {/* Tab: Bandeja de Entrada */}
          {currentTab === 'inbox' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <NotificationsActiveIcon sx={{ color: '#ffc107', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Tus Notificaciones Recientes
                </Typography>
                <Button variant="outlined" startIcon={<DoneAllIcon />} onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
                  Marcar Todo como Leído
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Filtrar por Tipo</InputLabel>
                  <Select value={filterType} label="Filtrar por Tipo" onChange={(e) => setFilterType(e.target.value)}>
                    <MenuItem value="">Todos los Tipos</MenuItem>
                    {Object.keys(notificationTypes).map(key => (
                      <MenuItem key={key} value={key} sx={{display:'flex', alignItems: 'center'}}>
                        {notificationTypes[key].icon} <Box sx={{ml:1}}>{notificationTypes[key].label}</Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Filtrar por Severidad</InputLabel>
                  <Select value={filterSeverity} label="Filtrar por Severidad" onChange={(e) => setFilterSeverity(e.target.value)}>
                    <MenuItem value="">Todas las Severidades</MenuItem>
                    {Object.keys(notificationSeverities).map(key => (
                      <MenuItem key={key} value={key} sx={{display:'flex', alignItems: 'center'}}>
                        {notificationSeverities[key].icon} <Box sx={{ml:1}}>{notificationSeverities[key].label}</Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <ToggleButtonGroup
                  value={sortBy}
                  exclusive
                  onChange={(e, newSortBy) => { if (newSortBy) setSortBy(newSortBy); }}
                  size="small"
                  sx={{ml: isMobile ? 0 : 'auto'}}
                >
                  <ToggleButton value="latest"><SortIcon /> Más Recientes</ToggleButton>
                  <ToggleButton value="oldest"><SortIcon sx={{ transform: 'rotate(180deg)' }} /> Más Antiguas</ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <List>
                {sortedAndFilteredNotifications.length > 0 ? (
                  sortedAndFilteredNotifications.map(notification => (
                    <ListItem
                      key={notification.id}
                      alignItems="flex-start"
                      sx={{
                        mb: 1.5,
                        p: 2,
                        borderRadius: 2,
                        border: '1px solid #e0e0e0',
                        bgcolor: notification.read ? '#fafafa' : '#fffde7', // Destacar no leídas
                        '&:hover': { bgcolor: notification.read ? '#f0f0f0' : '#fff9c4' },
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                      }}
                      onClick={() => handleOpenNotificationDetail(notification)}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: notification.severity === 'critical' ? '#d32f2f' : (notification.severity === 'warning' ? '#ff9800' : (notification.severity === 'success' ? '#4caf50' : '#1a237e')), color: '#fff' }}>
                          {notificationTypes[notification.type]?.icon || <InfoIcon />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center">
                            <Typography variant="subtitle1" sx={{ fontWeight: notification.read ? 400 : 600, color: notification.read ? '#616161' : '#333' }}>
                              {notification.title}
                            </Typography>
                            {!notification.read && (
                              <Badge variant="dot" color="error" sx={{ ml: 1, '& .MuiBadge-badge': { height: 10, minWidth: 10, borderRadius: '50%' } }} />
                            )}
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.secondary" sx={{ display: 'block' }}>
                              {notification.message}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, color: 'text.disabled' }}>
                              {notificationSeverities[notification.severity]?.icon}
                              <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>{notificationSeverities[notification.severity]?.label}</Typography>
                              <AccessTimeIcon sx={{ fontSize: 14, mr: 0.5 }} />
                              <Typography variant="caption">{notification.timestamp}</Typography>
                            </Box>
                          </>
                        }
                      />
                      <Box sx={{ ml: 2, display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: 1 }}>
                        {!notification.read && (
                          <Tooltip title="Marcar como Leído">
                            <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleMarkAsRead(notification.id); }}>
                              <CheckCircleIcon color="success" />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="Eliminar">
                          <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleDeleteNotification(notification.id); }}>
                            <DeleteOutlineIcon color="error" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </ListItem>
                  ))
                ) : (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    No hay notificaciones en tu bandeja de entrada con los filtros seleccionados.
                  </Alert>
                )}
              </List>
              <Pagination count={Math.ceil(sortedAndFilteredNotifications.length / 10)} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }} />
            </Paper>
          )}

          {/* Tab: Preferencias de Notificación */}
          {currentTab === 'preferences' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <SettingsIcon sx={{ color: '#90caf9', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Gestionar tus Preferencias de Notificación
                </Typography>
                <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSaveChanges} sx={{ textTransform: 'none', bgcolor: '#1a237e', '&:hover': { bgcolor: '#303f9f' } }}>
                  Guardar Cambios
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ bgcolor: '#e3f2fd', p: 2, borderRadius: 2 }}>
                    <CardHeader title={<Typography variant="h6" sx={{color: '#1a237e'}}>Notificaciones por Email <MailOutlineIcon sx={{verticalAlign: 'middle', ml:0.5}}/></Typography>} sx={{pb:0}}/>
                    <CardContent>
                      <FormGroup>
                        <FormControlLabel
                          control={<Switch checked={localPreferences.email.newTicketAssigned} onChange={handlePreferenceChange('email', 'newTicketAssigned')} />}
                          label="Nuevo Ticket Asignado"
                        />
                        <FormControlLabel
                          control={<Switch checked={localPreferences.email.ticketStatusChange} onChange={handlePreferenceChange('email', 'ticketStatusChange')} />}
                          label="Cambio de Estado de Ticket"
                        />
                        <FormControlLabel
                          control={<Switch checked={localPreferences.email.newForumReply} onChange={handlePreferenceChange('email', 'newForumReply')} />}
                          label="Nueva Respuesta en Foro (Temas que sigo)"
                        />
                        <FormControlLabel
                          control={<Switch checked={localPreferences.email.systemUpdate} onChange={handlePreferenceChange('email', 'systemUpdate')} />}
                          label="Actualizaciones del Sistema"
                        />
                        <FormControlLabel
                          control={<Switch checked={localPreferences.email.urgentAnnouncement} onChange={handlePreferenceChange('email', 'urgentAnnouncement')} />}
                          label="Comunicados Urgentes"
                        />
                        <FormControlLabel
                          control={<Switch checked={localPreferences.email.taskDueDate} onChange={handlePreferenceChange('email', 'taskDueDate')} />}
                          label="Recordatorio de Tareas Próximas"
                        />
                      </FormGroup>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ bgcolor: '#e8f5e9', p: 2, borderRadius: 2 }}>
                    <CardHeader title={<Typography variant="h6" sx={{color: '#388e3c'}}>Notificaciones Push Web <WebIcon sx={{verticalAlign: 'middle', ml:0.5}}/></Typography>} sx={{pb:0}}/>
                    <CardContent>
                      <FormGroup>
                        <FormControlLabel
                          control={<Switch checked={localPreferences.webPush.newTicketAssigned} onChange={handlePreferenceChange('webPush', 'newTicketAssigned')} />}
                          label="Nuevo Ticket Asignado"
                        />
                        <FormControlLabel
                          control={<Switch checked={localPreferences.webPush.ticketStatusChange} onChange={handlePreferenceChange('webPush', 'ticketStatusChange')} />}
                          label="Cambio de Estado de Ticket"
                        />
                        <FormControlLabel
                          control={<Switch checked={localPreferences.webPush.newForumReply} onChange={handlePreferenceChange('webPush', 'newForumReply')} />}
                          label="Nueva Respuesta en Foro (Temas que sigo)"
                        />
                        <FormControlLabel
                          control={<Switch checked={localPreferences.webPush.systemUpdate} onChange={handlePreferenceChange('webPush', 'systemUpdate')} />}
                          label="Actualizaciones del Sistema"
                        />
                        <FormControlLabel
                          control={<Switch checked={localPreferences.webPush.urgentAnnouncement} onChange={handlePreferenceChange('webPush', 'urgentAnnouncement')} />}
                          label="Comunicados Urgentes"
                        />
                        <FormControlLabel
                          control={<Switch checked={localPreferences.webPush.taskDueDate} onChange={handlePreferenceChange('webPush', 'taskDueDate')} />}
                          label="Recordatorio de Tareas Próximas"
                        />
                      </FormGroup>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ bgcolor: '#fff3e0', p: 2, borderRadius: 2 }}>
                    <CardHeader title={<Typography variant="h6" sx={{color: '#ff9800'}}>Notificaciones SMS <PhoneIphoneIcon sx={{verticalAlign: 'middle', ml:0.5}}/></Typography>} sx={{pb:0}}/>
                    <CardContent>
                      <Alert severity="warning" sx={{mb:2}}>Solo para notificaciones críticas o de alta prioridad.</Alert>
                      <FormGroup>
                        <FormControlLabel
                          control={<Switch checked={localPreferences.sms.urgentAnnouncement} onChange={handlePreferenceChange('sms', 'urgentAnnouncement')} />}
                          label="Comunicados Urgentes"
                        />
                        <FormControlLabel
                          control={<Switch checked={localPreferences.sms.criticalSystemError} onChange={handlePreferenceChange('sms', 'criticalSystemError')} />}
                          label="Errores Críticos del Sistema"
                        />
                      </FormGroup>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ bgcolor: '#f3e5f5', p: 2, borderRadius: 2 }}>
                    <CardHeader title={<Typography variant="h6" sx={{color: '#9c27b0'}}>Sonidos de Notificación <VolumeUpIcon sx={{verticalAlign: 'middle', ml:0.5}}/></Typography>} sx={{pb:0}}/>
                    <CardContent>
                      <FormControl fullWidth margin="normal" size="small">
                        <InputLabel>Sonido para Nuevo Ticket Asignado</InputLabel>
                        <Select
                          value={localSounds.newTicketAssigned}
                          label="Sonido para Nuevo Ticket Asignado"
                          onChange={handleSoundChange('newTicketAssigned')}
                        >
                          <MenuItem value="default">Por Defecto</MenuItem>
                          <MenuItem value="alert">Alerta</MenuItem>
                          <MenuItem value="ding">Ding</MenuItem>
                          <MenuItem value="none">Ninguno</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth margin="normal" size="small">
                        <InputLabel>Sonido para Comunicado Urgente</InputLabel>
                        <Select
                          value={localSounds.urgentAnnouncement}
                          label="Sonido para Comunicado Urgente"
                          onChange={handleSoundChange('urgentAnnouncement')}
                        >
                          <MenuItem value="default">Por Defecto</MenuItem>
                          <MenuItem value="alert">Alerta</MenuItem>
                          <MenuItem value="ding">Ding</MenuItem>
                          <MenuItem value="none">Ninguno</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth margin="normal" size="small">
                        <InputLabel>Sonido para Notificaciones Generales</InputLabel>
                        <Select
                          value={localSounds.general}
                          label="Sonido para Notificaciones Generales"
                          onChange={handleSoundChange('general')}
                        >
                          <MenuItem value="default">Por Defecto</MenuItem>
                          <MenuItem value="alert">Alerta</MenuItem>
                          <MenuItem value="ding">Ding</MenuItem>
                          <MenuItem value="none">Ninguno</MenuItem>
                        </Select>
                      </FormControl>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Alert severity="info" sx={{ mt: 3 }}>
                Personaliza tus notificaciones para recibir la información que más te importa.
              </Alert>
            </Paper>
          )}

          {/* Tab: Historial de Notificaciones */}
          {currentTab === 'history' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <HistoryIcon sx={{ color: '#424242', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Historial Completo de Notificaciones
                </Typography>
                <TextField
                  size="small"
                  placeholder="Buscar en el historial..."
                  InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
                  sx={{ width: isMobile ? '100%' : '300px' }}
                />
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="warning" sx={{mb:3}}>
                Este historial puede contener notificaciones antiguas. Utiliza los filtros para encontrar lo que buscas.
              </Alert>

              <List>
                {notifications.length > 0 ? (
                  [...notifications].sort((a,b) => new Date(b.timestamp.includes('Hoy') || b.timestamp.includes('Hace') ? new Date() : b.timestamp) - new Date(a.timestamp.includes('Hoy') || a.timestamp.includes('Hace') ? new Date() : a.timestamp)).map(notification => (
                    <ListItem
                      key={notification.id}
                      alignItems="flex-start"
                      sx={{
                        mb: 1,
                        p: 1.5,
                        borderRadius: 1,
                        border: '1px solid #eee',
                        bgcolor: '#fafafa',
                        '&:hover': { bgcolor: '#f0f0f0' },
                        cursor: 'pointer',
                      }}
                      onClick={() => handleOpenNotificationDetail(notification)}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: notification.severity === 'critical' ? '#d32f2f' : (notification.severity === 'warning' ? '#ff9800' : (notification.severity === 'success' ? '#4caf50' : '#1a237e')), color: '#fff', width: 40, height: 40 }}>
                          {notificationTypes[notification.type]?.icon || <InfoIcon />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center">
                            <Typography variant="subtitle2" sx={{ fontWeight: 500, flexGrow: 1, color: '#333' }}>
                              {notification.title}
                            </Typography>
                            {notification.read && (
                              <Tooltip title="Leída"><CheckCircleIcon color="action" sx={{ fontSize: 18, ml: 1 }} /></Tooltip>
                            )}
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.secondary">
                              {notification.message}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, color: 'text.disabled' }}>
                              {notificationSeverities[notification.severity]?.icon}
                              <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>{notificationSeverities[notification.severity]?.label}</Typography>
                              <AccessTimeIcon sx={{ fontSize: 14, mr: 0.5 }} />
                              <Typography variant="caption">{notification.timestamp}</Typography>
                            </Box>
                          </>
                        }
                      />
                    </ListItem>
                  ))
                ) : (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Tu historial de notificaciones está vacío.
                  </Alert>
                )}
              </List>
            </Paper>
          )}
        </Box>
      </Container>

      {/* Dialog para Detalles de Notificación */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>
          Detalles de Notificación
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          {selectedNotification ? (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" mb={1}>
                  <Avatar sx={{ bgcolor: notificationSeverities[selectedNotification.severity]?.color || '#1a237e', color: '#fff', mr: 1 }}>
                    {notificationTypes[selectedNotification.type]?.icon}
                  </Avatar>
                  <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600, color: '#1a237e' }}>
                    {selectedNotification.title}
                  </Typography>
                </Box>
                <Divider sx={{ mb: 1 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">Tipo:</Typography>
                <Box mb={1}>{notificationTypes[selectedNotification.type]?.label}</Box>

                <Typography variant="body2" color="text.secondary">Severidad:</Typography>
                <Box mb={1} display="flex" alignItems="center">
                  {notificationSeverities[selectedNotification.severity]?.icon}
                  <Typography variant="body1" sx={{ml:0.5, fontWeight:500}}>{notificationSeverities[selectedNotification.severity]?.label}</Typography>
                </Box>

                <Typography variant="body2" color="text.secondary">Mensaje:</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>{selectedNotification.message}</Typography>

                <Typography variant="body2" color="text.secondary">Recibido:</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>{selectedNotification.timestamp}</Typography>

                {selectedNotification.relatedId && (
                  <>
                    <Typography variant="body2" color="text.secondary">ID Relacionado:</Typography>
                    <Chip label={selectedNotification.relatedId} color="primary" onClick={() => showSnackbar(`Redirigiendo a ${selectedNotification.relatedId}...`, 'info')} />
                  </>
                )}
              </Grid>
            </Grid>
          ) : (
            <Typography>Cargando detalles de la notificación...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">Cerrar</Button>
          <Button variant="contained" color="error" startIcon={<DeleteOutlineIcon />} onClick={() => { handleDeleteNotification(selectedNotification.id); setDialogOpen(false); }}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

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

export default SmartAlertsNotificationsPanel;