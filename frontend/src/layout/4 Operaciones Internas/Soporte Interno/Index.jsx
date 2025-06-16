import React, { useState } from 'react';
import {
  Container, Typography, Box, Grid, Paper, Chip, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  Button, IconButton, Tooltip, AppBar, Toolbar,
  Accordion, AccordionSummary, AccordionDetails,
  List, ListItem, ListItemText, ListItemIcon,
  TextField, FormControl, InputLabel, Select, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions,
  LinearProgress, ToggleButton, ToggleButtonGroup,
  Avatar, Menu
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import SupportAgentIcon from '@mui/icons-material/SupportAgent'; // Icono principal de Soporte Interno
import BugReportIcon from '@mui/icons-material/BugReport'; // Tickets / Incidencias
import TaskIcon from '@mui/icons-material/Task'; // Tareas Personales
import EventNoteIcon from '@mui/icons-material/EventNote'; // Bitácora de Actividades
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Añadir
import EditIcon from '@mui/icons-material/Edit'; // Editar
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ver detalles
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Accordion
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Volver atrás
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // En progreso
import DoneAllIcon from '@mui/icons-material/DoneAll'; // Completado
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'; // Pendiente
import CloseIcon from '@mui/icons-material/Close'; // Cerrado/Cancelado
import UpdateIcon from '@mui/icons-material/Update'; // Última Actualización
import DeleteIcon from '@mui/icons-material/Delete'; // Eliminar
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Más acciones
import PersonIcon from '@mui/icons-material/Person'; // Usuario
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'; // Prioridad Alta
import PriorityMediumIcon from '@mui/icons-material/LabelImportant'; // Prioridad Media
import PriorityLowIcon from '@mui/icons-material/KeyboardArrowDown'; // Prioridad Baja
import AttachFileIcon from '@mui/icons-material/AttachFile'; // Archivos Adjuntos
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'; // Solución/Resolución
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // Preguntas Frecuentes
import ArticleIcon from '@mui/icons-material/Article';
import SearchIcon from '@mui/icons-material/Search'; // Base de Conocimiento

// --- Datos Simulados de Soporte Interno ---
const simulatedHelpdeskTickets = [
  {
    id: 'HD-001',
    subject: 'Error al iniciar sesión en CRM',
    description: 'No puedo acceder al sistema CRM, me aparece un error de autenticación después de ingresar mis credenciales.',
    requester: 'María Gómez',
    assignedTo: 'Soporte TI - Nivel 1',
    priority: 'Alta',
    status: 'Abierto',
    category: 'Acceso y Credenciales',
    createdAt: '2025-06-10 09:30',
    lastUpdate: '2025-06-11 14:00',
    resolution: null,
    comments: [
      { user: 'María Gómez', date: '2025-06-10 09:35', text: 'Ya intenté reiniciar el navegador y sigue igual.' },
      { user: 'Soporte TI - Nivel 1', date: '2025-06-10 10:00', text: 'Ticket recibido. Estamos revisando logs de autenticación.' },
      { user: 'Soporte TI - Nivel 1', date: '2025-06-11 14:00', text: 'Se restableció la caché del usuario. Por favor, intenta de nuevo.' },
    ],
    attachments: [],
    linkedKBArticle: 'KB-005', // Simulación de enlace a un artículo de KB
  },
  {
    id: 'HD-002',
    subject: 'Solicitud de software - Adobe Acrobat Pro',
    description: 'Necesito instalar Adobe Acrobat Pro en mi equipo para gestionar documentos PDF.',
    requester: 'Juan Pérez',
    assignedTo: 'Soporte TI - Nivel 2',
    priority: 'Media',
    status: 'En Progreso',
    category: 'Software y Licencias',
    createdAt: '2025-06-09 11:00',
    lastUpdate: '2025-06-10 16:00',
    resolution: null,
    comments: [
      { user: 'Soporte TI - Nivel 2', date: '2025-06-10 09:00', text: 'Solicitud aprobada. Coordinando la instalación.' },
    ],
    attachments: [],
  },
  {
    id: 'HD-003',
    subject: 'Problema con la impresora de la oficina 305',
    description: 'La impresora de la oficina 305 no imprime, da un error de "bandeja de papel vacía" aunque está llena.',
    requester: 'Pedro Sánchez',
    assignedTo: 'Soporte TI - Campo',
    priority: 'Baja',
    status: 'Cerrado',
    category: 'Hardware y Periféricos',
    createdAt: '2025-06-08 15:00',
    lastUpdate: '2025-06-08 17:30',
    resolution: 'Se encontró un atasco de papel mínimo que no era visible. Se retiró y la impresora funciona correctamente.',
    comments: [],
    attachments: [],
  },
  {
    id: 'HD-004',
    subject: 'Configuración de VPN para trabajo remoto',
    description: 'Necesito ayuda para configurar la conexión VPN en mi laptop personal para acceder a los recursos de la empresa desde casa.',
    requester: 'Ana Torres',
    assignedTo: 'Soporte TI - Nivel 1',
    priority: 'Media',
    status: 'Pendiente',
    category: 'Redes y Conectividad',
    createdAt: '2025-06-11 10:00',
    lastUpdate: '2025-06-11 10:00',
    resolution: null,
    comments: [],
    attachments: [],
  },
];

const simulatedPersonalTasks = [
  { id: 'PT-001', title: 'Actualizar mi perfil en el sistema HR', status: 'Pendiente', dueDate: '2025-06-20', notes: 'Asegurarse de cargar el último certificado.' },
  { id: 'PT-002', title: 'Completar curso de seguridad de datos', status: 'En Progreso', dueDate: '2025-06-15', notes: 'Módulo 3 pendiente.' },
  { id: 'PT-003', title: 'Programar revisión anual de desempeño', status: 'Completado', dueDate: '2025-06-05', notes: 'Reunión con mi jefe realizada.' },
];

const simulatedActivityLog = [
  { id: 1, timestamp: '2025-06-11 15:30', user: 'María Gómez', activity: 'Comentó en el ticket HD-001: "Ya intenté reiniciar el navegador y sigue igual."' },
  { id: 2, timestamp: '2025-06-11 14:00', user: 'Soporte TI - Nivel 1', activity: 'Actualizó el estado del ticket HD-001 a "En Progreso" y añadió resolución.' },
  { id: 3, timestamp: '2025-06-11 10:00', user: 'Ana Torres', activity: 'Creó el ticket HD-004: "Configuración de VPN para trabajo remoto".' },
  { id: 4, timestamp: '2025-06-10 16:00', user: 'Juan Pérez', activity: 'Actualizó su tarea personal PT-002 a "En Progreso".' },
  { id: 5, timestamp: '2025-06-08 17:30', user: 'Soporte TI - Campo', activity: 'Cerró el ticket HD-003: "Problema con la impresora de la oficina 305".' },
];

const simulatedKBArticles = [
  { id: 'KB-001', title: 'Guía para Configurar VPN Corporativa', content: 'Pasos detallados para establecer conexión VPN...', tags: ['VPN', 'Acceso Remoto', 'Conectividad'] },
  { id: 'KB-002', title: 'Solución a Errores Comunes de Impresión', content: 'Problemas frecuentes y sus soluciones para impresoras de oficina...', tags: ['Impresora', 'Hardware', 'Troubleshooting'] },
  { id: 'KB-003', title: 'Restablecimiento de Contraseña de Red', content: 'Cómo restablecer tu contraseña de usuario en la red interna...', tags: ['Contraseña', 'Acceso', 'Seguridad'] },
  { id: 'KB-004', title: 'Instalación de Software Aprobado', content: 'Procedimiento para solicitar e instalar software autorizado...', tags: ['Software', 'Instalación', 'Licencias'] },
  { id: 'KB-005', title: 'Diagnóstico de Problemas de Inicio de Sesión en CRM', content: 'Pasos para diagnosticar y resolver problemas al acceder al CRM...', tags: ['CRM', 'Acceso', 'Login'] },
];

function InternalHelpdesk({ onGoToHome }) {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [openNewTicketDialog, setOpenNewTicketDialog] = useState(false);
  const [newTicketData, setNewTicketData] = useState({
    subject: '', description: '', requester: 'Usuario Actual', priority: 'Media', category: 'General', assignedTo: 'Soporte TI - Nivel 1'
  });
  const [filterTicketStatus, setFilterTicketStatus] = useState('Abierto');
  const [filterTicketCategory, setFilterTicketCategory] = useState('Todos');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentView, setCurrentView] = useState('tickets'); // 'tickets', 'personal_tasks', 'kb', 'faq'

  // Unique lists for filters
  const uniqueCategories = ['Todos', ...new Set(simulatedHelpdeskTickets.map(ticket => ticket.category))].sort();
  const uniqueStatuses = ['Abierto', 'En Progreso', 'Pendiente', 'Cerrado']; // Defined order

  const getStatusChip = (status) => {
    switch (status) {
      case 'Abierto': return <Chip label="Abierto" color="error" size="small" icon={<BugReportIcon fontSize="small" />} />;
      case 'En Progreso': return <Chip label="En Progreso" color="primary" size="small" icon={<AccessTimeIcon fontSize="small" />} />;
      case 'Pendiente': return <Chip label="Pendiente" color="warning" size="small" icon={<HourglassEmptyIcon fontSize="small" />} />;
      case 'Cerrado': return <Chip label="Cerrado" color="success" size="small" icon={<DoneAllIcon fontSize="small" />} />;
      default: return <Chip label={status} size="small" />;
    }
  };

  const getPriorityChip = (priority) => {
    switch (priority) {
      case 'Alta': return <Chip label="Alta" color="error" size="small" icon={<PriorityHighIcon fontSize="small" />} />;
      case 'Media': return <Chip label="Media" color="warning" size="small" icon={<PriorityMediumIcon fontSize="small" />} />;
      case 'Baja': return <Chip label="Baja" color="info" size="small" icon={<PriorityLowIcon fontSize="small" />} />;
      default: return <Chip label={priority} size="small" />;
    }
  };

  const getTaskStatusChip = (status) => {
    switch (status) {
      case 'Pendiente': return <Chip label="Pendiente" size="small" icon={<HourglassEmptyIcon fontSize="small" />} />;
      case 'En Progreso': return <Chip label="En Progreso" color="primary" size="small" icon={<AccessTimeIcon fontSize="small" />} />;
      case 'Completado': return <Chip label="Completado" color="success" size="small" icon={<DoneAllIcon fontSize="small" />} />;
      default: return <Chip label={status} size="small" />;
    }
  };

  const filteredTickets = simulatedHelpdeskTickets.filter(ticket =>
    (filterTicketStatus === 'Todos' || ticket.status === filterTicketStatus) &&
    (filterTicketCategory === 'Todos' || ticket.category === filterTicketCategory)
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenNewTicketDialog = () => {
    setOpenNewTicketDialog(true);
    setNewTicketData({
      subject: '', description: '', requester: 'Usuario Actual', priority: 'Media', category: 'General', assignedTo: 'Soporte TI - Nivel 1'
    });
  };

  const handleCloseNewTicketDialog = () => {
    setOpenNewTicketDialog(false);
  };

  const handleSaveNewTicket = () => {
    if (newTicketData.subject && newTicketData.description) {
      const newId = `HD-${(simulatedHelpdeskTickets.length + 1).toString().padStart(3, '0')}`;
      const newTicket = {
        id: newId,
        createdAt: new Date().toLocaleString('es-CO'),
        lastUpdate: new Date().toLocaleString('es-CO'),
        resolution: null,
        comments: [{ user: 'Sistema', date: new Date().toLocaleString('es-CO'), text: 'Ticket creado.' }],
        attachments: [],
        linkedKBArticle: null,
        ...newTicketData,
      };
      simulatedHelpdeskTickets.unshift(newTicket); // Add to the beginning for visibility
      alert(`Ticket ${newId} - "${newTicketData.subject}" creado con éxito.`);
      handleCloseNewTicketDialog();
      setSelectedTicket(newTicket); // Show new ticket details immediately
    } else {
      alert('Por favor, completa el Asunto y la Descripción del ticket.');
    }
  };

  const handleViewKBArticle = (kbId) => {
    const article = simulatedKBArticles.find(a => a.id === kbId);
    if (article) {
      alert(`Artículo de Base de Conocimiento: ${article.title}\n\n${article.content}`);
    } else {
      alert('Artículo de Base de Conocimiento no encontrado.');
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
          {selectedTicket && (
            <Tooltip title="Volver a la Lista de Tickets">
              <IconButton edge="start" color="inherit" aria-label="back" onClick={() => setSelectedTicket(null)} sx={{ mr: 2 }}>
                <ArrowBackIcon sx={{ color: '#424242' }} />
              </IconButton>
            </Tooltip>
          )}
          <SupportAgentIcon sx={{ fontSize: 36, mr: 1, color: '#f57c00' }} /> {/* Naranja para Helpdesk */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#424242' }}>
            Soporte Interno (Helpdesk)
          </Typography>
          <ToggleButtonGroup
            value={currentView}
            exclusive
            onChange={(event, newView) => setCurrentView(newView)}
            aria-label="view selector"
            size="small"
            sx={{ bgcolor: '#eee', borderRadius: 1 }}
          >
            <ToggleButton value="tickets" aria-label="tickets">
              <BugReportIcon sx={{ mr: 0.5 }} /> Tickets
            </ToggleButton>
            <ToggleButton value="personal_tasks" aria-label="personal tasks">
              <TaskIcon sx={{ mr: 0.5 }} /> Mis Tareas
            </ToggleButton>
            <ToggleButton value="kb" aria-label="knowledge base">
              <ArticleIcon sx={{ mr: 0.5 }} /> Base Conocimiento
            </ToggleButton>
            <ToggleButton value="faq" aria-label="faq">
              <HelpOutlineIcon sx={{ mr: 0.5 }} /> FAQ
            </ToggleButton>
          </ToggleButtonGroup>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#f57c00' }}>
            {selectedTicket ? `Detalle del Ticket: ${selectedTicket.subject}` : "Soporte TI a tu Alcance"}
          </Typography>
          <Typography variant="h6" color="#616161">
            {selectedTicket ? "Información completa, seguimiento y resolución de incidencias." : "Reporta incidencias, gestiona tus tareas y encuentra soluciones rápidamente."}
          </Typography>
        </Box>

        {/* Sección de Tickets de Soporte Interno */}
        {currentView === 'tickets' && !selectedTicket && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <BugReportIcon sx={{ color: '#f57c00', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Mis Tickets de Soporte
              </Typography>
              <Button variant="contained" startIcon={<AddCircleOutlineIcon />} color="warning" sx={{ textTransform: 'none' }} onClick={handleOpenNewTicketDialog}>
                Crear Nuevo Ticket
              </Button>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

            {/* Filtros de Tickets */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel size="small">Estado</InputLabel>
                <Select size="small" value={filterTicketStatus} label="Estado" onChange={(e) => setFilterTicketStatus(e.target.value)}>
                  {uniqueStatuses.map(status => <MenuItem key={status} value={status}>{status}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel size="small">Categoría</InputLabel>
                <Select size="small" value={filterTicketCategory} label="Categoría" onChange={(e) => setFilterTicketCategory(e.target.value)}>
                  {uniqueCategories.map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>

            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 500 }}>
              <Table aria-label="helpdesk tickets table" stickyHeader>
                <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Asunto</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Solicitante</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Asignado A</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Prioridad</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Estado</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Última Act.</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: '#424242' }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                      ? filteredTickets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : filteredTickets
                  ).map((ticket) => (
                    <TableRow key={ticket.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f0f0f0' } }}>
                      <TableCell sx={{ color: '#333' }}>{ticket.id}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{ticket.subject}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{ticket.requester}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{ticket.assignedTo}</TableCell>
                      <TableCell>{getPriorityChip(ticket.priority)}</TableCell>
                      <TableCell>{getStatusChip(ticket.status)}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{ticket.lastUpdate.split(' ')[0]}</TableCell> {/* Solo la fecha */}
                      <TableCell align="right">
                        <Tooltip title="Ver Detalles">
                          <IconButton onClick={() => setSelectedTicket(ticket)} color="primary" size="small">
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar Ticket">
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
              count={filteredTickets.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Tickets por página:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
            />
          </Paper>
        )}

        {/* Detalle de Ticket de Soporte Interno */}
        {selectedTicket && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <BugReportIcon sx={{ color: '#f57c00', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Información del Ticket
                  </Typography>
                  <Tooltip title="Editar Ticket">
                    <IconButton color="info" size="small"><EditIcon /></IconButton>
                  </Tooltip>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                <List dense>
                  <ListItem><ListItemText primary="ID de Ticket" secondary={selectedTicket.id} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Asunto" secondary={selectedTicket.subject} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Solicitante" secondary={selectedTicket.requester} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Asignado A" secondary={selectedTicket.assignedTo} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Prioridad" secondary={getPriorityChip(selectedTicket.priority)} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} /></ListItem>
                  <ListItem><ListItemText primary="Estado" secondary={getStatusChip(selectedTicket.status)} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} /></ListItem>
                  <ListItem><ListItemText primary="Categoría" secondary={selectedTicket.category} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Creado" secondary={selectedTicket.createdAt} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Última Actualización" secondary={selectedTicket.lastUpdate} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                </List>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>Descripción</Typography>
                  <TextField
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={selectedTicket.description}
                    InputProps={{ readOnly: true }}
                    sx={{ bgcolor: '#f8f8f8', '.MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' } }}
                  />
                </Box>
                {selectedTicket.linkedKBArticle && (
                  <Box sx={{ mt: 3, p: 2, bgcolor: '#e3f2fd', border: '1px dashed #90caf9', borderRadius: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 1 }}>
                      <ArticleIcon fontSize="small" sx={{ mr: 0.5 }} /> Artículo de Base de Conocimiento Relacionado:
                    </Typography>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => handleViewKBArticle(selectedTicket.linkedKBArticle)}
                      sx={{ textTransform: 'none', color: '#1976d2' }}
                    >
                      {simulatedKBArticles.find(a => a.id === selectedTicket.linkedKBArticle)?.title || selectedTicket.linkedKBArticle}
                    </Button>
                  </Box>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Comentarios/Historial del Ticket */}
              <Paper elevation={4} sx={{ p: 3, mb: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <EventNoteIcon sx={{ color: '#f57c00', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Historial y Comentarios
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                <List dense sx={{ maxHeight: 250, overflowY: 'auto' }}>
                  {selectedTicket.comments.length === 0 ? (
                    <Typography variant="body2" color="#616161" sx={{ ml: 2 }}>No hay comentarios.</Typography>
                  ) : (
                    selectedTicket.comments.map((comment, index) => (
                      <ListItem key={index} sx={{ alignItems: 'flex-start', mb: 1, borderBottom: '1px solid #eee' }}>
                        <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: '#bdbdbd', fontSize: '0.8rem' }}>{comment.user.charAt(0)}</Avatar>
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

              {/* Resolución del Ticket */}
              <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <SettingsSuggestIcon sx={{ color: '#f57c00', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Resolución
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                {selectedTicket.resolution ? (
                  <TextField
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={selectedTicket.resolution}
                    InputProps={{ readOnly: true }}
                    sx={{ bgcolor: '#e8f5e9', '.MuiOutlinedInput-notchedOutline': { borderColor: '#a5d6a7' } }}
                  />
                ) : (
                  <Typography variant="body2" color="#616161">Este ticket aún no ha sido resuelto.</Typography>
                )}
                <Button variant="contained" color="success" startIcon={<DoneAllIcon />} sx={{ mt: 2, textTransform: 'none', mr: 1 }} disabled={!!selectedTicket.resolution}>
                  Marcar como Resuelto
                </Button>
                <Button variant="outlined" color="primary" startIcon={<UpdateIcon />} sx={{ mt: 2, textTransform: 'none' }} disabled={!!selectedTicket.resolution}>
                  Añadir Resolución
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Sección de Tareas Personales */}
        {currentView === 'personal_tasks' && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <TaskIcon sx={{ color: '#4caf50', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Mis Tareas Personales
              </Typography>
              <Button variant="contained" startIcon={<AddCircleOutlineIcon />} color="success" sx={{ textTransform: 'none' }}>
                Nueva Tarea Personal
              </Button>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 400 }}>
              <Table aria-label="personal tasks table" stickyHeader>
                <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Título</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Fecha Límite</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Estado</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: '#424242' }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {simulatedPersonalTasks.map((task) => (
                    <TableRow key={task.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f0f0f0' } }}>
                      <TableCell sx={{ color: '#333' }}>{task.id}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{task.title}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{task.dueDate}</TableCell>
                      <TableCell>{getTaskStatusChip(task.status)}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="Ver Notas">
                          <IconButton onClick={() => alert(`Notas: ${task.notes || 'No hay notas.'}`)} color="primary" size="small">
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar Tarea">
                          <IconButton color="info" size="small">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Marcar como Completada">
                          <IconButton color="success" size="small">
                            <DoneAllIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* Sección de Base de Conocimiento */}
        {currentView === 'kb' && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <ArticleIcon sx={{ color: '#1976d2', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Base de Conocimiento
              </Typography>
              <Button variant="contained" startIcon={<AddCircleOutlineIcon />} color="info" sx={{ textTransform: 'none' }}>
                Añadir Artículo
              </Button>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />
            <TextField
              fullWidth
              label="Buscar en la Base de Conocimiento"
              variant="outlined"
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: <IconButton><SearchIcon /></IconButton> // Assuming SearchIcon from @mui/icons-material
              }}
            />
            <List sx={{ maxHeight: 500, overflowY: 'auto' }}>
              {simulatedKBArticles.map((article) => (
                <Accordion key={article.id} elevation={1} sx={{ mb: 1, border: '1px solid #e0e0e0' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#fcfcfc' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333', flexGrow: 1 }}>
                      {article.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {article.tags.map((tag, idx) => (
                        <Chip key={idx} label={tag} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ bgcolor: '#fafafa', borderTop: '1px solid #eee' }}>
                    <Typography variant="body2" color="#616161" sx={{ whiteSpace: 'pre-line' }}>
                      {article.content}
                    </Typography>
                    <Box sx={{ mt: 2, textAlign: 'right' }}>
                      <Button variant="text" size="small" startIcon={<EditIcon />} sx={{ mr: 1, textTransform: 'none' }}>Editar</Button>
                      <Button variant="text" size="small" startIcon={<ShareIcon />} sx={{ textTransform: 'none' }}>Compartir</Button> {/* Assuming ShareIcon */}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </List>
          </Paper>
        )}

        {/* Sección de Preguntas Frecuentes (FAQ) */}
        {currentView === 'faq' && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <HelpOutlineIcon sx={{ color: '#9c27b0', fontSize: 30, mr: 1 }} /> {/* Morado para FAQ */}
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Preguntas Frecuentes (FAQ)
              </Typography>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />
            <TextField
              fullWidth
              label="Buscar preguntas frecuentes"
              variant="outlined"
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: <IconButton><SearchIcon /></IconButton>
              }}
            />
            <List sx={{ maxHeight: 500, overflowY: 'auto' }}>
              <Accordion elevation={1} sx={{ mb: 1, border: '1px solid #e0e0e0' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#fcfcfc' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333' }}>
                    ¿Cómo puedo restablecer mi contraseña de red?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ bgcolor: '#fafafa', borderTop: '1px solid #eee' }}>
                  <Typography variant="body2" color="#616161">
                    Puedes restablecer tu contraseña visitando el portal de autoservicio de TI en [enlace]. Si experimentas problemas, crea un ticket de soporte.
                  </Typography>
                  <Button size="small" sx={{ mt: 1, textTransform: 'none' }} onClick={() => handleViewKBArticle('KB-003')}>Ver Artículo de KB</Button>
                </AccordionDetails>
              </Accordion>
              <Accordion elevation={1} sx={{ mb: 1, border: '1px solid #e0e0e0' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#fcfcfc' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333' }}>
                    ¿Cómo solicito nuevo software para mi equipo?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ bgcolor: '#fafafa', borderTop: '1px solid #eee' }}>
                  <Typography variant="body2" color="#616161">
                    Todas las solicitudes de software deben realizarse a través del portal de Helpdesk, creando un ticket en la categoría "Software y Licencias".
                  </Typography>
                  <Button size="small" sx={{ mt: 1, textTransform: 'none' }} onClick={() => handleViewKBArticle('KB-004')}>Ver Artículo de KB</Button>
                </AccordionDetails>
              </Accordion>
              <Accordion elevation={1} sx={{ mb: 1, border: '1px solid #e0e0e0' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#fcfcfc' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333' }}>
                    ¿Qué hago si mi acceso a la VPN no funciona?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ bgcolor: '#fafafa', borderTop: '1px solid #eee' }}>
                  <Typography variant="body2" color="#616161">
                    Primero, verifica tu conexión a internet. Luego, asegúrate de que tu cliente VPN esté actualizado. Si el problema persiste, crea un ticket de soporte de inmediato.
                  </Typography>
                  <Button size="small" sx={{ mt: 1, textTransform: 'none' }} onClick={() => handleViewKBArticle('KB-001')}>Ver Artículo de KB</Button>
                </AccordionDetails>
              </Accordion>
              {/* Agrega más FAQs aquí */}
            </List>
          </Paper>
        )}

        {/* Bitácora de Actividades (Siempre visible en la vista general de tickets) */}
        {currentView === 'tickets' && !selectedTicket && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <EventNoteIcon sx={{ color: '#f57c00', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Bitácora de Actividades Recientes
              </Typography>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />
            <List dense sx={{ maxHeight: 300, overflowY: 'auto' }}>
              {simulatedActivityLog.map((log) => (
                <ListItem key={log.id} sx={{ borderLeft: '3px solid #ffcc80', mb: 1, p: 1, '&:hover': { bgcolor: '#f0f0f0' } }}>
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
            <Button variant="text" sx={{ mt: 2, textTransform: 'none', color: '#f57c00' }}>Ver Bitácora Completa</Button>
          </Paper>
        )}
      </Container>

      {/* Dialog para Nuevo Ticket */}
      <Dialog open={openNewTicketDialog} onClose={handleCloseNewTicketDialog}>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>Crear Nuevo Ticket de Soporte</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField margin="normal" label="Asunto del Ticket" fullWidth value={newTicketData.subject} onChange={(e) => setNewTicketData({ ...newTicketData, subject: e.target.value })} />
          <TextField margin="normal" label="Descripción Detallada del Problema" multiline rows={4} fullWidth value={newTicketData.description} onChange={(e) => setNewTicketData({ ...newTicketData, description: e.target.value })} helperText="Proporciona la mayor cantidad de detalles posible para agilizar la resolución." />
          <FormControl fullWidth margin="normal">
            <InputLabel>Prioridad</InputLabel>
            <Select value={newTicketData.priority} label="Prioridad" onChange={(e) => setNewTicketData({ ...newTicketData, priority: e.target.value })}>
              <MenuItem value="Alta">Alta</MenuItem>
              <MenuItem value="Media">Media</MenuItem>
              <MenuItem value="Baja">Baja</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Categoría</InputLabel>
            <Select value={newTicketData.category} label="Categoría" onChange={(e) => setNewTicketData({ ...newTicketData, category: e.target.value })}>
              {uniqueCategories.filter(c => c !== 'Todos').map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}
              <MenuItem value="General">General</MenuItem>
            </Select>
          </FormControl>
          <TextField margin="normal" label="Solicitante" fullWidth value={newTicketData.requester} onChange={(e) => setNewTicketData({ ...newTicketData, requester: e.target.value })} disabled helperText="Tu nombre de usuario se autocompleta." />
          <TextField margin="normal" label="Asignar a" fullWidth value={newTicketData.assignedTo} onChange={(e) => setNewTicketData({ ...newTicketData, assignedTo: e.target.value })} helperText="El equipo de soporte asignará el ticket inicialmente." />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseNewTicketDialog} color="secondary">Cancelar</Button>
          <Button onClick={handleSaveNewTicket} variant="contained" color="warning">Crear Ticket</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default InternalHelpdesk;