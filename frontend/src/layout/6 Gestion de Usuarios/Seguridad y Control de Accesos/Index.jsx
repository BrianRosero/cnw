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
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import SecurityIcon from '@mui/icons-material/Security'; // Icono principal de Seguridad
import LockOpenIcon from '@mui/icons-material/LockOpen'; // Autenticación/Acceso
import DnsIcon from '@mui/icons-material/Dns'; // Bloqueo por IP
import HubIcon from '@mui/icons-material/Hub'; // Autenticación Externa
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'; // MFA
import AuditIcon from '@mui/icons-material/AssignmentTurnedIn'; // Auditoría
import ComputerIcon from '@mui/icons-material/Computer'; // Dispositivos/Sesiones
import EventNoteIcon from '@mui/icons-material/EventNote'; // Logs/Actividad
import RefreshIcon from '@mui/icons-material/Refresh'; // Actualizar
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Añadir
import DeleteIcon from '@mui/icons-material/Delete'; // Eliminar
import EditIcon from '@mui/icons-material/Edit'; // Editar
import SettingsIcon from '@mui/icons-material/Settings'; // Configuración
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Éxito
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Error
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Advertencia
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Acordeón
import BlockIcon from '@mui/icons-material/Block'; // Bloquear
import FingerprintIcon from '@mui/icons-material/Fingerprint'; // Biometría/MFA
import PublicIcon from '@mui/icons-material/Public'; // IPs
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Usuario
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Tiempo
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search'; // Detalle log

// --- Datos Simulados ---

const securityOverview = {
  lastSecurityScan: '2025-06-11 23:00:00 -05',
  pendingSecurityActions: 3,
  failedLoginAttempts24h: 87,
  activeSessions: 125,
  blockedIPs: 12,
  mfaEnabledUsers: '75%',
};

const mfaSettings = {
  globalMfaEnabled: true,
  requiredForRoles: ['Administrador', 'Finanzas'],
  availableMethods: ['Authenticator App', 'SMS OTP', 'Email OTP'],
  defaultMethod: 'Authenticator App',
  mfaExemptIPs: ['192.168.1.10', '10.0.0.5'], // IPs que no requieren MFA
};

const ipBlacklist = [
  { id: 'IP-001', ipAddress: '185.199.108.153', reason: 'Intentos de login fallidos excesivos', addedBy: 'Sistema Automático', dateAdded: '2025-06-10 08:45' },
  { id: 'IP-002', ipAddress: '203.0.113.45', reason: 'Tráfico sospechoso detectado', addedBy: 'Administrador', dateAdded: '2025-06-09 16:20' },
  { id: 'IP-003', ipAddress: '104.244.42.129', reason: 'Ataque de fuerza bruta', addedBy: 'Sistema Automático', dateAdded: '2025-06-08 21:00' },
];

const externalAuthProviders = [
  { id: 'EA-001', name: 'Azure Active Directory', type: 'OAuth 2.0', status: 'Activo', lastSync: '2025-06-11 22:00', usersSynced: 500, enabled: true },
  { id: 'EA-002', name: 'Google Workspace', type: 'SAML', status: 'Activo', lastSync: '2025-06-11 22:30', usersSynced: 300, enabled: true },
  { id: 'EA-003', name: 'Okta', type: 'OpenID Connect', status: 'Inactivo', lastSync: 'N/A', usersSynced: 0, enabled: false },
];

const auditLogs = [
  { id: 'AL-001', timestamp: '2025-06-11 23:05:10 -05', user: 'Juan Pérez', event: 'Inicio de sesión exitoso', ip: '192.168.1.101', device: 'Desktop - Chrome', status: 'Éxito' },
  { id: 'AL-002', timestamp: '2025-06-11 23:04:45 -05', user: 'Maria García', event: 'Intento de acceso a recurso no autorizado (Facturas)', ip: '172.16.0.25', device: 'Mobile - Safari', status: 'Fallido' },
  { id: 'AL-003', timestamp: '2025-06-11 23:03:20 -05', user: 'Carlos López', event: 'Actualización de perfil de usuario', ip: '203.0.113.12', device: 'Desktop - Firefox', status: 'Éxito' },
  { id: 'AL-004', timestamp: '2025-06-11 23:02:15 -05', user: 'Invitado', event: 'Intento de login con credenciales inválidas', ip: '185.199.108.153', device: 'Desktop - Edge', status: 'Fallido' },
  { id: 'AL-005', timestamp: '2025-06-11 23:01:00 -05', user: 'Sistema Automático', event: 'Ejecución de tarea programada (Resumen Mensual)', ip: 'N/A', device: 'Servidor', status: 'Éxito' },
  { id: 'AL-006', timestamp: '2025-06-11 22:58:30 -05', user: 'Ana Rodríguez', event: 'Inicio de sesión desde nuevo dispositivo', ip: '10.0.0.50', device: 'Laptop - Chrome', status: 'Éxito - Alerta' },
];

const activeSessions = [
  { id: 'S-001', user: 'Juan Pérez', device: 'Desktop - Chrome', ip: '192.168.1.101', loginTime: '2025-06-11 10:30', lastActivity: '2025-06-11 23:05', status: 'Activa' },
  { id: 'S-002', user: 'Maria García', device: 'Mobile - Safari', ip: '172.16.0.25', loginTime: '2025-06-11 09:15', lastActivity: '2025-06-11 23:04', status: 'Activa' },
  { id: 'S-003', user: 'Ana Rodríguez', device: 'Laptop - Chrome', ip: '10.0.0.50', loginTime: '2025-06-11 11:00', lastActivity: '2025-06-11 23:01', status: 'Activa' },
];


function SecurityControlPanel({ onGoToHome }) {
  const [currentTab, setCurrentTab] = useState('overview'); // 'overview', 'authentication', 'ip_management', 'external_auth', 'audit_logs', 'user_activity'
  const [mfaSettingsState, setMfaSettingsState] = useState(mfaSettings);
  const [ipBlacklistState, setIpBlacklistState] = useState(ipBlacklist);
  const [externalAuthProvidersState, setExternalAuthProvidersState] = useState(externalAuthProviders);
  const [auditLogsState, setAuditLogsState] = useState(auditLogs);
  const [activeSessionsState, setActiveSessionsState] = useState(activeSessions);


  const [openIpDialog, setOpenIpDialog] = useState(false);
  const [currentIp, setCurrentIp] = useState(null); // for add/edit IP

  const [openExternalAuthDialog, setOpenExternalAuthDialog] = useState(false);
  const [currentExternalAuthProvider, setCurrentExternalAuthProvider] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const showSnackbar = useCallback((message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  // --- Funciones de Gestión de MFA ---
  const handleMfaSettingChange = (event) => {
    const { name, value, checked, type } = event.target;
    setMfaSettingsState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    showSnackbar('Configuración de MFA actualizada.', 'success');
  };

  const handleMfaRequiredRolesChange = (event) => {
    const {
      target: { value },
    } = event;
    setMfaSettingsState(prev => ({
      ...prev,
      requiredForRoles: typeof value === 'string' ? value.split(',') : value,
    }));
    showSnackbar('Roles para MFA actualizados.', 'success');
  };

  // --- Funciones de Gestión de IPs ---
  const handleAddEditIp = (ip = null) => {
    setCurrentIp(ip);
    setOpenIpDialog(true);
  };

  const handleSaveIp = (formData) => {
    if (currentIp) {
      setIpBlacklistState(ipBlacklistState.map(i => i.id === currentIp.id ? { ...i, ...formData } : i));
      showSnackbar('Dirección IP actualizada.', 'success');
    } else {
      const newIp = { id: `IP-${(ipBlacklistState.length + 1).toString().padStart(3, '0')}`, dateAdded: new Date().toLocaleString('es-CO'), addedBy: 'Administrador', ...formData };
      setIpBlacklistState([...ipBlacklistState, newIp]);
      showSnackbar('Dirección IP bloqueada.', 'success');
    }
    setOpenIpDialog(false);
  };

  const handleDeleteIp = (id) => {
    if (window.confirm('¿Estás seguro de que quieres desbloquear esta dirección IP?')) {
      setIpBlacklistState(ipBlacklistState.filter(i => i.id !== id));
      showSnackbar('Dirección IP desbloqueada.', 'info');
    }
  };

  // --- Funciones de Gestión de Autenticación Externa ---
  const handleAddEditExternalAuthProvider = (provider = null) => {
    setCurrentExternalAuthProvider(provider);
    setOpenExternalAuthDialog(true);
  };

  const handleSaveExternalAuthProvider = (formData) => {
    if (currentExternalAuthProvider) {
      setExternalAuthProvidersState(externalAuthProvidersState.map(p => p.id === currentExternalAuthProvider.id ? { ...p, ...formData } : p));
      showSnackbar('Proveedor de autenticación externa actualizado.', 'success');
    } else {
      const newProvider = { id: `EA-${(externalAuthProvidersState.length + 1).toString().padStart(3, '0')}`, status: 'Inactivo', lastSync: 'N/A', usersSynced: 0, ...formData };
      setExternalAuthProvidersState([...externalAuthProvidersState, newProvider]);
      showSnackbar('Nuevo proveedor de autenticación externa añadido.', 'success');
    }
    setOpenExternalAuthDialog(false);
  };

  const handleDeleteExternalAuthProvider = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este proveedor de autenticación externa?')) {
      setExternalAuthProvidersState(externalAuthProvidersState.filter(p => p.id !== id));
      showSnackbar('Proveedor de autenticación externa eliminado.', 'info');
    }
  };

  const handleToggleExternalAuthProvider = (id) => {
    setExternalAuthProvidersState(externalAuthProvidersState.map(p => p.id === id ? { ...p, enabled: !p.enabled, status: p.enabled ? 'Inactivo' : 'Activo' } : p));
    showSnackbar('Estado del proveedor de autenticación externa actualizado.', 'info');
  };

  // --- Funciones de Auditoría y Actividad ---
  const handleTerminateSession = (sessionId) => {
    if (window.confirm('¿Estás seguro de que quieres terminar esta sesión? El usuario será desconectado.')) {
      setActiveSessionsState(activeSessionsState.filter(s => s.id !== sessionId));
      showSnackbar('Sesión terminada con éxito.', 'warning');
    }
  };


  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', minHeight: '100vh', color: '#333', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#004a8f', borderBottom: '1px solid #424242' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2, color: '#f5f5f5' }}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}
          <SecurityIcon sx={{ fontSize: 36, mr: 1, color: '#4dd0e1' }} /> {/* Azul claro para Seguridad */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#f5f5f5' }}>
            Panel de Seguridad y Acceso
          </Typography>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            sx={{ textTransform: 'none', bgcolor: '#424242', color: '#f5f5f5', '&:hover': { bgcolor: '#616161' } }}
          >
            Refrescar Datos
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#004a8f' }}>
            Protege tus Sistemas y Datos
          </Typography>
          <Typography variant="h6" color="#616161">
            Gestiona la autenticación, monitorea accesos y audita la actividad para una seguridad robusta.
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
                backgroundColor: '#004a8f',
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                '&.Mui-selected': {
                  color: '#004a8f',
                },
              },
            }}
          >
            <Tab label="Visión General" value="overview" icon={<SecurityIcon />} iconPosition="start" />
            <Tab label="Autenticación MFA" value="authentication" icon={<VerifiedUserIcon />} iconPosition="start" />
            <Tab label="Bloqueo por IP" value="ip_management" icon={<DnsIcon />} iconPosition="start" />
            <Tab label="Autenticación Externa" value="external_auth" icon={<HubIcon />} iconPosition="start" />
            <Tab label="Auditoría de Accesos" value="audit_logs" icon={<AuditIcon />} iconPosition="start" />
            <Tab label="Actividad por Usuario" value="user_activity" icon={<EventNoteIcon />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Contenido de las Pestañas */}
        <Box sx={{ p: 0 }}>
          {/* Tab: Visión General de Seguridad */}
          {currentTab === 'overview' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <SecurityIcon sx={{ color: '#4dd0e1', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Estado General de Seguridad
                </Typography>
                <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ textTransform: 'none' }}>
                  Realizar Escaneo Rápido
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9', borderLeft: '5px solid #4caf50' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      {securityOverview.lastSecurityScan ? 'Al día' : 'Pendiente'}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Último Escaneo de Seguridad</Typography>
                    <Typography variant="body2" color="text.secondary">{securityOverview.lastSecurityScan || 'N/A'}</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: securityOverview.failedLoginAttempts24h > 50 ? '#ffebee' : '#e3f2fd', borderLeft: `5px solid ${securityOverview.failedLoginAttempts24h > 50 ? '#d32f2f' : '#2196f3'}` }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      {securityOverview.failedLoginAttempts24h}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Intentos de Login Fallidos (24h)</Typography>
                    {securityOverview.failedLoginAttempts24h > 50 && <Chip label="Alerta de Seguridad" color="error" size="small" sx={{ mt: 1 }} />}
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#fffde7', borderLeft: '5px solid #ffeb3b' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      {securityOverview.pendingSecurityActions}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Acciones de Seguridad Pendientes</Typography>
                    {securityOverview.pendingSecurityActions > 0 && <Chip label="Requiere Atención" color="warning" size="small" sx={{ mt: 1 }} />}
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ p: 2, bgcolor: '#e0f2f7', borderLeft: '5px solid #4dd0e1' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>
                      Sesiones Activas
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <ComputerIcon sx={{ fontSize: 40, color: '#4dd0e1', mr: 2 }} />
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#333' }}>
                          {securityOverview.activeSessions}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Sesiones de usuario concurrentes.
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ p: 2, bgcolor: '#e1f5fe', borderLeft: '5px solid #29b6f6' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>
                      Usuarios con MFA Activo
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <FingerprintIcon sx={{ fontSize: 40, color: '#29b6f6', mr: 2 }} />
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#333' }}>
                          {securityOverview.mfaEnabledUsers}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Porcentaje de usuarios con autenticación multifactor.
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* Tab: Seguridad y Autenticación MFA */}
          {currentTab === 'authentication' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <VerifiedUserIcon sx={{ color: '#4dd0e1', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Configuración de Autenticación Multifactor (MFA)
                </Typography>
                <Button variant="contained" startIcon={<SettingsIcon />} sx={{ textTransform: 'none', bgcolor: '#3f51b5', '&:hover': { bgcolor: '#303f9f' } }}>
                  Guardar Configuración
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={mfaSettingsState.globalMfaEnabled}
                        onChange={handleMfaSettingChange}
                        name="globalMfaEnabled"
                        color="primary"
                      />
                    }
                    label={<Typography variant="h6" sx={{ fontWeight: 600 }}>Habilitar MFA Globalmente</Typography>}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                    Al habilitar esta opción, todos los usuarios (excepto los roles exentos) deberán usar MFA.
                  </Typography>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Método MFA Predeterminado</InputLabel>
                    <Select
                      name="defaultMethod"
                      value={mfaSettingsState.defaultMethod}
                      label="Método MFA Predeterminado"
                      onChange={handleMfaSettingChange}
                    >
                      {mfaSettingsState.availableMethods.map(method => (
                        <MenuItem key={method} value={method}>{method}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Roles que Requieren MFA</InputLabel>
                    <Select
                      multiple
                      name="requiredForRoles"
                      value={mfaSettingsState.requiredForRoles}
                      onChange={handleMfaRequiredRolesChange}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} size="small" color="primary" />
                          ))}
                        </Box>
                      )}
                    >
                      {['Administrador', 'Finanzas', 'Ventas', 'Marketing', 'Lector', 'Editor'].map((role) => ( // Simulated roles
                        <MenuItem key={role} value={role}>
                          <Checkbox checked={mfaSettingsState.requiredForRoles.indexOf(role) > -1} />
                          <ListItemText primary={role} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    IPs Exentas de MFA (Red Segura)
                  </Typography>
                  <List dense sx={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #e0e0e0', borderRadius: 1, bgcolor: '#fafafa' }}>
                    {mfaSettingsState.mfaExemptIPs.length > 0 ? (
                      mfaSettingsState.mfaExemptIPs.map((ip, index) => (
                        <ListItem key={index} secondaryAction={
                          <IconButton edge="end" aria-label="delete" onClick={() => {
                            setMfaSettingsState(prev => ({ ...prev, mfaExemptIPs: prev.mfaExemptIPs.filter(i => i !== ip) }));
                            showSnackbar(`IP ${ip} eliminada de exenciones.`, 'info');
                          }}>
                            <DeleteIcon sx={{ color: '#f44336' }} />
                          </IconButton>
                        }>
                          <ListItemIcon><PublicIcon sx={{ color: '#616161' }} /></ListItemIcon>
                          <ListItemText primary={ip} />
                        </ListItem>
                      ))
                    ) : (
                      <ListItem><ListItemText primary="No hay IPs exentas de MFA configuradas." sx={{ color: 'text.secondary' }} /></ListItem>
                    )}
                  </List>
                  <TextField
                    fullWidth
                    label="Añadir IP a exención MFA"
                    variant="outlined"
                    size="small"
                    sx={{ mt: 2 }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim() !== '') {
                        const newIp = e.target.value.trim();
                        if (!mfaSettingsState.mfaExemptIPs.includes(newIp)) {
                          setMfaSettingsState(prev => ({ ...prev, mfaExemptIPs: [...prev.mfaExemptIPs, newIp] }));
                          showSnackbar(`IP ${newIp} añadida a exenciones.`, 'success');
                          e.target.value = '';
                        } else {
                          showSnackbar('La IP ya está en la lista de exenciones.', 'warning');
                        }
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* Tab: Bloqueo por IP */}
          {currentTab === 'ip_management' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <DnsIcon sx={{ color: '#ef5350', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Gestión de Bloqueos por IP
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => handleAddEditIp(null)} sx={{ textTransform: 'none', bgcolor: '#f44336', '&:hover': { bgcolor: '#d32f2f' } }}>
                  Añadir IP a Blacklist
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 400 }}>
                <Table stickyHeader size="medium">
                  <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, width: '20%' }}>Dirección IP</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '40%' }}>Razón del Bloqueo</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '20%' }}>Añadido Por</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '15%' }}>Fecha</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '5%', textAlign: 'center' }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ipBlacklistState.map((ip) => (
                      <TableRow key={ip.id}>
                        <TableCell><Chip label={ip.ipAddress} size="small" color="error" icon={<PublicIcon />} /></TableCell>
                        <TableCell>{ip.reason}</TableCell>
                        <TableCell>{ip.addedBy}</TableCell>
                        <TableCell>{ip.dateAdded}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Tooltip title="Desbloquear IP">
                            <IconButton size="small" onClick={() => handleDeleteIp(ip.id)}>
                              <LockOpenIcon color="success" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                Total de IPs bloqueadas: {ipBlacklistState.length}
              </Typography>
            </Paper>
          )}

          {/* Tab: Autenticación Externa */}
          {currentTab === 'external_auth' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <HubIcon sx={{ color: '#8d6e63', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Configuración de Proveedores de Autenticación Externa
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => handleAddEditExternalAuthProvider(null)} sx={{ textTransform: 'none', bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}>
                  Añadir Proveedor
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={3}>
                {externalAuthProvidersState.map((provider) => (
                  <Grid item xs={12} md={6} key={provider.id}>
                    <Card elevation={2} sx={{ p: 2, height: '100%', borderLeft: `5px solid ${provider.enabled ? '#4caf50' : '#bdbdbd'}` }}>
                      <Box display="flex" alignItems="center" mb={1}>
                        <Avatar sx={{ bgcolor: provider.enabled ? '#4caf50' : '#bdbdbd', mr: 1 }}>{provider.name[0]}</Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
                          {provider.name}
                        </Typography>
                        <Chip label={provider.status} size="small" color={provider.enabled ? 'success' : 'default'} />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Tipo: {provider.type} | Usuarios Sincronizados: {provider.usersSynced}
                      </Typography>
                      <Typography variant="body1" color="#616161" sx={{ mb: 2 }}>
                        Última Sincronización: {provider.lastSync}
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={provider.enabled}
                            onChange={() => handleToggleExternalAuthProvider(provider.id)}
                            color="primary"
                          />
                        }
                        label="Habilitado"
                      />
                      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        <Button variant="outlined" size="small" sx={{ textTransform: 'none' }} onClick={() => handleAddEditExternalAuthProvider(provider)}>Editar</Button>
                        <Button variant="contained" size="small" sx={{ textTransform: 'none', bgcolor: '#f44336', '&:hover': { bgcolor: '#d32f2f' } }} onClick={() => handleDeleteExternalAuthProvider(provider.id)}>Eliminar</Button>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}

          {/* Tab: Auditoría de Accesos - Registro de sesiones y dispositivos */}
          {currentTab === 'audit_logs' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <AuditIcon sx={{ color: '#26a69a', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Registro de Sesiones y Dispositivos
                </Typography>
                <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ textTransform: 'none' }}>
                  Cargar Logs Recientes
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Accordion defaultExpanded sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Sesiones de Usuario Activas</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 300 }}>
                    <Table stickyHeader size="small">
                      <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700 }}>Usuario</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Dispositivo</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>IP</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Hora Login</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Última Actividad</TableCell>
                          <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Acción</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {activeSessionsState.map((session) => (
                          <TableRow key={session.id}>
                            <TableCell><Box display="flex" alignItems="center"><AccountCircleIcon sx={{ mr: 0.5, fontSize: 18 }} />{session.user}</Box></TableCell>
                            <TableCell><Box display="flex" alignItems="center"><ComputerIcon sx={{ mr: 0.5, fontSize: 18 }} />{session.device}</Box></TableCell>
                            <TableCell>{session.ip}</TableCell>
                            <TableCell>{session.loginTime}</TableCell>
                            <TableCell>{session.lastActivity}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              <Tooltip title="Terminar Sesión">
                                <IconButton size="small" onClick={() => handleTerminateSession(session.id)}>
                                  <BlockIcon color="error" />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Número de sesiones activas: {activeSessionsState.length}
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Eventos de Autenticación Detallados</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 400 }}>
                    <Table stickyHeader size="small">
                      <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700, width: '15%' }}>Timestamp</TableCell>
                          <TableCell sx={{ fontWeight: 700, width: '15%' }}>Usuario</TableCell>
                          <TableCell sx={{ fontWeight: 700, width: '30%' }}>Evento</TableCell>
                          <TableCell sx={{ fontWeight: 700, width: '15%' }}>IP Origen</TableCell>
                          <TableCell sx={{ fontWeight: 700, width: '15%' }}>Dispositivo</TableCell>
                          <TableCell sx={{ fontWeight: 700, width: '10%' }}>Estado</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {auditLogsState.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell>{log.timestamp}</TableCell>
                            <TableCell>{log.user}</TableCell>
                            <TableCell>{log.event}</TableCell>
                            <TableCell>{log.ip}</TableCell>
                            <TableCell>{log.device}</TableCell>
                            <TableCell>
                              <Chip
                                label={log.status}
                                size="small"
                                color={
                                  log.status === 'Éxito' ? 'success' :
                                    (log.status === 'Fallido' ? 'error' : 'warning')
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            </Paper>
          )}

          {/* Tab: Actividad por Usuario - Logs de uso, interacciones */}
          {currentTab === 'user_activity' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <EventNoteIcon sx={{ color: '#616161', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Logs de Actividad Detallada por Usuario
                </Typography>
                <Button variant="outlined" startIcon={<SearchIcon />} sx={{ textTransform: 'none' }}>
                  Filtrar / Exportar
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Buscar actividad por usuario, evento o IP"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: '#616161' }} />,
                  }}
                />
              </Box>

              <List sx={{ maxHeight: 600, overflowY: 'auto', border: '1px solid #e0e0e0', borderRadius: 1, bgcolor: '#fafafa' }}>
                {auditLogsState.map((log) => ( // Reutilizamos auditLogs para mostrar actividad detallada
                  <ListItem key={log.id} sx={{ borderBottom: '1px solid #eee' }}>
                    <ListItemIcon>
                      <AccessTimeIcon sx={{ color: '#616161' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center">
                          <Typography variant="subtitle1" component="span" sx={{ fontWeight: 600 }}>
                            {log.user}
                          </Typography>
                          <Chip
                            label={log.status}
                            size="small"
                            color={
                              log.status === 'Éxito' ? 'success' :
                                (log.status === 'Fallido' ? 'error' : 'warning')
                            }
                            sx={{ ml: 1 }}
                          />
                          <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                            {log.timestamp}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography variant="body2" color="text.primary">
                          <DescriptionIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />{log.event}
                          <br />
                          <PublicIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />IP: {log.ip}
                          <ComputerIcon sx={{ fontSize: 16, verticalAlign: 'middle', ml: 2, mr: 0.5 }} />Dispositivo: {log.device}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
                {auditLogsState.length === 0 && (
                  <ListItem>
                    <ListItemText primary="No se encontraron registros de actividad." sx={{ textAlign: 'center', color: 'text.secondary' }} />
                  </ListItem>
                )}
              </List>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                Mostrando los últimos {auditLogsState.length} registros.
              </Typography>
            </Paper>
          )}
        </Box>
      </Container>

      {/* Dialog para Añadir/Editar IP a Blacklist */}
      <Dialog open={openIpDialog} onClose={() => setOpenIpDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>
          {currentIp ? 'Editar Bloqueo IP' : 'Añadir IP a Blacklist'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Dirección IP (Ej: 192.168.1.1)"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={currentIp?.ipAddress || ''}
            onChange={(e) => setCurrentIp(prev => ({ ...prev, ipAddress: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Razón del Bloqueo"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            defaultValue={currentIp?.reason || ''}
            onChange={(e) => setCurrentIp(prev => ({ ...prev, reason: e.target.value }))}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenIpDialog(false)} color="secondary">Cancelar</Button>
          <Button onClick={() => handleSaveIp(currentIp)} variant="contained" color="primary">
            {currentIp ? 'Guardar Cambios' : 'Bloquear IP'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para Añadir/Editar Proveedor de Autenticación Externa */}
      <Dialog open={openExternalAuthDialog} onClose={() => setOpenExternalAuthDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>
          {currentExternalAuthProvider ? 'Editar Proveedor de Autenticación' : 'Añadir Proveedor de Autenticación Externa'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del Proveedor (Ej: Azure AD)"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={currentExternalAuthProvider?.name || ''}
            onChange={(e) => setCurrentExternalAuthProvider(prev => ({ ...prev, name: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel>Tipo de Protocolo</InputLabel>
            <Select
              label="Tipo de Protocolo"
              defaultValue={currentExternalAuthProvider?.type || ''}
              onChange={(e) => setCurrentExternalAuthProvider(prev => ({ ...prev, type: e.target.value }))}
            >
              <MenuItem value="OAuth 2.0">OAuth 2.0</MenuItem>
              <MenuItem value="SAML">SAML</MenuItem>
              <MenuItem value="OpenID Connect">OpenID Connect</MenuItem>
              <MenuItem value="LDAP">LDAP</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Endpoint de Configuración / URL"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={currentExternalAuthProvider?.configEndpoint || ''}
            onChange={(e) => setCurrentExternalAuthProvider(prev => ({ ...prev, configEndpoint: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="ID de Cliente / ID de Aplicación"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={currentExternalAuthProvider?.clientId || ''}
            onChange={(e) => setCurrentExternalAuthProvider(prev => ({ ...prev, clientId: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={currentExternalAuthProvider?.enabled || false}
                onChange={(e) => setCurrentExternalAuthProvider(prev => ({ ...prev, enabled: e.target.checked, status: e.target.checked ? 'Activo' : 'Inactivo' }))}
                color="primary"
              />
            }
            label="Habilitado"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenExternalAuthDialog(false)} color="secondary">Cancelar</Button>
          <Button onClick={() => handleSaveExternalAuthProvider(currentExternalAuthProvider)} variant="contained" color="primary">
            {currentExternalAuthProvider ? 'Guardar Cambios' : 'Añadir Proveedor'}
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

export default SecurityControlPanel;