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
  Badge,
  FormGroup, FormControlLabel, Switch, Checkbox, CardActions, InputAdornment, Avatar, ListItemAvatar,
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import SupportAgentIcon from '@mui/icons-material/SupportAgent'; // Icono principal de Soporte
import HelpdeskIcon from '@mui/icons-material/HelpOutline'; // Acceso a Helpdesk
import TaskAltIcon from '@mui/icons-material/TaskAlt'; // Tareas Asignadas
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'; // Tickets Asignados
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'; // Colaboración / Equipo
import LiveHelpIcon from '@mui/icons-material/LiveHelp'; // Preguntas Frecuentes / Base de Conocimiento
import SettingsIcon from '@mui/icons-material/Settings'; // Configuración de Soporte
import SearchIcon from '@mui/icons-material/Search'; // Buscar
import FilterListIcon from '@mui/icons-material/FilterList'; // Filtros
import RefreshIcon from '@mui/icons-material/Refresh'; // Refrescar
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Crear nuevo
import EditIcon from '@mui/icons-material/Edit'; // Editar
import DeleteIcon from '@mui/icons-material/Delete'; // Eliminar
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Éxito / Resuelto
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Error / Abierto
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Advertencia / En Progreso
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'; // Pendiente
import LowPriorityIcon from '@mui/icons-material/LowPriority'; // Prioridad Baja
import MediumPriorityIcon from '@mui/icons-material/Sort'; // Prioridad Media
import HighPriorityIcon from '@mui/icons-material/CrisisAlert'; // Prioridad Alta
import ForumIcon from '@mui/icons-material/Forum'; // Historial de comunicación
import PersonIcon from '@mui/icons-material/Person'; // Asignado a
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ver detalles
import AttachFileIcon from '@mui/icons-material/AttachFile'; // Adjuntos
import HistoryIcon from '@mui/icons-material/History'; // Historial de actividad
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SendIcon from '@mui/icons-material/Send'; // FAQ icon


// --- Datos Simulados para Soporte y Colaboración ---

const currentUser = {
  id: 'AG001',
  name: 'Bryan Rosero (Tú)',
  role: 'Soporte Senior',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Bryan%20Rosero',
};

const assignedTickets = [
  { id: 'TKT001', subject: 'Problema de acceso al sistema de gestión', status: 'Abierto', priority: 'Alta', assignedTo: 'AG001', createdAt: '2025-06-11 10:00 AM', lastUpdate: '2025-06-12 09:30 AM', requester: 'Laura Pérez' },
  { id: 'TKT002', subject: 'Solicitud de nueva cuenta de usuario', status: 'En Progreso', priority: 'Media', assignedTo: 'AG001', createdAt: '2025-06-10 03:15 PM', lastUpdate: '2025-06-12 11:00 AM', requester: 'Diego Martín' },
  { id: 'TKT003', subject: 'Consulta sobre funcionalidad de informes', status: 'Resuelto', priority: 'Baja', assignedTo: 'AG001', createdAt: '2025-06-09 09:00 AM', lastUpdate: '2025-06-10 02:00 PM', requester: 'Carlos Soto' },
  { id: 'TKT004', subject: 'Error al cargar archivo en módulo X', status: 'Abierto', priority: 'Media', assignedTo: 'AG001', createdAt: '2025-06-12 10:30 AM', lastUpdate: '2025-06-12 10:30 AM', requester: 'Sofía Díaz' },
  { id: 'TKT005', subject: 'Problema con impresora de red', status: 'En Progreso', priority: 'Baja', assignedTo: 'AG001', createdAt: '2025-06-12 11:00 AM', lastUpdate: '2025-06-12 11:00 AM', requester: 'María Fernández' },
];

const assignedTasks = [
  { id: 'TASK001', name: 'Revisar logs de servidor web', status: 'Pendiente', priority: 'Alta', assignedTo: 'AG001', dueDate: '2025-06-15', project: 'Infraestructura' },
  { id: 'TASK002', name: 'Documentar proceso de onboarding de nuevos usuarios', status: 'En Progreso', priority: 'Media', assignedTo: 'AG001', dueDate: '2025-06-20', project: 'Gestión de Procesos' },
  { id: 'TASK003', name: 'Capacitación sobre nueva herramienta de monitoreo', status: 'Completada', priority: 'Baja', assignedTo: 'AG001', dueDate: '2025-06-10', project: 'Desarrollo Interno' },
  { id: 'TASK004', name: 'Análisis de reporte de errores de Q2', status: 'Pendiente', priority: 'Alta', assignedTo: 'AG001', dueDate: '2025-06-18', project: 'Calidad de Software' },
];

const teamMembers = [
  { id: 'AG001', name: 'Ana Gómez', role: 'Soporte Senior', status: 'online', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Ana%20Gómez' },
  { id: 'JP002', name: 'Juan Pérez', role: 'Soporte Nivel 1', status: 'online', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Juan%20Pérez' },
  { id: 'ML003', name: 'Marta Luna', role: 'Especialista Infraestructura', status: 'away', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Marta%20Luna' },
  { id: 'RG004', name: 'Roberto García', role: 'Soporte Nivel 2', status: 'offline', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Roberto%20García' },
];

const knowledgeBaseArticles = [
  { id: 'KB001', title: 'Guía para restablecer contraseña de usuario', category: 'Acceso', lastUpdated: '2025-05-20', views: 500, keywords: ['contraseña', 'acceso', 'reset'] },
  { id: 'KB002', title: 'Solución de problemas de conexión a la VPN', category: 'Red', lastUpdated: '2025-06-01', views: 320, keywords: ['VPN', 'conexión', 'red'] },
  { id: 'KB003', title: 'Configuración de correo electrónico en dispositivos móviles', category: 'Productividad', lastUpdated: '2025-04-15', views: 450, keywords: ['correo', 'móvil', 'email'] },
  { id: 'KB004', title: 'Preguntas frecuentes sobre la plataforma de gestión de proyectos', category: 'Proyectos', lastUpdated: '2025-06-10', views: 180, keywords: ['proyectos', 'FAQ', 'gestión'] },
];

// Mapeo de estilos para Chips de estado y prioridad
const statusChips = {
  'Abierto': <Chip label="Abierto" size="small" color="error" icon={<ErrorOutlineIcon />} />,
  'En Progreso': <Chip label="En Progreso" size="small" color="warning" icon={<WarningAmberIcon />} />,
  'Resuelto': <Chip label="Resuelto" size="small" color="success" icon={<CheckCircleOutlineIcon />} />,
  'Pendiente': <Chip label="Pendiente" size="small" color="info" icon={<HourglassEmptyIcon />} />,
  'Completada': <Chip label="Completada" size="small" color="success" icon={<CheckCircleOutlineIcon />} />,
};

const priorityChips = {
  'Alta': <Chip label="Alta" size="small" color="error" icon={<HighPriorityIcon />} />,
  'Media': <Chip label="Media" size="small" color="warning" icon={<MediumPriorityIcon />} />,
  'Baja': <Chip label="Baja" size="small" color="info" icon={<LowPriorityIcon />} />,
};

// Componente principal
function SupportCollaborationPanel({ onGoToHome }) {
  const [currentTab, setCurrentTab] = useState('overview'); // 'overview', 'my_tickets', 'my_tasks', 'team_collab', 'knowledge_base'

  const [filterTicketStatus, setFilterTicketStatus] = useState('');
  const [filterTicketPriority, setFilterTicketPriority] = useState('');

  const [filterTaskStatus, setFilterTaskStatus] = useState('');
  const [filterTaskPriority, setFilterTaskPriority] = useState('');

  const [openTicketDetailDialog, setOpenTicketDetailDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const showSnackbar = useCallback((message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const handleOpenTicketDetail = (ticket) => {
    setSelectedTicket(ticket);
    setOpenTicketDetailDialog(true);
  };

  const handleUpdateTicketStatus = (ticketId, newStatus) => {
    // Simulación de actualización de estado
    const updatedTickets = assignedTickets.map(t =>
      t.id === ticketId ? { ...t, status: newStatus, lastUpdate: new Date().toLocaleString() } : t
    );
    // En una app real, aquí se llamaría a un setState o a una API
    showSnackbar(`Ticket ${ticketId} actualizado a "${newStatus}".`, 'success');
    setSelectedTicket(prev => prev ? { ...prev, status: newStatus, lastUpdate: new Date().toLocaleString() } : null);
  };

  const handleAssignTicket = (ticketId, memberId) => {
    showSnackbar(`Ticket ${ticketId} reasignado a ${teamMembers.find(m => m.id === memberId)?.name}.`, 'info');
  };

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    showSnackbar(`Tarea ${taskId} actualizada a "${newStatus}".`, 'success');
  };


  const filteredTickets = assignedTickets.filter(ticket => {
    const statusMatch = filterTicketStatus ? ticket.status === filterTicketStatus : true;
    const priorityMatch = filterTicketPriority ? ticket.priority === filterTicketPriority : true;
    return statusMatch && priorityMatch;
  });

  const filteredTasks = assignedTasks.filter(task => {
    const statusMatch = filterTaskStatus ? task.status === filterTaskStatus : true;
    const priorityMatch = filterTaskPriority ? task.priority === filterTaskPriority : true;
    return statusMatch && priorityMatch;
  });


  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', minHeight: '100vh', color: '#333', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#004a8f', borderBottom: '1px solid #424242' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2, color: '#fafafa' }}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}
          <SupportAgentIcon sx={{ fontSize: 36, mr: 1, color: '#ffffff' }} /> {/* Naranja para soporte */}
          <Typography variant="h3" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Panel de Soporte y Colaboración
          </Typography>
          <Chip
            avatar={<Avatar src={currentUser.avatar} />}
            label={currentUser.name}
            sx={{ bgcolor: '#ffffff', color: '#004a8f', fontWeight: 600 }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#004a8f' }}>
            Gestión Centralizada de Soporte
          </Typography>
          <Typography variant="h6" color="#616161">
            Optimiza la atención al usuario y la colaboración en equipo.
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
                backgroundColor: '#004a8f', // Naranja para soporte
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                '&.Mui-selected': {
                  color: '#004a8f', // Naranja para soporte
                },
              },
            }}
          >
            <Tab label="Resumen" value="overview" icon={<SupportAgentIcon />} iconPosition="start" />
            <Tab label="Mis Tickets" value="my_tickets" icon={<ConfirmationNumberIcon />} iconPosition="start" />
            <Tab label="Mis Tareas" value="my_tasks" icon={<TaskAltIcon />} iconPosition="start" />
            <Tab label="Colaboración en Equipo" value="team_collab" icon={<PeopleAltIcon />} iconPosition="start" />
            <Tab label="Base de Conocimiento" value="knowledge_base" icon={<LiveHelpIcon />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Contenido de las Pestañas */}
        <Box sx={{ p: 0 }}>
          {/* Tab: Resumen */}
          {currentTab === 'overview' && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', borderRadius: 2 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <ConfirmationNumberIcon sx={{ color: '#ff9800', fontSize: 30, mr: 1 }} />
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                      Tickets Asignados (Tú)
                    </Typography>
                    <Button size="small" variant="text" onClick={() => setCurrentTab('my_tickets')}>Ver Todos</Button>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <List dense>
                    {assignedTickets.filter(t => t.status !== 'Resuelto').slice(0, 5).map(ticket => (
                      <ListItem key={ticket.id} secondaryAction={priorityChips[ticket.priority]}>
                        <ListItemText
                          primary={<Typography sx={{ fontWeight: 500 }}>{ticket.subject}</Typography>}
                          secondary={`Estado: ${ticket.status} | Última Act.: ${ticket.lastUpdate}`}
                        />
                        <Tooltip title="Ver Detalles">
                          <IconButton edge="end" aria-label="details" onClick={() => handleOpenTicketDetail(ticket)}>
                            <VisibilityIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                      </ListItem>
                    ))}
                    {assignedTickets.filter(t => t.status !== 'Resuelto').length === 0 && (
                      <Alert severity="info" sx={{mt:2}}>No tienes tickets pendientes. ¡Buen trabajo!</Alert>
                    )}
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', borderRadius: 2 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <TaskAltIcon sx={{ color: '#2196f3', fontSize: 30, mr: 1 }} />
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                      Tareas Asignadas (Tú)
                    </Typography>
                    <Button size="small" variant="text" onClick={() => setCurrentTab('my_tasks')}>Ver Todas</Button>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <List dense>
                    {assignedTasks.filter(t => t.status !== 'Completada').slice(0, 5).map(task => (
                      <ListItem key={task.id} secondaryAction={priorityChips[task.priority]}>
                        <ListItemText
                          primary={<Typography sx={{ fontWeight: 500 }}>{task.name}</Typography>}
                          secondary={`Proyecto: ${task.project} | Vence: ${task.dueDate}`}
                        />
                        <Tooltip title="Marcar como Completada">
                          <IconButton edge="end" aria-label="complete" onClick={() => handleUpdateTaskStatus(task.id, 'Completada')}>
                            <CheckCircleOutlineIcon color="success" />
                          </IconButton>
                        </Tooltip>
                      </ListItem>
                    ))}
                    {assignedTasks.filter(t => t.status !== 'Completada').length === 0 && (
                      <Alert severity="success" sx={{mt:2}}>Todas tus tareas están completadas. ¡Excelente!</Alert>
                    )}
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', borderRadius: 2 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <LiveHelpIcon sx={{ color: '#4caf50', fontSize: 30, mr: 1 }} />
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                      Artículos de la Base de Conocimiento Populares
                    </Typography>
                    <Button size="small" variant="text" onClick={() => setCurrentTab('knowledge_base')}>Explorar Base</Button>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    {knowledgeBaseArticles.sort((a,b) => b.views - a.views).slice(0,3).map(article => (
                      <Grid item xs={12} sm={4} key={article.id}>
                        <Card variant="outlined" sx={{ height: '100%', bgcolor: '#fbfbfb' }}>
                          <CardContent>
                            <Typography variant="subtitle1" sx={{fontWeight: 600, mb: 1, color: '#2196f3'}}>{article.title}</Typography>
                            <Chip label={article.category} size="small" variant="outlined" color="primary" sx={{ mb: 1 }} />
                            <Typography variant="body2" color="text.secondary">Última Act.: {article.lastUpdated}</Typography>
                            <Typography variant="body2" color="text.secondary">Vistas: {article.views}</Typography>
                            <Button size="small" sx={{mt:1}}>Leer Artículo</Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  <Alert severity="info" sx={{mt:3}}>
                    La base de conocimiento es tu recurso principal para resolver consultas comunes.
                  </Alert>
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Tab: Mis Tickets */}
          {currentTab === 'my_tickets' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <ConfirmationNumberIcon sx={{ color: '#ff9800', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Mis Tickets de Soporte Asignados
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} sx={{ textTransform: 'none' }}>
                  Crear Nuevo Ticket
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Filtrar por Estado</InputLabel>
                    <Select
                      value={filterTicketStatus}
                      label="Filtrar por Estado"
                      onChange={(e) => setFilterTicketStatus(e.target.value)}
                    >
                      <MenuItem value="">Todos</MenuItem>
                      <MenuItem value="Abierto">Abierto</MenuItem>
                      <MenuItem value="En Progreso">En Progreso</MenuItem>
                      <MenuItem value="Resuelto">Resuelto</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Filtrar por Prioridad</InputLabel>
                    <Select
                      value={filterTicketPriority}
                      label="Filtrar por Prioridad"
                      onChange={(e) => setFilterTicketPriority(e.target.value)}
                    >
                      <MenuItem value="">Todas</MenuItem>
                      <MenuItem value="Alta">Alta</MenuItem>
                      <MenuItem value="Media">Media</MenuItem>
                      <MenuItem value="Baja">Baja</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 600 }}>
                <Table stickyHeader size="small">
                  <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, width: '10%' }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '30%' }}>Asunto</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '15%' }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '15%' }}>Prioridad</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '15%' }}>Última Act.</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '15%', textAlign: 'center' }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTickets.length > 0 ? (
                      filteredTickets.map((ticket) => (
                        <TableRow key={ticket.id} sx={{ bgcolor: ticket.status === 'Abierto' ? '#ffebee' : (ticket.status === 'En Progreso' ? '#fffde7' : 'inherit') }}>
                          <TableCell>{ticket.id}</TableCell>
                          <TableCell>{ticket.subject}</TableCell>
                          <TableCell>{statusChips[ticket.status]}</TableCell>
                          <TableCell>{priorityChips[ticket.priority]}</TableCell>
                          <TableCell>{ticket.lastUpdate}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            <Tooltip title="Ver Detalles">
                              <IconButton size="small" onClick={() => handleOpenTicketDetail(ticket)}>
                                <VisibilityIcon color="primary" />
                              </IconButton>
                            </Tooltip>
                            {ticket.status !== 'Resuelto' && (
                              <Tooltip title="Resolver Ticket">
                                <IconButton size="small" onClick={() => handleUpdateTicketStatus(ticket.id, 'Resuelto')}>
                                  <CheckCircleOutlineIcon color="success" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={6} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No se encontraron tickets asignados con los filtros seleccionados.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Alert severity="info" sx={{ mt: 3 }}>
                Gestiona tus tickets para asegurar una respuesta rápida y eficaz a los usuarios.
              </Alert>
            </Paper>
          )}

          {/* Tab: Mis Tareas */}
          {currentTab === 'my_tasks' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <TaskAltIcon sx={{ color: '#2196f3', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Mis Tareas Asignadas
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} sx={{ textTransform: 'none', bgcolor: '#2196f3', '&:hover': { bgcolor: '#1976d2' } }}>
                  Crear Nueva Tarea
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Filtrar por Estado</InputLabel>
                    <Select
                      value={filterTaskStatus}
                      label="Filtrar por Estado"
                      onChange={(e) => setFilterTaskStatus(e.target.value)}
                    >
                      <MenuItem value="">Todos</MenuItem>
                      <MenuItem value="Pendiente">Pendiente</MenuItem>
                      <MenuItem value="En Progreso">En Progreso</MenuItem>
                      <MenuItem value="Completada">Completada</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Filtrar por Prioridad</InputLabel>
                    <Select
                      value={filterTaskPriority}
                      label="Filtrar por Prioridad"
                      onChange={(e) => setFilterTaskPriority(e.target.value)}
                    >
                      <MenuItem value="">Todas</MenuItem>
                      <MenuItem value="Alta">Alta</MenuItem>
                      <MenuItem value="Media">Media</MenuItem>
                      <MenuItem value="Baja">Baja</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 600 }}>
                <Table stickyHeader size="small">
                  <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, width: '10%' }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '30%' }}>Nombre de la Tarea</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '15%' }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '15%' }}>Prioridad</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '15%' }}>Fecha Límite</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '15%', textAlign: 'center' }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTasks.length > 0 ? (
                      filteredTasks.map((task) => (
                        <TableRow key={task.id} sx={{ bgcolor: task.status === 'Pendiente' ? '#ffebee' : (task.status === 'En Progreso' ? '#fffde7' : 'inherit') }}>
                          <TableCell>{task.id}</TableCell>
                          <TableCell>{task.name}</TableCell>
                          <TableCell>{statusChips[task.status]}</TableCell>
                          <TableCell>{priorityChips[task.priority]}</TableCell>
                          <TableCell>{task.dueDate}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            <Tooltip title="Editar Tarea">
                              <IconButton size="small"><EditIcon color="info" /></IconButton>
                            </Tooltip>
                            {task.status !== 'Completada' && (
                              <Tooltip title="Marcar como Completada">
                                <IconButton size="small" onClick={() => handleUpdateTaskStatus(task.id, 'Completada')}>
                                  <CheckCircleOutlineIcon color="success" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={6} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No se encontraron tareas asignadas con los filtros seleccionados.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Alert severity="success" sx={{ mt: 3 }}>
                Mantén tus tareas al día para contribuir eficazmente a los proyectos.
              </Alert>
            </Paper>
          )}

          {/* Tab: Colaboración en Equipo */}
          {currentTab === 'team_collab' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <PeopleAltIcon sx={{ color: '#424242', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Colaboración del Equipo de Soporte
                </Typography>
                <Button variant="outlined" startIcon={<SettingsIcon />} sx={{ textTransform: 'none' }}>
                  Gestionar Equipo
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card elevation={0} sx={{ p: 2, bgcolor: '#e0e0e0', borderRadius: 2 }}>
                    <CardHeader title={<Typography variant="h6" sx={{color: '#333'}}>Miembros del Equipo</Typography>} sx={{pb:0}}/>
                    <CardContent sx={{pt:1}}>
                      <List dense>
                        {teamMembers.map(member => (
                          <ListItem key={member.id} secondaryAction={
                            <Chip label={member.status === 'online' ? 'En línea' : (member.status === 'away' ? 'Ausente' : 'Desconectado')}
                                  size="small"
                                  color={member.status === 'online' ? 'success' : (member.status === 'away' ? 'warning' : 'default')} />
                          }>
                            <ListItemAvatar>
                              <Avatar src={member.avatar} />
                            </ListItemAvatar>
                            <ListItemText primary={member.name} secondary={member.role} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card elevation={0} sx={{ p: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
                    <CardHeader title={<Typography variant="h6" sx={{color: '#333'}}>Estadísticas de Colaboración</Typography>} sx={{pb:0}}/>
                    <CardContent sx={{pt:1}}>
                      <Box mb={2}>
                        <Typography variant="body1" sx={{fontWeight: 500}}>Tickets Resueltos Hoy:</Typography>
                        <LinearProgress variant="determinate" value={75} sx={{height: 10, borderRadius: 5, mt: 1}} color="primary" />
                        <Typography variant="caption" color="text.secondary">3/4 objetivos diarios</Typography>
                      </Box>
                      <Box mb={2}>
                        <Typography variant="body1" sx={{fontWeight: 500}}>Promedio de Resolución (días):</Typography>
                        <Typography variant="h5" color="primary">1.5 días</Typography>
                        <Typography variant="caption" color="text.secondary">Objetivo: &lt; 2 días</Typography>
                      </Box>
                      <Alert severity="info">
                        La colaboración efectiva reduce los tiempos de respuesta y mejora la satisfacción del cliente.
                      </Alert>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: '#fffde7', borderRadius: 2, border: '1px dashed #ffb300' }}>
                    <Typography variant="h6" gutterBottom sx={{color: '#ff9800'}}>Comunicaciones Recientes del Equipo</Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon><ForumIcon /></ListItemIcon>
                        <ListItemText primary="Juan Pérez comentó en el ticket TKT001: 'Ya revisé los logs, parece ser un problema de permisos.'" secondary="2025-06-12 11:30 AM" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><ForumIcon /></ListItemIcon>
                        <ListItemText primary="Marta Luna solicitó ayuda en la tarea TASK002: 'Necesito acceso a la documentación de AWS.'" secondary="2025-06-12 10:00 AM" />
                      </ListItem>
                    </List>
                    <Button size="small" sx={{mt:1}}>Ver Historial Completo</Button>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* Tab: Base de Conocimiento */}
          {currentTab === 'knowledge_base' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <LiveHelpIcon sx={{ color: '#4caf50', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Base de Conocimiento y FAQ
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} sx={{ textTransform: 'none', bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}>
                  Añadir Artículo
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <TextField
                fullWidth
                variant="outlined"
                placeholder="Buscar artículos por título o palabra clave..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <Grid container spacing={3}>
                {knowledgeBaseArticles.map(article => (
                  <Grid item xs={12} sm={6} md={4} key={article.id}>
                    <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#fdfdfd' }}>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box display="flex" alignItems="center" mb={1}>
                          <QuestionAnswerIcon color="action" sx={{mr:1}}/>
                          <Typography variant="subtitle1" sx={{fontWeight: 600, color: '#2196f3'}}>{article.title}</Typography>
                        </Box>
                        <Chip label={article.category} size="small" variant="outlined" color="primary" sx={{ mb: 1 }} />
                        <Typography variant="body2" color="text.secondary">Última Actualización: {article.lastUpdated}</Typography>
                        <Typography variant="body2" color="text.secondary">Vistas: {article.views}</Typography>
                        <Box sx={{ mt: 1 }}>
                          {article.keywords.map((kw, index) => (
                            <Chip key={index} label={kw} size="small" sx={{ mr: 0.5, mb: 0.5 }} variant="outlined" />
                          ))}
                        </Box>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'flex-end', borderTop: '1px solid #eee' }}>
                        <Button size="small" startIcon={<VisibilityIcon />}>Ver Artículo</Button>
                        <Button size="small" startIcon={<EditIcon />}>Editar</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Alert severity="success" sx={{ mt: 3 }}>
                Una base de conocimiento completa empodera a los usuarios y reduce la carga del soporte.
              </Alert>
            </Paper>
          )}
        </Box>
      </Container>

      {/* Dialog para Detalles del Ticket */}
      <Dialog open={openTicketDetailDialog} onClose={() => setOpenTicketDetailDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>
          Detalles del Ticket: {selectedTicket?.id}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          {selectedTicket ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Asunto:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>{selectedTicket.subject}</Typography>

                <Typography variant="body2" color="text.secondary">Estado:</Typography>
                <Box sx={{ mb: 1 }}>{statusChips[selectedTicket.status]}</Box>

                <Typography variant="body2" color="text.secondary">Prioridad:</Typography>
                <Box sx={{ mb: 1 }}>{priorityChips[selectedTicket.priority]}</Box>

                <Typography variant="body2" color="text.secondary">Solicitante:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>{selectedTicket.requester}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Fecha de Creación:</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>{selectedTicket.createdAt}</Typography>

                <Typography variant="body2" color="text.secondary">Última Actualización:</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>{selectedTicket.lastUpdate}</Typography>

                <FormControl fullWidth margin="dense" sx={{ mb: 1 }}>
                  <InputLabel>Asignado a</InputLabel>
                  <Select
                    value={selectedTicket.assignedTo}
                    label="Asignado a"
                    onChange={(e) => handleAssignTicket(selectedTicket.id, e.target.value)}
                  >
                    {teamMembers.map(member => (
                      <MenuItem key={member.id} value={member.id}>{member.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth margin="dense">
                  <InputLabel>Cambiar Estado</InputLabel>
                  <Select
                    value={selectedTicket.status}
                    label="Cambiar Estado"
                    onChange={(e) => handleUpdateTicketStatus(selectedTicket.id, e.target.value)}
                  >
                    <MenuItem value="Abierto">Abierto</MenuItem>
                    <MenuItem value="En Progreso">En Progreso</MenuItem>
                    <MenuItem value="Resuelto">Resuelto</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>Historial de Actividad</Typography>
                <List dense sx={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #eee', borderRadius: 1, bgcolor: '#fafafa' }}>
                  <ListItem>
                    <ListItemIcon><HistoryIcon color="action" /></ListItemIcon>
                    <ListItemText primary="Ticket creado por Laura Pérez" secondary="2025-06-11 10:00 AM" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><ForumIcon color="action" /></ListItemIcon>
                    <ListItemText primary="Ana Gómez añadió un comentario: 'Investigando el problema de credenciales.'" secondary="2025-06-11 03:00 PM" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><AttachFileIcon color="action" /></ListItemIcon>
                    <ListItemText primary="Adjunto: 'screenshot_error.png'" secondary="2025-06-11 03:10 PM" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><ForumIcon color="action" /></ListItemIcon>
                    <ListItemText primary="Ana Gómez actualizó el estado a 'En Progreso'" secondary="2025-06-12 09:30 AM" />
                  </ListItem>
                </List>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="Añadir comentario o actualización..."
                  variant="outlined"
                  sx={{ mt: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton color="primary" sx={{mr:-1}}><SendIcon /></IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          ) : (
            <Typography>Cargando detalles del ticket...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTicketDetailDialog(false)} color="secondary">Cerrar</Button>
          <Button variant="contained" color="primary" onClick={() => showSnackbar('Guardando cambios...', 'info')}>
            Guardar Cambios
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

export default SupportCollaborationPanel;