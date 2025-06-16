import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Grid, Paper, Chip, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  Button, IconButton, Tooltip, AppBar, Toolbar,
  Accordion, AccordionSummary, AccordionDetails,
  List, ListItem, ListItemText, ListItemIcon,
  TextField, Select, MenuItem, FormControl, InputLabel,
  Dialog, DialogTitle, DialogContent, DialogActions,
  LinearProgress, CircularProgress,
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups'; // CRM Principal
import PersonIcon from '@mui/icons-material/Person'; // Cliente
import PhoneIcon from '@mui/icons-material/Phone'; // Contacto
import EmailIcon from '@mui/icons-material/Email'; // Email
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Reunión
import SellIcon from '@mui/icons-material/Sell'; // Oportunidad
import SupportAgentIcon from '@mui/icons-material/SupportAgent'; // Ticket de Soporte
import DescriptionIcon from '@mui/icons-material/Description'; // Contrato/Documento
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Accordion
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Añadir
import EditIcon from '@mui/icons-material/Edit'; // Editar
import DeleteIcon from '@mui/icons-material/Delete'; // Eliminar
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ver detalles
import AttachFileIcon from '@mui/icons-material/AttachFile'; // Archivo adjunto
import NotesIcon from '@mui/icons-material/Notes';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Notas

// --- Datos Simulados de CRM ---
const simulatedClients = [
  {
    id: 'CLT001',
    name: 'TechSolutions S.A.S.',
    industry: 'Tecnología',
    tier: 'Platinum',
    status: 'Activo',
    contactPerson: 'Ana García',
    phone: '+573101234567',
    email: 'ana.garcia@techsolutions.com',
    address: 'Calle 10 # 5-20, Cali, Valle del Cauca',
    joinedDate: '2023-01-15',
    lastInteraction: '2025-06-08',
    notes: 'Cliente con alto potencial de crecimiento, interesado en nuevas soluciones de IA.',
    history: [
      { type: 'Llamada', date: '2025-06-08', subject: 'Seguimiento de propuesta', notes: 'Ana interesada, requiere demo de producto X.' },
      { type: 'Email', date: '2025-06-05', subject: 'Envío de propuesta de IA', notes: 'Propuesta #2025-06-001 enviada.' },
      { type: 'Reunión', date: '2025-05-20', subject: 'Presentación inicial IA', notes: 'Con equipo directivo, buena recepción.' },
    ],
    opportunities: [
      { id: 'OPP001', name: 'Implementación de IA para optimización', stage: 'Negociación', value: 50000, closeDate: '2025-07-30', probability: 75, status: 'Activa' },
      { id: 'OPP002', name: 'Actualización de Infraestructura Cloud', stage: 'Cerrada - Ganada', value: 30000, closeDate: '2024-11-15', probability: 100, status: 'Cerrada' },
    ],
    tickets: [
      { id: 'TKT001', subject: 'Problema de acceso a plataforma', status: 'Abierto', severity: 'Alta', created: '2025-06-10 14:00', lastUpdate: '2025-06-11 10:00' },
      { id: 'TKT002', subject: 'Consulta sobre factura de abril', status: 'Cerrado', severity: 'Baja', created: '2025-05-01 09:30', closed: '2025-05-02 11:00' },
    ],
    contracts: [
      { id: 'CTR001', name: 'Acuerdo de Nivel de Servicio (SLA)', type: 'Servicio', startDate: '2023-02-01', endDate: '2026-01-31', status: 'Activo', value: 10000 },
    ],
    documents: [
      { id: 'DOC001', name: 'Contrato Marco TechSolutions.pdf', type: 'Contrato', uploadDate: '2023-01-20', url: '#' },
      { id: 'DOC002', name: 'Presentacion IA (2025).pptx', type: 'Presentación', uploadDate: '2025-05-18', url: '#' },
    ]
  },
  {
    id: 'CLT002',
    name: 'GlobalLogistics Ltda.',
    industry: 'Logística',
    tier: 'Gold',
    status: 'Activo',
    contactPerson: 'Carlos Pérez',
    phone: '+573209876543',
    email: 'carlos.perez@globallogistics.com',
    address: 'Av. 3N # 45-10, Cali, Valle del Cauca',
    joinedDate: '2022-08-01',
    lastInteraction: '2025-06-01',
    notes: 'Buscan optimizar rutas de distribución con IoT.',
    history: [
      { type: 'Email', date: '2025-06-01', subject: 'Envío de información IoT', notes: 'Enviada información sobre soluciones de IoT.' },
      { type: 'Llamada', date: '2025-05-25', subject: 'Descubrimiento de necesidades', notes: 'Carlos interesado en cómo IoT puede reducir costos.' },
    ],
    opportunities: [
      { id: 'OPP003', name: 'Solución IoT para rastreo de flota', stage: 'Calificación', value: 25000, closeDate: '2025-08-15', probability: 60, status: 'Activa' },
    ],
    tickets: [],
    contracts: [
      { id: 'CTR002', name: 'Contrato de Consultoría IoT', type: 'Consultoría', startDate: '2025-06-01', endDate: '2025-09-30', status: 'Activo', value: 5000 },
    ],
    documents: []
  },
  {
    id: 'CLT003',
    name: 'InnovateCorp.',
    industry: 'Consultoría',
    tier: 'Silver',
    status: 'Inactivo',
    contactPerson: 'María López',
    phone: '+573005551122',
    email: 'maria.lopez@innovatecorp.net',
    address: 'Carrera 66 # 9-80, Cali, Valle del Cauca',
    joinedDate: '2024-03-01',
    lastInteraction: '2025-04-10',
    notes: 'Cliente inactivo, no hubo interés en renovación de servicios. Podría ser un lead de reactivación.',
    history: [
      { type: 'Email', date: '2025-04-10', subject: 'Recordatorio de Renovación', notes: 'No hubo respuesta.' },
      { type: 'Llamada', date: '2025-04-01', subject: 'Renovación de Licencias', notes: 'María indicó que no requerían por el momento.' },
    ],
    opportunities: [],
    tickets: [],
    contracts: [],
    documents: []
  },
];

const activityTypes = [
  { value: 'Llamada', label: 'Llamada', icon: <PhoneIcon /> },
  { value: 'Email', label: 'Email', icon: <EmailIcon /> },
  { value: 'Reunión', label: 'Reunión', icon: <CalendarTodayIcon /> },
  { value: 'Nota', label: 'Nota', icon: <NotesIcon /> },
];

function CustomerRelationshipManagement({ onGoToHome }) {
  const [selectedClient, setSelectedClient] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAddInteraction, setOpenAddInteraction] = useState(false);
  const [newInteraction, setNewInteraction] = useState({ type: '', date: '', subject: '', notes: '' });

  // Dashboard KPIs
  const totalClients = simulatedClients.length;
  const activeClients = simulatedClients.filter(c => c.status === 'Activo').length;
  const openOpportunities = simulatedClients.reduce((acc, client) => acc + client.opportunities.filter(o => o.status === 'Activa').length, 0);
  const totalPipelineValue = simulatedClients.reduce((acc, client) => acc + client.opportunities.filter(o => o.status === 'Activa').reduce((oppAcc, opp) => oppAcc + opp.value, 0), 0);
  const openTickets = simulatedClients.reduce((acc, client) => acc + client.tickets.filter(t => t.status === 'Abierto').length, 0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenAddInteraction = () => {
    setOpenAddInteraction(true);
    setNewInteraction({ type: '', date: new Date().toISOString().slice(0, 16), subject: '', notes: '' });
  };

  const handleCloseAddInteraction = () => {
    setOpenAddInteraction(false);
  };

  const handleSaveInteraction = () => {
    if (selectedClient && newInteraction.type && newInteraction.subject) {
      const updatedClients = simulatedClients.map(client =>
        client.id === selectedClient.id
          ? { ...client, history: [...client.history, { ...newInteraction, date: new Date(newInteraction.date).toLocaleString('es-CO') }] }
          : client
      );
      // En una app real, aquí se llamaría a una API para guardar y luego se actualizaría el estado.
      // Por simplicidad, actualizamos el estado de `selectedClient` directamente para la demo.
      setSelectedClient(prev => ({
        ...prev,
        history: [...prev.history, { ...newInteraction, date: new Date(newInteraction.date).toLocaleString('es-CO') }]
      }));
      alert('Interacción guardada para ' + selectedClient.name); // Simulación de éxito
      handleCloseAddInteraction();
    } else {
      alert('Por favor, completa los campos requeridos para la interacción.');
    }
  };


  const getClientTierChip = (tier) => {
    switch (tier) {
      case 'Platinum': return <Chip label="Platinum" sx={{ bgcolor: '#e0f2f7', color: '#01579b', fontWeight: 600 }} size="small" />;
      case 'Gold': return <Chip label="Gold" sx={{ bgcolor: '#fff8e1', color: '#ff6f00', fontWeight: 600 }} size="small" />;
      case 'Silver': return <Chip label="Silver" sx={{ bgcolor: '#eceff1', color: '#455a64', fontWeight: 600 }} size="small" />;
      default: return <Chip label={tier} size="small" />;
    }
  };

  const getOpportunityStageChip = (stage) => {
    switch (stage) {
      case 'Cerrada - Ganada': return <Chip label="Ganada" color="success" size="small" />;
      case 'Cerrada - Perdida': return <Chip label="Perdida" color="error" size="small" />;
      case 'Negociación': return <Chip label="Negociación" sx={{ bgcolor: '#e3f2fd', color: '#1565c0' }} size="small" />;
      case 'Propuesta': return <Chip label="Propuesta" sx={{ bgcolor: '#fffde7', color: '#fdd835' }} size="small" />;
      case 'Calificación': return <Chip label="Calificación" sx={{ bgcolor: '#f3e5f5', color: '#6a1b9a' }} size="small" />;
      default: return <Chip label={stage} size="small" />;
    }
  };

  const getTicketStatusChip = (status) => {
    switch (status) {
      case 'Abierto': return <Chip label="Abierto" color="error" size="small" />;
      case 'En Progreso': return <Chip label="En Progreso" color="warning" size="small" />;
      case 'Cerrado': return <Chip label="Cerrado" color="success" size="small" />;
      default: return <Chip label={status} size="small" />;
    }
  };

  const getSeverityChip = (severity) => {
    switch (severity) {
      case 'Abierto': return <Chip label="Abierto" color="error" size="small" />;
      case 'En Progreso': return <Chip label="En Progreso" color="warning" size="small" />;
      case 'Cerrado': return <Chip label="Cerrado" color="success" size="small" />;
      default: return <Chip label={severity} size="small" />;
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
          {selectedClient && (
            <Tooltip title="Volver a la Lista de Clientes">
              <IconButton edge="start" color="inherit" aria-label="back" onClick={() => setSelectedClient(null)} sx={{ mr: 2 }}>
                <ArrowBackIcon sx={{ color: '#424242' }} />
              </IconButton>
            </Tooltip>
          )}
          <GroupsIcon sx={{ fontSize: 36, mr: 1, color: '#01579b' }} />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#424242' }}>
            Customer Relationship Management (CRM)
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#01579b' }}>
            {selectedClient ? `Ficha de Cliente: ${selectedClient.name}` : "Panel de Gestión de Clientes"}
          </Typography>
          <Typography variant="h6" color="#616161">
            {selectedClient ? "Visión 360° de las interacciones, oportunidades y soporte." : "Gestiona tus relaciones con los clientes, oportunidades de venta y tickets de soporte."}
          </Typography>
        </Box>

        {/* Dashboard de Resumen (Solo si no hay cliente seleccionado) */}
        {!selectedClient && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <GroupsIcon sx={{ color: '#01579b', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Resumen del CRM
              </Typography>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: '#bdbdbd' }}>
                  <PersonIcon sx={{ fontSize: 40, color: '#01579b' }} />
                  <Typography variant="h4" sx={{ mt: 1, color: '#333' }}>{totalClients}</Typography>
                  <Typography variant="subtitle1" color="#616161">Clientes Totales</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: '#bdbdbd' }}>
                  <PersonIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
                  <Typography variant="h4" sx={{ mt: 1, color: '#333' }}>{activeClients}</Typography>
                  <Typography variant="subtitle1" color="#616161">Clientes Activos</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: '#bdbdbd' }}>
                  <SellIcon sx={{ fontSize: 40, color: '#ff8f00' }} />
                  <Typography variant="h4" sx={{ mt: 1, color: '#333' }}>{openOpportunities}</Typography>
                  <Typography variant="subtitle1" color="#616161">Oportunidades Abiertas</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: '#bdbdbd' }}>
                  <SupportAgentIcon sx={{ fontSize: 40, color: '#d32f2f' }} />
                  <Typography variant="h4" sx={{ mt: 1, color: '#333' }}>{openTickets}</Typography>
                  <Typography variant="subtitle1" color="#616161">Tickets Abiertos</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" color="#333" sx={{ mt: 2 }}>Valor del Pipeline Activo:</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                  ${totalPipelineValue.toLocaleString('es-CO')} COP
                </Typography>
                <LinearProgress variant="determinate" value={(totalPipelineValue / 100000) * 100} sx={{ height: 10, borderRadius: 5, mt: 1 }} /> {/* Escala arbitraria */}
                <Typography variant="caption" color="#616161">Basado en oportunidades con probabilidad 0%</Typography>
              </Grid>
            </Grid>
          </Paper>
        )}


        {/* Listado de Clientes (Solo si no hay cliente seleccionado) */}
        {!selectedClient && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <PersonIcon sx={{ color: '#01579b', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Listado de Clientes
              </Typography>
              <Button variant="contained" startIcon={<AddCircleOutlineIcon />} color="primary" sx={{ textTransform: 'none' }}>
                Nuevo Cliente
              </Button>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
              <Table aria-label="clientes table">
                <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Nombre</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Contacto</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Industria</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Nivel</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Estado</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: '#424242' }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                      ? simulatedClients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : simulatedClients
                  ).map((client) => (
                    <TableRow key={client.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f0f0f0' } }}>
                      <TableCell component="th" scope="row" sx={{ color: '#333' }}>{client.name}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{client.contactPerson}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{client.industry}</TableCell>
                      <TableCell>{getClientTierChip(client.tier)}</TableCell>
                      <TableCell>
                        <Chip label={client.status} color={client.status === 'Activo' ? 'success' : 'error'} size="small" />
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Ver Ficha del Cliente">
                          <IconButton onClick={() => setSelectedClient(client)} color="primary">
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar Cliente">
                          <IconButton color="info">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar Cliente">
                          <IconButton color="error">
                            <DeleteIcon />
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
              count={simulatedClients.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Filas por página:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
            />
          </Paper>
        )}

        {/* Ficha Completa del Cliente (Si hay un cliente seleccionado) */}
        {selectedClient && (
          <Grid container spacing={4}>
            {/* Información General del Cliente */}
            <Grid item xs={12} md={5}>
              <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <PersonIcon sx={{ color: '#01579b', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Datos del Cliente
                  </Typography>
                  <Tooltip title="Editar Datos">
                    <IconButton color="info" size="small"><EditIcon /></IconButton>
                  </Tooltip>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                <List dense>
                  <ListItem><ListItemText primary="Nombre de la Empresa" secondary={selectedClient.name} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Persona de Contacto" secondary={selectedClient.contactPerson} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Industria" secondary={selectedClient.industry} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Nivel de Cliente" secondary={getClientTierChip(selectedClient.tier)} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} /></ListItem>
                  <ListItem><ListItemText primary="Estado" secondary={<Chip label={selectedClient.status} color={selectedClient.status === 'Activo' ? 'success' : 'error'} size="small" />} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} /></ListItem>
                  <ListItem><ListItemText primary="Teléfono" secondary={selectedClient.phone} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Email" secondary={selectedClient.email} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Dirección" secondary={selectedClient.address} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Fecha de Ingreso" secondary={selectedClient.joinedDate} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Última Interacción" secondary={selectedClient.lastInteraction} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                </List>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>Notas Internas</Typography>
                  <TextField
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={selectedClient.notes}
                    InputProps={{ readOnly: true }}
                    sx={{ bgcolor: '#f8f8f8', '.MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' } }}
                  />
                </Box>
              </Paper>
            </Grid>

            {/* Historial de Contacto y Oportunidades */}
            <Grid item xs={12} md={7}>
              {/* Historial de Contacto */}
              <Paper elevation={4} sx={{ p: 3, mb: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <CalendarTodayIcon sx={{ color: '#01579b', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Historial de Contacto
                  </Typography>
                  <Button variant="contained" startIcon={<AddCircleOutlineIcon />} color="primary" sx={{ textTransform: 'none' }} onClick={handleOpenAddInteraction}>
                    Añadir Interacción
                  </Button>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                <List dense sx={{ maxHeight: 250, overflowY: 'auto' }}>
                  {selectedClient.history.length === 0 ? (
                    <Typography variant="body2" color="#616161" sx={{ ml: 2 }}>No hay interacciones registradas.</Typography>
                  ) : (
                    selectedClient.history.map((item, index) => (
                      <ListItem key={index} sx={{ borderLeft: `3px solid ${item.type === 'Llamada' ? '#2196f3' : item.type === 'Email' ? '#fbc02d' : item.type === 'Reunión' ? '#4caf50' : '#9e9e9e'}`, mb: 1, p: 1 }}>
                        <ListItemIcon sx={{ minWidth: 35 }}>
                          {activityTypes.find(a => a.value === item.type)?.icon || <NotesIcon />}
                        </ListItemIcon>
                        <ListItemText
                          primary={<Typography variant="subtitle2" sx={{ color: '#333' }}>{item.type} - {item.subject}</Typography>}
                          secondary={<Typography variant="caption" color="#616161">{item.date}: {item.notes}</Typography>}
                        />
                      </ListItem>
                    ))
                  )}
                </List>
              </Paper>

              {/* Oportunidades de Venta */}
              <Paper elevation={4} sx={{ p: 3, mb: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <SellIcon sx={{ color: '#01579b', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Oportunidades de Venta
                  </Typography>
                  <Button variant="contained" startIcon={<AddCircleOutlineIcon />} color="primary" sx={{ textTransform: 'none' }}>
                    Nueva Oportunidad
                  </Button>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                <TableContainer sx={{ maxHeight: 200, overflowY: 'auto' }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Oportunidad</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Etapa</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600, color: '#424242' }}>Valor</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Cierre Estimado</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedClient.opportunities.length === 0 ? (
                        <TableRow><TableCell colSpan={4} sx={{ textAlign: 'center', color: '#616161' }}>No hay oportunidades registradas.</TableCell></TableRow>
                      ) : (
                        selectedClient.opportunities.map((opp) => (
                          <TableRow key={opp.id} sx={{ '&:hover': { bgcolor: '#f0f0f0' } }}>
                            <TableCell sx={{ color: '#333' }}>{opp.name}</TableCell>
                            <TableCell>{getOpportunityStageChip(opp.stage)}</TableCell>
                            <TableCell align="right" sx={{ color: '#333' }}>${opp.value.toLocaleString('es-CO')}</TableCell>
                            <TableCell sx={{ color: '#333' }}>{opp.closeDate}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

              {/* Tickets de Soporte */}
              <Paper elevation={4} sx={{ p: 3, mb: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <SupportAgentIcon sx={{ color: '#01579b', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Tickets de Soporte
                  </Typography>
                  <Button variant="contained" startIcon={<AddCircleOutlineIcon />} color="primary" sx={{ textTransform: 'none' }}>
                    Abrir Nuevo Ticket
                  </Button>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                <TableContainer sx={{ maxHeight: 200, overflowY: 'auto' }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Asunto</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Estado</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Severidad</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedClient.tickets.length === 0 ? (
                        <TableRow><TableCell colSpan={4} sx={{ textAlign: 'center', color: '#616161' }}>No hay tickets de soporte.</TableCell></TableRow>
                      ) : (
                        selectedClient.tickets.map((ticket) => (
                          <TableRow key={ticket.id} sx={{ '&:hover': { bgcolor: '#f0f0f0' } }}>
                            <TableCell sx={{ color: '#333' }}>{ticket.id}</TableCell>
                            <TableCell sx={{ color: '#333' }}>{ticket.subject}</TableCell>
                            <TableCell>{getTicketStatusChip(ticket.status)}</TableCell>
                            <TableCell>{getSeverityChip(ticket.severity)}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

              {/* Contratos y Documentos */}
              <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Accordion elevation={0} sx={{ bgcolor: 'transparent' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#424242' }} />} aria-controls="contracts-panel-content" id="contracts-panel-header">
                    <DescriptionIcon sx={{ color: '#01579b', mr: 1 }} />
                    <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                      Contratos y Documentos
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                    <Typography variant="h6" sx={{ color: '#333', mb: 1 }}>Contratos Activos</Typography>
                    <List dense sx={{ maxHeight: 150, overflowY: 'auto', border: '1px solid #e0e0e0', borderRadius: 1, mb: 2 }}>
                      {selectedClient.contracts.length === 0 ? (
                        <ListItem><ListItemText primary="No hay contratos activos." primaryTypographyProps={{ color: '#616161' }} /></ListItem>
                      ) : (
                        selectedClient.contracts.map(contract => (
                          <ListItem key={contract.id} sx={{ '&:hover': { bgcolor: '#f0f0f0' } }}>
                            <ListItemText primary={contract.name} secondary={`${contract.type} (${contract.startDate} - ${contract.endDate})`} primaryTypographyProps={{ color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} />
                            <Chip label={`$${contract.value.toLocaleString('es-CO')}`} size="small" color="info" />
                          </ListItem>
                        ))
                      )}
                    </List>

                    <Typography variant="h6" sx={{ color: '#333', mb: 1 }}>Documentos Relacionados</Typography>
                    <List dense sx={{ maxHeight: 150, overflowY: 'auto', border: '1px solid #e0e0e0', borderRadius: 1 }}>
                      {selectedClient.documents.length === 0 ? (
                        <ListItem><ListItemText primary="No hay documentos adjuntos." primaryTypographyProps={{ color: '#616161' }} /></ListItem>
                      ) : (
                        selectedClient.documents.map(doc => (
                          <ListItem key={doc.id} sx={{ '&:hover': { bgcolor: '#f0f0f0' } }}>
                            <ListItemIcon><AttachFileIcon color="action" /></ListItemIcon>
                            <ListItemText primary={doc.name} secondary={`${doc.type} - ${doc.uploadDate}`} primaryTypographyProps={{ color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} />
                            <Button size="small" variant="outlined" sx={{ textTransform: 'none' }}>Ver</Button>
                          </ListItem>
                        ))
                      )}
                    </List>
                    <Button variant="text" startIcon={<AddCircleOutlineIcon />} sx={{ mt: 2, textTransform: 'none', color: '#01579b' }}>
                      Subir Documento
                    </Button>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>

      {/* Dialog para Añadir Interacción */}
      <Dialog open={openAddInteraction} onClose={handleCloseAddInteraction}>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>Añadir Nueva Interacción</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="interaction-type-label">Tipo de Interacción</InputLabel>
            <Select
              labelId="interaction-type-label"
              id="interaction-type"
              value={newInteraction.type}
              label="Tipo de Interacción"
              onChange={(e) => setNewInteraction({ ...newInteraction, type: e.target.value })}
            >
              {activityTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  <Box display="flex" alignItems="center">
                    {type.icon}
                    <Typography sx={{ ml: 1 }}>{type.label}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            label="Asunto"
            type="text"
            fullWidth
            value={newInteraction.subject}
            onChange={(e) => setNewInteraction({ ...newInteraction, subject: e.target.value })}
          />
          <TextField
            margin="normal"
            label="Fecha y Hora"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newInteraction.date}
            onChange={(e) => setNewInteraction({ ...newInteraction, date: e.target.value })}
          />
          <TextField
            margin="normal"
            label="Notas"
            multiline
            rows={4}
            fullWidth
            value={newInteraction.notes}
            onChange={(e) => setNewInteraction({ ...newInteraction, notes: e.target.value })}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseAddInteraction} color="secondary">Cancelar</Button>
          <Button onClick={handleSaveInteraction} variant="contained" color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CustomerRelationshipManagement;