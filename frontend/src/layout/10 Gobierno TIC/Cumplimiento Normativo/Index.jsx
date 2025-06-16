import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Container, Typography, Box, Grid, Paper, Chip, Divider,
  List, ListItem, ListItemText, ListItemAvatar, Avatar,
  TextField, InputAdornment, IconButton, Button,
  AppBar, Toolbar, Tooltip,
  Tabs, Tab,
  Badge,
  Menu, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select,
  LinearProgress,
  Alert,
  Snackbar,
  Card, CardContent, CardActions, CardHeader,
  Accordion, AccordionSummary, AccordionDetails,
  Pagination,
  ButtonGroup,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  ToggleButton, ToggleButtonGroup,
  useMediaQuery,
  useTheme,
  Checkbox, FormControlLabel, FormGroup,
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import GavelIcon from '@mui/icons-material/Gavel'; // Icono principal de Cumplimiento Normativo
import FolderOpenIcon from '@mui/icons-material/FolderOpen'; // Archivos Normativos
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Cumplimiento Normativo
import PolicyIcon from '@mui/icons-material/Policy'; // Normativas
import BalanceIcon from '@mui/icons-material/Balance'; // Panel Legal
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Añadir
import SearchIcon from '@mui/icons-material/Search'; // Buscar
import EditIcon from '@mui/icons-material/Edit'; // Editar
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Eliminar
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ver detalles
import DownloadIcon from '@mui/icons-material/Download'; // Descargar
import RefreshIcon from '@mui/icons-material/Refresh'; // Refrescar
import UploadFileIcon from '@mui/icons-material/UploadFile'; // Subir archivo
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Advertencia
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Error
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Cumplido
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'; // Notificaciones/Alertas
import DescriptionIcon from '@mui/icons-material/Description';
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; // Documentos

// --- Datos Simulados ---

const currentUser = {
  id: 'CUM001',
  name: 'Bryan Rosero',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Bryan%20Rosero',
  role: 'Oficial de Cumplimiento TIC',
};

const minticNormatives = [
  { id: 'MINTIC001', name: 'Decreto 1078 de 2015', description: 'Decreto Único Reglamentario del Sector de Tecnologías de la Información y las Comunicaciones.', type: 'Decreto', dateIssued: '2015-05-26', applicability: ['General'], relevance: 'Alta' },
  { id: 'MINTIC002', name: 'Resolución 2021000216 de 2021', description: 'Por la cual se establecen los lineamientos generales para el Gobierno Digital.', type: 'Resolución', dateIssued: '2021-01-28', applicability: ['Gobierno Digital', 'Seguridad de la Información'], relevance: 'Crítica' },
  { id: 'MINTIC003', name: 'Ley 1581 de 2012', description: 'Por la cual se dictan disposiciones generales para la protección de datos personales.', type: 'Ley', dateIssued: '2012-10-17', applicability: ['Privacidad de Datos'], relevance: 'Crítica' },
  { id: 'MINTIC004', name: 'Guía de Seguridad y Privacidad de la Información (MinTIC)', description: 'Lineamientos para la implementación de un SGSI en entidades públicas.', type: 'Guía', dateIssued: '2020-03-10', applicability: ['Seguridad de la Información'], relevance: 'Alta' },
];

const isoStandards = [
  { id: 'ISO27001', name: 'ISO/IEC 27001:2022', description: 'Sistemas de Gestión de la Seguridad de la Información (SGSI).', type: 'Estándar Internacional', dateIssued: '2022-10-25', applicability: ['Seguridad de la Información'], relevance: 'Crítica' },
  { id: 'ISO27002', name: 'ISO/IEC 27002:2022', description: 'Controles de seguridad de la información, ciberseguridad y protección de la privacidad.', type: 'Estándar Internacional', dateIssued: '2022-10-25', applicability: ['Seguridad de la Información'], relevance: 'Alta' },
  { id: 'ISO9001', name: 'ISO 9001:2015', description: 'Sistemas de Gestión de la Calidad.', type: 'Estándar Internacional', dateIssued: '2015-09-01', applicability: ['Calidad', 'Gestión de Procesos'], relevance: 'Media' },
];

const regulatoryDocuments = [
  { id: 'DOC001', name: 'Política de Seguridad de la Información Interna', source: 'Interno', type: 'Política', version: '1.0', date: '2024-03-15', downloadUrl: '/docs/Politica_SGSI_Interna.pdf' },
  { id: 'DOC002', name: 'Informe de Auditoría de Ciberseguridad Q1 2025', source: 'Auditoría Externa', type: 'Informe', version: '1.0', date: '2025-04-10', downloadUrl: '/docs/Auditoria_Ciberseguridad_Q1_2025.pdf' },
  { id: 'DOC003', name: 'Procedimiento de Gestión de Incidentes de Seguridad', source: 'Interno', type: 'Procedimiento', version: '2.1', date: '2024-11-20', downloadUrl: '/docs/Proc_Incidentes_Seguridad.pdf' },
];

const complianceChecks = [
  {
    id: 'CHK001',
    normativeId: 'MINTIC003', // Ley 1581 de 2012
    checkName: 'Consentimiento para tratamiento de datos personales',
    description: 'Verificar que se obtiene el consentimiento informado y explícito de los titulares de datos para su recolección y tratamiento.',
    responsible: 'Equipo Jurídico / TI',
    dueDate: '2025-06-30',
    status: 'En Progreso', // 'Cumplido', 'En Progreso', 'Incumplido', 'Pendiente'
    evidence: 'Acta de validación de formularios, log de consentimientos',
    comments: 'Se está revisando la implementación de la nueva plataforma de gestión de consentimientos.',
  },
  {
    id: 'CHK002',
    normativeId: 'ISO27001',
    checkName: 'Implementación de control de acceso físico (A.11.1)',
    description: 'Asegurar que las áreas que contienen información sensible estén protegidas con controles de acceso físico adecuados.',
    responsible: 'Equipo de Seguridad',
    dueDate: '2025-05-15',
    status: 'Cumplido',
    evidence: 'Reporte de auditoría de acceso físico, registros de visitas',
    comments: 'Auditoría interna confirmó la implementación de controles biométricos.',
  },
  {
    id: 'CHK003',
    normativeId: 'MINTIC002', // Resolución 2021000216
    checkName: 'Actualización del Modelo de Seguridad y Privacidad de la Información',
    description: 'Validar que el MSPI de la entidad esté actualizado con los últimos lineamientos de Gobierno Digital.',
    responsible: 'Oficial de Seguridad',
    dueDate: '2025-07-31',
    status: 'Pendiente',
    evidence: 'Documento MSPI actualizado',
    comments: 'Fase de revisión interna de la versión preliminar del documento.',
  },
  {
    id: 'CHK004',
    normativeId: 'MINTIC001', // Decreto 1078
    checkName: 'Uso de Estándares Abiertos para Interoperabilidad',
    description: 'Garantizar el uso de estándares abiertos en los sistemas de información para facilitar la interoperabilidad.',
    responsible: 'Arquitectura TI',
    dueDate: '2025-08-31',
    status: 'En Progreso',
    evidence: 'Documentación de arquitectura, pruebas de interoperabilidad',
    comments: 'Identificadas algunas brechas con sistemas legados, plan de remediación en curso.',
  },
  {
    id: 'CHK005',
    normativeId: 'ISO27001',
    checkName: 'Capacitación en Concientización de Seguridad (A.7.2.2)',
    description: 'Programa de concientización y capacitación continua en seguridad de la información para todos los empleados.',
    responsible: 'Recursos Humanos / Seguridad',
    dueDate: '2025-06-15',
    status: 'Incumplido', // Ejemplo de incumplimiento
    evidence: 'Registros de asistencia a capacitaciones',
    comments: 'La capacitación del Q2 ha sido pospuesta por falta de recursos.',
  },
];

const legalPanelData = {
  overallComplianceScore: 0.85, // 85%
  criticalAlerts: 1, // Number of 'Incumplido' critical checks
  pendingActions: 2, // Number of 'En Progreso' or 'Pendiente' checks
  upcomingDeadlines: 3, // Number of deadlines in next 30 days
  complianceByStandard: {
    'MinTIC': { completed: 4, total: 6, score: 0.66 }, // Mock data
    'ISO 27001': { completed: 2, total: 3, score: 0.66 },
    'ISO 9001': { completed: 1, total: 1, score: 1 },
  },
};


// Helper para obtener nombre de la normativa
const getNormativeNameById = (id) => {
  const allNorms = [...minticNormatives, ...isoStandards];
  return allNorms.find(n => n.id === id)?.name || id;
};

// Componente principal
function ICTCompliancePanel({ onGoToHome }) {
  const [currentTab, setCurrentTab] = useState('regulatory_files'); // 'regulatory_files', 'compliance_status', 'normative_catalog', 'legal_dashboard'
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'viewDoc', 'uploadDoc', 'viewCheck', 'editCheck', 'newCheck'
  const [selectedItem, setSelectedItem] = useState(null); // For document/check details/edit

  const showSnackbar = useCallback((message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // --- Funciones de Gestión de Documentos Normativos ---
  const handleViewDocument = (doc) => {
    setSelectedItem(doc);
    setDialogType('viewDoc');
    setDialogOpen(true);
  };

  const handleUploadDocument = () => {
    setSelectedItem(null);
    setDialogType('uploadDoc');
    setDialogOpen(true);
  };

  const handleSaveDocument = (docData) => {
    // In a real app, this would involve API calls
    showSnackbar('Documento cargado/actualizado (simulado).', 'success');
    setDialogOpen(false);
    // You'd typically update a state holding regulatoryDocuments
  };

  // --- Funciones de Gestión de Cumplimiento ---
  const handleViewCheck = (check) => {
    setSelectedItem(check);
    setDialogType('viewCheck');
    setDialogOpen(true);
  };

  const handleEditCheck = (check) => {
    setSelectedItem(check);
    setDialogType('editCheck');
    setDialogOpen(true);
  };

  const handleNewCheck = () => {
    setSelectedItem(null);
    setDialogType('newCheck');
    setDialogOpen(true);
  };

  const handleSaveCheck = (checkData) => {
    // In a real app, this would involve API calls to update/create
    showSnackbar('Control de cumplimiento guardado (simulado).', 'success');
    setDialogOpen(false);
    // You'd typically update complianceChecks state here
  };

  const handleDeleteCheck = (checkId) => {
    // In a real app, this would involve API calls
    showSnackbar('Control de cumplimiento eliminado (simulado).', 'info');
    // You'd typically filter complianceChecks state here
  };

  // --- Diálogos Internos ---

  const DocumentFormDialog = () => {
    const [formData, setFormData] = useState(selectedItem || {
      name: '', source: '', type: '', version: '', date: '', downloadUrl: ''
    });

    const isViewMode = dialogType === 'viewDoc';

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
      if (!formData.name || !formData.source || !formData.type || !formData.date) {
        showSnackbar('Por favor, completa todos los campos obligatorios.', 'error');
        return;
      }
      handleSaveDocument(formData);
    };

    return (
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#263238', color: '#fff' }}>
          {isViewMode ? 'Detalles del Documento' : 'Subir/Editar Documento Normativo'}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField label="Nombre del Documento" name="name" value={formData.name} onChange={handleChange} fullWidth required disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Fuente (MinTIC, ISO, Interno)" name="source" value={formData.source} onChange={handleChange} fullWidth required disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Tipo (Decreto, Ley, Norma, Política)" name="type" value={formData.type} onChange={handleChange} fullWidth required disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Versión" name="version" value={formData.version} onChange={handleChange} fullWidth disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Fecha de Emisión/Publicación" name="date" type="date" value={formData.date} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} disabled={isViewMode} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="URL de Descarga (si aplica)" name="downloadUrl" value={formData.downloadUrl} onChange={handleChange} fullWidth disabled={isViewMode} />
            </Grid>
            {!isViewMode && (
              <Grid item xs={12}>
                <Alert severity="info">
                  Adjunta el archivo real aquí (funcionalidad simulada).
                  <Button variant="outlined" size="small" startIcon={<UploadFileIcon />} sx={{ml:2}}>Subir Archivo</Button>
                </Alert>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            {isViewMode ? 'Cerrar' : 'Cancelar'}
          </Button>
          {!isViewMode && (
            <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#2962ff', '&:hover': { bgcolor: '#2962ff' } }}>
              Guardar Documento
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  const ComplianceCheckDialog = () => {
    const [formData, setFormData] = useState(selectedItem || {
      normativeId: '', checkName: '', description: '', responsible: '', dueDate: '', status: 'Pendiente', evidence: '', comments: ''
    });

    const isViewMode = dialogType === 'viewCheck';

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
      if (!formData.normativeId || !formData.checkName || !formData.responsible || !formData.dueDate) {
        showSnackbar('Por favor, completa los campos obligatorios.', 'error');
        return;
      }
      handleSaveCheck(formData);
    };

    return (
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#263238', color: '#fff' }}>
          {isViewMode ? 'Detalles del Control de Cumplimiento' : (dialogType === 'newCheck' ? 'Crear Nuevo Control' : 'Editar Control de Cumplimiento')}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth required disabled={isViewMode}>
                <InputLabel>Normativa Asociada</InputLabel>
                <Select label="Normativa Asociada" name="normativeId" value={formData.normativeId} onChange={handleChange}>
                  <MenuItem value=""><em>Seleccionar Normativa</em></MenuItem>
                  {minticNormatives.map(norm => <MenuItem key={norm.id} value={norm.id}>{norm.name}</MenuItem>)}
                  {isoStandards.map(norm => <MenuItem key={norm.id} value={norm.id}>{norm.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Nombre del Control" name="checkName" value={formData.checkName} onChange={handleChange} fullWidth required disabled={isViewMode} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Descripción del Control" name="description" value={formData.description} onChange={handleChange} fullWidth multiline rows={2} disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Responsable" name="responsible" value={formData.responsible} onChange={handleChange} fullWidth required disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Fecha Límite" name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} disabled={isViewMode} />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth disabled={isViewMode}>
                <InputLabel>Estado</InputLabel>
                <Select label="Estado" name="status" value={formData.status} onChange={handleChange}>
                  <MenuItem value="Pendiente">Pendiente</MenuItem>
                  <MenuItem value="En Progreso">En Progreso</MenuItem>
                  <MenuItem value="Cumplido">Cumplido</MenuItem>
                  <MenuItem value="Incumplido">Incumplido</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Evidencia/Documentación" name="evidence" value={formData.evidence} onChange={handleChange} fullWidth multiline rows={2} disabled={isViewMode} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Comentarios Adicionales" name="comments" value={formData.comments} onChange={handleChange} fullWidth multiline rows={2} disabled={isViewMode} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            {isViewMode ? 'Cerrar' : 'Cancelar'}
          </Button>
          {!isViewMode && (
            <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#00c853', '&:hover': { bgcolor: '#00a142' } }}>
              Guardar Control
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  const getDialogComponent = () => {
    switch (dialogType) {
      case 'viewDoc':
      case 'uploadDoc':
        return <DocumentFormDialog />;
      case 'viewCheck':
      case 'editCheck':
      case 'newCheck':
        return <ComplianceCheckDialog />;
      default:
        return null;
    }
  };

  // --- Cálculo de Puntuación de Cumplimiento ---
  const calculateComplianceScore = useCallback(() => {
    const totalChecks = complianceChecks.length;
    const completedChecks = complianceChecks.filter(c => c.status === 'Cumplido').length;
    return totalChecks > 0 ? (completedChecks / totalChecks) : 0;
  }, []);

  const overallComplianceScore = useMemo(() => calculateComplianceScore(), [calculateComplianceScore]);

  const criticalAlertsCount = useMemo(() => {
    return complianceChecks.filter(c => c.status === 'Incumplido' && (getNormativeNameById(c.normativeId).includes('Ley') || getNormativeNameById(c.normativeId).includes('ISO27001') || getNormativeNameById(c.normativeId).includes('Resolución 2021'))).length;
  }, []);

  const pendingActionsCount = useMemo(() => {
    return complianceChecks.filter(c => c.status === 'En Progreso' || c.status === 'Pendiente').length;
  }, []);

  const upcomingDeadlinesCount = useMemo(() => {
    const today = new Date();
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(today.getDate() + 30);

    return complianceChecks.filter(c => {
      const dueDate = new Date(c.dueDate);
      return dueDate >= today && dueDate <= thirtyDaysLater && c.status !== 'Cumplido';
    }).length;
  }, []);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', minHeight: '100vh', color: '#333', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#263238', borderBottom: '1px solid #37474f' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2, color: '#eceff1' }}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}
          <GavelIcon sx={{ fontSize: 36, mr: 1, color: '#ff6f00' }} /> {/* Naranja quemado para la ley */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Panel de Cumplimiento Normativo TIC
          </Typography>
          <Chip
            avatar={<Avatar src={currentUser.avatar} />}
            label={currentUser.name}
            sx={{ bgcolor: '#37474f', color: '#ffffff', fontWeight: 600 }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#263238' }}>
            Gestión Integral del Gobierno y Cumplimiento TIC
          </Typography>
          <Typography variant="h6" color="#616161">
            Asegura el cumplimiento de normativas clave como MinTIC e ISO, y gestiona riesgos legales.
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
                backgroundColor: '#263238', // Gris azulado oscuro
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                '&.Mui-selected': {
                  color: '#263238', // Gris azulado oscuro
                },
              },
            }}
          >
            <Tab label="Archivos Normativos" value="regulatory_files" icon={<FolderOpenIcon />} iconPosition="start" />
            <Tab label="Estado de Cumplimiento" value="compliance_status" icon={<CheckCircleOutlineIcon />} iconPosition="start" />
            <Tab label="Catálogo de Normativas" value="normative_catalog" icon={<PolicyIcon />} iconPosition="start" />
            <Tab label="Panel Legal & Riesgos" value="legal_dashboard" icon={<BalanceIcon />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Contenido de las Pestañas */}
        <Box sx={{ p: 0 }}>
          {/* Tab: Archivos Normativos */}
          {currentTab === 'regulatory_files' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <FolderOpenIcon sx={{ color: '#263238', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Repositorio de Archivos y Documentos Normativos
                </Typography>
                <Button variant="contained" startIcon={<UploadFileIcon />} onClick={handleUploadDocument} sx={{ textTransform: 'none', bgcolor: '#2962ff', '&:hover': { bgcolor: '#1976d2' } }}>
                  Subir Nuevo Documento
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="info" sx={{ mb: 3 }}>
                Aquí se centralizan todos los documentos relevantes para el cumplimiento (políticas internas, informes, guías, etc.).
              </Alert>

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#eceff1' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Nombre del Documento</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Fuente</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Tipo</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Versión</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Fecha</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {regulatoryDocuments.length > 0 ? (
                      regulatoryDocuments.map((doc) => (
                        <TableRow key={doc.id} hover>
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#333' }}>{doc.name}</Typography>
                          </TableCell>
                          <TableCell>{doc.source}</TableCell>
                          <TableCell>{doc.type}</TableCell>
                          <TableCell>{doc.version}</TableCell>
                          <TableCell>{doc.date}</TableCell>
                          <TableCell align="center">
                            {doc.downloadUrl && (
                              <Tooltip title="Descargar Documento">
                                <IconButton size="small" href={doc.downloadUrl} target="_blank">
                                  <DownloadIcon color="primary" />
                                </IconButton>
                              </Tooltip>
                            )}
                            <Tooltip title="Ver Detalles">
                              <IconButton size="small" onClick={() => handleViewDocument(doc)}>
                                <VisibilityIcon color="action" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar Documento">
                              <IconButton size="small" onClick={() => { setSelectedItem(doc); setDialogType('uploadDoc'); setDialogOpen(true); }}>
                                <EditIcon color="action" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar Documento">
                              <IconButton size="small" onClick={() => showSnackbar(`Documento ${doc.name} eliminado (simulado)`, 'info')}>
                                <DeleteOutlineIcon color="error" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={6} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No hay documentos normativos cargados.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination count={Math.ceil(regulatoryDocuments.length / 10)} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }} />
              <Alert severity="success" sx={{ mt: 3 }}>
                Mantén tus documentos organizados y accesibles para auditorías y revisiones.
              </Alert>
            </Paper>
          )}

          {/* Tab: Estado de Cumplimiento */}
          {currentTab === 'compliance_status' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <CheckCircleOutlineIcon sx={{ color: '#263238', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Estado de los Controles de Cumplimiento
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleNewCheck} sx={{ textTransform: 'none', bgcolor: '#00c853', '&:hover': { bgcolor: '#00a142' } }}>
                  Añadir Nuevo Control
                </Button>
                <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => showSnackbar('Estado de cumplimiento actualizado', 'info')}>
                  Actualizar Estado
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="warning" sx={{ mb: 3 }}>
                Revisa el progreso de cada control y las fechas límite para asegurar el cumplimiento.
              </Alert>

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#eceff1' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Control de Cumplimiento</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Normativa</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Responsable</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Fecha Límite</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {complianceChecks.length > 0 ? (
                      complianceChecks.map((check) => {
                        let statusColor = 'default';
                        let statusIcon = null;
                        switch (check.status) {
                          case 'Cumplido':
                            statusColor = 'success';
                            statusIcon = <CheckCircleIcon sx={{fontSize:'inherit'}}/>;
                            break;
                          case 'En Progreso':
                            statusColor = 'info';
                            statusIcon = <WarningAmberIcon sx={{fontSize:'inherit'}}/>;
                            break;
                          case 'Incumplido':
                            statusColor = 'error';
                            statusIcon = <ErrorOutlineIcon sx={{fontSize:'inherit'}}/>;
                            break;
                          case 'Pendiente':
                            statusColor = 'warning';
                            statusIcon = <NotificationsActiveIcon sx={{fontSize:'inherit'}}/>;
                            break;
                          default:
                            break;
                        }

                        const isPastDue = new Date(check.dueDate) < new Date() && check.status !== 'Cumplido';

                        return (
                          <TableRow key={check.id} hover sx={{ bgcolor: isPastDue ? '#ffebee' : 'inherit' }}>
                            <TableCell component="th" scope="row">
                              <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#333' }}>{check.checkName}</Typography>
                              <Typography variant="body2" color="text.secondary">{check.description}</Typography>
                            </TableCell>
                            <TableCell>
                              <Tooltip title={getNormativeNameById(check.normativeId)}>
                                <Chip label={check.normativeId} size="small" />
                              </Tooltip>
                            </TableCell>
                            <TableCell>{check.responsible}</TableCell>
                            <TableCell sx={{ color: isPastDue ? '#d50000' : 'inherit', fontWeight: isPastDue ? 600 : 'normal' }}>
                              {check.dueDate}
                              {isPastDue && <Typography variant="caption" color="error" sx={{ml:1}}>(Vencido)</Typography>}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={check.status}
                                color={statusColor}
                                size="small"
                                icon={statusIcon}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Tooltip title="Ver Detalles">
                                <IconButton size="small" onClick={() => handleViewCheck(check)}><VisibilityIcon color="primary" /></IconButton>
                              </Tooltip>
                              <Tooltip title="Editar Control">
                                <IconButton size="small" onClick={() => handleEditCheck(check)}><EditIcon color="action" /></IconButton>
                              </Tooltip>
                              <Tooltip title="Eliminar Control">
                                <IconButton size="small" onClick={() => handleDeleteCheck(check.id)}><DeleteOutlineIcon color="error" /></IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow><TableCell colSpan={6} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No hay controles de cumplimiento definidos.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination count={Math.ceil(complianceChecks.length / 10)} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }} />
              <Alert severity="success" sx={{ mt: 3 }}>
                La gestión proactiva de controles reduce el riesgo de incumplimiento.
              </Alert>
            </Paper>
          )}

          {/* Tab: Catálogo de Normativas */}
          {currentTab === 'normative_catalog' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <PolicyIcon sx={{ color: '#263238', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Catálogo de Normativas MinTIC, ISO y Otros Estándares
                </Typography>
                <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => showSnackbar('Catálogo de normativas actualizado', 'info')}>
                  Actualizar Catálogo
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="info" sx={{ mb: 3 }}>
                Explora las leyes, decretos, resoluciones y estándares que rigen el Gobierno de las TIC.
              </Alert>

              <Accordion defaultExpanded sx={{ mb: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <AccordionSummary expandIcon={<ChevronRightIcon />} sx={{ bgcolor: '#eceff1', borderRadius: '2px 2px 0 0' }}>
                  <Typography variant="h6" sx={{fontWeight: 600, color: '#263238'}}><PolicyIcon sx={{verticalAlign: 'middle', mr: 1}}/> Normativas MinTIC (Colombia)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    {minticNormatives.map(norm => (
                      <ListItem key={norm.id} sx={{ borderBottom: '1px dashed #eee' }} secondaryAction={
                        <ButtonGroup variant="outlined" size="small">
                          <Tooltip title="Ver Detalles">
                            <IconButton><VisibilityIcon color="primary"/></IconButton>
                          </Tooltip>
                          <Tooltip title="Buscar Controles Asociados">
                            <IconButton onClick={() => showSnackbar(`Buscando controles para ${norm.name}`, 'info')}><SearchIcon color="action"/></IconButton>
                          </Tooltip>
                        </ButtonGroup>
                      }>
                        <ListItemText
                          primary={<Typography variant="subtitle1" sx={{fontWeight: 500}}>{norm.name} <Chip label={norm.type} size="small" sx={{ml:1}}/></Typography>}
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">{norm.description}</Typography>
                              <Typography variant="caption" color="text.secondary">Fecha: {norm.dateIssued} | Relevancia: <Chip label={norm.relevance} size="small" color={norm.relevance === 'Crítica' ? 'error' : (norm.relevance === 'Alta' ? 'warning' : 'info')} /></Typography>
                              <Typography variant="caption" color="text.secondary" sx={{display: 'block'}}>Aplicabilidad: {norm.applicability.join(', ')}</Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ mb: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <AccordionSummary expandIcon={<ChevronRightIcon />} sx={{ bgcolor: '#eceff1' }}>
                  <Typography variant="h6" sx={{fontWeight: 600, color: '#263238'}}><PolicyIcon sx={{verticalAlign: 'middle', mr: 1}}/> Estándares ISO (Internacionales)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    {isoStandards.map(norm => (
                      <ListItem key={norm.id} sx={{ borderBottom: '1px dashed #eee' }} secondaryAction={
                        <ButtonGroup variant="outlined" size="small">
                          <Tooltip title="Ver Detalles">
                            <IconButton><VisibilityIcon color="primary"/></IconButton>
                          </Tooltip>
                          <Tooltip title="Buscar Controles Asociados">
                            <IconButton onClick={() => showSnackbar(`Buscando controles para ${norm.name}`, 'info')}><SearchIcon color="action"/></IconButton>
                          </Tooltip>
                        </ButtonGroup>
                      }>
                        <ListItemText
                          primary={<Typography variant="subtitle1" sx={{fontWeight: 500}}>{norm.name} <Chip label={norm.type} size="small" sx={{ml:1}}/></Typography>}
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">{norm.description}</Typography>
                              <Typography variant="caption" color="text.secondary">Fecha: {norm.dateIssued} | Relevancia: <Chip label={norm.relevance} size="small" color={norm.relevance === 'Crítica' ? 'error' : (norm.relevance === 'Alta' ? 'warning' : 'info')} /></Typography>
                              <Typography variant="caption" color="text.secondary" sx={{display: 'block'}}>Aplicabilidad: {norm.applicability.join(', ')}</Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>

              <Alert severity="success" sx={{ mt: 3 }}>
                Accede a la información más reciente sobre el marco normativo para tus operaciones TIC.
              </Alert>
            </Paper>
          )}

          {/* Tab: Panel Legal & Riesgos */}
          {currentTab === 'legal_dashboard' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <BalanceIcon sx={{ color: '#263238', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Panel de Riesgos y Resumen Legal del Cumplimiento TIC
                </Typography>
                <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => showSnackbar('Panel legal actualizado', 'info')}>
                  Refrescar Panel
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="error" sx={{ mb: 3 }}>
                Monitorea los indicadores clave de riesgo para la gestión del cumplimiento normativo.
              </Alert>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card elevation={2} sx={{ borderRadius: 2, borderLeft: '5px solid #2962ff' }}>
                    <CardContent>
                      <Typography variant="overline" color="text.secondary">Puntuación General</Typography>
                      <Typography variant="h4" component="div" sx={{ fontWeight: 700, mt: 0.5, color: overallComplianceScore < 0.7 ? '#ff6f00' : '#00c853' }}>
                        {(overallComplianceScore * 100).toFixed(1)}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Índice de cumplimiento global.
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={overallComplianceScore * 100}
                        color={overallComplianceScore < 0.7 ? 'error' : (overallComplianceScore < 0.9 ? 'warning' : 'success')}
                        sx={{ height: 8, borderRadius: 5, mt: 1 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card elevation={2} sx={{ borderRadius: 2, borderLeft: '5px solid #ff6f00' }}>
                    <CardContent>
                      <Typography variant="overline" color="text.secondary">Alertas Críticas</Typography>
                      <Typography variant="h4" component="div" sx={{ fontWeight: 700, mt: 0.5, color: criticalAlertsCount > 0 ? '#ff6f00' : '#00c853' }}>
                        {criticalAlertsCount}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Controles de cumplimiento *Incumplidos* en normativas críticas.
                      </Typography>
                      <Button startIcon={<ErrorOutlineIcon />} size="small" sx={{mt:1}} onClick={() => setCurrentTab('compliance_status')}>Ver Alertas</Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card elevation={2} sx={{ borderRadius: 2, borderLeft: '5px solid #00c853' }}>
                    <CardContent>
                      <Typography variant="overline" color="text.secondary">Acciones Pendientes</Typography>
                      <Typography variant="h4" component="div" sx={{ fontWeight: 700, mt: 0.5, color: pendingActionsCount > 0 ? '#2962ff' : '#00c853' }}>
                        {pendingActionsCount}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Controles en estado *En Progreso* o *Pendiente*.
                      </Typography>
                      <Button startIcon={<CheckCircleOutlineIcon />} size="small" sx={{mt:1}} onClick={() => setCurrentTab('compliance_status')}>Gestionar Acciones</Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#263238', display: 'flex', alignItems: 'center' }}>
                    <PolicyIcon sx={{ mr: 1 }} /> Desempeño por Normativa
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(legalPanelData.complianceByStandard).map(([normative, data]) => (
                      <Grid item xs={12} sm={6} md={4} key={normative}>
                        <Card elevation={1} sx={{ p: 2, bgcolor: '#eceff1', borderLeft: `4px solid ${data.score < 0.7 ? '#ff6f00' : (data.score < 0.9 ? '#2962ff' : '#00c853')}` }}>
                          <Typography variant="subtitle1" sx={{fontWeight: 600, color: '#333'}}>{normative}</Typography>
                          <Typography variant="body2" color="text.secondary">Completados: {data.completed} de {data.total}</Typography>
                          <LinearProgress
                            variant="determinate"
                            value={data.score * 100}
                            color={data.score < 0.7 ? 'error' : (data.score < 0.9 ? 'primary' : 'success')}
                            sx={{ height: 8, borderRadius: 5, mt: 1 }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5, color: data.score < 0.7 ? '#ff6f00' : (data.score < 0.9 ? '#2962ff' : '#00c853') }}>
                            { (data.score * 100).toFixed(1) }% de Cumplimiento
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>

              <Alert severity="success" sx={{ mt: 3 }}>
                Este panel te permite evaluar rápidamente la postura de cumplimiento y los riesgos asociados.
              </Alert>
            </Paper>
          )}
        </Box>
      </Container>

      {/* Renderizar el Dialogo Dinámicamente */}
      {getDialogComponent()}

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

export default ICTCompliancePanel;