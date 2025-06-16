import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Grid, Paper, Chip, Divider,
  LinearProgress, CircularProgress, Alert, AlertTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, IconButton, Tooltip, AppBar, Toolbar,
  Accordion, AccordionSummary, AccordionDetails,
  List, ListItem, ListItemText, ListItemIcon
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home'; // Para volver al inicio
import SyncIcon from '@mui/icons-material/Sync'; // Icono principal de Continuidad Operativa
import BackupIcon from '@mui/icons-material/Backup'; // Backup
import RestoreIcon from '@mui/icons-material/Restore'; // Restauración
import ScienceIcon from '@mui/icons-material/Science'; // Pruebas de recuperación
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate'; // Gestión de Incidentes
import DescriptionIcon from '@mui/icons-material/Description'; // Registro de Incidentes
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; // Resolución
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Para Accordion
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Añadir
import DoneAllIcon from '@mui/icons-material/DoneAll'; // Éxito
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Advertencia
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Error
import ScheduleIcon from '@mui/icons-material/Schedule'; // Tiempo

// --- Datos Simulados ---
const simulatedBackups = [
  { id: 'BKP001', system: 'ERP Database', lastBackup: '2025-06-11 03:00', status: 'Éxito', type: 'Completo', size: '500 GB' },
  { id: 'BKP002', system: 'Web Servers Prod', lastBackup: '2025-06-11 01:00', status: 'Éxito', type: 'Incremental', size: '120 GB' },
  { id: 'BKP003', system: 'CRM Application', lastBackup: '2025-06-10 23:00', status: 'Fallo', type: 'Completo', size: 'N/A', error: 'Error de conexión con target.' },
  { id: 'BKP004', system: 'Fileshare Prod', lastBackup: '2025-06-11 00:00', status: 'Éxito con Advertencias', type: 'Diferencial', size: '300 GB', warning: 'Archivos bloqueados durante el proceso.' },
];

const simulatedRecoveryTests = [
  { id: 'DRT001', plan: 'DR Plan A (ERP)', date: '2025-05-15', result: 'Éxito', rto: '2h 15m', rpo: '30m', notes: 'Prueba de recuperación completa, RTO y RPO dentro de objetivos.' },
  { id: 'DRT002', plan: 'DR Plan B (Web)', date: '2025-04-20', result: 'Fallo Parcial', rto: '4h 00m', rpo: '1h 00m', notes: 'Fallo en la sincronización de datos, RTO excedido.' },
  { id: 'DRT003', plan: 'DR Plan C (CRM)', date: '2025-03-10', result: 'Éxito', rto: '1h 50m', rpo: '15m', notes: 'Simulacro de failover exitoso.' },
];

const simulatedIncidents = [
  { id: 'INC001', title: 'Caída de Servidor de Base de Datos Principal', status: 'Resuelto', severity: 'Crítico', reported: '2025-06-10 10:30', resolved: '2025-06-10 12:45', assigned: 'Equipo Infra', description: 'El servidor DB-PROD-01 se apagó inesperadamente.', resolution: 'Reiniciando el servidor y aplicando parches de estabilidad.' },
  { id: 'INC002', title: 'Degradación de Rendimiento en App Web', status: 'En Curso', severity: 'Alto', reported: '2025-06-11 09:00', assigned: 'Equipo Desarrollo', description: 'Usuarios reportan lentitud extrema al cargar la aplicación.', resolution: 'Investigando picos de carga en el balanceador.' },
  { id: 'INC003', title: 'Alerta de Disco Lleno en Servidor de Logs', status: 'Resuelto', severity: 'Medio', reported: '2025-06-09 15:20', resolved: '2025-06-09 16:00', assigned: 'Equipo Ops', description: 'Partición /var/log al 95% de capacidad.', resolution: 'Se eliminaron logs antiguos y se ajustó la rotación.' },
  { id: 'INC004', title: 'Fallo de Conexión VPN Cliente X', status: 'Escalado', severity: 'Bajo', reported: '2025-06-11 14:00', assigned: 'Equipo Redes', description: 'Cliente X no puede establecer conexión VPN desde sus oficinas.' },
];

function OperationalContinuity({ onGoToHome }) {
  const [lastSuccessfulBackup, setLastSuccessfulBackup] = useState('');
  const [rtoCompliance, setRtoCompliance] = useState(0); // % de cumplimiento de RTO
  const [incidentsOpen, setIncidentsOpen] = useState(0);

  useEffect(() => {
    // Calcular el último backup exitoso
    const latestSuccess = simulatedBackups
      .filter(b => b.status === 'Éxito')
      .sort((a, b) => new Date(b.lastBackup) - new Date(a.lastBackup))[0];
    setLastSuccessfulBackup(latestSuccess ? latestSuccess.lastBackup : 'N/A');

    // Calcular el cumplimiento de RTO
    const successfulTests = simulatedRecoveryTests.filter(t => t.result === 'Éxito').length;
    setRtoCompliance((successfulTests / simulatedRecoveryTests.length) * 100 || 0);

    // Contar incidentes abiertos
    setIncidentsOpen(simulatedIncidents.filter(inc => inc.status !== 'Resuelto').length);
  }, []);

  const getSeverityChip = (severity) => {
    switch (severity) {
      case 'Crítico': return <Chip label="Crítico" color="error" size="small" />;
      case 'Alto': return <Chip label="Alto" sx={{ bgcolor: 'orange', color: 'white' }} size="small" />; // Custom orange
      case 'Medio': return <Chip label="Medio" color="warning" size="small" />;
      case 'Bajo': return <Chip label="Bajo" color="info" size="small" />;
      default: return <Chip label="Desconocida" size="small" />;
    }
  };

  const getIncidentStatusChip = (status) => {
    switch (status) {
      case 'Resuelto': return <Chip label="Resuelto" color="success" size="small" />;
      case 'En Curso': return <Chip label="En Curso" color="primary" size="small" />;
      case 'Escalado': return <Chip label="Escalado" color="warning" size="small" />;
      default: return <Chip label="Desconocido" size="small" />;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#eef2f6', minHeight: '100vh', color: '#b32222', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#004a8f', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2 }}>
                <HomeIcon sx={{ color: '#424242' }} />
              </IconButton>
            </Tooltip>
          )}
          <SyncIcon sx={{ fontSize: 36, mr: 1, color: '#ffffff' }} />
          <Typography variant="h3" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Continuidad Operativa
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#004a8f' }}>
            Resiliencia y Respuesta de la Infraestructura
          </Typography>
          <Typography variant="h6" color="#616161">
            Gestión integral de Backups, Recuperación ante Desastres e Incidentes Técnicos.
          </Typography>
        </Box>

        {/* Sección de Backups & Disaster Recovery */}
        <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
          <Box display="flex" alignItems="center" mb={2}>
            <BackupIcon sx={{ color: '#1976d2', fontSize: 30, mr: 1 }} />
            <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
              Backup & Disaster Recovery
            </Typography>
            <Button variant="contained" startIcon={<AddCircleOutlineIcon />} color="primary" sx={{ textTransform: 'none' }}>
              Programar Backup
            </Button>
          </Box>
          <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

          <Grid container spacing={3}>
            {/* Resumen de Backups */}
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderColor: '#bdbdbd' }}>
                <Box display="flex" alignItems="center" mb={1}>
                  <BackupIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="h6" sx={{ flexGrow: 1, color: '#424242' }}>Estado de Backups</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" color="#616161">
                  Último backup exitoso:
                  <Typography component="span" variant="body1" sx={{ fontWeight: 600, ml: 1, color: '#333' }}>
                    {lastSuccessfulBackup || 'N/A'}
                  </Typography>
                </Typography>
                <Box sx={{ my: 2 }}>
                  <Typography variant="body2" color="#616161">Backups Exitosos (24h)</Typography>
                  <LinearProgress variant="determinate" value={75} color="success" sx={{ height: 10, borderRadius: 5 }} />
                  <Typography variant="caption" color="#616161">3 de 4 programados con éxito</Typography>
                </Box>
                <Button variant="text" startIcon={<RestoreIcon />} sx={{ mt: 'auto', alignSelf: 'flex-start', color: '#1976d2' }}>
                  Gestionar Restauraciones
                </Button>
              </Paper>
            </Grid>

            {/* Resumen de Pruebas DR */}
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderColor: '#bdbdbd' }}>
                <Box display="flex" alignItems="center" mb={1}>
                  <ScienceIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="h6" sx={{ flexGrow: 1, color: '#424242' }}>Pruebas de Recuperación</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" color="#616161">
                  Cumplimiento de RTO:
                  <Typography component="span" variant="body1" sx={{ fontWeight: 600, ml: 1, color: '#333' }}>
                    {rtoCompliance.toFixed(1)}%
                  </Typography>
                </Typography>
                <Box sx={{ position: 'relative', display: 'inline-flex', alignSelf: 'center', my: 2 }}>
                  <CircularProgress
                    variant="determinate"
                    value={rtoCompliance}
                    size={80}
                    thickness={5}
                    color={rtoCompliance > 90 ? 'success' : 'warning'}
                  />
                  <Box
                    sx={{
                      top: 0, left: 0, bottom: 0, right: 0,
                      position: 'absolute', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h6" component="div" color="#424242">
                      {`${rtoCompliance.toFixed(0)}%`}
                    </Typography>
                  </Box>
                </Box>
                <Button variant="text" startIcon={<ScienceIcon />} sx={{ mt: 'auto', alignSelf: 'flex-start', color: '#1976d2' }}>
                  Ver Historial de Pruebas
                </Button>
              </Paper>
            </Grid>

            {/* Listado de Backups Automáticos */}
            <Grid item xs={12}>
              <Accordion elevation={2} sx={{ bgcolor: '#f8f9fa', border: '1px solid #e0e0e0' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#424242' }} />} aria-controls="backups-content" id="backups-header">
                  <BackupIcon sx={{ color: '#1976d2', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#333' }}>Backups Automáticos Recientes</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  <TableContainer sx={{ maxHeight: 300, overflowY: 'auto' }}>
                    <Table size="small">
                      <TableHead sx={{ bgcolor: '#e0e0e0' }}>
                        <TableRow>
                          <TableCell sx={{ color: '#424242', fontWeight: 600 }}>ID</TableCell>
                          <TableCell sx={{ color: '#424242', fontWeight: 600 }}>Sistema</TableCell>
                          <TableCell sx={{ color: '#424242', fontWeight: 600 }}>Último Backup</TableCell>
                          <TableCell sx={{ color: '#424242', fontWeight: 600 }}>Tipo</TableCell>
                          <TableCell sx={{ color: '#424242', fontWeight: 600 }}>Tamaño</TableCell>
                          <TableCell sx={{ color: '#424242', fontWeight: 600 }}>Estado</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {simulatedBackups.map((backup) => (
                          <TableRow key={backup.id} sx={{ '&:hover': { bgcolor: '#f0f0f0' } }}>
                            <TableCell sx={{ color: '#333' }}>{backup.id}</TableCell>
                            <TableCell sx={{ color: '#333' }}>{backup.system}</TableCell>
                            <TableCell sx={{ color: '#333' }}>{backup.lastBackup}</TableCell>
                            <TableCell sx={{ color: '#333' }}>{backup.type}</TableCell>
                            <TableCell sx={{ color: '#333' }}>{backup.size}</TableCell>
                            <TableCell>
                              <Chip
                                label={backup.status}
                                color={backup.status === 'Éxito' ? 'success' : (backup.status === 'Fallo' ? 'error' : 'warning')}
                                size="small"
                              />
                              {backup.error && <Tooltip title={backup.error}><ErrorOutlineIcon fontSize="small" color="error" sx={{ ml: 0.5 }} /></Tooltip>}
                              {backup.warning && <Tooltip title={backup.warning}><WarningAmberIcon fontSize="small" color="warning" sx={{ ml: 0.5 }} /></Tooltip>}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            </Grid>

            {/* Listado de Pruebas de Recuperación */}
            <Grid item xs={12}>
              <Accordion elevation={2} sx={{ bgcolor: '#f8f9fa', border: '1px solid #e0e0e0' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#424242' }} />} aria-controls="recovery-tests-content" id="recovery-tests-header">
                  <RestoreIcon sx={{ color: '#1976d2', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#333' }}>Historial de Pruebas de Recuperación</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  <TableContainer sx={{ maxHeight: 300, overflowY: 'auto' }}>
                    <Table size="small">
                      <TableHead sx={{ bgcolor: '#e0e0e0' }}>
                        <TableRow>
                          <TableCell sx={{ color: '#424242', fontWeight: 600 }}>ID</TableCell>
                          <TableCell sx={{ color: '#424242', fontWeight: 600 }}>Plan DR</TableCell>
                          <TableCell sx={{ color: '#424242', fontWeight: 600 }}>Fecha Prueba</TableCell>
                          <TableCell sx={{ color: '#424242', fontWeight: 600 }}>Resultado</TableCell>
                          <TableCell sx={{ color: '#424242', fontWeight: 600 }}>RTO (real)</TableCell>
                          <TableCell sx={{ color: '#424242', fontWeight: 600 }}>RPO (real)</TableCell>
                          <TableCell sx={{ color: '#424242', fontWeight: 600 }}>Notas</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {simulatedRecoveryTests.map((test) => (
                          <TableRow key={test.id} sx={{ '&:hover': { bgcolor: '#f0f0f0' } }}>
                            <TableCell sx={{ color: '#333' }}>{test.id}</TableCell>
                            <TableCell sx={{ color: '#333' }}>{test.plan}</TableCell>
                            <TableCell sx={{ color: '#333' }}>{test.date}</TableCell>
                            <TableCell>
                              <Chip
                                label={test.result}
                                color={test.result === 'Éxito' ? 'success' : 'error'}
                                size="small"
                              />
                            </TableCell>
                            <TableCell sx={{ color: '#333' }}>{test.rto}</TableCell>
                            <TableCell sx={{ color: '#333' }}>{test.rpo}</TableCell>
                            <TableCell sx={{ color: '#333' }}>{test.notes}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Paper>

        {/* Sección de Gestión de Incidentes Técnicos */}
        <Paper elevation={4} sx={{ p: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
          <Box display="flex" alignItems="center" mb={2}>
            <AssignmentLateIcon sx={{ color: '#1976d2', fontSize: 30, mr: 1 }} />
            <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
              Gestión de Incidentes Técnicos
            </Typography>
            <Button variant="contained" startIcon={<AddCircleOutlineIcon />} color="primary" sx={{ textTransform: 'none' }}>
              Registrar Incidente
            </Button>
          </Box>
          <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

          <Grid container spacing={3}>
            {/* Resumen de Incidentes */}
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderColor: '#bdbdbd' }}>
                <Box display="flex" alignItems="center" mb={1}>
                  <AssignmentLateIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="h6" sx={{ flexGrow: 1, color: '#424242' }}>Incidentes Abiertos</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h4" sx={{ color: incidentsOpen > 0 ? '#d32f2f' : '#388e3c', mb: 1 }}>
                  {incidentsOpen}
                  <Typography component="span" variant="body1" sx={{ ml: 1, color: '#616161' }}>
                    incidentes pendientes
                  </Typography>
                </Typography>
                <List dense>
                  {simulatedIncidents.filter(inc => inc.status !== 'Resuelto').slice(0, 3).map(inc => (
                    <ListItem key={inc.id} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 35 }}>
                        {inc.severity === 'Crítico' ? <ErrorOutlineIcon color="error" /> : inc.severity === 'Alto' ? <WarningAmberIcon sx={{ color: 'orange' }} /> : <ScheduleIcon color="info" />}
                      </ListItemIcon>
                      <ListItemText
                        primary={<Typography variant="body2" sx={{ color: '#333', fontWeight: 500 }}>{inc.id}: {inc.title}</Typography>}
                        secondary={<Typography variant="caption" color="#616161">Asignado a: {inc.assigned}</Typography>}
                      />
                      {getIncidentStatusChip(inc.status)}
                    </ListItem>
                  ))}
                  {incidentsOpen === 0 && (
                    <Typography variant="body2" color="#616161" sx={{ fontStyle: 'italic' }}>
                      ¡Excelente! No hay incidentes pendientes.
                    </Typography>
                  )}
                </List>
                <Button variant="text" startIcon={<DescriptionIcon />} sx={{ mt: 'auto', alignSelf: 'flex-start', color: '#1976d2' }}>
                  Ver Panel de Incidentes
                </Button>
              </Paper>
            </Grid>

            {/* Historial de Incidentes Recientes */}
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderColor: '#bdbdbd' }}>
                <Box display="flex" alignItems="center" mb={1}>
                  <DescriptionIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="h6" sx={{ flexGrow: 1, color: '#424242' }}>Historial Reciente</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <TableContainer sx={{ maxHeight: 200, overflowY: 'auto' }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: '#424242', fontWeight: 600 }}>ID</TableCell>
                        <TableCell sx={{ color: '#424242', fontWeight: 600 }}>Título</TableCell>
                        <TableCell sx={{ color: '#424242', fontWeight: 600 }}>Severidad</TableCell>
                        <TableCell sx={{ color: '#424242', fontWeight: 600 }}>Estado</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {simulatedIncidents.slice(0, 5).map((incident) => (
                        <TableRow key={incident.id} sx={{ '&:hover': { bgcolor: '#f0f0f0' } }}>
                          <TableCell sx={{ color: '#333' }}>{incident.id}</TableCell>
                          <TableCell sx={{ color: '#333' }}>{incident.title}</TableCell>
                          <TableCell>{getSeverityChip(incident.severity)}</TableCell>
                          <TableCell>{getIncidentStatusChip(incident.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button variant="text" startIcon={<EmojiEventsIcon />} sx={{ mt: 'auto', alignSelf: 'flex-start', color: '#1976d2' }}>
                  Ver Todas las Resoluciones
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default OperationalContinuity;