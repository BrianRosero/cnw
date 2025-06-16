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
  useMediaQuery,
  useTheme,
  Checkbox, FormControlLabel, FormGroup,
  ToggleButton, ToggleButtonGroup,
  Fab,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import LinkIcon from '@mui/icons-material/Link'; // Icono principal de Integración
import HelpdeskIcon from '@mui/icons-material/SupportAgent'; // Helpdesk
import BugReportIcon from '@mui/icons-material/BugReport'; // Jira
import BusinessIcon from '@mui/icons-material/Business'; // SAP
import LayersIcon from '@mui/icons-material/Layers'; // Service Layer
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode'; // APIs / Docs
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet'; // Mapeos
import WifiTetheringIcon from '@mui/icons-material/WifiTethering'; // Conectividad
import ScheduleIcon from '@mui/icons-material/Schedule'; // Sincronización
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate'; // Errores/Logs
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Añadir
import SearchIcon from '@mui/icons-material/Search'; // Buscar
import EditIcon from '@mui/icons-material/Edit'; // Editar
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Eliminar
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ver detalles
import RefreshIcon from '@mui/icons-material/Refresh'; // Refrescar
import SaveIcon from '@mui/icons-material/Save'; // Guardar
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Activo / Éxito
import CancelIcon from '@mui/icons-material/Cancel'; // Inactivo / Error
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'; // Flujo de Datos
import LockIcon from '@mui/icons-material/Lock'; // Credenciales
import DescriptionIcon from '@mui/icons-material/Description'; // Documentación
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'; // Descargar Logs
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Acordeón
import GetAppIcon from '@mui/icons-material/GetApp'; // Descargar
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; // Copiar

// --- Datos Simulados ---

const currentUser = {
  id: 'ITADMIN001',
  name: 'Bryan Rosero',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Bryan%20Rosero',
  role: 'Administrador de IT',
};

const integrationTypes = [
  { id: 'helpdesk', name: 'Helpdesk (Zendesk, Freshdesk, ServiceNow)', icon: <HelpdeskIcon /> },
  { id: 'jira', name: 'Jira (Software, Service Management)', icon: <BugReportIcon /> },
  { id: 'sap', name: 'SAP (ERP, S/4HANA)', icon: <BusinessIcon /> },
  { id: 'servicelayer', name: 'Service Layer (Custom APIs, Microservices)', icon: <LayersIcon /> },
  { id: 'crm', name: 'CRM (Salesforce, HubSpot)', icon: <BusinessIcon /> },
  { id: 'erp', name: 'ERP (Dynamics 365, Oracle EBS)', icon: <BusinessIcon /> },
  { id: 'marketing', name: 'Marketing Automation (Marketo, Pardot)', icon: <DeveloperModeIcon /> },
];

const simulatedIntegrations = [
  {
    id: 'INT001',
    name: 'Jira - Helpdesk Sync',
    type: 'jira',
    status: 'Activa', // Activa, Inactiva, Error, Pendiente
    description: 'Sincroniza tickets de Helpdesk con issues de Jira.',
    lastSync: '2025-06-12 10:30:00',
    health: 'Óptima', // Óptima, Advertencia, Crítica
    credentials: { type: 'API Key', value: '**********' },
    sourceSystem: 'Helpdesk (Freshdesk)',
    targetSystem: 'Jira Software',
    mapping: [
      { source: 'Ticket Title', target: 'Jira Summary', transform: 'none' },
      { source: 'Ticket Description', target: 'Jira Description', transform: 'markdown_to_jira' },
      { source: 'Status', target: 'Jira Status', transform: 'map_values' },
    ],
    syncRules: [
      { trigger: 'New Ticket in Helpdesk', action: 'Create Jira Issue' },
      { trigger: 'Jira Issue Status Change', action: 'Update Helpdesk Ticket Status' },
    ],
    logs: [
      { timestamp: '2025-06-12 10:29:50', level: 'INFO', message: 'Sincronización iniciada para 12 tickets.' },
      { timestamp: '2025-06-12 10:29:55', level: 'SUCCESS', message: 'Ticket #FS-00123 sincronizado con Jira Issue JR-456.' },
    ],
    documentationUrl: 'https://docs.example.com/jira-helpdesk-sync',
    apiEndpoint: 'https://api.integration.example.com/jira-helpdesk',
  },
  {
    id: 'INT002',
    name: 'SAP - Salesforce CRM Data Flow',
    type: 'sap',
    status: 'Activa',
    description: 'Flujo de datos de clientes y órdenes desde SAP a Salesforce.',
    lastSync: '2025-06-12 09:00:00',
    health: 'Óptima',
    credentials: { type: 'OAuth 2.0', value: '**********' },
    sourceSystem: 'SAP ERP (ECC)',
    targetSystem: 'Salesforce CRM',
    mapping: [
      { source: 'SAP Customer ID', target: 'SF Account ID', transform: 'none' },
      { source: 'SAP Order Value', target: 'SF Opportunity Amount', transform: 'currency_conversion' },
    ],
    syncRules: [
      { trigger: 'New Customer in SAP', action: 'Create Salesforce Account' },
      { trigger: 'Order Status Update in SAP', action: 'Update Salesforce Opportunity' },
    ],
    logs: [
      { timestamp: '2025-06-12 08:59:00', level: 'INFO', message: 'Exportación de datos de SAP iniciada.' },
      { timestamp: '2025-06-12 09:00:15', level: 'SUCCESS', message: '150 clientes y 500 órdenes procesadas.' },
    ],
    documentationUrl: 'https://docs.example.com/sap-salesforce-flow',
    apiEndpoint: 'https://api.integration.example.com/sap-sf',
  },
  {
    id: 'INT003',
    name: 'Service Layer - Webhook Notifications',
    type: 'servicelayer',
    status: 'Error',
    description: 'Envío de notificaciones vía webhook desde el Service Layer a sistemas externos.',
    lastSync: '2025-06-12 10:15:00',
    health: 'Crítica',
    credentials: { type: 'Basic Auth', value: '**********' },
    sourceSystem: 'Internal Service Layer',
    targetSystem: 'Various Webhooks',
    mapping: [], // Webhooks might not have explicit field mapping displayed here
    syncRules: [
      { trigger: 'New User Registration Event', action: 'Send Webhook to Marketing System' },
    ],
    logs: [
      { timestamp: '2025-06-12 10:14:58', level: 'ERROR', message: 'Failed to connect to webhook endpoint for Marketing. Timeout.' },
      { timestamp: '2025-06-12 10:15:05', level: 'WARNING', message: 'Webhook delivery retry #3 for user ID 12345.' },
    ],
    documentationUrl: 'https://docs.example.com/servicelayer-webhooks',
    apiEndpoint: 'https://api.internal.example.com/events',
  },
];

// Helper para copiar al portapapeles
const copyToClipboard = async (text, showSnackbar) => {
  try {
    await navigator.clipboard.writeText(text);
    showSnackbar('Copiado al portapapeles', 'success');
  } catch (err) {
    showSnackbar('Error al copiar', 'error');
  }
};

// Componente principal
function CorporateIntegrationPanel({ onGoToHome }) {
  const [currentTab, setCurrentTab] = useState('integration_list'); // 'integration_list', 'integration_detail'
  const [selectedIntegration, setSelectedIntegration] = useState(null); // The integration being viewed/edited
  const [detailSubTab, setDetailSubTab] = useState('overview'); // 'overview', 'connectivity', 'mapping', 'sync_rules', 'logs', 'api_docs'

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'newIntegration', 'editIntegration'
  const [formData, setFormData] = useState({}); // For integration creation/editing

  const showSnackbar = useCallback((message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Handler para ver/editar una integración
  const handleViewIntegration = (integration) => {
    setSelectedIntegration(integration);
    setCurrentTab('integration_detail');
    setDetailSubTab('overview'); // Reset to overview tab
  };

  const handleNewIntegration = () => {
    setFormData({
      name: '',
      type: '',
      status: 'Inactiva',
      description: '',
      credentials: { type: '', value: '' },
      sourceSystem: '',
      targetSystem: '',
      mapping: [],
      syncRules: [],
      documentationUrl: '',
      apiEndpoint: '',
    });
    setDialogType('newIntegration');
    setDialogOpen(true);
  };

  const handleEditIntegration = (integration) => {
    setFormData(integration);
    setDialogType('editIntegration');
    setDialogOpen(true);
  };


  const handleSaveIntegration = (integrationData) => {
    if (dialogType === 'newIntegration') {
      const newId = `INT${String(simulatedIntegrations.length + 1).padStart(3, '0')}`;
      const newIntegration = { ...integrationData, id: newId, lastSync: 'N/A', health: 'Desconocida', logs: [] };
      simulatedIntegrations.push(newIntegration); // In a real app, update state
      showSnackbar('Integración creada con éxito (simulado).', 'success');
    } else if (dialogType === 'editIntegration') {
      // In a real app, find and update the integration in state/DB
      showSnackbar('Integración actualizada (simulado).', 'success');
    }
    setDialogOpen(false);
    // Refresh the list/detail view
    setSelectedIntegration(prev => (prev && prev.id === integrationData.id ? { ...prev, ...integrationData } : prev));
  };


  const IntegrationFormDialog = () => {
    const isNew = dialogType === 'newIntegration';

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name.startsWith('credentials.')) {
        const credentialKey = name.split('.')[1];
        setFormData(prev => ({
          ...prev,
          credentials: {
            ...prev.credentials,
            [credentialKey]: value
          }
        }));
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };

    const handleSubmit = () => {
      if (!formData.name || !formData.type || !formData.sourceSystem || !formData.targetSystem) {
        showSnackbar('Nombre, Tipo y Sistemas Origen/Destino son obligatorios.', 'error');
        return;
      }
      handleSaveIntegration(formData);
    };

    return (
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: '#3f51b5', color: '#fff' }}>
          {isNew ? 'Añadir Nueva Integración' : 'Editar Integración'}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField label="Nombre de la Integración" name="name" value={formData.name || ''} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Tipo de Sistema Principal</InputLabel>
                <Select label="Tipo de Sistema Principal" name="type" value={formData.type || ''} onChange={handleChange}>
                  {integrationTypes.map(type => (
                    <MenuItem key={type.id} value={type.id}>
                      <Box display="flex" alignItems="center">
                        {type.icon && React.cloneElement(type.icon, { sx: { mr: 1 } })}
                        {type.name}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Sistema Origen" name="sourceSystem" value={formData.sourceSystem || ''} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Sistema Destino" name="targetSystem" value={formData.targetSystem || ''} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Estado Inicial</InputLabel>
                <Select label="Estado Inicial" name="status" value={formData.status || 'Inactiva'} onChange={handleChange}>
                  <MenuItem value="Activa">Activa</MenuItem>
                  <MenuItem value="Inactiva">Inactiva</MenuItem>
                  <MenuItem value="Pendiente">Pendiente</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Descripción Breve" name="description" value={formData.description || ''} onChange={handleChange} fullWidth multiline rows={2} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{mt:2, color: '#333'}}>Credenciales de Conexión</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Credencial</InputLabel>
                <Select label="Tipo de Credencial" name="credentials.type" value={formData.credentials?.type || ''} onChange={handleChange}>
                  <MenuItem value="API Key">API Key</MenuItem>
                  <MenuItem value="OAuth 2.0">OAuth 2.0</MenuItem>
                  <MenuItem value="Basic Auth">Basic Auth</MenuItem>
                  <MenuItem value="Token">Token</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Valor de Credencial (Oculto)" name="credentials.value" type="password" value={formData.credentials?.value || ''} onChange={handleChange} fullWidth helperText="Las credenciales sensibles no deben ser mostradas directamente en un entorno real." />
            </Grid>
            <Grid item xs={12}>
              <Alert severity="warning">
                **Importante:** En un sistema real, las credenciales no deben ser editables o visibles de esta manera. Se usarían bóvedas de secretos o gestores de claves seguros.
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <TextField label="URL de Documentación" name="documentationUrl" value={formData.documentationUrl || ''} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Endpoint de la API / Webhook" name="apiEndpoint" value={formData.apiEndpoint || ''} onChange={handleChange} fullWidth />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit} startIcon={<SaveIcon />} sx={{ bgcolor: '#42a5f5', '&:hover': { bgcolor: '#2196f3' } }}>
            {isNew ? 'Añadir Integración' : 'Guardar Cambios'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };


  const IntegrationDetailPanel = () => {
    if (!selectedIntegration) {
      return (
        <Alert severity="error">Seleccione una integración para ver los detalles.</Alert>
      );
    }

    // Funciones para manejar cambios en los campos de mapeo/reglas de sincronización
    const handleMappingChange = (index, field, value) => {
      const updatedMapping = [...selectedIntegration.mapping];
      updatedMapping[index][field] = value;
      setSelectedIntegration(prev => ({ ...prev, mapping: updatedMapping }));
    };

    const handleAddMapping = () => {
      setSelectedIntegration(prev => ({ ...prev, mapping: [...prev.mapping, { source: '', target: '', transform: '' }] }));
    };

    const handleRemoveMapping = (index) => {
      const updatedMapping = selectedIntegration.mapping.filter((_, i) => i !== index);
      setSelectedIntegration(prev => ({ ...prev, mapping: updatedMapping }));
    };

    const handleSyncRuleChange = (index, field, value) => {
      const updatedRules = [...selectedIntegration.syncRules];
      updatedRules[index][field] = value;
      setSelectedIntegration(prev => ({ ...prev, syncRules: updatedRules }));
    };

    const handleAddSyncRule = () => {
      setSelectedIntegration(prev => ({ ...prev, syncRules: [...prev.syncRules, { trigger: '', action: '' }] }));
    };

    const handleRemoveSyncRule = (index) => {
      const updatedRules = selectedIntegration.syncRules.filter((_, i) => i !== index);
      setSelectedIntegration(prev => ({ ...prev, syncRules: updatedRules }));
    };


    const getStatusChip = (status) => {
      let color = 'default';
      let icon = null;
      switch (status) {
        case 'Activa':
          color = 'success';
          icon = <CheckCircleIcon sx={{ fontSize: 'inherit' }} />;
          break;
        case 'Inactiva':
          color = 'error';
          icon = <CancelIcon sx={{ fontSize: 'inherit' }} />;
          break;
        case 'Error':
          color = 'warning'; // Using warning for error for visual distinction
          icon = <AssignmentLateIcon sx={{ fontSize: 'inherit' }} />;
          break;
        case 'Pendiente':
          color = 'info';
          icon = <ScheduleIcon sx={{ fontSize: 'inherit' }} />;
          break;
        default:
          break;
      }
      return <Chip label={status} color={color} size="small" icon={icon} sx={{ ml: 1 }} />;
    };

    const getHealthChip = (health) => {
      let color = 'default';
      let icon = null;
      switch (health) {
        case 'Óptima':
          color = 'success';
          icon = <CheckCircleIcon sx={{ fontSize: 'inherit' }} />;
          break;
        case 'Advertencia':
          color = 'warning';
          icon = <WarningIcon sx={{ fontSize: 'inherit' }} />;
          break;
        case 'Crítica':
          color = 'error';
          icon = <CancelIcon sx={{ fontSize: 'inherit' }} />;
          break;
        case 'Desconocida':
          color = 'info';
          icon = <HelpdeskIcon sx={{ fontSize: 'inherit' }} />;
          break;
        default:
          break;
      }
      return <Chip label={health} color={color} size="small" icon={icon} sx={{ ml: 1 }} />;
    };

    return (
      <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
        <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
          <LinkIcon sx={{ color: '#3f51b5', fontSize: 30, mr: 1 }} />
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
            Detalles de Integración: {selectedIntegration.name}
          </Typography>
          <Button variant="outlined" onClick={() => setCurrentTab('integration_list')} startIcon={<LinkIcon />}>
            Volver a Lista de Integraciones
          </Button>
          <Button variant="contained" startIcon={<SaveIcon />}
                  onClick={() => showSnackbar('Cambios guardados para esta integración (simulado).', 'success')}
                  sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}>
            Guardar Cambios
          </Button>
        </Box>
        <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

        <Alert severity="info" sx={{ mb: 3 }}>
          Configura y monitorea los aspectos técnicos y funcionales de la integración.
        </Alert>

        {/* Sub-pestañas de Detalles de Integración */}
        <Tabs
          value={detailSubTab}
          onChange={(e, newValue) => setDetailSubTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
          sx={{ mb: 3, borderBottom: '1px solid #e0e0e0' }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Visión General" value="overview" icon={<VisibilityIcon />} iconPosition="start" />
          <Tab label="Conectividad y Credenciales" value="connectivity" icon={<WifiTetheringIcon />} iconPosition="start" />
          <Tab label="Mapeo de Campos" value="mapping" icon={<SettingsEthernetIcon />} iconPosition="start" />
          <Tab label="Reglas de Sincronización" value="sync_rules" icon={<ScheduleIcon />} iconPosition="start" />
          <Tab label="Registros y Errores" value="logs" icon={<AssignmentLateIcon />} iconPosition="start" />
          <Tab label="APIs y Documentación" value="api_docs" icon={<DeveloperModeIcon />} iconPosition="start" />
        </Tabs>

        {/* Contenido de Sub-pestañas */}
        {detailSubTab === 'overview' && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card elevation={2} sx={{p:2, bgcolor: '#e8eaf6', borderRadius: 2}}>
                <CardHeader
                  title="Información General"
                  titleTypographyProps={{variant: 'h6', color: '#3f51b5'}}
                  avatar={<LinkIcon sx={{color: '#3f51b5'}} />}
                />
                <CardContent>
                  <Typography variant="body1" sx={{mb:1}}><Typography component="span" fontWeight="bold">ID:</Typography> {selectedIntegration.id}</Typography>
                  <Typography variant="body1" sx={{mb:1}}><Typography component="span" fontWeight="bold">Nombre:</Typography> {selectedIntegration.name}</Typography>
                  <Typography variant="body1" sx={{mb:1}}><Typography component="span" fontWeight="bold">Descripción:</Typography> {selectedIntegration.description}</Typography>
                  <Typography variant="body1" sx={{mb:1}}><Typography component="span" fontWeight="bold">Tipo:</Typography> {integrationTypes.find(t => t.id === selectedIntegration.type)?.name || selectedIntegration.type}</Typography>
                  <Typography variant="body1" sx={{mb:1}}><Typography component="span" fontWeight="bold">Sistema Origen:</Typography> {selectedIntegration.sourceSystem}</Typography>
                  <Typography variant="body1" sx={{mb:1}}><Typography component="span" fontWeight="bold">Sistema Destino:</Typography> {selectedIntegration.targetSystem}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card elevation={2} sx={{p:2, bgcolor: '#e8eaf6', borderRadius: 2}}>
                <CardHeader
                  title="Estado y Salud"
                  titleTypographyProps={{variant: 'h6', color: '#3f51b5'}}
                  avatar={<WifiTetheringIcon sx={{color: '#3f51b5'}} />}
                />
                <CardContent>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Typography variant="body1" fontWeight="bold">Estado:</Typography> {getStatusChip(selectedIntegration.status)}
                    <Tooltip title="Activar/Desactivar Integración">
                      <IconButton size="small" sx={{ml:2}} onClick={() => showSnackbar(`Integración ${selectedIntegration.name} ${selectedIntegration.status === 'Activa' ? 'desactivada' : 'activada'} (simulado).`, 'info')}>
                        {selectedIntegration.status === 'Activa' ? <CancelIcon color="error"/> : <CheckCircleIcon color="success"/>}
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Typography variant="body1" fontWeight="bold">Salud:</Typography> {getHealthChip(selectedIntegration.health)}
                  </Box>
                  <Typography variant="body1" sx={{mb:1}}><Typography component="span" fontWeight="bold">Última Sincronización:</Typography> {selectedIntegration.lastSync}</Typography>
                  <Button variant="outlined" startIcon={<RefreshIcon />} sx={{mt:2}} onClick={() => showSnackbar('Ejecutando chequeo de salud (simulado).', 'info')}>
                    Chequear Salud Ahora
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Alert severity="success">
                Resumen del estado actual y la información fundamental de la integración.
              </Alert>
            </Grid>
          </Grid>
        )}

        {detailSubTab === 'connectivity' && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>Detalles de Conexión</Typography>
              <TextField
                label="Sistema Origen"
                value={selectedIntegration.sourceSystem}
                fullWidth
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Sistema Destino"
                value={selectedIntegration.targetSystem}
                fullWidth
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Endpoint de la API / Webhook"
                value={selectedIntegration.apiEndpoint}
                onChange={(e) => setSelectedIntegration(prev => ({ ...prev, apiEndpoint: e.target.value }))}
                fullWidth
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Probar Conexión">
                        <IconButton onClick={() => showSnackbar('Probando conexión... (simulado)', 'info')}><WifiTetheringIcon color="primary" /></IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>Credenciales de Autenticación</Typography>
              <TextField
                label="Tipo de Credencial"
                value={selectedIntegration.credentials.type || 'N/A'}
                fullWidth
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Valor de Credencial (Oculto)"
                type="password"
                value={selectedIntegration.credentials.value || 'N/A'}
                fullWidth
                InputProps={{ readOnly: true, endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Editar Credenciales (Simulado)">
                        <IconButton onClick={() => showSnackbar('Función de edición de credenciales segura (simulado).', 'warning')}>
                          <LockIcon color="action" />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ) }}
                helperText="Las credenciales no se muestran directamente. Use un proceso seguro para actualizar."
              />
            </Grid>
            <Grid item xs={12}>
              <Alert severity="warning">
                **Advertencia:** La gestión de credenciales debe ser extremadamente segura. Esta interfaz es solo representativa.
              </Alert>
            </Grid>
          </Grid>
        )}

        {detailSubTab === 'mapping' && (
          <Box>
            <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>Mapeo de Campos</Typography>
            <Alert severity="info" sx={{mb: 2}}>
              Define cómo los campos de datos se transforman entre el sistema de origen y el de destino.
            </Alert>
            <TableContainer component={Paper} elevation={1} sx={{ border: '1px solid #e0e0e0', borderRadius: 2, bgcolor: '#f5f5f5' }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#c5cae9' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Campo Origen</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Transformación</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Campo Destino</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedIntegration.mapping.length === 0 && (
                    <TableRow><TableCell colSpan={4} sx={{textAlign: 'center', py:2, color: 'text.secondary'}}>No hay mapeos definidos.</TableCell></TableRow>
                  )}
                  {selectedIntegration.mapping.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <TextField
                          value={item.source}
                          onChange={(e) => handleMappingChange(index, 'source', e.target.value)}
                          fullWidth
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={item.transform}
                          onChange={(e) => handleMappingChange(index, 'transform', e.target.value)}
                          fullWidth
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={item.target}
                          onChange={(e) => handleMappingChange(index, 'target', e.target.value)}
                          fullWidth
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Eliminar Mapeo">
                          <IconButton color="error" size="small" onClick={() => handleRemoveMapping(index)}><DeleteOutlineIcon /></IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddMapping}
              sx={{ mt: 2, bgcolor: '#e8eaf6', '&:hover': { bgcolor: '#c5cae9' } }}
            >
              Añadir Mapeo
            </Button>
          </Box>
        )}

        {detailSubTab === 'sync_rules' && (
          <Box>
            <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>Reglas de Sincronización y Disparadores</Typography>
            <Alert severity="success" sx={{mb: 2}}>
              Configura los eventos que disparan la sincronización de datos y las acciones resultantes.
            </Alert>
            <TableContainer component={Paper} elevation={1} sx={{ border: '1px solid #e0e0e0', borderRadius: 2, bgcolor: '#f5f5f5' }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#c5cae9' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Disparador (Trigger)</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Acción</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedIntegration.syncRules.length === 0 && (
                    <TableRow><TableCell colSpan={3} sx={{textAlign: 'center', py:2, color: 'text.secondary'}}>No hay reglas de sincronización definidas.</TableCell></TableRow>
                  )}
                  {selectedIntegration.syncRules.map((rule, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <TextField
                          value={rule.trigger}
                          onChange={(e) => handleSyncRuleChange(index, 'trigger', e.target.value)}
                          fullWidth
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={rule.action}
                          onChange={(e) => handleSyncRuleChange(index, 'action', e.target.value)}
                          fullWidth
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Eliminar Regla">
                          <IconButton color="error" size="small" onClick={() => handleRemoveSyncRule(index)}><DeleteOutlineIcon /></IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddSyncRule}
              sx={{ mt: 2, bgcolor: '#e8eaf6', '&:hover': { bgcolor: '#c5cae9' } }}
            >
              Añadir Regla de Sincronización
            </Button>
          </Box>
        )}

        {detailSubTab === 'logs' && (
          <Box>
            <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>Registros de Actividad y Errores</Typography>
            <Alert severity="warning" sx={{mb: 2}}>
              Revisa los logs para diagnosticar problemas y monitorear la actividad de la integración.
            </Alert>
            <List sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 2, bgcolor: '#f5f5f5', maxHeight: 400, overflowY: 'auto' }}>
              {selectedIntegration.logs.length === 0 && (
                <ListItem><ListItemText secondary="No hay registros disponibles para esta integración." /></ListItem>
              )}
              {selectedIntegration.logs.map((log, index) => (
                <ListItem key={index} sx={{ bgcolor: '#ffffff', mb: 1, borderRadius: 1, boxShadow: 1, borderLeft: `4px solid ${log.level === 'ERROR' ? theme.palette.error.main : (log.level === 'WARNING' ? theme.palette.warning.main : theme.palette.success.main)}` }}>
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{log.message}</Typography>
                        <Chip label={log.level} size="small" color={log.level === 'ERROR' ? 'error' : (log.level === 'WARNING' ? 'warning' : 'success')} />
                      </Box>
                    }
                    secondary={<Typography variant="caption" color="text.secondary">{log.timestamp}</Typography>}
                  />
                </ListItem>
              ))}
            </List>
            <Box sx={{mt:2, display: 'flex', gap:2}}>
              <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => showSnackbar('Cargando últimos logs (simulado).', 'info')}>
                Cargar Últimos Logs
              </Button>
              <Button variant="outlined" startIcon={<GetAppIcon />} onClick={() => showSnackbar('Descargando logs completos (simulado).', 'info')}>
                Descargar Todos los Logs
              </Button>
            </Box>
          </Box>
        )}

        {detailSubTab === 'api_docs' && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>Recursos de Desarrollo y Documentación</Typography>
              <TextField
                label="URL de Documentación Oficial"
                value={selectedIntegration.documentationUrl}
                fullWidth
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Abrir Documentación">
                        <IconButton href={selectedIntegration.documentationUrl} target="_blank" disabled={!selectedIntegration.documentationUrl}><DescriptionIcon color="primary" /></IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Endpoint Principal de la API / Webhook"
                value={selectedIntegration.apiEndpoint}
                fullWidth
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Copiar Endpoint">
                        <IconButton onClick={() => copyToClipboard(selectedIntegration.apiEndpoint, showSnackbar)}><ContentCopyIcon color="action" /></IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Alert severity="info">
                Acceso rápido a la documentación y endpoints de la API para desarrolladores.
              </Alert>
            </Grid>
          </Grid>
        )}
      </Paper>
    );
  };


  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#e8eaf6', minHeight: '100vh', color: '#333', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#3f51b5', borderBottom: '1px solid #303f9f' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2, color: '#e8eaf6' }}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}
          <LinkIcon sx={{ fontSize: 36, mr: 1, color: '#ff9800' }} /> {/* Naranja para la integración */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Panel de Integración de Sistemas Corporativos
          </Typography>
          <Chip
            avatar={<Avatar src={currentUser.avatar} />}
            label={currentUser.name}
            sx={{ bgcolor: '#90caf9', color: '#1a237e', fontWeight: 600 }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#3f51b5' }}>
            Conecta y Sincroniza tus Herramientas Empresariales
          </Typography>
          <Typography variant="h6" color="#616161">
            Gestión centralizada del flujo de datos entre sistemas corporativos.
          </Typography>
        </Box>

        {/* Pestañas de Navegación Principal: Lista vs Detalle */}
        <Paper elevation={2} sx={{ mb: 4, bgcolor: '#ffffff', borderRadius: 2 }}>
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => { setCurrentTab(newValue); if (newValue === 'integration_list') setSelectedIntegration(null); }}
            indicatorColor="primary"
            textColor="primary"
            centered
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#3f51b5', // Azul acero
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                '&.Mui-selected': {
                  color: '#3f51b5', // Azul acero
                },
              },
            }}
          >
            <Tab label="Lista de Integraciones" value="integration_list" icon={<LinkIcon />} iconPosition="start" />
            <Tab label="Detalle de Integración" value="integration_detail" icon={<WifiTetheringIcon />} iconPosition="start" disabled={!selectedIntegration} />
          </Tabs>
        </Paper>

        {/* Contenido de las Pestañas */}
        <Box sx={{ p: 0 }}>
          {/* Tab: Lista de Integraciones */}
          {currentTab === 'integration_list' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <LinkIcon sx={{ color: '#3f51b5', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Gestión de Integraciones Activas
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleNewIntegration} sx={{ textTransform: 'none', bgcolor: '#42a5f5', '&:hover': { bgcolor: '#2196f3' } }}>
                  Añadir Nueva Integración
                </Button>
                <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => showSnackbar('Lista de integraciones actualizada', 'info')}>
                  Refrescar Lista
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="info" sx={{ mb: 3 }}>
                Monitorea el estado y la configuración de todas tus integraciones de sistemas.
              </Alert>

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#c5cae9' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Nombre de la Integración</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Tipo</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Origen / Destino</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Salud</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Última Sincronización</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {simulatedIntegrations.length > 0 ? (
                      simulatedIntegrations.map((integration) => {
                        let statusColor = 'default';
                        let statusIcon = null;
                        switch (integration.status) {
                          case 'Activa':
                            statusColor = 'success';
                            statusIcon = <CheckCircleIcon sx={{fontSize:'inherit'}}/>;
                            break;
                          case 'Inactiva':
                            statusColor = 'error';
                            statusIcon = <CancelIcon sx={{fontSize:'inherit'}}/>;
                            break;
                          case 'Error':
                            statusColor = 'warning'; // Visual distinction for error
                            statusIcon = <AssignmentLateIcon sx={{fontSize:'inherit'}}/>;
                            break;
                          case 'Pendiente':
                            statusColor = 'info';
                            statusIcon = <ScheduleIcon sx={{fontSize:'inherit'}}/>;
                            break;
                          default:
                            break;
                        }

                        let healthColor = 'default';
                        let healthIcon = null;
                        switch (integration.health) {
                          case 'Óptima':
                            healthColor = 'success';
                            healthIcon = <CheckCircleIcon sx={{fontSize:'inherit'}}/>;
                            break;
                          case 'Advertencia':
                            healthColor = 'warning';
                            healthIcon = <WarningIcon sx={{fontSize:'inherit'}}/>;
                            break;
                          case 'Crítica':
                            healthColor = 'error';
                            healthIcon = <CancelIcon sx={{fontSize:'inherit'}}/>;
                            break;
                          case 'Desconocida':
                            healthColor = 'info';
                            healthIcon = <HelpdeskIcon sx={{fontSize:'inherit'}}/>;
                            break;
                          default:
                            break;
                        }

                        const integrationType = integrationTypes.find(t => t.id === integration.type);

                        return (
                          <TableRow key={integration.id} hover>
                            <TableCell component="th" scope="row">
                              <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#333' }}>{integration.name}</Typography>
                              <Typography variant="caption" color="text.secondary">{integration.id}</Typography>
                            </TableCell>
                            <TableCell>
                              <Box display="flex" alignItems="center">
                                {integrationType?.icon && React.cloneElement(integrationType.icon, { sx: { mr: 0.5, fontSize: '1.2rem' } })}
                                {integrationType?.name || integration.type}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box display="flex" alignItems="center">
                                {integration.sourceSystem} <SwapHorizIcon sx={{mx:0.5}}/> {integration.targetSystem}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={integration.status}
                                color={statusColor}
                                size="small"
                                icon={statusIcon}
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={integration.health}
                                color={healthColor}
                                size="small"
                                icon={healthIcon}
                              />
                            </TableCell>
                            <TableCell>{integration.lastSync}</TableCell>
                            <TableCell align="center">
                              <Tooltip title="Ver Detalles y Configurar">
                                <IconButton size="small" onClick={() => handleViewIntegration(integration)}><VisibilityIcon color="primary" /></IconButton>
                              </Tooltip>
                              <Tooltip title="Editar Info Básica">
                                <IconButton size="small" onClick={() => handleEditIntegration(integration)}><EditIcon color="action" /></IconButton>
                              </Tooltip>
                              <Tooltip title="Eliminar Integración">
                                <IconButton size="small" onClick={() => showSnackbar(`Integración ${integration.name} eliminada (simulado).`, 'info')}><DeleteOutlineIcon color="error" /></IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow><TableCell colSpan={7} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No hay integraciones registradas.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination count={Math.ceil(simulatedIntegrations.length / 10)} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }} />
            </Paper>
          )}

          {/* Tab: Detalle de Integración */}
          {currentTab === 'integration_detail' && (
            <IntegrationDetailPanel />
          )}
        </Box>
      </Container>

      {/* Renderizar el Dialogo Dinámicamente */}
      {dialogOpen && <IntegrationFormDialog />}

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

export default CorporateIntegrationPanel;