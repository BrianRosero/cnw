import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Container, Typography, Button, Box, Grid, Paper,
  AppBar, Toolbar, IconButton, Tooltip,
  Card, CardContent, LinearProgress, Chip, Divider,
  List, ListItem, ListItemText, ListItemIcon,
  CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel,
  Snackbar, Alert
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Para personalizar el tema

// --- Iconos de Material-UI para cada sección y funcionalidad ---
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'; // Calendario de Actividades
import BarChartIcon from '@mui/icons-material/BarChart';     // Estadísticas Generales
import DescriptionIcon from '@mui/icons-material/Description'; // Informes Detallados
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';   // Gestión de Tareas Kanban
import SpeedIcon from '@mui/icons-material/Speed';           // Monitoreo de Rendimiento
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'; // Reportes Automatizados
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna'; // Icono principal del Data Center
import ArrowBackIcon from '@mui/icons-material/ArrowBack';     // Volver
import HomeIcon from '@mui/icons-material/Home';               // Volver al Inicio de la aplicación
import NotificationsIcon from '@mui/icons-material/Notifications'; // Notificaciones
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Perfil de usuario
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Añadir
import EditIcon from '@mui/icons-material/Edit';                 // Editar
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Eliminar
import PlayArrowIcon from '@mui/icons-material/PlayArrow';       // Ejecutar/Iniciar
import PauseIcon from '@mui/icons-material/Pause';             // Pausar
import RefreshIcon from '@mui/icons-material/Refresh';         // Actualizar
import WarningIcon from '@mui/icons-material/Warning';         // Advertencia
import ErrorIcon from '@mui/icons-material/Error';             // Error crítico
import InfoIcon from '@mui/icons-material/Info';               // Información

// --- Simulaciones de Módulos (Reemplaza con tus componentes reales) ---
// Estos serían tus archivos CalendarioDeActividades.jsx, EstadisticasGenerales.jsx, etc.
// Por simplicidad, aquí los simulo directamente para el ejemplo.

// Componente simulado para Calendario de Actividades
const CalendarioActividades = () => (
  <Box sx={{ p: 3, textAlign: 'center' }}>
    <CalendarMonthIcon sx={{ fontSize: 80, color: '#0D47A1', mb: 2 }} />
    <Typography variant="h5" color="text.primary" mb={2}>Gestión de Calendario y Eventos</Typography>
    <Typography variant="body1" color="text.secondary" mb={3}>
      Aquí podrás visualizar y gestionar el calendario de mantenimiento, despliegues, copias de seguridad y otras actividades programadas del Data Center. Integrado con sistemas de tickets para programar tareas.
    </Typography>
    <Paper elevation={3} sx={{ p: 2, bgcolor: '#e3f2fd', border: '1px solid #bbdefb' }}>
      <Typography variant="h6" sx={{ color: '#0D47A1' }}>Próximas Actividades:</Typography>
      <List>
        <ListItem><ListItemIcon><InfoIcon color="info" /></ListItemIcon><ListItemText primary="Mantenimiento de Servidor Web (SV-001) - 2025-06-15 02:00 AM" secondary="Impacto: Bajo" /></ListItem>
        <ListItem><ListItemIcon><InfoIcon color="info" /></ListItemIcon><ListItemText primary="Despliegue de Aplicación v2.3 - 2025-06-18 10:00 AM" secondary="Equipo: Desarrollo" /></ListItem>
        <ListItem><ListItemIcon><InfoIcon color="info" /></ListItemIcon><ListItemText primary="Copia de Seguridad Completa (DC-Prod) - 2025-06-20 01:00 AM" secondary="Estado: Programada" /></ListItem>
      </List>
      <Button variant="contained" sx={{ mt: 2, bgcolor: '#0D47A1', '&:hover': { bgcolor: '#1565C0' } }}>Ver Calendario Completo</Button>
    </Paper>
  </Box>
);

// Componente simulado para Estadísticas Generales
const EstadisticasGenerales = () => (
  <Box sx={{ p: 3, textAlign: 'center' }}>
    <BarChartIcon sx={{ fontSize: 80, color: '#004a8f', mb: 2 }} />
    <Typography variant="h5" color="text.primary" mb={2}>Dashboard de Estadísticas Clave</Typography>
    <Typography variant="body1" color="text.secondary" mb={3}>
      Ofrece una visión consolidada de métricas operativas como uso de recursos, estado de la red y capacidad.
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 2, bgcolor: '#e8f5e9', border: '1px solid #c8e6c9' }}>
          <Typography variant="h6" color="#388E3C" mb={1}>Uso de CPU (Promedio)</Typography>
          <CircularProgress variant="determinate" value={65} size={80} thickness={5} sx={{ color: '#66BB6A' }} />
          <Typography variant="h4" color="#66BB6A" mt={1}>65%</Typography>
          <Typography variant="body2" color="text.secondary">Máximo: 85%</Typography>
          <Box sx={{ width: '100%', height: '100px', bgcolor: '#c8e6c9', mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1 }}>
            <Typography variant="caption" color="#388E3C" fontWeight={700}>GRÁFICO DE LÍNEAS (HISTORIAL CPU)</Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 2, bgcolor: '#fff3e0', border: '1px solid #ffe0b2' }}>
          <Typography variant="h6" color="#F57C00" mb={1}>Capacidad de Almacenamiento</Typography>
          <LinearProgress variant="determinate" value={80} sx={{ height: 15, borderRadius: 5, mb: 1, bgcolor: '#ffe0b2', '& .MuiLinearProgress-bar': { bgcolor: '#FF7043' } }} />
          <Typography variant="h4" color="#FF7043">80% Usado</Typography>
          <Typography variant="body2" color="text.secondary">Total: 100 TB</Typography>
          <Box sx={{ width: '100%', height: '100px', bgcolor: '#ffe0b2', mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1 }}>
            <Typography variant="caption" color="#F57C00" fontWeight={700}>GRÁFICO DE ANILLO (USO DISCO)</Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 2, bgcolor: '#e0f7fa', border: '1px solid #b2ebf2', mt: 3 }}>
          <Typography variant="h6" color="#00ACC1" mb={1}>Tráfico de Red (GB/hr)</Typography>
          <Box sx={{ width: '100%', height: '150px', bgcolor: '#b2ebf2', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1 }}>
            <Typography variant="caption" color="#00ACC1" fontWeight={700}>GRÁFICO DE ÁREA (TRÁFICO RED)</Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
    <Button variant="contained" sx={{ mt: 3, bgcolor: '#0D47A1', '&:hover': { bgcolor: '#1565C0' } }}>Ver Dashboard Completo</Button>
  </Box>
);

// Componente simulado para Informes Detallados
const Informes = () => (
  <Box sx={{ p: 3, textAlign: 'center' }}>
    <DescriptionIcon sx={{ fontSize: 80, color: '#0D47A1', mb: 2 }} />
    <Typography variant="h5" color="text.primary" mb={2}>Generación y Consulta de Informes</Typography>
    <Typography variant="body1" color="text.secondary" mb={3}>
      Accede a informes personalizados sobre rendimiento, incidentes, uso de recursos y más.
    </Typography>
    <Paper elevation={3} sx={{ p: 2, bgcolor: '#e0f7fa', border: '1px solid #bbdefb' }}>
      <Typography variant="h6" sx={{ color: '#0D47A1' }}>Informes Disponibles:</Typography>
      <List>
        <ListItem><ListItemIcon><DescriptionIcon color="primary" /></ListItemIcon><ListItemText primary="Informe de Disponibilidad de Servicios (Mensual)" secondary="Última generación: 2025-06-01" /></ListItem>
        <ListItem><ListItemIcon><DescriptionIcon color="primary" /></ListItemIcon><ListItemText primary="Análisis de Consumo Energético (Q2 2025)" secondary="Estado: Pendiente de Aprobación" /></ListItem>
        <ListItem><ListItemIcon><DescriptionIcon color="primary" /></ListItemIcon><ListItemText primary="Reporte de Incidentes Críticos (Semanal)" secondary="Última generación: 2025-06-10" /></ListItem>
      </List>
      <Button variant="contained" sx={{ mt: 2, bgcolor: '#0D47A1', '&:hover': { bgcolor: '#1565C0' } }}>Generar Nuevo Informe</Button>
      <Button variant="outlined" sx={{ mt: 2, ml: 2, color: '#0D47A1', borderColor: '#0D47A1' }}>Ver Historial de Informes</Button>
    </Paper>
  </Box>
);

// Componente simulado para Gestión de Tareas Kanban
const Kanban = () => {
  const [tasks, setTasks] = useState([
    { id: 'T001', title: 'Actualizar firmware de switch principal', status: 'Pendiente', assigned: 'Equipo Redes', priority: 'Alta' },
    { id: 'T002', title: 'Investigar alerta de uso de disco en DB-Prod', status: 'En Progreso', assigned: 'Soporte TI', priority: 'Alta' },
    { id: 'T003', title: 'Revisión de logs de seguridad del firewall', status: 'Pendiente', assigned: 'Seguridad', priority: 'Media' },
    { id: 'T004', title: 'Documentar procedimiento de respaldo de VM', status: 'Completado', assigned: 'Operaciones', priority: 'Baja' },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null); // Task being added/edited

  const handleOpenDialog = (task = null) => {
    setCurrentTask(task);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentTask(null);
  };

  const handleSaveTask = (newTaskData) => {
    if (currentTask) {
      // Edit task
      setTasks(tasks.map(task => task.id === currentTask.id ? { ...task, ...newTaskData } : task));
    } else {
      // Add new task
      const newId = `T${tasks.length + 1}`;
      setTasks([...tasks, { id: newId, ...newTaskData }]);
    }
    handleCloseDialog();
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const TaskFormDialog = ({ open, onClose, onSave, task }) => {
    const [formData, setFormData] = useState(task || {
      title: '', status: 'Pendiente', assigned: '', priority: 'Media'
    });

    useEffect(() => {
      setFormData(task || { title: '', status: 'Pendiente', assigned: '', priority: 'Media' });
    }, [task]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
      onSave(formData);
    };

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{task ? 'Editar Tarea' : 'Añadir Nueva Tarea'}</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Título de la Tarea"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel>Estado</InputLabel>
            <Select
              name="status"
              value={formData.status}
              label="Estado"
              onChange={handleChange}
            >
              <MenuItem value="Pendiente">Pendiente</MenuItem>
              <MenuItem value="En Progreso">En Progreso</MenuItem>
              <MenuItem value="Completado">Completado</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="assigned"
            label="Asignado a"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.assigned}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel>Prioridad</InputLabel>
            <Select
              name="priority"
              value={formData.priority}
              label="Prioridad"
              onChange={handleChange}
            >
              <MenuItem value="Alta">Alta</MenuItem>
              <MenuItem value="Media">Media</MenuItem>
              <MenuItem value="Baja">Baja</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: '#0D47A1', '&:hover': { bgcolor: '#1565C0' } }}>
            {task ? 'Guardar Cambios' : 'Añadir Tarea'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendiente': return '#FBC02D'; // Amber
      case 'En Progreso': return '#1976D2'; // Blue
      case 'Completado': return '#388E3C'; // Green
      default: return '#757575'; // Grey
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Alta': return '#D32F2F'; // Red
      case 'Media': return '#FBC02D'; // Amber
      case 'Baja': return '#66BB6A'; // Green
      default: return '#757575'; // Grey
    }
  };

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <ViewKanbanIcon sx={{ fontSize: 80, color: '#0D47A1', mb: 2 }} />
      <Typography variant="h5" color="text.primary" mb={2}>Gestión de Tareas y Proyectos Kanban</Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Organiza y sigue el progreso de las tareas operativas y proyectos del Data Center con una vista Kanban.
      </Typography>
      <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => handleOpenDialog()} sx={{ mb: 3, bgcolor: '#0D47A1', '&:hover': { bgcolor: '#1565C0' } }}>
        Añadir Nueva Tarea
      </Button>

      <Grid container spacing={3}>
        {['Pendiente', 'En Progreso', 'Completado'].map(statusColumn => (
          <Grid item xs={12} md={4} key={statusColumn}>
            <Paper elevation={3} sx={{ p: 2, bgcolor: '#f5f5f5', borderTop: `5px solid ${getStatusColor(statusColumn)}`, minHeight: 300 }}>
              <Typography variant="h6" sx={{ color: getStatusColor(statusColumn), mb: 2, fontWeight: 600 }}>
                {statusColumn} ({tasks.filter(t => t.status === statusColumn).length})
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {tasks.filter(t => t.status === statusColumn).map(task => (
                  <Card key={task.id} elevation={2} sx={{ mb: 2, p: 1.5, bgcolor: '#ffffff', borderLeft: `3px solid ${getPriorityColor(task.priority)}` }}>
                    <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                      <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#212121' }}>{task.title}</Typography>
                      <Chip label={`Asignado: ${task.assigned}`} size="small" sx={{ mr: 1, mt: 0.5, bgcolor: '#e0f2f7', color: '#01579B' }} />
                      <Chip label={`Prioridad: ${task.priority}`} size="small" sx={{ mt: 0.5, bgcolor: getPriorityColor(task.priority) + '20', color: getPriorityColor(task.priority) }} />
                      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Tooltip title="Editar Tarea">
                          <IconButton size="small" onClick={() => handleOpenDialog(task)}>
                            <EditIcon fontSize="small" color="action" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar Tarea">
                          <IconButton size="small" onClick={() => handleDeleteTask(task.id)}>
                            <DeleteOutlineIcon fontSize="small" color="error" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </List>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {dialogOpen && <TaskFormDialog open={dialogOpen} onClose={handleCloseDialog} onSave={handleSaveTask} task={currentTask} />}
    </Box>
  );
};

// Componente simulado para Monitoreo de Rendimiento
const Rendimiento = () => {
  const metrics = [
    { name: 'Latencia de Red', value: '5 ms', status: 'normal', icon: <SpeedIcon color="success" />, details: 'Promedio de latencia en la red interna.' },
    { name: 'Utilización de RAM (Servidores)', value: '75%', status: 'warning', icon: <WarningIcon color="warning" />, details: 'Algunos servidores alcanzan picos del 90%.' },
    { name: 'IOPS Almacenamiento', value: '12,000 IOPS', status: 'normal', icon: <SpeedIcon color="success" />, details: 'Rendimiento de entrada/salida de almacenamiento.' },
    { name: 'Errores de Red', value: '0.1%', status: 'error', icon: <ErrorIcon color="error" />, details: 'Pequeño porcentaje de paquetes perdidos en el edge.' },
  ];

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <SpeedIcon sx={{ fontSize: 80, color: '#0D47A1', mb: 2 }} />
      <Typography variant="h5" color="text.primary" mb={2}>Monitoreo de Rendimiento en Tiempo Real</Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Visualiza el estado de los componentes clave del Data Center: red, servidores, almacenamiento y aplicaciones.
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={4} sx={{ p: 2, bgcolor: '#ffffff', borderLeft: `5px solid ${metric.status === 'normal' ? '#66BB6A' : metric.status === 'warning' ? '#FFC107' : '#E53935'}`, borderRadius: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  {metric.icon}
                  <Typography variant="subtitle1" fontWeight={600} ml={1}>{metric.name}</Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: metric.status === 'normal' ? '#388E3C' : metric.status === 'warning' ? '#FBC02D' : '#E53935' }}>
                  {metric.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">{metric.details}</Typography>
                <Button size="small" variant="text" sx={{ mt: 1, textTransform: 'none', color: '#0D47A1' }}>Ver Gráficos</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" sx={{ mt: 3, bgcolor: '#0D47A1', '&:hover': { bgcolor: '#1565C0' } }}>Ir al Dashboard de Monitoreo</Button>
    </Box>
  );
};

// Componente simulado para Reportes Automatizados
const ReportesAutomatizados = () => {
  const [reports, setReports] = useState([
    { id: 'R001', name: 'Reporte de Salud de Infraestructura', schedule: 'Diario (08:00 AM)', lastRun: '2025-06-12 08:00 AM', status: 'Éxito', active: true },
    { id: 'R002', name: 'Resumen de Consumo de Recursos', schedule: 'Semanal (Lunes 09:00 AM)', lastRun: '2025-06-10 09:00 AM', status: 'Éxito', active: true },
    { id: 'R003', name: 'Análisis de Vulnerabilidades (Escaneo)', schedule: 'Mensual (1er del mes)', lastRun: '2025-06-01 03:00 AM', status: 'Error', active: false },
  ]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const showSnackbar = useCallback((message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const handleToggleReportActive = (id) => {
    setReports(prev => prev.map(report =>
      report.id === id ? { ...report, active: !report.active } : report
    ));
    showSnackbar('Estado del reporte actualizado.', 'info');
  };

  const handleRunReport = (id) => {
    showSnackbar(`Ejecutando reporte ${id} (simulado)...`, 'info');
    // Simulate API call and update status
    setTimeout(() => {
      setReports(prev => prev.map(report =>
        report.id === id ? { ...report, lastRun: new Date().toLocaleString(), status: 'Éxito', active: true } : report
      ));
      showSnackbar(`Reporte ${id} ejecutado con éxito.`, 'success');
    }, 2000);
  };

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <AutoAwesomeIcon sx={{ fontSize: 80, color: '#0D47A1', mb: 2 }} />
      <Typography variant="h5" color="text.primary" mb={2}>Gestión de Reportes y Automatización</Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Configura y monitorea la generación automática de informes y notificaciones del Data Center.
      </Typography>

      <List sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 1, bgcolor: '#f5f5f5' }}>
        {reports.map(report => (
          <ListItem
            key={report.id}
            sx={{ bgcolor: '#ffffff', mb: 1, borderRadius: 1, boxShadow: 1, '&:hover': { bgcolor: '#f0f4f7' } }}
            secondaryAction={
              <Box>
                <Tooltip title={report.active ? "Pausar Reporte" : "Activar Reporte"}>
                  <IconButton onClick={() => handleToggleReportActive(report.id)}>
                    {report.active ? <PauseIcon color="warning" /> : <PlayArrowIcon color="success" />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Ejecutar Ahora">
                  <IconButton onClick={() => handleRunReport(report.id)}>
                    <PlayArrowIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Editar Configuración">
                  <IconButton>
                    <EditIcon color="action" />
                  </IconButton>
                </Tooltip>
              </Box>
            }
          >
            <ListItemIcon>
              <DescriptionIcon sx={{ color: '#0D47A1' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Box display="flex" alignItems="center">
                  <Typography variant="subtitle1" fontWeight={600}>{report.name}</Typography>
                  <Chip
                    label={report.status}
                    size="small"
                    color={report.status === 'Éxito' ? 'success' : 'error'}
                    sx={{ ml: 1 }}
                  />
                  {!report.active && (
                    <Chip
                      label="Inactivo"
                      size="small"
                      color="default"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">Programación: {report.schedule}</Typography>
                  <Typography variant="caption" color="text.secondary" display="block">Última ejecución: {report.lastRun}</Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" startIcon={<AddCircleOutlineIcon />} sx={{ mt: 3, bgcolor: '#0D47A1', '&:hover': { bgcolor: '#1565C0' } }}>
        Crear Nuevo Reporte
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};


// --- Componente Principal del Panel de Data Center ---
// Agrega una prop 'onGoToHome' para que reciba la función de navegación a la página de Inicio
function DataCenterPanel({ onGoToHome, onGoToQuickAccess }) { // Agregué onGoToQuickAccess para consistencia
  const [currentModule, setCurrentModule] = useState('menu'); // 'menu', 'calendario', 'estadisticas', etc.

  // Definición del tema personalizado para el Data Center Panel
  const dataCenterTheme = useMemo(() =>
    createTheme({
      palette: {
        primary: {
          main: '#004a8f', // Azul profundo
          light: '#81D4FA', // Azul claro para acentos y títulos
          dark: '#002C81',
          contrastText: '#fff',
        },
        secondary: {
          main: '#66BB6A', // Verde para éxito
          light: '#98EE99',
          dark: '#388E3C',
          contrastText: '#fff',
        },
        error: {
          main: '#E53935', // Rojo para errores
          light: '#EF5350',
          dark: '#C62828',
          contrastText: '#fff',
        },
        warning: {
          main: '#FFC107', // Amarillo para advertencias
          light: '#FFD740',
          dark: '#FFA000',
          contrastText: '#000',
        },
        info: {
          main: '#2196F3', // Azul para información
          light: '#64B5F6',
          dark: '#1976D2',
          contrastText: '#fff',
        },
        background: {
          default: '#eef2f6', // Fondo general muy claro (azul cielo)
          paper: '#FFFFFF',   // Fondo de tarjetas y paneles
          dark: '#212121',    // Fondo oscuro para contrastes
        },
        text: {
          primary: '#212121', // Texto principal (casi negro)
          secondary: '#616161', // Texto secundario (gris oscuro)
        },
      },
      typography: {
        fontFamily: 'Roboto, sans-serif',
        h3: {
          fontWeight: 700,
          fontSize: '2.5rem',
          '@media (min-width:600px)': {
            fontSize: '3.5rem',
          },
        },
        h5: {
          fontWeight: 600,
        },
        h6: {
          fontWeight: 500,
        },
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: 8, // Bordes más suaves
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              textTransform: 'none',
              fontWeight: 600,
            },
          },
        },
      },
    }), []
  );

  const handleGoBackToPanelMenu = () => {
    setCurrentModule('menu'); // Vuelve al menú principal del *panel del Data Center*
  };

  const moduleOptions = [
    { id: 'calendario', title: 'Calendario de Actividades', icon: <CalendarMonthIcon sx={{ fontSize: 60 }} />, component: <CalendarioActividades /> },
    { id: 'estadisticas', title: 'Estadísticas Generales', icon: <BarChartIcon sx={{ fontSize: 60 }} />, component: <EstadisticasGenerales /> },
    { id: 'informes', title: 'Informes Detallados', icon: <DescriptionIcon sx={{ fontSize: 60 }} />, component: <Informes /> },
    { id: 'kanban', title: 'Gestión de Tareas Kanban', icon: <ViewKanbanIcon sx={{ fontSize: 60 }} />, component: <Kanban /> },
    { id: 'rendimiento', title: 'Monitoreo de Rendimiento', icon: <SpeedIcon sx={{ fontSize: 60 }} />, component: <Rendimiento /> },
    { id: 'reportes', title: 'Reportes Automatizados', icon: <AutoAwesomeIcon sx={{ fontSize: 60 }} />, component: <ReportesAutomatizados /> },
  ];

  const renderContent = () => {
    if (currentModule === 'menu') {
      return (
        <Grid container spacing={4} justifyContent="center" sx={{ p: 4 }}>
          {moduleOptions.map((option) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={option.id}>
              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  height: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: `0 8px 16px rgba(0, 0, 0, 0.4)`, // Sombra más pronunciada en hover
                    bgcolor: dataCenterTheme.palette.background.default, // Fondo ligeramente más claro en hover
                  },
                  border: `1px solid ${dataCenterTheme.palette.primary.light}30`, // Borde sutil
                  bgcolor: dataCenterTheme.palette.background.paper, // Fondo de la tarjeta
                }}
                onClick={() => setCurrentModule(option.id)}
              >
                <Box sx={{ color: dataCenterTheme.palette.primary.main, mb: 1 }}> {/* Icono principal */}
                  {option.icon}
                </Box>
                <Typography variant="h6" align="center" sx={{ color: dataCenterTheme.palette.text.primary }}>
                  {option.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      );
    } else {
      const selectedModule = moduleOptions.find(option => option.id === currentModule);
      return selectedModule ? selectedModule.component : null;
    }
  };

  return (
    <ThemeProvider theme={dataCenterTheme}>
      <Box sx={{ flexGrow: 1, bgcolor: dataCenterTheme.palette.background.default, minHeight: '100vh' }}>
        <AppBar position="static" elevation={2} sx={{ bgcolor: dataCenterTheme.palette.primary.main, borderBottom: `1px solid ${dataCenterTheme.palette.primary.dark}` }}>
          <Toolbar>
            {/* Botón para volver al menú de la aplicación (HOME) */}
            {onGoToHome && (
              <Tooltip title="Volver al Inicio (Aplicación Principal)">
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="home"
                  onClick={onGoToHome}
                  sx={{ mr: 2, color: dataCenterTheme.palette.primary.light }}
                >
                  <HomeIcon />
                </IconButton>
              </Tooltip>
            )}

            {/* Botón para volver al menú del Panel de Control del Data Center */}
            {currentModule !== 'menu' && (
              <Tooltip title="Volver al Panel Principal (Data Center)">
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="back"
                  onClick={handleGoBackToPanelMenu}
                  sx={{ mr: 2, color: dataCenterTheme.palette.primary.light }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
            )}

            <SettingsInputAntennaIcon sx={{ fontSize: 36, mr: 1, color: dataCenterTheme.palette.primary.light }} />
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.08em', color: dataCenterTheme.palette.primary.light }}>
              Panel de Control del Data Center
            </Typography>

            {/* Opciones de usuario y notificaciones (añadidas para completitud) */}
            <Tooltip title="Notificaciones del Data Center">
              <IconButton color="inherit" sx={{ mr: 1, color: dataCenterTheme.palette.primary.light }}>
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
            <Chip
              avatar={<AccountCircleIcon sx={{ color: dataCenterTheme.palette.primary.light }} />}
              label="Operador DC" // Nombre de usuario de ejemplo
              sx={{ bgcolor: dataCenterTheme.palette.primary.dark, color: dataCenterTheme.palette.primary.light, fontWeight: 600 }}
            />
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ color: dataCenterTheme.palette.primary.main }}>
              {currentModule === 'menu' ? "Centro de Monitoreo" : `Módulo de ${moduleOptions.find(opt => opt.id === currentModule)?.title || '...'}`}
            </Typography>
            <Typography variant="h6" color={dataCenterTheme.palette.text.secondary}>
              {currentModule === 'menu' ? "Accede a las herramientas clave para la gestión y optimización de tu infraestructura." : "Información detallada y herramientas de gestión para este módulo."}
            </Typography>
          </Box>

          <Paper elevation={8} sx={{ p: currentModule === 'menu' ? 0 : 5, minHeight: '70vh', bgcolor: dataCenterTheme.palette.background.paper, border: `1px solid ${dataCenterTheme.palette.primary.light}20` }}>
            {renderContent()}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default DataCenterPanel;