import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Grid, Paper, Chip,
  LinearProgress, CircularProgress, Alert, AlertTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, IconButton, Tooltip, Divider, List, ListItem, ListItemText, AppBar, Toolbar,
} from '@mui/material';

// --- Iconos para cada sección ---
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'; // Icono principal de monitoreo
import DevicesOtherIcon from '@mui/icons-material/DevicesOther'; // PRTG
import EventNoteIcon from '@mui/icons-material/EventNote'; // Logs de eventos
import LanIcon from '@mui/icons-material/Lan'; // Redes
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'; // SLA
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'; // Alertas
import SettingsIcon from '@mui/icons-material/Settings'; // Umbrales
import RefreshIcon from '@mui/icons-material/Refresh'; // Refrescar
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import HomeIcon from '@mui/icons-material/Home';


// --- Componente principal del Panel de Monitoreo ---
function RealtimeMonitoring({ onGoToHome }) { // Asumo que recibirás esta prop para volver al inicio
  const [prtgStatus, setPrtgStatus] = useState('active'); // 'active', 'inactive', 'alert'
  const [networkHealth, setNetworkHealth] = useState(85); // % de salud de la red
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [logEntries, setLogEntries] = useState([]);
  const [slaCompliance, setSlaCompliance] = useState(99.8); // % de cumplimiento SLA
  const [isMonitoringActive, setIsMonitoringActive] = useState(true); // Control de monitoreo


  // Simulación de datos en tiempo real y alertas
  useEffect(() => {
    // Función para generar una alerta aleatoria
    const generateRandomAlert = () => {
      const issues = [
        "Uso de CPU alto en Servidor Web-01",
        "Pérdida de paquetes en Enlace Principal",
        "Espacio en disco bajo en DB Server-03",
        "Servicio de autenticación inactivo en DC-02",
        "Tráfico de red anómalo detectado",
        "Temperatura elevada en Rack de Servidores C",
      ];
      const severities = ['error', 'warning'];
      const randomIssue = issues[Math.floor(Math.random() * issues.length)];
      const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
      const timestamp = new Date().toLocaleTimeString('es-CO');

      return {
        id: Date.now(),
        message: `${timestamp}: ${randomIssue}`,
        severity: randomSeverity,
      };
    };

    // Simulación de logs
    const generateRandomLog = () => {
      const actions = [
        "User 'admin' logged in.",
        "System update completed successfully.",
        "Attempted login failed for 'guest'.",
        "Firewall rule updated by 'network_team'.",
        "Database backup started.",
        "Sensor 'temp_rack_A' reported 25°C.",
      ];
      const levels = ['INFO', 'WARNING', 'ERROR'];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const randomLevel = levels[Math.floor(Math.random() * levels.length)];
      const timestamp = new Date().toLocaleString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      return {
        id: Date.now(),
        timestamp: timestamp,
        level: randomLevel,
        message: randomAction,
      };
    };


    let alertInterval;
    let logInterval;
    let dataInterval;

    if (isMonitoringActive) {
      // Simulación de alertas (cada 5-15 segundos)
      alertInterval = setInterval(() => {
        if (Math.random() < 0.3) { // 30% de probabilidad de nueva alerta
          setActiveAlerts(prev => [generateRandomAlert(), ...prev.slice(0, 4)]); // Mantener las últimas 5
        }
      }, Math.random() * 10000 + 5000); // Entre 5 y 15 segundos

      // Simulación de logs (cada 1-3 segundos)
      logInterval = setInterval(() => {
        setLogEntries(prev => [generateRandomLog(), ...prev.slice(0, 9)]); // Mantener los últimos 10
      }, Math.random() * 2000 + 1000); // Entre 1 y 3 segundos

      // Simulación de cambios de datos (cada 2-7 segundos)
      dataInterval = setInterval(() => {
        setPrtgStatus(Math.random() > 0.9 ? 'alert' : (Math.random() > 0.7 ? 'inactive' : 'active'));
        setNetworkHealth(Math.min(100, Math.max(70, networkHealth + (Math.random() > 0.5 ? 2 : -2))));
        setSlaCompliance(Math.min(100, Math.max(98.5, slaCompliance + (Math.random() > 0.5 ? 0.05 : -0.05))));
      }, Math.random() * 5000 + 2000); // Entre 2 y 7 segundos

    } else {
      clearInterval(alertInterval);
      clearInterval(logInterval);
      clearInterval(dataInterval);
    }


    return () => {
      clearInterval(alertInterval);
      clearInterval(logInterval);
      clearInterval(dataInterval);
    };
  }, [isMonitoringActive, networkHealth, slaCompliance]); // Dependencias para simulación

  const getPrtgStatusChip = () => {
    switch (prtgStatus) {
      case 'active':
        return <Chip label="Operativo" color="success" size="small" />;
      case 'inactive':
        return <Chip label="Inactivo" color="warning" size="small" />;
      case 'alert':
        return <Chip label="Alerta" color="error" size="small" />;
      default:
        return <Chip label="Desconocido" size="small" />;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#0d0d0d', minHeight: '100vh', color: 'text.primary', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#1a1a1a', borderBottom: '1px solid rgba(129, 212, 250, 0.1)' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2 }}>
                <HomeIcon /> {/* Asegúrate de que HomeIcon esté importado o disponible */}
              </IconButton>
            </Tooltip>
          )}
          <MonitorHeartIcon sx={{ fontSize: 36, mr: 1, color: 'primary.light' }} />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.08em' }}>
            Monitoreo en Tiempo Real
          </Typography>
          <Tooltip title={isMonitoringActive ? "Pausar Monitoreo" : "Reanudar Monitoreo"}>
            <IconButton color="inherit" onClick={() => setIsMonitoringActive(!isMonitoringActive)}>
              {isMonitoringActive ? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Refrescar Datos">
            <IconButton color="inherit" onClick={() => window.location.reload()}> {/* Simple refresh para demo */}
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'primary.light' }}>
            Estado Operacional del Data Center
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Visión unificada y alertas inmediatas para la gestión de infraestructura.
          </Typography>
        </Box>

        {/* Sección de Alertas Activas */}
        <Paper elevation={8} sx={{ p: 4, mb: 4, bgcolor: '#2a0b0d', border: '1px solid #ef5350' }}>
          <Box display="flex" alignItems="center" mb={2}>
            <NotificationsActiveIcon sx={{ color: 'error.main', fontSize: 30, mr: 1 }} />
            <Typography variant="h5" sx={{ color: 'error.light', fontWeight: 600 }}>
              Alertas Activas ({activeAlerts.length})
            </Typography>
          </Box>
          <Divider sx={{ mb: 2, bgcolor: 'rgba(239, 83, 80, 0.3)' }} />
          {activeAlerts.length === 0 ? (
            <Alert severity="success" variant="outlined" sx={{ bgcolor: 'rgba(105, 240, 174, 0.1)', borderColor: 'success.main' }}>
              <AlertTitle>Todo en orden</AlertTitle>
              No hay alertas críticas ni advertencias en este momento.
            </Alert>
          ) : (
            <List dense sx={{ maxHeight: 150, overflowY: 'auto' }}>
              {activeAlerts.map(alert => (
                <ListItem key={alert.id} sx={{ mb: 1, borderLeft: `4px solid ${alert.severity === 'error' ? '#ef5350' : '#ffab40'}`, p: 1, bgcolor: 'rgba(0,0,0,0.2)' }}>
                  <Chip label={alert.severity.toUpperCase()} color={alert.severity} size="small" sx={{ mr: 1 }} />
                  <ListItemText primary={alert.message} primaryTypographyProps={{ variant: 'body2', sx: { color: alert.severity === 'error' ? 'error.light' : 'warning.light' } }} />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>

        <Grid container spacing={4}>
          {/* PRTG Integration */}
          <Grid item xs={12} md={6} lg={4}>
            <Paper elevation={8} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#1e1e1e' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <DevicesOtherIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1 }}>Integración PRTG</Typography>
                {getPrtgStatusChip()}
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Estado del sensor principal:
              </Typography>
              <LinearProgress
                variant="determinate"
                value={prtgStatus === 'active' ? 100 : (prtgStatus === 'inactive' ? 50 : 20)}
                color={prtgStatus === 'active' ? 'success' : (prtgStatus === 'inactive' ? 'warning' : 'error')}
                sx={{ height: 10, borderRadius: 5, mb: 2 }}
              />
              <Typography variant="caption" color="text.secondary">
                Última actualización: {new Date().toLocaleTimeString('es-CO')}
              </Typography>
              <Button variant="outlined" startIcon={<KeyboardArrowRightIcon />} sx={{ mt: 'auto', alignSelf: 'flex-end', borderColor: 'primary.main', color: 'primary.main' }}>
                Ver Detalles en PRTG
              </Button>
            </Paper>
          </Grid>

          {/* Network Infrastructure Status */}
          <Grid item xs={12} md={6} lg={4}>
            <Paper elevation={8} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#1e1e1e' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <LanIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1 }}>Estado de Redes</Typography>
                <Chip label={`${networkHealth}% Salud`} color={networkHealth > 90 ? 'success' : (networkHealth > 80 ? 'warning' : 'error')} size="small" />
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Rendimiento general de la red:
              </Typography>
              <Box sx={{ position: 'relative', display: 'inline-flex', alignSelf: 'center', my: 2 }}>
                <CircularProgress
                  variant="determinate"
                  value={networkHealth}
                  size={100}
                  thickness={5}
                  color={networkHealth > 90 ? 'success' : (networkHealth > 80 ? 'warning' : 'error')}
                />
                <Box
                  sx={{
                    top: 0, left: 0, bottom: 0, right: 0,
                    position: 'absolute', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Typography variant="h5" component="div" color="text.primary">
                    {`${Math.round(networkHealth)}%`}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="caption" color="text.secondary" align="center">
                Dispositivos activos: 120/125
              </Typography>
              <Button variant="outlined" startIcon={<KeyboardArrowRightIcon />} sx={{ mt: 'auto', alignSelf: 'flex-end', borderColor: 'primary.main', color: 'primary.main' }}>
                Detalle de Dispositivos
              </Button>
            </Paper>
          </Grid>

          {/* SLA Compliance */}
          <Grid item xs={12} md={6} lg={4}>
            <Paper elevation={8} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#1e1e1e' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <VerifiedUserIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1 }}>Cumplimiento SLA</Typography>
                <Chip label={`${slaCompliance.toFixed(2)}%`} color={slaCompliance > 99.5 ? 'success' : 'warning'} size="small" />
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Disponibilidad de servicios críticos:
              </Typography>
              <Box sx={{ position: 'relative', display: 'inline-flex', alignSelf: 'center', my: 2 }}>
                <CircularProgress
                  variant="determinate"
                  value={slaCompliance}
                  size={100}
                  thickness={5}
                  color={slaCompliance > 99.5 ? 'success' : 'warning'}
                />
                <Box
                  sx={{
                    top: 0, left: 0, bottom: 0, right: 0,
                    position: 'absolute', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Typography variant="h5" component="div" color="text.primary">
                    {`${slaCompliance.toFixed(1)}%`}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="caption" color="text.secondary" align="center">
                Último período de reporte: Mes en curso
              </Typography>
              <Button variant="outlined" startIcon={<KeyboardArrowRightIcon />} sx={{ mt: 'auto', alignSelf: 'flex-end', borderColor: 'primary.main', color: 'primary.main' }}>
                Reportes SLA
              </Button>
            </Paper>
          </Grid>

          {/* Logs de Eventos Recientes */}
          <Grid item xs={12} lg={12}>
            <Paper elevation={8} sx={{ p: 3, bgcolor: '#1e1e1e' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <EventNoteIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1 }}>Logs de Eventos Recientes</Typography>
                <Button variant="outlined" startIcon={<KeyboardArrowRightIcon />} size="small" sx={{ borderColor: 'primary.main', color: 'primary.main' }}>
                  Ver Todos los Logs
                </Button>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <TableContainer sx={{ maxHeight: 300, overflowY: 'auto', border: '1px solid rgba(129, 212, 250, 0.1)', borderRadius: 2 }}>
                <Table stickyHeader size="small">
                  <TableHead sx={{ bgcolor: '#282828' }}>
                    <TableRow>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 600, borderBottom: '1px solid rgba(129, 212, 250, 0.2)' }}>Timestamp</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 600, borderBottom: '1px solid rgba(129, 212, 250, 0.2)' }}>Nivel</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 600, borderBottom: '1px solid rgba(129, 212, 250, 0.2)' }}>Mensaje</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {logEntries.map((log) => (
                      <TableRow
                        key={log.id}
                        sx={{
                          '&:nth-of-type(odd)': { bgcolor: 'rgba(0,0,0,0.1)' },
                          '&:hover': { bgcolor: 'rgba(129, 212, 250, 0.05)' },
                        }}
                      >
                        <TableCell sx={{ color: 'text.primary', borderBottom: '1px solid rgba(129, 212, 250, 0.05)' }}>{log.timestamp}</TableCell>
                        <TableCell sx={{ borderBottom: '1px solid rgba(129, 212, 250, 0.05)' }}>
                          <Chip
                            label={log.level}
                            color={log.level === 'ERROR' ? 'error' : (log.level === 'WARNING' ? 'warning' : 'info')}
                            size="small"
                          />
                        </TableCell>
                        <TableCell sx={{ color: 'text.primary', borderBottom: '1px solid rgba(129, 212, 250, 0.05)' }}>{log.message}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {logEntries.length === 0 && (
                  <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                    No hay registros de logs recientes.
                  </Typography>
                )}
              </TableContainer>
            </Paper>
          </Grid>

          {/* Alertas y Umbrales Definidos (Sección de Configuración) */}
          <Grid item xs={12}>
            <Paper elevation={8} sx={{ p: 3, bgcolor: '#1e1e1e' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <SettingsIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1 }}>Alertas y Umbrales Definidos</Typography>
                <Button variant="outlined" startIcon={<KeyboardArrowRightIcon />} size="small" sx={{ borderColor: 'primary.main', color: 'primary.main' }}>
                  Gestionar Umbrales
                </Button>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Configuración de Alertas</Typography>
                  <List dense>
                    <ListItem><ListItemText primary="Uso de CPU > 90% por 5 min (Crítico)" secondary="Servidores, VM's" /></ListItem>
                    <ListItem><ListItemText primary="Espacio en Disco < 10% (Advertencia)" secondary="Almacenamiento, Servidores" /></ListItem>
                    <ListItem><ListItemText primary="Pérdida de Paquetes > 5% (Crítico)" secondary="Enlaces de Red" /></ListItem>
                    <ListItem><ListItemText primary="Servicio Esencial Inactivo (Crítico)" secondary="Servicios específicos" /></ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Canales de Notificación</Typography>
                  <List dense>
                    <ListItem><ListItemText primary="Email: equipo.ops@datacenter.com" secondary="Alertas Críticas y Advertencias" /></ListItem>
                    <ListItem><ListItemText primary="SMS: +57 3XX-XXXX-XXX" secondary="Alertas Críticas" /></ListItem>
                    <ListItem><ListItemText primary="Webhook: Slack #ops-alerts" secondary="Todas las alertas" /></ListItem>
                  </List>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

export default RealtimeMonitoring;