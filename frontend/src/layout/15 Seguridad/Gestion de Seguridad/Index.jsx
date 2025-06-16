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
  Badge,
  FormGroup,
  InputAdornment,
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import SecurityIcon from '@mui/icons-material/Security'; // Icono principal de Seguridad
import VpnKeyIcon from '@mui/icons-material/VpnKey'; // Gestión de Acceso / MFA
import EventNoteIcon from '@mui/icons-material/EventNote'; // Logs
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'; // Control de Cambios
import DevicesIcon from '@mui/icons-material/Devices'; // Control de Dispositivos
import GroupIcon from '@mui/icons-material/Group'; // Roles/Usuarios
import LockOpenIcon from '@mui/icons-material/LockOpen'; // Permisos
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'; // MFA Habilitado
import BlockIcon from '@mui/icons-material/Block'; // Bloquear
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Éxito
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Error
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Advertencia
import RefreshIcon from '@mui/icons-material/Refresh'; // Refrescar
import SearchIcon from '@mui/icons-material/Search'; // Buscar
import FilterListIcon from '@mui/icons-material/FilterList'; // Filtros
import DownloadIcon from '@mui/icons-material/Download'; // Exportar
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // Añadir usuario
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Añadir rol/permiso
import DeleteIcon from '@mui/icons-material/Delete'; // Eliminar
import EditIcon from '@mui/icons-material/Edit'; // Editar
import HistoryIcon from '@mui/icons-material/History'; // Historial
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna'; // Políticas
import PolicyIcon from '@mui/icons-material/Policy'; // Políticas de seguridad
import RuleIcon from '@mui/icons-material/Rule'; // Reglas
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'; // Panel de administrador de seguridad
import PowerOffIcon from '@mui/icons-material/PowerOff'; // Desactivar dispositivo
import AccountTreeIcon from '@mui/icons-material/AccountTree'; // Estructura (roles)
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges'; // Control de cambios
import DnsIcon from '@mui/icons-material/Dns';
import CancelIcon from '@mui/icons-material/Cancel';
import PeopleIcon from '@mui/icons-material/People'; // Servidores/Infraestructura
import GppBadIcon from '@mui/icons-material/GppBad'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


// --- Datos Simulados de Seguridad ---

const securityOverview = {
  totalUsers: 1250,
  adminsCount: 50,
  usersWithMfa: 800, // 64%
  failedLoginsLast24h: 75,
  criticalAlertsLast24h: 5,
  activeBlockedUsers: 12,
  unusualActivityDetected: 3, // Ej. logins desde nuevas ubicaciones
};

const accessManagement = {
  roles: [
    { id: 'R001', name: 'Administrador Global', description: 'Control total del sistema', permissions: ['ALL_ACCESS', 'MANAGE_USERS', 'MANAGE_ROLES', 'AUDIT_LOGS'], assignedUsers: 5 },
    { id: 'R002', name: 'Editor de Contenido', description: 'Crear y editar contenido', permissions: ['CREATE_CONTENT', 'EDIT_CONTENT', 'VIEW_REPORTS'], assignedUsers: 150 },
    { id: 'R003', name: 'Lector de Informes', description: 'Ver informes y estadísticas', permissions: ['VIEW_REPORTS'], assignedUsers: 500 },
    { id: 'R004', name: 'Soporte Técnico', description: 'Asistencia a usuarios', permissions: ['VIEW_USERS', 'RESET_PASSWORDS'], assignedUsers: 20 },
  ],
  users: [ // Datos resumidos para la tabla
    { id: 'U001', name: 'Andrea González', email: 'andrea.gonzalez@example.com', role: 'Administrador Global', status: 'Activo', mfaEnabled: true, lastLogin: '2025-06-11 23:00' },
    { id: 'U002', name: 'Juan Pérez', email: 'juan.perez@example.com', role: 'Editor de Contenido', status: 'Activo', mfaEnabled: false, lastLogin: '2025-06-11 18:30' },
    { id: 'U003', name: 'Maria García', email: 'maria.garcia@example.com', role: 'Lector de Informes', status: 'Inactivo', mfaEnabled: true, lastLogin: '2025-06-09 10:00' },
    { id: 'U004', name: 'Carlos López', email: 'carlos.lopez@example.com', role: 'Soporte Técnico', status: 'Bloqueado', mfaEnabled: true, lastLogin: '2025-06-10 08:00' },
    { id: 'U005', name: 'Laura Martinez', email: 'laura.martinez@example.com', role: 'Editor de Contenido', status: 'Activo', mfaEnabled: false, lastLogin: '2025-06-11 09:45' },
  ],
};

const securityLogs = [
  { id: 'SL001', timestamp: '2025-06-11 23:59:10', user: 'SYSTEM_AUDIT', event: 'Actualización de política de contraseñas', severity: 'Info', ip: 'N/A', status: 'Éxito' },
  { id: 'SL002', timestamp: '2025-06-11 23:55:00', user: 'Maria García', event: 'Intento de acceso a recurso no autorizado ("Clientes VIP")', severity: 'Advertencia', ip: '203.0.113.78', status: 'Denegado' },
  { id: 'SL003', timestamp: '2025-06-11 23:50:30', user: 'Juan Pérez', event: 'Inicio de sesión exitoso (primer login desde nueva IP)', severity: 'Info', ip: '185.12.3.4', status: 'Éxito' },
  { id: 'SL004', timestamp: '2025-06-11 23:45:00', user: 'Andrea González', event: 'Cambio de rol de usuario "Carlos López" a "Bloqueado"', severity: 'Crítico', ip: '192.168.1.10', status: 'Éxito' },
  { id: 'SL005', timestamp: '2025-06-11 23:40:15', user: 'UNAUTHENTICATED', event: 'Múltiples intentos de login fallidos desde IP sospechosa', severity: 'Crítico', ip: '10.0.0.50', status: 'Detectado' },
  { id: 'SL006', timestamp: '2025-06-11 23:35:00', user: 'Carlos López', event: 'Intento de reseteo de contraseña sin MFA', severity: 'Advertencia', ip: '192.168.1.10', status: 'Fallido' },
  { id: 'SL007', timestamp: '2025-06-11 23:30:45', user: 'SYSTEM_SCAN', event: 'Escaneo de vulnerabilidades completado', severity: 'Info', ip: 'N/A', status: 'Éxito' },
  { id: 'SL008', timestamp: '2025-06-11 23:25:00', user: 'Admin System', event: 'Creación de nuevo usuario "Diego Rivera"', severity: 'Info', ip: '192.168.1.10', status: 'Éxito' },
  { id: 'SL009', timestamp: '2025-06-11 23:20:00', user: 'GuestUser', event: 'Acceso a página pública de registro', severity: 'Info', ip: '78.9.10.11', status: 'Éxito' },
  { id: 'SL010', timestamp: '2025-06-11 23:15:00', user: 'SYSTEM_BACKUP', event: 'Copia de seguridad de base de datos exitosa', severity: 'Info', ip: 'N/A', status: 'Éxito' },
];

const changeControlLog = [
  { id: 'CC001', timestamp: '2025-06-10 15:30:00', user: 'Admin Global', type: 'Configuración', item: 'Política de Contraseñas (longitud mínima)', change: 'De 8 a 12 caracteres', status: 'Aprobado', version: 'v1.2' },
  { id: 'CC002', timestamp: '2025-06-09 10:00:00', user: 'DevOps Team', type: 'Código', item: 'Actualización de librería de autenticación', change: 'Versión 2.0.1 a 2.0.2', status: 'Implementado', version: 'v3.5.1' },
  { id: 'CC003', timestamp: '2025-06-08 18:45:00', user: 'Admin Global', type: 'Acceso', item: 'Permiso "DELETE_USER"', change: 'Eliminado del rol "Editor"', status: 'Aprobado', version: 'v1.1' },
  { id: 'CC004', timestamp: '2025-06-07 12:00:00', user: 'Security Analyst', type: 'Firewall', item: 'Regla de IP bloqueada', change: 'Añadida IP 10.0.0.50', status: 'Implementado', version: 'N/A' },
];

const mfaSettings = {
  mfaAdoptionRate: 0.64, // 64%
  mfaMethods: ['Authenticator App', 'SMS OTP', 'Email OTP'],
  mfaMandatoryForRoles: ['Administrador Global', 'Soporte Técnico'],
  mfaActivity: [
    { user: 'Andrea González', timestamp: '2025-06-11 23:00', method: 'Authenticator App', status: 'Éxito' },
    { user: 'Juan Pérez', timestamp: '2025-06-11 18:30', method: 'SMS OTP', status: 'Fallido (código incorrecto)' },
    { user: 'Maria García', timestamp: '2025-06-09 10:00', method: 'Authenticator App', status: 'Éxito' },
  ],
};

const deviceControl = {
  registeredDevices: [
    { id: 'D001', user: 'Andrea González', type: 'Desktop', name: 'PC Oficina', lastUsed: '2025-06-11 23:00', ip: '192.168.1.10', status: 'Activo' },
    { id: 'D002', user: 'Juan Pérez', type: 'Mobile', name: 'Samsung Galaxy S22', lastUsed: '2025-06-11 18:30', ip: '172.16.0.25', status: 'Activo' },
    { id: 'D003', user: 'Maria García', type: 'Laptop', name: 'MacBook Pro', lastUsed: '2025-06-09 10:00', ip: '203.0.113.78', status: 'Inactivo' },
    { id: 'D004', user: 'Carlos López', type: 'Tablet', name: 'iPad Pro', lastUsed: '2025-06-10 08:00', ip: '10.0.0.5', status: 'Bloqueado' },
  ],
  unauthorizedAccessAttempts: [
    { id: 'UA001', timestamp: '2025-06-11 23:50:00', ip: '10.0.0.50', device: 'Unknown Browser', userAttempted: 'maria.garcia@example.com', reason: 'Dispositivo no reconocido' },
  ],
};

// Iconos para la tabla de logs de seguridad
const severityIcons = {
  'Crítico': <ErrorOutlineIcon color="error" />,
  'Advertencia': <WarningAmberIcon color="warning" />,
  'Info': <CheckCircleOutlineIcon color="info" />,
};

const statusChips = {
  'Éxito': <Chip label="Éxito" size="small" color="success" icon={<CheckCircleOutlineIcon />} />,
  'Fallido': <Chip label="Fallido" size="small" color="error" icon={<CancelIcon />} />,
  'Denegado': <Chip label="Denegado" size="small" color="warning" icon={<BlockIcon />} />,
  'Detectado': <Chip label="Detectado" size="small" color="error" icon={<ErrorOutlineIcon />} />,
  'Implementado': <Chip label="Implementado" size="small" color="primary" icon={<PublishedWithChangesIcon />} />,
  'Aprobado': <Chip label="Aprobado" size="small" color="info" icon={<CheckCircleOutlineIcon />} />,
  'Activo': <Chip label="Activo" size="small" color="success" icon={<CheckCircleOutlineIcon />} />,
  'Inactivo': <Chip label="Inactivo" size="small" color="default" />,
  'Bloqueado': <Chip label="Bloqueado" size="small" color="error" icon={<BlockIcon />} />,
};


function SecurityManagementPanel({ onGoToHome }) {
  const [currentTab, setCurrentTab] = useState('overview'); // 'overview', 'access_management', 'security_logs', 'change_control', 'mfa_device_control'

  const [filterLogSeverity, setFilterLogSeverity] = useState('');
  const [filterLogStatus, setFilterLogStatus] = useState('');
  const [filterLogUser, setFilterLogUser] = useState('');

  const [openAddRoleDialog, setOpenAddRoleDialog] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');

  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [newUserData, setNewUserData] = useState({ name: '', email: '', role: '', mfaEnabled: false });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const showSnackbar = useCallback((message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const filteredSecurityLogs = securityLogs.filter(log => {
    const severityMatch = filterLogSeverity ? log.severity === filterLogSeverity : true;
    const statusMatch = filterLogStatus ? log.status === filterLogStatus : true;
    const userMatch = filterLogUser ? log.user.toLowerCase().includes(filterLogUser.toLowerCase()) : true;
    return severityMatch && statusMatch && userMatch;
  });

  const handleAddRole = () => {
    if (newRoleName.trim() === '') {
      showSnackbar('El nombre del rol no puede estar vacío.', 'error');
      return;
    }
    // Lógica para añadir rol
    showSnackbar(`Rol "${newRoleName}" añadido con éxito.`, 'success');
    setOpenAddRoleDialog(false);
    setNewRoleName('');
    setNewRoleDescription('');
  };

  const handleAddUser = () => {
    if (newUserData.name.trim() === '' || newUserData.email.trim() === '' || newUserData.role.trim() === '') {
      showSnackbar('Todos los campos de usuario son obligatorios.', 'error');
      return;
    }
    // Lógica para añadir usuario
    showSnackbar(`Usuario "${newUserData.name}" añadido con éxito.`, 'success');
    setOpenAddUserDialog(false);
    setNewUserData({ name: '', email: '', role: '', mfaEnabled: false });
  };

  const handleBlockUser = (userId) => {
    // Lógica para bloquear usuario
    showSnackbar(`Usuario ${userId} bloqueado.`, 'warning');
  };

  const handleDeactivateDevice = (deviceId) => {
    // Lógica para desactivar dispositivo
    showSnackbar(`Dispositivo ${deviceId} desactivado.`, 'warning');
  };

  const handleRevokeAccess = (userId, permission) => {
    // Lógica para revocar acceso
    showSnackbar(`Acceso "${permission}" revocado para usuario ${userId}.`, 'warning');
  };


  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', minHeight: '100vh', color: '#333', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#212121', borderBottom: '1px solid #424242' }}> {/* Fondo oscuro para seguridad */}
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2, color: '#bdbdbd' }}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}
          <SecurityIcon sx={{ fontSize: 36, mr: 1, color: '#f44336' }} /> {/* Rojo de alerta para seguridad */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Panel de Gestión de Seguridad
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<RefreshIcon />}
            sx={{ textTransform: 'none', bgcolor: '#424242', '&:hover': { bgcolor: '#616161' } }}
          >
            Actualizar Estado
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#f44336' }}>
            Protege tus Activos Digitales y Usuarios
          </Typography>
          <Typography variant="h6" color="#616161">
            Controla accesos, monitorea amenazas y audita cambios.
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
                backgroundColor: '#f44336', // Rojo de seguridad
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                '&.Mui-selected': {
                  color: '#f44336', // Rojo de seguridad
                },
              },
            }}
          >
            <Tab label="Resumen de Seguridad" value="overview" icon={<AdminPanelSettingsIcon />} iconPosition="start" />
            <Tab label="Gestión de Acceso" value="access_management" icon={<VpnKeyIcon />} iconPosition="start" />
            <Tab label="Logs de Seguridad" value="security_logs" icon={<EventNoteIcon />} iconPosition="start" />
            <Tab label="Control de Cambios" value="change_control" icon={<CompareArrowsIcon />} iconPosition="start" />
            <Tab label="MFA y Dispositivos" value="mfa_device_control" icon={<DevicesIcon />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Contenido de las Pestañas */}
        <Box sx={{ p: 0 }}>
          {/* Tab: Resumen de Seguridad */}
          {currentTab === 'overview' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <AdminPanelSettingsIcon sx={{ color: '#f44336', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Resumen de Seguridad del Sistema
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
                      {securityOverview.totalUsers}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Usuarios Registrados</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9', borderLeft: '5px solid #4caf50' }}>
                    <VerifiedUserIcon sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      {securityOverview.usersWithMfa} ({Math.round((securityOverview.usersWithMfa / securityOverview.totalUsers) * 100)}%)
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Usuarios con MFA</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#fff3e0', borderLeft: '5px solid #ff9800' }}>
                    <VpnKeyIcon sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      {securityOverview.failedLoginsLast24h}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Logins Fallidos (24h)</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#ffebee', borderLeft: '5px solid #f44336' }}>
                    <ErrorOutlineIcon sx={{ fontSize: 40, color: '#f44336', mb: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      {securityOverview.criticalAlertsLast24h}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Alertas Críticas (24h)</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#ede7f6', borderLeft: '5px solid #673ab7' }}>
                    <BlockIcon sx={{ fontSize: 40, color: '#673ab7', mb: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      {securityOverview.activeBlockedUsers}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Usuarios Bloqueados</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#e0f2f7', borderLeft: '5px solid #00acc1' }}>
                    <GppBadIcon sx={{ fontSize: 40, color: '#00acc1', mb: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      {securityOverview.unusualActivityDetected}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Actividad Inusual</Typography>
                  </Card>
                </Grid>
              </Grid>

              <Alert severity="warning" sx={{ mb: 3 }}>
                Se detectaron **{securityOverview.criticalAlertsLast24h}** alertas críticas en las últimas 24 horas. Revisa los logs de seguridad.
              </Alert>
              <Alert severity="info" sx={{ mb: 3 }}>
                La tasa de adopción de MFA es del **{Math.round((securityOverview.usersWithMfa / securityOverview.totalUsers) * 100)}%**. Considera incentivar a más usuarios a habilitarlo.
              </Alert>

              <Card elevation={2} sx={{ p: 2, bgcolor: '#ffffff' }}>
                <CardHeader
                  title={
                    <Box display="flex" alignItems="center">
                      <PolicyIcon sx={{ mr: 1, color: '#616161' }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>Políticas de Seguridad Activas</Typography>
                    </Box>
                  }
                  sx={{ pb: 1 }}
                />
                <CardContent>
                  <List dense>
                    <ListItem><ListItemIcon><RuleIcon /></ListItemIcon><ListItemText primary="Longitud mínima de contraseña: 12 caracteres." /></ListItem>
                    <ListItem><ListItemIcon><RuleIcon /></ListItemIcon><ListItemText primary="Bloqueo de cuenta tras 5 intentos fallidos." /></ListItem>
                    <ListItem><ListItemIcon><RuleIcon /></ListItemIcon><ListItemText primary="MFA obligatorio para roles de Administrador y Soporte Técnico." /></ListItem>
                    <ListItem><ListItemIcon><RuleIcon /></ListItemIcon><ListItemText primary="Sesiones inactivas se cierran tras 30 minutos." /></ListItem>
                  </List>
                </CardContent>
              </Card>

            </Paper>
          )}

          {/* Tab: Gestión de Acceso (Usuarios y Roles) */}
          {currentTab === 'access_management' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <VpnKeyIcon sx={{ color: '#00bcd4', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Gestión de Usuarios, Roles y Permisos
                </Typography>
                <Button variant="contained" startIcon={<PersonAddIcon />} onClick={() => setOpenAddUserDialog(true)} sx={{ textTransform: 'none', bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' }, mr: 1 }}>
                  Añadir Usuario
                </Button>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => setOpenAddRoleDialog(true)} sx={{ textTransform: 'none' }}>
                  Añadir Rol
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Accordion defaultExpanded sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#e0e0e0', fontWeight: 600 }}>
                  <AccountTreeIcon sx={{ mr: 1, color: '#616161' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Roles y Permisos</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Paper} elevation={0} sx={{ maxHeight: 400, border: '1px solid #eee' }}>
                    <Table stickyHeader size="small">
                      <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700 }}>Rol</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Descripción</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Permisos Clave</TableCell>
                          <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Usuarios Asignados</TableCell>
                          <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Acciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {accessManagement.roles.map((role) => (
                          <TableRow key={role.id}>
                            <TableCell>{role.name}</TableCell>
                            <TableCell>{role.description}</TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {role.permissions.slice(0, 2).map((perm, idx) => (
                                  <Chip key={idx} label={perm} size="small" variant="outlined" color="primary" />
                                ))}
                                {role.permissions.length > 2 && (
                                  <Chip label={`+${role.permissions.length - 2} más`} size="small" variant="outlined" />
                                )}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{role.assignedUsers}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              <Tooltip title="Editar Rol"><IconButton size="small"><EditIcon color="info" /></IconButton></Tooltip>
                              <Tooltip title="Eliminar Rol"><IconButton size="small"><DeleteIcon color="error" /></IconButton></Tooltip>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>

              <Accordion defaultExpanded sx={{ border: '1px solid #e0e0e0' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#e0e0e0', fontWeight: 600 }}>
                  <PeopleIcon sx={{ mr: 1, color: '#616161' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Gestión de Usuarios</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Paper} elevation={0} sx={{ maxHeight: 400, border: '1px solid #eee' }}>
                    <Table stickyHeader size="small">
                      <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700 }}>Usuario</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Rol</TableCell>
                          <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>MFA</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Último Login</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                          <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Acciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {accessManagement.users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell><Box display="flex" alignItems="center"><Avatar src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} sx={{ width: 24, height: 24, mr: 1 }} />{user.name}</Box></TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell><Chip label={user.role} size="small" variant="outlined" color="default" /></TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {user.mfaEnabled ? <VerifiedUserIcon color="success" /> : <BlockIcon color="error" />}
                            </TableCell>
                            <TableCell>{user.lastLogin}</TableCell>
                            <TableCell>{statusChips[user.status]}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              <Tooltip title="Editar Usuario"><IconButton size="small"><EditIcon color="info" /></IconButton></Tooltip>
                              {user.status !== 'Bloqueado' ? (
                                <Tooltip title="Bloquear Usuario"><IconButton size="small" onClick={() => handleBlockUser(user.name)}><BlockIcon color="warning" /></IconButton></Tooltip>
                              ) : (
                                <Tooltip title="Desbloquear Usuario"><IconButton size="small" onClick={() => showSnackbar(`Funcionalidad de desbloquear usuario ${user.name}`, 'info')}><LockOpenIcon color="success" /></IconButton></Tooltip>
                              )}
                              <Tooltip title="Eliminar Usuario"><IconButton size="small"><DeleteIcon color="error" /></IconButton></Tooltip>
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

          {/* Tab: Logs de Seguridad */}
          {currentTab === 'security_logs' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <EventNoteIcon sx={{ color: '#ff9800', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Eventos de Seguridad y Auditoría
                </Typography>
                <Button variant="outlined" startIcon={<FilterListIcon />} sx={{ textTransform: 'none', mr: 1 }}>
                  Filtros Avanzados
                </Button>
                <Button variant="contained" startIcon={<DownloadIcon />} sx={{ textTransform: 'none', bgcolor: '#ff9800', '&:hover': { bgcolor: '#ef6c00' } }}>
                  Exportar Logs
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Filtrar por Usuario/Sistema"
                    variant="outlined"
                    size="small"
                    value={filterLogUser}
                    onChange={(e) => setFilterLogUser(e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Filtrar por Severidad</InputLabel>
                    <Select
                      value={filterLogSeverity}
                      label="Filtrar por Severidad"
                      onChange={(e) => setFilterLogSeverity(e.target.value)}
                    >
                      <MenuItem value="">Todas</MenuItem>
                      <MenuItem value="Crítico">Crítico</MenuItem>
                      <MenuItem value="Advertencia">Advertencia</MenuItem>
                      <MenuItem value="Info">Información</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Filtrar por Estado</InputLabel>
                    <Select
                      value={filterLogStatus}
                      label="Filtrar por Estado"
                      onChange={(e) => setFilterLogStatus(e.target.value)}
                    >
                      <MenuItem value="">Todos</MenuItem>
                      <MenuItem value="Éxito">Éxito</MenuItem>
                      <MenuItem value="Fallido">Fallido</MenuItem>
                      <MenuItem value="Denegado">Denegado</MenuItem>
                      <MenuItem value="Detectado">Detectado</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 600 }}>
                <Table stickyHeader size="small">
                  <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, width: '15%' }}>Timestamp</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '15%' }}>Usuario / Origen</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '35%' }}>Evento de Seguridad</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '10%' }}>Severidad</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '15%' }}>IP Origen</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '10%' }}>Estado</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredSecurityLogs.length > 0 ? (
                      filteredSecurityLogs.map((log) => (
                        <TableRow key={log.id} sx={{ bgcolor: log.severity === 'Crítico' ? '#ffebee' : (log.severity === 'Advertencia' ? '#fffde7' : 'inherit') }}>
                          <TableCell>{log.timestamp}</TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell>{log.event}</TableCell>
                          <TableCell><Box display="flex" alignItems="center">{severityIcons[log.severity]} {log.severity}</Box></TableCell>
                          <TableCell>{log.ip}</TableCell>
                          <TableCell>{statusChips[log.status]}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={6} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No se encontraron logs de seguridad para los filtros seleccionados.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                Mostrando {filteredSecurityLogs.length} de {securityLogs.length} registros.
              </Typography>
            </Paper>
          )}

          {/* Tab: Control de Cambios */}
          {currentTab === 'change_control' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <CompareArrowsIcon sx={{ color: '#673ab7', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Historial de Cambios y Auditoría
                </Typography>
                <Button variant="outlined" startIcon={<HistoryIcon />} sx={{ textTransform: 'none' }}>
                  Ver Historial Completo
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 500 }}>
                <Table stickyHeader size="small">
                  <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Timestamp</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Usuario</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Tipo de Cambio</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Elemento Cambiado</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Detalle del Cambio</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Versión/Ref.</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {changeControlLog.map((change) => (
                      <TableRow key={change.id}>
                        <TableCell>{change.timestamp}</TableCell>
                        <TableCell>{change.user}</TableCell>
                        <TableCell><Chip label={change.type} size="small" variant="outlined" /></TableCell>
                        <TableCell>{change.item}</TableCell>
                        <TableCell>{change.change}</TableCell>
                        <TableCell>{statusChips[change.status]}</TableCell>
                        <TableCell>{change.version}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Alert severity="info" sx={{ mt: 3 }}>
                Este registro es fundamental para la trazabilidad y cumplimiento de normativas de seguridad.
              </Alert>
            </Paper>
          )}

          {/* Tab: MFA y Control de Dispositivos */}
          {currentTab === 'mfa_device_control' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <DevicesIcon sx={{ color: '#4caf50', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Autenticación Multifactor (MFA) y Gestión de Dispositivos
                </Typography>
                <Button variant="outlined" startIcon={<SettingsInputAntennaIcon />} sx={{ textTransform: 'none' }}>
                  Configurar Políticas MFA
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Card elevation={2} sx={{ p: 2, bgcolor: '#ffffff' }}>
                    <CardHeader
                      title={
                        <Box display="flex" alignItems="center">
                          <VpnKeyIcon sx={{ mr: 1, color: '#4caf50' }} />
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>Estado de Adopción de MFA</Typography>
                        </Box>
                      }
                      sx={{ pb: 1 }}
                    />
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }}>
                        <CircularProgress
                          variant="determinate"
                          value={Math.round(mfaSettings.mfaAdoptionRate * 100)}
                          size={100}
                          thickness={5}
                          sx={{ color: '#4caf50' }}
                        />
                        <Box sx={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Typography variant="h5" component="div" color="text.secondary">
                            {Math.round(mfaSettings.mfaAdoptionRate * 100)}%
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 2 }}>
                        Usuarios con MFA habilitado.
                      </Typography>
                      <List dense>
                        <ListItem><ListItemIcon><CheckCircleOutlineIcon color="action" /></ListItemIcon><ListItemText primary={`Métodos soportados: ${mfaSettings.mfaMethods.join(', ')}`} /></ListItem>
                        <ListItem><ListItemIcon><PolicyIcon color="action" /></ListItemIcon><ListItemText primary={`MFA obligatorio para: ${mfaSettings.mfaMandatoryForRoles.join(', ')}`} /></ListItem>
                      </List>
                      <Alert severity="warning" sx={{ mt: 2 }}>
                        Considera implementar MFA obligatorio para todos los roles administrativos.
                      </Alert>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card elevation={2} sx={{ p: 2, bgcolor: '#ffffff' }}>
                    <CardHeader
                      title={
                        <Box display="flex" alignItems="center">
                          <DevicesIcon sx={{ mr: 1, color: '#2196f3' }} />
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>Dispositivos Registrados por Usuario</Typography>
                        </Box>
                      }
                      sx={{ pb: 1 }}
                    />
                    <CardContent>
                      <TableContainer component={Paper} elevation={0} sx={{ maxHeight: 300, border: '1px solid #e0e0e0' }}>
                        <Table size="small">
                          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 700 }}>Usuario</TableCell>
                              <TableCell sx={{ fontWeight: 700 }}>Dispositivo</TableCell>
                              <TableCell sx={{ fontWeight: 700 }}>Último Uso</TableCell>
                              <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                              <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Acción</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {deviceControl.registeredDevices.map((device) => (
                              <TableRow key={device.id}>
                                <TableCell>{device.user}</TableCell>
                                <TableCell>{device.name} ({device.type})</TableCell>
                                <TableCell>{device.lastUsed}</TableCell>
                                <TableCell>{statusChips[device.status]}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                  {device.status === 'Activo' && (
                                    <Tooltip title="Desactivar Dispositivo">
                                      <IconButton size="small" onClick={() => handleDeactivateDevice(device.id)}>
                                        <PowerOffIcon color="warning" />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                  {device.status === 'Bloqueado' && (
                                    <Tooltip title="Desbloquear Dispositivo">
                                      <IconButton size="small" onClick={() => showSnackbar(`Funcionalidad de desbloquear dispositivo ${device.id}`, 'info')}>
                                        <LockOpenIcon color="success" />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                  <Tooltip title="Eliminar Dispositivo"><IconButton size="small"><DeleteIcon color="error" /></IconButton></Tooltip>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card elevation={2} sx={{ p: 2, bgcolor: '#ffffff' }}>
                    <CardHeader
                      title={
                        <Box display="flex" alignItems="center">
                          <ErrorOutlineIcon sx={{ mr: 1, color: '#f44336' }} />
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>Intentos de Acceso no Autorizados</Typography>
                        </Box>
                      }
                      sx={{ pb: 1 }}
                    />
                    <CardContent>
                      <TableContainer component={Paper} elevation={0} sx={{ maxHeight: 200, border: '1px solid #e0e0e0' }}>
                        <Table size="small">
                          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 700 }}>Timestamp</TableCell>
                              <TableCell sx={{ fontWeight: 700 }}>IP</TableCell>
                              <TableCell sx={{ fontWeight: 700 }}>Dispositivo</TableCell>
                              <TableCell sx={{ fontWeight: 700 }}>Usuario Intentado</TableCell>
                              <TableCell sx={{ fontWeight: 700 }}>Razón</TableCell>
                              <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Acción</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {deviceControl.unauthorizedAccessAttempts.length > 0 ? (
                              deviceControl.unauthorizedAccessAttempts.map((attempt) => (
                                <TableRow key={attempt.id} sx={{ bgcolor: '#ffebee' }}>
                                  <TableCell>{attempt.timestamp}</TableCell>
                                  <TableCell>{attempt.ip}</TableCell>
                                  <TableCell>{attempt.device}</TableCell>
                                  <TableCell>{attempt.userAttempted}</TableCell>
                                  <TableCell>{attempt.reason}</TableCell>
                                  <TableCell sx={{ textAlign: 'center' }}>
                                    <Tooltip title="Bloquear IP"><IconButton size="small" onClick={() => showSnackbar(`Funcionalidad de bloquear IP ${attempt.ip}`, 'error')}><BlockIcon color="error" /></IconButton></Tooltip>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow><TableCell colSpan={6} sx={{ textAlign: 'center', color: 'text.secondary' }}>No hay intentos de acceso no autorizados recientes.</TableCell></TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          )}
        </Box>
      </Container>

      {/* Dialog para Añadir Rol */}
      <Dialog open={openAddRoleDialog} onClose={() => setOpenAddRoleDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>
          Añadir Nuevo Rol de Seguridad
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del Rol"
            type="text"
            fullWidth
            variant="outlined"
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Descripción del Rol"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newRoleDescription}
            onChange={(e) => setNewRoleDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
            Permisos Asociados (ej. `READ_DATA`, `WRITE_FILES`, `MANAGE_USERS`)
          </Typography>
          <TextField
            margin="dense"
            label="Escribe permisos separados por comas"
            fullWidth
            variant="outlined"
          />
          <Alert severity="info" sx={{ mt: 2 }}>
            Define los permisos específicos que este rol otorgará a los usuarios.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddRoleDialog(false)} color="secondary">Cancelar</Button>
          <Button onClick={handleAddRole} variant="contained" color="primary">
            Crear Rol
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para Añadir Usuario */}
      <Dialog open={openAddUserDialog} onClose={() => setOpenAddUserDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>
          Añadir Nuevo Usuario al Sistema
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre Completo"
            type="text"
            fullWidth
            variant="outlined"
            name="name"
            value={newUserData.name}
            onChange={(e) => setNewUserData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Correo Electrónico"
            type="email"
            fullWidth
            variant="outlined"
            name="email"
            value={newUserData.email}
            onChange={(e) => setNewUserData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel>Asignar Rol</InputLabel>
            <Select
              value={newUserData.role}
              label="Asignar Rol"
              name="role"
              onChange={(e) => setNewUserData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            >
              {accessManagement.roles.map(role => (
                <MenuItem key={role.id} value={role.name}>{role.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={newUserData.mfaEnabled}
                onChange={(e) => setNewUserData(prev => ({ ...prev, mfaEnabled: e.target.checked }))}
                name="mfaEnabled"
                color="primary"
              />
            }
            label="Habilitar MFA para este usuario"
            sx={{ mb: 2 }}
          />
          <Alert severity="info" sx={{ mt: 2 }}>
            Se enviará un correo de bienvenida con instrucciones para la configuración inicial.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddUserDialog(false)} color="secondary">Cancelar</Button>
          <Button onClick={handleAddUser} variant="contained" color="primary">
            Crear Usuario
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

export default SecurityManagementPanel;