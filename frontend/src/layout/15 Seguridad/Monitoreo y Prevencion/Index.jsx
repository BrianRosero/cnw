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
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'; // Icono principal de Monitoreo
import PolicyIcon from '@mui/icons-material/Policy'; // Políticas de Seguridad
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'; // Alertas/Incidentes
import ShieldIcon from '@mui/icons-material/Shield'; // Prevención
import BugReportIcon from '@mui/icons-material/BugReport'; // Vulnerabilidades
import DnsIcon from '@mui/icons-material/Dns'; // Infraestructura/Servidores
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'; // Cumplimiento
import HistoryIcon from '@mui/icons-material/History'; // Historial
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna'; // Reglas/Configuración
import RefreshIcon from '@mui/icons-material/Refresh'; // Refrescar
import SearchIcon from '@mui/icons-material/Search'; // Buscar
import FilterListIcon from '@mui/icons-material/FilterList'; // Filtros
import DownloadIcon from '@mui/icons-material/Download'; // Exportar
import SendIcon from '@mui/icons-material/Send'; // Enviar Notificación
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Éxito/Activo
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Error/Crítico
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Advertencia
import BlockIcon from '@mui/icons-material/Block'; // Bloqueado/Denegado
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Para AccordionSummary
import DeleteIcon from '@mui/icons-material/Delete'; // Eliminar
import EditIcon from '@mui/icons-material/Edit'; // Editar
import DoneAllIcon from '@mui/icons-material/DoneAll'; // Resuelto
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'; // Pendiente
import ScheduleIcon from '@mui/icons-material/Schedule'; // Programación
import CodeIcon from '@mui/icons-material/Code'; // Código/Script
import GppGoodIcon from '@mui/icons-material/GppGood'; // Seguridad en general
import RuleIcon from '@mui/icons-material/Rule';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GroupIcon from '@mui/icons-material/Group'; // Regla específica

// --- Datos Simulados para Monitoreo y Prevención ---

const incidentAlerts = [
  { id: 'INC001', timestamp: '2025-06-12 12:55:00', type: 'Acceso Inusual', description: 'Intento de login desde nueva IP en cuenta de Administrador', severity: 'Crítico', status: 'Activo', assignedTo: 'Security Team', actions: ['Bloquear IP', 'Forzar cambio de contraseña'] },
  { id: 'INC002', timestamp: '2025-06-12 12:40:15', type: 'Actividad Sospechosa', description: 'Múltiples fallos de autenticación en poco tiempo (brute force)', severity: 'Advertencia', status: 'Activo', assignedTo: 'SOC Analyst', actions: ['Bloquear IP'] },
  { id: 'INC003', timestamp: '2025-06-12 11:30:00', type: 'Configuración Errónea', description: 'Permiso de escritura en directorio público detectado', severity: 'Crítico', status: 'Resuelto', assignedTo: 'DevOps Team', actions: ['Corregir permiso'] },
  { id: 'INC004', timestamp: '2025-06-11 09:00:00', type: 'Vulnerabilidad Detectada', description: 'Librería desactualizada con CVE crítico', severity: 'Advertencia', status: 'Pendiente', assignedTo: 'Dev Team', actions: ['Actualizar librería'] },
  { id: 'INC005', timestamp: '2025-06-10 18:00:00', type: 'Escaneo Malicioso', description: 'Escaneo de puertos desde IP externa', severity: 'Info', status: 'Resuelto', assignedTo: 'Firewall Admin', actions: ['Añadir a lista negra'] },
];

const securityPolicies = [
  { id: 'POL001', name: 'Política de Contraseñas Seguras', description: 'Requiere 12+ caracteres, mayúsculas, minúsculas, números y símbolos.', target: 'Todos los Usuarios', enforcement: 'Automático', status: 'Activo' },
  { id: 'POL002', name: 'Política de MFA Obligatorio', description: 'MFA requerido para roles de Administrador, Soporte y Directivos.', target: 'Roles Específicos', enforcement: 'Automático', status: 'Activo' },
  { id: 'POL003', name: 'Política de Sesión Inactiva', description: 'Cierre de sesión automático tras 30 minutos de inactividad.', target: 'Todos los Usuarios', enforcement: 'Automático', status: 'Activo' },
  { id: 'POL004', name: 'Política de Uso Aceptable', description: 'Define el uso permitido de los recursos del sistema.', target: 'Todos los Usuarios', enforcement: 'Manual/Auditoría', status: 'Activo' },
  { id: 'POL005', name: 'Política de Retención de Logs', description: 'Logs de seguridad retenidos por un mínimo de 90 días.', target: 'Sistema', enforcement: 'Automático', status: 'Activo' },
];

const preventionRules = [
  { id: 'RULE001', name: 'Detección de Brute Force (Login)', description: 'Bloquea IP tras 5 intentos fallidos en 5 minutos.', type: 'Autenticación', status: 'Activo', lastUpdated: '2025-06-01' },
  { id: 'RULE002', name: 'Alerta por Acceso Geográfico Anómalo', description: 'Alerta si un usuario inicia sesión desde un país/región inusual.', type: 'Acceso', status: 'Activo', lastUpdated: '2025-05-15' },
  { id: 'RULE003', name: 'Monitoreo de Acceso a Archivos Sensibles', description: 'Alerta si un usuario no autorizado intenta acceder a archivos clasificados.', type: 'Datos', status: 'Activo', lastUpdated: '2025-06-10' },
  { id: 'RULE004', name: 'Escaneo de Vulnerabilidades Programado', description: 'Ejecuta escaneos semanales de infraestructura y código.', type: 'Vulnerabilidad', status: 'Activo', lastUpdated: '2025-06-05' },
];

const auditReports = [
  { id: 'AR001', date: '2025-06-01', type: 'Auditoría de Acceso', findings: '2 usuarios con permisos excesivos.', status: 'Requiere Revisión', reportLink: '#', severity: 'Advertencia' },
  { id: 'AR002', date: '2025-05-20', type: 'Revisión de Configuración de Firewall', findings: 'Ninguna anomalía crítica.', status: 'OK', reportLink: '#', severity: 'Info' },
  { id: 'AR003', date: '2025-05-01', type: 'Auditoría de Logs de Seguridad', findings: 'Volumen alto de intentos de login fallidos desde Asia.', status: 'Resuelto', reportLink: '#', severity: 'Crítico' },
];

// Iconos para la tabla de alertas/incidentes
const severityIcons = {
  'Crítico': <ErrorOutlineIcon color="error" />,
  'Advertencia': <WarningAmberIcon color="warning" />,
  'Info': <CheckCircleOutlineIcon color="info" />,
};

const incidentStatusChips = {
  'Activo': <Chip label="Activo" size="small" color="error" icon={<NotificationsActiveIcon />} />,
  'Resuelto': <Chip label="Resuelto" size="small" color="success" icon={<DoneAllIcon />} />,
  'Pendiente': <Chip label="Pendiente" size="small" color="info" icon={<HourglassEmptyIcon />} />,
};

const policyStatusChips = {
  'Activo': <Chip label="Activo" size="small" color="success" icon={<CheckCircleOutlineIcon />} />,
  'Inactivo': <Chip label="Inactivo" size="small" color="default" icon={<BlockIcon />} />,
};

const ruleStatusChips = {
  'Activo': <Chip label="Activo" size="small" color="success" icon={<CheckCircleOutlineIcon />} />,
  'Inactivo': <Chip label="Inactivo" size="small" color="default" icon={<BlockIcon />} />,
};

const auditStatusChips = {
  'Requiere Revisión': <Chip label="Requiere Revisión" size="small" color="warning" icon={<HourglassEmptyIcon />} />,
  'OK': <Chip label="OK" size="small" color="success" icon={<CheckCircleOutlineIcon />} />,
  'Resuelto': <Chip label="Resuelto" size="small" color="success" icon={<DoneAllIcon />} />,
};


function MonitoringPreventionPanel({ onGoToHome }) {
  const [currentTab, setCurrentTab] = useState('alerts'); // 'alerts', 'policies', 'prevention_rules', 'audit_reports'

  const [filterAlertSeverity, setFilterAlertSeverity] = useState('');
  const [filterAlertStatus, setFilterAlertStatus] = useState('');

  const [openAddPolicyDialog, setOpenAddPolicyDialog] = useState(false);
  const [newPolicyData, setNewPolicyData] = useState({ name: '', description: '', target: '', enforcement: '', status: 'Activo' });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const showSnackbar = useCallback((message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const filteredIncidentAlerts = incidentAlerts.filter(alert => {
    const severityMatch = filterAlertSeverity ? alert.severity === filterAlertSeverity : true;
    const statusMatch = filterAlertStatus ? alert.status === filterAlertStatus : true;
    return severityMatch && statusMatch;
  });

  const handleResolveIncident = (id) => {
    // Lógica para resolver el incidente
    showSnackbar(`Incidente ${id} marcado como resuelto.`, 'success');
    // Actualizar el estado local o llamar a una API para persistir el cambio
  };

  const handleAddPolicy = () => {
    if (newPolicyData.name.trim() === '' || newPolicyData.description.trim() === '') {
      showSnackbar('Nombre y descripción de la política son obligatorios.', 'error');
      return;
    }
    // Lógica para añadir política
    showSnackbar(`Política "${newPolicyData.name}" añadida con éxito.`, 'success');
    setOpenAddPolicyDialog(false);
    setNewPolicyData({ name: '', description: '', target: '', enforcement: '', status: 'Activo' });
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
          <MonitorHeartIcon sx={{ fontSize: 36, mr: 1, color: '#00bcd4' }} /> {/* Cyan para monitoreo */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Panel de Monitoreo y Prevención
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
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#00bcd4' }}>
            Detección Proactiva y Aplicación de Políticas
          </Typography>
          <Typography variant="h6" color="#616161">
            Monitorea incidentes, gestiona políticas y refuerza la seguridad del sistema.
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
                backgroundColor: '#00bcd4', // Cyan para monitoreo
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                '&.Mui-selected': {
                  color: '#00bcd4', // Cyan para monitoreo
                },
              },
            }}
          >
            <Tab label="Alertas e Incidentes" value="alerts" icon={<NotificationsActiveIcon />} iconPosition="start" />
            <Tab label="Políticas de Seguridad" value="policies" icon={<PolicyIcon />} iconPosition="start" />
            <Tab label="Reglas de Prevención" value="prevention_rules" icon={<ShieldIcon />} iconPosition="start" />
            <Tab label="Informes de Auditoría" value="audit_reports" icon={<BugReportIcon />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Contenido de las Pestañas */}
        <Box sx={{ p: 0 }}>
          {/* Tab: Alertas e Incidentes */}
          {currentTab === 'alerts' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <NotificationsActiveIcon sx={{ color: '#f44336', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Alertas y Gestión de Incidentes
                </Typography>
                <Button variant="outlined" startIcon={<FilterListIcon />} sx={{ textTransform: 'none', mr: 1 }}>
                  Ver Todos los Incidentes
                </Button>
                <Button variant="contained" startIcon={<SendIcon />} sx={{ textTransform: 'none', bgcolor: '#f44336', '&:hover': { bgcolor: '#d32f2f' } }}>
                  Notificar Nuevo Incidente
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Filtrar por Severidad</InputLabel>
                    <Select
                      value={filterAlertSeverity}
                      label="Filtrar por Severidad"
                      onChange={(e) => setFilterAlertSeverity(e.target.value)}
                    >
                      <MenuItem value="">Todas</MenuItem>
                      <MenuItem value="Crítico">Crítico</MenuItem>
                      <MenuItem value="Advertencia">Advertencia</MenuItem>
                      <MenuItem value="Info">Información</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Filtrar por Estado</InputLabel>
                    <Select
                      value={filterAlertStatus}
                      label="Filtrar por Estado"
                      onChange={(e) => setFilterAlertStatus(e.target.value)}
                    >
                      <MenuItem value="">Todos</MenuItem>
                      <MenuItem value="Activo">Activo</MenuItem>
                      <MenuItem value="Resuelto">Resuelto</MenuItem>
                      <MenuItem value="Pendiente">Pendiente</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 600 }}>
                <Table stickyHeader size="small">
                  <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, width: '15%' }}>Timestamp</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '15%' }}>Tipo</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '30%' }}>Descripción del Incidente</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '10%' }}>Severidad</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '10%' }}>Asignado a</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '10%' }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '10%', textAlign: 'center' }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredIncidentAlerts.length > 0 ? (
                      filteredIncidentAlerts.map((alert) => (
                        <TableRow key={alert.id} sx={{ bgcolor: alert.severity === 'Crítico' ? '#ffebee' : (alert.severity === 'Advertencia' ? '#fffde7' : 'inherit') }}>
                          <TableCell>{alert.timestamp}</TableCell>
                          <TableCell><Chip label={alert.type} size="small" variant="outlined" color="primary" /></TableCell>
                          <TableCell>{alert.description}</TableCell>
                          <TableCell><Box display="flex" alignItems="center">{severityIcons[alert.severity]} {alert.severity}</Box></TableCell>
                          <TableCell>{alert.assignedTo}</TableCell>
                          <TableCell>{incidentStatusChips[alert.status]}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            {alert.status === 'Activo' || alert.status === 'Pendiente' ? (
                              <Tooltip title="Marcar como Resuelto">
                                <IconButton size="small" onClick={() => handleResolveIncident(alert.id)}>
                                  <DoneAllIcon color="success" />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Tooltip title="Ver Detalles"><IconButton size="small"><SearchIcon color="action" /></IconButton></Tooltip>
                            )}
                            <Tooltip title="Asignar / Reasignar"><IconButton size="small"><GroupIcon color="info" /></IconButton></Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={7} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No se encontraron alertas o incidentes para los filtros seleccionados.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                Mostrando {filteredIncidentAlerts.length} de {incidentAlerts.length} incidentes.
              </Typography>
              <Alert severity="error" sx={{ mt: 3 }}>
                **¡Atención!** Incidentes críticos requieren acción inmediata para mitigar riesgos.
              </Alert>
            </Paper>
          )}

          {/* Tab: Políticas de Seguridad */}
          {currentTab === 'policies' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <PolicyIcon sx={{ color: '#2196f3', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Políticas de Seguridad para Usuarios y Sistema
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => setOpenAddPolicyDialog(true)} sx={{ textTransform: 'none' }}>
                  Crear Nueva Política
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 500 }}>
                <Table stickyHeader size="small">
                  <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Nombre de la Política</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Descripción</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Aplicable a</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Aplicación</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {securityPolicies.map((policy) => (
                      <TableRow key={policy.id}>
                        <TableCell>{policy.name}</TableCell>
                        <TableCell>{policy.description}</TableCell>
                        <TableCell><Chip label={policy.target} size="small" variant="outlined" /></TableCell>
                        <TableCell>{policy.enforcement}</TableCell>
                        <TableCell>{policyStatusChips[policy.status]}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Tooltip title="Editar Política"><IconButton size="small"><EditIcon color="info" /></IconButton></Tooltip>
                          <Tooltip title="Desactivar Política"><IconButton size="small"><BlockIcon color="warning" /></IconButton></Tooltip>
                          <Tooltip title="Eliminar Política"><IconButton size="small"><DeleteIcon color="error" /></IconButton></Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Alert severity="info" sx={{ mt: 3 }}>
                Las políticas de seguridad son fundamentales para definir y hacer cumplir el comportamiento seguro en la plataforma.
              </Alert>
            </Paper>
          )}

          {/* Tab: Reglas de Prevención */}
          {currentTab === 'prevention_rules' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <ShieldIcon sx={{ color: '#4caf50', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Reglas de Detección y Prevención de Amenazas
                </Typography>
                <Button variant="outlined" startIcon={<CodeIcon />} sx={{ textTransform: 'none', mr: 1 }}>
                  Gestionar Reglas Personalizadas
                </Button>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} sx={{ textTransform: 'none', bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}>
                  Añadir Regla
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 500 }}>
                <Table stickyHeader size="small">
                  <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Nombre de la Regla</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Descripción</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Tipo</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Última Actualización</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {preventionRules.map((rule) => (
                      <TableRow key={rule.id}>
                        <TableCell>{rule.name}</TableCell>
                        <TableCell>{rule.description}</TableCell>
                        <TableCell><Chip label={rule.type} size="small" variant="outlined" color="secondary" /></TableCell>
                        <TableCell>{rule.lastUpdated}</TableCell>
                        <TableCell>{ruleStatusChips[rule.status]}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Tooltip title="Editar Regla"><IconButton size="small"><EditIcon color="info" /></IconButton></Tooltip>
                          <Tooltip title="Desactivar Regla"><IconButton size="small"><BlockIcon color="warning" /></IconButton></Tooltip>
                          <Tooltip title="Eliminar Regla"><IconButton size="small"><DeleteIcon color="error" /></IconButton></Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Alert severity="success" sx={{ mt: 3 }}>
                Estas reglas son la primera línea de defensa para identificar y mitigar amenazas.
              </Alert>
            </Paper>
          )}

          {/* Tab: Informes de Auditoría */}
          {currentTab === 'audit_reports' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <BugReportIcon sx={{ color: '#ff9800', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Informes y Auditorías de Seguridad
                </Typography>
                <Button variant="contained" startIcon={<ScheduleIcon />} sx={{ textTransform: 'none', mr: 1 }}>
                  Programar Auditoría
                </Button>
                <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ textTransform: 'none' }}>
                  Exportar Informes
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 500 }}>
                <Table stickyHeader size="small">
                  <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Fecha</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Tipo de Auditoría</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Hallazgos Clave</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Severidad</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Reporte</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {auditReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.findings}</TableCell>
                        <TableCell><Box display="flex" alignItems="center">{severityIcons[report.severity]} {report.severity}</Box></TableCell>
                        <TableCell>{auditStatusChips[report.status]}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Tooltip title="Descargar Reporte"><IconButton size="small" href={report.reportLink} target="_blank" rel="noopener noreferrer"><DownloadIcon color="primary" /></IconButton></Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Alert severity="warning" sx={{ mt: 3 }}>
                Revisa periódicamente los informes de auditoría para asegurar el cumplimiento y la resiliencia del sistema.
              </Alert>
            </Paper>
          )}
        </Box>
      </Container>

      {/* Dialog para Crear Nueva Política */}
      <Dialog open={openAddPolicyDialog} onClose={() => setOpenAddPolicyDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>
          Crear Nueva Política de Seguridad
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre de la Política"
            type="text"
            fullWidth
            variant="outlined"
            name="name"
            value={newPolicyData.name}
            onChange={(e) => setNewPolicyData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Descripción Detallada"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            name="description"
            value={newPolicyData.description}
            onChange={(e) => setNewPolicyData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel>Aplicable a (Target)</InputLabel>
            <Select
              value={newPolicyData.target}
              label="Aplicable a (Target)"
              name="target"
              onChange={(e) => setNewPolicyData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            >
              <MenuItem value="Todos los Usuarios">Todos los Usuarios</MenuItem>
              <MenuItem value="Roles Específicos">Roles Específicos</MenuItem>
              <MenuItem value="Sistema">Sistema</MenuItem>
              <MenuItem value="Desarrolladores">Desarrolladores</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel>Tipo de Aplicación</InputLabel>
            <Select
              value={newPolicyData.enforcement}
              label="Tipo de Aplicación"
              name="enforcement"
              onChange={(e) => setNewPolicyData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            >
              <MenuItem value="Automático">Automático</MenuItem>
              <MenuItem value="Manual/Auditoría">Manual/Auditoría</MenuItem>
              <MenuItem value="Semi-Automático">Semi-Automático</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={newPolicyData.status === 'Activo'}
                onChange={(e) => setNewPolicyData(prev => ({ ...prev, status: e.target.checked ? 'Activo' : 'Inactivo' }))}
                name="status"
                color="primary"
              />
            }
            label="Política Activa"
            sx={{ mb: 2 }}
          />
          <Alert severity="info" sx={{ mt: 2 }}>
            Las políticas definidas aquí serán la base para las reglas de prevención y los controles de acceso.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddPolicyDialog(false)} color="secondary">Cancelar</Button>
          <Button onClick={handleAddPolicy} variant="contained" color="primary">
            Crear Política
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

export default MonitoringPreventionPanel;