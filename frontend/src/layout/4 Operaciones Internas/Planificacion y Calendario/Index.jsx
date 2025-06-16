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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'; // Icono principal de Calendario
import EventIcon from '@mui/icons-material/Event'; // Eventos
import TaskIcon from '@mui/icons-material/Task'; // Tareas (ya lo usamos)
import FlagIcon from '@mui/icons-material/Flag'; // Hitos (ya lo usamos)
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'; // Reuniones
import DescriptionIcon from '@mui/icons-material/Description'; // Minutas / Acuerdos
import EventNoteIcon from '@mui/icons-material/EventNote'; // Bitácora de Actividades
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Añadir
import EditIcon from '@mui/icons-material/Edit'; // Editar
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ver detalles
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Accordion
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Volver atrás
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // En progreso
import DoneAllIcon from '@mui/icons-material/DoneAll'; // Completado
import CloseIcon from '@mui/icons-material/Close'; // Cancelado
import UpdateIcon from '@mui/icons-material/Update'; // Última Actualización
import DeleteIcon from '@mui/icons-material/Delete'; // Eliminar
import PeopleIcon from '@mui/icons-material/People'; // Asistentes

// FullCalendar Imports (requiere instalación: npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid)
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // For dateClick and eventClick

// --- Datos Simulados de Planificación ---
const simulatedCalendarEvents = [
  { id: 'E001', title: 'Reunión de Standup Diario', date: '2025-06-12', time: '09:00', type: 'Reunión', category: 'Desarrollo', allDay: false },
  { id: 'E002', title: 'Entrega de Fase 1 Plataforma', date: '2025-06-15', type: 'Hito', category: 'Proyecto', allDay: true },
  { id: 'E003', title: 'Presentación a Clientes', date: '2025-06-18', time: '14:00', type: 'Evento', category: 'Comercial', allDay: false },
  { id: 'E004', title: 'Sprint Review', date: '2025-06-21', time: '10:00', type: 'Reunión', category: 'Desarrollo', allDay: false },
  { id: 'E005', title: 'Vacaciones de Juan P.', date: '2025-06-24', end: '2025-06-28', type: 'Ausencia', category: 'RRHH', allDay: true },
  { id: 'E006', title: 'Entrenamiento de Nuevas Herramientas', date: '2025-07-05', type: 'Evento', category: 'Capacitación', allDay: true },
];

const simulatedMeetings = [
  {
    id: 'M001',
    title: 'Reunión de Planificación de Sprint',
    date: '2025-06-03',
    time: '10:00 - 12:00',
    organizer: 'Laura Giraldo',
    attendees: ['Juan Pérez', 'María Gómez', 'Sofía Castro', 'Pedro Rojas'],
    location: 'Sala 3 / Remota',
    agenda: [
      'Revisión de Backlog',
      'Estimación de Tareas',
      'Asignación de Responsabilidades',
      'Definición de Objetivo del Sprint',
    ],
    minutes: {
      date: '2025-06-03',
      recorder: 'María Gómez',
      summary: 'Se definieron las tareas para el próximo sprint, priorizando las de mayor impacto. Se asignaron las tareas principales de desarrollo backend a María y frontend a Pedro.',
      agreements: [
        { item: 'Implementar 2FA en login', responsible: 'Juan Pérez', dueDate: '2025-07-01' },
        { item: 'Diseñar nueva interfaz de carrito', responsible: 'Sofía Castro', dueDate: '2025-06-20' },
      ],
      pendingActions: [
        { item: 'Investigar librería de pagos XYZ', responsible: 'Pedro Rojas', dueDate: '2025-06-10' },
      ]
    }
  },
  {
    id: 'M002',
    title: 'Reunión con Cliente - Grupo Innova',
    date: '2025-06-07',
    time: '14:00 - 15:30',
    organizer: 'Carlos Ruiz',
    attendees: ['Carlos Ruiz', 'Sofía Castro', 'Representantes Grupo Innova'],
    location: 'Oficinas Cliente',
    agenda: [
      'Presentación de Propuesta',
      'Discusión de Requisitos',
      'Próximos Pasos',
    ],
    minutes: {
      date: '2025-06-07',
      recorder: 'Carlos Ruiz',
      summary: 'Se presentó la propuesta inicial, el cliente mostró interés en el módulo de personalización. Se acordó una segunda reunión para detalles técnicos.',
      agreements: [
        { item: 'Enviar especificaciones técnicas del módulo de personalización', responsible: 'Carlos Ruiz', dueDate: '2025-06-14' },
      ],
      pendingActions: []
    }
  },
];

const simulatedActivityLog = [ // Re-usamos y adaptamos la bitácora del componente anterior
  { id: 1, timestamp: '2025-06-11 08:45', user: 'Laura Giraldo', activity: 'Agendó "Reunión de Standup Diario" para el 12 de junio.' },
  { id: 2, timestamp: '2025-06-10 17:00', user: 'Sofía Castro', activity: 'Actualizó detalles del evento "Presentación a Clientes".' },
  { id: 3, timestamp: '2025-06-09 14:00', user: 'María Gómez', activity: 'Cargó las minutas de "Reunión de Planificación de Sprint".' },
  { id: 4, timestamp: '2025-06-08 11:15', user: 'Juan Pérez', activity: 'Marcó como "Completado" la tarea "Investigar librería de pagos XYZ".' },
  { id: 5, timestamp: '2025-06-05 10:00', user: 'Carlos Ruiz', activity: 'Creó el hito "Entrega de Fase 1 Plataforma".' },
];

function PlanningCalendar({ onGoToHome }) {
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [openNewEventDialog, setOpenNewEventDialog] = useState(false);
  const [newEventData, setNewEventData] = useState({
    title: '', date: '', time: '', type: 'Evento', category: 'General', allDay: false
  });
  const [openNewMeetingDialog, setOpenNewMeetingDialog] = useState(false);
  const [newMeetingData, setNewMeetingData] = useState({
    title: '', date: '', time: '', organizer: '', attendees: '', location: '', agenda: '', summary: '', agreements: '', pendingActions: ''
  });

  const getEventTypeChip = (type) => {
    switch (type) {
      case 'Reunión': return <Chip label="Reunión" color="primary" size="small" icon={<MeetingRoomIcon fontSize="small" />} />;
      case 'Hito': return <Chip label="Hito" color="success" size="small" icon={<FlagIcon fontSize="small" />} />;
      case 'Evento': return <Chip label="Evento" color="info" size="small" icon={<EventIcon fontSize="small" />} />;
      case 'Ausencia': return <Chip label="Ausencia" color="warning" size="small" icon={<PersonOffIcon fontSize="small" />} />; // Assuming PersonOffIcon from @mui/icons-material
      default: return <Chip label={type} size="small" />;
    }
  };

  const handleDateClick = (arg) => { // Handler for FullCalendar date clicks
    setNewEventData(prev => ({ ...prev, date: arg.dateStr }));
    setOpenNewEventDialog(true);
  };

  const handleEventClick = (arg) => { // Handler for FullCalendar event clicks
    // Here you could check event.extendedProps.type and open specific dialogs for meetings, tasks, etc.
    // For now, let's just alert its title
    alert(`Evento: ${arg.event.title}\nTipo: ${arg.event.extendedProps.type || 'N/A'}`);
  };

  const handleOpenNewEventDialog = () => {
    setOpenNewEventDialog(true);
    setNewEventData({
      title: '', date: '', time: '', type: 'Evento', category: 'General', allDay: false
    });
  };

  const handleCloseNewEventDialog = () => {
    setOpenNewEventDialog(false);
  };

  const handleSaveNewEvent = () => {
    if (newEventData.title && newEventData.date) {
      const newId = `E${(simulatedCalendarEvents.length + 1).toString().padStart(3, '0')}`;
      const newEvent = {
        id: newId,
        ...newEventData,
        allDay: newEventData.time === '' // If no time, assume all day
      };
      simulatedCalendarEvents.push(newEvent); // Add the new event
      alert(`Evento "${newEventData.title}" creado con éxito.`);
      handleCloseNewEventDialog();
    } else {
      alert('Por favor, completa el título y la fecha del evento.');
    }
  };

  const handleOpenNewMeetingDialog = () => {
    setOpenNewMeetingDialog(true);
    setNewMeetingData({
      title: '', date: '', time: '', organizer: '', attendees: '', location: '', agenda: '', summary: '', agreements: '', pendingActions: ''
    });
  };

  const handleCloseNewMeetingDialog = () => {
    setOpenNewMeetingDialog(false);
  };

  const handleSaveNewMeeting = () => {
    if (newMeetingData.title && newMeetingData.date && newMeetingData.organizer) {
      const newId = `M${(simulatedMeetings.length + 1).toString().padStart(3, '0')}`;
      const newMeeting = {
        id: newId,
        title: newMeetingData.title,
        date: newMeetingData.date,
        time: newMeetingData.time,
        organizer: newMeetingData.organizer,
        attendees: newMeetingData.attendees.split(',').map(a => a.trim()),
        location: newMeetingData.location,
        agenda: newMeetingData.agenda.split('\n').map(item => item.trim()).filter(item => item !== ''),
        minutes: {
          date: newMeetingData.date,
          recorder: newMeetingData.organizer, // Default recorder
          summary: newMeetingData.summary,
          agreements: newMeetingData.agreements.split('\n').map(item => {
            const parts = item.split(':');
            return parts.length >= 3 ? { item: parts[0].trim(), responsible: parts[1].trim(), dueDate: parts[2].trim() } : { item: parts[0].trim() };
          }).filter(item => item.item !== ''),
          pendingActions: newMeetingData.pendingActions.split('\n').map(item => {
            const parts = item.split(':');
            return parts.length >= 3 ? { item: parts[0].trim(), responsible: parts[1].trim(), dueDate: parts[2].trim() } : { item: parts[0].trim() };
          }).filter(item => item.item !== ''),
        }
      };
      simulatedMeetings.unshift(newMeeting); // Add to the beginning
      alert(`Reunión "${newMeetingData.title}" creada con éxito.`);
      handleCloseNewMeetingDialog();
    } else {
      alert('Por favor, completa los campos obligatorios para la nueva reunión (Título, Fecha, Organizador).');
    }
  };

  const transformEventsForCalendar = () => {
    return simulatedCalendarEvents.map(event => {
      let color;
      switch (event.type) {
        case 'Reunión': color = '#3f51b5'; break;
        case 'Hito': color = '#4caf50'; break;
        case 'Evento': color = '#03a9f4'; break;
        case 'Ausencia': color = '#ff9800'; break;
        default: color = '#616161';
      }
      return {
        id: event.id,
        title: event.title,
        start: event.time ? `${event.date}T${event.time}` : event.date,
        end: event.end ? (event.time ? `${event.end}T${event.time}` : event.end) : null,
        allDay: event.allDay,
        backgroundColor: color,
        borderColor: color,
        extendedProps: {
          type: event.type,
          category: event.category,
        }
      };
    });
  };


  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', minHeight: '100vh', color: '#ffffff', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#004a8f', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2 }}>
                <HomeIcon sx={{ color: '#ffffff' }} />
              </IconButton>
            </Tooltip>
          )}
          {selectedMeeting && (
            <Tooltip title="Volver a la Lista de Reuniones">
              <IconButton edge="start" color="inherit" aria-label="back" onClick={() => setSelectedMeeting(null)} sx={{ mr: 2 }}>
                <ArrowBackIcon sx={{ color: '#ffffff' }} />
              </IconButton>
            </Tooltip>
          )}
          <CalendarMonthIcon sx={{ fontSize: 36, mr: 1, color: '#ffffff' }} />
          <Typography variant="h3" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Planificación y Calendario
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#004a8f' }}>
            {selectedMeeting ? `Minuta de Reunión: ${selectedMeeting.title}` : "Gestiona tu Tiempo, Eventos y Reuniones"}
          </Typography>
          <Typography variant="h6" color="#616161">
            {selectedMeeting ? "Registro detallado de acuerdos, responsables y acciones pendientes." : "Visualiza tu agenda, programa reuniones y lleva un control de todas las actividades."}
          </Typography>
        </Box>

        {/* Calendario Integrado y Botones de Acción (Si no hay reunión seleccionada) */}
        {!selectedMeeting && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <CalendarMonthIcon sx={{ color: '#004a8f', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Calendario General
              </Typography>
              <Button variant="contained" startIcon={<AddCircleOutlineIcon />} color="primary" sx={{ textTransform: 'none', mr: 1 }} onClick={handleOpenNewEventDialog}>
                Nuevo Evento
              </Button>
              <Button variant="contained" startIcon={<MeetingRoomIcon />} color="info" sx={{ textTransform: 'none' }} onClick={handleOpenNewMeetingDialog}>
                Nueva Reunión
              </Button>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

            <Box sx={{ height: 600, '& .fc-daygrid-event': { cursor: 'pointer' }, '& .fc-event-main-frame': { fontSize: '0.8rem' } }}>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                locale="es" // Set Spanish locale
                events={transformEventsForCalendar()}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                editable={true} // Allow drag and drop (requires eventDrop callback)
                droppable={true} // Allow external drag and drop (requires eventReceive callback)
              />
            </Box>
          </Paper>
        )}

        {/* Reuniones y Minutas (Si no hay reunión seleccionada) */}
        {!selectedMeeting && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <MeetingRoomIcon sx={{ color: '#004a8f', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Registro de Reuniones y Minutas
              </Typography>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 400 }}>
              <Table aria-label="meetings table" stickyHeader>
                <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Fecha</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Título</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Organizador</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Asistentes</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: '#424242' }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {simulatedMeetings.map((meeting) => (
                    <TableRow key={meeting.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f0f0f0' } }}>
                      <TableCell sx={{ color: '#333' }}>{meeting.date}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{meeting.title}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{meeting.organizer}</TableCell>
                      <TableCell sx={{ color: '#333' }}>
                        <Tooltip title={meeting.attendees.join(', ')}>
                          <Chip label={`${meeting.attendees.length} Asistentes`} size="small" icon={<PeopleIcon fontSize="small" />} />
                        </Tooltip>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Ver Minuta">
                          <IconButton onClick={() => setSelectedMeeting(meeting)} color="primary" size="small">
                            <DescriptionIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar Reunión">
                          <IconButton color="info" size="small">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar Reunión">
                          <IconButton color="error" size="small">
                            <DeleteIcon />
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

        {/* Detalle de Minuta de Reunión (Si hay una reunión seleccionada) */}
        {selectedMeeting && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <MeetingRoomIcon sx={{ color: '#004a8f', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Detalles de la Reunión
                  </Typography>
                  <Tooltip title="Editar Detalles">
                    <IconButton color="info" size="small"><EditIcon /></IconButton>
                  </Tooltip>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                <List dense>
                  <ListItem><ListItemText primary="Título" secondary={selectedMeeting.title} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Fecha" secondary={selectedMeeting.date} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Hora" secondary={selectedMeeting.time} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Organizador" secondary={selectedMeeting.organizer} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Ubicación" secondary={selectedMeeting.location} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem>
                    <ListItemText primary="Asistentes" primaryTypographyProps={{ fontWeight: 600, color: '#333' }} />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                      {selectedMeeting.attendees.map((attendee, index) => (
                        <Chip key={index} label={attendee} size="small" />
                      ))}
                    </Box>
                  </ListItem>
                </List>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>Agenda</Typography>
                  <List dense sx={{ ml: 2, listStyleType: 'disc', pl: 0 }}>
                    {selectedMeeting.agenda.length === 0 ? (
                      <ListItem sx={{ display: 'list-item' }}><ListItemText primary="No hay agenda definida." primaryTypographyProps={{ color: '#616161' }} /></ListItem>
                    ) : (
                      selectedMeeting.agenda.map((item, index) => (
                        <ListItem key={index} sx={{ display: 'list-item' }}>
                          <ListItemText primary={item} primaryTypographyProps={{ color: '#333' }} />
                        </ListItem>
                      ))
                    )}
                  </List>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <DescriptionIcon sx={{ color: '#004a8f', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Minuta de la Reunión
                  </Typography>
                  <Tooltip title="Editar Minuta">
                    <IconButton color="info" size="small"><EditIcon /></IconButton>
                  </Tooltip>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>Resumen</Typography>
                <TextField
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={selectedMeeting.minutes.summary}
                  InputProps={{ readOnly: true }}
                  sx={{ bgcolor: '#f8f8f8', '.MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' } }}
                />
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>Acuerdos</Typography>
                  <List dense sx={{ maxHeight: 150, overflowY: 'auto' }}>
                    {selectedMeeting.minutes.agreements.length === 0 ? (
                      <ListItem><ListItemText primary="No hay acuerdos registrados." primaryTypographyProps={{ color: '#616161' }} /></ListItem>
                    ) : (
                      selectedMeeting.minutes.agreements.map((agreement, index) => (
                        <ListItem key={index} sx={{ borderLeft: '3px solid #4caf50', mb: 1, p: 1 }}>
                          <ListItemText
                            primary={agreement.item}
                            secondary={`Responsable: ${agreement.responsible || 'N/A'} - Fecha Límite: ${agreement.dueDate || 'N/A'}`}
                            primaryTypographyProps={{ fontWeight: 500, color: '#333' }}
                            secondaryTypographyProps={{ color: '#616161' }}
                          />
                        </ListItem>
                      ))
                    )}
                  </List>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>Acciones Pendientes</Typography>
                  <List dense sx={{ maxHeight: 150, overflowY: 'auto' }}>
                    {selectedMeeting.minutes.pendingActions.length === 0 ? (
                      <ListItem><ListItemText primary="No hay acciones pendientes." primaryTypographyProps={{ color: '#616161' }} /></ListItem>
                    ) : (
                      selectedMeeting.minutes.pendingActions.map((action, index) => (
                        <ListItem key={index} sx={{ borderLeft: '3px solid #ff9800', mb: 1, p: 1 }}>
                          <ListItemText
                            primary={action.item}
                            secondary={`Responsable: ${action.responsible || 'N/A'} - Fecha Límite: ${action.dueDate || 'N/A'}`}
                            primaryTypographyProps={{ fontWeight: 500, color: '#333' }}
                            secondaryTypographyProps={{ color: '#616161' }}
                          />
                        </ListItem>
                      ))
                    )}
                  </List>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Bitácora de Actividades (Siempre visible en la vista general) */}
        {!selectedMeeting && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <EventNoteIcon sx={{ color: '#004a8f', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Bitácora de Actividades Recientes
              </Typography>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />
            <List dense sx={{ maxHeight: 300, overflowY: 'auto' }}>
              {simulatedActivityLog.map((log) => (
                <ListItem key={log.id} sx={{ borderLeft: '3px solid #90caf9', mb: 1, p: 1, '&:hover': { bgcolor: '#f0f0f0' } }}>
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
            <Button variant="text" sx={{ mt: 2, textTransform: 'none', color: '#004a8f' }}>Ver Bitácora Completa</Button>
          </Paper>
        )}
      </Container>

      {/* Dialog para Nuevo Evento */}
      <Dialog open={openNewEventDialog} onClose={handleCloseNewEventDialog}>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>Crear Nuevo Evento</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField margin="normal" label="Título del Evento" fullWidth value={newEventData.title} onChange={(e) => setNewEventData({ ...newEventData, title: e.target.value })} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo de Evento</InputLabel>
            <Select value={newEventData.type} label="Tipo de Evento" onChange={(e) => setNewEventData({ ...newEventData, type: e.target.value })}>
              <MenuItem value="Evento">General</MenuItem>
              <MenuItem value="Reunión">Reunión</MenuItem>
              <MenuItem value="Hito">Hito</MenuItem>
              <MenuItem value="Ausencia">Ausencia</MenuItem>
            </Select>
          </FormControl>
          <TextField margin="normal" label="Fecha" type="date" fullWidth InputLabelProps={{ shrink: true }} value={newEventData.date} onChange={(e) => setNewEventData({ ...newEventData, date: e.target.value })} />
          <TextField margin="normal" label="Hora (opcional)" type="time" fullWidth InputLabelProps={{ shrink: true }} value={newEventData.time} onChange={(e) => setNewEventData({ ...newEventData, time: e.target.value })} helperText="Dejar vacío para evento de todo el día" />
          <TextField margin="normal" label="Fecha Fin (solo para eventos de varios días, opcional)" type="date" fullWidth InputLabelProps={{ shrink: true }} value={newEventData.end || ''} onChange={(e) => setNewEventData({ ...newEventData, end: e.target.value })} />
          <TextField margin="normal" label="Categoría" fullWidth value={newEventData.category} onChange={(e) => setNewEventData({ ...newEventData, category: e.target.value })} helperText="Ej: Comercial, Marketing, Desarrollo" />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseNewEventDialog} color="secondary">Cancelar</Button>
          <Button onClick={handleSaveNewEvent} variant="contained" color="primary">Crear Evento</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para Nueva Reunión */}
      <Dialog open={openNewMeetingDialog} onClose={handleCloseNewMeetingDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>Registrar Nueva Reunión</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField margin="normal" label="Título de la Reunión" fullWidth value={newMeetingData.title} onChange={(e) => setNewMeetingData({ ...newMeetingData, title: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField margin="normal" label="Organizador" fullWidth value={newMeetingData.organizer} onChange={(e) => setNewMeetingData({ ...newMeetingData, organizer: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField margin="normal" label="Fecha" type="date" fullWidth InputLabelProps={{ shrink: true }} value={newMeetingData.date} onChange={(e) => setNewMeetingData({ ...newMeetingData, date: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField margin="normal" label="Hora (Ej: 10:00 - 12:00)" fullWidth value={newMeetingData.time} onChange={(e) => setNewMeetingData({ ...newMeetingData, time: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <TextField margin="normal" label="Asistentes (separados por coma)" fullWidth value={newMeetingData.attendees} onChange={(e) => setNewMeetingData({ ...newMeetingData, attendees: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <TextField margin="normal" label="Ubicación" fullWidth value={newMeetingData.location} onChange={(e) => setNewMeetingData({ ...newMeetingData, location: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <TextField margin="normal" label="Agenda (un punto por línea)" multiline rows={4} fullWidth value={newMeetingData.agenda} onChange={(e) => setNewMeetingData({ ...newMeetingData, agenda: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <TextField margin="normal" label="Resumen de Minuta" multiline rows={4} fullWidth value={newMeetingData.summary} onChange={(e) => setNewMeetingData({ ...newMeetingData, summary: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <TextField margin="normal" label="Acuerdos (item:responsable:fecha_limite, uno por línea)" multiline rows={3} fullWidth value={newMeetingData.agreements} onChange={(e) => setNewMeetingData({ ...newMeetingData, agreements: e.target.value })} helperText="Ej: Lanzar Beta:Juan Pérez:2025-07-01" />
            </Grid>
            <Grid item xs={12}>
              <TextField margin="normal" label="Acciones Pendientes (item:responsable:fecha_limite, uno por línea)" multiline rows={3} fullWidth value={newMeetingData.pendingActions} onChange={(e) => setNewMeetingData({ ...newMeetingData, pendingActions: e.target.value })} helperText="Ej: Investigar solución X:María G.:2025-06-20" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseNewMeetingDialog} color="secondary">Cancelar</Button>
          <Button onClick={handleSaveNewMeeting} variant="contained" color="primary">Registrar Reunión</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PlanningCalendar;