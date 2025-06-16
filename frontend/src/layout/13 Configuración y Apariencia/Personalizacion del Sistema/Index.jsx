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
  Fab, TableCell, TableRow, TableHead, Table, TableContainer, TableBody,
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings'; // Icono principal de Personalización
import CorporateFareIcon from '@mui/icons-material/CorporateFare'; // Gestión de Tenants
import PaletteIcon from '@mui/icons-material/Palette'; // Colores y Temas
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize'; // Página de Inicio
import ImageIcon from '@mui/icons-material/Image'; // Logos
import MenuBookIcon from '@mui/icons-material/MenuBook'; // Menús
import TuneIcon from '@mui/icons-material/Tune'; // Ajustes Avanzados
import ExtensionIcon from '@mui/icons-material/Extension'; // Módulos/Funcionalidades
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Añadir
import SearchIcon from '@mui/icons-material/Search'; // Buscar
import EditIcon from '@mui/icons-material/Edit'; // Editar
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Eliminar
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ver detalles
import RefreshIcon from '@mui/icons-material/Refresh'; // Refrescar
import SaveIcon from '@mui/icons-material/Save'; // Guardar
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import WarningIcon from '@mui/icons-material/Warning';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Subir
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'; // Acordeón
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

// --- Datos Simulados ---

const currentUser = {
  id: 'ADMIN001',
  name: 'Bryan Rosero',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Bryan%20Rosero',
  role: 'Administrador de Sistema',
};

// Datos simulados de tenants con personalización variada
const simulatedTenants = [
  {
    id: 'T001',
    name: 'Tech Solutions Inc.',
    status: 'Activo', // Activo, Inactivo, Prueba, Pendiente
    contactEmail: 'contact@techsolutions.com',
    lastModified: '2025-06-01',
    customization: {
      homePage: {
        type: 'dynamic_dashboard', // 'static_html', 'dynamic_dashboard', 'redirect'
        content: '<p>Bienvenido a su panel personalizado de <strong>Tech Solutions</strong>.</p>',
        redirectUrl: '',
      },
      logo: {
        dark: '/logos/techsolutions_dark.png',
        light: '/logos/techsolutions_light.png',
      },
      colors: {
        primary: '#1a237e', // Azul oscuro
        secondary: '#42a5f5', // Azul claro
        background: '#e3f2fd',
        text: '#212121',
      },
      menu: [
        { id: 'm1', name: 'Inicio', path: '/', icon: 'Home' },
        { id: 'm2', name: 'Reportes', path: '/reports', icon: 'Assessment' },
        { id: 'm3', name: 'Ayuda', path: '/help', icon: 'Help' },
      ],
      advancedSettings: {
        integrations: {
          slack: true,
          salesforce: false,
        },
        dataRetentionDays: 365,
        defaultLanguage: 'es',
        notificationsEnabled: true,
      },
      modules: {
        crm: { enabled: true, version: '1.2' },
        erp: { enabled: false, version: '' },
        analytics: { enabled: true, version: '2.0' },
      }
    }
  },
  {
    id: 'T002',
    name: 'Global Innovators Co.',
    status: 'Activo',
    contactEmail: 'support@globalinnovators.org',
    lastModified: '2025-05-20',
    customization: {
      homePage: {
        type: 'static_html',
        content: '<h1>Innovación a su Alcance con Global Innovators</h1><p>Explore nuestras soluciones.</p>',
        redirectUrl: '',
      },
      logo: {
        dark: '/logos/globalinnovators_dark.png',
        light: '/logos/globalinnovators_light.png',
      },
      colors: {
        primary: '#004d40', // Verde oscuro
        secondary: '#a5d6a7', // Verde claro
        background: '#e0f2f1',
        text: '#212121',
      },
      menu: [
        { id: 'm1', name: 'Dashboard', path: '/dashboard', icon: 'Dashboard' },
        { id: 'm2', name: 'Proyectos', path: '/projects', icon: 'Work' },
        { id: 'm3', name: 'Configuración', path: '/settings', icon: 'Settings' },
      ],
      advancedSettings: {
        integrations: {
          slack: false,
          salesforce: true,
        },
        dataRetentionDays: 730,
        defaultLanguage: 'en',
        notificationsEnabled: false,
      },
      modules: {
        crm: { enabled: true, version: '1.2' },
        erp: { enabled: true, version: '3.0' },
        analytics: { enabled: true, version: '2.0' },
      }
    }
  },
  {
    id: 'T003',
    name: 'Creative Minds LLC',
    status: 'Prueba',
    contactEmail: 'hello@creativeminds.net',
    lastModified: '2025-06-10',
    customization: {
      homePage: {
        type: 'redirect',
        content: '',
        redirectUrl: 'https://creativeminds-portal.com/welcome',
      },
      logo: {
        dark: '/logos/creativeminds_dark.png',
        light: '/logos/creativeminds_light.png',
      },
      colors: {
        primary: '#9c27b0', // Púrpura
        secondary: '#e1bee7', // Púrpura claro
        background: '#f3e5f5',
        text: '#212121',
      },
      menu: [
        { id: 'm1', name: 'Inicio', path: '/home', icon: 'Home' },
        { id: 'm2', name: 'Ideas', path: '/ideas', icon: 'Lightbulb' },
      ],
      advancedSettings: {
        integrations: {
          slack: true,
          salesforce: false,
        },
        dataRetentionDays: 90,
        defaultLanguage: 'es',
        notificationsEnabled: true,
      },
      modules: {
        crm: { enabled: false, version: '' },
        erp: { enabled: false, version: '' },
        analytics: { enabled: true, version: '1.0' },
      }
    }
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
function ClientPersonalizationPanel({ onGoToHome }) {
  const [currentTab, setCurrentTab] = useState('tenant_list'); // 'tenant_list', 'tenant_detail'
  const [selectedTenant, setSelectedTenant] = useState(null); // The tenant being viewed/edited
  const [detailSubTab, setDetailSubTab] = useState('general'); // 'general', 'homepage', 'logos', 'colors', 'menus', 'advanced', 'modules'

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'viewTenant', 'newTenant', 'editTenant'
  const [formData, setFormData] = useState({}); // For tenant creation/editing

  const showSnackbar = useCallback((message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Handler para ver/editar un tenant
  const handleViewTenant = (tenant) => {
    setSelectedTenant(tenant);
    setCurrentTab('tenant_detail');
    setDetailSubTab('general'); // Reset to general tab
  };

  const handleNewTenant = () => {
    setFormData({
      name: '',
      status: 'Pendiente',
      contactEmail: '',
      customization: {
        homePage: { type: 'dynamic_dashboard', content: '', redirectUrl: '' },
        logo: { dark: '', light: '' },
        colors: { primary: '#2196f3', secondary: '#90caf9', background: '#e3f2fd', text: '#212121' },
        menu: [],
        advancedSettings: { integrations: { slack: false, salesforce: false }, dataRetentionDays: 365, defaultLanguage: 'es', notificationsEnabled: true },
        modules: { crm: { enabled: false, version: '' }, erp: { enabled: false, version: '' }, analytics: { enabled: false, version: '' } }
      }
    });
    setDialogType('newTenant');
    setDialogOpen(true);
  };

  const handleEditTenantBasicInfo = (tenant) => {
    setFormData(tenant);
    setDialogType('editTenant');
    setDialogOpen(true);
  };


  const handleSaveTenant = (tenantData) => {
    if (dialogType === 'newTenant') {
      const newId = `T${String(simulatedTenants.length + 1).padStart(3, '0')}`;
      const newTenant = { ...tenantData, id: newId, lastModified: new Date().toISOString().split('T')[0] };
      simulatedTenants.push(newTenant); // In a real app, update state
      showSnackbar('Tenant creado con éxito (simulado).', 'success');
    } else if (dialogType === 'editTenant') {
      // In a real app, find and update the tenant in state/DB
      showSnackbar('Información básica del tenant actualizada (simulado).', 'success');
    }
    setDialogOpen(false);
    // Refresh the list/detail view
    setSelectedTenant(prev => (prev && prev.id === tenantData.id ? { ...prev, ...tenantData } : prev));
  };

  const handleSaveTenantCustomization = (field, value) => {
    if (selectedTenant) {
      const updatedTenant = {
        ...selectedTenant,
        customization: {
          ...selectedTenant.customization,
          [field]: value,
        },
        lastModified: new Date().toISOString().split('T')[0],
      };
      setSelectedTenant(updatedTenant); // Update local state for display
      // In a real app, this would be an API call to persist
      showSnackbar(`Personalización de ${field} guardada para ${selectedTenant.name} (simulado).`, 'success');
    }
  };

  const TenantFormDialog = () => {
    const isNew = dialogType === 'newTenant';

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
      if (!formData.name || !formData.contactEmail) {
        showSnackbar('Nombre y Email de Contacto son obligatorios.', 'error');
        return;
      }
      handleSaveTenant(formData);
    };

    return (
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#0d47a1', color: '#fff' }}>
          {isNew ? 'Crear Nuevo Tenant' : 'Editar Información Básica del Tenant'}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField label="Nombre del Cliente (Tenant)" name="name" value={formData.name} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Email de Contacto" name="contactEmail" type="email" value={formData.contactEmail} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select label="Estado" name="status" value={formData.status} onChange={handleChange}>
                  <MenuItem value="Activo">Activo</MenuItem>
                  <MenuItem value="Inactivo">Inactivo</MenuItem>
                  <MenuItem value="Prueba">Prueba</MenuItem>
                  <MenuItem value="Pendiente">Pendiente</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {!isNew && (
              <Grid item xs={12} sm={6}>
                <TextField label="Última Modificación" value={formData.lastModified} fullWidth InputProps={{ readOnly: true }} />
              </Grid>
            )}
            <Grid item xs={12}>
              <Alert severity="info">
                Esta es la información básica del tenant. Las personalizaciones avanzadas se gestionan dentro de la vista de detalle.
              </Alert>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit} startIcon={<SaveIcon />} sx={{ bgcolor: '#2196f3', '&:hover': { bgcolor: '#1976d2' } }}>
            {isNew ? 'Crear Tenant' : 'Guardar Cambios'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const TenantDetailPanel = () => {
    if (!selectedTenant) {
      return (
        <Alert severity="error">Seleccione un tenant para ver los detalles de personalización.</Alert>
      );
    }

    // Estado local para los formularios de personalización
    const [currentCustomization, setCurrentCustomization] = useState(selectedTenant.customization);

    useEffect(() => {
      // Sincronizar el estado local cuando selectedTenant cambie
      setCurrentCustomization(selectedTenant.customization);
    }, [selectedTenant]);


    const handleCustomizationChange = (category, key, value) => {
      setCurrentCustomization(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [key]: value
        }
      }));
    };

    const handleModuleToggle = (moduleName) => {
      setCurrentCustomization(prev => ({
        ...prev,
        modules: {
          ...prev.modules,
          [moduleName]: {
            ...prev.modules[moduleName],
            enabled: !prev.modules[moduleName].enabled
          }
        }
      }));
    };

    const handleMenuChange = (index, field, value) => {
      const updatedMenu = [...currentCustomization.menu];
      updatedMenu[index][field] = value;
      setCurrentCustomization(prev => ({
        ...prev,
        menu: updatedMenu
      }));
    };

    const handleAddMenuItem = () => {
      setCurrentCustomization(prev => ({
        ...prev,
        menu: [...prev.menu, { id: `m${prev.menu.length + 1}`, name: '', path: '', icon: '' }]
      }));
    };

    const handleRemoveMenuItem = (index) => {
      const updatedMenu = currentCustomization.menu.filter((_, i) => i !== index);
      setCurrentCustomization(prev => ({
        ...prev,
        menu: updatedMenu
      }));
    };


    return (
      <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
        <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
          <CorporateFareIcon sx={{ color: '#0d47a1', fontSize: 30, mr: 1 }} />
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
            Personalización de Tenant: {selectedTenant.name}
          </Typography>
          <Button variant="outlined" onClick={() => setCurrentTab('tenant_list')} startIcon={<CorporateFareIcon />}>
            Volver a Lista de Tenants
          </Button>
          <Button variant="contained" startIcon={<SaveIcon />}
                  onClick={() => handleSaveTenantCustomization('all', currentCustomization)}
                  sx={{ bgcolor: '#00c853', '&:hover': { bgcolor: '#00a042' } }}>
            Guardar Personalización
          </Button>
        </Box>
        <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

        <Alert severity="info" sx={{ mb: 3 }}>
          Gestiona las configuraciones específicas y la apariencia de la instancia de {selectedTenant.name}.
        </Alert>

        {/* Sub-pestañas de Personalización */}
        <Tabs
          value={detailSubTab}
          onChange={(e, newValue) => setDetailSubTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
          sx={{ mb: 3, borderBottom: '1px solid #e0e0e0' }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="General" value="general" icon={<SettingsIcon />} iconPosition="start" />
          <Tab label="Página de Inicio" value="homepage" icon={<DashboardCustomizeIcon />} iconPosition="start" />
          <Tab label="Logos" value="logos" icon={<ImageIcon />} iconPosition="start" />
          <Tab label="Colores" value="colors" icon={<PaletteIcon />} iconPosition="start" />
          <Tab label="Menús" value="menus" icon={<MenuBookIcon />} iconPosition="start" />
          <Tab label="Ajustes Avanzados" value="advanced" icon={<TuneIcon />} iconPosition="start" />
          <Tab label="Módulos" value="modules" icon={<ExtensionIcon />} iconPosition="start" />
        </Tabs>

        {/* Contenido de Sub-pestañas */}
        {detailSubTab === 'general' && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField label="ID del Tenant" value={selectedTenant.id} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Nombre del Cliente" value={selectedTenant.name} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email de Contacto" value={selectedTenant.contactEmail} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Estado" value={selectedTenant.status} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12}>
              <Alert severity="info">
                Para editar la información básica del tenant, use el botón "Editar Info Básica" en la lista de tenants.
              </Alert>
            </Grid>
          </Grid>
        )}

        {detailSubTab === 'homepage' && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Tipo de Página de Inicio</InputLabel>
                <Select
                  label="Tipo de Página de Inicio"
                  value={currentCustomization.homePage.type}
                  onChange={(e) => handleCustomizationChange('homePage', 'type', e.target.value)}
                >
                  <MenuItem value="dynamic_dashboard">Dashboard Dinámico (Sistema)</MenuItem>
                  <MenuItem value="static_html">Contenido HTML Estático</MenuItem>
                  <MenuItem value="redirect">Redirección a URL Externa</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {currentCustomization.homePage.type === 'static_html' && (
              <Grid item xs={12}>
                <TextField
                  label="Contenido HTML Estático"
                  value={currentCustomization.homePage.content}
                  onChange={(e) => handleCustomizationChange('homePage', 'content', e.target.value)}
                  fullWidth
                  multiline
                  rows={6}
                  helperText="Permite HTML básico. Evitar scripts complejos."
                />
              </Grid>
            )}
            {currentCustomization.homePage.type === 'redirect' && (
              <Grid item xs={12}>
                <TextField
                  label="URL de Redirección"
                  value={currentCustomization.homePage.redirectUrl}
                  onChange={(e) => handleCustomizationChange('homePage', 'redirectUrl', e.target.value)}
                  fullWidth
                  helperText="Ej: https://portal-cliente.com/welcome"
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Alert severity="warning">
                Los cambios se aplicarán al sistema del cliente al guardar. Asegúrese de previsualizar si es posible.
              </Alert>
            </Grid>
          </Grid>
        )}

        {detailSubTab === 'logos' && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ color: '#333' }}>Logo para Fondos Oscuros</Typography>
              <TextField
                label="URL del Logo (Fondo Oscuro)"
                value={currentCustomization.logo.dark}
                onChange={(e) => handleCustomizationChange('logo', 'dark', e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button variant="outlined" startIcon={<CloudUploadIcon />} sx={{mb:1}}>Subir Logo Oscuro</Button>
              {currentCustomization.logo.dark && (
                <Box sx={{ p: 2, bgcolor: '#333', borderRadius: 1, textAlign: 'center', mt: 1 }}>
                  <img src={currentCustomization.logo.dark} alt="Logo Oscuro" style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }} />
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ color: '#333' }}>Logo para Fondos Claros</Typography>
              <TextField
                label="URL del Logo (Fondo Claro)"
                value={currentCustomization.logo.light}
                onChange={(e) => handleCustomizationChange('logo', 'light', e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button variant="outlined" startIcon={<CloudUploadIcon />} sx={{mb:1}}>Subir Logo Claro</Button>
              {currentCustomization.logo.light && (
                <Box sx={{ p: 2, bgcolor: '#e0e0e0', borderRadius: 1, textAlign: 'center', mt: 1 }}>
                  <img src={currentCustomization.logo.light} alt="Logo Claro" style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }} />
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Alert severity="info">
                Soporte para logos en PNG, SVG o JPG. Se recomienda optimizar el tamaño.
              </Alert>
            </Grid>
          </Grid>
        )}

        {detailSubTab === 'colors' && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Color Primario (HEX)"
                value={currentCustomization.colors.primary}
                onChange={(e) => handleCustomizationChange('colors', 'primary', e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Box sx={{ width: 24, height: 24, bgcolor: currentCustomization.colors.primary, border: '1px solid #ccc' }} /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Color Secundario (HEX)"
                value={currentCustomization.colors.secondary}
                onChange={(e) => handleCustomizationChange('colors', 'secondary', e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Box sx={{ width: 24, height: 24, bgcolor: currentCustomization.colors.secondary, border: '1px solid #ccc' }} /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Color de Fondo (HEX)"
                value={currentCustomization.colors.background}
                onChange={(e) => handleCustomizationChange('colors', 'background', e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Box sx={{ width: 24, height: 24, bgcolor: currentCustomization.colors.background, border: '1px solid #ccc' }} /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Color de Texto (HEX)"
                value={currentCustomization.colors.text}
                onChange={(e) => handleCustomizationChange('colors', 'text', e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Box sx={{ width: 24, height: 24, bgcolor: currentCustomization.colors.text, border: '1px solid #ccc' }} /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Alert severity="info">
                Estos colores se aplicarán a los elementos principales de la interfaz de usuario del cliente.
              </Alert>
            </Grid>
          </Grid>
        )}

        {detailSubTab === 'menus' && (
          <Box>
            <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>Elementos del Menú de Navegación</Typography>
            <Alert severity="warning" sx={{mb: 2}}>
              Los iconos deben corresponder a nombres válidos de Material-UI Icons (ej. "Home", "Settings").
            </Alert>
            <List sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 2, bgcolor: '#f5f5f5' }}>
              {currentCustomization.menu.length === 0 && (
                <ListItem><ListItemText secondary="No hay elementos en el menú. Añada uno para empezar." /></ListItem>
              )}
              {currentCustomization.menu.map((item, index) => (
                <ListItem key={item.id || index} sx={{ bgcolor: '#ffffff', mb: 1, borderRadius: 1, boxShadow: 1 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Nombre del Menú"
                        value={item.name}
                        onChange={(e) => handleMenuChange(index, 'name', e.target.value)}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Ruta (Path)"
                        value={item.path}
                        onChange={(e) => handleMenuChange(index, 'path', e.target.value)}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="Icono (Nombre Material-UI)"
                        value={item.icon}
                        onChange={(e) => handleMenuChange(index, 'icon', e.target.value)}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={1} sx={{textAlign: 'right'}}>
                      <Tooltip title="Eliminar Ítem">
                        <IconButton color="error" onClick={() => handleRemoveMenuItem(index)}><DeleteOutlineIcon /></IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddMenuItem}
              sx={{ mt: 2, bgcolor: '#e8f5e9', '&:hover': { bgcolor: '#c8e6c9' } }}
            >
              Añadir Ítem al Menú
            </Button>
          </Box>
        )}

        {detailSubTab === 'advanced' && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: '#333', mb: 1 }}>Integraciones</Typography>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={currentCustomization.advancedSettings.integrations.slack}
                      onChange={(e) => handleCustomizationChange('advancedSettings', 'integrations', { ...currentCustomization.advancedSettings.integrations, slack: e.target.checked })}
                    />
                  }
                  label="Habilitar Integración con Slack"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={currentCustomization.advancedSettings.integrations.salesforce}
                      onChange={(e) => handleCustomizationChange('advancedSettings', 'integrations', { ...currentCustomization.advancedSettings.integrations, salesforce: e.target.checked })}
                    />
                  }
                  label="Habilitar Integración con Salesforce"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Días de Retención de Datos"
                type="number"
                value={currentCustomization.advancedSettings.dataRetentionDays}
                onChange={(e) => handleCustomizationChange('advancedSettings', 'dataRetentionDays', parseInt(e.target.value, 10))}
                fullWidth
                helperText="Número de días que se retienen los datos del cliente."
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Idioma por Defecto</InputLabel>
                <Select
                  label="Idioma por Defecto"
                  value={currentCustomization.advancedSettings.defaultLanguage}
                  onChange={(e) => handleCustomizationChange('advancedSettings', 'defaultLanguage', e.target.value)}
                >
                  <MenuItem value="es">Español</MenuItem>
                  <MenuItem value="en">Inglés</MenuItem>
                  <MenuItem value="pt">Portugués</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={currentCustomization.advancedSettings.notificationsEnabled}
                    onChange={(e) => handleCustomizationChange('advancedSettings', 'notificationsEnabled', e.target.checked)}
                  />
                }
                label="Habilitar Notificaciones por Correo Electrónico"
              />
            </Grid>
            <Grid item xs={12}>
              <Alert severity="warning">
                Los ajustes avanzados pueden afectar el comportamiento del sistema para este tenant. Proceda con precaución.
              </Alert>
            </Grid>
          </Grid>
        )}

        {detailSubTab === 'modules' && (
          <Box>
            <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>Gestión de Módulos y Funcionalidades</Typography>
            <Alert severity="info" sx={{mb: 2}}>
              Controla qué módulos y funcionalidades están disponibles para este cliente.
            </Alert>
            <Grid container spacing={2}>
              {Object.keys(currentCustomization.modules).map((moduleName) => (
                <Grid item xs={12} sm={6} md={4} key={moduleName}>
                  <Card elevation={2} sx={{ p: 2, borderRadius: 2, border: '1px solid #e0e0e0' }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#212121' }}>
                        {moduleName.toUpperCase()}
                      </Typography>
                      <ToggleButtonGroup
                        value={currentCustomization.modules[moduleName].enabled}
                        exclusive
                        onChange={() => handleModuleToggle(moduleName)}
                        size="small"
                        sx={{
                          backgroundColor: currentCustomization.modules[moduleName].enabled ? '#e8f5e9' : '#ffebee',
                          '& .MuiToggleButton-root': {
                            '&.Mui-selected': {
                              backgroundColor: currentCustomization.modules[moduleName].enabled ? '#00c853' : '#f44336',
                              color: '#ffffff',
                              '&:hover': {
                                backgroundColor: currentCustomization.modules[moduleName].enabled ? '#00a042' : '#d32f2f',
                              }
                            }
                          }
                        }}
                      >
                        <ToggleButton value={true} selected={currentCustomization.modules[moduleName].enabled}><ToggleOnIcon sx={{mr:0.5}}/> Activado</ToggleButton>
                        <ToggleButton value={false} selected={!currentCustomization.modules[moduleName].enabled}><ToggleOffIcon sx={{mr:0.5}}/> Desactivado</ToggleButton>
                      </ToggleButtonGroup>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Versión: {currentCustomization.modules[moduleName].version || 'N/A'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      {moduleName === 'crm' && 'Gestión de relaciones con clientes.'}
                      {moduleName === 'erp' && 'Planificación de recursos empresariales.'}
                      {moduleName === 'analytics' && 'Módulos de análisis de datos.'}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>
    );
  };


  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#e8f5e9', minHeight: '100vh', color: '#333', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#0d47a1', borderBottom: '1px solid #0a3d92' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2, color: '#e8f5e9' }}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}
          <SettingsIcon sx={{ fontSize: 36, mr: 1, color: '#ff9800' }} /> {/* Naranja para la personalización */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Panel de Personalización del Sistema
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
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#0d47a1' }}>
            Gestión y Personalización de Tenants
          </Typography>
          <Typography variant="h6" color="#616161">
            Adapta la experiencia de la plataforma para cada uno de tus clientes.
          </Typography>
        </Box>

        {/* Pestañas de Navegación Principal: Lista vs Detalle */}
        <Paper elevation={2} sx={{ mb: 4, bgcolor: '#ffffff', borderRadius: 2 }}>
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => { setCurrentTab(newValue); if (newValue === 'tenant_list') setSelectedTenant(null); }}
            indicatorColor="primary"
            textColor="primary"
            centered
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#0d47a1', // Azul oscuro
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                '&.Mui-selected': {
                  color: '#0d47a1', // Azul oscuro
                },
              },
            }}
          >
            <Tab label="Lista de Clientes (Tenants)" value="tenant_list" icon={<CorporateFareIcon />} iconPosition="start" />
            <Tab label="Detalle de Personalización" value="tenant_detail" icon={<DashboardCustomizeIcon />} iconPosition="start" disabled={!selectedTenant} />
          </Tabs>
        </Paper>

        {/* Contenido de las Pestañas */}
        <Box sx={{ p: 0 }}>
          {/* Tab: Lista de Clientes (Tenants) */}
          {currentTab === 'tenant_list' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <CorporateFareIcon sx={{ color: '#0d47a1', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Gestión de Tenants
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleNewTenant} sx={{ textTransform: 'none', bgcolor: '#2196f3', '&:hover': { bgcolor: '#1976d2' } }}>
                  Añadir Nuevo Tenant
                </Button>
                <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => showSnackbar('Lista de tenants actualizada', 'info')}>
                  Refrescar Lista
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="info" sx={{ mb: 3 }}>
                Administra tus clientes y accede a sus configuraciones de personalización.
              </Alert>

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#bbdefb' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Nombre del Tenant</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Email de Contacto</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Última Modificación</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {simulatedTenants.length > 0 ? (
                      simulatedTenants.map((tenant) => {
                        let statusColor = 'default';
                        let statusIcon = null;
                        switch (tenant.status) {
                          case 'Activo':
                            statusColor = 'success';
                            statusIcon = <CheckCircleIcon sx={{fontSize:'inherit'}}/>;
                            break;
                          case 'Inactivo':
                            statusColor = 'error';
                            statusIcon = <DeleteOutlineIcon sx={{fontSize:'inherit'}}/>;
                            break;
                          case 'Prueba':
                            statusColor = 'warning';
                            statusIcon = <WarningIcon sx={{fontSize:'inherit'}}/>;
                            break;
                          case 'Pendiente':
                            statusColor = 'info';
                            statusIcon = <PendingIcon sx={{fontSize:'inherit'}}/>;
                            break;
                          default:
                            break;
                        }

                        return (
                          <TableRow key={tenant.id} hover>
                            <TableCell component="th" scope="row">
                              <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#333' }}>{tenant.name}</Typography>
                              <Typography variant="caption" color="text.secondary">{tenant.id}</Typography>
                            </TableCell>
                            <TableCell>{tenant.contactEmail}</TableCell>
                            <TableCell>
                              <Chip
                                label={tenant.status}
                                color={statusColor}
                                size="small"
                                icon={statusIcon}
                              />
                            </TableCell>
                            <TableCell>{tenant.lastModified}</TableCell>
                            <TableCell align="center">
                              <Tooltip title="Ver y Personalizar">
                                <IconButton size="small" onClick={() => handleViewTenant(tenant)}><VisibilityIcon color="primary" /></IconButton>
                              </Tooltip>
                              <Tooltip title="Editar Info Básica">
                                <IconButton size="small" onClick={() => handleEditTenantBasicInfo(tenant)}><EditIcon color="action" /></IconButton>
                              </Tooltip>
                              <Tooltip title="Eliminar Tenant">
                                <IconButton size="small" onClick={() => showSnackbar(`Tenant ${tenant.name} eliminado (simulado).`, 'info')}><DeleteOutlineIcon color="error" /></IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow><TableCell colSpan={5} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No hay tenants registrados.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination count={Math.ceil(simulatedTenants.length / 10)} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }} />
            </Paper>
          )}

          {/* Tab: Detalle de Personalización del Tenant */}
          {currentTab === 'tenant_detail' && (
            <TenantDetailPanel />
          )}
        </Box>
      </Container>

      {/* Renderizar el Dialogo Dinámicamente */}
      {dialogOpen && <TenantFormDialog />}

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

export default ClientPersonalizationPanel;