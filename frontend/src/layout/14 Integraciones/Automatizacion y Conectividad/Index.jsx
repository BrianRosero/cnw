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
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'; // Icono principal de Automatización
import ApiIcon from '@mui/icons-material/Api'; // API Management
import HandshakeIcon from '@mui/icons-material/Handshake'; // Workflow Automation
import WebhookIcon from '@mui/icons-material/Webhook'; // Webhooks
import KeyIcon from '@mui/icons-material/Key'; // API Keys / Security
import SpeedIcon from '@mui/icons-material/Speed'; // Rate Limiting
import TimelineIcon from '@mui/icons-material/Timeline'; // Workflow Steps / History
import EventIcon from '@mui/icons-material/Event'; // Webhook Events
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // Run / Activate
import PauseIcon from '@mui/icons-material/Pause'; // Pause / Deactivate
import StopIcon from '@mui/icons-material/Stop'; // Stop / Error
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Añadir
import SearchIcon from '@mui/icons-material/Search'; // Buscar
import EditIcon from '@mui/icons-material/Edit'; // Editar
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Eliminar
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ver detalles
import RefreshIcon from '@mui/icons-material/Refresh'; // Refrescar
import SaveIcon from '@mui/icons-material/Save'; // Guardar
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Activo / Éxito
import CancelIcon from '@mui/icons-material/Cancel'; // Inactivo / Error
import WarningIcon from '@mui/icons-material/Warning'; // Advertencia
import InfoIcon from '@mui/icons-material/Info'; // Información
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'; // Descargar Logs
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; // Copiar
import LinkIcon from '@mui/icons-material/Link'; // Conectividad
import BuildIcon from '@mui/icons-material/Build'; // Builder
import CodeIcon from '@mui/icons-material/Code'; // Payload
import GetAppIcon from '@mui/icons-material/GetApp'; // Download
import DnsIcon from '@mui/icons-material/Dns'; // Endpoint
import PolicyIcon from '@mui/icons-material/Policy'; // CORS
import StorageIcon from '@mui/icons-material/Storage'; // Caching
import DescriptionIcon from '@mui/icons-material/Description'; // Docs
import ScheduleIcon from '@mui/icons-material/Schedule'; // History

// --- Datos Simulados ---

const currentUser = {
  id: 'DEV001',
  name: 'Bryan Rosero',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Bryan%20Rosero',
  role: 'Ingeniera de Automatización',
};

const apiTypes = [
  { id: 'rest', name: 'REST API', icon: <ApiIcon /> },
  { id: 'graphql', name: 'GraphQL API', icon: <CodeIcon /> },
  { id: 'soap', name: 'SOAP API', icon: <BuildIcon /> },
];

const workflowTriggers = [
  { id: 'schedule', name: 'Programado (Scheduler)' },
  { id: 'webhook', name: 'Evento de Webhook' },
  { id: 'api_call', name: 'Llamada a API' },
  { id: 'manual', name: 'Manual' },
];

const webhookEventTypes = [
  { id: 'new_user', name: 'Nuevo Usuario Creado' },
  { id: 'order_update', name: 'Actualización de Pedido' },
  { id: 'data_change', name: 'Cambio en Datos' },
  { id: 'ticket_closed', name: 'Ticket de Soporte Cerrado' },
];


const simulatedAPIs = [
  {
    id: 'API001',
    name: 'User Management API',
    type: 'rest',
    status: 'Activa', // Activa, Inactiva, Deprecada
    description: 'API para gestionar usuarios y roles de la plataforma.',
    endpoint: '/api/v1/users',
    auth: 'OAuth 2.0',
    rateLimit: '100 req/min',
    corsEnabled: true,
    version: '1.0.0',
    lastUpdated: '2025-06-10',
    documentationUrl: 'https://docs.example.com/api/users',
    apiKeyMgmt: [
      { key: 'abcdef12345', status: 'Active', generatedBy: 'Admin', createdAt: '2024-01-15' },
      { key: 'ghijkl67890', status: 'Revoked', generatedBy: 'System', createdAt: '2024-03-20' },
    ],
    analytics: {
      totalCalls: 125000,
      errors: 120,
      avgLatencyMs: 85,
    }
  },
  {
    id: 'API002',
    name: 'Product Catalog API',
    type: 'graphql',
    status: 'Activa',
    description: 'API para consultar y actualizar el catálogo de productos.',
    endpoint: '/graphql',
    auth: 'API Key',
    rateLimit: '50 req/min',
    corsEnabled: false,
    version: '2.1.0',
    lastUpdated: '2025-05-28',
    documentationUrl: 'https://docs.example.com/api/products-graphql',
    apiKeyMgmt: [
      { key: 'qwertz98765', status: 'Active', generatedBy: 'Marketing', createdAt: '2024-02-01' },
    ],
    analytics: {
      totalCalls: 80000,
      errors: 50,
      avgLatencyMs: 150,
    }
  },
];

const simulatedWorkflows = [
  {
    id: 'WF001',
    name: 'Notificación de Nuevo Registro',
    status: 'Activo', // Activo, Inactivo, Error
    description: 'Envía un email de bienvenida y notifica a Slack cuando un nuevo usuario se registra.',
    trigger: { type: 'webhook', config: 'webhook_user_registered' },
    steps: [
      { order: 1, type: 'action', name: 'Enviar Email de Bienvenida', config: { template: 'welcome_email' } },
      { order: 2, type: 'action', name: 'Enviar Notificación a Slack', config: { channel: '#new-users' } },
    ],
    errorHandling: 'Reintentar 3 veces, luego notificar al admin.',
    lastRun: '2025-06-12 10:30:00',
    runHistory: [
      { timestamp: '2025-06-12 10:30:00', status: 'Success', details: 'Usuario ID 12345 procesado.' },
      { timestamp: '2025-06-12 10:25:00', status: 'Failed', details: 'Error al enviar email para usuario ID 12344.' },
    ],
  },
  {
    id: 'WF002',
    name: 'Sincronización Diaria de Datos',
    status: 'Activo',
    description: 'Extrae datos de ventas de ERP y los carga en el Data Warehouse.',
    trigger: { type: 'schedule', config: 'daily_0200_UTC' },
    steps: [
      { order: 1, type: 'action', name: 'Extraer Datos de ERP', config: { system: 'SAP', type: 'sales' } },
      { order: 2, type: 'action', name: 'Transformar Datos', config: { script: 'transform_sales_data.py' } },
      { order: 3, type: 'action', name: 'Cargar a Data Warehouse', config: { destination: 'Snowflake' } },
    ],
    errorHandling: 'Detener y notificar al equipo de datos.',
    lastRun: '2025-06-12 02:00:00',
    runHistory: [
      { timestamp: '2025-06-12 02:00:00', status: 'Success', details: 'Sincronización completada. 1500 registros procesados.' },
    ],
  },
];

const simulatedWebhooks = [
  {
    id: 'WH001',
    name: 'Nuevo Usuario Registrado',
    status: 'Activo', // Activo, Inactivo
    description: 'Webhook para notificar cuando un nuevo usuario se registra en la plataforma.',
    url: 'https://webhook.site/abcdef12345',
    secret: 's_e_c_r_e_t', // Simulated
    eventType: 'new_user',
    payloadExample: { userId: '12345', email: 'user@example.com', registrationDate: '2025-06-12' },
    lastDelivery: '2025-06-12 10:30:05',
    deliveryHistory: [
      { timestamp: '2025-06-12 10:30:05', status: 'Success', statusCode: 200, response: 'OK' },
      { timestamp: '2025-06-12 10:25:10', status: 'Failed', statusCode: 500, response: 'Internal Server Error' },
    ],
  },
  {
    id: 'WH002',
    name: 'Actualización de Ticket de Soporte',
    status: 'Inactivo',
    description: 'Webhook para notificar a sistemas externos cuando un ticket de soporte es actualizado.',
    url: 'https://api.thirdparty.com/support/webhook',
    secret: 'another_secret', // Simulated
    eventType: 'ticket_closed',
    payloadExample: { ticketId: 'TSK-001', status: 'Closed', closedBy: 'Agent X' },
    lastDelivery: 'N/A',
    deliveryHistory: [],
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
function AutomationConnectivityPanel({ onGoToHome }) {
  const [currentTab, setCurrentTab] = useState('overview'); // 'overview', 'api_detail', 'workflow_detail', 'webhook_detail'
  const [selectedItem, setSelectedItem] = useState(null); // The item being viewed/edited
  const [itemType, setItemType] = useState(null); // 'api', 'workflow', 'webhook'
  const [detailSubTab, setDetailSubTab] = useState('general'); // Varies per itemType

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'newApi', 'editApi', 'newWorkflow', 'editWorkflow', 'newWebhook', 'editWebhook'
  const [formData, setFormData] = useState({}); // For creation/editing

  const showSnackbar = useCallback((message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Handler para ver/editar un elemento
  const handleViewItem = (item, type) => {
    setSelectedItem(item);
    setItemType(type);
    setCurrentTab(`${type}_detail`);
    setDetailSubTab('general'); // Reset to general tab
  };

  const handleAddItem = (type) => {
    setItemType(type);
    setDialogType(`new${type.charAt(0).toUpperCase() + type.slice(1)}`);
    // Initialize formData based on type
    if (type === 'api') {
      setFormData({
        name: '', type: 'rest', status: 'Inactiva', description: '', endpoint: '', auth: 'API Key',
        rateLimit: 'N/A', corsEnabled: true, version: '1.0.0', documentationUrl: '', apiKeyMgmt: [], analytics: { totalCalls: 0, errors: 0, avgLatencyMs: 0 }
      });
    } else if (type === 'workflow') {
      setFormData({
        name: '', status: 'Inactivo', description: '', trigger: { type: 'manual', config: '' },
        steps: [], errorHandling: 'Notificar al admin', lastRun: 'N/A', runHistory: []
      });
    } else if (type === 'webhook') {
      setFormData({
        name: '', status: 'Inactivo', description: '', url: '', secret: '',
        eventType: '', payloadExample: {}, lastDelivery: 'N/A', deliveryHistory: []
      });
    }
    setDialogOpen(true);
  };

  const handleEditItem = (item, type) => {
    setSelectedItem(item);
    setItemType(type);
    setFormData(item);
    setDialogType(`edit${type.charAt(0).toUpperCase() + type.slice(1)}`);
    setDialogOpen(true);
  };

  const handleSaveItem = (itemData) => {
    const isNew = dialogType.startsWith('new');
    const type = itemType;

    if (type === 'api') {
      if (isNew) {
        const newId = `API${String(simulatedAPIs.length + 1).padStart(3, '0')}`;
        simulatedAPIs.push({ ...itemData, id: newId, lastUpdated: new Date().toISOString().split('T')[0] });
      } else {
        Object.assign(selectedItem, itemData); // Update existing object
      }
    } else if (type === 'workflow') {
      if (isNew) {
        const newId = `WF${String(simulatedWorkflows.length + 1).padStart(3, '0')}`;
        simulatedWorkflows.push({ ...itemData, id: newId, lastRun: 'N/A' });
      } else {
        Object.assign(selectedItem, itemData);
      }
    } else if (type === 'webhook') {
      if (isNew) {
        const newId = `WH${String(simulatedWebhooks.length + 1).padStart(3, '0')}`;
        simulatedWebhooks.push({ ...itemData, id: newId, lastDelivery: 'N/A' });
      } else {
        Object.assign(selectedItem, itemData);
      }
    }

    showSnackbar(`${type.charAt(0).toUpperCase() + type.slice(1)} ${isNew ? 'creado' : 'actualizado'} con éxito (simulado).`, 'success');
    setDialogOpen(false);
    setSelectedItem(prev => (prev && prev.id === itemData.id ? { ...prev, ...itemData } : prev));
  };


  const GeneralFormDialog = () => {
    const isNew = dialogType.startsWith('new');
    const capitalizedType = itemType.charAt(0).toUpperCase() + itemType.slice(1);

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: type === 'checkbox' ? checked : value
          }
        }));
      } else {
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
      }
    };

    const handleSubmit = () => {
      // Basic validation
      if (!formData.name) {
        showSnackbar('El nombre es obligatorio.', 'error');
        return;
      }
      if (itemType === 'api' && (!formData.endpoint || !formData.auth)) {
        showSnackbar('Endpoint y Autenticación son obligatorios para APIs.', 'error');
        return;
      }
      if (itemType === 'webhook' && !formData.url) {
        showSnackbar('La URL del Webhook es obligatoria.', 'error');
        return;
      }

      handleSaveItem(formData);
    };

    return (
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: '#607d8b', color: '#fff' }}>
          {isNew ? `Añadir Nuevo ${capitalizedType}` : `Editar ${capitalizedType}`}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField label="Nombre" name="name" value={formData.name || ''} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Descripción" name="description" value={formData.description || ''} onChange={handleChange} fullWidth multiline rows={2} />
            </Grid>

            {itemType === 'api' && (
              <>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Tipo de API</InputLabel>
                    <Select label="Tipo de API" name="type" value={formData.type || ''} onChange={handleChange}>
                      {apiTypes.map(type => (
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
                  <TextField label="Endpoint" name="endpoint" value={formData.endpoint || ''} onChange={handleChange} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Autenticación" name="auth" value={formData.auth || ''} onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Límite de Tasa (Rate Limit)" name="rateLimit" value={formData.rateLimit || ''} onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={<Checkbox checked={formData.corsEnabled} onChange={handleChange} name="corsEnabled" />}
                    label="CORS Habilitado"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Versión" name="version" value={formData.version || ''} onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="URL de Documentación" name="documentationUrl" value={formData.documentationUrl || ''} onChange={handleChange} fullWidth />
                </Grid>
              </>
            )}

            {itemType === 'workflow' && (
              <>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Tipo de Disparador</InputLabel>
                    <Select label="Tipo de Disparador" name="trigger.type" value={formData.trigger?.type || ''} onChange={handleChange}>
                      {workflowTriggers.map(trigger => (
                        <MenuItem key={trigger.id} value={trigger.id}>{trigger.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Configuración del Disparador" name="trigger.config" value={formData.trigger?.config || ''} onChange={handleChange} fullWidth helperText="Ej: 'webhook_user_registered' o 'daily_0200_UTC'" />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Manejo de Errores" name="errorHandling" value={formData.errorHandling || ''} onChange={handleChange} fullWidth multiline rows={2} />
                </Grid>
                <Grid item xs={12}>
                  <Alert severity="info">
                    Para editar los pasos del workflow, debe guardar y luego ir a la vista de detalle.
                  </Alert>
                </Grid>
              </>
            )}

            {itemType === 'webhook' && (
              <>
                <Grid item xs={12}>
                  <TextField label="URL del Webhook" name="url" value={formData.url || ''} onChange={handleChange} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Secreto (para firma)" name="secret" value={formData.secret || ''} onChange={handleChange} fullWidth helperText="Usado para verificar la autenticidad del remitente." />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Tipo de Evento</InputLabel>
                    <Select label="Tipo de Evento" name="eventType" value={formData.eventType || ''} onChange={handleChange}>
                      {webhookEventTypes.map(event => (
                        <MenuItem key={event.id} value={event.id}>{event.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Ejemplo de Payload (JSON)" name="payloadExample" value={JSON.stringify(formData.payloadExample || {}, null, 2)} onChange={(e) => {try {setFormData({...formData, payloadExample: JSON.parse(e.target.value)})} catch(err){}}} fullWidth multiline rows={4} />
                  <Alert severity="warning">
                    El secreto del webhook debe ser tratado como una contraseña y gestionado de forma segura.
                  </Alert>
                </Grid>
              </>
            )}

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select label="Estado" name="status" value={formData.status || 'Inactiva'} onChange={handleChange}>
                  <MenuItem value="Activa">Activa</MenuItem>
                  <MenuItem value="Inactiva">Inactiva</MenuItem>
                  {itemType === 'api' && <MenuItem value="Deprecada">Deprecada</MenuItem>}
                  {itemType === 'workflow' && <MenuItem value="Error">Error</MenuItem>}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit} startIcon={<SaveIcon />} sx={{ bgcolor: '#009688', '&:hover': { bgcolor: '#00796b' } }}>
            {isNew ? `Añadir ${capitalizedType}` : 'Guardar Cambios'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };


  const DetailPanel = () => {
    if (!selectedItem || !itemType) {
      return (
        <Alert severity="error">Seleccione un elemento de automatización/conectividad para ver los detalles.</Alert>
      );
    }

    // Handlers para la lógica interna de los detalles (ej. añadir pasos de workflow)
    const handleAddStep = () => {
      setSelectedItem(prev => ({
        ...prev,
        steps: [...prev.steps, { order: (prev.steps.length + 1), type: 'action', name: '', config: {} }]
      }));
    };

    const handleStepChange = (index, field, value) => {
      const updatedSteps = [...selectedItem.steps];
      updatedSteps[index][field] = value;
      setSelectedItem(prev => ({ ...prev, steps: updatedSteps }));
    };

    const handleRemoveStep = (index) => {
      const updatedSteps = selectedItem.steps.filter((_, i) => i !== index);
      setSelectedItem(prev => ({ ...prev, steps: updatedSteps }));
    };

    const handleGenerateApiKey = () => {
      const newKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const newApiKey = {
        key: newKey,
        status: 'Active',
        generatedBy: currentUser.name,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setSelectedItem(prev => ({
        ...prev,
        apiKeyMgmt: [...(prev.apiKeyMgmt || []), newApiKey]
      }));
      showSnackbar('API Key generada con éxito.', 'success');
    };

    const handleApiKeyStatusChange = (index, newStatus) => {
      const updatedKeys = [...selectedItem.apiKeyMgmt];
      updatedKeys[index].status = newStatus;
      setSelectedItem(prev => ({ ...prev, apiKeyMgmt: updatedKeys }));
      showSnackbar(`API Key ${newStatus === 'Active' ? 'activada' : 'revocada'}.`, 'info');
    };

    const getStatusChip = (status) => {
      let color = 'default';
      let icon = null;
      switch (status) {
        case 'Activa':
        case 'Active':
        case 'Success':
          color = 'success';
          icon = <CheckCircleIcon sx={{ fontSize: 'inherit' }} />;
          break;
        case 'Inactiva':
        case 'Inactive':
        case 'Failed':
        case 'Error':
        case 'Revoked':
          color = 'error';
          icon = <CancelIcon sx={{ fontSize: 'inherit' }} />;
          break;
        case 'Deprecada':
        case 'Warning':
          color = 'warning';
          icon = <WarningIcon sx={{ fontSize: 'inherit' }} />;
          break;
        case 'Pendiente':
          color = 'info';
          icon = <InfoIcon sx={{ fontSize: 'inherit' }} />;
          break;
        default:
          break;
      }
      return <Chip label={status} color={color} size="small" icon={icon} sx={{ ml: 1 }} />;
    };

    const currentTypeIcon = useMemo(() => {
      if (itemType === 'api') return <ApiIcon />;
      if (itemType === 'workflow') return <HandshakeIcon />;
      if (itemType === 'webhook') return <WebhookIcon />;
      return <AutoAwesomeIcon />;
    }, [itemType]);

    return (
      <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
        <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
          {currentTypeIcon && React.cloneElement(currentTypeIcon, { sx: { color: '#607d8b', fontSize: 30, mr: 1 } })}
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
            Detalles de {itemType.charAt(0).toUpperCase() + itemType.slice(1)}: {selectedItem.name}
          </Typography>
          <Button variant="outlined" onClick={() => { setSelectedItem(null); setItemType(null); setCurrentTab('overview'); }} startIcon={<AutoAwesomeIcon />}>
            Volver a Visión General
          </Button>
          <Button variant="contained" startIcon={<SaveIcon />}
                  onClick={() => showSnackbar(`Cambios guardados para ${selectedItem.name} (simulado).`, 'success')}
                  sx={{ bgcolor: '#8bc34a', '&:hover': { bgcolor: '#689f38' } }}>
            Guardar Cambios
          </Button>
        </Box>
        <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

        <Alert severity="info" sx={{ mb: 3 }}>
          Configura y monitorea los aspectos técnicos y funcionales de esta {itemType}.
        </Alert>

        {/* Sub-pestañas de Detalles */}
        <Tabs
          value={detailSubTab}
          onChange={(e, newValue) => setDetailSubTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
          sx={{ mb: 3, borderBottom: '1px solid #e0e0e0' }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="General" value="general" icon={<VisibilityIcon />} iconPosition="start" />
          {itemType === 'api' && <Tab label="Autenticación y Seguridad" value="api_security" icon={<KeyIcon />} iconPosition="start" />}
          {itemType === 'api' && <Tab label="Analíticas y Rendimiento" value="api_analytics" icon={<SpeedIcon />} iconPosition="start" />}
          {itemType === 'workflow' && <Tab label="Diseñador de Flujo" value="workflow_builder" icon={<BuildIcon />} iconPosition="start" />}
          {itemType === 'workflow' && <Tab label="Historial de Ejecución" value="workflow_history" icon={<TimelineIcon />} iconPosition="start" />}
          {itemType === 'webhook' && <Tab label="Entrega y Payload" value="webhook_delivery" icon={<CodeIcon />} iconPosition="start" />}
          {itemType === 'webhook' && <Tab label="Historial de Entregas" value="webhook_history" icon={<ScheduleIcon />} iconPosition="start" />}
        </Tabs>

        {/* Contenido de Sub-pestañas */}
        {detailSubTab === 'general' && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField label="ID" value={selectedItem.id} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Nombre" value={selectedItem.name} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Descripción" value={selectedItem.description} fullWidth multiline rows={2} InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <Typography variant="body1" fontWeight="bold" sx={{ mr: 1 }}>Estado:</Typography> {getStatusChip(selectedItem.status)}
                <Tooltip title={`Cambiar estado a ${selectedItem.status === 'Activa' ? 'Inactiva' : 'Activa'}`}>
                  <IconButton size="small" sx={{ ml: 2 }} onClick={() => {
                    setSelectedItem(prev => ({ ...prev, status: prev.status === 'Activa' ? 'Inactiva' : 'Activa' }));
                    showSnackbar(`Estado de ${selectedItem.name} cambiado a ${selectedItem.status === 'Activa' ? 'Inactiva' : 'Activa'}.`, 'info');
                  }}>
                    {selectedItem.status === 'Activa' ? <PauseIcon color="action" /> : <PlayArrowIcon color="success" />}
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
            {(itemType === 'api' || itemType === 'webhook') && (
              <Grid item xs={12} sm={6}>
                <TextField label="Endpoint / URL" value={selectedItem.endpoint || selectedItem.url} fullWidth InputProps={{ readOnly: true, endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Copiar URL">
                        <IconButton onClick={() => copyToClipboard(selectedItem.endpoint || selectedItem.url, showSnackbar)}><ContentCopyIcon fontSize="small" /></IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ) }} />
              </Grid>
            )}
            {itemType === 'api' && (
              <Grid item xs={12} sm={6}>
                <TextField label="Versión" value={selectedItem.version} fullWidth InputProps={{ readOnly: true }} />
              </Grid>
            )}
            {itemType === 'workflow' && (
              <Grid item xs={12} sm={6}>
                <TextField label="Disparador" value={`${selectedItem.trigger.type} (${selectedItem.trigger.config})`} fullWidth InputProps={{ readOnly: true }} />
              </Grid>
            )}
            {itemType === 'workflow' && (
              <Grid item xs={12} sm={6}>
                <TextField label="Manejo de Errores" value={selectedItem.errorHandling} fullWidth multiline rows={2} InputProps={{ readOnly: true }} />
              </Grid>
            )}
            {itemType === 'workflow' && (
              <Grid item xs={12} sm={6}>
                <TextField label="Última Ejecución" value={selectedItem.lastRun} fullWidth InputProps={{ readOnly: true }} />
                <Button variant="outlined" startIcon={<PlayArrowIcon />} sx={{mt:1}} onClick={() => showSnackbar(`Ejecutando workflow ${selectedItem.name} (simulado).`, 'info')}>Ejecutar Ahora</Button>
              </Grid>
            )}
          </Grid>
        )}

        {itemType === 'api' && detailSubTab === 'api_security' && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField label="Método de Autenticación" value={selectedItem.auth} fullWidth InputProps={{ readOnly: true }} sx={{mb:2}} />
              <TextField label="Límite de Tasa" value={selectedItem.rateLimit} fullWidth InputProps={{ readOnly: true }} sx={{mb:2}} />
              <FormControlLabel control={<Checkbox checked={selectedItem.corsEnabled} disabled />} label="CORS Habilitado" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ color: '#333', mb: 1 }}>Gestión de API Keys</Typography>
              <Alert severity="warning" sx={{mb:2}}>
                Las API Keys deben gestionarse con precaución. Aquí solo se simula la interfaz.
              </Alert>
              <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleGenerateApiKey} sx={{mb:2, bgcolor: '#009688'}}>Generar Nueva API Key</Button>
              <TableContainer component={Paper} elevation={1} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table size="small">
                  <TableHead sx={{ bgcolor: '#cfd8dc' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Key</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Generada Por</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Creación</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(selectedItem.apiKeyMgmt || []).length === 0 && (
                      <TableRow><TableCell colSpan={5} sx={{textAlign: 'center', py:2, color: 'text.secondary'}}>No hay API Keys.</TableCell></TableRow>
                    )}
                    {(selectedItem.apiKeyMgmt || []).map((key, index) => (
                      <TableRow key={index}>
                        <TableCell><Chip label={key.key} size="small" /></TableCell>
                        <TableCell>{getStatusChip(key.status)}</TableCell>
                        <TableCell>{key.generatedBy}</TableCell>
                        <TableCell>{key.createdAt}</TableCell>
                        <TableCell align="center">
                          <Tooltip title="Copiar Key"><IconButton size="small" onClick={() => copyToClipboard(key.key, showSnackbar)}><ContentCopyIcon /></IconButton></Tooltip>
                          {key.status === 'Active' ? (
                            <Tooltip title="Revocar Key"><IconButton size="small" color="error" onClick={() => handleApiKeyStatusChange(index, 'Revoked')}><StopIcon /></IconButton></Tooltip>
                          ) : (
                            <Tooltip title="Activar Key"><IconButton size="small" color="success" onClick={() => handleApiKeyStatusChange(index, 'Active')}><PlayArrowIcon /></IconButton></Tooltip>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        )}

        {itemType === 'api' && detailSubTab === 'api_analytics' && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Card variant="outlined" sx={{p:2, textAlign:'center', bgcolor: '#e8f5e9'}}>
                <Typography variant="h4" color="primary" sx={{fontWeight:700}}>{selectedItem.analytics.totalCalls}</Typography>
                <Typography variant="subtitle1" color="text.secondary">Llamadas Totales</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card variant="outlined" sx={{p:2, textAlign:'center', bgcolor: '#ffe0b2'}}>
                <Typography variant="h4" color="warning.main" sx={{fontWeight:700}}>{selectedItem.analytics.errors}</Typography>
                <Typography variant="subtitle1" color="text.secondary">Errores</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card variant="outlined" sx={{p:2, textAlign:'center', bgcolor: '#e3f2fd'}}>
                <Typography variant="h4" color="info.main" sx={{fontWeight:700}}>{selectedItem.analytics.avgLatencyMs} ms</Typography>
                <Typography variant="subtitle1" color="text.secondary">Latencia Promedio</Typography>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Alert severity="info">
                Aquí se mostrarían gráficos y métricas de uso reales (ej. tasas de error, uso por cliente, etc.).
              </Alert>
            </Grid>
          </Grid>
        )}

        {itemType === 'workflow' && detailSubTab === 'workflow_builder' && (
          <Box>
            <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>Pasos del Flujo de Trabajo</Typography>
            <Alert severity="info" sx={{mb: 2}}>
              Define la secuencia de acciones y lógica condicional de tu workflow.
              (En un sistema real, esto sería una interfaz drag-and-drop o visual).
            </Alert>
            <List sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 2, bgcolor: '#f5f5f5' }}>
              {selectedItem.steps.length === 0 && (
                <ListItem><ListItemText secondary="No hay pasos definidos para este workflow. Añada uno para empezar." /></ListItem>
              )}
              {selectedItem.steps.map((step, index) => (
                <ListItem key={index} sx={{ bgcolor: '#ffffff', mb: 1, borderRadius: 1, boxShadow: 1, borderLeft: '4px solid #009688' }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={1}>
                      <Chip label={step.order} color="primary" size="small" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Nombre del Paso"
                        value={step.name}
                        onChange={(e) => handleStepChange(index, 'name', e.target.value)}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="Tipo"
                        value={step.type}
                        onChange={(e) => handleStepChange(index, 'type', e.target.value)}
                        fullWidth
                        size="small"
                        helperText="ej. action, condition, delay"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="Configuración (JSON)"
                        value={JSON.stringify(step.config || {})}
                        onChange={(e) => {try {handleStepChange(index, 'config', JSON.parse(e.target.value))} catch(err){}}}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={1} sx={{textAlign: 'right'}}>
                      <Tooltip title="Eliminar Paso">
                        <IconButton color="error" onClick={() => handleRemoveStep(index)}><DeleteOutlineIcon /></IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddStep}
              sx={{ mt: 2, bgcolor: '#e0f2f1', '&:hover': { bgcolor: '#b2dfdb' } }}
            >
              Añadir Paso
            </Button>
          </Box>
        )}

        {itemType === 'workflow' && detailSubTab === 'workflow_history' && (
          <Box>
            <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>Historial de Ejecución del Workflow</Typography>
            <Alert severity="warning" sx={{mb: 2}}>
              Revisa los registros de cada ejecución para diagnosticar problemas y verificar el éxito.
            </Alert>
            <List sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 2, bgcolor: '#f5f5f5', maxHeight: 400, overflowY: 'auto' }}>
              {selectedItem.runHistory.length === 0 && (
                <ListItem><ListItemText secondary="No hay historial de ejecución disponible." /></ListItem>
              )}
              {selectedItem.runHistory.map((run, index) => (
                <ListItem key={index} sx={{ bgcolor: '#ffffff', mb: 1, borderRadius: 1, boxShadow: 1, borderLeft: `4px solid ${run.status === 'Failed' ? theme.palette.error.main : theme.palette.success.main}` }}>
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{run.details}</Typography>
                        {getStatusChip(run.status)}
                      </Box>
                    }
                    secondary={<Typography variant="caption" color="text.secondary">{run.timestamp}</Typography>}
                  />
                </ListItem>
              ))}
            </List>
            <Button variant="outlined" startIcon={<RefreshIcon />} sx={{mt:2}} onClick={() => showSnackbar('Cargando historial de ejecución (simulado).', 'info')}>
              Refrescar Historial
            </Button>
          </Box>
        )}

        {itemType === 'webhook' && detailSubTab === 'webhook_delivery' && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="URL del Webhook"
                value={selectedItem.url}
                fullWidth
                InputProps={{ readOnly: true, endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Copiar URL"><IconButton onClick={() => copyToClipboard(selectedItem.url, showSnackbar)}><ContentCopyIcon fontSize="small" /></IconButton></Tooltip>
                    </InputAdornment>
                  ) }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Secreto (para firma)"
                value={selectedItem.secret}
                fullWidth
                type="password"
                InputProps={{ readOnly: true, endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Copiar Secreto"><IconButton onClick={() => copyToClipboard(selectedItem.secret, showSnackbar)}><ContentCopyIcon fontSize="small" /></IconButton></Tooltip>
                      <Tooltip title="Regenerar Secreto (Simulado)"><IconButton onClick={() => showSnackbar('Secreto regenerado (simulado).', 'warning')}><RefreshIcon fontSize="small" /></IconButton></Tooltip>
                    </InputAdornment>
                  ) }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tipo de Evento"
                value={webhookEventTypes.find(e => e.id === selectedItem.eventType)?.name || selectedItem.eventType}
                fullWidth
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Ejemplo de Payload (JSON)"
                value={JSON.stringify(selectedItem.payloadExample || {}, null, 2)}
                fullWidth
                multiline
                rows={8}
                InputProps={{ readOnly: true, endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Copiar Payload"><IconButton onClick={() => copyToClipboard(JSON.stringify(selectedItem.payloadExample || {}), showSnackbar)}><ContentCopyIcon fontSize="small" /></IconButton></Tooltip>
                    </InputAdornment>
                  ) }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" startIcon={<PlayArrowIcon />} sx={{mt:2, bgcolor: '#009688'}} onClick={() => showSnackbar('Enviando webhook de prueba (simulado).', 'info')}>
                Enviar Webhook de Prueba
              </Button>
            </Grid>
          </Grid>
        )}

        {itemType === 'webhook' && detailSubTab === 'webhook_history' && (
          <Box>
            <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>Historial de Entregas del Webhook</Typography>
            <Alert severity="warning" sx={{mb: 2}}>
              Verifica el estado de cada intento de entrega del webhook.
            </Alert>
            <List sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 2, bgcolor: '#f5f5f5', maxHeight: 400, overflowY: 'auto' }}>
              {selectedItem.deliveryHistory.length === 0 && (
                <ListItem><ListItemText secondary="No hay historial de entregas disponible." /></ListItem>
              )}
              {selectedItem.deliveryHistory.map((delivery, index) => (
                <ListItem key={index} sx={{ bgcolor: '#ffffff', mb: 1, borderRadius: 1, boxShadow: 1, borderLeft: `4px solid ${delivery.status === 'Failed' ? theme.palette.error.main : theme.palette.success.main}` }}>
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{delivery.status} - {delivery.statusCode} {delivery.response}</Typography>
                        {getStatusChip(delivery.status)}
                      </Box>
                    }
                    secondary={<Typography variant="caption" color="text.secondary">{delivery.timestamp}</Typography>}
                  />
                </ListItem>
              ))}
            </List>
            <Button variant="outlined" startIcon={<RefreshIcon />} sx={{mt:2}} onClick={() => showSnackbar('Cargando historial de entregas (simulado).', 'info')}>
              Refrescar Historial
            </Button>
          </Box>
        )}

      </Paper>
    );
  };


  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#eceff1', minHeight: '100vh', color: '#333', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#607d8b', borderBottom: '1px solid #455a64' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2, color: '#eceff1' }}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}
          <AutoAwesomeIcon sx={{ fontSize: 36, mr: 1, color: '#ff5722' }} /> {/* Naranja para la automatización */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Panel de Automatización y Conectividad
          </Typography>
          <Chip
            avatar={<Avatar src={currentUser.avatar} />}
            label={currentUser.name}
            sx={{ bgcolor: '#b0bec5', color: '#37474f', fontWeight: 600 }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#607d8b' }}>
            Orquestación de Procesos y Conectores
          </Typography>
          <Typography variant="h6" color="#616161">
            Gestiona tus APIs, workflows automatizados y webhooks en un solo lugar.
          </Typography>
        </Box>

        {/* Pestañas de Navegación Principal: Visión General vs Detalle */}
        <Paper elevation={2} sx={{ mb: 4, bgcolor: '#ffffff', borderRadius: 2 }}>
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => {
              setCurrentTab(newValue);
              if (newValue === 'overview') { setSelectedItem(null); setItemType(null); }
            }}
            indicatorColor="primary"
            textColor="primary"
            centered
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#607d8b', // Azul grisáceo
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                '&.Mui-selected': {
                  color: '#607d8b', // Azul grisáceo
                },
              },
            }}
          >
            <Tab label="Visión General" value="overview" icon={<AutoAwesomeIcon />} iconPosition="start" />
            <Tab label="Detalle de Elemento" value={`${itemType}_detail`}  iconPosition="start" disabled={!selectedItem} />
          </Tabs>
        </Paper>

        {/* Contenido de las Pestañas */}
        <Box sx={{ p: 0 }}>
          {/* Tab: Visión General */}
          {currentTab === 'overview' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <AutoAwesomeIcon sx={{ color: '#607d8b', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Visión General de Automatizaciones y Conectividad
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => handleAddItem('api')} sx={{ textTransform: 'none', bgcolor: '#009688', '&:hover': { bgcolor: '#00796b' } }}>
                  Añadir API
                </Button>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => handleAddItem('workflow')} sx={{ textTransform: 'none', bgcolor: '#009688', '&:hover': { bgcolor: '#00796b' } }}>
                  Añadir Workflow
                </Button>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => handleAddItem('webhook')} sx={{ textTransform: 'none', bgcolor: '#009688', '&:hover': { bgcolor: '#00796b' } }}>
                  Añadir Webhook
                </Button>
                <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => showSnackbar('Listas actualizadas', 'info')}>
                  Refrescar Todo
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="info" sx={{ mb: 3 }}>
                Este panel proporciona una vista consolidada de todas tus automatizaciones y puntos de conectividad.
              </Alert>

              {/* APIs Section */}
              <Typography variant="h6" sx={{mb: 2, color: '#333', borderBottom: '1px solid #cfd8dc', pb:1}}>
                <ApiIcon sx={{verticalAlign: 'middle', mr:1}}/> Gestión de APIs
              </Typography>
              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2, mb: 4 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#cfd8dc' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Nombre API</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Tipo</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Endpoint</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Última Act.</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {simulatedAPIs.length > 0 ? (
                      simulatedAPIs.map((api) => (
                        <TableRow key={api.id} hover>
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#333' }}>{api.name}</Typography>
                            <Typography variant="caption" color="text.secondary">{api.id}</Typography>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              {apiTypes.find(t => t.id === api.type)?.icon && React.cloneElement(apiTypes.find(t => t.id === api.type).icon, { sx: { mr: 0.5, fontSize: '1.2rem' } })}
                              {apiTypes.find(t => t.id === api.type)?.name || api.type}
                            </Box>
                          </TableCell>
                          <TableCell>{api.endpoint}</TableCell>
                          <TableCell>{api.status}</TableCell>
                          <TableCell>{api.lastUpdated}</TableCell>
                          <TableCell align="center">
                            <Tooltip title="Ver Detalles"><IconButton size="small" onClick={() => handleViewItem(api, 'api')}><VisibilityIcon color="primary" /></IconButton></Tooltip>
                            <Tooltip title="Editar"><IconButton size="small" onClick={() => handleEditItem(api, 'api')}><EditIcon color="action" /></IconButton></Tooltip>
                            <Tooltip title="Eliminar"><IconButton size="small" onClick={() => showSnackbar(`API ${api.name} eliminada (simulado).`, 'info')}><DeleteOutlineIcon color="error" /></IconButton></Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={6} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No hay APIs registradas.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Workflows Section */}
              <Typography variant="h6" sx={{mb: 2, color: '#333', borderBottom: '1px solid #cfd8dc', pb:1}}>
                <HandshakeIcon sx={{verticalAlign: 'middle', mr:1}}/> Automatización de Workflows
              </Typography>
              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2, mb: 4 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#cfd8dc' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Nombre Workflow</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Disparador</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Última Ejecución</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {simulatedWorkflows.length > 0 ? (
                      simulatedWorkflows.map((wf) => (
                        <TableRow key={wf.id} hover>
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#333' }}>{wf.name}</Typography>
                            <Typography variant="caption" color="text.secondary">{wf.id}</Typography>
                          </TableCell>
                          <TableCell>{workflowTriggers.find(t => t.id === wf.trigger.type)?.name || wf.trigger.type} ({wf.trigger.config})</TableCell>
                          <TableCell>{wf.status}</TableCell>
                          <TableCell>{wf.lastRun}</TableCell>
                          <TableCell align="center">
                            <Tooltip title="Ver Detalles"><IconButton size="small" onClick={() => handleViewItem(wf, 'workflow')}><VisibilityIcon color="primary" /></IconButton></Tooltip>
                            <Tooltip title="Editar"><IconButton size="small" onClick={() => handleEditItem(wf, 'workflow')}><EditIcon color="action" /></IconButton></Tooltip>
                            <Tooltip title="Ejecutar Ahora"><IconButton size="small" onClick={() => showSnackbar(`Ejecutando workflow ${wf.name} (simulado).`, 'info')}><PlayArrowIcon color="success" /></IconButton></Tooltip>
                            <Tooltip title="Eliminar"><IconButton size="small" onClick={() => showSnackbar(`Workflow ${wf.name} eliminado (simulado).`, 'info')}><DeleteOutlineIcon color="error" /></IconButton></Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={5} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No hay workflows registrados.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Webhooks Section */}
              <Typography variant="h6" sx={{mb: 2, color: '#333', borderBottom: '1px solid #cfd8dc', pb:1}}>
                <WebhookIcon sx={{verticalAlign: 'middle', mr:1}}/> Gestión de Webhooks
              </Typography>
              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#cfd8dc' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Nombre Webhook</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>URL</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Tipo de Evento</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Última Entrega</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {simulatedWebhooks.length > 0 ? (
                      simulatedWebhooks.map((wh) => (
                        <TableRow key={wh.id} hover>
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#333' }}>{wh.name}</Typography>
                            <Typography variant="caption" color="text.secondary">{wh.id}</Typography>
                          </TableCell>
                          <TableCell><Tooltip title={wh.url}><Typography noWrap maxWidth="200px">{wh.url}</Typography></Tooltip></TableCell>
                          <TableCell>{webhookEventTypes.find(e => e.id === wh.eventType)?.name || wh.eventType}</TableCell>
                          <TableCell>{wh.status}</TableCell>
                          <TableCell>{wh.lastDelivery}</TableCell>
                          <TableCell align="center">
                            <Tooltip title="Ver Detalles"><IconButton size="small" onClick={() => handleViewItem(wh, 'webhook')}><VisibilityIcon color="primary" /></IconButton></Tooltip>
                            <Tooltip title="Editar"><IconButton size="small" onClick={() => handleEditItem(wh, 'webhook')}><EditIcon color="action" /></IconButton></Tooltip>
                            <Tooltip title="Enviar Prueba"><IconButton size="small" onClick={() => showSnackbar(`Enviando webhook ${wh.name} de prueba (simulado).`, 'info')}><PlayArrowIcon color="success" /></IconButton></Tooltip>
                            <Tooltip title="Eliminar"><IconButton size="small" onClick={() => showSnackbar(`Webhook ${wh.name} eliminado (simulado).`, 'info')}><DeleteOutlineIcon color="error" /></IconButton></Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={6} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No hay webhooks registrados.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}

          {/* Tab: Detalle de Elemento */}
          {currentTab.endsWith('_detail') && (
            <DetailPanel />
          )}
        </Box>
      </Container>

      {/* Renderizar el Dialogo Dinámicamente */}
      {dialogOpen && <GeneralFormDialog />}

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

export default AutomationConnectivityPanel;