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
  Stepper, Step, StepLabel, StepContent,
  RadioGroup, FormControlLabel, Radio, Checkbox
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'; // Icono principal de Automatización
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet'; // Workflows
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Aprobaciones
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'; // Asignaciones
import EventNoteIcon from '@mui/icons-material/EventNote'; // Bitácora de Actividades
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Añadir
import EditIcon from '@mui/icons-material/Edit'; // Editar
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ver detalles
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Accordion
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Volver atrás
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // Iniciar/Ejecutar
import StopIcon from '@mui/icons-material/Stop'; // Detener
import PauseIcon from '@mui/icons-material/Pause'; // Pausar
import DoneAllIcon from '@mui/icons-material/DoneAll'; // Completado
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // En Ejecución
import CancelIcon from '@mui/icons-material/Cancel'; // Cancelado
import UpdateIcon from '@mui/icons-material/Update'; // Última Actualización
import DeleteIcon from '@mui/icons-material/Delete'; // Eliminar
import PeopleIcon from '@mui/icons-material/People'; // Responsable
import RuleIcon from '@mui/icons-material/Rule'; // Reglas
import InsightsIcon from '@mui/icons-material/Insights'; // Métricas/Analíticas
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Integraciones
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import PersonIcon from '@mui/icons-material/Person'; // Configuración de Workflow

// --- Datos Simulados de Automatización ---
const simulatedWorkflows = [
  {
    id: 'WF-001',
    name: 'Proceso de Onboarding de Nuevo Empleado',
    description: 'Automatiza la creación de cuentas, asignación de equipo y capacitación inicial.',
    status: 'Activo',
    version: '1.2',
    lastModified: '2025-06-01',
    createdBy: 'Admin HR',
    triggers: ['Nuevo registro en sistema HR'],
    steps: [
      { id: 'S1', name: 'Creación de cuenta de usuario', type: 'Automatizado', assignedTo: 'IT' },
      { id: 'S2', name: 'Asignación de equipo de cómputo', type: 'Manual', assignedTo: 'Compras/IT' },
      { id: 'S3', name: 'Activación de accesos a sistemas', type: 'Automatizado', assignedTo: 'IT' },
      { id: 'S4', name: 'Envío de correo de bienvenida y links de capacitación', type: 'Automatizado', assignedTo: 'HR' },
      { id: 'S5', name: 'Aprobación de beneficios', type: 'Aprobación', assignedTo: 'Gerente HR' },
      { id: 'S6', name: 'Reunión de inducción con equipo', type: 'Manual', assignedTo: 'Líder de Área' },
    ],
    metrics: { totalRuns: 120, avgCompletionTime: '3 días', successRate: '95%', failedRuns: 6 },
  },
  {
    id: 'WF-002',
    name: 'Solicitud de Gastos y Reembolso',
    description: 'Gestiona el envío de solicitudes de gastos, aprobaciones y procesamiento de reembolso.',
    status: 'Inactivo',
    version: '2.0',
    lastModified: '2025-05-20',
    createdBy: 'Contabilidad',
    triggers: ['Envío de formulario de gastos'],
    steps: [
      { id: 'S1', name: 'Revisión y validación inicial', type: 'Manual', assignedTo: 'Contabilidad' },
      { id: 'S2', name: 'Aprobación del supervisor', type: 'Aprobación', assignedTo: 'Supervisor' },
      { id: 'S3', name: 'Aprobación de dirección (si > $500)', type: 'Aprobación Condicional', assignedTo: 'Director' },
      { id: 'S4', name: 'Procesamiento de pago', type: 'Automatizado', assignedTo: 'Finanzas' },
      { id: 'S5', name: 'Notificación de reembolso', type: 'Automatizado', assignedTo: 'Finanzas' },
    ],
    metrics: { totalRuns: 300, avgCompletionTime: '5 días', successRate: '90%', failedRuns: 30 },
  },
  {
    id: 'WF-003',
    name: 'Aprobación de Solicitud de Vacaciones',
    description: 'Flujo simple para aprobación de vacaciones.',
    status: 'Activo',
    version: '1.0',
    lastModified: '2025-04-10',
    createdBy: 'RRHH',
    triggers: ['Envío de solicitud de vacaciones'],
    steps: [
      { id: 'S1', name: 'Aprobación del Líder Directo', type: 'Aprobación', assignedTo: 'Líder Directo' },
      { id: 'S2', name: 'Revisión de Disponibilidad RRHH', type: 'Manual', assignedTo: 'RRHH' },
      { id: 'S3', name: 'Notificación de Decisión', type: 'Automatizado', assignedTo: 'Sistema' },
    ],
    metrics: { totalRuns: 80, avgCompletionTime: '2 días', successRate: '98%', failedRuns: 2 },
  },
];

const simulatedApprovalRequests = [
  {
    id: 'APR-001',
    workflowId: 'WF-001',
    workflowName: 'Proceso de Onboarding de Nuevo Empleado',
    instanceId: 'INST-001',
    requestTitle: 'Aprobación de Beneficios para Juan Pérez',
    requester: 'María Gómez (HR)',
    currentApprover: 'Laura Giraldo (Gerente HR)',
    status: 'Pendiente',
    createdAt: '2025-06-10 10:00',
    lastUpdate: '2025-06-10 10:00',
    details: {
      employeeName: 'Juan Pérez',
      benefitsPackage: 'Estándar',
      startDate: '2025-07-01',
    },
    comments: [],
  },
  {
    id: 'APR-002',
    workflowId: 'WF-002',
    workflowName: 'Solicitud de Gastos y Reembolso',
    instanceId: 'INST-005',
    requestTitle: 'Aprobación de Reembolso de Gastos - Informe Mayo',
    requester: 'Carlos Ruiz',
    currentApprover: 'Pedro Sánchez (Supervisor)',
    status: 'Aprobado',
    createdAt: '2025-06-05 14:30',
    lastUpdate: '2025-06-06 09:00',
    details: {
      amount: '$350',
      category: 'Viajes',
      description: 'Gastos de viaje a conferencia.',
    },
    comments: [{ user: 'Pedro Sánchez', date: '2025-06-06 09:00', text: 'Aprobado. Facturas adjuntas revisadas.' }],
  },
];

const simulatedActivityLog = [
  { id: 1, timestamp: '2025-06-11 10:00', user: 'Laura Giraldo', activity: 'Inició instancia del workflow "Proceso de Onboarding de Nuevo Empleado" para Juan Pérez.' },
  { id: 2, timestamp: '2025-06-10 10:05', user: 'María Gómez', activity: 'Creó la solicitud de aprobación "Aprobación de Beneficios para Juan Pérez".' },
  { id: 3, timestamp: '2025-06-09 15:00', user: 'Admin Sistema', activity: 'Activó el workflow "Solicitud de Gastos y Reembolso".' },
  { id: 4, timestamp: '2025-06-06 09:00', user: 'Pedro Sánchez', activity: 'Aprobó la solicitud "Reembolso de Gastos - Informe Mayo".' },
  { id: 5, timestamp: '2025-06-01 09:30', user: 'Admin HR', activity: 'Modificó el workflow "Proceso de Onboarding de Nuevo Empleado" (versión 1.2).' },
];

function WorkflowAutomation({ onGoToHome }) {
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [openNewWorkflowDialog, setOpenNewWorkflowDialog] = useState(false);
  const [newWorkflowData, setNewWorkflowData] = useState({
    name: '', description: '', triggers: '', steps: [], status: 'Inactivo'
  });
  const [activeStep, setActiveStep] = useState(0); // For new workflow steps

  const getWorkflowStatusChip = (status) => {
    switch (status) {
      case 'Activo': return <Chip label="Activo" color="success" size="small" icon={<PlayArrowIcon fontSize="small" />} />;
      case 'Inactivo': return <Chip label="Inactivo" color="error" size="small" icon={<StopIcon fontSize="small" />} />;
      case 'Pausado': return <Chip label="Pausado" color="warning" size="small" icon={<PauseIcon fontSize="small" />} />;
      default: return <Chip label={status} size="small" />;
    }
  };

  const getApprovalStatusChip = (status) => {
    switch (status) {
      case 'Pendiente': return <Chip label="Pendiente" color="warning" size="small" icon={<AccessTimeIcon fontSize="small" />} />;
      case 'Aprobado': return <Chip label="Aprobado" color="success" size="small" icon={<DoneAllIcon fontSize="small" />} />;
      case 'Rechazado': return <Chip label="Rechazado" color="error" size="small" icon={<CancelIcon fontSize="small" />} />;
      default: return <Chip label={status} size="small" />;
    }
  };

  const handleOpenNewWorkflowDialog = () => {
    setOpenNewWorkflowDialog(true);
    setNewWorkflowData({ name: '', description: '', triggers: '', steps: [], status: 'Inactivo' });
    setActiveStep(0);
  };

  const handleCloseNewWorkflowDialog = () => {
    setOpenNewWorkflowDialog(false);
  };

  const handleNextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBackStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleAddWorkflowStep = () => {
    setNewWorkflowData(prev => ({
      ...prev,
      steps: [...prev.steps, { name: '', type: 'Manual', assignedTo: '' }]
    }));
  };

  const handleUpdateWorkflowStep = (index, field, value) => {
    const updatedSteps = newWorkflowData.steps.map((step, i) =>
      i === index ? { ...step, [field]: value } : step
    );
    setNewWorkflowData(prev => ({ ...prev, steps: updatedSteps }));
  };

  const handleRemoveWorkflowStep = (index) => {
    setNewWorkflowData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  const handleSaveNewWorkflow = () => {
    if (newWorkflowData.name && newWorkflowData.description && newWorkflowData.triggers) {
      const newId = `WF-${(simulatedWorkflows.length + 1).toString().padStart(3, '0')}`;
      const newWorkflow = {
        id: newId,
        version: '1.0',
        lastModified: new Date().toISOString().slice(0, 10),
        createdBy: 'Usuario Actual', // Replace with actual user
        metrics: { totalRuns: 0, avgCompletionTime: 'N/A', successRate: '0%', failedRuns: 0 },
        ...newWorkflowData,
        triggers: newWorkflowData.triggers.split(',').map(t => t.trim()),
      };
      simulatedWorkflows.unshift(newWorkflow); // Add to the beginning
      alert(`Workflow "${newWorkflowData.name}" creado con éxito.`);
      handleCloseNewWorkflowDialog();
      setSelectedWorkflow(newWorkflow); // Show details
    } else {
      alert('Por favor, completa los campos obligatorios para el workflow.');
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
          {(selectedWorkflow || selectedApproval) && (
            <Tooltip title="Volver a la Vista General">
              <IconButton edge="start" color="inherit" aria-label="back" onClick={() => { setSelectedWorkflow(null); setSelectedApproval(null); }} sx={{ mr: 2 }}>
                <ArrowBackIcon sx={{ color: '#424242' }} />
              </IconButton>
            </Tooltip>
          )}
          <AutoAwesomeIcon sx={{ fontSize: 36, mr: 1, color: '#4caf50' }} /> {/* Verde para Automatización */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#424242' }}>
            Automatización de Flujos
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#4caf50' }}>
            {selectedWorkflow ? `Detalle de Workflow: ${selectedWorkflow.name}` : selectedApproval ? `Detalle de Aprobación: ${selectedApproval.requestTitle}` : "Optimiza tus Procesos con Automatización"}
          </Typography>
          <Typography variant="h6" color="#616161">
            {selectedWorkflow ? "Configura, monitorea y mejora cada paso de tus flujos de trabajo." : selectedApproval ? "Gestiona tus solicitudes de aprobación pendientes y completadas." : "Define, ejecuta y supervisa flujos de trabajo automatizados para tareas repetitivas."}
          </Typography>
        </Box>

        {/* Vista General (cuando no hay workflow o aprobación seleccionada) */}
        {!selectedWorkflow && !selectedApproval && (
          <Grid container spacing={4}>
            {/* Gestión de Workflows */}
            <Grid item xs={12}>
              <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <SettingsEthernetIcon sx={{ color: '#4caf50', fontSize: 30, mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Gestión de Workflows
                  </Typography>
                  <Button variant="contained" startIcon={<AddCircleOutlineIcon />} color="success" sx={{ textTransform: 'none' }} onClick={handleOpenNewWorkflowDialog}>
                    Crear Nuevo Workflow
                  </Button>
                </Box>
                <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />
                <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 400 }}>
                  <Table aria-label="workflows table" stickyHeader>
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Nombre del Workflow</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Creado Por</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Estado</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Última Modif.</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600, color: '#424242' }}>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {simulatedWorkflows.map((workflow) => (
                        <TableRow key={workflow.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f0f0f0' } }}>
                          <TableCell sx={{ color: '#333' }}>{workflow.id}</TableCell>
                          <TableCell sx={{ color: '#333' }}>{workflow.name}</TableCell>
                          <TableCell sx={{ color: '#333' }}>{workflow.createdBy}</TableCell>
                          <TableCell>{getWorkflowStatusChip(workflow.status)}</TableCell>
                          <TableCell sx={{ color: '#333' }}>{workflow.lastModified}</TableCell>
                          <TableCell align="right">
                            <Tooltip title="Ver Detalles">
                              <IconButton onClick={() => setSelectedWorkflow(workflow)} color="primary" size="small">
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar Workflow">
                              <IconButton color="info" size="small">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Ejecutar/Activar">
                              <IconButton color="success" size="small">
                                {workflow.status === 'Activo' ? <PauseIcon /> : <PlayArrowIcon />}
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>

            {/* Solicitudes de Aprobación Pendientes */}
            <Grid item xs={12}>
              <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <CheckCircleOutlineIcon sx={{ color: '#2196f3', fontSize: 30, mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Mis Solicitudes de Aprobación Pendientes
                  </Typography>
                </Box>
                <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />
                <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 300 }}>
                  <Table aria-label="approvals table" stickyHeader>
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Título de Solicitud</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Workflow Origen</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Solicitante</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Estado</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Fecha Solicitud</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600, color: '#424242' }}>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {simulatedApprovalRequests.filter(req => req.status === 'Pendiente').map((approval) => (
                        <TableRow key={approval.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f0f0f0' } }}>
                          <TableCell sx={{ color: '#333' }}>{approval.id}</TableCell>
                          <TableCell sx={{ color: '#333' }}>{approval.requestTitle}</TableCell>
                          <TableCell sx={{ color: '#333' }}>{approval.workflowName}</TableCell>
                          <TableCell sx={{ color: '#333' }}>{approval.requester}</TableCell>
                          <TableCell>{getApprovalStatusChip(approval.status)}</TableCell>
                          <TableCell sx={{ color: '#333' }}>{approval.createdAt.split(' ')[0]}</TableCell>
                          <TableCell align="right">
                            <Tooltip title="Revisar y Aprobar/Rechazar">
                              <IconButton onClick={() => setSelectedApproval(approval)} color="warning" size="small">
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button variant="text" sx={{ mt: 2, textTransform: 'none', color: '#2196f3' }}>Ver Todas las Solicitudes</Button>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Detalle de Workflow */}
        {selectedWorkflow && !selectedApproval && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <SettingsEthernetIcon sx={{ color: '#4caf50', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Información del Workflow
                  </Typography>
                  <Tooltip title="Editar Workflow">
                    <IconButton color="info" size="small"><EditIcon /></IconButton>
                  </Tooltip>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                <List dense>
                  <ListItem><ListItemText primary="ID de Workflow" secondary={selectedWorkflow.id} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Nombre" secondary={selectedWorkflow.name} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Descripción" secondary={selectedWorkflow.description} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Estado" secondary={getWorkflowStatusChip(selectedWorkflow.status)} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} /></ListItem>
                  <ListItem><ListItemText primary="Versión" secondary={selectedWorkflow.version} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Creado Por" secondary={selectedWorkflow.createdBy} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Última Modificación" secondary={selectedWorkflow.lastModified} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Desencadenantes (Triggers)" secondary={selectedWorkflow.triggers.join(', ')} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                </List>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333', mb: 2 }}>Métricas de Ejecución</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}><Chip label={`Ejecuciones Totales: ${selectedWorkflow.metrics.totalRuns}`} color="default" sx={{ width: '100%' }} /></Grid>
                    <Grid item xs={6}><Chip label={`Tiempo Promedio: ${selectedWorkflow.metrics.avgCompletionTime}`} color="default" sx={{ width: '100%' }} /></Grid>
                    <Grid item xs={6}><Chip label={`Tasa de Éxito: ${selectedWorkflow.metrics.successRate}`} color="success" sx={{ width: '100%' }} /></Grid>
                    <Grid item xs={6}><Chip label={`Ejecuciones Fallidas: ${selectedWorkflow.metrics.failedRuns}`} color="error" sx={{ width: '100%' }} /></Grid>
                  </Grid>
                  <Button variant="outlined" startIcon={<InsightsIcon />} sx={{ mt: 2, textTransform: 'none' }} color="primary">
                    Ver Analíticas Detalladas
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <RuleIcon sx={{ color: '#4caf50', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Pasos del Workflow
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                <Stepper orientation="vertical">
                  {selectedWorkflow.steps.map((step, index) => (
                    <Step key={index} active completed>
                      <StepLabel>{step.name}</StepLabel>
                      <StepContent>
                        <Typography variant="body2" color="#616161">Tipo: **{step.type}**</Typography>
                        <Typography variant="body2" color="#616161">Asignado a: **{step.assignedTo}**</Typography>
                        {step.type === 'Aprobación Condicional' && (
                          <Typography variant="caption" color="text.secondary">
                            *Esta aprobación se activa bajo ciertas condiciones (ej. monto mayor $500).*
                          </Typography>
                        )}
                        <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                          <Chip label={`Paso ${index + 1}`} size="small" />
                          {step.type === 'Automatizado' && <Chip label="Automático" color="info" size="small" icon={<SettingsSuggestIcon fontSize="small" />} />}
                          {step.type === 'Aprobación' && <Chip label="Aprobación" color="secondary" size="small" icon={<CheckCircleOutlineIcon fontSize="small" />} />}
                          {step.type === 'Aprobación Condicional' && <Chip label="Aprob. Condicional" color="warning" size="small" icon={<RuleIcon fontSize="small" />} />}
                          {step.type === 'Manual' && <Chip label="Manual" color="default" size="small" icon={<PersonIcon fontSize="small" />} />}
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Detalle de Solicitud de Aprobación */}
        {selectedApproval && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <CheckCircleOutlineIcon sx={{ color: '#2196f3', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Información de la Solicitud
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                <List dense>
                  <ListItem><ListItemText primary="ID de Solicitud" secondary={selectedApproval.id} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Título" secondary={selectedApproval.requestTitle} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Workflow Origen" secondary={selectedApproval.workflowName} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="ID de Instancia" secondary={selectedApproval.instanceId} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Solicitante" secondary={selectedApproval.requester} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Aprobador Actual" secondary={selectedApproval.currentApprover} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Estado" secondary={getApprovalStatusChip(selectedApproval.status)} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} /></ListItem>
                  <ListItem><ListItemText primary="Fecha de Solicitud" secondary={selectedApproval.createdAt} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                </List>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>Detalles de la Solicitud</Typography>
                  {Object.entries(selectedApproval.details).map(([key, value]) => (
                    <ListItem key={key} dense><ListItemText primary={key} secondary={value} primaryTypographyProps={{ fontWeight: 500, color: '#333', textTransform: 'capitalize' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  ))}
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <AssignmentTurnedInIcon sx={{ color: '#2196f3', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Acción de Aprobación
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                {selectedApproval.status === 'Pendiente' ? (
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>
                      Acción Requerida:
                    </Typography>
                    <RadioGroup row aria-label="approval-action" name="row-radio-buttons-group">
                      <FormControlLabel value="approve" control={<Radio color="success" />} label="Aprobar" />
                      <FormControlLabel value="reject" control={<Radio color="error" />} label="Rechazar" />
                    </RadioGroup>
                    <TextField
                      margin="normal"
                      label="Comentarios (Obligatorio para Rechazar)"
                      multiline
                      rows={3}
                      fullWidth
                      variant="outlined"
                      sx={{ mt: 2 }}
                    />
                    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                      <Button variant="contained" color="success" startIcon={<DoneAllIcon />} sx={{ textTransform: 'none' }}>
                        Enviar Aprobación
                      </Button>
                      <Button variant="outlined" color="error" startIcon={<CancelIcon />} sx={{ textTransform: 'none' }}>
                        Rechazar
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="body1" sx={{ color: '#616161', mb: 2 }}>
                      Esta solicitud ya ha sido **{selectedApproval.status}**.
                    </Typography>
                    {selectedApproval.comments.length > 0 && (
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>Comentarios:</Typography>
                        <List dense>
                          {selectedApproval.comments.map((comment, index) => (
                            <ListItem key={index} sx={{ alignItems: 'flex-start', mb: 1, borderLeft: '3px solid #eee', pl: 1 }}>
                              <ListItemText
                                primary={<><b>{comment.user}</b> <Typography component="span" variant="caption" color="text.secondary">{comment.date}</Typography></>}
                                secondary={comment.text}
                                primaryTypographyProps={{ color: '#333' }}
                                secondaryTypographyProps={{ color: '#616161' }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Bitácora de Actividades (Siempre visible en la vista general) */}
        {!selectedWorkflow && !selectedApproval && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <EventNoteIcon sx={{ color: '#4caf50', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Bitácora de Actividades de Automatización
              </Typography>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />
            <List dense sx={{ maxHeight: 300, overflowY: 'auto' }}>
              {simulatedActivityLog.map((log) => (
                <ListItem key={log.id} sx={{ borderLeft: '3px solid #a5d6a7', mb: 1, p: 1, '&:hover': { bgcolor: '#f0f0f0' } }}>
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
            <Button variant="text" sx={{ mt: 2, textTransform: 'none', color: '#4caf50' }}>Ver Bitácora Completa</Button>
          </Paper>
        )}
      </Container>

      {/* Dialog para Crear Nuevo Workflow */}
      <Dialog open={openNewWorkflowDialog} onClose={handleCloseNewWorkflowDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>Diseñar Nuevo Workflow</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 4 }}>
            <Step>
              <StepLabel>Información General</StepLabel>
              <StepContent>
                <TextField margin="normal" label="Nombre del Workflow" fullWidth value={newWorkflowData.name} onChange={(e) => setNewWorkflowData({ ...newWorkflowData, name: e.target.value })} />
                <TextField margin="normal" label="Descripción del Proceso" multiline rows={3} fullWidth value={newWorkflowData.description} onChange={(e) => setNewWorkflowData({ ...newWorkflowData, description: e.target.value })} />
                <TextField margin="normal" label="Desencadenantes (Triggers, separados por coma)" fullWidth value={newWorkflowData.triggers} onChange={(e) => setNewWorkflowData({ ...newWorkflowData, triggers: e.target.value })} helperText="Ej: Envío de formulario, Nuevo registro en DB, Notificación de sistema." />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Estado Inicial</InputLabel>
                  <Select value={newWorkflowData.status} label="Estado Inicial" onChange={(e) => setNewWorkflowData({ ...newWorkflowData, status: e.target.value })}>
                    <MenuItem value="Inactivo">Inactivo</MenuItem>
                    <MenuItem value="Activo">Activo</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" onClick={handleNextStep} color="primary">Siguiente</Button>
                </Box>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Definición de Pasos</StepLabel>
              <StepContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Define cada paso o tarea del workflow.
                </Typography>
                {newWorkflowData.steps.map((step, index) => (
                  <Paper key={index} elevation={2} sx={{ p: 2, mb: 2, borderLeft: '4px solid #4caf50' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Paso {index + 1}</Typography>
                      <IconButton size="small" color="error" onClick={() => handleRemoveWorkflowStep(index)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <TextField
                      label="Nombre del Paso"
                      fullWidth
                      size="small"
                      value={step.name}
                      onChange={(e) => handleUpdateWorkflowStep(index, 'name', e.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <FormControl fullWidth size="small" sx={{ mb: 1 }}>
                      <InputLabel>Tipo de Paso</InputLabel>
                      <Select value={step.type} label="Tipo de Paso" onChange={(e) => handleUpdateWorkflowStep(index, 'type', e.target.value)}>
                        <MenuItem value="Manual">Manual (requiere acción humana)</MenuItem>
                        <MenuItem value="Automatizado">Automatizado (ejecución por sistema)</MenuItem>
                        <MenuItem value="Aprobación">Aprobación (requiere decisión)</MenuItem>
                        <MenuItem value="Aprobación Condicional">Aprobación Condicional (basada en reglas)</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="Asignado a (Rol/Usuario)"
                      fullWidth
                      size="small"
                      value={step.assignedTo}
                      onChange={(e) => handleUpdateWorkflowStep(index, 'assignedTo', e.target.value)}
                    />
                    {step.type === 'Aprobación Condicional' && (
                      <TextField
                        label="Condición de Aprobación (ej. monto > 500)"
                        fullWidth
                        size="small"
                        sx={{ mt: 1 }}
                        placeholder="Ej: valor_solicitud > 500"
                      />
                    )}
                  </Paper>
                ))}
                <Button startIcon={<AddCircleOutlineIcon />} onClick={handleAddWorkflowStep} variant="outlined" color="primary" sx={{ mt: 2 }}>
                  Añadir Paso
                </Button>
                <Box sx={{ mt: 2 }}>
                  <Button disabled={activeStep === 0} onClick={handleBackStep} sx={{ mr: 1 }}>
                    Atrás
                  </Button>
                  <Button variant="contained" onClick={handleNextStep} color="primary" disabled={newWorkflowData.steps.length === 0}>
                    Finalizar
                  </Button>
                </Box>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Revisar y Crear</StepLabel>
              <StepContent>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Revisa los detalles de tu nuevo workflow antes de crearlo.
                </Typography>
                <List dense>
                  <ListItem><ListItemText primary="Nombre" secondary={newWorkflowData.name} /></ListItem>
                  <ListItem><ListItemText primary="Descripción" secondary={newWorkflowData.description} /></ListItem>
                  <ListItem><ListItemText primary="Desencadenantes" secondary={newWorkflowData.triggers} /></ListItem>
                  <ListItem><ListItemText primary="Estado Inicial" secondary={newWorkflowData.status} /></ListItem>
                </List>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>Pasos Definidos:</Typography>
                <List dense sx={{ maxHeight: 200, overflowY: 'auto' }}>
                  {newWorkflowData.steps.length === 0 ? (
                    <ListItem><ListItemText secondary="No se han definido pasos." /></ListItem>
                  ) : (
                    newWorkflowData.steps.map((step, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={`Paso ${index + 1}: ${step.name}`}
                          secondary={`Tipo: ${step.type} | Asignado a: ${step.assignedTo}`}
                        />
                      </ListItem>
                    ))
                  )}
                </List>
                <Box sx={{ mt: 2 }}>
                  <Button onClick={handleBackStep} sx={{ mr: 1 }}>
                    Atrás
                  </Button>
                  <Button variant="contained" onClick={handleSaveNewWorkflow} color="success">
                    Crear Workflow
                  </Button>
                </Box>
              </StepContent>
            </Step>
          </Stepper>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseNewWorkflowDialog} color="secondary">Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default WorkflowAutomation;