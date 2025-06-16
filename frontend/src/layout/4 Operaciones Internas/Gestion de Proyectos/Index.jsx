import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Grid, Paper, Chip, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  Button, IconButton, Tooltip, AppBar, Toolbar,
  Accordion, AccordionSummary, AccordionDetails,
  List, ListItem, ListItemText, ListItemIcon,
  TextField, FormControl, InputLabel, Select, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions,
  LinearProgress, CircularProgress,
  ToggleButton, ToggleButtonGroup
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import EngineeringIcon from '@mui/icons-material/Engineering'; // Icono principal de Gestión de Proyectos
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'; // Proyectos
import BuildIcon from '@mui/icons-material/Build'; // Desarrollo Software
import StarIcon from '@mui/icons-material/Star'; // Proyectos Estratégicos
import PersonIcon from '@mui/icons-material/Person'; // Equipo
import TaskIcon from '@mui/icons-material/Task'; // Tareas
import FlagIcon from '@mui/icons-material/Flag'; // Hitos
import WarningIcon from '@mui/icons-material/Warning'; // Riesgos
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'; // Gestión de Cambios
import AttachFileIcon from '@mui/icons-material/AttachFile'; // Documentos
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Registro de Horas
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Añadir
import EditIcon from '@mui/icons-material/Edit'; // Editar
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ver detalles
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Accordion
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'; // En Progreso
import DoneAllIcon from '@mui/icons-material/DoneAll'; // Completado
import CloseIcon from '@mui/icons-material/Close'; // Cancelado
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'; // Tareas Completadas
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; // Presupuesto
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';


// --- Datos Simulados de Gestión de Proyectos ---
const simulatedProjects = [
  {
    id: 'PROJ-001',
    name: 'Desarrollo Plataforma E-commerce V2',
    type: 'Desarrollo Software',
    category: 'Estratégico', // Módulo de Proyectos Estratégicos
    client: 'Ventas Online S.A.',
    status: 'En Progreso',
    priority: 'Alta',
    budget: 150000,
    spent: 80000,
    startDate: '2025-03-01',
    endDate: '2025-09-30',
    progress: 55,
    manager: 'Bryan Rosero',
    description: 'Implementación de nuevas funcionalidades de carrito, integración con pasarelas de pago y mejora de UX/UI.',
    team: [
      { id: 'M001', name: 'Juan Pérez', role: 'Líder Técnico', availability: '80%' },
      { id: 'M002', name: 'María Gómez', role: 'Desarrollador Backend', availability: '100%' },
      { id: 'M003', name: 'Pedro Rojas', role: 'Desarrollador Frontend', availability: '100%' },
      { id: 'M004', name: 'Sofía Castro', role: 'Diseñador UX/UI', availability: '50%' },
    ],
    phases: [
      { name: 'Planificación', status: 'Completado', progress: 100, startDate: '2025-03-01', endDate: '2025-03-15' },
      { name: 'Diseño UX/UI', status: 'Completado', progress: 100, startDate: '2025-03-16', endDate: '2025-03-30' },
      { name: 'Desarrollo Backend', status: 'En Progreso', progress: 70, startDate: '2025-04-01', endDate: '2025-08-15' },
      { name: 'Desarrollo Frontend', status: 'En Progreso', progress: 40, startDate: '2025-04-15', endDate: '2025-09-15' },
      { name: 'Pruebas', status: 'Pendiente', progress: 0, startDate: '2025-09-01', endDate: '2025-09-30' },
    ],
    tasks: [
      { id: 'T001', description: 'Definir arquitectura de base de datos', assignedTo: 'María Gómez', status: 'Completado', dueDate: '2025-04-10', progress: 100 },
      { id: 'T002', description: 'Implementar API de productos', assignedTo: 'María Gómez', status: 'En Progreso', dueDate: '2025-07-30', progress: 60 },
      { id: 'T003', description: 'Diseñar interfaz de usuario del carrito', assignedTo: 'Sofía Castro', status: 'Completado', dueDate: '2025-03-25', progress: 100 },
      { id: 'T004', description: 'Desarrollar componente de carrito de compras', assignedTo: 'Pedro Rojas', status: 'En Progreso', dueDate: '2025-08-15', progress: 30 },
      { id: 'T005', description: 'Integrar pasarela de pagos', assignedTo: 'Juan Pérez', status: 'Pendiente', dueDate: '2025-09-01', progress: 0 },
    ],
    milestones: [
      { name: 'MVP Backend Funcional', date: '2025-07-15', status: 'En Riesgo', notes: 'Depende de la finalización de API de productos.' },
      { name: 'Beta Plataforma', date: '2025-09-01', status: 'Próximo', notes: 'Inicio fase de pruebas integrales.' },
    ],
    risks: [
      { id: 'R001', description: 'Retraso en entrega de APIs externas', probability: 'Media', impact: 'Alto', mitigation: 'Comunicación constante con el proveedor, plan de contingencia con mockups.' },
      { id: 'R002', description: 'Cambios constantes en requisitos de cliente', probability: 'Media', impact: 'Medio', mitigation: 'Establecer proceso de gestión de cambios estricto.' },
    ],
    changeRequests: [
      { id: 'CR001', description: 'Añadir módulo de Wishlist', status: 'Pendiente Aprobación', requestedBy: 'Ventas Online S.A.', date: '2025-06-01', impact: 'Aumento de 5% en presupuesto, 2 semanas en cronograma.' },
    ],
    documents: [
      { name: 'Documento de Requisitos (DRS).pdf', type: 'Funcional', uploadDate: '2025-03-05' },
      { name: 'Diseño UX/UI v3.fig', type: 'Diseño', uploadDate: '2025-03-28' },
    ],
    timeLogs: [
      { member: 'María Gómez', date: '2025-06-10', hours: 8, task: 'Implementar API de productos' },
      { member: 'Pedro Rojas', date: '2025-06-10', hours: 6, task: 'Desarrollar componente de carrito de compras' },
    ]
  },
  {
    id: 'PROJ-002',
    name: 'Optimización de Procesos Internos (ERP)',
    type: 'Consultoría e Implementación',
    category: 'Estratégico',
    client: 'Operaciones Internas',
    status: 'En Progreso',
    priority: 'Media',
    budget: 80000,
    spent: 30000,
    startDate: '2025-04-15',
    endDate: '2025-11-30',
    progress: 35,
    manager: 'Bryan Rosero',
    description: 'Análisis y optimización de flujos de trabajo en el módulo financiero del ERP. Posible integración con otras herramientas.',
    team: [
      { id: 'M005', name: 'Ana Fernández', role: 'Consultor Principal', availability: '100%' },
      { id: 'M006', name: 'Luis Torres', role: 'Analista de Procesos', availability: '80%' },
    ],
    phases: [
      { name: 'Análisis y Diagnóstico', status: 'Completado', progress: 100, startDate: '2025-04-15', endDate: '2025-05-30' },
      { name: 'Diseño de Solución', status: 'En Progreso', progress: 60, startDate: '2025-06-01', endDate: '2025-07-15' },
      { name: 'Implementación', status: 'Pendiente', progress: 0, startDate: '2025-07-16', endDate: '2025-10-30' },
    ],
    tasks: [
      { id: 'T006', description: 'Reuniones de levantamiento de información', assignedTo: 'Ana Fernández', status: 'Completado', dueDate: '2025-05-10', progress: 100 },
      { id: 'T007', description: 'Documentar flujos de trabajo actuales', assignedTo: 'Luis Torres', status: 'Completado', dueDate: '2025-05-25', progress: 100 },
      { id: 'T008', description: 'Diseñar nuevos procesos financieros', assignedTo: 'Ana Fernández', status: 'En Progreso', dueDate: '2025-07-01', progress: 50 },
    ],
    milestones: [
      { name: 'Entrega de Documento de Procesos (As-Is)', date: '2025-05-30', status: 'Alcanzado', notes: 'Aprobado por stakeholders.' },
    ],
    risks: [
      { id: 'R003', description: 'Resistencia al cambio por parte de usuarios', probability: 'Alta', impact: 'Medio', mitigation: 'Programa de capacitación y comunicación intensiva.' },
    ],
    changeRequests: [],
    documents: [],
    timeLogs: []
  },
  {
    id: 'PROJ-003',
    name: 'Auditoría de Seguridad de Red',
    type: 'Servicio / Seguridad',
    category: 'Operacional',
    client: 'Banco X S.A.',
    status: 'Completado',
    priority: 'Alta',
    budget: 25000,
    spent: 25000,
    startDate: '2025-02-01',
    endDate: '2025-03-10',
    progress: 100,
    manager: 'Bryan Rosero',
    description: 'Auditoría exhaustiva de la infraestructura de red para identificar vulnerabilidades y proponer mejoras.',
    team: [{ id: 'M007', name: 'Elena Ramírez', role: 'Especialista en Ciberseguridad', availability: '100%' }],
    phases: [], tasks: [], milestones: [], risks: [], changeRequests: [], documents: [], timeLogs: []
  },
];

function ProjectManagement({ onGoToHome }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterCategory, setFilterCategory] = useState('Todos');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewProjectDialog, setOpenNewProjectDialog] = useState(false);
  const [newProjectData, setNewProjectData] = useState({
    name: '', type: '', category: 'Operacional', client: '', status: 'Pendiente', priority: 'Media',
    budget: '', startDate: '', endDate: '', manager: ''
  });

  const getStatusChip = (status) => {
    switch (status) {
      case 'En Progreso': return <Chip label="En Progreso" color="primary" size="small" icon={<HourglassEmptyIcon fontSize="small" />} />;
      case 'Completado': return <Chip label="Completado" color="success" size="small" icon={<DoneAllIcon fontSize="small" />} />;
      case 'Pendiente': return <Chip label="Pendiente" color="default" size="small" icon={<AccessTimeIcon fontSize="small" />} />;
      case 'Cancelado': return <Chip label="Cancelado" color="error" size="small" icon={<CloseIcon fontSize="small" />} />;
      default: return <Chip label={status} size="small" />;
    }
  };

  const getPriorityChip = (priority) => {
    switch (priority) {
      case 'Alta': return <Chip label="Alta" color="error" size="small" />;
      case 'Media': return <Chip label="Media" color="warning" size="small" />;
      case 'Baja': return <Chip label="Baja" color="info" size="small" />;
      default: return <Chip label={priority} size="small" />;
    }
  };

  const filteredProjects = simulatedProjects.filter(project =>
    filterCategory === 'Todos' || project.category === filterCategory
  );

  const totalBudget = simulatedProjects.reduce((acc, p) => acc + p.budget, 0);
  const totalSpent = simulatedProjects.reduce((acc, p) => acc + (p.spent || 0), 0);
  const completionRate = (simulatedProjects.filter(p => p.status === 'Completado').length / simulatedProjects.length) * 100 || 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenNewProjectDialog = () => {
    setOpenNewProjectDialog(true);
    setNewProjectData({
      name: '', type: '', category: 'Operacional', client: '', status: 'Pendiente', priority: 'Media',
      budget: '', startDate: '', endDate: '', manager: ''
    });
  };

  const handleCloseNewProjectDialog = () => {
    setOpenNewProjectDialog(false);
  };

  const handleSaveNewProject = () => {
    if (newProjectData.name && newProjectData.client && newProjectData.startDate && newProjectData.endDate && newProjectData.manager) {
      const newId = `PROJ-${(simulatedProjects.length + 1).toString().padStart(3, '0')}`;
      const newProject = {
        id: newId,
        ...newProjectData,
        budget: parseFloat(newProjectData.budget),
        progress: 0,
        spent: 0,
        team: [], phases: [], tasks: [], milestones: [], risks: [], changeRequests: [], documents: [], timeLogs: []
      };
      simulatedProjects.unshift(newProject); // Add to the beginning for visibility
      alert(`Proyecto ${newId} - ${newProjectData.name} creado con éxito.`);
      handleCloseNewProjectDialog();
    } else {
      alert('Por favor, completa los campos obligatorios para el nuevo proyecto.');
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#eef2f6', minHeight: '100vh', color: '#ffffff', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#004a8f', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="#fff" aria-label="home" onClick={onGoToHome} sx={{ mr: 2 }}>
                <HomeIcon sx={{ color: '#ffffff' }} />
              </IconButton>
            </Tooltip>
          )}
          {selectedProject && (
            <Tooltip title="Volver a la Lista de Proyectos">
              <IconButton edge="start" color="inherit" aria-label="back" onClick={() => setSelectedProject(null)} sx={{ mr: 2 }}>
                <ArrowBackIcon sx={{ color: '#424242' }} />
              </IconButton>
            </Tooltip>
          )}
          <EngineeringIcon sx={{ fontSize: 36, mr: 1, color: '#ffffff' }} />
          <Typography variant="h3" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Gestión de Proyectos
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#004a8f' }}>
            {selectedProject ? `Ficha de Proyecto: ${selectedProject.name}` : "Portafolio de Proyectos y Gestión Estratégica"}
          </Typography>
          <Typography variant="h6" color="#616161">
            {selectedProject ? "Seguimiento detallado de fases, tareas, riesgos y equipo." : "Visibilidad completa de todos tus proyectos, desde la planificación hasta la entrega."}
          </Typography>
        </Box>

        {/* Dashboard de Proyectos (Si no hay proyecto seleccionado) */}
        {!selectedProject && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <BusinessCenterIcon sx={{ color: '#004a8f', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#004a8f' }}>
                Resumen del Portafolio de Proyectos
              </Typography>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: '#bdbdbd' }}>
                  <BusinessCenterIcon sx={{ fontSize: 40, color: '#004a8f' }} />
                  <Typography variant="h4" sx={{ mt: 1, color: '#333' }}>{simulatedProjects.length}</Typography>
                  <Typography variant="subtitle1" color="#616161">Total de Proyectos</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: '#bdbdbd' }}>
                  <HourglassEmptyIcon sx={{ fontSize: 40, color: '#ff8f00' }} />
                  <Typography variant="h4" sx={{ mt: 1, color: '#333' }}>{simulatedProjects.filter(p => p.status === 'En Progreso').length}</Typography>
                  <Typography variant="subtitle1" color="#616161">Proyectos en Progreso</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: '#bdbdbd' }}>
                  <DoneAllIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
                  <Typography variant="h4" sx={{ mt: 1, color: '#333' }}>{simulatedProjects.filter(p => p.status === 'Completado').length}</Typography>
                  <Typography variant="subtitle1" color="#616161">Proyectos Completados</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: '#bdbdbd' }}>
                  <StarIcon sx={{ fontSize: 40, color: '#ffc107' }} />
                  <Typography variant="h4" sx={{ mt: 1, color: '#333' }}>{simulatedProjects.filter(p => p.category === 'Estratégico').length}</Typography>
                  <Typography variant="subtitle1" color="#616161">Proyectos Estratégicos</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" color="#333" sx={{ mt: 2 }}>Progreso General del Portafolio:</Typography>
                <LinearProgress variant="determinate" value={completionRate} sx={{ height: 10, borderRadius: 5, mt: 1, bgcolor: '#e0e0e0', '& .MuiLinearProgress-bar': { bgcolor: '#2e7d32' } }} />
                <Typography variant="caption" color="#616161">{completionRate.toFixed(1)}% de proyectos completados.</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" color="#333" sx={{ mt: 2 }}>Presupuesto Total del Portafolio:</Typography>
                <LinearProgress variant="determinate" value={(totalSpent / totalBudget) * 100} sx={{ height: 10, borderRadius: 5, mt: 1, bgcolor: '#e0e0e0', '& .MuiLinearProgress-bar': { bgcolor: '#d32f2f' } }} />
                <Typography variant="caption" color="#616161">
                  Gastado: ${totalSpent.toLocaleString('es-CO')} de ${totalBudget.toLocaleString('es-CO')} COP
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Listado de Proyectos (Si no hay proyecto seleccionado) */}
        {!selectedProject && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <BusinessCenterIcon sx={{ color: '#004a8f', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#004a8f' }}>
                Registro y Gestión de Proyectos
              </Typography>
              <ToggleButtonGroup
                value={filterCategory}
                exclusive
                onChange={(event, newCategory) => setFilterCategory(newCategory || 'Todos')}
                sx={{ mr: 2 }}
              >
                <ToggleButton value="Todos" size="small">Todos</ToggleButton>
                <ToggleButton value="Estratégico" size="small">Estratégicos</ToggleButton>
                <ToggleButton value="Operacional" size="small">Operacionales</ToggleButton>
              </ToggleButtonGroup>
              <Button variant="contained" startIcon={<AddCircleOutlineIcon />} color="primary" sx={{ textTransform: 'none' }} onClick={handleOpenNewProjectDialog}>
                Nuevo Proyecto
              </Button>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
              <Table aria-label="proyectos table">
                <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Nombre del Proyecto</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Cliente</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Manager</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Progreso</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Estado</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Prioridad</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: '#424242' }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                      ? filteredProjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : filteredProjects
                  ).map((project) => (
                    <TableRow key={project.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f0f0f0' } }}>
                      <TableCell sx={{ color: '#333' }}>{project.id}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{project.name}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{project.client}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{project.manager}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <LinearProgress variant="determinate" value={project.progress} sx={{ width: 80, mr: 1 }} />
                          <Typography variant="body2" color="#616161">{project.progress}%</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{getStatusChip(project.status)}</TableCell>
                      <TableCell>{getPriorityChip(project.priority)}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="Ver Detalles del Proyecto">
                          <IconButton onClick={() => setSelectedProject(project)} color="primary">
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar Proyecto">
                          <IconButton color="info">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar Proyecto">
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
              count={filteredProjects.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Proyectos por página:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
            />
          </Paper>
        )}

        {/* Ficha Completa del Proyecto (Si hay un proyecto seleccionado) */}
        {selectedProject && (
          <Grid container spacing={4}>
            {/* Información General del Proyecto */}
            <Grid item xs={12} md={5}>
              <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <BusinessCenterIcon sx={{ color: '#004a8f', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Datos del Proyecto
                  </Typography>
                  <Tooltip title="Editar Datos">
                    <IconButton color="info" size="small"><EditIcon /></IconButton>
                  </Tooltip>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                <List dense>
                  <ListItem><ListItemText primary="ID de Proyecto" secondary={selectedProject.id} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Tipo de Proyecto" secondary={selectedProject.type} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Categoría" secondary={selectedProject.category} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Cliente" secondary={selectedProject.client} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Estado" secondary={getStatusChip(selectedProject.status)} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} /></ListItem>
                  <ListItem><ListItemText primary="Prioridad" secondary={getPriorityChip(selectedProject.priority)} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} /></ListItem>
                  <ListItem><ListItemText primary="Gerente de Proyecto" secondary={selectedProject.manager} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Fecha de Inicio" secondary={selectedProject.startDate} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Fecha Estimada de Fin" secondary={selectedProject.endDate} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem>
                    <ListItemText primary="Progreso del Proyecto" primaryTypographyProps={{ fontWeight: 600, color: '#333' }} />
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress variant="determinate" value={selectedProject.progress} sx={{ height: 8, borderRadius: 4 }} />
                      <Typography variant="body2" color="#616161">{selectedProject.progress}%</Typography>
                    </Box>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Presupuesto vs. Gastado" primaryTypographyProps={{ fontWeight: 600, color: '#333' }} />
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress variant="determinate" value={(selectedProject.spent / selectedProject.budget) * 100} sx={{ height: 8, borderRadius: 4, bgcolor: '#e0e0e0', '& .MuiLinearProgress-bar': { bgcolor: selectedProject.spent > selectedProject.budget * 0.9 ? 'error' : 'primary.main' } }} />
                      <Typography variant="body2" color="#616161">
                        ${selectedProject.spent.toLocaleString('es-CO')} de ${selectedProject.budget.toLocaleString('es-CO')} COP
                      </Typography>
                    </Box>
                  </ListItem>
                </List>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>Descripción</Typography>
                  <TextField
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={selectedProject.description}
                    InputProps={{ readOnly: true }}
                    sx={{ bgcolor: '#f8f8f8', '.MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' } }}
                  />
                </Box>
              </Paper>
            </Grid>

            {/* Fases, Tareas y Equipo */}
            <Grid item xs={12} md={7}>
              {/* Equipo del Proyecto */}
              <Paper elevation={4} sx={{ p: 3, mb: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <PersonIcon sx={{ color: '#3f51b5', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Equipo del Proyecto
                  </Typography>
                  <Button variant="contained" startIcon={<AddCircleOutlineIcon />} color="primary" sx={{ textTransform: 'none' }} size="small">
                    Añadir Miembro
                  </Button>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                <List dense sx={{ maxHeight: 150, overflowY: 'auto' }}>
                  {selectedProject.team.length === 0 ? (
                    <Typography variant="body2" color="#616161" sx={{ ml: 2 }}>No hay equipo asignado.</Typography>
                  ) : (
                    selectedProject.team.map((member) => (
                      <ListItem key={member.id} sx={{ '&:hover': { bgcolor: '#f0f0f0' } }}>
                        <ListItemIcon><PersonIcon color="action" /></ListItemIcon>
                        <ListItemText primary={member.name} secondary={`${member.role} (Disponibilidad: ${member.availability})`} primaryTypographyProps={{ color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} />
                        <Tooltip title="Editar Miembro"><IconButton size="small"><EditIcon /></IconButton></Tooltip>
                      </ListItem>
                    ))
                  )}
                </List>
              </Paper>

              {/* Fases del Proyecto */}
              <Paper elevation={4} sx={{ p: 3, mb: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <BuildIcon sx={{ color: '#3f51b5', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Fases del Proyecto
                  </Typography>
                  <Button variant="contained" startIcon={<AddCircleOutlineIcon />} color="primary" sx={{ textTransform: 'none' }} size="small">
                    Nueva Fase
                  </Button>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                <List dense sx={{ maxHeight: 200, overflowY: 'auto' }}>
                  {selectedProject.phases.length === 0 ? (
                    <Typography variant="body2" color="#616161" sx={{ ml: 2 }}>No hay fases definidas.</Typography>
                  ) : (
                    selectedProject.phases.map((phase, index) => (
                      <ListItem key={index} sx={{ '&:hover': { bgcolor: '#f0f0f0' } }}>
                        <ListItemText
                          primary={phase.name}
                          secondary={`Progreso: ${phase.progress}% - ${phase.startDate} a ${phase.endDate}`}
                          primaryTypographyProps={{ fontWeight: 500, color: '#333' }}
                          secondaryTypographyProps={{ color: '#616161' }}
                        />
                        <LinearProgress variant="determinate" value={phase.progress} sx={{ width: 100, mr: 1, height: 6, borderRadius: 3 }} />
                        {getStatusChip(phase.status)}
                      </ListItem>
                    ))
                  )}
                </List>
              </Paper>

              {/* Tareas del Proyecto */}
              <Paper elevation={4} sx={{ p: 3, mb: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <TaskIcon sx={{ color: '#3f51b5', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Tareas
                  </Typography>
                  <Button variant="contained" startIcon={<AddCircleOutlineIcon />} color="primary" sx={{ textTransform: 'none' }} size="small">
                    Nueva Tarea
                  </Button>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                <TableContainer sx={{ maxHeight: 250, overflowY: 'auto' }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Descripción</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Asignado A</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Progreso</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Estado</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Fecha Límite</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedProject.tasks.length === 0 ? (
                        <TableRow><TableCell colSpan={5} sx={{ textAlign: 'center', color: '#616161' }}>No hay tareas para este proyecto.</TableCell></TableRow>
                      ) : (
                        selectedProject.tasks.map((task) => (
                          <TableRow key={task.id} sx={{ '&:hover': { bgcolor: '#f0f0f0' } }}>
                            <TableCell sx={{ color: '#333' }}>{task.description}</TableCell>
                            <TableCell sx={{ color: '#333' }}>{task.assignedTo}</TableCell>
                            <TableCell>
                              <Box display="flex" alignItems="center">
                                <LinearProgress variant="determinate" value={task.progress} sx={{ width: 60, mr: 1, height: 5, borderRadius: 3 }} />
                                <Typography variant="caption" color="#616161">{task.progress}%</Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{getStatusChip(task.status)}</TableCell>
                            <TableCell sx={{ color: '#333' }}>{task.dueDate}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>

            {/* Riesgos, Hitos, Cambios y Documentación */}
            <Grid item xs={12}>
              <Grid container spacing={4}>
                {/* Hitos del Proyecto */}
                <Grid item xs={12} md={6}>
                  <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                    <Accordion elevation={0} sx={{ bgcolor: 'transparent' }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#424242' }} />} aria-controls="milestones-content" id="milestones-header">
                        <FlagIcon sx={{ color: '#3f51b5', mr: 1 }} />
                        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                          Hitos del Proyecto
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                        <List dense>
                          {selectedProject.milestones.length === 0 ? (
                            <ListItem><ListItemText primary="No hay hitos definidos." primaryTypographyProps={{ color: '#616161' }} /></ListItem>
                          ) : (
                            selectedProject.milestones.map((milestone, index) => (
                              <ListItem key={index} sx={{ '&:hover': { bgcolor: '#f0f0f0' } }}>
                                <ListItemIcon><FlagIcon color="action" /></ListItemIcon>
                                <ListItemText primary={`${milestone.name} (${milestone.date})`} secondary={`${milestone.status}: ${milestone.notes}`} primaryTypographyProps={{ color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} />
                              </ListItem>
                            ))
                          )}
                        </List>
                        <Button variant="text" startIcon={<AddCircleOutlineIcon />} sx={{ mt: 2, textTransform: 'none', color: '#3f51b5' }}>
                          Añadir Hito
                        </Button>
                      </AccordionDetails>
                    </Accordion>
                  </Paper>
                </Grid>

                {/* Riesgos del Proyecto */}
                <Grid item xs={12} md={6}>
                  <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                    <Accordion elevation={0} sx={{ bgcolor: 'transparent' }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#424242' }} />} aria-controls="risks-content" id="risks-header">
                        <WarningIcon sx={{ color: '#3f51b5', mr: 1 }} />
                        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                          Riesgos del Proyecto
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                        <List dense>
                          {selectedProject.risks.length === 0 ? (
                            <ListItem><ListItemText primary="No hay riesgos registrados." primaryTypographyProps={{ color: '#616161' }} /></ListItem>
                          ) : (
                            selectedProject.risks.map((risk, index) => (
                              <ListItem key={index} sx={{ '&:hover': { bgcolor: '#f0f0f0' }, borderLeft: `3px solid ${risk.impact === 'Alto' ? '#d32f2f' : risk.impact === 'Medio' ? '#ff9800' : '#4caf50'}`, mb: 1, p: 1 }}>
                                <ListItemText primary={`[${risk.probability} / ${risk.impact}] ${risk.description}`} secondary={`Mitigación: ${risk.mitigation}`} primaryTypographyProps={{ fontWeight: 500, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} />
                              </ListItem>
                            ))
                          )}
                        </List>
                        <Button variant="text" startIcon={<AddCircleOutlineIcon />} sx={{ mt: 2, textTransform: 'none', color: '#3f51b5' }}>
                          Añadir Riesgo
                        </Button>
                      </AccordionDetails>
                    </Accordion>
                  </Paper>
                </Grid>

                {/* Gestión de Cambios */}
                <Grid item xs={12} md={6}>
                  <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                    <Accordion elevation={0} sx={{ bgcolor: 'transparent' }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#424242' }} />} aria-controls="change-requests-content" id="change-requests-header">
                        <SwapHorizIcon sx={{ color: '#3f51b5', mr: 1 }} />
                        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                          Gestión de Cambios
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                        <List dense>
                          {selectedProject.changeRequests.length === 0 ? (
                            <ListItem><ListItemText primary="No hay solicitudes de cambio." primaryTypographyProps={{ color: '#616161' }} /></ListItem>
                          ) : (
                            selectedProject.changeRequests.map((change, index) => (
                              <ListItem key={index} sx={{ '&:hover': { bgcolor: '#f0f0f0' }, borderLeft: `3px solid ${change.status === 'Pendiente Aprobación' ? '#ff9800' : '#4caf50'}`, mb: 1, p: 1 }}>
                                <ListItemText primary={`${change.id}: ${change.description}`} secondary={`Estado: ${change.status} - Impacto: ${change.impact}`} primaryTypographyProps={{ fontWeight: 500, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} />
                              </ListItem>
                            ))
                          )}
                        </List>
                        <Button variant="text" startIcon={<AddCircleOutlineIcon />} sx={{ mt: 2, textTransform: 'none', color: '#3f51b5' }}>
                          Nueva Solicitud de Cambio
                        </Button>
                      </AccordionDetails>
                    </Accordion>
                  </Paper>
                </Grid>

                {/* Documentación Asociada */}
                <Grid item xs={12} md={6}>
                  <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                    <Accordion elevation={0} sx={{ bgcolor: 'transparent' }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#424242' }} />} aria-controls="documents-content" id="documents-header">
                        <AttachFileIcon sx={{ color: '#3f51b5', mr: 1 }} />
                        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                          Documentación Asociada
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                        <List dense>
                          {selectedProject.documents.length === 0 ? (
                            <ListItem><ListItemText primary="No hay documentos adjuntos." primaryTypographyProps={{ color: '#616161' }} /></ListItem>
                          ) : (
                            selectedProject.documents.map((doc, index) => (
                              <ListItem key={index} sx={{ '&:hover': { bgcolor: '#f0f0f0' } }}>
                                <ListItemIcon><AttachFileIcon color="action" /></ListItemIcon>
                                <ListItemText primary={doc.name} secondary={`${doc.type} - ${doc.uploadDate}`} primaryTypographyProps={{ color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} />
                                <Button size="small" variant="outlined" sx={{ textTransform: 'none' }}>Descargar</Button>
                              </ListItem>
                            ))
                          )}
                        </List>
                        <Button variant="text" startIcon={<AddCircleOutlineIcon />} sx={{ mt: 2, textTransform: 'none', color: '#3f51b5' }}>
                          Subir Documento
                        </Button>
                      </AccordionDetails>
                    </Accordion>
                  </Paper>
                </Grid>

                {/* Registro de Horas / Avance */}
                <Grid item xs={12}>
                  <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                    <Accordion elevation={0} sx={{ bgcolor: 'transparent' }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#424242' }} />} aria-controls="time-logs-content" id="time-logs-header">
                        <AccessTimeIcon sx={{ color: '#3f51b5', mr: 1 }} />
                        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                          Registro de Horas / Avance
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                        <TableContainer sx={{ maxHeight: 200, overflowY: 'auto' }}>
                          <Table size="small">
                            <TableHead>
                              <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                                <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Miembro</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Fecha</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 600, color: '#424242' }}>Horas</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Tarea</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {selectedProject.timeLogs.length === 0 ? (
                                <TableRow><TableCell colSpan={4} sx={{ textAlign: 'center', color: '#616161' }}>No hay registros de horas.</TableCell></TableRow>
                              ) : (
                                selectedProject.timeLogs.map((log, index) => (
                                  <TableRow key={index} sx={{ '&:hover': { bgcolor: '#f0f0f0' } }}>
                                    <TableCell sx={{ color: '#333' }}>{log.member}</TableCell>
                                    <TableCell sx={{ color: '#333' }}>{log.date}</TableCell>
                                    <TableCell align="right" sx={{ color: '#333' }}>{log.hours}</TableCell>
                                    <TableCell sx={{ color: '#333' }}>{log.task}</TableCell>
                                  </TableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <Button variant="text" startIcon={<AddCircleOutlineIcon />} sx={{ mt: 2, textTransform: 'none', color: '#3f51b5' }}>
                          Registrar Horas
                        </Button>
                      </AccordionDetails>
                    </Accordion>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Container>

      {/* Dialog para Nuevo Proyecto */}
      <Dialog open={openNewProjectDialog} onClose={handleCloseNewProjectDialog}>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>Crear Nuevo Proyecto</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField margin="normal" label="Nombre del Proyecto" fullWidth value={newProjectData.name} onChange={(e) => setNewProjectData({ ...newProjectData, name: e.target.value })} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo de Proyecto</InputLabel>
            <Select value={newProjectData.type} label="Tipo de Proyecto" onChange={(e) => setNewProjectData({ ...newProjectData, type: e.target.value })}>
              <MenuItem value="Desarrollo Software">Desarrollo Software</MenuItem>
              <MenuItem value="Consultoría e Implementación">Consultoría e Implementación</MenuItem>
              <MenuItem value="Servicio / Seguridad">Servicio / Seguridad</MenuItem>
              <MenuItem value="Infraestructura">Infraestructura</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Categoría</InputLabel>
            <Select value={newProjectData.category} label="Categoría" onChange={(e) => setNewProjectData({ ...newProjectData, category: e.target.value })}>
              <MenuItem value="Estratégico">Estratégico</MenuItem>
              <MenuItem value="Operacional">Operacional</MenuItem>
            </Select>
          </FormControl>
          <TextField margin="normal" label="Cliente" fullWidth value={newProjectData.client} onChange={(e) => setNewProjectData({ ...newProjectData, client: e.target.value })} />
          <TextField margin="normal" label="Gerente de Proyecto" fullWidth value={newProjectData.manager} onChange={(e) => setNewProjectData({ ...newProjectData, manager: e.target.value })} />
          <TextField margin="normal" label="Presupuesto (COP)" type="number" fullWidth value={newProjectData.budget} onChange={(e) => setNewProjectData({ ...newProjectData, budget: e.target.value })} />
          <TextField margin="normal" label="Fecha de Inicio" type="date" fullWidth InputLabelProps={{ shrink: true }} value={newProjectData.startDate} onChange={(e) => setNewProjectData({ ...newProjectData, startDate: e.target.value })} />
          <TextField margin="normal" label="Fecha Estimada de Fin" type="date" fullWidth InputLabelProps={{ shrink: true }} value={newProjectData.endDate} onChange={(e) => setNewProjectData({ ...newProjectData, endDate: e.target.value })} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseNewProjectDialog} color="secondary">Cancelar</Button>
          <Button onClick={handleSaveNewProject} variant="contained" color="primary">Crear Proyecto</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ProjectManagement;