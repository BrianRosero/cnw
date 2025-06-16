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
  Avatar, Badge,
  InputAdornment,
  FormGroup,
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icono principal de Perfil
import EditIcon from '@mui/icons-material/Edit'; // Editar
import VpnKeyIcon from '@mui/icons-material/VpnKey'; // Contraseña/Seguridad
import NotificationsIcon from '@mui/icons-material/Notifications'; // Notificaciones
import PaletteIcon from '@mui/icons-material/Palette'; // Personalización/Tema
import LanguageIcon from '@mui/icons-material/Language'; // Idioma
import EventNoteIcon from '@mui/icons-material/EventNote'; // Actividad
import DevicesIcon from '@mui/icons-material/Devices'; // Dispositivos
import EmailIcon from '@mui/icons-material/Email'; // Email
import PhoneIcon from '@mui/icons-material/Phone'; // Teléfono
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Dirección
import CakeIcon from '@mui/icons-material/Cake'; // Fecha de Nacimiento
import WorkIcon from '@mui/icons-material/Work'; // Puesto
import GroupIcon from '@mui/icons-material/Group'; // Grupos
import SecurityIcon from '@mui/icons-material/Security'; // Roles/Permisos
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'; // Subir foto
import SaveIcon from '@mui/icons-material/Save'; // Guardar
import CancelIcon from '@mui/icons-material/Cancel'; // Cancelar
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Éxito
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Error
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Advertencia
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Acordeón
import LogoutIcon from '@mui/icons-material/Logout'; // Cerrar Sesión
import LoginIcon from '@mui/icons-material/Login';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RefreshIcon from '@mui/icons-material/Refresh'; // Actividad Login

// --- Datos Simulados (Perfil del Usuario Actual) ---

const initialUserProfile = {
  id: 'USER-001',
  firstName: 'Bryan',
  lastName: 'Rosero',
  email: 'ing.desarrollo@example.com',
  phone: '+57 310 123 4567',
  address: 'Calle 10 # 5-20, Cali, Valle del Cauca, Colombia',
  birthDate: '1990-03-15',
  jobTitle: 'Administrador Plataforma',
  department: 'Ingeniería',
  avatarUrl: 'https://cdn-icons-png.flaticon.com/512/147/147142.png', // URL de avatar de ejemplo
  role: 'Editor',
  groups: ['Proyectos', 'Desarrollo'],
  status: 'Activo',
  lastLogin: '2025-06-11 23:00:00 -05',
  mfaEnabled: true,
  theme: 'light', // 'light', 'dark', 'system'
  language: 'es-CO', // 'es-CO', 'en-US'
  notificationPreferences: {
    emailUpdates: true,
    smsAlerts: false,
    pushNotifications: true,
    newsletter: true,
  },
  securitySettings: {
    passwordLastChanged: '2025-05-20',
    failedLoginAttemptsLast24h: 3,
    recentLogins: [
      { id: 'RL-001', timestamp: '2025-06-11 23:00:00', device: 'Desktop - Chrome', ip: '192.168.1.101', location: 'Cali, Colombia' },
      { id: 'RL-002', timestamp: '2025-06-11 10:15:30', device: 'Mobile - Safari', ip: '172.16.0.25', location: 'Medellín, Colombia' },
      { id: 'RL-003', timestamp: '2025-06-10 18:40:15', device: 'Laptop - Firefox', ip: '203.0.113.12', location: 'Bogotá, Colombia' },
    ],
  },
  activityLog: [
    { id: 'AL-001', timestamp: '2025-06-11 22:50:00', event: 'Actualizó información de contacto' },
    { id: 'AL-002', timestamp: '2025-06-11 15:30:00', event: 'Editó documento "Informe Q2"' },
    { id: 'AL-003', timestamp: '2025-06-10 09:00:00', event: 'Accedió al módulo de Proyectos' },
    { id: 'AL-004', timestamp: '2025-06-09 11:45:00', event: 'Cambió preferencias de notificación' },
  ],
};


function UserProfilePanel({ onGoToHome }) {
  const [currentTab, setCurrentTab] = useState('profile'); // 'profile', 'security', 'notifications', 'personalization', 'activity'
  const [userProfile, setUserProfile] = useState(initialUserProfile);
  const [editMode, setEditMode] = useState(false); // Para el modo de edición de información personal
  const [tempProfile, setTempProfile] = useState({}); // Para guardar cambios mientras se edita

  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);
  const [passwordFields, setPasswordFields] = useState({ current: '', new: '', confirmNew: '' });
  const [showPassword, setShowPassword] = useState(false);


  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const showSnackbar = useCallback((message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  useEffect(() => {
    // Cuando se entra en modo edición, copiar el perfil actual a tempProfile
    if (editMode) {
      setTempProfile({ ...userProfile });
    }
  }, [editMode, userProfile]);

  // --- Funciones de Gestión de Perfil ---
  const handleEditProfileToggle = () => {
    setEditMode(prev => !prev);
    if (editMode) { // Si se está saliendo del modo edición sin guardar
      setTempProfile({}); // Limpiar tempProfile
    }
  };

  const handleTempProfileChange = (e) => {
    const { name, value } = e.target;
    setTempProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setUserProfile(prev => ({ ...prev, ...tempProfile }));
    setEditMode(false);
    showSnackbar('Perfil actualizado con éxito.', 'success');
  };

  // --- Funciones de Seguridad ---
  const handleChangePassword = () => {
    if (passwordFields.new !== passwordFields.confirmNew) {
      showSnackbar('Las nuevas contraseñas no coinciden.', 'error');
      return;
    }
    // Lógica para validar la contraseña actual y actualizar en el backend
    // Aquí solo simulamos el éxito
    showSnackbar('Contraseña cambiada con éxito.', 'success');
    setOpenChangePasswordDialog(false);
    setPasswordFields({ current: '', new: '', confirmNew: '' });
    // Actualizar la fecha del último cambio de contraseña
    setUserProfile(prev => ({
      ...prev,
      securitySettings: {
        ...prev.securitySettings,
        passwordLastChanged: new Date().toISOString().split('T')[0],
      }
    }));
  };

  const handleMfaToggle = () => {
    setUserProfile(prev => ({ ...prev, mfaEnabled: !prev.mfaEnabled }));
    showSnackbar(`MFA ${userProfile.mfaEnabled ? 'desactivado' : 'activado'}.`, userProfile.mfaEnabled ? 'warning' : 'success');
  };

  const handleTerminateSession = (sessionId) => {
    if (window.confirm('¿Estás seguro de que quieres terminar esta sesión?')) {
      setUserProfile(prev => ({
        ...prev,
        securitySettings: {
          ...prev.securitySettings,
          recentLogins: prev.securitySettings.recentLogins.filter(s => s.id !== sessionId)
        }
      }));
      showSnackbar('Sesión terminada con éxito.', 'warning');
    }
  };

  // --- Funciones de Notificaciones ---
  const handleNotificationPreferenceChange = (event) => {
    const { name, checked } = event.target;
    setUserProfile(prev => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [name]: checked,
      },
    }));
    showSnackbar('Preferencias de notificación actualizadas.', 'success');
  };

  // --- Funciones de Personalización ---
  const handleThemeChange = (event) => {
    setUserProfile(prev => ({ ...prev, theme: event.target.value }));
    showSnackbar('Tema actualizado.', 'success');
  };

  const handleLanguageChange = (event) => {
    setUserProfile(prev => ({ ...prev, language: event.target.value }));
    showSnackbar('Idioma actualizado.', 'success');
  };


  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f7fa', minHeight: '100vh', color: '#333', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#004a8f', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2, color: '#ffffff' }}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}
          <AccountCircleIcon sx={{ fontSize: 36, mr: 1, color: '#ffffff' }} /> {/* Azul principal para Perfil */}
          <Typography variant="h3" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Mi Perfil y Personalización
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            sx={{ textTransform: 'none', color: '#fff' }}
            onClick={handleSaveProfile}
            disabled={!editMode}
          >
            Guardar Todos los Cambios
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#004a8f' }}>
            Gestiona tu Cuenta y Experiencia
          </Typography>
          <Typography variant="h6" color="#616161">
            Personaliza tu perfil, configura tus preferencias y revisa tu actividad.
          </Typography>
        </Box>

        {/* Sección de Resumen del Perfil */}
        <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: 2 }}>
          <Box display="flex" alignItems="center" flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <IconButton
                  color="primary"
                  sx={{
                    bgcolor: 'white',
                    border: '1px solid #e0e0e0',
                    '&:hover': { bgcolor: '#f0f0f0' },
                  }}
                  onClick={() => showSnackbar('Funcionalidad de subir foto de perfil.', 'info')}
                >
                  <PhotoCameraIcon />
                </IconButton>
              }
            >
              <Avatar
                alt={`${userProfile.firstName} ${userProfile.lastName}`}
                src={userProfile.avatarUrl}
                sx={{ width: 120, height: 120, border: '3px solid #2196f3' }}
              />
            </Badge>
            <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 1, color: '#333' }}>
                {userProfile.firstName} {userProfile.lastName}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                <WorkIcon sx={{ verticalAlign: 'middle', mr: 0.5, fontSize: 20 }} /> {userProfile.jobTitle} en {userProfile.department}
              </Typography>
              <Box display="flex" alignItems="center" justifyContent={{ xs: 'center', md: 'flex-start' }} gap={2} sx={{ mt: 1 }}>
                <Chip label={userProfile.role} icon={<SecurityIcon />} color="primary" variant="outlined" size="small" />
                {userProfile.groups.map(group => (
                  <Chip key={group} label={group} icon={<GroupIcon />} color="default" variant="outlined" size="small" />
                ))}
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Último inicio de sesión: {userProfile.lastLogin}
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<LogoutIcon />}
              color="error"
              sx={{ textTransform: 'none', minWidth: { xs: '80%', md: 'auto' } }}
              onClick={() => showSnackbar('Funcionalidad de cerrar sesión.', 'info')}
            >
              Cerrar Sesión
            </Button>
          </Box>
        </Paper>

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
                backgroundColor: '#004a8f', // Azul para la barra de la pestaña activa
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                '&.Mui-selected': {
                  color: '#004a8f', // Color del texto de la pestaña activa
                },
              },
            }}
          >
            <Tab label="Información Personal" value="profile" icon={<AccountCircleIcon />} iconPosition="start" />
            <Tab label="Seguridad y Acceso" value="security" icon={<VpnKeyIcon />} iconPosition="start" />
            <Tab label="Notificaciones" value="notifications" icon={<NotificationsIcon />} iconPosition="start" />
            <Tab label="Personalización" value="personalization" icon={<PaletteIcon />} iconPosition="start" />
            <Tab label="Registro de Actividad" value="activity" icon={<EventNoteIcon />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Contenido de las Pestañas */}
        <Box sx={{ p: 0 }}>
          {/* Tab: Información Personal Editable */}
          {currentTab === 'profile' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <AccountCircleIcon sx={{ color: '#2196f3', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Detalles de tu Perfil
                </Typography>
                <Button
                  variant="contained"
                  startIcon={editMode ? <CancelIcon /> : <EditIcon />}
                  onClick={handleEditProfileToggle}
                  color={editMode ? 'secondary' : 'primary'}
                  sx={{ textTransform: 'none' }}
                >
                  {editMode ? 'Cancelar Edición' : 'Editar Información'}
                </Button>
                {editMode && (
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveProfile}
                    sx={{ ml: 2, textTransform: 'none', bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}
                  >
                    Guardar Cambios
                  </Button>
                )}
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    name="firstName"
                    value={editMode ? tempProfile.firstName : userProfile.firstName}
                    onChange={handleTempProfileChange}
                    disabled={!editMode}
                    variant="outlined"
                    margin="normal"
                    InputProps={{ startAdornment: <InputAdornment position="start"><AccountCircleIcon /></InputAdornment> }}
                  />
                  <TextField
                    fullWidth
                    label="Apellido"
                    name="lastName"
                    value={editMode ? tempProfile.lastName : userProfile.lastName}
                    onChange={handleTempProfileChange}
                    disabled={!editMode}
                    variant="outlined"
                    margin="normal"
                    InputProps={{ startAdornment: <InputAdornment position="start"><AccountCircleIcon /></InputAdornment> }}
                  />
                  <TextField
                    fullWidth
                    label="Correo Electrónico"
                    name="email"
                    value={editMode ? tempProfile.email : userProfile.email}
                    onChange={handleTempProfileChange}
                    disabled={!editMode}
                    variant="outlined"
                    margin="normal"
                    InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }}
                  />
                  <TextField
                    fullWidth
                    label="Número de Teléfono"
                    name="phone"
                    value={editMode ? tempProfile.phone : userProfile.phone}
                    onChange={handleTempProfileChange}
                    disabled={!editMode}
                    variant="outlined"
                    margin="normal"
                    InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Dirección"
                    name="address"
                    value={editMode ? tempProfile.address : userProfile.address}
                    onChange={handleTempProfileChange}
                    disabled={!editMode}
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={2}
                    InputProps={{ startAdornment: <InputAdornment position="start"><LocationOnIcon /></InputAdornment> }}
                  />
                  <TextField
                    fullWidth
                    label="Fecha de Nacimiento"
                    name="birthDate"
                    type="date"
                    value={editMode ? tempProfile.birthDate : userProfile.birthDate}
                    onChange={handleTempProfileChange}
                    disabled={!editMode}
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ startAdornment: <InputAdornment position="start"><CakeIcon /></InputAdornment> }}
                  />
                  <TextField
                    fullWidth
                    label="Puesto / Cargo"
                    name="jobTitle"
                    value={editMode ? tempProfile.jobTitle : userProfile.jobTitle}
                    onChange={handleTempProfileChange}
                    disabled={!editMode}
                    variant="outlined"
                    margin="normal"
                    InputProps={{ startAdornment: <InputAdornment position="start"><WorkIcon /></InputAdornment> }}
                  />
                  <TextField
                    fullWidth
                    label="Departamento"
                    name="department"
                    value={editMode ? tempProfile.department : userProfile.department}
                    onChange={handleTempProfileChange}
                    disabled={!editMode}
                    variant="outlined"
                    margin="normal"
                    InputProps={{ startAdornment: <InputAdornment position="start"><GroupIcon /></InputAdornment> }}
                  />
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* Tab: Seguridad y Acceso */}
          {currentTab === 'security' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <VpnKeyIcon sx={{ color: '#ff9800', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Configuración de Seguridad y Acceso
                </Typography>
                <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ textTransform: 'none' }}>
                  Actualizar Estado de Seguridad
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ p: 2, height: '100%', borderLeft: '5px solid #ff9800' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Cambiar Contraseña
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Último cambio de contraseña: {userProfile.securitySettings.passwordLastChanged}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<VpnKeyIcon />}
                      onClick={() => setOpenChangePasswordDialog(true)}
                      sx={{ textTransform: 'none', bgcolor: '#3f51b5', '&:hover': { bgcolor: '#303f9f' } }}
                    >
                      Modificar Contraseña
                    </Button>
                    {userProfile.securitySettings.passwordLastChanged && (
                      <Alert severity="warning" sx={{ mt: 2 }}>
                        Considera cambiar tu contraseña regularmente para mayor seguridad.
                      </Alert>
                    )}
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ p: 2, height: '100%', borderLeft: `5px solid ${userProfile.mfaEnabled ? '#4caf50' : '#f44336'}` }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      Autenticación de Dos Factores (MFA)
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={userProfile.mfaEnabled}
                          onChange={handleMfaToggle}
                          color="primary"
                        />
                      }
                      label={userProfile.mfaEnabled ? 'MFA Habilitado' : 'MFA Deshabilitado'}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Añade una capa extra de seguridad a tu cuenta.
                    </Typography>
                    {userProfile.mfaEnabled ? (
                      <Alert severity="success">
                        Tu cuenta está protegida con MFA.
                      </Alert>
                    ) : (
                      <Alert severity="error">
                        MFA no está habilitado. Tu cuenta podría ser vulnerable.
                      </Alert>
                    )}
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card variant="outlined" sx={{ p: 3, borderLeft: '5px solid #2196f3' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Actividad de Inicio de Sesión Reciente
                    </Typography>
                    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 300 }}>
                      <Table stickyHeader size="small">
                        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Hora</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Dispositivo</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>IP</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Ubicación</TableCell>
                            <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Acción</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {userProfile.securitySettings.recentLogins.length > 0 ? (
                            userProfile.securitySettings.recentLogins.map((login) => (
                              <TableRow key={login.id}>
                                <TableCell><Box display="flex" alignItems="center"><LoginIcon sx={{ mr: 0.5, fontSize: 18 }} />{login.timestamp.split(' ')[1]}</Box></TableCell>
                                <TableCell><Box display="flex" alignItems="center"><DevicesIcon sx={{ mr: 0.5, fontSize: 18 }} />{login.device}</Box></TableCell>
                                <TableCell>{login.ip}</TableCell>
                                <TableCell>{login.location}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                  <Tooltip title="Terminar esta Sesión">
                                    <IconButton size="small" onClick={() => handleTerminateSession(login.id)}>
                                      <LogoutIcon color="error" />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow><TableCell colSpan={5} sx={{ textAlign: 'center', color: 'text.secondary' }}>No hay registros de inicio de sesión recientes.</TableCell></TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      Intentos de inicio de sesión fallidos (últimas 24h): {userProfile.securitySettings.failedLoginAttemptsLast24h}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* Tab: Notificaciones */}
          {currentTab === 'notifications' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <NotificationsIcon sx={{ color: '#4caf50', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Preferencias de Notificación
                </Typography>
                <Button variant="contained" startIcon={<SaveIcon />} sx={{ textTransform: 'none', bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}>
                  Guardar Preferencias
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Typography variant="h6" sx={{ mb: 2 }}>
                Recibir Notificaciones Por:
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={userProfile.notificationPreferences.emailUpdates}
                      onChange={handleNotificationPreferenceChange}
                      name="emailUpdates"
                      color="primary"
                    />
                  }
                  label={<Typography variant="body1">Actualizaciones por Correo Electrónico</Typography>}
                />
                <Typography variant="caption" color="text.secondary" sx={{ ml: 4, mb: 1 }}>
                  Notificaciones importantes, resúmenes y alertas vía email.
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={userProfile.notificationPreferences.smsAlerts}
                      onChange={handleNotificationPreferenceChange}
                      name="smsAlerts"
                      color="primary"
                    />
                  }
                  label={<Typography variant="body1">Alertas SMS (solo críticas)</Typography>}
                />
                <Typography variant="caption" color="text.secondary" sx={{ ml: 4, mb: 1 }}>
                  Solo para alertas de seguridad o disponibilidad crítica del servicio.
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={userProfile.notificationPreferences.pushNotifications}
                      onChange={handleNotificationPreferenceChange}
                      name="pushNotifications"
                      color="primary"
                    />
                  }
                  label={<Typography variant="body1">Notificaciones Push (en el navegador/app)</Typography>}
                />
                <Typography variant="caption" color="text.secondary" sx={{ ml: 4, mb: 1 }}>
                  Alertas en tiempo real directamente en tu navegador o aplicación móvil.
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={userProfile.notificationPreferences.newsletter}
                      onChange={handleNotificationPreferenceChange}
                      name="newsletter"
                      color="primary"
                    />
                  }
                  label={<Typography variant="body1">Boletín Informativo y Ofertas</Typography>}
                />
                <Typography variant="caption" color="text.secondary" sx={{ ml: 4, mb: 1 }}>
                  Mantente informado sobre nuevas características, consejos y promociones.
                </Typography>
              </FormGroup>

              <Alert severity="info" sx={{ mt: 3 }}>
                Algunas notificaciones críticas de seguridad no se pueden desactivar.
              </Alert>
            </Paper>
          )}

          {/* Tab: Personalización */}
          {currentTab === 'personalization' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <PaletteIcon sx={{ color: '#9c27b0', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Opciones de Personalización
                </Typography>
                <Button variant="contained" startIcon={<SaveIcon />} sx={{ textTransform: 'none', bgcolor: '#9c27b0', '&:hover': { bgcolor: '#7b1fa2' } }}>
                  Guardar Preferencias
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Tema de la Interfaz</InputLabel>
                    <Select
                      value={userProfile.theme}
                      label="Tema de la Interfaz"
                      onChange={handleThemeChange}
                    >
                      <MenuItem value="light">Claro (Predeterminado)</MenuItem>
                      <MenuItem value="dark">Oscuro</MenuItem>
                      <MenuItem value="system">Basado en el Sistema</MenuItem>
                    </Select>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                      Cambia el esquema de colores de la aplicación.
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Idioma de la Aplicación</InputLabel>
                    <Select
                      value={userProfile.language}
                      label="Idioma de la Aplicación"
                      onChange={handleLanguageChange}
                    >
                      <MenuItem value="es-CO">Español (Colombia)</MenuItem>
                      <MenuItem value="en-US">English (United States)</MenuItem>
                      <MenuItem value="fr-FR">Français (France)</MenuItem>
                    </Select>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                      Selecciona el idioma preferido para la interfaz.
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Card variant="outlined" sx={{ p: 2, bgcolor: '#e3f2fd', borderLeft: '5px solid #2196f3' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      Ajustes Avanzados de Interfaz
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={true} // Simulado
                          onChange={() => showSnackbar('Funcionalidad de animaciones.', 'info')}
                          color="primary"
                        />
                      }
                      label="Habilitar animaciones de interfaz"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={false} // Simulado
                          onChange={() => showSnackbar('Funcionalidad de modo compacto.', 'info')}
                          color="primary"
                        />
                      }
                      label="Habilitar modo de visualización compacto"
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      Estas opciones pueden mejorar el rendimiento en dispositivos más lentos.
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* Tab: Registro de Actividad */}
          {currentTab === 'activity' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <EventNoteIcon sx={{ color: '#616161', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Tu Registro de Actividad Reciente
                </Typography>
                <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ textTransform: 'none' }}>
                  Cargar Más Actividad
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <List sx={{ maxHeight: 500, overflowY: 'auto', border: '1px solid #e0e0e0', borderRadius: 1, bgcolor: '#fafafa' }}>
                {userProfile.activityLog.length > 0 ? (
                  userProfile.activityLog.map((log) => (
                    <ListItem key={log.id} sx={{ borderBottom: '1px solid #eee' }}>
                      <ListItemIcon>
                        <AccessTimeIcon sx={{ color: '#616161' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {log.event}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary">
                            {log.timestamp}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No hay actividad reciente para mostrar." sx={{ textAlign: 'center', color: 'text.secondary' }} />
                  </ListItem>
                )}
              </List>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                Esto muestra tus interacciones recientes con el sistema.
              </Typography>
            </Paper>
          )}
        </Box>
      </Container>

      {/* Dialog para Cambiar Contraseña */}
      <Dialog open={openChangePasswordDialog} onClose={() => setOpenChangePasswordDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>
          Cambiar Contraseña
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            margin="dense"
            label="Contraseña Actual"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            value={passwordFields.current}
            onChange={(e) => setPasswordFields(prev => ({ ...prev, current: e.target.value }))}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            label="Nueva Contraseña"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            value={passwordFields.new}
            onChange={(e) => setPasswordFields(prev => ({ ...prev, new: e.target.value }))}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            label="Confirmar Nueva Contraseña"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            value={passwordFields.confirmNew}
            onChange={(e) => setPasswordFields(prev => ({ ...prev, confirmNew: e.target.value }))}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenChangePasswordDialog(false)} color="secondary">Cancelar</Button>
          <Button onClick={handleChangePassword} variant="contained" color="primary">
            Confirmar Cambio
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

export default UserProfilePanel;