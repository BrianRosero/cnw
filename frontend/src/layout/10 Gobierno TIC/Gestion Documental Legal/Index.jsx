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
import FolderSharedIcon from '@mui/icons-material/FolderShared'; // Icono principal de Gestión Documental
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Cargar Documento
import DescriptionIcon from '@mui/icons-material/Description'; // Documentos Generales / MinTIC
import AssessmentIcon from '@mui/icons-material/Assessment'; // Informes de Tecnología
import HistoryIcon from '@mui/icons-material/History'; // Control de Versiones / Historial
import MemoryIcon from '@mui/icons-material/Memory'; // Gestión Documentos SAP
import GavelIcon from '@mui/icons-material/Gavel'; // Gestión Documental Legal
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Añadir
import SearchIcon from '@mui/icons-material/Search'; // Buscar
import EditIcon from '@mui/icons-material/Edit'; // Editar
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Eliminar
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ver detalles
import DownloadIcon from '@mui/icons-material/Download'; // Descargar
import RefreshIcon from '@mui/icons-material/Refresh'; // Refrescar
import LinkIcon from '@mui/icons-material/Link'; // Enlace externo
import PublishIcon from '@mui/icons-material/Publish'; // Publicar / Versión Final
import LockIcon from '@mui/icons-material/Lock'; // Acceso Restringido
import LockOpenIcon from '@mui/icons-material/LockOpen'; // Acceso Público
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Para Acordiones


// --- Datos Simulados ---

const currentUser = {
  id: 'DOCM001',
  name: 'Andrés Documentador',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Andres%20Documentador',
  role: 'Administrador Documental',
};

const documentTypes = [
  'Informe', 'Reporte MinTIC', 'Manual Operativo', 'Política', 'Procedimiento',
  'Contrato', 'Acta', 'Plan', 'Documento de Configuración SAP', 'Requisito Legal', 'Otro'
];

const documentSources = [
  'Interno', 'Ministerio TIC', 'SAP', 'Asesoría Legal', 'Auditoría Externa', 'Proveedor'
];

const simulatedDocuments = [
  {
    id: 'DOC-MINTIC-001',
    name: 'Reporte Anual de Conectividad TIC 2024',
    type: 'Reporte MinTIC',
    source: 'Ministerio TIC',
    version: '1.0',
    status: 'Borrador', // Borrador, En Revisión, Aprobado, Publicado, Obsoleto
    creationDate: '2025-01-15',
    lastModified: '2025-06-10',
    owner: 'Dpto. TI',
    downloadUrl: '/docs/Reporte_MinTIC_2024.pdf',
    history: [
      { version: '0.9', date: '2025-01-05', author: 'Equipo de TI', comments: 'Primera versión para revisión interna.' },
      { version: '1.0 Borrador', date: '2025-01-15', author: 'Andrés Documentador', comments: 'Incorporación de datos finales de conectividad.' },
    ],
    tags: ['MinTIC', 'Conectividad', '2024', 'Informe'],
    access: 'Restringido', // Restringido, Público
  },
  {
    id: 'DOC-INF-002',
    name: 'Informe de Desempeño de Infraestructura Q1 2025',
    type: 'Informe',
    source: 'Interno',
    version: '1.0',
    status: 'Aprobado',
    creationDate: '2025-04-01',
    lastModified: '2025-04-15',
    owner: 'Dpto. TI',
    downloadUrl: '/docs/Informe_Infraestructura_Q1_2025.pdf',
    history: [
      { version: '0.8', date: '2025-03-20', author: 'Javier Ingeniero', comments: 'Recopilación inicial de métricas.' },
      { version: '1.0 Final', date: '2025-04-15', author: 'Andrés Documentador', comments: 'Versión final para dirección.' },
    ],
    tags: ['Infraestructura', 'Desempeño', 'Q1 2025'],
    access: 'Restringido',
  },
  {
    id: 'DOC-SAP-003',
    name: 'Manual de Usuario Módulo FI (SAP)',
    type: 'Manual Operativo',
    source: 'SAP',
    version: '2.3',
    status: 'Publicado',
    creationDate: '2024-08-01',
    lastModified: '2025-03-01',
    owner: 'Soporte SAP',
    downloadUrl: '/docs/Manual_SAP_FI_v2.3.pdf',
    history: [
      { version: '2.1', date: '2024-11-10', author: 'Carolina Consultora', comments: 'Actualización por nueva funcionalidad.' },
      { version: '2.2', date: '2025-01-20', author: 'Laura Legal', comments: 'Correcciones menores de formato.' },
      { version: '2.3', date: '2025-03-01', author: 'Equipo SAP', comments: 'Revisión y publicación final.' },
    ],
    tags: ['SAP', 'FI', 'Manual', 'Usuario'],
    access: 'Público', // Para todos los usuarios de SAP
  },
  {
    id: 'DOC-LEG-004',
    name: 'Contrato de Licenciamiento Software X',
    type: 'Contrato',
    source: 'Asesoría Legal',
    version: '1.0',
    status: 'Aprobado',
    creationDate: '2025-02-10',
    lastModified: '2025-02-15',
    owner: 'Dpto. Legal',
    downloadUrl: '/docs/Contrato_Software_X.pdf',
    history: [
      { version: '0.5', date: '2025-02-01', author: 'Asesoría Legal', comments: 'Primera revisión legal.' },
      { version: '1.0', date: '2025-02-15', author: 'Andrés Documentador', comments: 'Versión final firmada.' },
    ],
    tags: ['Legal', 'Contrato', 'Licenciamiento'],
    access: 'Restringido',
  },
  {
    id: 'DOC-POL-005',
    name: 'Política de Uso Aceptable de Activos de TI',
    type: 'Política',
    source: 'Interno',
    version: '3.0',
    status: 'Publicado',
    creationDate: '2024-01-01',
    lastModified: '2025-05-20',
    owner: 'Oficial de Seguridad',
    downloadUrl: '/docs/Politica_Uso_Activos_TI.pdf',
    history: [
      { version: '2.5', date: '2024-12-10', author: 'Oficial de Seguridad', comments: 'Revisión anual.' },
      { version: '3.0 Borrador', date: '2025-04-01', author: 'Comité de Seguridad', comments: 'Incorporación de nuevas directrices de ciberseguridad.' },
      { version: '3.0 Final', date: '2025-05-20', author: 'Andrés Documentador', comments: 'Aprobación y publicación.' },
    ],
    tags: ['Política', 'Seguridad', 'TI', 'Interno'],
    access: 'Público',
  },
];


// Componente principal
function DocumentManagementPanel({ onGoToHome }) {
  const [currentTab, setCurrentTab] = useState('dashboard'); // 'dashboard', 'mintic_reports', 'tech_reports', 'version_control', 'sap_docs', 'legal_docs'
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'viewDoc', 'newDoc', 'editDoc', 'viewHistory'
  const [selectedDocument, setSelectedDocument] = useState(null); // For document details/edit/history

  const showSnackbar = useCallback((message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // --- Funciones de Gestión de Documentos ---
  const handleViewDocument = (doc) => {
    setSelectedDocument(doc);
    setDialogType('viewDoc');
    setDialogOpen(true);
  };

  const handleCreateNewDocument = () => {
    setSelectedDocument(null);
    setDialogType('newDoc');
    setDialogOpen(true);
  };

  const handleEditDocument = (doc) => {
    setSelectedDocument(doc);
    setDialogType('editDoc');
    setDialogOpen(true);
  };

  const handleSaveDocument = (docData) => {
    if (selectedDocument) {
      // Editing existing document
      // In a real app, you'd update the specific document in your state/DB
      showSnackbar('Documento actualizado con éxito (simulado).', 'success');
    } else {
      // Creating new document
      const newId = `DOC-${docData.type.substring(0,3).toUpperCase()}-${String(simulatedDocuments.length + 1).padStart(3, '0')}`;
      // In a real app, you'd add this to your state/DB and get a real ID
      simulatedDocuments.push({ id: newId, ...docData, status: 'Borrador', creationDate: new Date().toISOString().split('T')[0], lastModified: new Date().toISOString().split('T')[0], history: [{ version: '0.1', date: new Date().toISOString().split('T')[0], author: currentUser.name, comments: 'Creación inicial' }] });
      showSnackbar('Documento creado con éxito (simulado).', 'success');
    }
    setDialogOpen(false);
  };

  const handleDeleteDocument = (docId) => {
    // In a real app, this would involve API calls
    showSnackbar(`Documento ${docId} eliminado (simulado).`, 'info');
    // You'd typically filter simulatedDocuments state here
  };

  const handlePublishDocument = (docId) => {
    // In a real app, this would update the status to 'Publicado' and create a new version
    showSnackbar(`Documento ${docId} publicado (simulado).`, 'success');
  };

  // --- Diálogos Internos ---

  const DocumentFormDialog = () => {
    const [formData, setFormData] = useState(selectedDocument || {
      name: '', type: '', source: '', version: '1.0', owner: currentUser.name, downloadUrl: '', tags: '', access: 'Restringido', description: '',
    });

    const isViewMode = dialogType === 'viewDoc';

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTagChange = (e) => {
      setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()) });
    };

    const handleSubmit = () => {
      if (!formData.name || !formData.type || !formData.source || !formData.owner) {
        showSnackbar('Por favor, completa todos los campos obligatorios.', 'error');
        return;
      }
      handleSaveDocument(formData);
    };

    return (
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: '#004d40', color: '#fff' }}>
          {isViewMode ? 'Detalles del Documento' : (dialogType === 'newDoc' ? 'Crear Nuevo Documento' : 'Editar Documento')}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField label="Nombre del Documento" name="name" value={formData.name} onChange={handleChange} fullWidth required disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required disabled={isViewMode}>
                <InputLabel>Tipo de Documento</InputLabel>
                <Select label="Tipo de Documento" name="type" value={formData.type} onChange={handleChange}>
                  <MenuItem value=""><em>Seleccionar Tipo</em></MenuItem>
                  {documentTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required disabled={isViewMode}>
                <InputLabel>Fuente del Documento</InputLabel>
                <Select label="Fuente del Documento" name="source" value={formData.source} onChange={handleChange}>
                  <MenuItem value=""><em>Seleccionar Fuente</em></MenuItem>
                  {documentSources.map(source => <MenuItem key={source} value={source}>{source}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Versión Actual" name="version" value={formData.version} onChange={handleChange} fullWidth disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Propietario/Responsable" name="owner" value={formData.owner} onChange={handleChange} fullWidth required disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth disabled={isViewMode}>
                <InputLabel>Acceso</InputLabel>
                <Select label="Acceso" name="access" value={formData.access} onChange={handleChange}>
                  <MenuItem value="Restringido"><LockIcon sx={{verticalAlign: 'middle', mr:1}}/>Restringido</MenuItem>
                  <MenuItem value="Público"><LockOpenIcon sx={{verticalAlign: 'middle', mr:1}}/>Público</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Descripción/Resumen" name="description" value={formData.description} onChange={handleChange} fullWidth multiline rows={2} disabled={isViewMode} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Etiquetas (separadas por coma)"
                name="tags"
                value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags}
                onChange={handleTagChange}
                fullWidth
                disabled={isViewMode}
                helperText="Ej: MinTIC, Seguridad, Informe, 2025"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField label="URL de Descarga" name="downloadUrl" value={formData.downloadUrl} onChange={handleChange} fullWidth disabled={isViewMode} />
            </Grid>
            {!isViewMode && (
              <Grid item xs={12}>
                <Alert severity="info">
                  Adjunta el archivo real aquí (funcionalidad simulada).
                  <Button variant="outlined" size="small" startIcon={<CloudUploadIcon />} sx={{ml:2}}>Subir Archivo</Button>
                </Alert>
              </Grid>
            )}
            {isViewMode && selectedDocument?.history && (
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2, mb: 1, color: '#004d40' }}>Historial de Versiones</Typography>
                <List dense sx={{maxHeight: 200, overflow: 'auto', border: '1px solid #eee', borderRadius: 1}}>
                  {selectedDocument.history.map((hist, index) => (
                    <ListItem key={index} sx={{borderBottom: '1px dashed #f0f0f0'}}>
                      <ListItemText
                        primary={`Versión: ${hist.version} - ${hist.date}`}
                        secondary={`Autor: ${hist.author} - Comentarios: ${hist.comments}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            {isViewMode ? 'Cerrar' : 'Cancelar'}
          </Button>
          {!isViewMode && (
            <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#00bcd4', '&:hover': { bgcolor: '#0097a7' } }}>
              Guardar Documento
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  const getDialogComponent = () => {
    switch (dialogType) {
      case 'viewDoc':
      case 'newDoc':
      case 'editDoc':
        return <DocumentFormDialog />;
      default:
        return null;
    }
  };

  // Filtrar documentos por tipo o fuente para cada pestaña
  const getFilteredDocuments = (tab) => {
    switch (tab) {
      case 'mintic_reports':
        return simulatedDocuments.filter(doc => doc.source === 'Ministerio TIC' || doc.tags.includes('MinTIC'));
      case 'tech_reports':
        return simulatedDocuments.filter(doc => doc.type === 'Informe' && doc.source === 'Interno' || doc.type === 'Manual Operativo');
      case 'sap_docs':
        return simulatedDocuments.filter(doc => doc.source === 'SAP' || doc.tags.includes('SAP'));
      case 'legal_docs':
        return simulatedDocuments.filter(doc => doc.type === 'Contrato' || doc.source === 'Asesoría Legal' || doc.tags.includes('Legal'));
      default: // 'dashboard' o 'all_docs'
        return simulatedDocuments;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', minHeight: '100vh', color: '#333', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#004d40', borderBottom: '1px solid #00695c' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2, color: '#e0f2f7' }}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}
          <FolderSharedIcon sx={{ fontSize: 36, mr: 1, color: '#ffc107' }} /> {/* Amarillo para la gestión */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Panel de Gestión Documental
          </Typography>
          <Chip
            avatar={<Avatar src={currentUser.avatar} />}
            label={currentUser.name}
            sx={{ bgcolor: '#26a69a', color: '#ffffff', fontWeight: 600 }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#004d40' }}>
            Centralización y Control Documental
          </Typography>
          <Typography variant="h6" color="#616161">
            Optimiza la creación, almacenamiento y control de versiones de toda tu documentación empresarial.
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
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#004d40', // Verde oscuro
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                '&.Mui-selected': {
                  color: '#004d40', // Verde oscuro
                },
              },
            }}
          >
            <Tab label="Dashboard General" value="dashboard" icon={<DescriptionIcon />} iconPosition="start" />
            <Tab label="Reportes MinTIC" value="mintic_reports" icon={<AssessmentIcon />} iconPosition="start" />
            <Tab label="Informes de Tecnología" value="tech_reports" icon={<AssessmentIcon />} iconPosition="start" />
            <Tab label="Control de Versiones" value="version_control" icon={<HistoryIcon />} iconPosition="start" />
            <Tab label="Documentos SAP" value="sap_docs" icon={<MemoryIcon />} iconPosition="start" />
            <Tab label="Gestión Legal" value="legal_docs" icon={<GavelIcon />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Contenido de las Pestañas */}
        <Box sx={{ p: 0 }}>
          {/* Tab: Dashboard General (Todos los Documentos) */}
          {currentTab === 'dashboard' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <DescriptionIcon sx={{ color: '#004d40', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Resumen y Acceso Rápido a Documentos
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleCreateNewDocument} sx={{ textTransform: 'none', bgcolor: '#00bcd4', '&:hover': { bgcolor: '#0097a7' } }}>
                  Crear Nuevo Documento
                </Button>
                <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => showSnackbar('Datos actualizados', 'info')}>
                  Refrescar Datos
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="info" sx={{ mb: 3 }}>
                Este dashboard proporciona una visión general de toda la documentación gestionada.
              </Alert>

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#e0f2f7' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Nombre del Documento</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Tipo</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Fuente</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Versión</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Última Modificación</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {simulatedDocuments.length > 0 ? (
                      simulatedDocuments.map((doc) => {
                        let statusColor = 'default';
                        let statusIcon = null;
                        switch (doc.status) {
                          case 'Aprobado':
                            statusColor = 'success';
                            statusIcon = <CheckCircleIcon sx={{fontSize:'inherit'}}/>;
                            break;
                          case 'Borrador':
                            statusColor = 'warning';
                            statusIcon = <DescriptionIcon sx={{fontSize:'inherit'}}/>;
                            break;
                          case 'En Revisión':
                            statusColor = 'info';
                            statusIcon = <HistoryIcon sx={{fontSize:'inherit'}}/>;
                            break;
                          case 'Publicado':
                            statusColor = 'primary';
                            statusIcon = <PublishIcon sx={{fontSize:'inherit'}}/>;
                            break;
                          case 'Obsoleto':
                            statusColor = 'error';
                            statusIcon = <DeleteOutlineIcon sx={{fontSize:'inherit'}}/>;
                            break;
                          default:
                            break;
                        }

                        return (
                          <TableRow key={doc.id} hover>
                            <TableCell component="th" scope="row">
                              <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#333' }}>{doc.name}</Typography>
                              {doc.tags && doc.tags.length > 0 && (
                                <Box sx={{mt: 0.5}}>
                                  {doc.tags.map(tag => <Chip key={tag} label={tag} size="small" sx={{mr: 0.5, bgcolor: '#e0e0e0'}} />)}
                                </Box>
                              )}
                            </TableCell>
                            <TableCell>{doc.type}</TableCell>
                            <TableCell>{doc.source}</TableCell>
                            <TableCell>{doc.version}</TableCell>
                            <TableCell>
                              <Chip
                                label={doc.status}
                                color={statusColor}
                                size="small"
                                icon={statusIcon}
                              />
                            </TableCell>
                            <TableCell>{doc.lastModified}</TableCell>
                            <TableCell align="center">
                              {doc.downloadUrl && (
                                <Tooltip title="Descargar">
                                  <IconButton size="small" href={doc.downloadUrl} target="_blank"><DownloadIcon color="primary" /></IconButton>
                                </Tooltip>
                              )}
                              <Tooltip title="Ver Detalles">
                                <IconButton size="small" onClick={() => handleViewDocument(doc)}><VisibilityIcon color="action" /></IconButton>
                              </Tooltip>
                              <Tooltip title="Editar">
                                <IconButton size="small" onClick={() => handleEditDocument(doc)}><EditIcon color="action" /></IconButton>
                              </Tooltip>
                              {doc.status !== 'Publicado' && (
                                <Tooltip title="Publicar / Marcar como Final">
                                  <IconButton size="small" onClick={() => handlePublishDocument(doc.id)}><PublishIcon color="success" /></IconButton>
                                </Tooltip>
                              )}
                              <Tooltip title="Eliminar">
                                <IconButton size="small" onClick={() => handleDeleteDocument(doc.id)}><DeleteOutlineIcon color="error" /></IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow><TableCell colSpan={7} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No hay documentos en el sistema.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination count={Math.ceil(simulatedDocuments.length / 10)} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }} />
            </Paper>
          )}

          {/* Tab: Reportes MinTIC */}
          {currentTab === 'mintic_reports' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <AssessmentIcon sx={{ color: '#004d40', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Documentación para Reportes al Ministerio TIC
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleCreateNewDocument} sx={{ textTransform: 'none', bgcolor: '#00bcd4', '&:hover': { bgcolor: '#0097a7' } }}>
                  Generar Nuevo Reporte MinTIC
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="info" sx={{ mb: 3 }}>
                Aquí se encuentran los documentos y reportes específicos requeridos por el Ministerio TIC.
              </Alert>

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#e0f2f7' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Nombre del Reporte</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Versión</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Última Modificación</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getFilteredDocuments('mintic_reports').length > 0 ? (
                      getFilteredDocuments('mintic_reports').map((doc) => (
                        <TableRow key={doc.id} hover>
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#333' }}>{doc.name}</Typography>
                          </TableCell>
                          <TableCell>{doc.version}</TableCell>
                          <TableCell>
                            <Chip label={doc.status} color={doc.status === 'Publicado' ? 'primary' : 'warning'} size="small" />
                          </TableCell>
                          <TableCell>{doc.lastModified}</TableCell>
                          <TableCell align="center">
                            {doc.downloadUrl && (
                              <Tooltip title="Descargar">
                                <IconButton size="small" href={doc.downloadUrl} target="_blank"><DownloadIcon color="primary" /></IconButton>
                              </Tooltip>
                            )}
                            <Tooltip title="Ver Detalles">
                              <IconButton size="small" onClick={() => handleViewDocument(doc)}><VisibilityIcon color="action" /></IconButton>
                            </Tooltip>
                            <Tooltip title="Editar">
                              <IconButton size="small" onClick={() => handleEditDocument(doc)}><EditIcon color="action" /></IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={5} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No hay reportes MinTIC.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}

          {/* Tab: Informes de Tecnología */}
          {currentTab === 'tech_reports' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <AssessmentIcon sx={{ color: '#004d40', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Informes Técnicos y Documentación Operativa
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleCreateNewDocument} sx={{ textTransform: 'none', bgcolor: '#00bcd4', '&:hover': { bgcolor: '#0097a7' } }}>
                  Añadir Nuevo Informe/Manual
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="success" sx={{ mb: 3 }}>
                Accede a toda la documentación técnica y operativa de la empresa.
              </Alert>

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#e0f2f7' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Nombre</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Tipo</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Versión</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Propietario</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Última Modificación</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getFilteredDocuments('tech_reports').length > 0 ? (
                      getFilteredDocuments('tech_reports').map((doc) => (
                        <TableRow key={doc.id} hover>
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#333' }}>{doc.name}</Typography>
                          </TableCell>
                          <TableCell>{doc.type}</TableCell>
                          <TableCell>{doc.version}</TableCell>
                          <TableCell>{doc.owner}</TableCell>
                          <TableCell>{doc.lastModified}</TableCell>
                          <TableCell align="center">
                            {doc.downloadUrl && (
                              <Tooltip title="Descargar">
                                <IconButton size="small" href={doc.downloadUrl} target="_blank"><DownloadIcon color="primary" /></IconButton>
                              </Tooltip>
                            )}
                            <Tooltip title="Ver Detalles">
                              <IconButton size="small" onClick={() => handleViewDocument(doc)}><VisibilityIcon color="action" /></IconButton>
                            </Tooltip>
                            <Tooltip title="Editar">
                              <IconButton size="small" onClick={() => handleEditDocument(doc)}><EditIcon color="action" /></IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={6} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No hay informes de tecnología o manuales operativos.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}

          {/* Tab: Control de Versiones */}
          {currentTab === 'version_control' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <HistoryIcon sx={{ color: '#004d40', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Control de Versiones de Documentos Clave
                </Typography>
                <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => showSnackbar('Historial de versiones actualizado', 'info')}>
                  Refrescar Historial
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="warning" sx={{ mb: 3 }}>
                Mantén un registro detallado de todas las modificaciones y versiones de tus documentos.
              </Alert>

              {simulatedDocuments.filter(doc => doc.history && doc.history.length > 1).length > 0 ? (
                simulatedDocuments.filter(doc => doc.history && doc.history.length > 1).map((doc) => (
                  <Accordion key={doc.id} sx={{ mb: 1, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                    <AccordionSummary expandIcon={<KeyboardArrowDownIcon />} sx={{ bgcolor: '#e0f2f7', borderRadius: '2px 2px 0 0' }}>
                      <Typography variant="subtitle1" sx={{fontWeight: 600, color: '#004d40'}}>{doc.name} (Versión Actual: {doc.version})</Typography>
                      <Chip label={doc.type} size="small" sx={{ml: 2, bgcolor: '#cfd8dc'}}/>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        {doc.history.map((hist, index) => (
                          <ListItem key={index} sx={{ borderBottom: '1px dashed #f0f0f0' }}>
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 500, mr: 1 }}>Versión {hist.version}</Typography>
                                  <Chip label={hist.date} size="small" sx={{bgcolor: '#fff3e0'}} />
                                </Box>
                              }
                              secondary={`Autor: ${hist.author} - Comentarios: ${hist.comments}`}
                            />
                            <Tooltip title="Ver Versión (Simulado)">
                              <IconButton size="small" onClick={() => showSnackbar(`Abriendo versión ${hist.version} de ${doc.name}`, 'info')}><VisibilityIcon color="action"/></IconButton>
                            </Tooltip>
                            {/* Opciones adicionales como "Restaurar Versión" */}
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : (
                <Alert severity="info">No hay documentos con historial de versiones significativo.</Alert>
              )}
            </Paper>
          )}

          {/* Tab: Documentos SAP */}
          {currentTab === 'sap_docs' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <MemoryIcon sx={{ color: '#004d40', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Gestión Documental de Sistemas SAP
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleCreateNewDocument} sx={{ textTransform: 'none', bgcolor: '#00bcd4', '&:hover': { bgcolor: '#0097a7' } }}>
                  Añadir Documento SAP
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="info" sx={{ mb: 3 }}>
                Documentación específica para configuraciones, manuales, reportes y procesos de SAP.
              </Alert>

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#e0f2f7' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Nombre del Documento</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Tipo</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Módulo SAP</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Versión</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Última Modificación</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getFilteredDocuments('sap_docs').length > 0 ? (
                      getFilteredDocuments('sap_docs').map((doc) => (
                        <TableRow key={doc.id} hover>
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#333' }}>{doc.name}</Typography>
                          </TableCell>
                          <TableCell>{doc.type}</TableCell>
                          <TableCell>{doc.tags.includes('FI') ? 'FI' : (doc.tags.includes('HR') ? 'HR' : 'General')}</TableCell>
                          <TableCell>{doc.version}</TableCell>
                          <TableCell>{doc.lastModified}</TableCell>
                          <TableCell align="center">
                            {doc.downloadUrl && (
                              <Tooltip title="Descargar">
                                <IconButton size="small" href={doc.downloadUrl} target="_blank"><DownloadIcon color="primary" /></IconButton>
                              </Tooltip>
                            )}
                            <Tooltip title="Ver Detalles">
                              <IconButton size="small" onClick={() => handleViewDocument(doc)}><VisibilityIcon color="action" /></IconButton>
                            </Tooltip>
                            <Tooltip title="Editar">
                              <IconButton size="small" onClick={() => handleEditDocument(doc)}><EditIcon color="action" /></IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={6} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No hay documentos SAP.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}

          {/* Tab: Gestión Legal */}
          {currentTab === 'legal_docs' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <GavelIcon sx={{ color: '#004d40', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Gestión Documental Legal e Historial Legal
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleCreateNewDocument} sx={{ textTransform: 'none', bgcolor: '#00bcd4', '&:hover': { bgcolor: '#0097a7' } }}>
                  Añadir Documento Legal
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="warning" sx={{ mb: 3 }}>
                Centraliza contratos, acuerdos, políticas y todo el historial legal de la empresa.
              </Alert>

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#e0f2f7' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Nombre del Documento</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Tipo</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Fuente</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Fecha Creación</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getFilteredDocuments('legal_docs').length > 0 ? (
                      getFilteredDocuments('legal_docs').map((doc) => (
                        <TableRow key={doc.id} hover>
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#333' }}>{doc.name}</Typography>
                          </TableCell>
                          <TableCell>{doc.type}</TableCell>
                          <TableCell>{doc.source}</TableCell>
                          <TableCell>{doc.creationDate}</TableCell>
                          <TableCell>
                            <Chip label={doc.status} color={doc.status === 'Aprobado' ? 'success' : 'warning'} size="small" />
                          </TableCell>
                          <TableCell align="center">
                            {doc.downloadUrl && (
                              <Tooltip title="Descargar">
                                <IconButton size="small" href={doc.downloadUrl} target="_blank"><DownloadIcon color="primary" /></IconButton>
                              </Tooltip>
                            )}
                            <Tooltip title="Ver Detalles">
                              <IconButton size="small" onClick={() => handleViewDocument(doc)}><VisibilityIcon color="action" /></IconButton>
                            </Tooltip>
                            <Tooltip title="Editar">
                              <IconButton size="small" onClick={() => handleEditDocument(doc)}><EditIcon color="action" /></IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={6} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No hay documentos legales o historial legal.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
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

export default DocumentManagementPanel;