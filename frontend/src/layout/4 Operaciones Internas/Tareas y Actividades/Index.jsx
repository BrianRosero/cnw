import React, { useState } from 'react';
import {
  Container, Typography, Box, Grid, Paper, Chip, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  Button, IconButton, Tooltip, AppBar, Toolbar,
  Accordion, AccordionSummary, AccordionDetails,
  List, ListItem, ListItemText, ListItemIcon,
  TextField, FormControl, InputLabel, Select, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions,
  LinearProgress, ToggleButton, ToggleButtonGroup
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'; // Icono principal de Tareas y Actividades
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'; // Tareas Completadas
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate'; // Tareas Pendientes/Retrasadas
import EventNoteIcon from '@mui/icons-material/EventNote'; // Bitácora
import PersonIcon from '@mui/icons-material/Person'; // Por usuario
import GroupsIcon from '@mui/icons-material/Groups'; // Por equipo
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'; // Prioridad Alta
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'; // Prioridad Baja
import LabelImportantIcon from '@mui/icons-material/LabelImportant'; // Prioridad Media
import BugReportIcon from '@mui/icons-material/BugReport'; // Tickets / Incidencias
import SupportAgentIcon from '@mui/icons-material/SupportAgent'; // Integración osTicket
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Añadir
import EditIcon from '@mui/icons-material/Edit'; // Editar
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ver detalles
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Accordion
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Volver atrás
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // En progreso
import DoneAllIcon from '@mui/icons-material/DoneAll'; // Completado
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'; // Cancelado
import UpdateIcon from '@mui/icons-material/Update'; // Última Actualización
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'; // Tareas en progreso
import AttachFileIcon from '@mui/icons-material/AttachFile'; // Archivos adjuntos
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Más acciones
import DeleteIcon from '@mui/icons-material/Delete';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'; // Eliminar

// --- Datos Simulados de Tareas y Actividades ---
const simulatedTasks = [
  {
    id: 'TAREA-001',
    title: 'Revisar reporte financiero Q2',
    description: 'Análisis detallado de ingresos y egresos del segundo trimestre para la junta directiva.',
    assignedTo: 'Laura Giraldo',
    assignedBy: 'Gerencia',
    team: 'Finanzas',
    priority: 'Alta',
    status: 'En Progreso',
    dueDate: '2025-06-15',
    progress: 70,
    lastUpdate: '2025-06-10 14:30',
    tags: ['Reporte', 'Finanzas'],
    comments: [{ user: 'Laura Giraldo', date: '2025-06-08', text: 'Esperando datos de contabilidad.' }],
    attachments: [],
  },
  {
    id: 'TAREA-002',
    title: 'Actualizar módulo de autenticación de usuario',
    description: 'Implementar autenticación de dos factores (2FA) en el sistema de gestión interna.',
    assignedTo: 'Juan Pérez',
    assignedBy: 'Líder Técnico',
    team: 'Desarrollo Backend',
    priority: 'Alta',
    status: 'Pendiente',
    dueDate: '2025-07-01',
    progress: 0,
    lastUpdate: '2025-06-05 10:00',
    tags: ['Seguridad', 'Desarrollo', '2FA'],
    comments: [],
    attachments: [],
  },
  {
    id: 'TAREA-003',
    title: 'Preparar presentación para nuevo cliente',
    description: 'Elaborar propuesta visual y de contenido para la reunión con "Grupo Innova".',
    assignedTo: 'Sofía Castro',
    assignedBy: 'Director Comercial',
    team: 'Marketing',
    priority: 'Media',
    status: 'Completado',
    dueDate: '2025-06-08',
    progress: 100,
    lastUpdate: '2025-06-07 17:00',
    tags: ['Presentación', 'Ventas'],
    comments: [{ user: 'Sofía Castro', date: '2025-06-07', text: 'Presentación finalizada y enviada para revisión.' }],
    attachments: ['Propuesta_Grupo_Innova.pptx'],
  },
  {
    id: 'TAREA-004',
    title: 'Revisar políticas de privacidad de datos',
    description: 'Ajustar la política de privacidad según las nuevas regulaciones de protección de datos.',
    assignedTo: 'Ana Fernández',
    assignedBy: 'Asesor Legal',
    team: 'Legal',
    priority: 'Media',
    status: 'En Progreso',
    dueDate: '2025-07-30',
    progress: 30,
    lastUpdate: '2025-06-01 09:00',
    tags: ['Legal', 'Regulación'],
    comments: [],
    attachments: [],
  },
  {
    id: 'TAREA-005',
    title: 'Organizar evento de integración de equipos',
    description: 'Coordinar logística, lugar y actividades para el evento anual de integración.',
    assignedTo: 'Luis Torres',
    assignedBy: 'Recursos Humanos',
    team: 'RRHH',
    priority: 'Baja',
    status: 'Pendiente',
    dueDate: '2025-08-20',
    progress: 0,
    lastUpdate: '2025-05-20 16:00',
    tags: ['Evento', 'RRHH'],
    comments: [],
    attachments: [],
  },
];

const simulatedTickets = [
  { id: 'TICKET-101', subject: 'Error de login en plataforma web', status: 'Abierto', priority: 'Alta', assignedTo: 'Equipo Soporte TI', lastUpdate: '2025-06-11 09:00', source: 'Portal Cliente', relatedTask: 'TAREA-002' },
  { id: 'TICKET-102', subject: 'Consulta sobre factura de servicios', status: 'Cerrado', priority: 'Media', assignedTo: 'Facturación', lastUpdate: '2025-06-09 14:00', source: 'Teléfono' },
  { id: 'TICKET-103', subject: 'Solicitud de nueva funcionalidad de reporte', status: 'En Proceso', priority: 'Baja', assignedTo: 'Desarrollo Backend', lastUpdate: '2025-06-10 11:30', source: 'Email' },
];

const simulatedActivityLog = [
  { id: 1, timestamp: '2025-06-11 08:45', user: 'Laura Giraldo', activity: 'Actualizó el progreso de TAREA-001 a 70%.' },
  { id: 2, timestamp: '2025-06-10 17:00', user: 'Sofía Castro', activity: 'Marcó TAREA-003 como completada.' },
  { id: 3, timestamp: '2025-06-09 14:00', user: 'Equipo Soporte TI', activity: 'Cerró TICKET-102.' },
  { id: 4, timestamp: '2025-06-08 11:15', user: 'Juan Pérez', activity: 'Añadió comentario a TAREA-001.' },
  { id: 5, timestamp: '2025-06-05 10:00', user: 'Líder Técnico', activity: 'Asignó TAREA-002 a Juan Pérez.' },
  { id: 6, timestamp: '2025-06-01 09:00', user: 'Gerencia', activity: 'Creó TAREA-001.' },
];

function TaskActivityManagement({ onGoToHome }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterUser, setFilterUser] = useState('Todos');
  const [filterTeam, setFilterTeam] = useState('Todos');
  const [filterPriority, setFilterPriority] = useState('Todos');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewTaskDialog, setOpenNewTaskDialog] = useState(false);
  const [newTaskData, setNewTaskData] = useState({
    title: '', description: '', assignedTo: '', team: '', priority: 'Media', dueDate: '', tags: ''
  });

  // Unique lists for filters
  const uniqueUsers = ['Todos', ...new Set(simulatedTasks.map(task => task.assignedTo))].sort();
  const uniqueTeams = ['Todos', ...new Set(simulatedTasks.map(task => task.team))].sort();
  const uniquePriorities = ['Todos', 'Alta', 'Media', 'Baja'];

  const getStatusChip = (status) => {
    switch (status) {
      case 'En Progreso': return <Chip label="En Progreso" color="primary" size="small" icon={<AccessTimeIcon fontSize="small" />} />;
      case 'Completado': return <Chip label="Completado" color="success" size="small" icon={<DoneAllIcon fontSize="small" />} />;
      case 'Pendiente': return <Chip label="Pendiente" color="default" size="small" icon={<HourglassEmptyIcon fontSize="small" />} />;
      case 'Retrasada': return <Chip label="Retrasada" color="error" size="small" icon={<AssignmentLateIcon fontSize="small" />} />;
      case 'Cancelado': return <Chip label="Cancelado" color="error" size="small" icon={<RemoveCircleOutlineIcon fontSize="small" />} />;
      default: return <Chip label={status} size="small" />;
    }
  };

  const getPriorityChip = (priority) => {
    switch (priority) {
      case 'Alta': return <Chip label="Alta" color="error" size="small" icon={<KeyboardArrowUpIcon fontSize="small" />} />;
      case 'Media': return <Chip label="Media" color="warning" size="small" icon={<LabelImportantIcon fontSize="small" />} />;
      case 'Baja': return <Chip label="Baja" color="info" size="small" icon={<KeyboardArrowDownIcon fontSize="small" />} />;
      default: return <Chip label={priority} size="small" />;
    }
  };

  const filteredTasks = simulatedTasks.filter(task =>
    (filterUser === 'Todos' || task.assignedTo === filterUser) &&
    (filterTeam === 'Todos' || task.team === filterTeam) &&
    (filterPriority === 'Todos' || task.priority === filterPriority)
  );

  // Dashboard KPIs
  const totalTasks = simulatedTasks.length;
  const completedTasks = simulatedTasks.filter(task => task.status === 'Completado').length;
  const pendingTasks = simulatedTasks.filter(task => task.status === 'Pendiente' || task.status === 'En Progreso').length;
  const highPriorityTasks = simulatedTasks.filter(task => task.priority === 'Alta' && task.status !== 'Completado').length;
  const totalTickets = simulatedTickets.length;
  const openTickets = simulatedTickets.filter(ticket => ticket.status !== 'Cerrado').length;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenNewTaskDialog = () => {
    setOpenNewTaskDialog(true);
    setNewTaskData({
      title: '', description: '', assignedTo: '', team: '', priority: 'Media', dueDate: '', tags: ''
    });
  };

  const handleCloseNewTaskDialog = () => {
    setOpenNewTaskDialog(false);
  };

  const handleSaveNewTask = () => {
    if (newTaskData.title && newTaskData.assignedTo && newTaskData.dueDate) {
      const newId = `TAREA-${(simulatedTasks.length + 1).toString().padStart(3, '0')}`;
      const newTask = {
        id: newId,
        status: 'Pendiente',
        progress: 0,
        assignedBy: 'Usuario Actual', // Placeholder
        lastUpdate: new Date().toLocaleString('es-CO'),
        comments: [],
        attachments: [],
        ...newTaskData,
        tags: newTaskData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      };
      simulatedTasks.unshift(newTask); // Add to the beginning for visibility
      alert(`Tarea ${newId} - "${newTaskData.title}" creada con éxito.`);
      handleCloseNewTaskDialog();
    } else {
      alert('Por favor, completa los campos obligatorios para la nueva tarea (Título, Asignado a, Fecha Límite).');
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', minHeight: '100vh', color: '#333', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#ffffff', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2 }}>
                <HomeIcon sx={{ color: '#424242' }} />
              </IconButton>
            </Tooltip>
          )}
          {selectedTask && (
            <Tooltip title="Volver a la Lista de Tareas">
              <IconButton edge="start" color="inherit" aria-label="back" onClick={() => setSelectedTask(null)} sx={{ mr: 2 }}>
                <ArrowBackIcon sx={{ color: '#424242' }} />
              </IconButton>
            </Tooltip>
          )}
          <ChecklistRtlIcon sx={{ fontSize: 36, mr: 1, color: '#388e3c' }} /> {/* Un verde vibrante */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#424242' }}>
            Gestión de Tareas y Actividades
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#388e3c' }}>
            {selectedTask ? `Detalle de Tarea: ${selectedTask.title}` : "Organiza, Prioriza y Da Seguimiento a tus Tareas"}
          </Typography>
          <Typography variant="h6" color="#616161">
            {selectedTask ? "Información detallada, comentarios y archivos adjuntos." : "Administra todas las actividades de tu equipo y proyectos en un solo lugar."}
          </Typography>
        </Box>

        {/* Dashboard de Resumen (si no hay tarea seleccionada) */}
        {!selectedTask && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <ChecklistRtlIcon sx={{ color: '#388e3c', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Resumen del Trabajo
              </Typography>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: '#bdbdbd' }}>
                  <AssignmentTurnedInIcon sx={{ fontSize: 40, color: '#388e3c' }} />
                  <Typography variant="h4" sx={{ mt: 1, color: '#333' }}>{totalTasks}</Typography>
                  <Typography variant="subtitle1" color="#616161">Tareas Totales</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: '#bdbdbd' }}>
                  <DoneAllIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
                  <Typography variant="h4" sx={{ mt: 1, color: '#333' }}>{completedTasks}</Typography>
                  <Typography variant="subtitle1" color="#616161">Tareas Completadas</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: '#bdbdbd' }}>
                  <AssignmentLateIcon sx={{ fontSize: 40, color: '#ff8f00' }} />
                  <Typography variant="h4" sx={{ mt: 1, color: '#333' }}>{pendingTasks}</Typography>
                  <Typography variant="subtitle1" color="#616161">Tareas Pendientes/Progreso</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: '#bdbdbd' }}>
                  <KeyboardArrowUpIcon sx={{ fontSize: 40, color: '#d32f2f' }} />
                  <Typography variant="h4" sx={{ mt: 1, color: '#333' }}>{highPriorityTasks}</Typography>
                  <Typography variant="subtitle1" color="#616161">Prioridad Alta (Activas)</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: '#bdbdbd' }}>
                  <BugReportIcon sx={{ fontSize: 40, color: '#2196f3' }} />
                  <Typography variant="h4" sx={{ mt: 1, color: '#333' }}>{totalTickets}</Typography>
                  <Typography variant="subtitle1" color="#616161">Tickets Registrados</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: '#bdbdbd' }}>
                  <BugReportIcon sx={{ fontSize: 40, color: '#f57c00' }} />
                  <Typography variant="h4" sx={{ mt: 1, color: '#333' }}>{openTickets}</Typography>
                  <Typography variant="subtitle1" color="#616161">Tickets Abiertos</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Listado de Tareas y Filtros (si no hay tarea seleccionada) */}
        {!selectedTask && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <PlaylistAddCheckIcon sx={{ color: '#388e3c', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Tareas Asignadas y Pendientes
              </Typography>
              <Button variant="contained" startIcon={<AddCircleOutlineIcon />} color="primary" sx={{ textTransform: 'none' }} onClick={handleOpenNewTaskDialog}>
                Nueva Tarea
              </Button>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

            {/* Filtros */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel size="small">Usuario</InputLabel>
                <Select size="small" value={filterUser} label="Usuario" onChange={(e) => setFilterUser(e.target.value)}>
                  {uniqueUsers.map(user => <MenuItem key={user} value={user}>{user}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel size="small">Equipo</InputLabel>
                <Select size="small" value={filterTeam} label="Equipo" onChange={(e) => setFilterTeam(e.target.value)}>
                  {uniqueTeams.map(team => <MenuItem key={team} value={team}>{team}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel size="small">Prioridad</InputLabel>
                <Select size="small" value={filterPriority} label="Prioridad" onChange={(e) => setFilterPriority(e.target.value)}>
                  {uniquePriorities.map(priority => <MenuItem key={priority} value={priority}>{priority}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>

            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 500 }}>
              <Table aria-label="tasks table" stickyHeader>
                <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Título</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Asignado A</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Equipo</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Prioridad</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Fecha Límite</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Estado</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: '#424242' }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                      ? filteredTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : filteredTasks
                  ).map((task) => (
                    <TableRow key={task.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f0f0f0' } }}>
                      <TableCell sx={{ color: '#333' }}>{task.id}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{task.title}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{task.assignedTo}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{task.team}</TableCell>
                      <TableCell>{getPriorityChip(task.priority)}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{task.dueDate}</TableCell>
                      <TableCell>{getStatusChip(task.status)}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="Ver Detalles de Tarea">
                          <IconButton onClick={() => setSelectedTask(task)} color="primary" size="small">
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar Tarea">
                          <IconButton color="info" size="small">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Más Acciones">
                          <IconButton color="action" size="small">
                            <MoreVertIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredTasks.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Tareas por página:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
            />
          </Paper>
        )}

        {/* Detalle de Tarea (Si hay una tarea seleccionada) */}
        {selectedTask && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <AssignmentTurnedInIcon sx={{ color: '#388e3c', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Información de la Tarea
                  </Typography>
                  <Tooltip title="Editar Tarea">
                    <IconButton color="info" size="small"><EditIcon /></IconButton>
                  </Tooltip>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                <List dense>
                  <ListItem><ListItemText primary="ID de Tarea" secondary={selectedTask.id} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Título" secondary={selectedTask.title} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Asignado A" secondary={selectedTask.assignedTo} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Asignado Por" secondary={selectedTask.assignedBy} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Equipo" secondary={selectedTask.team} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Prioridad" secondary={getPriorityChip(selectedTask.priority)} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} /></ListItem>
                  <ListItem><ListItemText primary="Estado" secondary={getStatusChip(selectedTask.status)} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} /></ListItem>
                  <ListItem><ListItemText primary="Fecha Límite" secondary={selectedTask.dueDate} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem>
                    <ListItemText primary="Progreso" primaryTypographyProps={{ fontWeight: 600, color: '#333' }} />
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress variant="determinate" value={selectedTask.progress} sx={{ height: 8, borderRadius: 4 }} />
                      <Typography variant="body2" color="#616161">{selectedTask.progress}%</Typography>
                    </Box>
                  </ListItem>
                  <ListItem><ListItemText primary="Última Actualización" secondary={selectedTask.lastUpdate} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                </List>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>Descripción</Typography>
                  <TextField
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={selectedTask.description}
                    InputProps={{ readOnly: true }}
                    sx={{ bgcolor: '#f8f8f8', '.MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' } }}
                  />
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>Etiquetas</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedTask.tags.length > 0 ? (
                      selectedTask.tags.map((tag, index) => <Chip key={index} label={tag} variant="outlined" size="small" />)
                    ) : (
                      <Typography variant="body2" color="#616161">No hay etiquetas.</Typography>
                    )}
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Comentarios de la Tarea */}
              <Paper elevation={4} sx={{ p: 3, mb: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <EventNoteIcon sx={{ color: '#388e3c', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Comentarios
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                <List dense sx={{ maxHeight: 200, overflowY: 'auto' }}>
                  {selectedTask.comments.length === 0 ? (
                    <Typography variant="body2" color="#616161" sx={{ ml: 2 }}>No hay comentarios.</Typography>
                  ) : (
                    selectedTask.comments.map((comment, index) => (
                      <ListItem key={index} sx={{ alignItems: 'flex-start', mb: 1 }}>
                        <ListItemIcon sx={{ mt: 0.5 }}><PersonIcon fontSize="small" /></ListItemIcon>
                        <ListItemText
                          primary={<><b>{comment.user}</b> <Typography component="span" variant="caption" color="text.secondary">{comment.date}</Typography></>}
                          secondary={comment.text}
                          primaryTypographyProps={{ color: '#333' }}
                          secondaryTypographyProps={{ color: '#616161' }}
                        />
                      </ListItem>
                    ))
                  )}
                </List>
                <TextField
                  margin="normal"
                  label="Añadir Comentario"
                  multiline
                  rows={2}
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 2 }}
                />
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} color="primary" sx={{ mt: 1, textTransform: 'none' }}>
                  Publicar Comentario
                </Button>
              </Paper>

              {/* Archivos Adjuntos */}
              <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <AttachFileIcon sx={{ color: '#388e3c', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Archivos Adjuntos
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                <List dense sx={{ maxHeight: 150, overflowY: 'auto' }}>
                  {selectedTask.attachments && selectedTask.attachments.length > 0 ? (
                    selectedTask.attachments.map((file, index) => (
                      <ListItem key={index} sx={{ p: 0.5 }}>
                        <ListItemIcon><AttachFileIcon color="action" /></ListItemIcon>
                        <ListItemText primary={file} primaryTypographyProps={{ color: '#333' }} />
                        <Button size="small" variant="text" sx={{ textTransform: 'none' }}>Descargar</Button>
                      </ListItem>
                    ))
                  ) : (
                    <Typography variant="body2" color="#616161" sx={{ ml: 2 }}>No hay archivos adjuntos.</Typography>
                  )}
                </List>
                <Button variant="text" startIcon={<AddCircleOutlineIcon />} sx={{ mt: 1, textTransform: 'none', color: '#388e3c' }}>
                  Subir Archivo
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Bitácora de Actividades Global (si no hay tarea seleccionada) */}
        {!selectedTask && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <EventNoteIcon sx={{ color: '#388e3c', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Bitácora de Actividades Recientes
              </Typography>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />
            <List dense sx={{ maxHeight: 300, overflowY: 'auto' }}>
              {simulatedActivityLog.map((log) => (
                <ListItem key={log.id} sx={{ borderLeft: '3px solid #66bb6a', mb: 1, p: 1, '&:hover': { bgcolor: '#f0f0f0' } }}>
                  <ListItemIcon><UpdateIcon fontSize="small" color="action" /></ListItemIcon>
                  <ListItemText
                    primary={<><b>{log.user}</b>: {log.activity}</>}
                    secondary={log.timestamp}
                    primaryTypographyProps={{ color: '#333' }}
                    secondaryTypographyProps={{ color: '#616161' }}
                  />
                </ListItem>
              ))}
            </List>
            <Button variant="text" sx={{ mt: 2, textTransform: 'none', color: '#388e3c' }}>Ver Bitácora Completa</Button>
          </Paper>
        )}

        {/* Sección de Tickets y Simulación osTicket (si no hay tarea seleccionada) */}
        {!selectedTask && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <BugReportIcon sx={{ color: '#2196f3', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Gestión de Tickets e Incidencias
              </Typography>
              <Button variant="contained" startIcon={<AddCircleOutlineIcon />} color="info" sx={{ textTransform: 'none' }}>
                Nuevo Ticket
              </Button>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 300 }}>
              <Table aria-label="tickets table" stickyHeader>
                <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>ID Ticket</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Asunto</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Estado</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Prioridad</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Asignado A</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Última Act.</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {simulatedTickets.map((ticket) => (
                    <TableRow key={ticket.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f0f0f0' } }}>
                      <TableCell sx={{ color: '#333' }}>{ticket.id}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{ticket.subject}</TableCell>
                      <TableCell>
                        <Chip
                          label={ticket.status}
                          color={ticket.status === 'Abierto' ? 'error' : ticket.status === 'En Proceso' ? 'warning' : 'success'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{getPriorityChip(ticket.priority)}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{ticket.assignedTo}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{ticket.lastUpdate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box display="flex" alignItems="center">
                <SupportAgentIcon sx={{ color: '#1976d2', mr: 1, fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                  Integración con osTicket
                </Typography>
              </Box>
              <Button variant="outlined" startIcon={<VisibilityIcon />} sx={{ textTransform: 'none' }}>
                Ver Tickets en osTicket
              </Button>
            </Box>
            <Typography variant="body2" color="#616161" sx={{ mt: 1 }}>
              *Visualización de tickets y gestión de estados sincronizada con osTicket (simulación).
            </Typography>
          </Paper>
        )}
      </Container>

      {/* Dialog para Nueva Tarea */}
      <Dialog open={openNewTaskDialog} onClose={handleCloseNewTaskDialog}>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>Crear Nueva Tarea</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField margin="normal" label="Título de la Tarea" fullWidth value={newTaskData.title} onChange={(e) => setNewTaskData({ ...newTaskData, title: e.target.value })} />
          <TextField margin="normal" label="Descripción" multiline rows={3} fullWidth value={newTaskData.description} onChange={(e) => setNewTaskData({ ...newTaskData, description: e.target.value })} />
          <TextField margin="normal" label="Asignado A" fullWidth value={newTaskData.assignedTo} onChange={(e) => setNewTaskData({ ...newTaskData, assignedTo: e.target.value })} />
          <TextField margin="normal" label="Equipo" fullWidth value={newTaskData.team} onChange={(e) => setNewTaskData({ ...newTaskData, team: e.target.value })} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Prioridad</InputLabel>
            <Select value={newTaskData.priority} label="Prioridad" onChange={(e) => setNewTaskData({ ...newTaskData, priority: e.target.value })}>
              <MenuItem value="Alta">Alta</MenuItem>
              <MenuItem value="Media">Media</MenuItem>
              <MenuItem value="Baja">Baja</MenuItem>
            </Select>
          </FormControl>
          <TextField margin="normal" label="Fecha Límite" type="date" fullWidth InputLabelProps={{ shrink: true }} value={newTaskData.dueDate} onChange={(e) => setNewTaskData({ ...newTaskData, dueDate: e.target.value })} />
          <TextField margin="normal" label="Etiquetas (separadas por coma)" fullWidth value={newTaskData.tags} onChange={(e) => setNewTaskData({ ...newTaskData, tags: e.target.value })} helperText="Ej: Urgente, Revisión, Cliente X" />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseNewTaskDialog} color="secondary">Cancelar</Button>
          <Button onClick={handleSaveNewTask} variant="contained" color="primary">Crear Tarea</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default TaskActivityManagement;